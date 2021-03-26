<template>
  <section class="soccer_bg pt-4 min-h-full md:pt-20">
      <div class="w-11/12 md:max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-4">
        <div class="w-full md:w-5/12 border-red-300">
          <div class="w-full flex justify-center"><img class="w-7/12" src="../assets/img/jackpot-soccer/v7_logo.png"/></div>
          <div class="w-full jiangchi1 p-10 flex flex-col justify-center items-center">
            <img class="w-7/12" src="../assets/img/jackpot-soccer/jiang-1.png"/>
            <p class="text-3xl text-white text-center font-bold">THẮNG ÍT NHẤT<br/>{{bonusList.list.value1}}</p>
          </div>
          <div class="w-full flex justify-end mt-4">
            <p class="jiangchi2 p-4 text-center text-white">
              <span class=" text-yellow-400">hơn {{bonusList.list.value1}}</span><br/>
              ĐÃ SẴN SÀNG PHÁT THƯỞNG<br/>TRONG MÙA NÀY</p>
          </div>
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
          v-if="games && soccerList.list.length>1">
            <div class="flex justify-center items-center flex-col space-y-6 h-full">
              <div class="text-white">{{ soccerList.list[itemNum].esd.substring(0, 10)}}</div>
              <div class="w-11/12 text-center py-2 text-white border-2 border-bolid border-white">
                {{ soccerList.list[itemNum].t1}} <b class="px-2">VS</b> {{ soccerList.list[itemNum].t2}}
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
              <!-- <ul class="grid grid-cols-4 col-span-5 text-center">
              <li class="col-span-2">TRANG CHỦ<br/>THẮNG</li>
              <li>HÒA</li>
              <li>THUA</li>
            </ul> -->
            </div>
            <div class="divide-white divide-y-2 text-white border-t-2 border-b-2 border-solid border-white">
              <ul class="grid grid-cols-6 h-10 leading-10"
              v-for="item in 10" :key="item">
                <li class="col-span-4 grid grid-cols-3 ">
                  <p class="col-span-1">25-02 02:00</p>
                  <p class="text-center col-span-2">A <b>VS</b> B</p>
                </li>
                <li class="col-span-2 text-right flex justify-end"
                :class="item % 2 !== 0? 'text-red-600':'text-green-600'">
                  <svg class="w-6" v-if="item % 2 === 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg class="w-6" v-if="item % 2 !== 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  B THẮNG
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul class="w-11/12 md:max-w-7xl mx-auto flex justify-center m-10 space-x-20 text-white">
        <li class="w-3/12 bg-gray-900 bg-opacity-60 flex items-center relative py-2 rounded">
          <p class="w-8 absolute h-8 text-center leading-8 rounded-full top-2 left-16 bg-blue-600 text-xl">1</p>
          <img class="w-20" src="../assets/img/jackpot-soccer/icon-1.png"/>
          <p class="text-center px-4">VÉ THẮNG ĐỂ MỞ HỘP QUÀ</p>
        </li>
        <li class="w-3/12 bg-gray-900 bg-opacity-60 flex items-center relative py-2 rounded">
          <p class="w-8 absolute h-8 text-center leading-8 rounded-full top-2 left-16 bg-blue-600 text-xl">2</p>
          <img class="w-20" src="../assets/img/jackpot-soccer/icon-2.png"/>
          <p class="text-center px-4">VÉ THẮNG ĐỂ MỞ HỘP QUÀ</p>
        </li>
        <li class="w-3/12 bg-gray-900 bg-opacity-60 flex items-center relative py-2 rounded">
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
import { ref, defineComponent, reactive, toRefs, onMounted } from 'vue'
import { getMatchList, bonus, matchList, betsSubmit } from '../api/model/index'
import PromptBox from '../components/PromptBox.vue'
export default defineComponent({
  name: 'HelloWorld',
  components:{
    PromptBox
  },
  setup: () => {
    // 警告框
    let warningBox = ref(false)
    let warningMsg = reactive({
      text: '',
      type: ''
    })
    // 验证码
    let verifyCode = ref('')
    // 当前题号
    let itemNum = ref(0);
    let soccerList = reactive({
      list: [],
    })
    let bonusList = reactive({
      list: [],
    })
    let matches = reactive([])
    let timer = reactive([])

    const btn = ref(false);
    const games  = ref(false);
    const upshot  = ref(true);
    const selectBtn  = ref(0);
    // 隐藏警告
    const hideWarning = () =>{
      warningBox.value = false
    }
    // 弹出警告
    const popWarning = (msg: string, type: string) =>{
      warningMsg.text = msg
      warningMsg.type = type
      console.log(warningMsg)
      warningBox.value = true
      setTimeout(()=>{
        warningBox.value = false
      },2000)
    }
    // 开始
    const guessFun = (e: number) => {
      if(!verifyCode.value){
        console.log('请输入验证码')
        popWarning('请输入验证码', 'Error')
        return
      }
      console.log(e)
      matchList(verifyCode.value).then((response: { data: any }) => {
        console.log(response.data)
        if(response.data.code === 500){
          popWarning('没有对应赛事', 'Warning')
          return
        }
        // soccerList.list = 
        let bets = response.data.data.bets
        let matchesList = response.data.data.matches
        if(e === 1){
          // 开始竞猜
          if(matchesList){
            if(bets){
              console.log('有预测')
              let matchesItem = []
              for(let i=0;i<matchesList.length;i++){
                console.log(i)
                console.log(bets.length)
                for(let b=0;b<bets.length;b++){
                  console.log(b)
                  if(matchesList[i].id === bets[b].match.id){
                    console.log('一次')
                  }else{
                    console.log('没有')
                    matchesItem.push(matchesList[i])
                  }
                }
              }
              console.log(matchesItem)
              soccerList.list = matchesItem
            }else{
              console.log('没有预测')
              soccerList.list = matchesList
            }
          }else{
            popWarning('本周末没有比赛', 'Warning')
            console.log('本周末没有比赛')
          }
        }else{
          // 竞猜结果
            console.log(bets)
            console.log(bets.match)
            soccerList.list = bets.match
          if(bets.match){
            
          }else{
            popWarning('没有竞猜记录', 'Warning')
            console.log('没有竞猜记录')
          }  
        }
        // soccerList.list = response.data.data
        // console.log(soccerList.list[0]);
      });
      console.log(btn.value)
      btn.value = false
      games.value = true
    }
    // 返回按钮
    const comeBack = () => {
      btn.value = true
      games.value = false
      upshot.value = false
    }

    // 获取奖金池
    const bonusFun = () => {
      bonus().then((response: { data: any }) => {
        bonusList.list = response.data.data
        console.log(bonusList.list);
      });
    }
    // 测试获取数据
    // const getList = () => {
    //   getMatchList().then((response: { data: any }) => {
    //     soccerList.list = response.data.data
    //     // console.log(response.data.data)
    //     console.log(soccerList.list[0]);
    //   });
    // }
    const selectFun = (e:number,b: any) => {
      console.log(e)
      selectBtn.value = e
      
      
      
      
    }
    
    const subFun = (e: any) => {
      let types = 'A'
      //  (1赢,2和)
      console.log(e)
      if(selectBtn.value === 3) types = 'C'
      let data = {
        matchId: e.eid,
        number: verifyCode.value,
        type: types
      }
      betsSubmit(data).then((response: { data: any }) => {
        // response.data.data
        console.log(response.data);
        if(response.data.code === 200){
          if(response.data.msg === '投注成功'){
            popWarning('Success', 'Success')
            itemNum.value ++
          }
          
          return
        }
        if(response.data.code === 500){
          if(response.data.msg === '赛事已结束'){
            popWarning('赛事已结束', 'Error')
            comeBack()
          }
          
          return
        }
      });
    }
    
    onMounted(() => {
      bonusFun()
      // getList()
    })

    return {
      verifyCode,
      btn,
      games,
      upshot,
      guessFun,
      comeBack,
      // getList,
      soccerList,
      itemNum,
      selectFun,
      selectBtn,
      subFun,
      bonusList,
      matches,
      warningBox,
      warningMsg,
      hideWarning
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
.jiangchi1{
  background: url(../assets/img/jackpot-soccer/Prize1.png) top center no-repeat;
  background-size: 100% 100%;
}
.jiangchi2{
  background: url(../assets/img/jackpot-soccer/Prize2.png) top center no-repeat;
  background-size: 100% 100%;
}
</style>
