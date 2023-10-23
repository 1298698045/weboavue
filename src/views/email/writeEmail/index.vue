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
                            <a-form :model="formState" :label-col="labelCol">
                                <a-form-item label="收件人" name="addressee"
                                    :rules="[{ required: true, message: '请选择收件人' }]">
                                    <a-select ref="select" v-model:value="formState.addressee" mode="multiple"
                                        placeholder="请选择收件人">
                                        <a-select-option value="jack">Jack</a-select-option>
                                        <a-select-option value="lucy">Lucy</a-select-option>
                                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="主题" name="theme" :rules="[{ required: true, message: '请输入主题' }]">
                                    <a-input v-model:value="formState.theme"></a-input>
                                </a-form-item>
                            </a-form>
                            <div class="filesWrap">
                                <div class="selectFile">
                                    <a-upload v-model:file-list="fileList" name="file" action="/mail/attach/upload"
                                        :headers="headers" @change="handleChange">
                                        <a-button type="link">添加附件</a-button>
                                    </a-upload>
                                </div>
                            </div>
                            <div class="editor">
                                <Editor placeholder="请输入邮件内容" />
                            </div>
                            <div class="checkWrap">
                                <a-checkbox v-model:checked="formState.chkSms">短信</a-checkbox>
                                <a-checkbox>已读回执</a-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightContainer">
                    <div class="rightFixedHead">
                        <a-input-search v-model:value="searchVal" placeholder="请输入" style="width: 200px"
                            @search="onSearch" />
                        <a-button :icon="h(PlusOutlined)"></a-button>
                    </div>
                    <div class="treePeopleWrap">
                        <a-tree blockNode  v-model:expandedKeys="DeptexpandedKeys" v-model:selectedKeys="deptSelectedKeys"
                            :load-data="loadDeptNode" :tree-data="departListTree">
                        </a-tree>
                        <a-tree blockNode @select="selectGroup" v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys"
                            :load-data="loadGroupNode" :tree-data="groupTreeData">
                        </a-tree>
                    </div>
                </div>
            </div>
        </div>
        <div class="writeFooter">
            <div class="footerOption">
                <a-button class="mr10" type="primary">发送</a-button>
                <a-button class="mr10">存草稿</a-button>
                <a-button class="mr10">取消</a-button>
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
        h
    } from "vue";
    import {
        EllipsisOutlined, CloseOutlined, UserOutlined, PlusOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import Delete from "@/components/listView/Delete.vue";
    import Editor from "@/components/TEditor.vue"
    import { formTreeData } from "@/utils/common.js";
    const { proxy } = getCurrentInstance();
    const activeKey = ref();
    const labelCol = ref({ style: { width: '100px' } });
    const formState = reactive({
        addressee: [],
        theme: "",
        chkSms: false
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
        deptTreeData: []
    })
    const { fileList, headers, searchVal, groupTreeData, expandedKeys, selectedKeys, groupDataList, DeptexpandedKeys,
        deptSelectedKeys, deptTreeData, departListTree
    } = toRefs(data);
    const handleChange = (e) => {

    }
    const onSearch = (e) => {

    }
    // 公共小组
    const getGroupList = () => {
        proxy.$get(Interface.user.groupList, {}).then(res => {
            data.groupDataList = res.listData.map(function (item) {
                item.title = item.Name;
                item.key = item.GroupId;
                item.children = [];
                return item;
            });
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
    const selectGroup = (e,selectedNodes) => {
        console.log("e",e, selectedNodes);
        let item = selectedNodes.node;
        console.log(item);
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
</script>
<style lang="less" scoped>
    .writeEmail {
        height: 100vh;
        background: #f0f2f6;
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

                .leftBd {
                    padding: 20px 50px;
                    height: 100%;
                    box-sizing: border-box;

                    .checkWrap {
                        padding: 10px 0;
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