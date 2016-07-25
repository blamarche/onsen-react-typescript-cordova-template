import * as React from "react"
import * as ReactDOM from "react-dom"

export interface MenuProps {}

export class MainMenu extends React.Component<MenuProps, {}> {
    render() {
        return <ons-page>
                <ons-list> 
                    <ons-list-item onClick={()=>alert('home')} tappable>
                        Home
                    </ons-list-item>
                    <ons-list-item onClick={()=>alert('settings')} tappable>
                        Settings
                    </ons-list-item>
                    <ons-list-item onClick={()=>alert('about')} tappable>
                        About
                    </ons-list-item>
                </ons-list>
            </ons-page>
    }
}