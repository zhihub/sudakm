var Floater = (function(){
 var me = Class.create();
 me.prototype = {
     initialize: function(options) {
         this._fS = BindAsEventListener(this, this.addjustPosition);
         this.setOptions(options);
     },
     setOptions: function(options) {
         this.options = options || {};
         this._id = options.id;
         this._mark = 'mark';
     },
     show: function(html,options) {
         options = options || {};
         if(!this._cover){
             this._createCover();
         }
         if(!this._floater){
             this._createFloater(html);
         }
         if(options.saveOpt){
             this._saveOption = options.saveOpt;
             this.bindSaveEvent();
         }
         this._bindScrollEvent();
         this.addjustPosition();
         this._floater.style.display = '';
         this._cover.style.display = '';
         this.isShow = true;
     },
     insert: function(html,opts,att){
         var _e = document.createElement("div"), _t;
         _e.innerHTML = html;
         for(var k in opts){
             _e[k] = opts[k];
         }
         _t = this._floater.querySelector('['+att+']');
         if(_t){
             _t.appendChild(_e);
         }
     },
     getFloater: function(){
         if(this._floater){
             return this._floater;
         }
     },
     //遮罩层
     _createCover: function() {
         var newMask = document.createElement("div");
         newMask.id = this._mark;
         newMask.style.position = "absolute";
         newMask.style.zIndex = "100";
         _scrollWidth = Math.max(document.body.scrollWidth,document.documentElement.scrollWidth);
         _scrollHeight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
         newMask.style.width = _scrollWidth + "px";
         newMask.style.height = _scrollHeight + "px";
         newMask.style.top = "0px";
         newMask.style.left = "0px";
         newMask.style.background = "#000";
         newMask.style.filter = "alpha(opacity=50)";
         newMask.style.opacity = "0.50";
         newMask.style.display = 'none';
         document.body.appendChild(newMask);
         this._cover = newMask;
     },
     //新弹出层
     _createFloater: function(html) {
         var newDiv = document.createElement("div");
         newDiv.id = this._id;
         newDiv.style.position = "absolute";
         newDiv.style.zIndex = "9999";
         newDivWidth = 400;
         newDivHeight = 200;
         newDiv.style.width = newDivWidth + "px";
         newDiv.style.height = newDivHeight + "px";
         newDiv.style.top = (document.body.scrollTop + document.body.clientHeight/2 - newDivHeight/2) + "px";
         newDiv.style.left = (document.body.scrollLeft + document.body.clientWidth/2 - newDivWidth/2) + "px";
         newDiv.style.padding = "5px";
         newDiv.style.display = 'none';
         newDiv.innerHTML = html;
         document.body.appendChild(newDiv);
         this._floater = newDiv;
     },
     //弹出层滚动居中
     addjustPosition: function() {
         this._floater.style.top = (document.body.scrollTop + document.body.clientHeight/2 - newDivHeight/2) + "px";
         this._floater.style.left = (document.body.scrollLeft + document.body.clientWidth/2 - newDivWidth/2) + "px";
     },
     bindSaveEvent: function() {
         this._saveElem = this._floater.querySelector('['+this._saveOption.elem+']');
         if(this._saveElem){
             addEventHandler(this._saveElem, "click", this._saveOption.handler);
         }
     },
     _bindScrollEvent: function() {
         addEventHandler(window, "scroll", this._fS);
     },
     hide: function() {
         this.isShow = false;
         this.destory();
     },
     destory: function() {
         removeEventHandler(window, "scroll", this._fS);
         if(this._saveElem){
             removeEventHandler(this._saveElem, "click", this._saveOption.handler);
         }
         if (this._cover){
             document.body.removeChild(this._cover);
         }
         if (this._floater){
             document.body.removeChild(this._floater);
         }
         this._cover = null;
         this._floater = null;
     }
 };
 return me;
 })();
