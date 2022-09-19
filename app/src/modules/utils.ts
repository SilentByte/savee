//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

export function hint<T>(o: T): T {
    return o;
}

export function timeout(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
