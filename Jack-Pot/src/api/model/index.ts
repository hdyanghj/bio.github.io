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

export function betsSubmit(data: { matchId: any; number: any; teamid: any; type: any; leagueId: any; }){
    return api({
        method: "GET",
        url: `api/sport/bets?matchId=${data.matchId}&number=${data.number}&teamid=${data.teamid}&type=${data.type}&leagueId=${data.leagueId}`
    })
}

export function resultFun(number: any){
    return api({
        method: "GET",
        url: `api/sport/leagueList?number=${number}`
    })
}