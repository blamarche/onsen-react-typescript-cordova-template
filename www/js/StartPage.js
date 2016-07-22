var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var StartPage = (function (_super) {
        __extends(StartPage, _super);
        function StartPage() {
            _super.apply(this, arguments);
            this.handleClick = function (ev) {
                ons.notification.prompt({ message: 'Menu clicked, what is your name?' })
                    .then(function (name) {
                    ons.notification.alert('Hello ' + name);
                });
            };
        }
        StartPage.prototype.render = function () {
            return React.createElement("ons-page", {id: "startpage"}, React.createElement("ons-toolbar", null, React.createElement("div", {className: "left"}, React.createElement("ons-back-button", null, "Back")), React.createElement("div", {className: "center"}, "Title"), React.createElement("div", {className: "right"}, React.createElement("ons-toolbar-button", null, React.createElement("ons-icon", {icon: "fa-bars", onClick: this.handleClick})))), React.createElement("p", null, "This is a start page. Tap the menu icon"));
        };
        return StartPage;
    }(React.Component));
    exports.StartPage = StartPage;
});
//# sourceMappingURL=StartPage.js.map