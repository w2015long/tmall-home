require('pages/common/nav')
require('pages/common/search')
require('util/pagination')
require('pages/common/footer')
var _payment = require('service/payment')
var _util = require('util');

require('./index.css')
var tpl = require('./index.tpl')
var silence = {
	param:{
		orderNo : _util.getParamsFromUrl('orderNo') || '' 
	},
	init:function(){
		this.$elem = $('.payment-box')
		this.loadPaymentInfo();
	},
	loadPaymentInfo:function(){
		var _this = this;
		if(this.param.orderNo){
			_payment.getPaymentInfo({orderNo:this.param.orderNo},function(payment){
				var html = _util.templateRender(tpl,payment);
				_this.$elem.html(html);
				//监听订单支付状态
				_this.listenPaymentStatus()
			},function(){
				_this.$elem.html('<p class="empty-message">获取支付信息失败，请稍后重试！！！</p>');
			})
		}
	},
	listenPaymentStatus:function(){
		var _this = this;
		setInterval(function(){
			_payment.getStatus({orderNo:_this.param.orderNo},function(result){
				if(result){
					window.location.href = './result.html?type=payment&orderNo='+_this.param.orderNo
				}
			},function(msg){
				_util.showErrorMsg(msg)
			})
		},1000)	
	}	

}

$(function(){
	silence.init()
})
