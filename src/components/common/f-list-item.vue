<!-- “我的”页面，中间单个列表项的组件 -->
<template>
	 <view class="w-100 flex align-center" style="height: 160rpx;" hover-class="bg-light" @tap="$emit('click')">
	 	<view class="flex justify-center" style="width: 80rpx;">
	 		<view :class="'iconfont '+item.icon+' font'"></view>
	 	</view>
	 	<view class="flex flex-bet font" style="width: 670rpx;color: #383E41;">
	 		<text>{{item.title}}</text>
	 		<text class="mr-3" style="color: #626C73;">{{item.text}}</text>
			<view v-if="item.enable" class="iconfont icon-gengduo mr-3" style="color: #B5B5B5;"></view>
	 	</view>
	 </view>
</template>

<script>
	export default{
		props:{
			item:Object
		}
	}
</script>

<style>
</style>
