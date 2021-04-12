import api from "..";

export function matchList(number){
    return api({
        method: "GET",
        url: `api/sport/queryMatch?number=${number}`
    })
}

export function bonus(){
    return api({
        method: "GET",
        url: `api/sport/bonus`
    })
}

export function getMatchList(){
    return api({
        method: "GET",
        url: `api/sport/matchList?weak=2021-03-16&leagueid=842`
    })
}

export function betsSubmit(data){
    return api({
        method: "POST",
        url: 'api/sport/betsV2',
        data: data
    })
}

export function resultFun(number){
    return api({
        method: "GET",
        url: `api/sport/leagueList?number=${number}`
    })
}