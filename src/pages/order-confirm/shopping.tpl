
<div class="panel">
	<h2 class="panel-header">送货地址</h2>
	<div class="pandel-body">
		{{#addressInfo}}
		{{#active}}
		<div class="shopping-item active" data-shopping-id="{{_id}}">
		{{/active}}	
		{{^active}}
		<div class="shopping-item" data-shopping-id="{{_id}}">
		{{/active}}				
			<h3 class="shopping-title">{{province}} {{city}} {{name}}</h3>
			<p class="shopping-detail">
				{{province}} {{city}} {{address}} {{phone}}
			</p>
			<div class="shopping-footer">
				<span class="link shopping-edit">编辑</span>
				<span class="link shopping-delete">删除</span>
			</div>
		</div>
		{{/addressInfo}}		
		<div class="shopping-add">
			<i class="fa fa-plus"></i>
			<p class="shopping-add-text">添加新地址</p>
		</div>
	</div>
</div>
