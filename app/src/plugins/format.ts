//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import Vue from "vue";

class Formatter {
    money(currency: string, value: number, options?: { decimals: number }): string {
        const digits = options?.decimals === undefined
            ? (Number.isInteger(value) ? 0 : undefined)
            : options.decimals;

        return (new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        })).format(value);
    }
}

declare module "vue/types/vue" {
    interface Vue {
        $format: Formatter;
    }
}

// noinspection JSUnusedGlobalSymbols
const VueFormat = {
    install(vue: any): void {
        (vue.prototype as any).$format = new Formatter();
    },
};

Vue.use(VueFormat);
