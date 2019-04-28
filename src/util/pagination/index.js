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
			//1. 计算总页数
			var pages = Math.ceil(options.total/options.pageSize);
			if(pages<=1) return
			//2. 自定义显示条数(范围)
			//上一页 1 2 3 *4 5 6 7 下一页
			//上一页 2 3 4 *5 6 7 8 下一页
			//上一页 5 6 7 *8 9 10 11 下一页
			var start = (options.current - options.range)<1 ? 1 : (options.current - options.range);
			var end = (options.current + options.range)>pages ? pages : (options.current + options.range);
			var prev = option.current - 1;
			var next = option.current + 1;

			var pageArray = [];
			pageArray.push({
				name:'上一页',
				vaule:prev,
				disabled:prev<=0 ? true : false
			})
			//3. 渲染分页组件
		}
	}
	Pagination.DEFAULTS = {
		range:3,
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
				if(typeof paginationObj[fn]=='function'){
					paginationObj[fn](options)
				}
			})
		}
	})
})(jQuery)