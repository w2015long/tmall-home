require('pages/common/logo')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _user = require('service/user')

var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')	
	}
}


var page = {
	init:function(){
		this.bindEvent()
	}, 
	bindEvent:function(){
		var _this = this;
		//用户登陆
		$('#btn-submit').on('click',function(){
			_this.submitLogin()
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitLogin()
			}
		})
	},
	submitLogin:function(){
		//1获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
		}
		//2验证数据
		var validateResult = this.validate(formData);
		// console.log(validateResult)
		//3发送请求
		if(validateResult.status){//验证通过
			//登陆成功跳转到home、
			formErr.hide();
			//发送ajax请求
			_user.login(formData,function(){
				_util.goHome()
			},function(msg){//发送ajax用户名密码校验不通过
				formErr.show(msg)
			})
		}else{//验证失败
			formErr.show(validateResult.msg)
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//用户名不能为空
		if(!_util.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result
		}
		//用户名格式不正确
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式不正确';
			return result
		}		
		//密码不能为空
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result
		}		
		//密码格式不正确
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码不能含有非法字符，长度在4-10之间';
			return result
		}

		//验证通过
		result.status = true;
		return result		
	}
}

$(function(){
	page.init()
})
