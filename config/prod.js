const common = require("./common")

module.exports = {
  ...common,
  mode: "PROD",
  backendConfig: {
    platform: {
      domain: "https://platform-v2.fc.one",
      port: "",
      folder: common.backendConfig.platform.folder,
    },
  },
}
