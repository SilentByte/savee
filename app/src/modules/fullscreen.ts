//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

export async function tryEnterFullscreen(): Promise<boolean> {
    try {
        await document.documentElement.requestFullscreen({
            navigationUI: "hide",
        });
        return true;
    } catch {
        return false;
    }
}

export async function tryExitFullscreen(): Promise<boolean> {
    try {
        await document.exitFullscreen();
        return true;
    } catch {
        return false;
    }
}

export function isFullscreen(): boolean {
    return document.fullscreenElement !== null;
}
