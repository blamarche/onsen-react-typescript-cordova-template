import * as React from "react";
import * as ReactDOM from "react-dom"

declare var ons:any;

export interface StartPageProps {  }

export class StartPage extends React.Component<StartPageProps, {}> {
    render() {
        return <ons-page id="startpage">
                <ons-toolbar>
                <div className="left">
                    <ons-back-button>Back</ons-back-button>
                </div> 
                <div className="center">Title</div>
                <div className="right">
                    <ons-toolbar-button>
                    <ons-icon icon="fa-bars" onClick={this.handleClick} />
                    </ons-toolbar-button>
                </div>
                </ons-toolbar>
                <p>This is a start page. Tap the menu icon</p>
            </ons-page>;
    }

    private handleClick = (ev:Event) => {
        ons.notification.prompt({message: 'Menu clicked, what is your name?'})
            .then(function(name:any) {
            ons.notification.alert('Hello ' + name);
        });
    }
}   