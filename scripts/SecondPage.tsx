import {pageManager} from './Shared';
import * as React from "react";
import * as ReactDOM from "react-dom"

declare var ons:any;

export interface SecondPageProps {  }

export class SecondPage extends React.Component<SecondPageProps, {}> {
    private _el:Element;
    
    render() {
        //create a page with some long text, use ref= and componentDidMount
        //to hook page lifecycle event listeners
        return <ons-page id="secondpage" ref={(c:Element) => this._el = c}>
                <ons-toolbar>
                <div className="left">
                    <ons-back-button>Back</ons-back-button>
                </div> 
                <div className="center">Second Page</div>
                <div className="right">
                    <ons-toolbar-button>
                    <ons-icon icon="fa-bars" onClick={this.handleClick} />
                    </ons-toolbar-button>
                </div>
                </ons-toolbar>
                <p>This is a secondary page thats very long. Tap the menu icon to see a temp page</p>
                <p>This is a secondary page thats very long. Tap the menu icon to see a temp page</p>
                <p>This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. 
                This is a secondary page thats very long. Tap the menu icon to see a temp page. </p>
                <p>This is a secondary page thats very long. Tap the menu icon to see a temp page</p>
                <p>This is a secondary page thats very long. Tap the menu icon to see a temp page</p>
            </ons-page>;
    }

    public componentDidMount = () => {
        //hook our elements lifecycle events and bind to this class instance
        this._el.addEventListener("init", this.handleInit.bind(this));
        this._el.addEventListener("destroy", this.handleDestroy.bind(this));
        this._el.addEventListener("show", this.handleShow.bind(this));
        this._el.addEventListener("hide", this.handleHide.bind(this));
    }

    private handleClick = (ev:Event) => {
        //menu click generate a dynamic page with any predifined react class
        ons.notification.prompt({message: 'Menu clicked, what is your name?'}).then(function(name:any) {
            ons.notification.alert('Hello ' + name);
            
            //render a temp page
            var p = pageManager.renderPage(
                <ons-page id={name}>
                    <ons-toolbar>
                        <div className="left">
                            <ons-back-button>Back</ons-back-button>
                        </div> 
                        <div className="center">Temp Page</div>
                        <div className="right">
                            <ons-toolbar-button>
                            <ons-icon icon="fa-bars" />
                            </ons-toolbar-button>
                        </div>
                    </ons-toolbar>
                    {name}
                </ons-page>
            );
            pageManager.pushPage(p.page, ()=>{}, "fadeIn", {title:"Temporary page", urlpath:"/temp-page"});
        });
    }

    private handleInit(ev:Event) {
        console.log("B init");
    }

    private handleDestroy(ev:Event) {
        console.log("B destroy");
    }

    private handleShow(ev:Event) {
        console.log("B show"); 
        ReactDOM.render(<ons-page>
            <ons-list>
                <ons-list-item onClick={()=>alert('1')} tappable>
                    Second Menu 1
                </ons-list-item>
                <ons-list-item onClick={()=>alert('2')} tappable>
                    Second Menu 2
                </ons-list-item>
                <ons-list-item onClick={()=>alert('3')} tappable>
                    Second Menu 3
                </ons-list-item>
            </ons-list>
        </ons-page>, document.getElementById("menu"));
    }

    private handleHide(ev:Event) {
        console.log("B hide");
        ReactDOM.render(<p></p>, document.getElementById("menu"));
    }
}   