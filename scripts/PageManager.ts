import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface RenderPageResult { page: Element, component:Element }

export interface PageOptions { title:string, urlpath:string }

export class PageManager {
    private pages:Array<Element> = new Array<Element>();
    private currentPageIndex:number = -1;
    private currentPage:Element = null;
    private lastPageIndex:number = 0;

    private _inTransition:boolean = false;
    private _animationDelayMs = 300;

    /** 
     * create a new page manager and call .activate() to hook events
     */
    constructor(activate:boolean = true, animationDelayMs:number = 300) {
        if (activate)
            this.activate();
        this.setAnimationDelay(animationDelayMs);
    }

    /**
     * activate enables this page manager's window event hooks. This overrides any previously set window.onpopstate
     */
    public activate() {
        window.onpopstate = (ev:PopStateEvent) => {
            //this.handleBackClick(ev);
            if (!this._inTransition) {
                ev.target.removeEventListener("click", this.handleBackClick.bind(this));
                document.removeEventListener("backbutton", this.handleBackClick.bind(this), false);
                this.popPage();
                ev.preventDefault();
            }
        }
    }

    /** 
     * setAnimationDelay allows to override the default 300ms page transition speed
     * Note: If overriding this, you should override your css animation speeds to the same value
     */
    public setAnimationDelay(delayms:number) {
        this._animationDelayMs = delayms;
    }
 
    /**
     * pushPage pushes in a new page to the navigation stack. 
     * (optional) animation can be slideIn, fadeIn
     * (optional) page options can have a title and url to set when the page shows
     */
    public pushPage(page:Element, callback?:() => any, animation:string = "slideIn", options:PageOptions = {title:"", urlpath:""}):boolean {
        if (page==null || this._inTransition) return false;
        if (options.title=="") options.title = Math.random().toString();
        if (options.urlpath=="") options.urlpath = "/"+Math.random().toString();
        
        //find and hook back button if it exists
        var back = page.querySelector("ons-back-button");
        if (back!=null) {
            //TODO: handle back key press from android
            back.addEventListener("click", this.handleBackClick.bind(this));
            document.addEventListener("backbutton", this.handleBackClick.bind(this), false);
        }

        var anim:string = animation;
        if (this.pages.length==0) 
            anim = "";

        page.setAttribute("data-title",options.title);
        page.setAttribute("data-urlpath", options.urlpath);

        this.pages.push(page);
        this.sendPageEvent(this.currentPage, "hide");
        //this.sendPageEvent(page, "init"); //seems to be handled by onsen ui
        this.setPageIndex(this.pages.length-1, anim, callback);
        window.history.pushState({}, options.title, options.urlpath);

        return true;
    }

    /**
     * pushPageId pushes in a new page to the navigation stack if the dom id can be found
     */
    public pushPageId(pageContainerId:string, callback?:() => any, animation:string = "slideIn"):boolean {
        var page:HTMLElement = document.getElementById(pageContainerId);
        return this.pushPage(page, callback, animation);
    }

    /**
     * countPages returns the number of pages in the stack
     */
    public countPages():number {
        return this.pages.length;
    }

    /**
     * popPage removes the current page from the navigation stack
     * (optional) animation can be slideOut, fadeOut
     */
    public popPage(callback?:() => any, animation:string = "slideOut"):boolean {        
        if (this.pages.length>0 && !this._inTransition) {
            var page = this.pages.pop();
            this.sendPageEvent(page, "hide");
            this.sendPageEvent(page, "destroy");  
            
            if (this.pages.length==0) {
                document.getElementById("app").removeChild(page);
                ReactDOM.unmountComponentAtNode(page);
                if (callback)
                    callback();
            } else {
                this.setPageIndex(this.pages.length-1, animation, callback);
            }
            
            if (this.pages.length ==0 ) {
                this.currentPageIndex=-1;
                this.currentPage = null;
            }
            return true;
        }
        return false;
    }

    /**
     * setPageIndex animates out the current page (if set) and shows the new page
     * then sets up back button events, hides button if first page
     */
    private setPageIndex(index:number, anim:string, callback?:() => any) {
        if (index>=0 && index<this.pages.length && this.currentPageIndex!=index) {
            var sendShowEvent:boolean = false;
            if (this.currentPage!=null) {
                this.lastPageIndex = this.currentPageIndex;
                this.currentPage.classList.remove("slideIn");
                this.currentPage.classList.remove("slideOut");
                this.currentPage.classList.remove("fadeIn");
                this.currentPage.classList.remove("fadeOut");
                
                if (anim == "slideOut" || anim=="fadeOut") {
                    sendShowEvent = true;
                    this.currentPage.classList.add(anim);                    
                    this.currentPage.classList.add("top");   
                                
                    var outpg = this.currentPage;
                    this._inTransition = true;
                    setTimeout(() => {
                        document.getElementById("app").removeChild(outpg);
                        ReactDOM.unmountComponentAtNode(outpg);
                        this._inTransition = false;
                        if (callback)
                            callback();
                    }, this._animationDelayMs);
                } else if (anim == "" || anim == "swap") {
                    document.getElementById("app").removeChild(this.currentPage);
                    if (anim!="swap")
                        ReactDOM.unmountComponentAtNode(this.currentPage);
                }              
            } else {
                this.lastPageIndex = 0;
                anim = "first";
            }
            
            this.currentPageIndex = index;
            this.currentPage = this.pages[this.currentPageIndex];
            this.currentPage.classList.remove("slideIn");
            this.currentPage.classList.remove("slideOut");
            this.currentPage.classList.remove("fadeOut");
            this.currentPage.classList.remove("fadeIn");
            if (sendShowEvent)
                this.sendPageEvent(this.currentPage, "show"); //seems to be kind of? handled by onsen ui for all but first page?

            var back = this.currentPage.querySelector("ons-back-button");
            if (back!=null) {
                if (this.currentPageIndex==0) 
                    back.className+=" hidden";
            }

            document.getElementById("app").appendChild(this.currentPage);
            document.title = this.currentPage.getAttribute("data-title");

            if (anim == "slideIn"||anim=="fadeIn") {
                var outpg = this.pages[this.lastPageIndex];
                this.currentPage.classList.add(anim);
                this.currentPage.classList.add("top");
                this._inTransition = true;
                setTimeout(() => {
                    document.getElementById("app").removeChild(outpg);
                    //ReactDOM.unmountComponentAtNode(outpg);
                    this.currentPage.classList.remove("top");
                    this._inTransition = false;
                    if (callback)
                            callback();
                }, this._animationDelayMs);    
            } else if (anim=="" && this.pages[this.lastPageIndex]!=this.currentPage) {
                document.getElementById("app").removeChild(this.pages[this.lastPageIndex]);
                //ReactDOM.unmountComponentAtNode(this.pages[this.lastPageIndex]);
                if (callback)
                    callback();
            } else {
                if (callback)
                    callback();
            }            
        }
    }

    /**
     * renderPage renders the passed react element into a div container for use with 
     * pushPage, etc.
     */
    public renderPage(element:any, callback?: (element: Element) => any):RenderPageResult {
        var p = document.createElement("div");
        p.classList.add("page-container");
        var c = ReactDOM.render(element, p, callback);
        return {"page": p, "component": c};
    }

    private sendPageEvent(page:Element, eventname:string) {
        var evt:Event = new Event(eventname);
        if (page && page.childNodes && page.childNodes.item(0))
            page.childNodes.item(0).dispatchEvent(evt);        
    }

    private handleBackClick(ev:Event) {
        if (!this._inTransition) {      
            window.history.back();
        }
    }
}