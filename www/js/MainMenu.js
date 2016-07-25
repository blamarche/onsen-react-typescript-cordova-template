var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.render = function () {
            return React.createElement("ons-page", null, React.createElement("ons-list", null, React.createElement("ons-list-item", {onClick: function () { return alert('home'); }, tappable: true}, "Home"), React.createElement("ons-list-item", {onClick: function () { return alert('settings'); }, tappable: true}, "Settings"), React.createElement("ons-list-item", {onClick: function () { return alert('about'); }, tappable: true}, "About")));
        };
        return MainMenu;
    }(React.Component));
    exports.MainMenu = MainMenu;
});
//# sourceMappingURL=MainMenu.js.map