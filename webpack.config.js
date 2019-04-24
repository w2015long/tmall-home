

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//css单独打包处理
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const publicPath = '/';

const getHtmlConfig = (name)=>({
	template: './src/view/'+name+'.html',//模板文件
	filename:name+'.html',////输出的文件名
	inject:true,//脚本写在那个标签里,默认是true(在body结束后
	hash:true,//给生成的js/css文件添加一个唯一的hash
	chunks:['common',name]
})

module.exports = {
	//指定打包环境
	mode:'development',
	// mode:'production',
	//入口(单入口写法)
	// entry:{main:'.src/index.js'}简写entry: './src/index.js',
	
	entry: {//多入口写法
	  //chunk名称:入口文件路径
	  'common':'./src/pages/common/index.js',
	  'index': './src/pages/index/index.js',
	  'user-login':'./src/pages/user-login/index.js',
	},	
	
	//出口
	output: {
		//出口文件名(多个入口文件时，要加模板文件名)
		//[name] chunk名称
		//chunk内容的hash,每一个chunkhash值都不同
		//[hash] 模块标识符的hash,每一次打包的模块hash值都不同
		filename: 'js/[name].[chunkhash].bundle.js',
		
		publicPath:publicPath,
		//出口文件路径
		path: path.resolve(__dirname, './dist')
	},
	//配置别名
	resolve:{
		alias:{
			pages: path.resolve(__dirname, './src/pages'),
			util: path.resolve(__dirname, './src/util'),
			api: path.resolve(__dirname, './src/api'),
			service: path.resolve(__dirname, './src/service'),
			common: path.resolve(__dirname, './src/common'),
			node_modules: path.resolve(__dirname, './node_modules'),
		}
	},
	//配置loader
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
				  ////css单独打包处理
		          {
		            loader: MiniCssExtractPlugin.loader,
		            options: {}
		          },
		          'css-loader'
				]
			},

		    //处理图片 
			{
				//字体后缀会跟一个问号(?表示前面原子出现的次数{0,1}等价于可有可无)
				//. 除了回车和换行外的任意字符 等价[^\r\n]
				//* 前面原子最少出现0次 {0,}
				//(.* 表示后边再跟一些可有可无的字符)
				test: /\.(png|jpg|gif|jpeg|ttf|woff2|woff|eot|svg)\??.*$/i,
				use: [
			  		{
			    		loader: 'url-loader',
			    		options: {
			    			//当图片大小超过limit值后,会生成一个文件
			    			//默认使用file-loader处理图片文件,所以需要额外安装file-loader
			      			limit: 999,
			      			name:'resource/[name].[ext]'
			    		}
			  		}
				]
			},
			//babel
			{
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			            presets: ['env','es2015','stage-3'],		            
			        }
			    }               
			}					  
		],
		
	},


	
	plugins: [
		//插件(自动生成HTML)
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login')),
		//时时清理更新后上一次文件
		new CleanWebpackPlugin(),
		//css单独打包处理
	    new MiniCssExtractPlugin({
	    	filename:'css/[name].css',
	    	// chunkFilename: '[id].css'
	    })		
	],
	//启动一个服务器(webpack-dev-server)实时动态刷新页面
    devServer: {
    	contentBase: './dist',
    	port:3002,//服务运行的端口
    	//跨域请求
	    proxy: [{
	      context: ['/user'],
	      target: 'http://localhost:3000/',
	    }]    	
    }		
};