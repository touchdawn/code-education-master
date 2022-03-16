<!-- 系统状态栏组件 -->
<template>
	<view>
		<view class="fixed-top" :style="'z-index:2000;background-color:'+ bgColor">
			<!-- 本页面已将系统导航栏设置为自定义模式，所以需要写一个自定义占位栏 -->
			<!-- #ifdef MP -->
			<!-- 微信小程序的导航栏高度 -->
			<view class="w-100" style="height: 44px"></view>
			<!-- #endif -->
			
			<view class="w-100" :style="'height:'+statusBarHeight+'px;'"></view>
			
			<slot></slot>
			
			<!-- 搜索框 -->
			<view v-if="sousuo" class="flex align-center bs py-1" style="height: 44px;">
				<!-- flex-1的作用是令当前元素尽量横向铺满 -->
				<view class="flex align-center flex-1 rounded-circle bs py-1 mx-2" style="background-color: #f8f6f6; color: #959fa0;height: 34px;">
					<view class="iconfont icon-sousuokuang mx-1 font-weight-bold"></view>
					<text>精彩热搜：拜登当选美国总统</text>
				</view>
				<view v-if="button" class="flex mr-2" hover-class="gray-click" style="color: #ffffff;">分类</view>
			</view>
		</view>
		<!-- 占位标签 -->
		<!-- slot/搜索框 高度 -->
		<view :style="'height: '+height+';'"></view>
		<!-- 设备状态栏高度 -->
		<view :style="'height: '+statusBarHeight+'px;'"></view>
		<!-- #ifdef MP -->
		<view style="height: 44px;"></view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		props:{
			button:{
				type:Boolean,
				default:true
			},
			sousuo:{
				type:Boolean,
				default:false
			},
			// 占位栏高度默认值44px,引用状态栏组件的时候要注意给一个占位栏高度，也就是导航栏（不包括状态栏）的高度
			height:{
				type:String,
				default:"44px"
			},
			// 背景颜色
			bgColor:{
				type:String,
				default:'#F6759B'
			}
		},
		data() {
			return {
				statusBarHeight:0
			}	
		},
		created() {
			this.statusBarHeight = this.StatusBar
		}
	}
</script>


<style>
</style>
