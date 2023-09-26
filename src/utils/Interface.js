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
}
export default Interface;