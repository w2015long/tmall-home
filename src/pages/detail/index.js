require('pages/common/nav')
require('pages/common/search')
require('util/pagination')
var _product = require('service/product')
var _cart = require('service/cart')
var _util = require('util')
require('pages/common/footer')
require('./index.css')
var tpl = require('./index.tpl')
var silence = {
	params:{
		productId:_util.getParamsFromUrl('productId') || '',

	},
	init:function(){
		this.$elem = $('.detail-box');
		this.onload();
		this.bindEvent()
	},
	onload:function(){
		if(this.params.productId){
			this.laodProductDetail()
		}
	},
	laodProductDetail:function(){
		//发送请求获取后台数据
		_product.getProductDetail(this.params,function(product){
			console.log('>>>product',product)
			if(product){
				//缓存库存值 用来处理购物车商品数量
				this.stock = product.stock;
				//处理图片
				product.images = product.images.split(',');
				product.mainImg = product.images[0];
				//渲染到页面
				var html = _util.templateRender(tpl,product);
				this.$elem.html(html);
			}else{
				this.$elem.html('<p class="empty-msg">你找的商品去火星啦！！！</p>')
			}
			
		}.bind(this),function(){
			this.$elem.html('<p class="empty-msg">你找的商品去火星啦！！！</p>')
		}.bind(this))
	},
	bindEvent:function(){
		var _this = this;
		//1.图片切换
		this.$elem.on('mouseenter','.product-small-img-item',function(){
			var $this = $(this)
			$this.addClass('active')
			.siblings('.product-small-img-item').removeClass('active');

			var src = $this.find('img').attr('src');
			$('.product-main-img img').attr('src',src);
		})
		//2.处理商品数量
		
		this.$elem.on('click','.count-btn',function(){
			var $this = $(this);
			var $input = $('.count-input');
			var current = parseInt($input.val());
			if($this.hasClass('plus')){
				$input.val(current + 1 >= _this.stock ? _this.stock : current + 1); 
			}else if($this.hasClass('minus')){
				$input.val(current - 1 <= 0 ? 0 : current - 1);
			}
		})	
		//3.添加购物车
		this.$elem.on('click','.add-cart-btn',function(){
			_cart.addCart({
				productId:_this.params.productId,
				count:$('.count-input').val()
			},function(){
				window.location.href = './result.html?type=addCart';
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})
	}

}

$(function(){
	silence.init()
})
