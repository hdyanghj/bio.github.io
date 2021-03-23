import api from "..";

export function matchList(number: any){
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

export function leagueList(number: any){
    return api({
        method: "GET",
        url: `api/sport/leagueList?number=${number}`
    })
}

export function resultFun(number: any){
    return api({
        method: "GET",
        url: `api/sport/leagueList?number=${number}`
    })
}