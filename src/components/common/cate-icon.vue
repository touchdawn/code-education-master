<!-- 分类图标组件 -->
<template>
	<!-- 图片和文字的大盒子 -->
	<view class="flex align-center justify-center w-100 h-100">
		<!-- 图片和文字的小盒子 -->
		<view>
			<!-- 图片盒子 -->
			<view class="w-100 flex justify-center">
				<!-- 图片 -->
				<image :src="item.src" style="width: 52rpx;height: 52rpx;"></image>
			</view>
			<!-- 文字盒子 -->
			<view class="flex justify-center font-small mt-0d5">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object
		}
	}
</script>

<style>
</style>
