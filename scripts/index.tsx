import * as cordova from 'cordova';
import * as React from "react";
import * as ReactDOM from "react-dom";

import { StartPage } from './StartPage';

declare var ons:any;

namespace MyApp {

    namespace Application {
        "use strict";

        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }

        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
 
            ReactDOM.render(
                <StartPage></StartPage>, document.getElementById('app') //all future page renders should NOT be on body, but on ID: app
            );
            
            //TODO: custom navigator class w/ basic transitions/stack for single-page app, hide/show backbutton if exists
        }

        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }

        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }

    }
    
    ons.ready(function() {
        Application.initialize();
    });
}

        
