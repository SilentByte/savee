//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

export type Opaque<K, T> = T & { __TYPE__: K };
export type Uuid = Opaque<"Uuid", string>;
export type Timestamp = Opaque<"Timestamp", number>;
