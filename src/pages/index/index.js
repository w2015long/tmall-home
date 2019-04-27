import Swiper from 'swiper';
import 'node_modules/swiper/dist/css/swiper.min.css';

require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')


var _side = require('pages/common/side')
var _user = require('service/user')
var _util = require('util')

var keywordstpl = require('./keywords.tpl')
var swipertpl = require('./swiper.tpl');
var floortpl = require('./floor.tpl');

var silence = {
	keywords:[
		{item:[{name:'手机'},{name:'运营商'}]},
		{item:[{name:'空调'},{name:'电视'}]},
		{item:[{name:'家居'},{name:'家居'}]},
		{item:[{name:'男装'},{name:'女装'}]},
		{item:[{name:'手机'},{name:'运营商'}]},
		{item:[{name:'空调'},{name:'电视'}]},
		{item:[{name:'家居'},{name:'家居'}]},
		{item:[{name:'男装'},{name:'女装'}]},
		{item:[{name:'手机'},{name:'运营商'}]},
		{item:[{name:'空调'},{name:'电视'}]}				
	],
	swiper:[
		{image:require('images/carousel/carousel1.jpg'),categoryId:'11'},
		{image:require('images/carousel/carousel2.jpg'),categoryId:'22'},
		{image:require('images/carousel/carousel3.jpg'),categoryId:'33'},
		{image:require('images/carousel/carousel4.jpg'),categoryId:'44'},
	],
	floor:[
		{
			title:'F1 家用电器',
			item:[
				{image:require('images/floor/elec/1.png'),text:'冰箱洗衣机',categoryId:'11'},
				{image:require('images/floor/elec/2.png'),text:'厨卫',categoryId:'22'},
				{image:require('images/floor/elec/3.png'),text:'净水机',categoryId:'33'},
				{image:require('images/floor/elec/4.png'),text:'油烟机',categoryId:'44'},
				{image:require('images/floor/elec/5.png'),text:'热水器',categoryId:'55'},
				{image:require('images/floor/elec/6.png'),text:'电饭煲',categoryId:'66'},
				{image:require('images/floor/elec/7.png'),text:'微波炉',categoryId:'77'},
				{image:require('images/floor/elec/5.png'),text:'热水器',categoryId:'55'},				
				{image:require('images/floor/elec/4.png'),text:'油烟机',categoryId:'44'},
				{image:require('images/floor/elec/8.png'),text:'烤箱',categoryId:'88'},
			]
		},
		{
			title:'F2 手机',
			item:[
				{image:require('images/floor/phone/1.png'),text:'荣耀9',categoryId:'23'},
				{image:require('images/floor/phone/2.png'),text:'小米9',categoryId:'65'},
				{image:require('images/floor/phone/3.png'),text:'华为MEAT',categoryId:'66'},
				{image:require('images/floor/phone/4.png'),text:'vivo',categoryId:'67'},
				{image:require('images/floor/phone/5.png'),text:'oppo',categoryId:'68'},
				{image:require('images/floor/phone/6.png'),text:'红米',categoryId:'69'},
				{image:require('images/floor/phone/7.png'),text:'三星',categoryId:'70'},
				{image:require('images/floor/phone/5.png'),text:'Iphone',categoryId:'71'},				
				{image:require('images/floor/phone/4.png'),text:'魅族',categoryId:'23'},
				{image:require('images/floor/phone/8.png'),text:'一加',categoryId:'88'},
			]
		}, 
		{
			title:'F3 服装',
			item:[
				{image:require('images/floor/clothing/1.png'),text:'男装',categoryId:'71'},
				{image:require('images/floor/clothing/2.png'),text:'夹克',categoryId:'65'},
				{image:require('images/floor/clothing/3.png'),text:'箱包',categoryId:'98'},
				{image:require('images/floor/clothing/4.png'),text:'外套',categoryId:'69'},
				{image:require('images/floor/clothing/5.png'),text:'休闲裤',categoryId:'79'},
				{image:require('images/floor/clothing/6.png'),text:'牛仔裤',categoryId:'78'},
				{image:require('images/floor/clothing/7.png'),text:'运动装',categoryId:'08'},
				{image:require('images/floor/clothing/5.png'),text:'Iclothing',categoryId:'21'},				
				{image:require('images/floor/clothing/4.png'),text:'内衣',categoryId:'33'},
				{image:require('images/floor/clothing/8.png'),text:'运动鞋',categoryId:'61'},
			]
		}, 	
		{
			title:'F4 美妆',
			item:[
				{image:require('images/floor/beauty/1.png'),text:'香水',categoryId:'71'},
				{image:require('images/floor/beauty/2.png'),text:'芦荟胶',categoryId:'65'},
				{image:require('images/floor/beauty/3.png'),text:'洁面乳',categoryId:'98'},
				{image:require('images/floor/beauty/4.png'),text:'身体乳',categoryId:'69'},
				{image:require('images/floor/beauty/5.png'),text:'口红',categoryId:'79'},
				{image:require('images/floor/beauty/6.png'),text:'面膜',categoryId:'78'},
				{image:require('images/floor/beauty/7.png'),text:'bb霜',categoryId:'08'},
				{image:require('images/floor/beauty/5.png'),text:'Ibeauty',categoryId:'21'},				
				{image:require('images/floor/beauty/4.png'),text:'防晒霜',categoryId:'33'},
				{image:require('images/floor/beauty/8.png'),text:'眉影',categoryId:'61'},
			]
		}, 			
	],
	init:function(){
		this.loadkeywords();
		this.loadSwiper();
		this.loadFloor()
	},
	loadkeywords:function(){
		var html = _util.templateRender(keywordstpl,{keywords:this.keywords})
		$('.keywords').html(html)
	},
	loadSwiper:function(){
		var html = _util.templateRender(swipertpl,{swiper:this.swiper})
		$('.swiper-container').html(html)		
		var mySwiper = new Swiper ('.swiper-container', {
			loop: true, // 循环模式选项
		  	autoplay: {
			    delay: 2000,
		    },			

			// 如果需要分页器
			pagination: {
			  el: '.swiper-pagination',
			},

			// 如果需要前进后退按钮
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},
		})   		
	},
	loadFloor:function(){
		var html = _util.templateRender(floortpl,{floor:this.floor})
		$('.floor-wrap').html(html)		
	}
}

$(function(){
	silence.init()
})

