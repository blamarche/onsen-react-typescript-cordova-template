var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Shared', "react", "react-dom", "./SecondPage", "./MainMenu"], function (require, exports, Shared_1, React, ReactDOM, SecondPage_1, MainMenu_1) {
    "use strict";
    var StartPage = (function (_super) {
        __extends(StartPage, _super);
        function StartPage() {
            var _this = this;
            _super.apply(this, arguments);
            this.componentDidMount = function () {
                _this._el.addEventListener("init", _this.handleInit.bind(_this));
                _this._el.addEventListener("destroy", _this.handleDestroy.bind(_this));
                _this._el.addEventListener("show", _this.handleShow.bind(_this));
                _this._el.addEventListener("hide", _this.handleHide.bind(_this));
            };
            this.handleClick = function (ev) {
                Shared_1.pageManager.pushPage(Shared_1.pageManager.renderPage(React.createElement(SecondPage_1.SecondPage, null)).page);
            };
        }
        StartPage.prototype.render = function () {
            var _this = this;
            return React.createElement("ons-page", {id: "startpage", ref: function (c) { return _this._el = c; }}, React.createElement("ons-toolbar", null, React.createElement("div", {className: "left"}, React.createElement("ons-back-button", null, "Back")), React.createElement("div", {className: "center"}, "Start Page"), React.createElement("div", {className: "right"}, React.createElement("ons-toolbar-button", null, React.createElement("ons-icon", {icon: "fa-bars", onClick: this.handleClick})))), React.createElement("ons-list", null, React.createElement("ons-list-header", null, "Default"), React.createElement("ons-list-item", null, "Item A"), React.createElement("ons-list-item", null, "Item B"), React.createElement("ons-list-header", null, "Tappable / Ripple"), React.createElement("ons-list-item", {tappable: true}, "Tap me"), React.createElement("ons-list-header", null, "Chevron"), React.createElement("ons-list-item", {modifier: "chevron", tappable: true}, "Chevron"), React.createElement("ons-list-header", null, "Thumbnails and titles"), React.createElement("ons-list-item", null, React.createElement("div", {className: "left"}, React.createElement("img", {className: "list__item__thumbnail", src: "img/logo.png"})), React.createElement("div", {className: "center"}, React.createElement("span", {className: "list__item__title"}, "Cutest kitty"), React.createElement("span", {className: "list__item__subtitle"}, "On the Internet"))), React.createElement("ons-list-header", null, "Icons"), React.createElement("ons-list-item", null, React.createElement("div", {className: "left"}, React.createElement("ons-icon", {icon: "md-face", className: "list__item__icon"})), React.createElement("div", {className: "center"}, "Icon")), React.createElement("ons-list-header", null, "Switch"), React.createElement("ons-list-item", null, React.createElement("div", {className: "center"}, "Turn it on"), React.createElement("div", {className: "right"}, React.createElement("ons-switch", null))), React.createElement("ons-list-header", null, "Switch and icon"), React.createElement("ons-list-item", null, React.createElement("div", {className: "left"}, React.createElement("ons-icon", {icon: "md-face", className: "list__item__icon"})), React.createElement("div", {className: "center"}, "Icon and switch"), React.createElement("div", {className: "right"}, React.createElement("ons-switch", null))), React.createElement("ons-list-header", null, "No divider"), React.createElement("ons-list-item", {modifier: "nodivider"}, "Item A"), React.createElement("ons-list-item", {modifier: "nodivider"}, "Item B"), React.createElement("ons-list-header", null, "Long divider"), React.createElement("ons-list-item", {modifier: "longdivider"}, "Item A"), React.createElement("ons-list-item", {modifier: "longdivider"}, "Item B")));
        };
        StartPage.prototype.handleInit = function (ev) {
            console.log("A init");
        };
        StartPage.prototype.handleDestroy = function (ev) {
            console.log("A destroy");
        };
        StartPage.prototype.handleShow = function (ev) {
            console.log("A show");
            ReactDOM.render(React.createElement(MainMenu_1.MainMenu, null), document.getElementById("menu"));
        };
        StartPage.prototype.handleHide = function (ev) {
            console.log("A hide");
        };
        return StartPage;
    }(React.Component));
    exports.StartPage = StartPage;
});
//# sourceMappingURL=StartPage.js.map