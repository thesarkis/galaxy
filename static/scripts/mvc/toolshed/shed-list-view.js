define("mvc/toolshed/shed-list-view",["exports","utils/localization","mvc/toolshed/toolshed-model","mvc/toolshed/util"],function(e,t,s,i){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var d=l(t),o=l(s),a=l(i),n=Backbone.View.extend({defaults:{tool_sheds:[{url:"https://toolshed.g2.bx.psu.edu/",name:"Galaxy Main Tool Shed"}]},initialize:function(e){this.options=_.defaults(this.options||{},this.defaults),this.model=new o.default.ShedsCollection,this.listenTo(this.model,"sync",this.render),this.model.fetch()},el:"#center",render:function(e){this.options=_.defaults(this.options||{},e,this.defaults);var t=this.templateToolshedList;this.$el.html(t({title:(0,d.default)("Configured Galaxy Tool Sheds"),tool_sheds:this.model.models,queue:a.default.queueLength()}))},reDraw:function(e){this.$el.empty(),this.render(e)},templateToolshedList:_.template(['<div class="unified-panel-header" id="panel_header" unselectable="on">','<div class="unified-panel-header-inner"><%= title %></div>','<div class="unified-panel-header-inner" style="position: absolute; right: 5px; top: 0px;"><a href="#/queue">Repository Queue (<%= queue %>)</a></div>',"</div>",'<div class="unified-panel-body" id="list_toolsheds">','<div class="form-row">','<table class="grid">',"<% _.each(tool_sheds, function(shed) { %>",'<tr class="libraryTitle">',"<td>",'<div style="float: left; margin-left: 1px;" class="menubutton split">','<a class="view-info shed-selector" href="#/categories/s/<%= shed.get("url") %>"><%= shed.get("name") %></a>',"</div>","</td>","</tr>","<% }); %>","</table>","</div>",'<div style="clear: both"></div>',"</div>"].join(""))});e.default={ShedListView:n}});
//# sourceMappingURL=../../../maps/mvc/toolshed/shed-list-view.js.map
