require('pages/common/nav')
require('pages/common/search')
require('util/pagination')
var _product = require('service/product')
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
		//1.图片切换
		//2.处理商品数量
		//3.添加购物车
	}

}

$(function(){
	silence.init()
})
