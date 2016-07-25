define(["require", "exports", 'react-dom'], function (require, exports, ReactDOM) {
    "use strict";
    var PageManager = (function () {
        /**
         * create a new page manager and call .activate() to hook events
         */
        function PageManager(activate, animationDelayMs) {
            if (activate === void 0) { activate = true; }
            if (animationDelayMs === void 0) { animationDelayMs = 300; }
            this.pages = new Array();
            this.currentPageIndex = -1;
            this.currentPage = null;
            this.lastPageIndex = 0;
            this._inTransition = false;
            this._animationDelayMs = 300;
            if (activate)
                this.activate();
            this.setAnimationDelay(animationDelayMs);
        }
        /**
         * activate enables this page manager's window event hooks. This overrides any previously set window.onpopstate
         */
        PageManager.prototype.activate = function () {
            var _this = this;
            window.onpopstate = function (ev) {
                //this.handleBackClick(ev);
                if (!_this._inTransition) {
                    ev.target.removeEventListener("click", _this.handleBackClick.bind(_this));
                    document.removeEventListener("backbutton", _this.handleBackClick.bind(_this), false);
                    _this.popPage();
                    ev.preventDefault();
                }
            };
        };
        /**
         * setAnimationDelay allows to override the default 300ms page transition speed
         * Note: If overriding this, you should override your css animation speeds to the same value
         */
        PageManager.prototype.setAnimationDelay = function (delayms) {
            this._animationDelayMs = delayms;
        };
        /**
         * pushPage pushes in a new page to the navigation stack.
         * (optional) animation can be slideIn, fadeIn
         * (optional) page options can have a title and url to set when the page shows
         */
        PageManager.prototype.pushPage = function (page, callback, animation, options) {
            if (animation === void 0) { animation = "slideIn"; }
            if (options === void 0) { options = { title: "", urlpath: "" }; }
            if (page == null || this._inTransition)
                return false;
            if (options.title == "")
                options.title = Math.random().toString();
            if (options.urlpath == "")
                options.urlpath = "/" + Math.random().toString();
            //find and hook back button if it exists
            var back = page.querySelector("ons-back-button");
            if (back != null) {
                //TODO: handle back key press from android
                back.addEventListener("click", this.handleBackClick.bind(this));
                document.addEventListener("backbutton", this.handleBackClick.bind(this), false);
            }
            var anim = animation;
            if (this.pages.length == 0)
                anim = "";
            page.setAttribute("data-title", options.title);
            page.setAttribute("data-urlpath", options.urlpath);
            this.pages.push(page);
            this.sendPageEvent(this.currentPage, "hide");
            //this.sendPageEvent(page, "init"); //seems to be handled by onsen ui
            this.setPageIndex(this.pages.length - 1, anim, callback);
            window.history.pushState({}, options.title, options.urlpath);
            return true;
        };
        /**
         * pushPageId pushes in a new page to the navigation stack if the dom id can be found
         */
        PageManager.prototype.pushPageId = function (pageContainerId, callback, animation) {
            if (animation === void 0) { animation = "slideIn"; }
            var page = document.getElementById(pageContainerId);
            return this.pushPage(page, callback, animation);
        };
        /**
         * countPages returns the number of pages in the stack
         */
        PageManager.prototype.countPages = function () {
            return this.pages.length;
        };
        /**
         * popPage removes the current page from the navigation stack
         * (optional) animation can be slideOut, fadeOut
         */
        PageManager.prototype.popPage = function (callback, animation) {
            if (animation === void 0) { animation = "slideOut"; }
            if (this.pages.length > 0 && !this._inTransition) {
                var page = this.pages.pop();
                this.sendPageEvent(page, "hide");
                this.sendPageEvent(page, "destroy");
                if (this.pages.length == 0) {
                    document.getElementById("app").removeChild(page);
                    ReactDOM.unmountComponentAtNode(page);
                    if (callback)
                        callback();
                }
                else {
                    this.setPageIndex(this.pages.length - 1, animation, callback);
                }
                if (this.pages.length == 0) {
                    this.currentPageIndex = -1;
                    this.currentPage = null;
                }
                return true;
            }
            return false;
        };
        /**
         * setPageIndex animates out the current page (if set) and shows the new page
         * then sets up back button events, hides button if first page
         */
        PageManager.prototype.setPageIndex = function (index, anim, callback) {
            var _this = this;
            if (index >= 0 && index < this.pages.length && this.currentPageIndex != index) {
                var sendShowEvent = false;
                if (this.currentPage != null) {
                    this.lastPageIndex = this.currentPageIndex;
                    this.currentPage.classList.remove("slideIn");
                    this.currentPage.classList.remove("slideOut");
                    this.currentPage.classList.remove("fadeIn");
                    this.currentPage.classList.remove("fadeOut");
                    if (anim == "slideOut" || anim == "fadeOut") {
                        sendShowEvent = true;
                        this.currentPage.classList.add(anim);
                        this.currentPage.classList.add("top");
                        var outpg = this.currentPage;
                        this._inTransition = true;
                        setTimeout(function () {
                            document.getElementById("app").removeChild(outpg);
                            ReactDOM.unmountComponentAtNode(outpg);
                            _this._inTransition = false;
                            if (callback)
                                callback();
                        }, this._animationDelayMs);
                    }
                    else if (anim == "" || anim == "swap") {
                        document.getElementById("app").removeChild(this.currentPage);
                        if (anim != "swap")
                            ReactDOM.unmountComponentAtNode(this.currentPage);
                    }
                }
                else {
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
                if (back != null) {
                    if (this.currentPageIndex == 0)
                        back.className += " hidden";
                }
                document.getElementById("app").appendChild(this.currentPage);
                document.title = this.currentPage.getAttribute("data-title");
                if (anim == "slideIn" || anim == "fadeIn") {
                    var outpg = this.pages[this.lastPageIndex];
                    this.currentPage.classList.add(anim);
                    this.currentPage.classList.add("top");
                    this._inTransition = true;
                    setTimeout(function () {
                        document.getElementById("app").removeChild(outpg);
                        //ReactDOM.unmountComponentAtNode(outpg);
                        _this.currentPage.classList.remove("top");
                        _this._inTransition = false;
                        if (callback)
                            callback();
                    }, this._animationDelayMs);
                }
                else if (anim == "" && this.pages[this.lastPageIndex] != this.currentPage) {
                    document.getElementById("app").removeChild(this.pages[this.lastPageIndex]);
                    //ReactDOM.unmountComponentAtNode(this.pages[this.lastPageIndex]);
                    if (callback)
                        callback();
                }
                else {
                    if (callback)
                        callback();
                }
            }
        };
        /**
         * renderPage renders the passed react element into a div container for use with
         * pushPage, etc.
         */
        PageManager.prototype.renderPage = function (element, callback) {
            var p = document.createElement("div");
            p.classList.add("page-container");
            var c = ReactDOM.render(element, p, callback);
            return { "page": p, "component": c };
        };
        PageManager.prototype.sendPageEvent = function (page, eventname) {
            var evt = new Event(eventname);
            if (page && page.childNodes && page.childNodes.item(0))
                page.childNodes.item(0).dispatchEvent(evt);
        };
        PageManager.prototype.handleBackClick = function (ev) {
            if (!this._inTransition) {
                window.history.back();
            }
        };
        return PageManager;
    }());
    exports.PageManager = PageManager;
});
//# sourceMappingURL=PageManager.js.map