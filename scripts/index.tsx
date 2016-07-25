import {StartPage}   from './StartPage';
import {MainMenu}    from './MainMenu';
import {pageManager} from './Shared';

import * as cordova from 'cordova';
import * as React from "react";
import * as ReactDOM from "react-dom";

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

            var w:any = window as any;
            w.pageManager = pageManager;

            pageManager.pushPage(pageManager.renderPage(<StartPage></StartPage>).page, ()=>{}, "", {title:"Start Page", urlpath:"/"});
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

        
