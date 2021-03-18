<template>
  <section class="soccer_bg pt-4 min-h-full md:pt-20">
      <div class="w-11/12 md:max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-4">
        <div class="w-full md:w-5/12 border-red-300">
          <div class="w-full"><img class="w-5/12" src="../assets/img/jackpot-soccer/v7_logo.png"/></div>
          <div class="w-full"><img class="w-full" src="../assets/img/jackpot-soccer/Prize1.png"/></div>
          <div class="w-full flex justify-end"><img class="w-5/12" src="../assets/img/jackpot-soccer/Prize2.png"/></div>
        </div>
        <div class="w-full md:w-7/12 soccer border-4 border-solid border-white p-8 rounded-lg relative">
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
            type="text"/>
            <div class="flex justify-center items-center text-white space-x-4">
              <button class="bg-gradient-to-b from-red-400 bg-red-800 hover:from-red-500 hover:bg-red-900 px-5 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              @click="guessFun">
                立即竞猜
              </button>
              <button class="bg-gradient-to-b from-yellow-400 bg-yellow-800 hover:from-yellow-500 hover:bg-yellow-900 px-5 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
              @click="resultFun">
                查看结果
              </button>
            </div>
            
          </div>
          <!-- 竞猜组 -->
          <div class="h-full text-sm"
          v-if="games && soccerList.list.length>1">
            <div class="flex justify-center items-center flex-col space-y-6 h-full">
              <div class="text-white">{{ soccerList.list[itemNum].esd.substring(0, 10)}}</div>
              <div class="w-11/12 text-center py-2 text-white border-2 border-bolid border-white">
                {{ soccerList.list[itemNum].t1}} <span class="px-2">VS</span> {{ soccerList.list[itemNum].t2}}
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
              @click="selectFun()">xác nhận</button>
          </div>
          <!-- 结果组 -->
          <div class=""
          v-show="upshot">
            <input type="text"/>
          </div>
        </div>
      </div>
      <ul class="w-11/12 md:max-w-7xl mx-auto flex justify-center m-10 space-x-20">
        <li class="w-3/12 bg-gray-900 bg-opacity-60">1</li>
        <li class="w-3/12 bg-gray-900 bg-opacity-60">1</li>
        <li class="w-3/12 bg-gray-900 bg-opacity-60">1</li>
      </ul>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onMounted } from 'vue'
import { hello } from '../api/model/index'
export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    let itemNum = ref(0);
    let soccerList = reactive({
      list: [],
    })

    const btn = ref(false);
    const games  = ref(true);
    const upshot  = ref(false);
    const selectBtn  = ref(0);

    const guessFun = () => {
      console.log(btn.value)
      btn.value = false
      games.value = true
    }
    const resultFun = () => {
      console.log(upshot.value)
      btn.value = false
      upshot.value = true
    }
    const comeBack = () => {
      btn.value = true
      games.value = false
      upshot.value = false
    }
    
    const getList = () => {
      
      // .get("http://112.213.118.251:8080/api/sport/matchList?weak=2021-03-16&leagueid=842")
      let data = {
        weak: '2021-03-16',
        leagueid: '842'
      }
      hello(data).then((response: { data: any }) => {
        soccerList.list = response.data.data
        console.log(soccerList.list[0]);
      });
    }
    const selectFun = (e:number) => {
      console.log(e)
      selectBtn.value = e
      
    }
    
    onMounted(() => {
      getList()
    })

    return {
      btn,
      games,
      upshot,
      guessFun,
      resultFun,
      comeBack,
      getList,
      soccerList,
      itemNum,
      selectFun,
      selectBtn
     };
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
</style>
