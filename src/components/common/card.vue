<template>
	<view>
		<!-- “为你推荐”卡片组件 -->
		<view class="bs px-3">
			<view class="flex align-center py-2">
				<text class="font-md font-weight-bold">{{title}}</text>
			</view>
			<!-- slot是推荐的内容部分 -->
			<slot></slot>
			<!-- $emit()方法表示子组件触发父组件上的事件名称 -->
			<view
			v-if=showRefresh
			class="flex align-center justify-center py-2">
				<!-- 这里再套一层view标签是为了仅点击“换一批字样”时生效，而不是点击屏幕中的这一行生效。 -->
				<view
				class="iconfont icon-shuaxin mx-1 text-main"
				hover-class="text-main-hover"
				@tap="$emit('refresh')">
					<text class="ml-1">换一批</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			// title是“为你推荐”这样的标题内容
			title:String,
			// showRefresh属性控制是否显示“换一批”字样
			showRefresh:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style>
</style>
