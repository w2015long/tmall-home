
require('./index.css')
var _util = require('util')


var page = {
	init:function(){
		this.bindEvent()
	}, 
	bindEvent:function(){
		var _this = this;
		//用户登陆
		$('#btn-submit').on('click',function(){
			_this.submitSearch()
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitSearch()
			}
		})
	},
	submitSearch:function(){

	}
}

$(function(){
	page.init()
})
