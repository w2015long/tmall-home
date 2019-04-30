require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var _order = require('service/order')
var _util = require('util');
var _modal = require('./modal.js')
var _shopping = require('service/shopping')

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
		_shopping.getShopping(function(address){
			console.log(address)
			this.renderShopping(address)
		}.bind(this),function(msg){
			_util.showErrorMsg(msg)
		})

	},
	renderShopping:function(address){
		var html = _util.templateRender(shoppingtpl,{address:address});
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
		var _this = this;
		//1.弹出地址框
		this.$shopping.on('click','.shopping-add',function(){
			_modal.showModal();
		});

		//2. 渲染新增的地址
		this.$shopping.on('render-address',function(ev,address){
			this.renderShopping(address)
		}.bind(this))
		//3. 删除地址
		this.$shopping.on('click','.shopping-delete',function(){
			if(_util.confirm('你确定删除此条地址吗?')){
				var shoppingId = $(this).parents('.shopping-item').data('shopping-id')
				_shopping.deleteAddress({shoppingId:shoppingId},function(address){
					_this.renderShopping(address)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		});	
		//4. 编辑地址
		
		
		//5. 选择地址	
	}

}

$(function(){
	silence.init()
})
