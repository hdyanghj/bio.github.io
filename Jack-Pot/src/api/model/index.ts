import api from "..";

export function hello(data: any){
    return api({
        method: "GET",
        url: `api/sport/matchList?weak=${data.weak}&leagueid=${data.leagueid}`
    })
}

export function bonus(data: string){
    return api({
        method: "GET",
        url: `api/sport/queryMatch?number=${data}`
    })
}