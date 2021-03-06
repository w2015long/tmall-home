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
		this.selectId = '';
		this.loadShopping();
		this.loadProductList();
	},
	loadShopping:function(){
		_shopping.getShopping(function(addressInfo){
			this.renderShopping(addressInfo)
		}.bind(this),function(msg){
			_util.showErrorMsg(msg)
		})

	},
	renderShopping:function(addressInfo){
		//渲染页面再加个字段 active
		addressInfo.forEach(function(item){
			if(item._id == this.selectId){
				item.active = true;
			}			
		}.bind(this))

		var html = _util.templateRender(shoppingtpl,{addressInfo:addressInfo});
		this.$shopping.html(html);
		// console.log('addressInfo',addressInfo);
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
		this.$shopping.on('render-address',function(ev,addressInfo){
			this.renderShopping(addressInfo)
		}.bind(this))
		//3. 删除地址
		this.$shopping.on('click','.shopping-delete',function(ev){
			ev.stopPropagation();
			if(_util.confirm('你确定删除此条地址吗?')){
				var shoppingId = $(this).parents('.shopping-item').data('shopping-id')
				_shopping.deleteAddress({shoppingId:shoppingId},function(addressInfo){
					_this.renderShopping(addressInfo)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		});	
		//4. 编辑地址
		this.$shopping.on('click','.shopping-edit',function(ev){
			//防止选中地址 冒泡
			ev.stopPropagation();
			var shoppingId = $(this).parents('.shopping-item').data('shopping-id')
			_shopping.fillAddress({shoppingId:shoppingId},function(addressInfo){
				_modal.showModal(addressInfo);
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})
		
		//5. 选择地址	
		this.$shopping.on('click','.shopping-item',function(){
			var $this = $(this);
			$this.addClass('active')
			.siblings('.shopping-item').removeClass('active');
			//标记选中项
			_this.selectId = $this.data('shopping-id');
			

		})
		//去支付
		this.$product.on('click','.btn-submit',function(){
			if(_this.selectId){
				_order.createOrder({shoppingId:_this.selectId},function(order){
					window.location.href = './payment.html?orderNo='+order.orderNo
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}else{
				_util.showErrorMsg('请选择地址后提交!!!')
			}
		})
	}

}

$(function(){
	silence.init()
})
