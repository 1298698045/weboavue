//本周第一天
export function showWeekFirstDay()   
{   
  var Nowdate=new Date();   
  var WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);   
  var M=Number(WeekFirstDay.getMonth())+1   
  return WeekFirstDay.getFullYear()+"-"+M+"-"+WeekFirstDay.getDate();   
}
//本周最后一天
export function showWeekLastDay()   
{   
  var Nowdate=new Date();   
  var WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);   
  var WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);   
  var M=Number(WeekLastDay.getMonth())+1   
  return WeekLastDay.getFullYear()+"-"+M+"-"+WeekLastDay.getDate();   
}
//wdhm格式化
export function takentformat(takentime){
  if(takentime){
  let timearr = takentime.split(' ')
  for(let i=0;i<timearr.length;i++){
    let item = timearr[i].split('')
    let str = item[item.length-1]
    if(str=='w'){
      str = '周'
    }
    if(str=='d'){
      str = '天'
    }
    if(str=='h'){
      str = '时'
    }
    if(str=='m'){
      str = '分'
    }
    item[item.length-1] = str
    timearr[i] = item.join('')
  }
  takentime = timearr.join(' ')
  }
  return takentime
  
}
//wdhm格式计算
export function takentimechange(takentime,oldtime,oldTimeSpent,operator){
        var pattern = /^((\d+[w]\s)?|(\d+[w])\b)((\d+[d]\s)|(\d+[d])\b)?((\d+[h]\s)|(\d+[h])\b)?(\d+[m])?$/ 
        let rule = true
        if(!pattern.test(takentime)){
          rule = false
          takentime = ''
        }
        if(!oldtime&&oldtime!=''){
          const time = getwdhm(takentime)
          const newtakentime = setwdhm(time)
          return newtakentime
        }
        const otime = getwdhm(oldtime)
        const time = getwdhm(takentime)
        const oldspenttime = getwdhm(oldTimeSpent)
        
        let newtime = ''
        if(operator=='reduce'){
         newtime = otime - time + oldspenttime
        }else{
         newtime = otime + time - oldspenttime
        }

        const newremainingtime = setwdhm(newtime)
        const newtakentime = setwdhm(time)
        
        return {
          rule:rule,
          time:newremainingtime,
          newtakentime:newtakentime
        }
}

function getwdhm(string){
  const timearr = string.split(' ')
  const week = timearr.find((item)=>{return item.indexOf('w')!=-1})||0
  const date = timearr.find((item)=>{return item.indexOf('d')!=-1})||0
  const hour = timearr.find((item)=>{return item.indexOf('h')!=-1})||0
  const minute = timearr.find((item)=>{return item.indexOf('m')!=-1})||0
  const time = parseInt(week)*7*24*60 + parseInt(date)*24*60 + parseInt(hour)*60 + parseInt(minute)
  return time
}
function setwdhm(time){
  const nweek = parseInt(time/(7*24*60))
  const ndate = parseInt(time%(7*24*60)/(24*60))
  const nhour = parseInt(time%(7*24*60)%(24*60)/60)
  const nminute = time%(7*24*60)%(24*60)%60
  let newremainingtime = ''
  if(nweek>0){
      newremainingtime = nweek+'w '
  }
  if(ndate>0){
      newremainingtime += ndate+'d '
  }
  if(nhour>0){
      newremainingtime += nhour+'h '
  }
  if(nminute>0){
      newremainingtime += nminute+'m'
  }
  return newremainingtime
}