const baseUrl = "api";
const Interface = {
  pathUrl: "http://192.168.1.200",
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
    processType: baseUrl + "/aura/workflow/Process/getCategories", //新建流程分类
    getAuthorizedProcess:
      baseUrl + "/aura/workflow/Process/getAuthorizedProcess", //获取当前用户可以访问的流程
    getCommonUses: baseUrl + "/aura/workflow/Process/getCommonUses", //获取常用流程
    getFavorites: baseUrl + "/aura/workflow/Process/getFavorites", //获取收藏流程
    new: baseUrl + "/aura/workflow/ProcessInstance/new", //新建流程
    getProcessDefinitionInfo:
      baseUrl + "/aura/workflow/Process/getProcessDefinitionInfo", // 获取流程定义简要
    getRelatedObjects: baseUrl + "/objectmanager/object/getRelatedObjects", // 根据对象ID，包括主表、子表信息
    updateRecordBatch: baseUrl + "/aura/RecordUi/updateRecordBatch", // 保存表单 - 同时保存主子表
    getPermission: baseUrl + "/aura/workflow/definition/activity/getPermission", // 流程节点权限
    getTransitions: baseUrl + "/aura/workflow/Process/activity/getTransitions", // 获取节点转移路径
    getParticipators:
      baseUrl + "/aura/workflow/ProcessInstance/activity/getParticipators", // 获取节点办理人员
    agree: baseUrl + "/aura/workflow/ProcessInstance/task/agree", // 提交流转-审批通过
    disagree: baseUrl + "/aura/workflow/ProcessInstance/task/disagree", // 审批拒绝
    notice: baseUrl + "/aura/workflow/ProcessInstance/notice", // 催办
    forward: baseUrl + "/aura/workflow/ProcessInstance/forward", // 传阅
    countersign: baseUrl + "/aura/workflow/Process/activity/task/insert", // 加签
    jump: baseUrl + "/aura/workflow/ProcessInstance/jump", // 跳转
    withdraw: baseUrl + "/aura/workflow/ProcessInstance/withdraw", // 撤销
    delete: baseUrl + "/aura/workflow/ProcessInstance/delete", // 删除流程实例
    delegate: baseUrl + "/aura/workflow/ProcessInstance/task/delegate", // 委派/转代理
    getReturnActivities:
      baseUrl + "/aura/workflow/ProcessInstance/task/getReturnActivities", // 获取可退回节点集合与办理人
    return: baseUrl + "/aura/workflow/ProcessInstance/task/return", // 退回
    insert: baseUrl + "/aura/workflow/ProcessInstance/task/insert", // 加签
    close: baseUrl + "/aura/workflow/ProcessInstance/task/close", // 结束
    categoryTree: baseUrl + "/objectmanager/category/tree", // 获取对象分类树
    getWorkflowTemplates: baseUrl + "/objectmanager/template/auth/getWorkflowTemplates", // 获取某个对象对应的所有简当权限
    stati: baseUrl + "/aura/workflow/report/stati",//流程效率统计
    abstract: baseUrl + "/aura/workflow/report/abstract/get",//流程统计摘要
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
    getMetadataInitialLoad:
      baseUrl + "/listview/listViewManager/getMetadataInitialLoad", // 获取元数据
    getFilterInfo: baseUrl + "/listview/listViewManager/getFilterInfo", // 列头
    actions: baseUrl + "/listview/Actions/handleAction",
    actionsrow:
      baseUrl +
      "/aura/ui/global/components/ActionsManager/ListviewRecord/handleAction", //行记录按钮
    actionstop: baseUrl + "/aura/ActionsController/handleAction", //右上角按钮
    createListView: baseUrl + "/aura/listViewManager/createListView", //创建视图
    updateListView: baseUrl + "/aura/listViewManager/updateListView", //重命名视图、共享设置、选择要显示字段、保存筛选器
    deleteListView: baseUrl + "/aura/listViewManager/deleteListView", //删除视图
    // copyListView: baseUrl + "/listview/filter/clone", //复制视图
    copyListView: baseUrl+'/aura/listViewManager/cloneListView',//复制视图
    getListView: baseUrl + "/aura/listViewManager/getAdditionalMetadata", //获取单个视图/筛选器
    pinListView: baseUrl + "/aura/listViewManager/pinListView", //固定视图
    chartData: baseUrl + "/aura/ObjectHomeChart/getMetadata", // 图表 - 获取列表图表元数据
    chartList: baseUrl + "/aura/listViewManager/pinListView", // 图表 - 获取列表视图图表
    chartItems: baseUrl + "/aura/ObjectHomeChart/getChartItems", // 获取图表数据
    getFilter: "", //
    saveFilter: baseUrl + "/aura/listViewManager/updateListView", // 保存筛选器
    getListShareData: baseUrl + "/aura/ListViewEntityShareDataProvider/getListShareData", // 列表视图 - 获取共享设置
        getSearchFilter: baseUrl + "/aura/listViewManager/getSearchFilter", // 获查搜索筛选器字段
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
    getBusinessUnits: baseUrl + "/one/user/getBusinessUnits", // 获取登录用户所有兼职部门
    switchBusinessUnit: baseUrl + "/one/user/switchBusinessUnit", // 登录用户切换
    switch: baseUrl + "/one/user/switch", // 切换用户
    getSubordinates: baseUrl + "/one/user/getSubordinates", // 获取我的下属
    getGroupUsers: baseUrl + "/one/group/getGroupUsers", // 获取小组成员
    getLatestUsers: baseUrl + "/one/user/getLatestUsers", // 获取最近使用用户
    getRoleUsers: baseUrl + "/one/group/getRoleUsers", // 获取角色用户列表
    allUser: baseUrl + "/one/organization/querUsers", //查询所有用户
    changePwd: baseUrl + "/one/user/changepwd", //修改登录密码
    getUserInfo: baseUrl + "/one/user/getUserInfo", // 获取个人信息详细
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
    getOwningGroups: baseUrl + "/one/group/getOwningGroups", // 我的小组
    getJointGroups: baseUrl + "/one/group/getJointGroups", // 活动小组
  },
  email: {
    inboxList: "/localData/email/email.inbox.search.json", //邮件列表
    myEmailFolder: "/localData/email/email.folder.my.json", // 我的文件夹
    emailInfo: "/localData/email/email.info.get.json", // 邮件详情
    read: "/localData/email/email.read.mark.json", // 未读/已读邮件设置
    star: "/localData/email/email.star.mark.json", // 重要邮件
    send: "/localData/email/email.send.json", // 发送邮件
    saveDraft: baseUrl + "/email/saveDraft", // 保存草稿
    send: baseUrl + "/email/send", // 发送邮件
    sendbatch: baseUrl + "/email/sendbatch", // 群发邮件
    upload: baseUrl + "/email/upload", // 上传邮箱附件
    inboxSearch: baseUrl + "/email/inbox/search", // 查询收件箱
    draftboxSearch: baseUrl + "/email/draftbox/search", // 查询草稿箱
    sentboxSearch: baseUrl + "/email/sentbox/search", // 查询发件箱
    getMail: baseUrl + "/email/getMail", // 获取单个邮件信息
    getAttachments: baseUrl + "/email/getAttachments", //获取邮件附件列表
    deletePermEmail: baseUrl + "/email/deletePermEmail", //删除箱永久删除
    deleteAttachment: baseUrl + "/email/deleteAttachment", //删除邮件附件
    copyAttachment: baseUrl + "/email/copyAttachment", //复制邮件附件
    downloadAttachment: baseUrl + "/email/download", //下载邮件附件
    previewAttachment: baseUrl + "/email/preview", //预览邮件附件
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
    remind: baseUrl + "/ui.meeting.components/publish", //会议提醒
    audienceDataExport: baseUrl + "/meeting.audience.data/export", //参会人导出
    checkinRecordExport: baseUrl + "/meeting.checkin.record/export", //打卡记录导出
    checkin: baseUrl + "/ui.meeting.components/checkin", //会议签到
		checkout: baseUrl + "/ui.meeting.components/checkout", //会议签退
		delete: baseUrl + "/ui.meeting.components/remove", //会议删除
		accept: baseUrl + "/ui.meeting.components/accept", //会议接受
		reject: baseUrl + "/ui.meeting.components/reject", //会议拒绝
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
    deleteComment: "/localData/fileAdmin/chatter.comment.delete.json",
    getLatestFiles: baseUrl + "/cloudfile/getLatestFiles", //获取最近使用文件
		getOwnDirAndFiles: baseUrl + "/cloudfile/getOwnDirAndFiles", //获取我的文件夹与文件
		getFavoriteFiles: baseUrl + "/cloudfile/getFavoriteFiles", //获取收藏文件列表
		getRecycFolders: baseUrl + "/cloudfile/getRecycFolders", //获取回收站文件夹与文件
		cloudUpload: baseUrl + "/cloudfile/file/upload", //上传文件到选定文件夹
		fakeDelete: baseUrl + "/cloudfile/fakeDelete", //假删除文件
		fakeDeleteFolder: baseUrl + "/cloudfile/fakeDeleteFolder", //假删除文件夹
		restoreFile: baseUrl + "/cloudfile/restoreFile", //还原删除文件
		restoreFolder: baseUrl + "/cloudfile/restoreFolder", //还原删除文件夹
		delete: baseUrl + "/cloudfile/delete", //永久删除文件
		deleteFolder: baseUrl + "/cloudfile/deleteFolder", //永久删除文件夹
		favoriteFile: baseUrl + "/cloudfile/favoriteFile", //收藏文件
		cancelFavoriteFile: baseUrl + "/cloudfile/cancelFavoriteFile", //取消收藏文件
    getMyFolderTree: baseUrl + "/cloudfile/getMyFolderTree", //获取我的目录树
    getOrgDirAndFiles: baseUrl + "/cloudfile/getOrgDirAndFiles", //获取团队文件夹与文件
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
    like: "/localData/information/chatter.like.post.json",
    uploadMedia: baseUrl+'/content/media/upload',//上传媒体文件
    getMedia: baseUrl+'/content/media/querylists',//获取媒体文件
  },
  schedule: {
    //list:"/localData/schedule/calendar.getlist.json",
    list: baseUrl + "/ui.calendar.components/getAllCalendars", //日程日历
    pickList: "/localData/schedule/layout.picklistvalues.get.json",
    save: "/localData/schedule/calendar.event.edit.json", // 保存
    sharedList: "/localData/schedule/calendar.shared.mylist.json",
    updatecontentaccess: "/localData/schedule/calendar.shared.right.json",
    addAccess: "/localData/schedule/calendar.share.json",
    addOtherCalendar: baseUrl + "/ui.calendar.components/addSharedCalendar", //添加其他日历
    getOtherCalendar: baseUrl + "/ui.calendar.components/fellow/getFellows", //获取其他日历
  },
  scheduleTable: {
    list: baseUrl + "/ui.calendar.components/fellow/getFellowCalendars", //获取关注人的日程一览表
  },
  leaderSchedule: {
    list: baseUrl + "/ui.calendar.components/filterCalendars", //领导日程
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
    roomstat: baseUrl + "/meeting/report/room/getSummary",//会议室数据
    peoplestat: baseUrl + "/meeting/report/people/getSummary",//人员数据
    stati: baseUrl + "/meeting/report/people/statistic",//会议报表统计
    abstract: baseUrl + "/meeting/report/abstract/get",//会议报表摘要
  },
  // 门户设计
  design: {
    list: "/localData/design/dashboard.data.get.json",
    templateList: "/localData/design/dashboard.widget.data.get.json",
    attrs: "/localData/design/entity.attribute.getlist.json",
    look: "/localData/design/ui.entity.lookup.json",
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
    editFlowDefineDetail:
      "/localData/flow/entity.detail.get.editflowdefine.json",
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
    publishtocontent: "/localData/flow/prcoess.instance.publishtocontent.json", // 发布
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
    processCreate: "/localData/documentAdmin/process.instance.create.json",
    receivingAdmin: {
      // 收文管理
      list: "/localData/documentAdmin/entitygrid.list.json",
    },
    handleActions: "/localData/documentAdmin/listview.handle.actions.json",
  },
  workspace: {
    list: "/localData/applicationcenter.getlist.json",
  },
  contract: {
    invoice: {
      list: "/localData/contract/entitygrid.list.json",
      statistics: "/localData/contract/contract.summary.statistics.get.json",
    },
    execution: {
      list: "/localData/contract/contract.owner.getlist.json",
      statistics: "/localData/contract/contract.summary.statistics.get.json",
    },
    tree: "/localData/contract/tree.get.json",
    admin: {
      handleActions: "/localData/contract/admin/listview.handle.actions.json",
      config: "/localData/contract/entitygrid.config.get.json",
      list: "/localData/contract/admin/entitygrid.list.json",
    },
  },
  files: "/localData/file.attachment.getlist.json",
  attd: {
    list: "/localData/attd/attendance.dept.employee.search.json",
    empChange: "/localData/attd/attendance.employee.change.json", // 转移权限
    leavetypeList: "/localData/attd/attendance.leavetype.getlist.json",
    attdRule: "/localData/attd/attend.rule.get.json",
    batchAddAttd: "/localData/attd/attendance.month.employeebatch.json", // 批量填报考勤
    transferout: "/localData/attd/attendance.employee.month.transferout.json", // 人员调出
    transferdeptIn:
      "/localData/attd/attendance.employee.month.transferdept.json", // 人员调入
    setAttdLeave: "/localData/attd/attendance.leave.employee.day.set.json", // 填考勤
    globalsettings: "/localData/attd/attendance.globalsettings.get.json",
    notPeopleList: "/localData/attd/attendance.month.employee.lacklist.json", // 未添加人员,
    clearAttdLeave:
      "/localData/attd/attendance.employee.monthleave.delete.json", // 清除考勤记录
    remarksAttd: "/localData/attd/workshift.dept.month.remark.json", // 科室备注
    submitAttd: "/localData/attd/attendance.month.submit.json", // 提交考勤
    monthtips: "/localData/attd/attendace.monthtips.number.json", // 统计上月 本月人数
    sortAttd: "/localData/attd/workshift.employee.month.sort.json", // 考勤人员排序
  },
  // 排班
  scheduling: {
    deptMonthList: "/localData/scheduling/workshift.dept.employee.search.json", // 部门按月排班
    workshiftSet: "/localData/scheduling/workshift.employee.day.set.json", // 排班
    deptGroup:
      "/localData/scheduling/workshift.month.deptgroup.headerinfo.get.json",
    monthDeptgroupList:
      "/localData/scheduling/workshift.month.deptgroup.employee.getlist.json", // 部门组排班
    deptgroupEmpSort:
      "/localData/scheduling/workshift.deptgroup.employee.month.sort.json", // 人员排序
  },
  entityFilter: baseUrl + "/aura/objectmanager/getTemplateMetadata", //获取对象字段元数据,筛选器可选字段
  delete: baseUrl + "/aura/RecordUi/delRecord", // 通用删除
  create: baseUrl + "/aura/RecordUi/createRecord", // 通用创建
  edit: baseUrl + "/aura/RecordUi/updateRecord", // 通用编辑
  // 通用弹窗
  formCommon: {
    layout: baseUrl + "/aura/RecordUi/getRecordCreateDefaults",
  },
  pickListValues: baseUrl + "/aura/RecordUi/getPicklistValuesByRecordType", // 获取对象下拉列表字段值
  detail: baseUrl + "/aura/RecordUi/getRecord", // 详情
  lookup: baseUrl + "/aura/Lookup/lookup", // 查找字段搜索
  objFieldData: "/api/aura/objectmanager/getTemplateMetadata", // 获取对象字段元数据
  applist: baseUrl + "/aura/AppLauncher/getAppLauncherMenuData",
  currentApp: baseUrl + "/aura/OneController/getCurrentApp", // 获取模块列表
  deptTree: baseUrl + "/one/organization/getBusinessUnitTree", //组织树
  getTabs: baseUrl + "/listview/layout/getDetails", //根据对象获取通用tabs
  lookupObj: {
    column: baseUrl + "/aura/Lookup/getTopMetada", // 查找对话框 - 获查找字段和列表显示字段
    list: baseUrl + "/aura/Lookup/getItems", // 查找对话框 - 获查找数据
  },
  list2: baseUrl + "/listview/data/getNodes",
  detailObj: {
    actions: baseUrl + "/aura/ActionsController/getRecordActions",
    relatedActions:
      baseUrl +
      "/aura/ui/global/components/ActionsManager/RelatedList/handleAction", // 详情页 - 相关列表操作按钮
    relatedListInfo:
      baseUrl + "/aura/RelatedListUiController/getRelatedListInfoCollection", // 获取对象相关列表信息集合
    relatedListColumn:
      baseUrl + "/aura/RelatedListUiController/getRelatedListInfoByApiName", // 获取单个相关列表 - 列表显示列
    relatedListActions:
      baseUrl +
      "/aura/ui/global/components/ActionsManager/RelatedListRecord/handleAction", // 获取单个相关列表 - 操作按钮
    relatedListData:
      baseUrl + "/aura/RelatedListUiController/postRelatedListRecords", // 获取单个相关列表 - 数据
    compact: baseUrl + "/aura/RecordUi/Layout/getCompact", // 详情标题 - 紧凑布局
  },
  login: baseUrl + "/auth/doLogin",
  validate: baseUrl + "/auth/captcha",
  content: {
    folder: {
      get: baseUrl + "/content/folder/getFolderTree", //获取文档中心目录
      new: baseUrl + "/content/folder/create", //创建文档中心目录
      edit: baseUrl + "/aura/RecordUi/updateRecord", //编辑文档中心目录
      getPrivileges: baseUrl + "/content/folder/getPrivileges", //获取单个目录权限
    },
    renderView: baseUrl + "/content/text/renderView", //根据知识库模板，和知识内容 合并出显示内容。
  },
  portal: {
    layoutList: baseUrl + "/aura/dashboard/describeDashboard", // 获取门户、仪表盘设置
    save: baseUrl + "/aura/dashboard/save",
    saveComponent: baseUrl + "/aura/dashboard/saveComponent",
    loadComponents: baseUrl + "/aura/dashboard/loadComponents", // 加载组件数据
  },
  commonstatus: {
    query: baseUrl + "/weibo/queryStatus", //拉取会议等对象发布的
    comment: baseUrl + "/weibo/status/comment/search", //获取状态评论列表
  },
  status: {
    submit: baseUrl + "/weibo/status/submit", //发布状态
    query: baseUrl + "/weibo/status/search", //拉取个人可以查看的状态、投票、问题
    mine: baseUrl + "/weibo/status/mine/query", //拉取我发布的
    comment:baseUrl + "/weibo/status/comment/query", //获取评论
    sendComment:baseUrl+"/weibo/status/comment/post", //发布评论
    setStatusLike:baseUrl+"/weibo/status/like", //状态点赞
    setCommentLike:baseUrl+"/weibo/comment/like", //评论点赞
  },
  question: {
    submit: baseUrl + "/weibo/question/submit", //发布问题
    query: baseUrl + "/weibo/status/qa/search", //拉取知识问答列表
  },
  poll: {
    submit: baseUrl + "/weibo/poll/submit", //发布投票
  },
  uploadAvatar: baseUrl + "/avatar/upload", //通用头像上传
  viewAvatar: baseUrl + "/avatar", //头像查看
  uploadFiles: baseUrl + "/file/attachment/upload", //通用附件上传
  getFiles: baseUrl + "/file/attachment/getFiles", //通用获取附件
  deleteFiles: baseUrl + "/file/attachment/deleteFiles", //通用删除附件
  album: {
    queryAlbums: baseUrl + "/album/queryAlbums", //获取相册
    queryPhotos: baseUrl + "/album/queryPhotos", //获取相册图片
    queryOwningAlbums: baseUrl + "/album/queryOwningAlbums", //获取我创建的相册
    getPrivileges: baseUrl + "/album/getPrivileges", //获取相册权限
    uploadImg: baseUrl + "/album/upload", //上传照片
    uploadZip: baseUrl + "/album/upload/zipfile", //上传图片压缩包
  },
  getMapFieldValues: baseUrl + "/aura/Lookup/getMapFieldValues", // 查找字段 - 获取目标对象映射字段值
  report: {
    config: "/localData/report/config.json",
    list: "/localData/report/list.json",
    category: "/localData/report/category.json",
    categoryListData: "/localData/report/tableList.json",
    newReport: baseUrl + "/aura/analytics/reporting/runpage/newReport", // 新建报表
    reportDesign: {
      tree: "/localData/report/reportDesign/tree.json",
      // metaData: "/localData/report/reportDesign/reportMetaData.json",
      metaData: baseUrl + "/aura/analytics/reporting/runpage/describeReport", // 获取报表元数据
      saveReport: baseUrl + "/aura/analytics/reporting/runpage/saveReport", // 报表保存
      // runReport: baseUrl + "/aura/analytics/reporting/runpage/runReport", // 报表运行
      runReport: "/localData/report/reportDesign/runReport.json",
      runReport2: "/localData/report/reportDesign/runReport_group.json",
      describeReport:
        baseUrl + "/aura/analytics/reporting/runpage/describeReport", // 获取报表元数据
      runReportNew: baseUrl + "/aura/analytics/reporting/runpage/runReport", // 报表运行
    },
  },
  pdf: baseUrl + "/file/previewpdf/",
  getEventsStati: baseUrl + "/ui.calendar.components/getEventsStati", // 日程原点
  rulearticle:{
    create: baseUrl + "/institution/create", // 创建制度&变更制度
    revision: baseUrl + "/institution/revision", // 修订制度
    abolish: baseUrl + "/institution/abolish", // 废除制度
    batchAddStamp: baseUrl + "/institution/filestamp/batch" // 批量添加文件水印
  }
};
export default Interface;
