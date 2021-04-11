<template>
  <section class="soccer_bg pt-4 pb-10 min-h-full lg:flex lg:justify-center lg:items-center lg:pt-20">
    <div class="w-11/12 lg:max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-4">
      <div class="w-full lg:w-5/12 border-red-300">
        <div class="w-full flex justify-center"><img class="w-7/12" src="../assets/img/jackpot-soccer/v7_logo.png"/></div>
        <div class="w-full jiangchi1 p-10 flex flex-col justify-center items-center">
          <img class="w-7/12" src="../assets/img/jackpot-soccer/jiang-1.png"/>
          <p class="text-3xl text-white text-center font-bold">THẮNG ÍT NHẤT<br/>{{bonusList.list.value1}}</p>
        </div>
        <div class="w-full flex justify-center lg:justify-end my-6">
          <p class="jiangchi2 p-4 text-center text-white">
            <span class=" text-yellow-400">HƠN {{bonusList.list.value1}}</span><br/>
            ĐÃ SẴN SÀNG PHÁT THƯỞNG<br/>TRONG MÙA NÀY</p>
        </div>
      </div>
      <div class="w-full lg:w-7/12 soccer border-4 border-solid border-white px-4 pb-8 lg:p-8 lg:pt-0 rounded-lg relative overflow-hidden">
        <div class="absolute py-4 z-30">
          <svg class="w-6 cursor-pointer text-white"
          @click="comeBack"
          v-show="!btn"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </div>
          <!-- 按钮组 -->
    
        <div class="h-full" v-show="btn">
          <div class="flex flex-col justify-end items-center space-y-3 pt-6 lg:items-end ">
            <div class=" w-56 z-30 cursor-pointer text-sm rounded bg-gray-50 flex bg-gradient-to-b from-red-500 bg-yellow-600 text-white py-2 px-4"
            @click="kfFun('https://direct.lc.chat/12580266/')">
              <svg class="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p>Liên Hệ CSKH Trực Tuyến</p>
            </div>
            <div class=" w-56 z-30 cursor-pointer text-sm rounded bg-gray-50 flex bg-gradient-to-b from-blue-400 bg-blue-800 text-white py-2 px-4"
            @click="kfFun('https://zalo.me/v7tramanh')">
              <svg class="w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p>Hỗ Trợ Qua Zalo</p>
            </div>
          </div>
          <div class="flex justify-center items-center flex-col pt-4 lg:pt-20 space-y-6">
            <div class="text-white text-center lg:text-xl">Nhập mã xác minh để bắt đầu dự đoán hoặc xem kết quả</div>
            <input class="p-2 text-center border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-transparent"
            type="text" v-model="verifyCode"/>
            <div class="flex justify-center items-center text-white space-x-4">
              <button class="bg-gradient-to-b from-green-400 bg-green-800 hover:from-green-500 hover:bg-green-900 px-5 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              @click="guessFun(1)"
              maxlength="6">
                Dự đoán ngay
              </button>
              <button class="bg-gradient-to-b from-purple-400 bg-purple-800 hover:from-purple-500 hover:bg-purple-900 px-5 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
              @click="guessFun(2)">
                Xem kết quả
              </button>
            </div>
          </div>
        </div>
        <!-- 竞猜组 -->
        <div class="h-full text-white py-12"
        v-if="games && soccerList.list.length>0">
          <ul class="w-full flex justify-center items-center py-2 bg-gradient-to-b from-blue-400 bg-blue-800">
            <li class="flex-1 text-center">
              Make your selections
            </li>
            <li class="flex items-center text-center">
              <p class="px-2 leading-4">Home<br/>Win</p>
              <p class="px-2">Draw</p>
              <p class="px-2 leading-4">Away<br/>Win</p>
            </li>
          </ul>
          <ul
          class="w-full text-xs flex justify-center items-center border-b-2 border-solid border-white"
          v-for="(item,ind) in soccerList.list" :key="ind">
            <li class="flex-1">
              <div>{{item.esd.substring(0, 10)}}</div>
              <div class="flex">
                <p>A、{{soccerList.list[itemNum].t1}}</p>
                <p><b class="px-2 text-yellow-300">V</b></p>
                <p>B、{{soccerList.list[itemNum].t2}}</p>
              </div>
            </li>
            <li>
              <button>Home</button>
              <button>Draw</button>
              <button>Away</button>
            </li>
          </ul>
          
        </div>
        <!-- 结果组 -->
        <div v-show="upshot">
          <div class="text-center text-white font-bold leading-10 py-4">
            KẾT QUẢ TUẦN NÀY
          </div>
          <div class="divide-white divide-y-2 text-white border-t-2 border-b-2 border-solid border-white">
            <ul class="grid grid-cols-8 leading-10 bg-gray-900 bg-opacity-25 lg:px-2"
            v-for="item in betsMatch.list" :key="item.id">
              <li class="col-span-8 md:col-span-5 py-2">
                <p class=" text-center md:text-left h-7 leading-7 text-gray-400">{{item.match.esd}}</p>
                <p class=" text-center md:text-left h-7 leading-7">A、{{item.match.t1}}
                  <b class="px-2 text-yellow-300">VS</b>
                  B、{{item.match.t2}}
                </p>
              </li>
              <li class="col-span-8 md:col-span-3 text-right flex justify-center md:justify-end items-center"
              :class="item.match.className">
                <svg class="w-6" v-if="item.lose" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg class="w-6" v-if="item.win" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {{item.type+'、'}}{{item.type === "A"? item.match.t1 : item.type === "B"? item.match.t2 : 'HÒA'}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <PromptBox :warningMsg="warningMsg" 
    :class="warningBox ? 'translate-y-0' : '-translate-y-full'"
    @hideWarning="hideWarning"/>
  </section>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import PromptBox from '../components/PromptBox.vue'
import jackpot from '../assets/js/soccer/jackpot'
export default defineComponent({
  name: 'JackpotSoccer',
  components:{
    PromptBox
  },
  setup: () => {
    
    onMounted(() => {
      jackpot.bonusFun()
    })
    return {...jackpot};
  }
})
</script>

<style scoped>
.soccer_bg {
  background:#041819 url(../assets/img/jackpot-soccer/pc-bg.png) top center no-repeat;
  background-size: 100% 100%;
}
@media (max-width:768px) {
  .soccer_bg {
  background:#041819 url(../assets/img/jackpot-soccer/mobile_bg.png) top center no-repeat;
  background-size: 100% auto;
}
}
.soccer{
  background: #114783 url(../assets/img/jackpot-soccer/soccer-bg.png) top center no-repeat;
  background-size: auto 100%;
}
.jiangchi1{
  background: url(../assets/img/jackpot-soccer/Prize1.png) top center no-repeat;
  background-size: 100% 100%;
}
.jiangchi2{
  background: url(../assets/img/jackpot-soccer/Prize2.png) top center no-repeat;
  background-size: 100% 100%;
}
</style>
