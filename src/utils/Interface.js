const Interface = {
  // 待办事务
  todoList: {
    treedata: "/localData/treedata.json",
    tabs: "/localData/tabs.json",
    datalist: "/localData/datalist.json",
  },
  formSearch: "/localData/formSearch.json",
  applist: "/localData/applist.json",
  workflow: {
    processList: "/localData/process.search.json",
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
  listView: {
    config: "/localData/entitygrid.config.get.json",
    list: "/localData/entitygrid.list.json",
    handleActions: "/localData/listview.handle.actions.json",
  },
  uilook: "/localData/ui.entity.lookup.json",
  entityFilter: "/localData/entity.filter.get.json",

  entityConfig: "/localData/entity.config.get.json", // 通用弹窗布局配置
  picklist: "/localData/layout.picklistvalues.get.json",
  treeList: "/localData/tree.get.json",
  user: {
    mybusinessUser: "/localData/user/user.mybusiness.getlist.json", // 同部门下用户
    roleUser: "/localData/user/sys.role.search.json", // 角色
    groupList: "/localData/user/sys.group.search.json", // 小组列表
    groupUser: "/localData/user/sys.group.member.search.json", // 小组下用户
    sysUser: "/localData/user/sys.user.search.json",
    usersettings: "/localData/user/sys.usersettings.get.json",
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
    statistics: "/localData/group/chatter.status.statistics.json", // 统计
    addPeople: "/localData/group/sys.group.member.add.json", // 添加成员
  },
  email: {
    inboxList: "/localData/email/email.inbox.search.json", //邮件列表
    myEmailFolder: "/localData/email/email.folder.my.json", // 我的文件夹
    emailInfo: "/localData/email/email.info.get.json", // 邮件详情
    read: "/localData/email/email.read.mark.json", // 未读/已读邮件设置
    star: "/localData/email/email.star.mark.json", // 重要邮件
    send: "/localData/email/email.send.json", // 发送邮件
  },
  meeting: {
    userTree: "/localData/meeting/user.subordinatetree.get.json", // 人员组织
    getall: "localData/meeting/meeting.getall.json", // 日历月数据
    config: "localData/meeting/config.json",
    relatedrecords: "/localData/meeting/entity.relatedrecords.get.json", // 相关列表数据
  },
  meetingRoom: {
    roomList: "/localData/meetingRoom/meetingroom.reservation.getlist2.json",
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
    list:"/localData/schedule/calendar.getlist.json",
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
    stat: "/localData/meetingRpt/resource.room.stat.json"
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
  },
  lookSearch: "/localData/entity.lookup.search.json",
  lookupfilter: "/localData/entity.lookupfilter.getlist.json"
};
export default Interface;
