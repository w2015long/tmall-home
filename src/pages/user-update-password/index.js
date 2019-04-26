require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
var _user = require('service/user')
var _util = require('util')
require('pages/common/footer')
require('./index.css')


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


var silence = {
	init:function(){
		this.bindEvent()
		this.onload()
	}, 
	onload:function(){
		_side.render('user-update-password')
	},	
	bindEvent:function(){
		var _this = this;
		//用户修改密码
		$('#btn-submit').on('click',function(){
			_this.submitUpdatePwd()
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitUpdatePwd()
			}
		})		
	},
	submitUpdatePwd:function(){
		//1获取数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
		}
		//2验证数据
		var validateResult = this.validate(formData);
		//3发送请求
		if(validateResult.status){//验证通过
			
			formErr.hide();
			//发送ajax请求
			_user.updatePassword(formData.password,function(){
				//更新成功
				window.location.href = './result.html?type=updatePassword'
				_user.logout(function(){
					window.location.reload()
				},function(msg){
					_util.showErrorMsg(msg)
				})
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
		//验证通过
		result.status = true;
		return result		
	}
}

$(function(){
	silence.init()
})
