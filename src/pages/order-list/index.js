require('pages/common/nav')
require('pages/common/search')
require('util/pagination')
require('pages/common/footer')
var _payment = require('service/payment')
var _util = require('util');
var _side = require('pages/common/side')

require('./index.css')
var tpl = require('./index.tpl')
var silence = {
	param:{
		page:_util.getParamsFromUrl('page') || 1,
	},
	init:function(){
		this.$elem = $('.payment-box');
		this.initPagination()
		this.onload();
	},
	onload:function(){
		_side.render('order-list')
	},
	initPagination:function(){
		//初始化分页插件
		this.$pagination = $('.pagination-box');
		this.$pagination.on('change-page',function(ev,page){
			this.listParam.page = page;
			//请求后台数据再次渲染页面
			this.loadOrderList()
		}.bind(this))
		this.$pagination .pagination();		
	},
	loadOrderList:function(){

	}

}

$(function(){
	silence.init()
})
