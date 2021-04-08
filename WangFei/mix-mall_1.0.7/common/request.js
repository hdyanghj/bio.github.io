import Vue from 'vue'

export default{
	getData(option,url){
		return new Promise(function(resolve, reject) {
			//	$webUrl	$recordClicks  
			let vm = Vue.prototype;
			uni.request({
				url: vm.$h5Url + url,
				method: "GET",
				data: option,
				success(res) {
					console.log('统计点击量 ：')
					console.log(res)
					resolve(res.data.data)
				},
				fail(err) {
					console.log(err)
					reject(err)
				}
			})
		})
	},
	
}