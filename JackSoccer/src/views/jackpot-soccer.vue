<template>
  <section class="soccer_bg pt-4 pb-10 min-h-full lg:flex lg:justify-center lg:items-center relative">
    <div class="w-11/12 lg:max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-4">
      <div class="w-full  justify-center flex lg:hidden"><img class="w-5/12" src="../assets/img/jackpot-soccer/v7_logo.png"/></div>
      <div class="w-full text-yellow-300 text-center block lg:hidden" style="text-shadow:#000 1px 1px 2px">MỘT SẢN PHẨM ĐỘC QUYỀN CỦA V7</div>
      <div class="w-full lg:w-5/12 border-red-300 flex flex-col justify-center items-center">
        <div class="w-full lg:w-11/12 p-4 flex flex-col justify-center items-center relative">
          <img class="w-full" src="../assets/img/jackpot-soccer/jiang-qy.png"/>
          <div class="text-pr text-center text-white flex flex-col justify-center items-center absolute leading-4 lg:leading-5 text-xs lg:text-base">
            <p class="text-sm lg:text-lg font-bold">HƠN {{bonusList.list.value1}}</p>
            <p>ĐANG CHỜ BẠN TRONG</p>
            <p>MÙA GIẢI NÀY</p>
          </div>
        </div>
        <div class="w-full flex flex-col justify-center items-center space-y-3 lg:pr-4 lg:items-end lg:flex-row ">
          <div class="w-8/12 lg:w-5/12 h-8 cursor-pointer lg:mr-5 text-xs rounded bg-gray-50 flex justify-center bg-gradient-to-b from-blue-400 bg-blue-800 text-white py-2"
          @click="kfFun('https://direct.lc.chat/12580266/')">
            <img class="w-4 h-4 mr-2" src="../assets/img/jackpot-soccer/v7.png" alt="">
            <p>Liên Hệ CSKH Trực Tuyến</p>
          </div>
          <div class="w-8/12 lg:w-5/12 h-8 cursor-pointer text-xs rounded bg-gray-50 flex justify-center bg-gradient-to-b from-blue-400 bg-blue-800 text-white py-2"
          @click="kfFun('https://zalo.me/v7tramanh')">
            <img class="w-4 h-4 mr-2" src="../assets/img/jackpot-soccer/Zalo.png" alt="">
            <p>Hỗ Trợ Qua Zalo</p>
          </div>
        </div>
        <div class="w-full flex flex-col justify-center items-center space-y-3 mt-3 lg:mt-0 lg:pr-4 lg:items-end lg:flex-row ">
          <div class="w-8/12 lg:w-5/12 h-8 cursor-pointer lg:mr-5 text-xs rounded bg-gray-50 flex justify-center bg-gradient-to-b from-blue-400 bg-blue-800 text-white py-2"
          @click="kfFun('https://www.facebook.com/jackpotv7/?ref=pages_you_manage')">
            <img class="w-4 h-4 mr-2" src="../assets/img/jackpot-soccer/Facebook.png" alt="">
            <p>Facebook</p>
          </div>
          <div class="w-8/12 lg:w-5/12 h-8 cursor-pointer text-xs rounded bg-gray-50 flex justify-center bg-gradient-to-b from-blue-400 bg-blue-800 text-white py-2"
          @click="kfFun('https://t.me/V7CSKH')">
            <img class="w-4 h-4 mr-2" src="../assets/img/jackpot-soccer/Telegram.png" alt="">
            <p>Telegram</p>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-6/12 relative z-10 flex flex-col justify-center items-center">
        <div class="w-full justify-center hidden lg:flex"><img class="w-5/12" src="../assets/img/jackpot-soccer/v7_logo.png"/></div>
        <div class="w-full text-yellow-300 text-center hidden lg:block" style="text-shadow:#000 1px 1px 2px">MỘT SẢN PHẨM ĐỘC QUYỀN CỦA V7</div>
        <div class="usd-bg w-80 lg:w-96 h-24 lg:h-28 mt-4 pt-6 lg:pt-7 pl-14 lg:pl-16 pr-24 lg:pr-28 font-bold text-3xl lg:text-4xl text-yellow-200 flex justify-center items-center rounded-lg">
         {{dataTime}}
        </div>
          <!-- 按钮组 -->
        <div class="w-full border-4 border-solid border-white rounded-lg relative my-4 overflow-hidden">
          <div class="absolute py-3 px-3 z-30">
            <svg class="w-6 cursor-pointer text-white"
            @click="comeBack"
            v-show="!btn"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </div>
          <div class="h-full soccer py-7 lg:py-24" v-show="btn">
            <div class="w-9/12 lg:w-full flex justify-center items-center flex-col py-4 lg:pt-20 space-y-6">
              <div class="text-white text-center lg:text-xl px-4">Nhập mã xác minh để bắt đầu dự đoán hoặc xem kết quả</div>
              <div class="pl-0">
                <input class="p-2 text-center border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-transparent"
              type="text" v-model="verifyCode"/>
              </div>
              <div class="flex justify-center items-center text-xs text-white space-x-4">
                <button class="bg-gradient-to-b from-green-400 bg-green-800 hover:from-green-500 hover:bg-green-900 px-5 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                @click="guessFun(1)"
                maxlength="6">
                  Dự đoán ngay
                </button>
                <button class="bg-gradient-to-b from-purple-400 bg-purple-800 hover:from-purple-500 hover:bg-purple-900 px-5 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                @click="guessFun(2)">
                  Xem kết quả
                </button>
              </div>
            </div>
            <div class="w-4/12 absolute z-0 bottom-4 right-0 block lg:hidden" @click="signupFun"><img src="../assets/img/jackpot-soccer/jackpot.gif"/></div>
            <!-- <div class="w-4/12 absolute z-0 bottom-0 right-0 block lg:hidden"><img src="../assets/img/jackpot-soccer/qiuy.png"/></div> -->
          </div>
          <!-- 竞猜组 -->
          <div class="h-full soccercolor text-white"
          v-if="games && soccerList.list.length>0">
            <ul class="w-full font-bold text-xs flex justify-center items-center py-3 border-b-2 border-solid border-white">
              <li class="flex-1 text-center">
                LỰA CHỌN TRẬN ĐẤU CỦA BẠN
              </li>
              <li class="items-center text-center w-44 hidden lg:flex">
                <p class="px-1 leading-4">ĐỘI NHÀ<br/>THẮNG</p>
                <p class="px-1 border-l-2 border-r-2 border-solid border-white">HOÀ</p>
                <p class="px-1 leading-4">ĐỘI KHÁCH<br/>THẮNG</p>
              </li>
            </ul>
            <ul
            class="w-full text-xs flex justify-center items-center border-b-2 border-solid text-white border-white"
            v-for="(item,ind) in soccerList.list" :key="ind">
              <li class="flex-1 flex flex-col lg:flex-row px-2">
                <div class="pr-4">{{item.esd.substring(0, 10)}}</div>
                <div>
                  {{item.t1}}
                  <b class="px-2 text-yellow-300">V</b>
                  {{item.t2}}
                </div>
              </li>
              <li class="w-auto px-2 lg:w-44 flex flex-col lg:flex-row justify-between bg-green-500 bg-opacity-60 py-2 lg:py-4">
                <button class="my-1 lg:my-0 lg:mx-2 w-20 h-5 rounded"
                :class="item.type === 'A'? ' bg-blue-500': 'bg-white text-gray-900'"
                @click="selectFun(ind , 'A')">
                  <span class="text-xs block lg:hidden">ĐỘI NHÀ</span>
                </button>
                <button class="my-1 lg:my-0 lg:mx-2 w-20 h-5 rounded"
                :class="item.type === 'C'? 'bg-blue-500': 'bg-white text-gray-900'"
                @click="selectFun(ind , 'C')">
                  <span class="text-xs block lg:hidden">HOÀ</span>
                </button>
                <button class="my-1 lg:my-0 lg:mx-2 w-20 h-5 rounded"
                :class="item.type === 'B'? 'bg-blue-500': 'bg-white text-gray-900'"
                @click="selectFun(ind , 'B')">
                  <span class="text-xs block lg:hidden">ĐỘI KHÁCH</span>
                </button>
              </li>
            </ul>
            <div class="flex justify-center lg:justify-end py-4 px-4">
              <button class="w-auto py-1 px-10 text-md text-center bg-gradient-to-b text-white from-green-400 bg-green-600 rounded-full focus:outline-none"
              @click="subFun()">
                Xác nhận
              </button>
            </div>
          </div>
          <!-- 结果组 -->
          <div class="soccercolor" v-show="upshot">
            <div class="text-center text-sm font-bold text-white py-3">
              KẾT QUẢ TUẦN NÀY
            </div>
            <div class="divide-white text-xs divide-y-2 text-white border-t-2 border-b-2 border-solid border-white">
              <ul class="flex leading-10 lg:pl-2"
              v-for="item in betsMatch.list" :key="item.id">
                <li class="py-2 flex-1 flex flex-col px-2 lg:flex-row">
                  <p class="h-7 leading-7 pr-4">{{item.match.esd}}</p>
                  <p class="h-7 leading-7">
                    {{item.match.t1}}
                    <b class="px-2 text-yellow-300">V</b>
                    {{item.match.t2}}
                  </p>
                </li>
                <li class="w-24 flex justify-center items-center bg-white bg-opacity-60"
                :class="item.match.className">
                  <svg class="w-6" v-if="item.lose" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg class="w-6" v-if="item.win" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {{item.type === "A"? 'ĐỘI NHÀ' : item.type === "B"? 'ĐỘI KHÁCH' : 'HOÀ'}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-auto cursor-pointer absolute z-20 bottom-10 right-0 hidden lg:block" @click="signupFun"><img src="../assets/img/jackpot-soccer/jackpot.gif"/></div>
    <PromptBox :warningMsg="warningMsg" 
    :class="warningBox ? 'translate-y-0' : '-translate-y-full'"
    @hideWarning="hideWarning"/>
    <!-- <div class="w-2/12 absolute z-0 bottom-0 right-0 hidden lg:block"><img src="../assets/img/jackpot-soccer/qiuy.png"/></div> -->
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
      jackpot.startbFun()
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
  background: url(../assets/img/jackpot-soccer/soccer-bg.png) top center no-repeat;
  background-size: 100% auto;
}
.usd-bg{
  background: url(../assets/img/jackpot-soccer/jackpot51.png) top center no-repeat;
  background-size: 100% auto;
}
@media (max-width:768px) {
  .soccer_bg {
    background:#4c681d url(../assets/img/jackpot-soccer/pc-bg.png) -150px top no-repeat;
    background-size: auto 100%;
  }
  .soccer{
    background: url(../assets/img/jackpot-soccer/soccer-bg.png) top center no-repeat;
    background-size: 100% 100%;
  }
}
.soccercolor{
  background: rgba(39,181,250, 0.8);
}
.text-pr{
  right: 12%;
  left: 36%;
  bottom: 6%;
  height: 15%;
}
</style>
