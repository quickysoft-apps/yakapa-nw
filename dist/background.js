"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var App_1 = require("./App");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('---message----', message);
    console.log('---sender----', sender);
    if (message.inject) {
        injectApp();
        sendResponse({ injected: true });
    }
});
function injectApp() {
    var div = document.createElement('div');
    div.setAttribute('id', 'chromeExtensionSettings');
    document.body.appendChild(div);
    react_dom_1.render(react_1.default.createElement(App_1.App, null), div);
}
//# sourceMappingURL=background.js.map