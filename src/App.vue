<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
@import "common/common.css";
@import "@/components/color-ui/main.css";
@import "@/components/color-ui/icon.css";
@import '@/components/jo-markdown/main.css';
@import './components/jo-markdown/main.css';
@import '@/uni_modules/uni-scss/index.scss';

</style>
