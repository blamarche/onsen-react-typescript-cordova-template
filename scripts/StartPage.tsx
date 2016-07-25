import {pageManager} from './Shared';
import * as React from "react";
import * as ReactDOM from "react-dom"
import {SecondPage} from "./SecondPage"
import {MainMenu} from "./MainMenu"

export interface StartPageProps {  }

export class StartPage extends React.Component<StartPageProps, {}> {
    private _el:Element;

    render() {
        return <ons-page id="startpage" ref={(c:Element) => this._el = c}>
                <ons-toolbar>
                <div className="left">
                    <ons-back-button>Back</ons-back-button>
                </div> 
                <div className="center">Start Page</div>
                <div className="right">
                    <ons-toolbar-button>
                        <ons-icon icon="fa-bars" onClick={this.handleClick} />
                    </ons-toolbar-button>
                </div>
                </ons-toolbar>
                <ons-list>
                    <ons-list-header>Default</ons-list-header>
                    <ons-list-item>Item A</ons-list-item>
                    <ons-list-item>Item B</ons-list-item>

                    <ons-list-header>Tappable / Ripple</ons-list-header>
                    <ons-list-item tappable>Tap me</ons-list-item>

                    <ons-list-header>Chevron</ons-list-header>
                    <ons-list-item modifier="chevron" tappable>Chevron</ons-list-item>

                    <ons-list-header>Thumbnails and titles</ons-list-header>
                    <ons-list-item>
                    <div className="left"> 
                        <img className="list__item__thumbnail" src="img/logo.png" />
                    </div>
                    <div className="center">
                        <span className="list__item__title">Cutest kitty</span><span className="list__item__subtitle">On the Internet</span>
                    </div>
                    </ons-list-item>

                    <ons-list-header>Icons</ons-list-header>
                    <ons-list-item>
                    <div className="left">
                        <ons-icon icon="md-face" className="list__item__icon"></ons-icon>
                    </div>
                    <div className="center">
                        Icon
                    </div>
                    </ons-list-item>

                    <ons-list-header>Switch</ons-list-header>
                    <ons-list-item>
                    <div className="center">
                        Turn it on
                    </div>
                    <div className="right">
                        <ons-switch></ons-switch>
                    </div>
                    </ons-list-item>

                    <ons-list-header>Switch and icon</ons-list-header>
                    <ons-list-item>
                    <div className="left">
                        <ons-icon icon="md-face" className="list__item__icon"></ons-icon>
                    </div>
                    <div className="center">
                        Icon and switch
                    </div>
                    <div className="right">
                        <ons-switch></ons-switch>
                    </div>
                    </ons-list-item>

                    <ons-list-header>No divider</ons-list-header>
                    <ons-list-item modifier="nodivider">Item A</ons-list-item>
                    <ons-list-item modifier="nodivider">Item B</ons-list-item>

                    <ons-list-header>Long divider</ons-list-header>
                    <ons-list-item modifier="longdivider">Item A</ons-list-item>
                    <ons-list-item modifier="longdivider">Item B</ons-list-item>
                </ons-list>
                
            </ons-page>;
    }

    public componentDidMount = () => {
        this._el.addEventListener("init", this.handleInit.bind(this));
        this._el.addEventListener("destroy", this.handleDestroy.bind(this));
        this._el.addEventListener("show", this.handleShow.bind(this));
        this._el.addEventListener("hide", this.handleHide.bind(this));
    }

    private handleClick = (ev:Event) => {
        pageManager.pushPage(pageManager.renderPage(
            <SecondPage></SecondPage>
        ).page);
    }

    private handleInit(ev:Event) {
        console.log("A init");
    }

    private handleDestroy(ev:Event) {
        console.log("A destroy");
    }

    private handleShow(ev:Event) {
        console.log("A show");
        ReactDOM.render(<MainMenu></MainMenu>, document.getElementById("menu"));
    }

    private handleHide(ev:Event) {
        console.log("A hide");
    }
}   