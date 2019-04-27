require('pages/common/nav')
require('pages/common/search')
var _product = require('service/product')
var _util = require('util')
require('pages/common/footer')
require('./index.css')
var tpl = require('./index.tpl')
var silence = {
	listParam:{
		keyword:_util.getParamsFromUrl('keyword') || '',
		categoryId:_util.getParamsFromUrl('categoryId') || '',
		orderBy:_util.getParamsFromUrl('orderBy') || 'default',
		page:_util.getParamsFromUrl('page') || '1',
	},
	init:function(){
		this.loadProductLis()
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this
		$('.sort-item').on('click',function(){
			var $this = $(this);
			//默认排序
			if($this.hasClass('default')){
				if($this.hasClass('active')) return
				$this.addClass('active')
				.siblings('.sort-item')	
				.removeClass('active');

				_this.listParam.orderBy = 'default';
			}//价格排序
			else if($this.hasClass('price')){
				//价格排序可以多次点击(其中可以升序/降序)
				$this.addClass('active')
				.siblings('.sort-item')	
				.removeClass('active');
				if(!$this.hasClass('asc')){
					$this.addClass('asc')
					.removeClass('desc');

					_this.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc')
					.removeClass('asc');

					_this.listParam.orderBy = 'price_desc';					
				}

			}
				
		})
	},
	loadProductLis:function(){
		this.listParam.keyword ? (delete this.listParam.categoryId) : (delete this.listParam.keyword)
		// 请求后台数据
		// console.log(this.listParam)
		_product.getProductList(this.listParam,function(result){
			result.list.forEach(function(product){
				product.image = product.images.split(',')[0] 
			})

			var html = _util.templateRender(tpl,{list:result.list})
			$('.product-list-box').html(html)
		},function(msg){
			_util.showErrorMsg(msg)
		})		
	}
}

$(function(){
	silence.init()
})
