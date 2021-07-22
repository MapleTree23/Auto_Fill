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
export async function getItemInfoList(){
    let response = await axios.get('/api/manager/getItems')
    let result = response.data.items;
    //console.log(result)
    return result;
}
export async function getCompletedList(cdate){
    let result = await axios.get('/api/manager/shifts/get',{
        params:{
            cdate:cdate
        }
    })
    return result.data.completed
}
/**TASK */
export function getTaskList(){
    return axios.get(`/api/manager/task/get`)
}
export async function SaveNewTask(newtaskList,orignaltaskList){
    if(newtaskList.length == 0)
        return orignaltaskList;
    await axios.post('/api/manager/task/post',{
        params:{
            tasks:newtaskList
        }
    })
    let result = await axios.get(`/api/manager/task/get`)
    return result.data.tasks
}
/**TASK------- */
/**ITEM */
export async function getItemList(){
    let result = await axios.get(`/api/manager/items/get`)
    return result.data.items
}
export async function SaveNewItemList(newItemList){
    await axios.post(`/api/manager/items/post`,{
        params:{
            items:newItemList
        }
    })
    let result = await getItemList();
    return result
}
/**ITEM---------- */
/**SHIF */
export async function SaveShift(shift)
{
    console.log(shift)
    let result = await axios.post(`/api/manager/shifts/post`,{
        params:{
            shift:shift
        }
    })
    return result.data.result.insertId
}
/**Shif------ */
/**TotalInfo */
export async function SaveTotalInfo(totalList){
    let result = await axios.post(`/api/manager/post`,{
        params:{
            totalList:totalList
        }
    })
    return result
}
/**----TotalInfo */
export async function saveInfo(personInfo,scheduleInfo){

    console.log(scheduleInfo)
    let tasklists = []
    for(let i = 0;i < scheduleInfo.length;i++){
        if(tasklists.indexOf(scheduleInfo[i].task) == -1){
            tasklists =  [
                ...tasklists,
                scheduleInfo[i].task
            ]
        }
    }
    let postTasks = await axios.post('/api/manager/task/post',{
            params:{ 
                tasks:tasklists
            }
        }
    )
    console.log(postTasks)
}