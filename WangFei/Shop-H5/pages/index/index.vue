<template>
	<view class="content">
		<!-- 猜你喜欢 -->
		<view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">猜你喜欢</text>
				<text class="tit2">Guess You Like It</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>
		
		<view class="guess-section">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="guess-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<text class="price">￥{{item.price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/common/request.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			async loadData() {
				let option = {pageNum:0, pageSize:5}
				let homeList = await request.getData(option,'brand/productList');
			}

		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
</style>
