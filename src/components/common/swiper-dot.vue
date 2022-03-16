<!-- 三个点组件 -->
<template>
	<view>
		<!-- position-relative;和position:absolute;两处位置设定使得文字显示在了图片的下方。 -->
		<view class="position-relative">
			<slot></slot>
			<view
				class="position-absolute bottom-0 left-0 right-0 flex align-end rounded-bottom-lg text-white px-1 pb"
				style="height: 70rpx; background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8));"
			>
				<!-- 轮播图底部文字 -->
				<view class="flex-5 font-sm text-ellipsis-1" v-text="info[cur].title"></view>
				<!-- 轮播图底部三个白点 -->
				<view class="flex justify-end flex-1 pb-1">
					<view v-for="(item,index) in info" :key="index"
					 class="wh-10 rounded-circle ml-1"
					 :style = "index === cur ? 'background-color: rgba(255,255,255,1);' : 'background-color: rgba(255,255,255,0.3);'">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			info:Array,
			cur:{
				type:Number,
				default:0
			}
		}
	}
</script>

<style>

</style>
