<template>
<uni-shadow-root class="towxml-img-img"><image :class="attr.class" lazy-load="true" :mode="attr.mode || 'widthFix'" :src="attr.src" :style="(attr.style)+' width:'+(size.w)+'px;height:'+(size.h)+'px;'" @load="load"></image></uni-shadow-root>
</template>

<script>
const config = require('../config');
export default {
	name:'Img',
	options: {
		styleIsolation: 'shared'
	},
	props: {
		imageData: {
			type: Object,
			value: {}
		}
	},
	data() {
		return {
			attr:{
				src:'',
				class:'',
				style:''
			},
			size:{
				w:0,
				h:0
			},
			styleObj:{}
		}
	},
	onReady(){this.attached()},
	mounted(){this.attached()},
	methods:{
		attached:function(){
			const _ts = this;
			let dataAttr = this.imageData.attr;

			// 将图片大小处理到对象中
			if(dataAttr.width){
				_ts.data.size.w = +dataAttr.width / config.dpr;
			};

			if(dataAttr.height){
				_ts.data.size.h = +dataAttr.height / config.dpr;
			};

			// 将样式合并到样式对象中
			if(dataAttr.style){
				let re = /;\s{0,}/ig;
				dataAttr.style = dataAttr.style.replace(re,';');
				dataAttr.style.split(';').forEach(item => {
					let itemArr = item.split(':');
					if(/^(width|height)$/i.test(itemArr[0])){
						let num = parseInt(itemArr[1]) || 0,
							key = '';
						// itemArr[1] = num / config.dpr + itemArr[1].replace(num,'');
						switch (itemArr[0].toLocaleLowerCase()) {
							case 'width':
								key = 'w';
							break;
							case 'height':
								key = 'h';
							break;
						};
						_ts.data.size[key] = num / config.dpr;
					}else{
						_ts.data.styleObj[itemArr[0]] = itemArr[1];
					};
				});
			};

			// 设置公式图片
			_ts.attr = {
					src:dataAttr.src,
					class:dataAttr.class,
					style:_ts.setStyle(_ts.data.styleObj)
				};
			_ts.size = _ts.data.size
		},

		// 设置图片样式
		setStyle:function(o){
			let str = ``;
			for(let key in o){
				str += `${key}:${o[key]};`;
			};
			return str;
		},

		// 图片加载完成设置图片大小
		load:function(e){
			const _ts = this;

			if(!_ts.data.size.w || !_ts.data.size.h){
				_ts.size = {
						w:e.detail.width / config.dpr,
						h:e.detail.height / config.dpr
					}
			};
		}
	}
}
</script>
<style platform="mp-weixin">

</style>