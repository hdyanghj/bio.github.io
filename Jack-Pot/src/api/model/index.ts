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

export function getMatchList(){
    return api({
        method: "GET",
        url: `api/sport/matchList?weak=2021-03-16&leagueid=842`
    })
}

export function betsSubmit(data: { matchId: any; number: any; type: any; }){
    return api({
        method: "GET",
        url: `api/sport/bets?matchId=${data.matchId}&number=${data.number}&type=${data.type}`
    })
}

export function resultFun(number: any){
    return api({
        method: "GET",
        url: `api/sport/leagueList?number=${number}`
    })
}