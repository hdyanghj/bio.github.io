import { ref, reactive } from 'vue'
import { bonus, betsSubmit } from '../../../api/model/index'
import { get } from '../../../api/request'
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
    const popWarning = (msg, type) =>{
    warningMsg.text = msg
    warningMsg.type = type
    // console.log(warningMsg)
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
      bonus().then((response) => {
        bonusList.list = response.data.data
        // console.log(bonusList.list);
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
    const selectNum  = ref('');
    // 输
    const lose = ref(false)
    const win = ref(false)
    
    // 开始
    const guessFun = async (e) => {
      if(!verifyCode.value){
        popWarning('Vui lòng nhập đúng mã xác minh', 'Error')
        return
      }
      // console.log(e)
      let params = {number:verifyCode.value}
      get('api/sport/queryMatch', params).then((res) => {
        // console.log(res.code)
        if(res.code === 500){
          popWarning('Không có trận đấu nào', 'Warning')
          // console.log('没有对应比赛')
          return
        }
        soccerList.list = []
        let bets = res.data.bets
        let matchesList = res.data.matches
        if(e === 1){
          // 开始竞猜
          if(matchesList){
            if(bets.length === matchesList.length) {
              popWarning('Tất cả các trận đấu đã được đoán', 'Success')
              betsFun(bets)
              return
            }
            if(bets){
              for(let i=0;i<matchesList.length;i++){
                // console.log(bets.length)
                for(let b=0;b<bets.length;b++){
                  matchesList.splice(i, 1);
                  // if(matchesList[i].eid === bets[b].match.eid){
                  //   console.log('一次')
                    
                  // }else{
                  //   console.log('没猜过')
                  //   // matchesItem.push(matchesList[i])
                  //   // soccerList.list.push(matchesList[i] as never)
                    
                  // }
                }
              }
              if(matchesList.length < 1 ){
                popWarning('Tất cả các trận đấu đã được đoán', 'Success')
              }else{
                btn.value = false
                games.value = true
              }
              // console.log(matchesList)
              soccerList.list = matchesList
              // console.log(soccerList.list)
            }else{
              // console.log('没有预测')
              soccerList.list = matchesList
            }
          }else{
            popWarning('Tuần này không có trận đấu nào', 'Warning')
            // console.log('本周末没有比赛')
          }
        }else{
          // 竞猜结果
          // console.log(bets)
          betsFun(bets)
        }
      })
    }
    const betsFun = (bets) => {
      if(bets.length !== 0){
        for(let i=0;i<bets.length;i++){
            bets[i].match.esd = bets[i].match.esd.substring(5,16)
            if(bets[i].match.eps === 'NS'){ //NS 就是没开赛
              bets[i].match.className = 'text-gray-400'
            }else{
              let type = ''
              if(bets[i].match.tr1>bets[i].match.tr2){
                type = 'A'
              }else if(bets[i].match.tr1<bets[i].match.tr2){
                type = 'B'
              }else{
                type = 'C'
              }
              if(bets[i].type === type){
                bets[i].lose = true
                bets[i].match.className = 'text-green-600'
              }else{
                bets[i].win = true
                bets[i].match.className = 'text-red-600'
              }
            }

        }
        betsMatch.list = bets
        btn.value = false
        upshot.value = true
      }else{
        guessFun(1)
        popWarning('Bạn chưa có lịch sử dự đoán nào', 'Warning')
        // console.log('没有竞猜记录')
      } 
    }
    // 获取比赛 ******************************** END

    // 跳转客服 ******************************** Start 
    const kfFun = (e) => {
      window.open(e,'_blank')
    }

    // 开始竞猜 ******************************** Start 
    const selectFun = (e,b) => {
      console.log(e,b)
      // selectBtn.value = e
      // selectNum.value = b
      soccerList.list[e].type = b
    }
    
    const subFun = () => {
      //  (1赢,2和)
      // console.log(e)
      let data = []
      let result = soccerList.list.find(item =>{
        if(!item.type) {
          popWarning('Bạn vẫn còn trận cược chưa chọn', 'Error')
          return
        }else{
          data.push({
            matchId: item.eid,
            number: verifyCode.value,
            type: item.type
          })
        }
      });
      if(soccerList.list.length !== data.length) return
      console.log(data)
      console.log(111)
      betsSubmit(data).then((response) => {
        // response.data.data
        // console.log(response.data);
        if(response.data.code === 200){
          if(response.data.msg === '操作成功'){
              // comeBack()
              guessFun(2)
              popWarning('Tất cả các trận đấu đã được đoán', 'Success')
          }
          return
        }
        if(response.data.code === 500){
          if(response.data.msg === '赛事已结束'){
            popWarning('Trận đấu đã kết thúc', 'Error')
            comeBack()
          }
          if(response.data.msg === '该比赛已投注'){
            popWarning('Trận đấu đã được dự đoán', 'Error')
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
      bonusFun,
      lose,
      win,
      kfFun
    };
})()