require('./index.css')
var _util = require('util')
var tpl = require('./index.tpl');

;(function($){
	function Pagination($elem){
		this.$elem = $elem;
		this.bindEvent();
	}	
	Pagination.prototype = {
		constructor:Pagination,
		bindEvent:function(){
			var _this = this;
			this.$elem.on('click','.page-item',function(){
				var $this = $(this);
				if($this.hasClass('active') || $this.hasClass('disabled')) return;
				_this.$elem.trigger('change-page',$this.data('value'))
			})
		},
		render:function(options){
			console.log('pagination',options)
			//1. 计算总页数
			var pages = Math.ceil(options.total/options.pageSize);
			if(pages<=1) return
			//2. 自定义显示条数(范围)
			//上一页 1 2 3 *4 5 6 7 下一页
			//上一页 2 3 4 *5 6 7 8 下一页
			//上一页 5 6 7 *8 9 10 11 下一页
			var start = (options.current - options.range)<1 ? 1 : (options.current - options.range);
			var end = (options.current + options.range)>pages ? pages : (options.current + options.range);
			var previous = options.current - 1;
			var next = options.current + 1;
			var pageArray = [];
			pageArray.push({
				name:'上一页',
				value:previous,
				disabled:previous<=0 ? true : false
			});
			for(var i=start;i<=end;i++){
				pageArray.push({
					name:i,
					value:i,
					active:options.current == i ? true : false
				})
			}
			pageArray.push({
				name:'下一页',
				value:next,
				disabled:next>=pages ? true : false			
			})
			//3. 渲染分页组件
			var html = _util.templateRender(tpl,{
				pageArray:pageArray,
				current:options.current,
				pages:pages	
			});
			this.$elem.html(html)

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
					paginationObj = new Pagination($elem);
					$elem.data('pagination',paginationObj)
				}
				if(typeof paginationObj[fn]=='function'){
					options = $.extend({},Pagination.DEFAULTS,options);
					paginationObj[fn](options)
				}
			})
		}
	})
})(jQuery)