define(["require", "exports", './StartPage', './Shared', "react"], function (require, exports, StartPage_1, Shared_1, React) {
    "use strict";
    var MyApp;
    (function (MyApp) {
        var Application;
        (function (Application) {
            "use strict";
            function initialize() {
                document.addEventListener('deviceready', onDeviceReady, false);
            }
            Application.initialize = initialize;
            function onDeviceReady() {
                // Handle the Cordova pause and resume events
                document.addEventListener('pause', onPause, false);
                document.addEventListener('resume', onResume, false);
                var w = window;
                w.pageManager = Shared_1.pageManager;
                Shared_1.pageManager.pushPage(Shared_1.pageManager.renderPage(React.createElement(StartPage_1.StartPage, null)).page, function () { }, "", { title: "Start Page", urlpath: "/" });
            }
            function onPause() {
                // TODO: This application has been suspended. Save application state here.
            }
            function onResume() {
                // TODO: This application has been reactivated. Restore application state here.
            }
        })(Application || (Application = {}));
        ons.ready(function () {
            Application.initialize();
        });
    })(MyApp || (MyApp = {}));
});
//# sourceMappingURL=index.js.map