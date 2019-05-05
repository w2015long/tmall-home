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
		this.loadPayment();
	},
	loadPayment:function(){
		var _this = this;
		if(this.param.orderNo){
			_payment.getPaymentInfo({orderNo:this.param.orderNo},function(payment){
				console.log(payment)
				var html = _util.templateRender(tpl,payment);
				_this.$elem.html(html);
			},function(msg){
				_util.showErrorMsg(msg)
			})
		}
	}

}

$(function(){
	silence.init()
})
