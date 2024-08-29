import request from '@/utils/request2.js';
const qs = require('qs');

const rootUrl = '/apps/CommandProcessor.ashx'

function formatmessage(message){
  return qs.stringify({message:JSON.stringify(message)}) 
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

//通用列表
function changePwd(query) {
  return request({
    url: '/user/changePwd',
    method: 'post',
    data:formatmessage(query)
  })
}

//获取通用列表表头
function getentitygridconfig(entityType) {
  return request({
    url: '',
    method: 'get',
    params: {
        cmd:'entitygrid.config.get',
        entityType:entityType
    }
  })
}
//获取通用列表数据
function getentitygridlist(query) {
    query.cmd = 'entitygrid.list'
    return request({
      url: '',
      method: 'get',
      params: query
    })
}
//获取通用列表数据2
function getentityfetch(query) {
  query.cmd = 'entity.fetch'
  return request({
    url: '',
    method: 'get',
    params: query
  })
}
//通用保存
function entitysaverecord(fields,objtypecode,id) {
    return request({
      url: '',
      method: 'post',
      query:{cmd:'entity.saverecord'},
      data:formatmessagesaverecord(fields,objtypecode,id)
    })
}
//获取详情
export function entitygetdetail(objTypeCode,id) {
  return request({
    url: '',
    method: 'get',
    params:{
      objTypeCode:objTypeCode,
      id:id,
      cmd:'entity.detail.get'
    }
  })
}
//通用删除
export function entitydelete(objTypeCode,id) {
  return request({
    url: '',
    method: 'get',
    params:{
      objTypeCode:objTypeCode,
      id:id,
      cmd:'entity.delete'
    }
  })
}
//列表搜索
export function entitygridsearch(entityType,filterQuery,filterid,query) {
  return request({
    url: '',
    method: 'get',
    params:{
      filterId:filterid,
      entityType:entityType,
      filterQuery:filterQuery,
      cmd:'entitygrid.list',
      ...query
    }
  })
}
//列表搜索2
export function entityfetchsearch(objectTypeCode,filterQuery,sort,order,search) {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'entity.fetch',
      objectTypeCode: objectTypeCode,
      filterQuery: filterQuery,
      pageNumber: 1,
      pageSize: 100,
      sort: sort,
      order: order,
      search: search
    }
  })
}
//获取筛选器
export function entityfiltergetlist(entityType) {
  return request({
    url: '',
    method: 'get',
    params:{
      entityType:entityType,
      cmd:'entity.filter.getlist'
    }
  })
}
//获取单个筛选器
export function entityfilterget(id) {
  return request({
    url: '',
    method: 'get',
    params:{
      id:id,
      cmd:'entity.filter.get'
    }
  })
}
//保存筛选器
function entityfilterexpressionsave(filterExpression,objtypecode,id) {
  return request({
    url: '',
    method: 'post',
    query:{cmd:'entity.filter.expression.save'},
    data:qs.stringify({
      filterExpression:JSON.stringify(filterExpression),
      ObjectTypeCode:objtypecode,
      id:id
    })
  })
}
//获取对象的文件列表
export function getfilelist(id) {
  return request({
    url: '',
    method: 'get',
    params:{
      id:id,
      cmd:'file.attachfiles.getlist'
    }
  })
}
// 删除文件
function fileattachmentdelete(id){
  return request({
    url: '',
    method: 'get',
    params:{
      id:id,
      cmd:'file.attachment.delete'
    }
  })
}
// 成员树
function subordinatetree(){
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'user.subordinatetree.get'
    }
  })
}


export default {
  getentitygridconfig,
  getentitygridlist,
  getentityfetch,
  entitysaverecord,
  entitygetdetail,
  entitydelete,
  entitygridsearch,
  entityfetchsearch,
  entityfiltergetlist,
  entityfilterget,
  entityfilterexpressionsave,
  getfilelist,
  fileattachmentdelete,
  subordinatetree
}
