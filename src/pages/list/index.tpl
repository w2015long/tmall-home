<ul class="clearfix">
	{{#list}}
	<li class="product-list-item">
		<a href="./detail.html?productId={{_id}}" target="_blank">
			<img class="product-img" src="{{image}}" alt="{{name}}">
			<p class="product-price">￥{{price}}</p>
			<p class="product-name">{{name}}</p>
		</a>
	</li>
	{{/list}}

	{{^list}}
	<p class="empty-message">你搜索的商品可能去火星了</p>
	{{/list}}
</ul>	