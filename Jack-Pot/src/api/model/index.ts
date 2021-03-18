import api from "..";

export function hello(data: any){
    return api({
        method: "GET",
        url: `api/sport/matchList?weak=${data.weak}&leagueid=${data.leagueid}`
    })
}