//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import Vue, { VNode } from "vue";

declare global {
    namespace JSX {
        interface Element extends VNode {
            //
        }

        interface ElementClass extends Vue {
            //
        }

        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
