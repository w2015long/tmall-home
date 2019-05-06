require('pages/common/nav')
require('pages/common/search')
require('util/pagination')
require('pages/common/footer')
var _order = require('service/order')
var _util = require('util');
var _side = require('pages/common/side')

require('./index.css')
var tpl = require('./index.tpl')
var silence = {
	param:{
		page:_util.getParamsFromUrl('page') || 1,
	},
	init:function(){
		this.$elem = $('.order-box');
		this.initPagination()
		this.onload();
		this.loadOrderList()
	},
	onload:function(){
		_side.render('order-list')
	},
	initPagination:function(){
		//初始化分页插件
		this.$pagination = $('.pagination-box');
		this.$pagination.on('change-page',function(ev,page){
			this.param.page = page;
			//请求后台数据再次渲染页面
			this.loadOrderList()
		}.bind(this))
		this.$pagination.pagination();	
	},
	loadOrderList:function(){
		_order.getOrderList(this.param,function(result){
			
			if(result.list.length>0){
				console.log('result',result)
				result.list.forEach(function(order){
					console.log('order',order);
					//适配数据
					order.createTime = new Date(order.createdAt).toLocaleString()
					order.productList.forEach(function(product){
						// console.log('product',product)
						product.image = product.images.split(',')[0];
						console.log('product',product)
					})
					
				})
				//渲染商品列表
				var html = _util.templateRender(tpl,{list:result.list})
				this.$elem.html(html);
				//渲染分页组件
				this.$pagination.pagination('render',{
					current:result.current,
					total:result.total,
					pageSize:result.pageSize
				})
			}else{
				this.$elem.html('<p class="empty-message">你找的商品去火星了！！！</p>');
			}
		}.bind(this),function(msg){
			_util.showErrorMsg(msg)
		})
	}

}

$(function(){
	silence.init()
})
