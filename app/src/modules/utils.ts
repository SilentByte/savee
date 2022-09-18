//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

export function timeout(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
