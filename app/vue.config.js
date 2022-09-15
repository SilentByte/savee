//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

const {defineConfig} = require("@vue/cli-service");

module.exports = defineConfig({
    devServer: {
        allowedHosts: "all",
    },

    transpileDependencies: [
        "vuetify",
    ],
});
