<template>
  <section class="soccer_bg pt-4 min-h-full lg:pt-20">
      <div class="w-11/12 lg:max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-4">
        <div class="w-full lg:w-5/12 border-red-300">
          <div class="w-full flex justify-center"><img class="w-7/12" src="../assets/img/jackpot-soccer/v7_logo.png"/></div>
          <div class="w-full jiangchi1 p-10 flex flex-col justify-center items-center">
            <img class="w-7/12" src="../assets/img/jackpot-soccer/jiang-1.png"/>
            <p class="text-3xl text-white text-center font-bold">THẮNG ÍT NHẤT<br/>{{bonusList.list.value1}}</p>
          </div>
          <div class="w-full flex justify-center lg:justify-end my-6">
            <p class="jiangchi2 p-4 text-center text-white">
              <span class=" text-yellow-400">hơn {{bonusList.list.value1}}</span><br/>
              ĐÃ SẴN SÀNG PHÁT THƯỞNG<br/>TRONG MÙA NÀY</p>
          </div>
        </div>
        <div class="w-full lg:w-7/12 soccer border-4 border-solid border-white p-8 rounded-lg relative">
          <svg class=" absolute top-1 left-1 w-6 cursor-pointer text-white"
          @click="comeBack"
          v-show="!btn"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
           <!-- 按钮组 -->
      
          <div class="flex justify-center items-center flex-col h-full space-y-6"
          v-show="btn">
            <div class="text-white">输入验证码开始竞猜或者查看结果</div>
            <input class="p-2 text-center border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-transparent"
            type="text" v-model="verifyCode"/>
            <div class="flex justify-center items-center text-white space-x-4">
              <button class="bg-gradient-to-b from-red-400 bg-red-800 hover:from-red-500 hover:bg-red-900 px-5 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              @click="guessFun(1)"
              maxlength="6">
                立即竞猜
              </button>
              <button class="bg-gradient-to-b from-yellow-400 bg-yellow-800 hover:from-yellow-500 hover:bg-yellow-900 px-5 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
              @click="guessFun(2)">
                查看结果
              </button>
            </div>
            
          </div>
          <!-- 竞猜组 -->
          <div class="h-full text-sm"
          v-if="games && soccerList.list.length>0">
            <div class="flex justify-center items-center flex-col space-y-6 h-full">
              <div class="text-white">{{ soccerList.list[itemNum].esd.substring(0, 10)}}</div>
              <div class="w-11/12 text-center py-2 text-white border-2 border-bolid border-white flex justify-center flex-col md:flex-row">
                <p>{{ soccerList.list[itemNum].t1}}</p>
                <p><b class="px-2 text-yellow-300">VS</b></p>
                <p>{{ soccerList.list[itemNum].t2}}</p>
              </div>
              <button class="w-11/12 py-2 px-4 text-center bg-white flex justify-between rounded-full focus:outline-none"
              @click="selectFun(soccerList.list[itemNum].tr1id)"
              :class="selectBtn == soccerList.list[itemNum].tr1id ? 'bg-green-300' : ''">
                <p>{{ soccerList.list[itemNum].t1}}</p> 
                <p>THẮNG</p>
              </button>
              <button class="w-11/12 py-2 px-4 text-center bg-white flex justify-between rounded-full focus:outline-none"
              @click="selectFun(soccerList.list[itemNum].tr2id)"
              :class="selectBtn == soccerList.list[itemNum].tr2id ? 'bg-green-300' : ''">
                <p>{{ soccerList.list[itemNum].t2}} </p>
                <p>THẮNG</p>
              </button>
              <button class="w-11/12 py-2 text-center bg-white rounded-full focus:outline-none"
              @click="selectFun(3)"
              :class="selectBtn == 3 ? 'bg-green-300' : ''">HÒA</button>
            </div>
            <button class=" absolute top-3 right-3 py-1 px-4 text-center bg-gradient-to-b text-white from-yellow-400 bg-yellow-600 rounded-full focus:outline-none"
              @click="subFun(soccerList.list[itemNum])">xác nhận</button>
          </div>
          <!-- 结果组 -->
          <div class=""
          v-show="upshot">
            <div class="text-center text-white font-bold leading-10 py-4">
              KẾT QUẢ TUẦN NÀY
            </div>
            <div class="divide-white divide-y-2 text-white border-t-2 border-b-2 border-solid border-white">
              <ul class="grid grid-cols-6 leading-10"
              v-for="item in betsMatch.list" :key="item.id">
                <li class="col-span-6 md:col-span-4 grid grid-cols-3 ">
                  <p class="col-span-3 lg:col-span-1 text-center md:text-left">{{item.match.esd}}</p>
                  <p class="col-span-3 lg:col-span-2 text-center md:text-left lg:text-center">{{item.match.t1}} <b>VS</b> {{item.match.t2}}</p>
                </li>
                <li class="col-span-6 md:col-span-2 text-right flex justify-center md:justify-end items-center"
                :class="item % 2 !== 0? 'text-red-600':'text-green-600'">
                  <svg class="w-6" v-if="item % 2 === 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg class="w-6" v-if="item % 2 !== 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {{item.type}} {{item.type === "A"? item.match.t1 : item.match.t2}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul class="w-11/12 lg:max-w-7xl mx-auto flex justify-center m-10 pb-10 flex-col lg:flex-row space-y-6 lg:space-x-20 text-white">
        <li class="w-full lg:w-3/12 bg-gray-900 bg-opacity-60 flex items-center relative py-2 rounded">
          <p class="w-8 absolute h-8 text-center leading-8 rounded-full top-2 left-16 bg-blue-600 text-xl">1</p>
          <img class="w-20" src="../assets/img/jackpot-soccer/icon-1.png"/>
          <p class="text-center px-4">VÉ THẮNG ĐỂ MỞ HỘP QUÀ</p>
        </li>
        <li class="w-full lg:w-3/12 bg-gray-900 bg-opacity-60 flex items-center relative py-2 rounded">
          <p class="w-8 absolute h-8 text-center leading-8 rounded-full top-2 left-16 bg-blue-600 text-xl">2</p>
          <img class="w-20" src="../assets/img/jackpot-soccer/icon-2.png"/>
          <p class="text-center px-4">VÉ THẮNG ĐỂ MỞ HỘP QUÀ</p>
        </li>
        <li class="w-full lg:w-3/12 bg-gray-900 bg-opacity-60 flex items-center relative py-2 rounded">
          <p class="w-8 absolute h-8 text-center leading-8 rounded-full top-2 left-16 bg-blue-600 text-xl">3</p>
          <img class="w-20" src="../assets/img/jackpot-soccer/icon-3.png"/>
          <p class="text-center px-4">VÉ THẮNG ĐỂ MỞ HỘP QUÀ</p>
        </li>
      </ul>
      
    <PromptBox :warningMsg="warningMsg" 
    :class="warningBox ? 'translate-y-0' : '-translate-y-full'"
    @hideWarning="hideWarning"/>
  </section>
</template>

<script lang="ts">
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
  background: url(../assets/img/jackpot-soccer/pc-bg.png) top center no-repeat;
  background-size: 100% 100%;
}
.soccer{
  background: #114783;
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
