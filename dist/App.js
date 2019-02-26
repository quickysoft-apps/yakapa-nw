"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var react_dom_1 = require("react-dom");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () {
            console.log('nw', nw.Window.get());
        };
        return _this;
    }
    App.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Button_1.default, { onClick: this.onClick, variant: "contained", color: "primary" }, "Hello World")));
    };
    return App;
}(react_1.Component));
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('---message----', message);
    console.log('---sender----', sender);
    if (message.injectApp) {
        injectApp();
        sendResponse({ startedExtension: true });
    }
});
function injectApp() {
    var div = document.createElement('div');
    div.setAttribute('id', 'chromeExtensionSettings');
    document.body.appendChild(div);
    react_dom_1.render(react_1.default.createElement(App, null), div);
}
//# sourceMappingURL=App.js.map