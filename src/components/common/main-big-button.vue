<template>
	<!-- @tap="$emit('click')"一定要加，h5端可能不用加，但是uniapp端一定要加，这样调用时才可以用@tap事件 -->
	<view
	class="w-100 flex align-center justify-center"
	style="height: 145rpx;"
	@click="$emit('click')">
		<view hover-class="main-bg-hover"
		class="main-bg-color flex align-center justify-center rounded-circle"
		style="width: 680rpx;height: 100rpx;">
			<view class="text-white font">{{text}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			text:String
		}
	}
</script>

<style>
</style>
