const Interface = {
    // 待办事务
    todoList:{
        treedata: "/localData/treedata.json",
        tabs: "/localData/tabs.json",
        datalist: "/localData/datalist.json"
    },
    formSearch: "/localData/formSearch.json",
    applist: "/localData/applist.json",
    workflow:{
        processList: "/localData/process.search.json"
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
    receivedCirculationList: "/localData/process.instance.receive.foward.search.json",
    // 我传阅的
    myCirculationList: "/localData/process.instance.foward.search.json",
    // 草稿箱
    draftsList: "/localData/wf.instanceowner.search.json",
    listView: {
        config: "/localData/entitygrid.config.get.json",
        list: "/localData/entitygrid.list.json",
        handleActions: "/localData/listview.handle.actions.json"
    }

}
export default Interface;