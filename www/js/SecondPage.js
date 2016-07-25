var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Shared', "react", "react-dom"], function (require, exports, Shared_1, React, ReactDOM) {
    "use strict";
    var SecondPage = (function (_super) {
        __extends(SecondPage, _super);
        function SecondPage() {
            var _this = this;
            _super.apply(this, arguments);
            this.componentDidMount = function () {
                //hook our elements lifecycle events and bind to this class instance
                _this._el.addEventListener("init", _this.handleInit.bind(_this));
                _this._el.addEventListener("destroy", _this.handleDestroy.bind(_this));
                _this._el.addEventListener("show", _this.handleShow.bind(_this));
                _this._el.addEventListener("hide", _this.handleHide.bind(_this));
            };
            this.handleClick = function (ev) {
                //menu click generate a dynamic page with any predifined react class
                ons.notification.prompt({ message: 'Menu clicked, what is your name?' }).then(function (name) {
                    ons.notification.alert('Hello ' + name);
                    //render a temp page
                    var p = Shared_1.pageManager.renderPage(React.createElement("ons-page", {id: name}, React.createElement("ons-toolbar", null, React.createElement("div", {className: "left"}, React.createElement("ons-back-button", null, "Back")), React.createElement("div", {className: "center"}, "Temp Page"), React.createElement("div", {className: "right"}, React.createElement("ons-toolbar-button", null, React.createElement("ons-icon", {icon: "fa-bars"})))), name));
                    Shared_1.pageManager.pushPage(p.page, function () { }, "fadeIn", { title: "Temporary page", urlpath: "/temp-page" });
                });
            };
        }
        SecondPage.prototype.render = function () {
            var _this = this;
            //create a page with some long text, use ref= and componentDidMount
            //to hook page lifecycle event listeners
            return React.createElement("ons-page", {id: "secondpage", ref: function (c) { return _this._el = c; }}, React.createElement("ons-toolbar", null, React.createElement("div", {className: "left"}, React.createElement("ons-back-button", null, "Back")), React.createElement("div", {className: "center"}, "Second Page"), React.createElement("div", {className: "right"}, React.createElement("ons-toolbar-button", null, React.createElement("ons-icon", {icon: "fa-bars", onClick: this.handleClick})))), React.createElement("p", null, "This is a secondary page thats very long. Tap the menu icon to see a temp page"), React.createElement("p", null, "This is a secondary page thats very long. Tap the menu icon to see a temp page"), React.createElement("p", null, "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page." + ' ' + "This is a secondary page thats very long. Tap the menu icon to see a temp page. "), React.createElement("p", null, "This is a secondary page thats very long. Tap the menu icon to see a temp page"), React.createElement("p", null, "This is a secondary page thats very long. Tap the menu icon to see a temp page"));
        };
        SecondPage.prototype.handleInit = function (ev) {
            console.log("B init");
        };
        SecondPage.prototype.handleDestroy = function (ev) {
            console.log("B destroy");
        };
        SecondPage.prototype.handleShow = function (ev) {
            console.log("B show");
            ReactDOM.render(React.createElement("ons-page", null, React.createElement("ons-list", null, React.createElement("ons-list-item", {onClick: function () { return alert('1'); }, tappable: true}, "Second Menu 1"), React.createElement("ons-list-item", {onClick: function () { return alert('2'); }, tappable: true}, "Second Menu 2"), React.createElement("ons-list-item", {onClick: function () { return alert('3'); }, tappable: true}, "Second Menu 3"))), document.getElementById("menu"));
        };
        SecondPage.prototype.handleHide = function (ev) {
            console.log("B hide");
            ReactDOM.render(React.createElement("p", null), document.getElementById("menu"));
        };
        return SecondPage;
    }(React.Component));
    exports.SecondPage = SecondPage;
});
//# sourceMappingURL=SecondPage.js.map