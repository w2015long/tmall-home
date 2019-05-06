require('pages/common/nav')
require('pages/common/search')
require('util/pagination')
require('pages/common/footer')
var _order = require('service/order')
var _util = require('util');

require('./index.css')
var tpl = require('./index.tpl')

var silence = {
	param:{
		orderNo : _util.getParamsFromUrl('orderNo') || '' 
	},
	init:function(){
		this.$elem = $('.order-box')
		this.loadOrderDetail();
		this.bindEvent();
	},
	loadOrderDetail:function(){
		var _this = this;
		if(this.param.orderNo){
			_order.getOrder(this.param,function(order){
				// console.log(order)
				_this.renderOrderDetail(order)

			},function(){
				_this.$elem.html('<p class="empty-message">获取订单信息失败，请稍后重试！！！</p>');
			})
		}else{
			_this.$elem.html('<p class="empty-message">获取订单号不存在!!!!</p>');
		}
	},
	renderOrderDetail:function(order){
		
		if(order){
			//适配数据
			order.createTime = new Date(order.createdAt).toLocaleString();
			order.productList.forEach(function(product){
				product.image = product.images.split(',')[0];
			})
			//增加字段控制显示隐藏支付按钮
			order.canPay = order.canCancel = order.status == '10';

			var html = _util.templateRender(tpl,order);
			this.$elem.html(html);					
		}else{
			this.$elem.html('<p class="empty-message">获取订单不存在!!!!</p>');
		}
		console.log('order>>>',order)

	},
	bindEvent:function(){
		var _this = this
		this.$elem.on('click','.btn-cancel',function(){
			if(_util.confirm('你确定要取消订单吗?')){
				_order.cancelOrder(_this.param,function(order){
					_this.renderOrderDetail(order)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		})
	}


}

$(function(){
	silence.init()
})
