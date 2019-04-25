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
		//用户名失去焦点验证
		$('[name="username"]').on('blur',function(){
			var username = $(this).val()
			//用户名为空直接return 不能发送请求
			if(!_util.validate(username,'require')) return;
			//用户名验证不通过也不能发送请求
			if(!_util.validate(username,'username')) return;

			_user.checkUserName(username,function(){
				//该用户名没有注册
				formErr.hide()
			},function(message){
				//该用户名已被注册
				formErr.show(message)
			})
		})

		//用户登陆
		$('#btn-submit').on('click',function(){
			_this.submitLogin()
		})
	},
	submitLogin:function(){
		//1获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val()),
		}
		//2验证数据
		var validateResult = this.validate(formData);
		//3发送请求
		if(validateResult.status){//验证通过
			//登陆成功跳转到home、
			formErr.hide();
			//发送ajax请求
			_user.register(formData,function(){
				//注册成功
				window.location.href = './result.html?type=register'
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
		//密码二次验证
		if(formData.repassword != formData.password){
			result.msg = '两次密码输入不一致';
			return result			
		}
		//手机号不能为空
		if(!_util.validate(formData.phone,'require')){
			result.msg = '手机号不能为空';
			return result
		}	
		//手机号格式不正确
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确';
			return result
		}
		//邮箱不能为空
		if(!_util.validate(formData.email,'require')){
			result.msg = '邮箱不能为空';
			return result
		}	
		//邮箱格式不正确
		if(!_util.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确';
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
