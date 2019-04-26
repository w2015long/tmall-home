
require('./index.css')
var _util = require('util')


var page = {
	init:function(){
		this.bindEvent()
	}, 
	bindEvent:function(){
		var _this = this;
		//用户登陆
		$('#btn-search').on('click',function(){
			_this.submitSearch()
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitSearch()
			}
		})
	},
	submitSearch:function(){
		var keyword = $('#search-input').val()
		window.location.href = './list.html?keyword='+keyword
	}
}

$(function(){
	page.init()
})
