//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import * as https from "https";
import * as crypto from "crypto";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as secrets from "./secrets";

admin.initializeApp();

async function makeRequest(method: string, urlPath: string, body: any = null): Promise<any> {
    try {
        const httpMethod = method;
        const httpBaseURL = "sandboxapi.rapyd.net";
        const httpURLPath = urlPath;
        const salt = generateRandomString(8);
        const idempotency = new Date().getTime().toString();
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = sign(httpMethod, httpURLPath, salt, timestamp, body);

        const options = {
            hostname: httpBaseURL,
            port: 443,
            path: httpURLPath,
            method: httpMethod,
            headers: {
                "Content-Type": "application/json",
                salt: salt,
                timestamp: timestamp,
                signature: signature,
                access_key: secrets.RAPYD_ACCESS_KEY,
                idempotency: idempotency,
            },
        };

        return await httpRequest(options, body);
    } catch(error) {
        functions.logger.error("Error generating request options");
        throw error;
    }
}

function sign(method: string, urlPath: string, salt: string, timestamp: number, body: any): any {
    try {
        let bodyString = "";
        if(body) {
            bodyString = JSON.stringify(body);
            bodyString = bodyString == "{}" ? "" : bodyString;
        }

        const toSign = method.toLowerCase() + urlPath + salt + timestamp + secrets.RAPYD_ACCESS_KEY + secrets.RAPYD_SECRET_KEY + bodyString;
        functions.logger.info(`toSign: ${toSign}`);

        const hash = crypto.createHmac("sha256", secrets.RAPYD_SECRET_KEY);
        hash.update(toSign);
        const signature = Buffer.from(hash.digest("hex")).toString("base64");
        functions.logger.info(`signature: ${signature}`);

        return signature;
    } catch(error) {
        functions.logger.error("Error generating signature");
        throw error;
    }
}

function generateRandomString(size: number): string {
    try {
        return crypto.randomBytes(size).toString("hex");
    } catch(error) {
        functions.logger.error("Error generating salt");
        throw error;
    }
}

async function httpRequest(options: any, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            let bodyString = "";
            if(body) {
                bodyString = JSON.stringify(body);
                bodyString = bodyString == "{}" ? "" : bodyString;
            }

            functions.logger.info(`httpRequest options: ${JSON.stringify(options)}`);
            const req = https.request(options, (res) => {
                const response = {
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: "",
                };

                res.on("data", (data) => {
                    response.body += data;
                });

                res.on("end", () => {
                    functions.logger.info(response.body);
                    response.body = response.body ? JSON.parse(response.body) : {};
                    functions.logger.info(`httpRequest response: ${JSON.stringify(response)}`);

                    if(response.statusCode !== 200) {
                        return reject(response);
                    }

                    return resolve(response);
                });
            });

            req.on("error", (error) => {
                return reject(error);
            });

            req.write(bodyString);
            req.end();
        } catch(err) {
            return reject(err);
        }
    });
}

function rapydWalletAccountsToWalletBalances(accounts: any[]): Record<string, number> {
    const summary: Record<string, number> = {};

    for(const a of accounts) {
        summary[a.currency] = a.balance;
    }

    return summary;
}

export const transferMoney = functions.https.onCall(async (data, context) => {
    if(!context.auth) {
        throw new functions.https.HttpsError("failed-precondition", "Authentication required");
    }

    const senderDoc = admin.firestore().collection("users").doc(context.auth.uid);
    const recipientDoc = admin.firestore().collection("users").doc(data.recipientId);

    const [senderWalletId, recipientWalletId] = (await Promise.all([
        senderDoc.get(),
        recipientDoc.get(),
    ])).map(r => r.data()?.walletId);

    if(!senderWalletId) {
        throw new functions.https.HttpsError("not-found", "Could not find sender document");
    }

    if(!recipientWalletId) {
        throw new functions.https.HttpsError("not-found", "Could not find recipient document");
    }

    const transferRequestResponse = await makeRequest("POST", "/v1/account/transfer", {
        "source_ewallet": senderWalletId,
        "destination_ewallet": recipientWalletId,
        "amount": data.amount,
        "currency": data.currency,
    }) as any;

    functions.logger.info(transferRequestResponse);

    const transferResponseResponse = await makeRequest("POST", "/v1/account/transfer/response", {
        "id": transferRequestResponse.body.data.id,
        "status": "accept",
    });

    functions.logger.info(transferResponseResponse);

    const [senderWalletBalances, recipientWalletBalances] = (await Promise.all([
        makeRequest("GET", `/v1/user/${senderWalletId}`),
        makeRequest("GET", `/v1/user/${recipientWalletId}`),
    ])).map((r: any) => rapydWalletAccountsToWalletBalances(r.body.data.accounts));

    functions.logger.info(senderWalletBalances);
    functions.logger.info(recipientWalletBalances);

    await Promise.all([
        senderDoc.update({
            walletBalances: senderWalletBalances,
        }),
        recipientDoc.update({
            walletBalances: recipientWalletBalances,
        }),
        admin.firestore().collection("messages").add({
            type: "money-transfer",
            recipientId: data.recipientId,
            senderId: context.auth.uid,
            sentOn: admin.firestore.FieldValue.serverTimestamp(),
            text: data.text,
            amount: data.amount,
            currency: data.currency,
        }),
    ]);

    return {};
});
