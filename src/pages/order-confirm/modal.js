

var _util = require('util');
var _cities = require('util/cities')
var modaltpl = require('./modal.tpl');

var _modal = {
	showModal:function(){
		this.$modal = $('.modal-box');
		this.loadModal()
		this.bindEvent();
	},
	loadModal:function(){
		var html = _util.templateRender(modaltpl);
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
		$provinceSelect.html(provincesHtml)
	},
	fillSelectOptions:function(arr){
		var html = '<option value="">请选择</option>';
		for(var i=0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html
	},
	bindEvent:function(){
		//1关闭模态框
		this.$modal.on('click','.close',function(){
			this.hideMoadl()
		}.bind(this));
		//阻止冒泡
		this.$modal.on('click','.modal-container',function(ev){
			ev.stopPropagation();		
		})
		//2 监听下拉框获取省份事件
		this.$modal.on('change','.province-select',function(){
			alert("change")
		})
	}

}

module.exports = _modal;
