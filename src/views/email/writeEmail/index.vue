<template>
    <div class="writeEmail">
        <div class="whitemailHeader">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="普通邮件"></a-tab-pane>
                <a-tab-pane key="2" tab="群邮件"></a-tab-pane>
            </a-tabs>
        </div>
        <div class="whitemailCenter">
            <div class="containerWrap">
                <div class="leftContainer">
                    <div class="leftBd">
                        <div class="formWrap">
                            <a-form ref="formRef" :model="formState" :label-col="labelCol">
                                <a-form-item label="收件人" name="addressee"
                                    v-if="activeKey=='1'"
                                    :rules="[{ required: activeKey==1?true:false, message: '请选择收件人' }]">
                                    <a-select :default-active-first-option="false"
                                    allowClear :filter-option="false" showSearch
                                    @dropdownVisibleChange="getUserList"
                                    @search="getUserList" ref="select" v-model:value="formState.addressee" mode="multiple"
                                        placeholder="请选择收件人">
                                        <a-select-option v-for="(item, index) in selectConcatsList" :key="index" :value="item.systemUserId">
                                            <a-avatar :size="37">
                                                <template #icon><UserOutlined /></template>
                                                <!-- <img :src="item.ImageUrls" alt="" class="commentAvatar" /> -->
                                            </a-avatar>
                                            {{item.Name}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="群组" name="group"
                                    v-if="activeKey=='2'"
                                    :rules="[{ required: activeKey==2?true:false, message: '请选择群组' }]">
                                    <a-select v-model:value="formState.group" mode="multiple"
                                        placeholder="请选择群组">
                                        <a-select-option v-for="(item, index) in selectGroupList" :key="index" :value="item.key">{{item.value}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="主题" name="theme" :rules="[{ required: true, message: '请输入主题' }]">
                                    <a-input v-model:value="formState.theme" placeholder="请输入主题"></a-input>
                                </a-form-item>
                            </a-form>
                            <div class="filesWrap">
                                <div class="selectFile">
                                    <a-upload v-model:file-list="fileList" name="file" action="/mail/attach/upload"
                                        :headers="headers" @change="handleChange">
                                        <a-button type="link">添加附件</a-button>
                                        <template #itemRender>
                                            
                                        </template>
                                    </a-upload>
                                    <div class="inboxFileList">
                                        <div class="inboxFileItem">
                                            <div class="leftImg">
                                                <img :src="require('@/assets/img/avatar.png')" alt="">
                                            </div>
                                            <div class="rightFileInfo">
                                                <div class="fileName rowEllipsis">
                                                    测试文件.jpg
                                                </div>
                                                <div class="fileSize"></div>
                                                <div class="fileOptionShow">
                                                    <div class="btns">
                                                        <a-tooltip title="查看" placement="top">
                                                            <a-button type="text" :icon="previewIcon"></a-button>
                                                        </a-tooltip>
                                                        <a-tooltip title="下载" placement="top">
                                                            <a-button type="text" :icon="h(VerticalAlignBottomOutlined)"></a-button>
                                                        </a-tooltip>
                                                        <a-tooltip title="删除" placement="top">
                                                            <a-button type="text" :icon="h(CloseOutlined)"></a-button>
                                                        </a-tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="editor">
                                <Editor placeholder="请输入邮件内容" :height="height" @input="getContent" />
                            </div>
                            <div class="checkWrap">
                                <a-checkbox v-model:checked="formState.chkSms">短信</a-checkbox>
                                <a-checkbox>已读回执</a-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightContainer" v-if="activeKey=='1'">
                    <div class="rightFixedHead">
                        <a-input-search v-model:value="searchVal" placeholder="请输入" style="width: 200px"
                            @search="onSearch" />
                        <a-button class="ml10" :icon="h(PlusOutlined)"></a-button>
                    </div>
                    <div class="treePeopleWrap">
                        <a-tree blockNode  @select="selectPeople"  v-model:expandedKeys="latelyexpandedKeys" v-model:selectedKeys="latelySelectedKeys" :tree-data="latelyTreeData">
                        </a-tree>
                        <a-tree blockNode  @select="selectPeople"  v-model:expandedKeys="DeptexpandedKeys" v-model:selectedKeys="deptSelectedKeys"
                            :load-data="loadDeptNode" :tree-data="departListTree">
                        </a-tree>
                        <a-tree blockNode @select="selectPeople" v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys"
                            :load-data="loadGroupNode" :tree-data="groupTreeData">
                        </a-tree>
                    </div>
                </div>
                <div class="rightContainer" v-else>
                    <div class="treePeopleWrap">
                        <a-tree blockNode :tree-data="departListTree2" @select="selectGroup">
                        </a-tree>
                        <a-tree blockNode :tree-data="groupTreeData2" @select="selectGroup">
                        </a-tree>
                    </div>
                </div>
            </div>
        </div>
        <div class="writeFooter">
            <div class="footerOption">
                <a-button class="mr10" type="primary" @click="handleSendEmail">发送</a-button>
                <a-button class="mr10">存草稿</a-button>
                <a-button class="mr10" @click="cancelWriteEmail">取消</a-button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/oldIcon/iconfont.css";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        nextTick,
        h,
        toRaw
    } from "vue";
    import {
        EllipsisOutlined, CloseOutlined, UserOutlined, PlusOutlined, VerticalAlignBottomOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import Delete from "@/components/listView/Delete.vue";
    import Editor from "@/components/TEditor.vue"
    import { formTreeData } from "@/utils/common.js";
    import { useRouter, useRoute } from "vue-router";
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();
    const activeKey = ref('1');
    const labelCol = ref({ style: { width: '100px' } });
    const formRef = ref();
    const formState = reactive({
        addressee: [],
        theme: "",
        chkSms: false,
        group: [],
        mailBody: ""
    })
    const previewIcon = h("i",{
        class: "iconfont icon-yulanwenjian"
    })
    const data = reactive({
        fileList: [],
        headers: {},
        searchVal: "",
        departListTree:[
            {
                title: '部门',
                key: 1
            }
        ],
        groupTreeData: [
            {
                title: '小组',
                key: 1
            }
        ],
        expandedKeys: [],
        selectedKeys: [],
        groupDataList: [],
        DeptexpandedKeys: [],
        deptSelectedKeys: [],
        deptTreeData: [],
        selectConcatsList: [],
        selectGroupList: [],
        departListTree2: [
            {
                title: '部门',
                key: 1,
                children: []
            }
        ],
        groupTreeData2: [
            {
                title: '小组',
                key: 1,
                children: []
            }
        ],
        latelyTreeData:[
            {
                title: '最近联系人',
                key: 1,
                children:[]
            }
        ],
        latelyexpandedKeys: [],
        latelySelectedKeys: [],
        height: 600
        
    })
    const { fileList, headers, searchVal, groupTreeData, expandedKeys, selectedKeys, groupDataList, DeptexpandedKeys,
        deptSelectedKeys, deptTreeData, departListTree, selectConcatsList, selectGroupList, departListTree2, groupTreeData2, latelyTreeData,
        latelyexpandedKeys, latelySelectedKeys, height
    } = toRefs(data);
    const getContent = (e) => {
        formState.mailBody = e;
    }
    const handleChange = (e) => {

    }
    const onSearch = (e) => {

    }
    const getUserList = (e) => {
        // proxy.$get(Interface.user.sysUser,{
        //     searchVal: e
        // }).then(res=>{
        //     data.selectConcatsList = res.listData;
        // })
        proxy.$get(Interface.uilook, {
                Lktp: 30020,
                Lksrch: e,
            })
            .then((res) => {
                let listData = res.listData;
                data.selectConcatsList = listData;
            });
    }
    // 获取最近联系人
    const getLately = () => {
        proxy.$get(Interface.addressBook.lastList,{}).then(res=>{
            let rows = res.listData.map(item=>{
                item.title = item.FullName;
                item.key = item.SystemUserId;
                return item;
            })
            data.latelyTreeData[0].children = rows;

        })
    }
    getLately();
    // 公共小组
    const getGroupList = () => {
        proxy.$get(Interface.user.groupList, {}).then(res => {
            data.groupDataList = res.listData.map(function (item) {
                item.title = item.Name;
                item.key = item.GroupId;
                item.children = [];
                return item;
            });
            data.groupTreeData2[0].children = data.groupDataList;
        })
    }
    getGroupList();
    const loadGroupNode = treeNode => {
        console.log("treeNode",treeNode);
        return new Promise(resolve => {
            // if (treeNode.dataRef.children) {
            //     resolve();
            //     return;
            // }
            if(treeNode.key==1){
                treeNode.dataRef.children = data.groupDataList;
                data.groupTreeData = [...data.groupTreeData];
                resolve();
            }
            if(treeNode.GroupId && treeNode.GroupId!=""){
                loadGroupPeople(treeNode.groupId).then(res=>{
                    console.log("list", res.listData)
                    let temp = res.listData.map(item=>{
                        item.title = item.FullName;
                        item.key = item.SystemUserId;
                        item.isLeaf = true
                        return item;
                    })
                    treeNode.dataRef.children = temp;
                    resolve();
                });
            }else {
                resolve();
            }
        });
    };
    const loadGroupPeople = (groupId) => {
        return new Promise((resolve,reject)=>{
            proxy.$get(Interface.group.list,{
                groupId: groupId
            }).then(res=>{
                resolve(res);
            })
        })
    }
    const selectPeople = (e,selectedNodes) => {
        console.log("e",e, selectedNodes);
        let row = selectedNodes.node;
        console.log(row);
        let index = data.selectConcatsList.findIndex(item=>item.systemUserId==row.SystemUserId);
        if(index==-1 && row.SystemUserId){
            data.selectConcatsList.push({
                systemUserId: row.SystemUserId,
                fullName: row.FullName
            });
            formState.addressee.push(row.SystemUserId);
        }
        if(index>=0){
            message.error("不能重复添加收件人！");
        }
    }

    
    const getDeptTree = () => {
        proxy.$get(Interface.treeList,{
            entity: "organizationtree"
        }).then(res=>{
            console.log("res",res);
            let rows = res.rows.map(item=>{
                item.key = item.id
                item.title = item.text;
                return item;
            });
            let list = formTreeData(rows, 'id', 'pid');
            data.deptTreeData = list;
            data.departListTree2[0].children = list;
        })
    }
    getDeptTree();
    // 加载部门下面联系人
    const loadDeptNode = treeNode => {
        console.log("treeNode",treeNode);
        return new Promise(resolve=>{
            if(treeNode.key==1){
                treeNode.dataRef.children = data.deptTreeData;
                data.departListTree = [...data.departListTree];
                resolve();
            }
            if(treeNode.id){
                loadGroupPeople(treeNode.groupId).then(res=>{
                    console.log("list", res.listData)
                    let temp = res.listData.map(item=>{
                        item.title = item.FullName;
                        item.key = item.SystemUserId;
                        item.isLeaf = true;
                        return item;
                    })
                    console.log("treeNode.dataRef.children",treeNode.dataRef.children);
                    if(treeNode.dataRef.children==undefined){
                        treeNode.dataRef.children = [];
                    }
                    treeNode.dataRef.children =  treeNode.dataRef.children.concat(temp);
                    resolve();
                });
            }
        })
    }
    const getDeptUser = (deptId) => {
        return new Promise(resolve=>{
            proxy.$get(Interface.user.sysUser,{
                businessUnitId: deptId
            }).then(res=>{
                resolve(res);
            })
        })
    }
    // 选择群组
    const selectGroup = (e,node)=>{
        console.log(e,node);
        let row = node.node;
        let index = data.selectGroupList.findIndex(item=>item.key == row.id);
        if(index==-1){
            data.selectGroupList.push({
                value: row.title,
                key: row.key
            });
            formState.group.push(row.key);
        }
        if(index>=0){
            message.error("不能重复添加群组！");
        }
    }
    // 发送邮件
    const handleSendEmail = () => {
        formRef.value.validate().then(() => {
            console.log('values', formState, toRaw(formState));
            proxy.$get(Interface.email.send,{
                id: "",
                subject: formState.theme,
                mailBody: formState.mailBody,
                toUserIds: "",
                emailStatus: 1,
                priority: 0,
                Forward: "",
                IsGroupmail: false,
                chkSms: formState.chkSms
            }).then(res=>{
                console.log("res",res);
            })
        }).catch(err => {
            console.log('error', err);
        });
        
    }
    const cancelWriteEmail= () => {
        let url = router.resolve({
            path:'/email',
            name: "Email",
            query: {
                
            },
        });
        //window.open(url.href);
        window.location.href=url.href;
    }
</script>
<style lang="less" scoped>
    .writeEmail {
        height: 100vh;
        background: #f0f2f6;
        .ant-select-selection-item-content .ant-avatar{
            display: none !important;
        }
    }

    .whitemailHeader {
        padding-top: 16px;
        border-bottom: 1px solid #e5e6eb;
        background: #fff;
    }

    .whitemailCenter {
        width: 100%;
        height: calc(~"100% - 121px");
        background: #fff;
        /* overflow: hidden; */
        .containerWrap {
            display: flex;
            height: 100%;

            .leftContainer {
                flex: 1;
                height: 100%;
                overflow: auto;
                .leftBd {
                    padding: 20px 50px;
                    height: 100%;
                    box-sizing: border-box;

                    .checkWrap {
                        padding: 10px 0;
                    }
                    .filesWrap{
                        .selectFile{
                            .inboxFileList{
                                display: flex;
                                flex-wrap: wrap;
                                .inboxFileItem{
                                    width: 266px;
                                    border-radius: 2px;
                                    background: #f2f3f5;
                                    padding: 10px;
                                    box-sizing: border-box;
                                    margin-right: 16px;
                                    margin-bottom: 16px;
                                    cursor: pointer;
                                    display: flex;
                                    overflow: hidden;
                                    position: relative;
                                    .leftImg{
                                        width: 32px;
                                        height: 32px;
                                        img{
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }
                                    .rightFileInfo{
                                        flex: 1;
                                        margin-left: 14px;
                                        overflow: hidden;
                                        color: #1d2129;
                                        .fileSize{
                                            color: #4e5969;
                                            padding-top: 4px;
                                        }
                                        .fileOptionShow{
                                            position: absolute;
                                            width: calc(~"100% - 36px");
                                            height: 100%;
                                            left: 42px;
                                            top: 0;
                                            background: rgba(242, 243, 245,.8);
                                            display: none;
                                            .btns{
                                                display: flex;
                                                align-items: center;
                                                height: 100%;
                                                justify-content: flex-end;
                                                padding-right: 20px;
                                                box-sizing: border-box;
                                            }
                                        }
                                    }
                                    &:hover .fileOptionShow{
                                        display: block;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .rightContainer {
                width: 15%;
                height: 100%;
                border-left: 1px solid #dcdcdc;
                padding: 20px;
                box-sizing: border-box;
                .rightFixedHead {
                    display: flex;
                    align-items: center;
                }
                .treePeopleWrap{
                    height: calc(~"100% - 60px");
                    box-sizing: border-box;
                    margin: 10px 0;
                    overflow-y: auto;
                }
            }
        }
    }

    .writeFooter {
        width: 100%;
        height: 64px;
        position: fixed;
        bottom: 0;
        background: #f2f3f5;
        box-sizing: border-box;

        .footerOption {
            padding: 16px 50px;
            box-sizing: border-box;
        }
    }
</style>