import { ref, defineComponent, reactive, toRefs, onMounted } from 'vue'
import { getMatchList, bonus, matchList, betsSubmit } from '../../../api/model/index'
export default ( function (){
    // 警告框******************************** Start 
    let warningBox = ref(false)
    let warningMsg = reactive({
      text: '',
      type: ''
    })

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

    // 警告框 ******************************** END

    // 返回按钮 ******************************** Start 
    const comeBack = () => {
        btn.value = true
        games.value = false
        upshot.value = false

        verifyCode.value = ''
        soccerList.list = []
        selectBtn.value = 0
        itemNum.value = 0
    }
    // 返回按钮 ******************************** END

    
    // 获取奖金池 ******************************** Start 
    let bonusList = reactive({
        list: [],
    })

    
    const bonusFun = () => {
      bonus().then((response: { data: any }) => {
        bonusList.list = response.data.data
        console.log(bonusList.list);
      });
    }
    
    // 获取奖金池 ******************************** END


    // 获取比赛 ******************************** Start 
    // 验证码
    let verifyCode = ref('')
    // 当前题号
    let itemNum = ref(0);
    // 比赛列表
    let soccerList = reactive({
      list: [],
    })
    let betsMatch = reactive({
        list: []
    })

    const btn = ref(true);
    const games  = ref(false);
    const upshot  = ref(false);
    const selectBtn  = ref(0);
    
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
        soccerList.list = []
        let bets = response.data.data.bets
        let matchesList = response.data.data.matches
        if(e === 1){
          // 开始竞猜
          if(matchesList){
            if(bets){
              console.log('有预测')
              for(let i=0;i<matchesList.length;i++){
                console.log('所有'+i)
                // console.log(bets.length)
                for(let b=0;b<bets.length;b++){
                  console.log('猜过所有'+b)
                  if(matchesList[i].id === bets[b].match.id){
                    console.log('一次')
                  }else{
                    console.log('没猜过')
                    matchesList.splice(i, 1);
                    // matchesItem.push(matchesList[i])
                    // soccerList.list.push(matchesList[i] as never)
                    
                  }
                }
              }
              console.log(matchesList)
              soccerList.list = matchesList as never
              btn.value = false
              games.value = true
              console.log(soccerList.list)
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
          if(bets){
            for(let i=0;i<bets.length;i++){
                bets[i].match.esd = bets[i].match.esd.substring(5,16)
            }
            betsMatch.list = bets
            btn.value = false
            upshot.value = true
          }else{
            popWarning('没有竞猜记录', 'Warning')
            console.log('没有竞猜记录')
          }  
        }
        // soccerList.list = response.data.data
        // console.log(soccerList.list[0]);
      });
    }
    // 获取比赛 ******************************** END

    // 开始竞猜 ******************************** Start 
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
    // 开始竞猜 ******************************** END
    

    return {
      verifyCode,
      btn,
      games,
      upshot,
      guessFun,
      comeBack,
      soccerList,
      itemNum,
      selectFun,
      selectBtn,
      subFun,
      bonusList,
      betsMatch,
      warningBox,
      warningMsg,
      hideWarning,
      bonusFun
    };
})()