<!-- “我的作品”页面 -->
<template>
	<view>
		<!-- 状态栏+导航栏 -->
		<statusBar :height="'80rpx'">
			<view class="flex align-center px-4" style="height: 80rpx;">
				<view @tap="backToPrePage" class="iconfont icon-fanhui flex align-center text-white" style="width: 40rpx;height: 40rpx;"></view>
				<view style="width: 590rpx;letter-spacing:2rpx;" class="flex justify-center align-center text-white font">
					我的作品
				</view>
			</view>
		</statusBar>
		
		<!-- 作品区域 -->
		<view
		v-for="(item,index) in list" :key=index>
			<view class="w-100 flex flex-bet flex-wrap align-center py-2">
				<!-- 图片部分 -->
				<image :src="item.src" class="rounded-lg" style="width: 297.7rpx;height: 170rpx;"></image>
				<!-- 视频介绍部分 -->
				<view style="width: 376.7rpx;height: 170rpx;">
					<!-- 标题 -->
					<view class="w-100 text-ellipsis-2 font" style="height: 72rpx;color: #212221;line-height: 1.3;">{{item.title}}</view>
					<!-- 时间，播放数和三个点 -->
					<view class="mt-1d5" style="width: 100%;height: 82rpx;color: #BCBCBC;line-height: 1;">
						<!-- 时间 -->
						<text class="flex align-center w-100" style="height: 41rpx;">{{item.time}}</text>
						<!-- 播放数 -->
						<view class="flex align-center">
							<view class="flex align-center flex-4" style="height: 41rpx;">
								<!-- 播放数图标 -->
								<view class="iconfont icon-bofangshu"></view>
								<!-- 播放数 -->
								<text class="ml-0d8" style="width: 130rpx;">{{item.bofangshu}}</text>
								<!-- 弹幕数图标 -->
								<view class="iconfont icon-danmushu ml-1"></view>
								<!-- 弹幕数 -->
								<text class="ml-0d8">{{item.danmushu}}</text>
							</view>
							<!-- 三个点 -->
							<view class="flex flex-1 justify-end">
								<view class="iconfont icon-diandiandianshu font-md"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="divid-line-1 d-block" style="width: 750rpx;"></view>
			
			<view class="w-100 d-block flex flex-row-reverse align-center" style="height: 86rpx;">
				<view v-for="(item, index) in buttons" :key=index
				class="border rounded flex align-center justify-center mr-3"
				style="width: 92rpx;height: 44rpx;color: #454545;">
					{{item}}
				</view>
			</view>
			
			<view class="divid-line-20  d-block"></view>
		</view>
		
		
		
	</view>
</template>

<script>
	import statusBar from '@/components/common/statusBar.vue'
	export default {
		components:{
			statusBar
		},
		data() {
			return {
				list: [
					{
						src: '/static/demo/list3/0.jpg',
						title: '探秘美国食物银行，美国真的很多人没饱饭吃吗？',
						time: '昨天 18:11',
						bofangshu: '1300.5万',
						danmushu: '1325'
					},
					{
						src: '/static/demo/list3/0.jpg',
						title: '航天基地的食堂，到底吃什么？牛肉汤可以不要粉丝只要肉！',
						time: '昨天 17:15',
						bofangshu: '24.8万',
						danmushu: '254'
					},
					{
						src: '/static/demo/list3/0.jpg',
						title: '被历史误解了2000多年的千古一帝',
						time: '昨天 17:10',
						bofangshu: '63万',
						danmushu: '1.7万'
					},
					{
						src: '/static/demo/list3/0.jpg',
						title: '华农兄弟：兄弟的羊跑出来了，幸好遇到我们，不然就被别人煮了',
						time: '昨天 16:25',
						bofangshu: '63.1万',
						danmushu: '1262'
					},
					{
						src: '/static/demo/list3/0.jpg',
						title: '她是我年少惊艳，只一眼 便沦陷',
						time: '昨天 15:48',
						bofangshu: '90.7万',
						danmushu: '5.2万'
					},
					{
						src: '/static/demo/list3/0.jpg',
						title: '这才是iPhone的最强功能，不接受反驳',
						time: '昨天 15:42',
						bofangshu: '126.1万',
						danmushu: '1058'
					}
				],
				buttons:["删除","视频","修改"]
			}
		},
		methods: {
			backToPrePage() {
				// 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
				uni.navigateBack({
					// 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
					delta:1
				})
			},
		}
	}
</script>

<style>

</style>
