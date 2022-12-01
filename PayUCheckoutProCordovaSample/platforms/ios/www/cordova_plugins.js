cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-payu-checkoutpro.PayUCheckoutProCordova",
      "file": "plugins/cordova-payu-checkoutpro/www/PayUCheckoutProCordova.js",
      "pluginId": "cordova-payu-checkoutpro",
      "clobbers": [
        "cordova.plugins.PayUCheckoutProCordova"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-cocoapod-support": "1.6.2",
    "cordova-payu-checkoutpro": "1.0.0"
  };
});