require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var _order = require('service/order')
var _util = require('util');
var _modal = require('./modal.js')

var shoppingtpl = require('./shopping.tpl');
var producttpl = require('./product.tpl');


var silence = {
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.$shopping = $('.shopping-box');
		this.$product = $('.product-box');
		this.loadShopping();
		this.loadProductList();
	},
	loadShopping:function(){
		var html = _util.templateRender(shoppingtpl);
		this.$shopping.html(html);
	},
	loadProductList:function(){
		_order.getOrderProductList(function(cart){
			if(cart.cartList.length>=1){
				console.log('productCart',cart)
				//处理图片
				cart.cartList.forEach(function(item){
					item.product.mainImg = item.product.images.split(',')[0];
				})
				var html = _util.templateRender(producttpl,cart);
				this.$product.html(html)
			}else{
				this.$product.html('<p class="empty-message">购物车空空如也，赶快去购物！！</p>')
			}
		}.bind(this),function(){
			this.$product.html('<p class="empty-message">加载购物信息失败！!！</p>')
		}.bind(this))
	},	
	bindEvent:function(){
		this.$shopping.on('click','.shopping-add',function(){
			_modal.showModal();
		});
	}

}

$(function(){
	silence.init()
})
