require('./index.css')
var tpl = require('./index.tpl');

;(function($){
	function Pagination($elem){
		this.$elem = $elem;
		this.bindEvent();
	}	
	Pagination.prototype = {
		constructor:Pagination,
		bindEvent:function(){

		},
		render:function(options){
			console.log(options)
		}
	}
	Pagination.DEFAULTS = {
		length:
	}

	//注册插件
	$.fn.extend({
		pagination:function(fn,options){
			return this.each(function(){
				var $elem = $(this);
				var paginationObj = $elem.data('pagination');
				if(!paginationObj){
					options = $.extend({},Pagination.DEFAULTS,options);
					paginationObj = new Pagination($elem);
					$elem.data('pagination',paginationObj)
				}
				if(typeof paginationObj[options]=='function'){
					paginationObj[options]()
				}
			})
		}
	})
})(jQuery)