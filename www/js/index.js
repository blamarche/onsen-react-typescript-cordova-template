define(["require", "exports", "react", "react-dom", './StartPage'], function (require, exports, React, ReactDOM, StartPage_1) {
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
                ReactDOM.render(React.createElement(StartPage_1.StartPage, null), document.getElementById('app') //all future page renders should NOT be on body, but on ID: app
                );
                //TODO: custom navigator class w/ basic transitions/stack for single-page app, hide/show backbutton if exists
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