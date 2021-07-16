import axios from 'axios'
const BASE_URL = "https://api.joinhomebase.com/";
const locationID = "db6524f3-fb03-4609-97b8-9e8abf6d52ad"

const authHeaderToken = 'Bearer 7c05833dc574dd04e9c98e218de52a75aeb352499f3a2e4f0b229ab66e3657a1'

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        'Authorization':authHeaderToken,
    },
});

export async function getDaySchedule(currentDate){
    let page = 1;
    let pageSize = 50;
    let response = await axiosInstance.get(`locations/${locationID}/timecards?page=${page}&per_page=${pageSize}&start_date=${currentDate}&end_date=${currentDate}`);
    let result = response.data;
    //console.log(result)
    let len = result.length;
    while(len == pageSize){
        page+=1;
        let rtemp = await axiosInstance.get(`locations/${locationID}/timecards?page=${page}&per_page=${pageSize}&start_date=${currentDate}&end_date=${currentDate}`);
        len = rtemp.data.length;
        result = [
            ...result,
            ...rtemp.data
        ]
    }
    return result;
    //console.log(result)
}