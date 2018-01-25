define("mvc/history/hdca-li-edit",["exports","mvc/history/hdca-li","mvc/collection/collection-view-edit","ui/fa-icon-button","utils/localization"],function(e,t,n,l,i){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var a=o(t),d=o(n),s=(o(l),o(i)),c=a.default.HDCAListItemView,r=c.extend({initialize:function(e){c.prototype.initialize.call(this,e),this.purgeAllowed=e.purgeAllowed||!1},_getFoldoutPanelClass:function(){return d.default.CollectionViewEdit},_renderPrimaryActions:function(){return this.log(this+"._renderPrimaryActions"),c.prototype._renderPrimaryActions.call(this).concat([this._renderDeleteButton()])},_renderDeleteButton:function(){return $('\n                <div class="dropdown">\n                    <a class="delete-btn icon-btn" title="'+(0,s.default)("Delete")+'" data-toggle="dropdown">\n                        <span class="fa fa-times"></span>\n                    </a>\n                    <ul class="dropdown-menu pull-right" role="menu">\n                        <li>\n                            <a href="" class="delete-collection">\n                                '+(0,s.default)("Collection Only")+'\n                            </a>\n                        </li>\n                        <li>\n                            <a href="" class="delete-collection-and-datasets">\n                                '+(0,s.default)("Delete Datasets")+'\n                            </a>\n                        </li>\n                        <li style="display: '+(this.purgeAllowed?"inherit":"none")+'">\n                            <a href="" class="delete-collection-and-purge-datasets">\n                                '+(0,s.default)("Permanently Delete Datasets")+"\n                            </a>\n                        </li>\n                    </ul>\n                </div>")},events:_.extend(_.clone(c.prototype.events),{"click .delete-collection":function(e){this.model.delete()},"click .delete-collection-and-datasets":function(e){this.model.delete(!0)},"click .delete-collection-and-purge-datasets":function(e){this.model.delete(!0,!0)}}),toString:function(){return"HDCAListItemEdit("+(this.model?""+this.model:"(no model)")+")"}});e.default={HDCAListItemEdit:r}});
//# sourceMappingURL=../../../maps/mvc/history/hdca-li-edit.js.map
