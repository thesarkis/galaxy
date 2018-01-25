define("mvc/history/history-model",["exports","mvc/history/history-contents","mvc/base/controlled-fetch-collection","utils/utils","mvc/base-mvc","utils/localization","libs/underscore","libs/backbone"],function(t,e,n,i,r,s,o,u){"use strict";function a(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function c(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var d=c(e),l=c(n),h=c(i),f=c(r),p=c(s),g=a(o),y=a(u),m=y.Model.extend(f.default.LoggableMixin).extend(f.default.mixin(f.default.SearchableModelMixin,{_logNamespace:"history",UPDATE_DELAY:4e3,defaults:{model_class:"History",id:null,name:"Unnamed History",state:"new",deleted:!1,contents_active:{},contents_states:{}},urlRoot:Galaxy.root+"api/histories",contentsClass:d.default.HistoryContents,searchAttributes:["name","annotation","tags"],searchAliases:{title:"name",tag:"tags"},initialize:function(t,e){e=e||{},this.logger=e.logger||null,this.log(this+".initialize:",t,e),this.contents=new this.contentsClass([],{history:this,historyId:this.get("id"),order:e.order}),this._setUpListeners(),this._setUpCollectionListeners(),this.updateTimeoutId=null},_setUpListeners:function(){return this.on({error:function(t,e,n,i,r){this.clearUpdateTimeout()},"change:id":function(t,e){this.contents&&(this.contents.historyId=e)}})},_setUpCollectionListeners:function(){return this.contents?this.listenTo(this.contents,{error:function(){this.trigger.apply(this,jQuery.makeArray(arguments))}}):this},contentsShown:function(){var t=this.get("contents_active"),e=t.active||0;return e+=this.contents.includeDeleted?t.deleted:0,e+=this.contents.includeHidden?t.hidden:0},nice_size:function(){var t=this.get("size");return t?h.default.bytesToString(t,!0,2):(0,p.default)("(empty)")},toJSON:function(){return g.extend(y.Model.prototype.toJSON.call(this),{nice_size:this.nice_size()})},get:function(t){return"nice_size"===t?this.nice_size():y.Model.prototype.get.apply(this,arguments)},ownedByCurrUser:function(){return!(!Galaxy||!Galaxy.user)&&(!Galaxy.user.isAnonymous()&&Galaxy.user.id===this.get("user_id"))},numOfUnfinishedJobs:function(){var t=this.get("non_ready_jobs");return t?t.length:0},numOfUnfinishedShownContents:function(){return this.contents.runningAndActive().length||0},_fetchContentRelatedAttributes:function(){var t=["size","non_ready_jobs","contents_active","hid_counter"];return this.fetch({data:jQuery.param({keys:t.join(",")})})},refresh:function(t){var e=this;t=t||{};var n=this.lastUpdateTime;return this.contents.allFetched=!1,(0!==this.contents.currentPage?function(){return e.contents.fetchPage(e.contents.currentPage)}:function(){return e.contents.fetchUpdated(n)})().done(function(n,i,r){var s;try{s=new Date(r.getResponseHeader("Date"))}catch(t){console.error(t)}e.lastUpdateTime=s||new Date,e.checkForUpdates(t)})},checkForUpdates:function(t){var e=this;t=t||{};var n=this.UPDATE_DELAY;if(this.id){var i=function(){e.clearUpdateTimeout(),e.updateTimeoutId=setTimeout(function(){e.refresh(t)},n)};this.numOfUnfinishedShownContents()>0?i():this._fetchContentRelatedAttributes().done(function(t){e.numOfUnfinishedJobs()>0?i():e.trigger("ready")})}},clearUpdateTimeout:function(){this.updateTimeoutId&&(clearTimeout(this.updateTimeoutId),this.updateTimeoutId=null)},stopPolling:function(){this.clearUpdateTimeout(),this.contents&&this.contents.stopPolling()},parse:function(t,e){var n=y.Model.prototype.parse.call(this,t,e);return n.create_time&&(n.create_time=new Date(n.create_time)),n.update_time&&(n.update_time=new Date(n.update_time)),n},fetchWithContents:function(t,e){var n=this;return(t=t||{}).view="dev-detailed",this.fetch(t).then(function(t){return n.contents.history=n,n.contents.setHistoryId(t.id),n.fetchContents(e)})},fetchContents:function(t){return t=t||{},this.lastUpdateTime=new Date,this.contents.fetchCurrentPage(t)},_delete:function(t){return this.get("deleted")?jQuery.when():this.save({deleted:!0},t)},purge:function(t){return this.get("purged")?jQuery.when():this.save({deleted:!0,purged:!0},t)},undelete:function(t){return this.get("deleted")?this.save({deleted:!1},t):jQuery.when()},copy:function(t,e,n){if(t=void 0===t||t,!this.id)throw new Error("You must set the history ID before copying it.");var i={history_id:this.id};t&&(i.current=!0),e&&(i.name=e),n||(i.all_datasets=!1),i.view="dev-detailed";var r=this,s=jQuery.post(this.urlRoot,i);return t?s.then(function(t){return new m(t).setAsCurrent().done(function(){r.trigger("copied",r,t)})}):s.done(function(t){r.trigger("copied",r,t)})},setAsCurrent:function(){var t=this,e=jQuery.getJSON(Galaxy.root+"history/set_as_current?id="+this.id);return e.done(function(){t.trigger("set-as-current",t)}),e},toString:function(){return"History("+this.get("id")+","+this.get("name")+")"}})),_=l.default.InfinitelyScrollingCollection,v=_.extend(f.default.LoggableMixin).extend({_logNamespace:"history",model:m,order:"update_time",limitOnFirstFetch:10,limitPerFetch:10,initialize:function(t,e){e=e||{},this.log("HistoryCollection.initialize",t,e),_.prototype.initialize.call(this,t,e),this.includeDeleted=e.includeDeleted||!1,this.currentHistoryId=e.currentHistoryId,this.setUpListeners()},urlRoot:Galaxy.root+"api/histories",url:function(){return this.urlRoot},setUpListeners:function(){return this.on({"change:deleted":function(t){this.debug("change:deleted",this.includeDeleted,t.get("deleted")),!this.includeDeleted&&t.get("deleted")&&this.remove(t)},copied:function(t,e){this.setCurrent(new m(e,[]))},"set-as-current":function(t){var e=this.currentHistoryId;this.trigger("no-longer-current",e),this.currentHistoryId=t.id}})},_buildFetchData:function(t){return g.extend(_.prototype._buildFetchData.call(this,t),{view:"dev-detailed"})},_buildFetchFilters:function(t){var e=_.prototype._buildFetchFilters.call(this,t)||{},n={};return!0!==this.includeDeleted?(n.deleted=!1,n.purged=!1):n.deleted=null,g.defaults(e,n)},fetchFirst:function(t){var e=this,n=jQuery.when();return this.currentHistoryId&&(n=_.prototype.fetchFirst.call(this,{silent:!0,limit:1,filters:{"encoded_id-in":this.currentHistoryId,deleted:null,purged:""}})),n.then(function(){return t=t||{},t.offset=0,e.fetchMore(t)})},comparators:g.extend(g.clone(_.prototype.comparators),{name:f.default.buildComparator("name",{ascending:!0}),"name-dsc":f.default.buildComparator("name",{ascending:!1}),size:f.default.buildComparator("size",{ascending:!1}),"size-asc":f.default.buildComparator("size",{ascending:!0})}),sort:function(t){var e=(t=t||{}).silent,n=this.remove(this.get(this.currentHistoryId));return _.prototype.sort.call(this,g.defaults({silent:!0},t)),this.unshift(n,{silent:!0}),e||this.trigger("sort",this,t),this},create:function(t,e,n,i){var r=this;return jQuery.getJSON(Galaxy.root+"history/create_new_current").done(function(t){r.setCurrent(new m(t,[],n||{}))})},setCurrent:function(t,e){return e=e||{},this.unshift(t,e),this.currentHistoryId=t.get("id"),e.silent||this.trigger("new-current",t,this),this},toString:function(){return"HistoryCollection("+this.length+",current:"+this.currentHistoryId+")"}});t.default={History:m,HistoryCollection:v}});
//# sourceMappingURL=../../../maps/mvc/history/history-model.js.map
