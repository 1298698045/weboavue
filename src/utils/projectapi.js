import request from '@/utils/request2.js';
const qs = require('qs');

function formatmessage(message){
  return qs.stringify({message:JSON.stringify(message)}) 
}

function formatparamsmessage(message){
  return qs.stringify({
    message:JSON.stringify({actions:[{
      params:message
    }]})
  }) 
}

function formatmessagesaverecord(fields,objtypecode,id){
  var str = {
    params:{
      recordRep:{
        objTypeCode:objtypecode,
        fields:fields,
        id:id
      }
    }
  }
  str = JSON.stringify(str)
  return qs.stringify({message:str}) 
}

//项目列表
export function projectminesearch(query) {
  if(query){ 
    query.cmd = 'project.mine.search'
  }else{
    var query = {
      cmd:'project.mine.search'
    }
  }
  return request({
    url: '',
    method: 'get',
    params:query
  })
}

//改变项目列表
export function projecttaskchangelist(query) {
  query.cmd = 'project.task.changelist'
  return request({
    url: '',
    method: 'get',
    params: query
  })
}

//获取任务列表
// export function getprojecttasklist(query) {
//   query.cmd = 'project.task.treelist'
//   return request({
//     url: '',
//     method: 'get',
//     params: query
//   })
// }
export function getprojecttasklist(fields) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'BusinessListViewItems'},
    data:formatparamsmessage(fields)
  })
}

//获取任务列表表头
export function getavailablefields(query) {
  query.cmd = 'project.availablefields.get'
  return request({
    url: '',
    method: 'get',
    params: query
  })
}

//获取任务日历
export function getprojecttaskcalendar(fields) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'BusinessCalendarViewPaginatedItems'},
    data:formatparamsmessage(fields)
  })
}

//获取看板列表
export function getprojectboardtasklist(query) {
  query.cmd = 'project.tasklist.getlist'
  return request({
    url: '',
    method: 'get',
    params: query
  })
}


//获取看板数据
// export function getprojectboardtask(query) {
//   query.cmd = 'project.task.getlist'
//   return request({
//     url: '',
//     method: 'get',
//     params: query
//   })
// }
export function getprojectboardtask(fields) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'BusinessBoardViewItems'},
    data:formatparamsmessage(fields)
  })
}


//获取任务评论
export function projectcommentgetlist(fields) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'project.comment.getlist'},
    data:formatparamsmessage(fields)
  })
}
//项目-最近使用
export function projectlatestgetlist(query) {
  return request({
    url: '',
    method: 'get',
    params: {
      cmd:'project.latest.getlist',
      ...query
    }
  })
}
//项目-已标星
export function InternalFavourites() {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'InternalFavourites'
    }
  })
}
//我的工作台-最近
export function SingleRecentList() {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'SingleRecentList'
    }
  })
}
//我的工作台-已分配

//获取事务列表
export function IssueListQuery(entityType,filterQuery,filterid,query) {
  return request({
    url: '',
    method: 'get',
    params:{
      filterId:filterid,
      entityType:entityType,
      filterQuery:filterQuery,
      cmd:'IssueListQuery',
      ...query
    }
  })
}
//获取事务列表表头
export function GlobalIssueListHeaderLoad(filterid) {
  return request({
    url: '',
    method: 'get',
    params:{
      filterId:filterid,
      entityType:'00U',
      cmd:'GlobalIssueListHeaderLoad'
    }
  })
}
//获取新建事务布局
export function GlobalIssueCreateModalLoad(projectId) {
  return request({
    url: '',
    method: 'get',
    params:{
      projectId:projectId,
      cmd:'GlobalIssueCreateModalLoad'
    }
  })
}

//获取项目成员
export function projectmembersearch(fields) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'project.member.search'},
    data:formatparamsmessage(fields)
  })
}
//获取新建项目布局
export function GlobalProjectCreateModalLoad(projectId) {
  return request({
    url: '',
    method: 'get',
    params:{
      projectId:projectId,
      cmd:'GlobalProjectCreateModalLoad'
    }
  })
}
//项目摘要
export function projectsummarystatistics(projectId) {
  return request({
    url: '',
    method: 'get',
    params:{
      projectId:projectId,
      cmd:'project.summary.statistics'
    }
  })
}
//面板排序
export function TransitionAndRankJWMBoardView(fields) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'TransitionAndRankJWMBoardView'},
    data:formatparamsmessage(fields)
  })
}
//列表排序
export function ListViewRankBefore(issueId,relativeIssueId) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'ListViewRankBefore'},
    data:formatparamsmessage({issueId:issueId,relativeIssueId:relativeIssueId})
  })
}
//列表排序
export function ListViewRankAfter(issueId,relativeIssueId) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'ListViewRankAfter'},
    data:formatparamsmessage({issueId:issueId,relativeIssueId:relativeIssueId})
  })
}
//首页项目
export function HomeBoardProjectRecent() {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'HomeBoardProjectRecent'
    }
  })
}
//获取事务详情
export function IssueDataGet(id) {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'IssueDataGet',
      id:id
    }
  })
}
//日报
export function WorklogListViewItems(filterQuery) {
  return request({
    url: '',
    method: 'post',
    query:{
      cmd:'WorklogListViewItems',
    },
    data:formatparamsmessage({filterQuery:filterQuery})
  })
}
//选择我未完成的事务
export function IssueLookup() {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'IssueLookup',
    }
  })
}
//保存个人日报
export function WorklogEdit(fields,objtypecode,id) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'WorklogEdit'},
    data:formatmessagesaverecord(fields,objtypecode,id)
  })
}
//获取文件
export function filesharegetlist(search,id='10010000-0000-0000-0000-000000000003') {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'file.files.search',
      folderid:id
    }
  })
}
//新建文件夹
export function filedirectorycreate(name,id='10010000-0000-0000-0000-000000000003') {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'file.directory.create',
      Name:name,
      ParentId:id
    }
  })
}
//文件夹删除
export function filedirectorydelete(id) {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'file.directory.delete',
      Id:id
    }
  })
}
//文件删除
export function filedelete(id) {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'file.delete',
      Id:id
    }
  })
}
//文件重命名
export function filefileinforename(id,name) {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'file.fileinfo.rename',
      Id:id,
      name:name
    }
  })
}
//文件夹重命名
export function filedirectoryinforename(id,name) {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'file.directoryinfo.rename',
      Id:id,
      name:name
    }
  })
}
export function ProjectEdit(fields,objtypecode,id){
  return request({
    url: '',
    method: 'post',
    query:{cmd:'ProjectEdit'},
    data:formatmessagesaverecord(fields,objtypecode,id)
  })
}

//获取状态类别
export function getStatusCategory() {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'StatusCategoryList'
    }
  })
}
//获取首页事务统计数据
export function getIssueStatistics() {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'UserIssueStatistics'
    }
  })
}

//表决
export function IssueVote(fields) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'IssueVote'},
    data:formatparamsmessage(fields)
  })
}

//获取关注列表接口
export function getIssueWatchers() {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'IssueWatchers'
    }
  })
}
//获取权限接口
export function getIssueViewInteractiveQuery() {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'IssueViewInteractiveQuery'
    }
  })
}