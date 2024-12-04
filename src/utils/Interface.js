const baseUrl = 'api';
const Interface = {
  // 待办事务
  todoList: {
    treedata: "/localData/treedata.json",
    tabs: "/localData/tabs.json",
    datalist: "/localData/datalist.json",
  },
  // formSearch: "/localData/formSearch.json",
  formSearch: "/localData/formSearch3.json",
  applist: "/localData/applist.json",
  workflow: {
    //processList: "/localData/process.search.json",
    processType: baseUrl + "/workflow/Process/getCategories",//新建流程分类
    getAuthorizedProcess: baseUrl + "/workflow/Process/getAuthorizedProcess",//获取当前用户可以访问的流程
    getCommonUses: baseUrl + "/workflow/Process/getCommonUses",//获取常用流程
    getFavorites:baseUrl + "/workflow/Process/getFavorites",//获取收藏流程
    new:baseUrl + "/workflow/ProcessInstance/new",//新建流程
    getProcessDefinitionInfo: baseUrl + "/aura/workflow/Process/getProcessDefinitionInfo", // 获取流程定义简要
    getRelatedObjects: baseUrl + "/objectmanager/object/getRelatedObjects", // 根据对象ID，包括主表、子表信息
    updateRecordBatch: baseUrl + "/aura/RecordUi/updateRecordBatch", // 保存表单 - 同时保存主子表
    getPermission: baseUrl + "/aura/workflow/definition/activity/getPermission", // 流程节点权限
    getTransitions: baseUrl + "/aura/workflow/Process/activity/getTransitions", // 获取节点转移路径
    getParticipators: baseUrl + "/aura/workflow/Process/activity/getParticipators", // 获取节点办理人员
  },
  businessunitList: "/localData/user.businessunit.getlist.json",
  userInfo: "/localData/user.info.get.json",
  instanceList: "/localData/process.instance.related.getlist.json", // 相关事务列表
  files: "/localData/process.instance.file.getlist.json", // 事务附件
  rulelogList: "/localData/process.instance.rulelog.getlist.json", // 事务流转信息,
  readlogList: "/localData/process.instance.readlog.getlist.json", // 阅读记录
  commentList: "/localData/chatter.search.json", // 通用评论列表
  sendComment: "/localData/chatter.post.json", // 发送评论
  // 办理记录
  doRecordList: "/localData/process.instance.finishedtask.search.json",
  // 我的发起
  myStartList: "/localData/process.instance.owner.search.json",
  // 退件箱
  returnBoxList: "/localData/process.instance.canceltask.search.json",
  // 收到的传阅
  receivedCirculationList:
    "/localData/process.instance.receive.foward.search.json",
  // 我传阅的
  myCirculationList: "/localData/process.instance.foward.search.json",
  // 草稿箱
  draftsList: "/localData/wf.instanceowner.search.json",
  //通用列表和视图
  listView: {
      config: "/localData/entitygrid.config.get.json",
      // list: "/localData/entitygrid.list.json",
      list: baseUrl + "/listview/data/getItems",
      // list: "/listview/filter/listViewPicker",
      handleActions: "/localData/listview.handle.actions.json",
      filterList: baseUrl + "/listview/filter/listViewPicker", // 对象筛选器列表
      getMetadataInitialLoad: baseUrl + "/listview/listViewManager/getMetadataInitialLoad", // 获取元数据
      getFilterInfo: baseUrl + "/listview/listViewManager/getFilterInfo", // 列头
      actions: baseUrl + "/listview/Actions/handleAction",
      actionsrow: baseUrl + "/aura/ui/global/components/ActionsManager/ListviewRecord/handleAction",//行记录按钮
      actionstop: baseUrl + "/aura/ActionsController/handleAction",//右上角按钮
      createListView: baseUrl+'/aura/listViewManager/createListView',//创建视图
      updateListView: baseUrl+'/aura/listViewManager/updateListView',//重命名视图、共享设置、选择要显示字段、保存筛选器
      deleteListView: baseUrl+'/aura/listViewManager/deleteListView',//删除视图
      copyListView: baseUrl+'/listview/filter/clone',//复制视图
      getListView: baseUrl+'/aura/listViewManager/getAdditionalMetadata',//获取单个视图/筛选器
      pinListView: baseUrl+'/aura/listViewManager/pinListView',//固定视图
      chartData: baseUrl + "/aura/ObjectHomeChart/getMetadata", // 图表 - 获取列表图表元数据
      chartList: baseUrl + "/aura/listViewManager/pinListView", // 图表 - 获取列表视图图表
      chartItems: baseUrl + "/aura/ObjectHomeChart/getChartItems", // 获取图表数据
      getFilter: "", // 
      saveFilter: baseUrl + "/aura/listViewManager/updateListView", // 保存筛选器
  },
  uilook: "/localData/ui.entity.lookup.json",
  entityFilter: "/localData/entity.filter.get.json",

  // entityConfig: "/localData/entity.config.get.json", // 通用弹窗布局配置
  // picklist: "/localData/layout.picklistvalues.get.json",
  entityConfig: "/localData/common/entity.config.get.json", // 通用弹窗布局配置
  picklist: "/localData/common/layout.picklistvalues.get.json",
  treeList: "/localData/tree.get.json",
  user: {
    mybusinessUser: "/localData/user/user.mybusiness.getlist.json", // 同部门下用户
    roleUser: "/localData/user/sys.role.search.json", // 角色
    groupList: "/localData/user/sys.group.search.json", // 小组列表
    groupUser: "/localData/user/sys.group.member.search.json", // 小组下用户
    sysUser: "/localData/user/sys.user.search.json",
    usersettings: "/localData/user/sys.usersettings.get.json",
    getBusinessUnits:baseUrl + "/one/user/getBusinessUnits", // 获取登录用户所有兼职部门
    switch:baseUrl + "/one/user/switch", // 切换用户
  },
  saveRecord: "/localData/entity.saverecord.json",
  // 通讯录
  addressBook: {
    lastList: "/localData/addressBook/user.latestuse.getlist.json", // 最近联系人
    addresslist: "/localData/addressBook/addresslist.search.json", // 全部联系人
  },
  group: {
    list: "/localData/group/sys.group.member.search.json",
    statusList: "/localData/group/chatter.status.search.json", // 动态
    //statistics: "/localData/group/chatter.status.statistics.json", // 统计
    statistics: baseUrl + "/one/group/getSummaryReport", // 统计
    addPeople: "/localData/group/sys.group.member.add.json", // 添加成员
  },
  email: {
    inboxList: "/localData/email/email.inbox.search.json", //邮件列表
    myEmailFolder: "/localData/email/email.folder.my.json", // 我的文件夹
    emailInfo: "/localData/email/email.info.get.json", // 邮件详情
    read: "/localData/email/email.read.mark.json", // 未读/已读邮件设置
    star: "/localData/email/email.star.mark.json", // 重要邮件
    send: "/localData/email/email.send.json", // 发送邮件
    saveDraft:baseUrl + "/email/saveDraft", // 保存草稿
    send:baseUrl + "/email/send", // 发送邮件
    sendbatch:baseUrl + "/email/sendbatch", // 群发邮件
    upload:baseUrl + "/email/upload", // 上传附件
    inboxSearch:baseUrl + "/email/inbox/search", // 查询收件箱
    draftboxSearch:baseUrl + "/email/draftbox/search", // 查询草稿箱
    sentboxSearch:baseUrl + "/email/sentbox/search", // 查询发件箱
    getMail:baseUrl + "/email/getMail", // 获取单个邮件信息
    getAttachments:baseUrl + "/email/getAttachments",//获取邮件附件列表
    deletePermEmail:baseUrl + "/email/deletePermEmail",//删除箱永久删除
  },
  meeting: {
    userTree: "/localData/meeting/user.subordinatetree.get.json", // 人员组织
    //getall: "localData/meeting/meeting.getall.json", // 日历月数据
    getall: baseUrl + "/ui.meeting.components/getAllCalendars", // 日历月/周/日数据
    config: "localData/meeting/config.json",
    relatedrecords: "/localData/meeting/entity.relatedrecords.get.json", // 相关列表数据
    relatedrecords2: "/localData/meeting/entity.relatedrecords.get2.json", // 相关列表数据
    sharedList: "/localData/meeting/calendar.shared.mylist.json", // 会议共享-已添加人
    sharedRight: "/localData/meeting/calendar.shared.right.json", // 会议共享-权限设置
    addShare: "/localData/meeting/calendar.share.json", // 会议共享-添加权限
    removeShare: "/localData/meeting/calendar.share.remove.json",
    meetingPeople: "/localData/meeting/meeting.people.search.json", // 详情-参会人员
    detail: "/localData/meeting/entity.recordandlayout.get.json",
    remind:baseUrl + "/ui.meeting.components/publish"//会议提醒
  },
  meetingRoom: {
    //roomList: "/localData/meetingRoom/meetingroom.reservation.getlist2.json",
    roomList: baseUrl + "/ui.meetingroom.components/getAllCalendars",
    meeting: baseUrl + "/ui.meeting.components/getAllCalendars",
  },
  file: {
    list: "/localData/fileAdmin/file.files.search.json",
    child: "/localData/fileAdmin/child.json",
    tree: "/localData/fileAdmin/file.tree.json",
    move: "/localData/fileAdmin/filefolder.move.json",
    access: "/localData/fileAdmin/folder.share.access.json",
    removecontentaccess: "/localData/fileAdmin/removecontentaccess.json", // 已添加人删除
    updatecontentaccess: "/localData/fileAdmin/updatecontentaccess.json", // 更新权限
    addAccess: "/localData/fileAdmin/add.content.access.json",
    readRecord: "/localData/fileAdmin/entitygrid.list.json",
    delete: "/localData/fileAdmin/filefolder.delete.json",
    favorite: "/localData/fileAdmin/file.favorite.add.json", // 收藏
    deleteFavor: "/localData/fileAdmin/file.favorite.delete.json", // 取消收藏
    commentList: "/localData/fileAdmin/chatter.comment.search.json", // 图片评论列表
    sendComment: "/localData/fileAdmin/chatter.comment.post.json",
    like: "/localData/fileAdmin/chatter.like.post.json",
    deleteComment: "/localData/fileAdmin/chatter.comment.delete.json"
  },
  information: {
    contentTree: "/localData/information/content.tree.json",
    detail: "/localData/information/entity.recordandlayout.get.json",
    files: "/localData/information/file.attachment.getlist.json",
    tags: "/localData/information/content.tag.getlist.json",
    invite: "/localData/information/content.reader.invite.json",
    readList: "/localData/information/content.news.reader.list.json",
    contentRelated: "/localData/information/content.news.related.list.json",
    like: "/localData/information/content.news.likeordislike.set.json",
    likeDetail: "/localData/information/content.news.content.get.json",
    peopleList: "/localData/information/content.reader.search.json", // 人员信息列表
    tree: "/localData/information/content.item.permission.tree.json",
    categoryList: "/localData/information/content.category.list.json", // 隶属栏目
    attachmentCategory:
      "/localData/information/attachment.category.getlist.json", // 附件分类
      commentList: "/localData/information/chatter.comment.search.json", // 图片评论列表
      sendComment: "/localData/information/chatter.comment.post.json",
      like: "/localData/information/chatter.like.post.json"
  },
  schedule: {
    //list:"/localData/schedule/calendar.getlist.json",
    list: baseUrl + "/ui.calendar.components/getAllCalendars",//日程日历
    pickList: "/localData/schedule/layout.picklistvalues.get.json",
    save: "/localData/schedule/calendar.event.edit.json", // 保存
    sharedList: "/localData/schedule/calendar.shared.mylist.json",
    updatecontentaccess: "/localData/schedule/calendar.shared.right.json",
    addAccess: "/localData/schedule/calendar.share.json",
  },
  scheduleTable: {
    list: "/localData/scheduleTable/calendar.all.getlist.json"
  },
  leaderSchedule: {
    list: "/localData/leaderSchedule/calendar.leader.getlist.json"
  },
  // 会议活动
  meetingActivity: {
    list: "/localData/meetingActivity/campaign.activity.getcampaignlist.json",
    calendarList: "/localData/meetingActivity/campaign.people.getlist.json", // 日历数据
  },
  // 会议报表
  meetingRpt: {
    list: "/localData/meetingRpt/resource.type.list.json",
    stat: "/localData/meetingRpt/resource.room.stat.json",
    roomstat: baseUrl + "/meeting/report/room/getSummary",
    peoplestat: baseUrl + "/meeting/report/people/getSummary"
  },
  // 门户设计
  design: {
    list: "/localData/design/dashboard.data.get.json",
    templateList: "/localData/design/dashboard.widget.data.get.json",
    attrs: "/localData/design/entity.attribute.getlist.json",
    look: "/localData/design/ui.entity.lookup.json"
  },
  detail: "/localData/entity.detail.get.json",
  delete: "/localData/entity.delete.json",
  flow: {
    processTree: "/localData/flow/process.statistics.tree.get.json",
    tree: "/localData/flow/tree.get.json",
    treeDetail: "/localData/flow/entity.detail.get.json",
    stepList: "/localData/flow/process.step.getlist.json",
    ruleList: "/localData/flow/process.rule.getlist.json",
    formSearchPerm: "/localData/flow/process.datapri.getlist.json",
    formStartPerm: "/localData/flow/process.usepri.getlist.json",
    processSearch: "/localData/flow/wf.process.search.json",
    list: "/localData/flow/entitygrid.list.json",
    steppri: "/localData/flow/process.steppri.get.json",
    savePerm: "/localData/flow/process.steppri.save.json",
    deptTree: "/localData/flow/tree.dept.get.json",
    userList: "/localData/flow/user.search.json",
    editFlowDefineDetail: "/localData/flow/entity.detail.get.editflowdefine.json",
    editProcess: "/localData/flow/process.edit.json",
    handlePeople: "/localData/flow/process.participantor.save.json", // 办理人员
    handleDetail: "/localData/flow/process.participantor.getlist.json", // 办理人员详情
    workAdminList: "/localData/flow/entity.grid.search.json", // 事务管理列表
    signature: "/localData/flow/process.signature.search.json", // 签名管理
    permissionform: "/localData/flow/process.permissionform.get.json", // 表单查询
    processNodes: "/localData/flow/process.all.nodes.json", // 节点
    jump: "/localData/flow/process.approve.jump.json", // 跳转
    insertapprove: "/localData/flow/process.instance.insertapprove.json", // 加签
    contentTree: "/localData/flow/content.tree.get.json",
    publishtocontent:"/localData/flow/prcoess.instance.publishtocontent.json", // 发布
    addSignature: "/localData/flow/process.signature.upload.json", // 新建签名
    deleteSignature: "/localData/flow/process.signature.delete.json", // 删除签名
    datapriAdd: "/localData/flow/process.datapri.add.json", // 添加用户
    usepriAdd: "/localData/flow/process.usepri.add.json", // 添加筛选器
    files: "/localData/flow/process.instance.file.getlist.json",
  },
  lookSearch: "/localData/entity.lookup.search.json",
  lookupfilter: "/localData/entity.lookupfilter.getlist.json",
  documentAdmin: {
    tree: "/localData/documentAdmin/tree.get.json",
    processList: "/localData/documentAdmin/wf.process.search.json",
    processCreate:"/localData/documentAdmin/process.instance.create.json",
    receivingAdmin: {// 收文管理
      list: "/localData/documentAdmin/entitygrid.list.json"
    },
    handleActions: "/localData/documentAdmin/listview.handle.actions.json"
  },
  workspace: {
    list: "/localData/applicationcenter.getlist.json"
  },
  contract: {
    invoice: {
      list: "/localData/contract/entitygrid.list.json",
      statistics: "/localData/contract/contract.summary.statistics.get.json"
    },
    execution: {
      list: "/localData/contract/contract.owner.getlist.json",
      statistics: "/localData/contract/contract.summary.statistics.get.json"
    },
    tree: "/localData/contract/tree.get.json",
    admin: {
      handleActions: "/localData/contract/admin/listview.handle.actions.json",
      config: "/localData/contract/entitygrid.config.get.json",
      list: "/localData/contract/admin/entitygrid.list.json"
    }
  },
  files: "/localData/file.attachment.getlist.json",
  attd: {
    list: "/localData/attd/attendance.dept.employee.search.json",
    empChange: "/localData/attd/attendance.employee.change.json", // 转移权限
    leavetypeList: "/localData/attd/attendance.leavetype.getlist.json",
    attdRule: "/localData/attd/attend.rule.get.json",
    batchAddAttd: "/localData/attd/attendance.month.employeebatch.json", // 批量填报考勤
    transferout: "/localData/attd/attendance.employee.month.transferout.json", // 人员调出
    transferdeptIn: "/localData/attd/attendance.employee.month.transferdept.json",// 人员调入
    setAttdLeave: "/localData/attd/attendance.leave.employee.day.set.json", // 填考勤
    globalsettings: "/localData/attd/attendance.globalsettings.get.json",
    notPeopleList: "/localData/attd/attendance.month.employee.lacklist.json", // 未添加人员,
    clearAttdLeave: "/localData/attd/attendance.employee.monthleave.delete.json", // 清除考勤记录
    remarksAttd: "/localData/attd/workshift.dept.month.remark.json", // 科室备注
    submitAttd: "/localData/attd/attendance.month.submit.json", // 提交考勤
    monthtips: "/localData/attd/attendace.monthtips.number.json", // 统计上月 本月人数
    sortAttd: "/localData/attd/workshift.employee.month.sort.json", // 考勤人员排序
  },
  // 排班
  scheduling: {
    deptMonthList: "/localData/scheduling/workshift.dept.employee.search.json", // 部门按月排班
    workshiftSet: "/localData/scheduling/workshift.employee.day.set.json", // 排班
    deptGroup: "/localData/scheduling/workshift.month.deptgroup.headerinfo.get.json",
    monthDeptgroupList: "/localData/scheduling/workshift.month.deptgroup.employee.getlist.json", // 部门组排班
    deptgroupEmpSort: "/localData/scheduling/workshift.deptgroup.employee.month.sort.json", // 人员排序
  },
  entityFilter: baseUrl+'/aura/objectmanager/getTemplateMetadata',//获取对象字段元数据,筛选器可选字段
  delete: baseUrl + "/aura/RecordUi/delRecord", // 通用删除
  create: baseUrl + "/aura/RecordUi/createRecord", // 通用创建
  edit: baseUrl + "/aura/RecordUi/updateRecord", // 通用编辑
  // 通用弹窗
  formCommon: {
      layout: baseUrl + "/aura/RecordUi/getRecordCreateDefaults"
  },
  pickListValues: baseUrl + "/aura/RecordUi/getPicklistValuesByRecordType", // 获取对象下拉列表字段值
  detail: baseUrl + "/aura/RecordUi/getRecord", // 详情
  lookup: baseUrl + "/aura/Lookup/lookup", // 查找字段搜索
  objFieldData: "/api/aura/objectmanager/getTemplateMetadata", // 获取对象字段元数据
  applist: baseUrl + "/aura/AppLauncher/getAppLauncherMenuData",
  currentApp: baseUrl + "/aura/OneController/getCurrentApp", // 获取模块列表
  deptTree: baseUrl + "/one/organization/getBusinessUnitTree",//组织树
  getTabs:baseUrl + "/listview/layout/getDetails",//根据对象获取通用tabs
  lookupObj: {
      column: baseUrl + "/aura/Lookup/getTopMetada", // 查找对话框 - 获查找字段和列表显示字段
      list: baseUrl + "/aura/Lookup/getItems", // 查找对话框 - 获查找数据
  },
  list2: baseUrl + "/listview/data/getNodes",
  detailObj: {
      actions: baseUrl + "/aura/ActionsController/getRecordActions",
      relatedActions: baseUrl + "/aura/ui/global/components/ActionsManager/RelatedList/handleAction", // 详情页 - 相关列表操作按钮
      relatedListInfo: baseUrl + "/aura/RelatedListUiController/getRelatedListInfoCollection", // 获取对象相关列表信息集合
      relatedListColumn: baseUrl + "/aura/RelatedListUiController/getRelatedListInfoByApiName", // 获取单个相关列表 - 列表显示列
      relatedListActions: baseUrl + "/aura/ui/global/components/ActionsManager/RelatedListRecord/handleAction", // 获取单个相关列表 - 操作按钮
      relatedListData: baseUrl + "/aura/RelatedListUiController/postRelatedListRecords", // 获取单个相关列表 - 数据
      compact: baseUrl + "/aura/RecordUi/Layout/getCompact", // 详情标题 - 紧凑布局
  },
  login:baseUrl + "/auth/doLogin",
  validate:baseUrl + "/auth/captcha",
  content:{
    folder:{
      get:baseUrl + '/content/folder/getFolderTree',//获取文档中心目录
      new:baseUrl + '/content/folder/create',//创建文档中心目录
      edit:baseUrl + '/aura/RecordUi/updateRecord',//编辑文档中心目录
    }
  },
  portal: {
    layoutList: baseUrl + "/aura/dashboard/describeDashboard", // 获取门户、仪表盘设置
    save: baseUrl + "/aura/dashboard/save",
    saveComponent: baseUrl + "/aura/dashboard/saveComponent",
    loadComponents: baseUrl + "/aura/dashboard/loadComponents", // 加载组件数据
  },
  status:{
    submit:baseUrl + "/weibo/status/submit",//发布状态
    query:baseUrl + "/weibo/queryStatus",//拉取个人可以查看的状态、投票、问题
  },
  question:{
    submit:baseUrl + "/weibo/question/submit",//发布问题
  },
  poll:{
    submit:baseUrl + "/weibo/question/submit",//发布问题
  },
};
export default Interface;