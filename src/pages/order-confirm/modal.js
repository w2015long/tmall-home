

var _util = require('util');
var _cities = require('util/cities')
var modaltpl = require('./modal.tpl');

var _shopping = require('service/shopping')

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

var _modal = {
	showModal:function(addressInfo){
		this.$modal = $('.modal-box');
		//编辑时 回填地址信息
		this.addressInfo = addressInfo;
		this.loadModal()
		this.bindEvent();
	},
	loadModal:function(){
		console.log(this.addressInfo)
		var html = _util.templateRender(modaltpl,this.addressInfo);
		this.$modal.html(html);
		this.loadProvinces();
	},
	hideMoadl:function(){
		this.$modal.empty();
	},
	loadProvinces:function(){
		var provinces = _cities.getProvinces();
		var provincesHtml = this.fillSelectOptions(provinces);
		var $provinceSelect = $('.province-select');
		$provinceSelect.html(provincesHtml);
		//编辑时 回填省份
		if(this.addressInfo){
			console.log('edit',this.addressInfo);
			$provinceSelect.val(this.addressInfo.province);
			this.loadCities(this.addressInfo.province)
		}
	},
	loadCities:function(province){
		var cities = _cities.getCities(province);
		var citiesHtml = this.fillSelectOptions(cities);
		var $citiesSelect = $('.city-select');
		$citiesSelect.html(citiesHtml);
		//编辑时 回填城市
		if(this.addressInfo){
			$citiesSelect.val(this.addressInfo.city);
		}	
	},
	fillSelectOptions:function(arr){
		var html = '<option value="">请选择</option>';
		for(var i=0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html
	},
	bindEvent:function(){
		var _this = this;
		//1关闭模态框
		this.$modal.on('click','.close',function(){
			this.hideMoadl()
		}.bind(this));
		//阻止冒泡
		this.$modal.on('click','.modal-container',function(ev){
			ev.stopPropagation();		
		})
		//2 监听省份下拉框获取城市
		this.$modal.find('.province-select').on('change',function(){
			var $this = $(this)
			_this.loadCities($this.val())
		})

		//提交订单
		this.$modal.find('.btn-submit').on('click',function(){
			_this.orderSubmit()
		})
		this.$modal.find('input').on('click',function(ev){
			if(ev.keyCode == 13){
				_this.orderSubmit();
			}
		})				
	},
	orderSubmit:function(){
		var _this = this;
		//1.获取数据
		var formData = {
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val()),
		}
		
		//2.验证数据
		var validateResult = this.validate(formData);
		//3.发送请求
		if(validateResult.status){//验证通过
			var $shopping = $('.shopping-box');
			formErr.hide();
			if(this.addressInfo){//编辑提交
				formData.shoppingId = this.addressInfo._id;
				_shopping.editAddress(formData,function(shoppings){
					_util.showSuccessMsg('修改地址成功');
					$shopping.trigger('render-address',[shoppings]);
					_this.hideMoadl()
				},function(msg){
					formErr.show(msg)
				})	
			}else{//新增地址 提交
				_shopping.addShopping(formData,function(shoppings){
					_util.showSuccessMsg('添加地址成功');
					$shopping.trigger('render-address',[shoppings]);
					_this.hideMoadl()
				},function(msg){
					formErr.show(msg)
				})				
			}

		}else{//验证失败
			formErr.show(validateResult.message)
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			message:''
		}
		//用户名不能为空
		if(!_util.validate(formData.name,'require')){
			result.message = '收件人姓名不能为空';
			return result;
		}
		//所在省份不能为空
		if(!_util.validate(formData.province,'require')){
			result.message = '所在省份不能为空';
			return result;
		}
		//所在城市不能为空
		if(!_util.validate(formData.city,'require')){
			result.message = '所在城市不能为空';
			return result;
		}
		//所在详细地址不能为空
		if(!_util.validate(formData.address,'require')){
			result.message = '所在详细地址不能为空';
			return result;
		}				
		//手机号不能为空
		if(!_util.validate(formData.phone,'require')){
			result.message = '手机号不能为空';
			return result;
		}
		//手机号格式不正确
		if(!_util.validate(formData.phone,'phone')){
			result.message = '手机号格式不正确';
			return result;
		}				
		result.status = true;
		return result;			
	}

}

module.exports = _modal;
