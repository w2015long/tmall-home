require('pages/common/nav')
require('pages/common/search')
require('util/pagination')
var _product = require('service/product')
var _cart = require('service/cart')
var _util = require('util');
var 
_nav = require('pages/common/nav')
require('pages/common/footer')
require('./index.css')
var tpl = require('./index.tpl')
var silence = {
	init:function(){
		this.$elem = $('.cart-box')
		this.loadCart();
		this.bindEvent()
	},
	loadCart:function(){
		_cart.getCart(function(cart){
			console.log('cart>>>',cart)
			this.renderCart(cart)

		}.bind(this),function(){
			this.$elem.html('<p class="empty-message">加载购物车失败!稍后再试！!</p>')
		}.bind(this))

	},
	renderCart:function(cart){
		_nav.loadCartCount();
		if(cart.cartList.length>=1){
			//缓存商品总价，用来校验订单提交
			this.totalCartPrice = cart.totalCartPrice
			//处理图片
			cart.cartList.forEach(function(item){
				// console.log('item1',item)
				item.product.mainImg = item.product.images.split(',')[0];
				console.log('item2',item)
			})
			var html = _util.templateRender(tpl,cart);
			this.$elem.html(html)
		}else{
			this.$elem.html('<p class="empty-message">购物车空空如也，赶快去购物！！</p>')
		}
	},
	bindEvent:function(){
		var _this = this;
		//单挑选中/取消
		this.$elem.on('click','.select-one',function(){
			var $this = $(this);
			var productId = $this.parents('.product-item').data('product-id');
			//选中
			if($this.is(':checked')){
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}//取消
			else{
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		})
		//全选中/取消
		this.$elem.on('click','.select-all',function(){
			var $this = $(this); 
			//全选中
			if($this.is(':checked')){
				_cart.selectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}//全取消
			else{
				_cart.unselectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}			
		})
		//删除一条
		this.$elem.on('click','.delete-one',function(){
			var $this = $(this);
			if(_util.confirm('你确定删除此条购物车?')){
				var productId = $this.parents('.product-item').data('product-id');
				_cart.deleteOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})				
			}		

		})
		//4删除选中
		this.$elem.on('click','.delete-selected',function(){
			if(_util.confirm('你确定要删除多条购物车?')){
				_cart.deleteSelected(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})				
			}				
		})
		//5.更新数量
		this.$elem.on('click','.count-btn',function(){
			var $this = $(this);
			if($this.hasClass("plus")){

			}else if($this.hasClass('minus')){
				
			}
		})
		//6.去结算
		this.$elem.on('click','.btn-submit',function(){
			if(this.totalCartPrice>0){
				window.location.href = './order-confirm.html'
			}else{
				_util.showErrorMsg('请选择购物车信息后再提交')
			}
		}.bind(this))
	}

}

$(function(){
	silence.init()
})
