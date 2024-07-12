<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    选择人员
                </div>
            </template>
            <div class="modalContainer">
                <div class="headerTab">
                    <a-tabs v-model:activeKey="currentTab" @change="changeTab">
                        <a-tab-pane :key="index" :tab="item.name" v-for="(item,index) in tabs"></a-tab-pane>
                    </a-tabs>
                    <div class="search">
                        <a-input placeholder="请输入关键字搜索"></a-input>
                    </div>
                </div>
                <div class="modalCenter">
                    <div class="tabContainer" v-if="currentTab==1">
                        <ul class="userBox">
                            <li class="userItem" v-for="(item,index) in sameDeptUserList" :key="index" @click="handleSelectRow(item.SystemUserId,item.FullName, item.BusinessUnitIdName)">
                                <div class="avatar"></div>
                                <div class="info">
                                    <div>
                                        <span class="name">{{item.FullName}}</span>/{{item.UserName}}/{{ item.EmployeeNo }}
                                    </div>
                                    <p class="dept">{{item.BusinessUnitIdName}}</p>
                                </div>
                            </li>
                        </ul>
                        <div class="pageWrap">
                            <a-pagination v-model:current="currentPage" :total="50" :show-total="total => `共 ${total} 条`" />
                        </div>
                    </div>
                    <div class="tabContainer" v-if="currentTab==3">
                        <div class="deptTreeBox">
                            <div class="deptTree">
                                <a-tree :tree-data="deptTreeList" block-node @select="handleSelectTree">
                                    <template  #title="{name, key }">
                                        <span>{{name}}</span>
                                    </template>
                                </a-tree>
                            </div>
                            <div class="rightUserList">
                                <ul class="userBox">
                                    <li class="userItem" v-for="(item,index) in deptUserList" :key="index" @click="handleSelectRow(item.id,item.FullName.textValue, item.BusinessUnitIdName.textValue)">
                                        <div class="avatar"></div>
                                        <div class="info">
                                            <div>
                                                <span class="name">{{item.FullName.textValue}}</span>/{{item.UserName.textValue}}/{{ item.EmployeeId.textValue }}
                                            </div>
                                            <p class="dept">{{item.BusinessUnitIdName.textValue}}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="pageWrap">
                                    <a-pagination v-model:current="pageNumber" :total="pageTotal" :show-total="total => `共 ${total} 条`" @change="changePagin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tabContainer" v-if="currentTab==4">
                        <div class="deptTreeBox">
                            <div class="deptTree">
                                <a-tree :tree-data="groupList" block-node @select="handleNodeGroup">
                                    <template #title="{ Name, key }">
                                        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ Name }}</span>
                                        <template v-else>{{ Name.textValue }}</template>
                                    </template>
                                </a-tree>
                            </div>
                            <div class="rightUserList">
                                <ul class="userBox rightUserList">
                                    <li class="userItem" v-for="(item,index) in groupUserList" :key="index" @click="handleSelectRow(item.id,item.FullName.textValue, item.BusinessUnitIdName.textValue)">
                                        <div class="avatar"></div>
                                        <div class="info">
                                            <div>
                                                <span class="name">{{item.FullName.textValue}}</span>/{{item.UserName.textValue}}/{{ item.EmployeeId.textValue }}
                                            </div>
                                            <p class="dept">{{item.BusinessUnitIdName.textValue}}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="pageWrap">
                                    <a-pagination v-model:current="pageNumber" :total="pageTotal" :show-total="total => `共 ${total} 条`" @change="changePagin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tabContainer" v-if="currentTab==5">
                        <div class="deptTreeBox">
                            <div class="deptTree">
                                <a-tree :tree-data="roleList" block-node @select="handleNodeRole">
                                    <template #title="{ Name, key }">
                                        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ Name }}</span>
                                        <template v-else>{{ Name.textValue }}</template>
                                    </template>
                                </a-tree>
                            </div>
                            <div class="rightUserList">
                                <ul class="userBox rightUserList">
                                    <li class="userItem" v-for="(item,index) in roleUserList" :key="index" @click="handleSelectRow(item.id,item.FullName.textValue, item.BusinessUnitIdName.textValue)">
                                        <div class="avatar"></div>
                                        <div class="info">
                                            <div>
                                                <span class="name">{{item.FullName.textValue}}</span>/{{item.UserName.textValue}}/{{ item.EmployeeId.textValue }}
                                            </div>
                                            <p class="dept">{{item.BusinessUnitIdName.textValue}}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="pageWrap">
                                    <a-pagination v-model:current="pageNumber" :total="pageTotal" :show-total="total => `共 ${total} 条`" @change="changePagin" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <!-- <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
                    <a-button @click="clearData">清除</a-button> -->
                    <a-button @click="handleCancel">取消</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, toRaw
    } from "vue";
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import { formTreeData } from "@/utils/common.js";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean
    })
    const emit = defineEmits(['cancel', 'select-val']);
    const handleCancel = () => {
        emit("cancel", false);
    }

    const data = reactive({
        currentTab: 1,
        deptTreeList: [],
        deptList: [],
        selectData: {},
        sameDeptUserList: [],
        roleList: [],
        deptUserList: [],
        groupList: [],
        groupUserList: [],
        deptIdCurrent: [],
        groupIdCurrent: "",
        currentPage: 1,
        roleUserList: [],
        pageNumber: 1,
        pageSize: 20,
        pageTotal: 0,
        roleIdCurrent: ""
    })
    const tabs = toRaw([
        {
            key:1,
            name: '最近'
        },
        {
            key:2,
            name: '同部门'
        },
        {
            key:3,
            name: '我的下属'
        },
        {
            key:4,
            name: '组织结构'
        },
        {
            key:5,
            name: '小组'
        },
        {
            key:6,
            name: '角色'
        }
    ])
    const { currentTab, deptTreeList, deptList, selectData, sameDeptUserList, 
        roleList, deptUserList, groupList, groupUserList, deptIdCurrent, groupIdCurrent, currentPage,
         roleUserList, pageNumber, pageSize, pageTotal, roleIdCurrent } = toRefs(data);

    const getSameDeptUser = () => {
        proxy.$get(Interface.user.mybusinessUser,{}).then(res=>{
            // console.log("res",res);
            data.sameDeptUserList = res.listData;
        })
    }
    getSameDeptUser();

    // 角色
    const getRoleList = () => {
        let d = {
            filterId: "",
            entityType: "Role",
            // filterQuery: "\nBusinessUnitId\teq\t" + deptId
        };
        proxy.$get(Interface.list2, d).then(res=>{
            // console.log("res",res);
            let nodes = res.nodes;
            data.roleList = nodes;
            getRoleUser(data.roleList[0].id);
        })
    }
    const changeTab = (e) => {
        console.log("e",e);
        data.pageNumber = 1;
        switch(e){
            case 3:
                getTreeDept();
                break;
            case 4:
                getGroup();
                break;
            case 5:
                getRoleList();
                break;
        }
    }
    const getTreeDept = () => {
        proxy.$get(Interface.deptTree, {}).then(res => {
            console.log("res", res);
            let listData = res.actions[0].returnValue;
            data.deptList = listData;
            let rows = listData.map(item=>{
                item.key = item.id;
                return item;
            });
            data.deptTreeList = formTreeData(rows, 'id', 'parentId');
            console.log("deptTreeList", data.deptTreeList);
            data.deptIdCurrent = data.deptList[0].id;
            getDeptUser(data.deptList[0].id);
        })
    }

    // const formTreeData = (list) => {
    //     var result = [];
    //     if (!Array.isArray(list)) {
    //         return result;
    //     }
    //     var map = {};
    //     list.forEach(function (item) {
    //         map[item.id] = item;
    //     });
    //     list.forEach(function (item) {
    //         var parent = map[item.pid];
    //         if (parent) {
    //             parent.children = parent.children || [];
    //             parent.children.push(item);
    //         } else {
    //             result.push(item);
    //         }
    //     });
    //     return result;
    // }

    const handleSelectTree = (selectedKeys,selectedNodes) => {
        console.log("e",selectedKeys,selectedNodes);
        var deptId = selectedNodes.node.id;
        data.deptIdCurrent = deptId;
        getDeptUser();
    }

    // 获取部门用户
    const getDeptUser = () => {
        let d = {
            filterId: "",
            entityType: "SystemUser",
            displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
            // filterQuery: "\nBusinessUnitId\teq\t" + data.deptIdCurrent,
            page: data.pageNumber,
            rows: data.pageSize
        };
        proxy.$get(Interface.list2, d).then(res=>{
            let nodes = res.nodes;
            data.deptUserList = nodes;
            data.pageTotal = res.totalCount;
        })
    }

    // 获取小组
    const getGroup = () => {
        let d = {
            filterId: "",
            entityType: "Group",
            filterQuery: ""
        };
        proxy.$get(Interface.list2, d).then(res=>{
            let nodes = res.nodes;

            data.groupList = nodes.map(item=>{
                item.key = item.id;
                return item;
            });
            data.groupIdCurrent = data.groupList[0].id;
            getGroupUser(data.groupList[0].id);
        })
    }
    const handleNodeGroup = (selectedKeys,selectedNodes) => {
        let groupId = selectedNodes.node.id;
        data.groupIdCurrent = groupId;
        getGroupUser();
    }
    // 获取小组用户
    const getGroupUser = () => {
        let d = {
            filterId: "",
            entityType: "SystemUser",
            displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
            // filterQuery: "\nGroupId\teq\t" + data.groupIdCurrent,
            page: data.pageNumber,
            rows: data.pageSize,
        };
        proxy.$get(Interface.list2, d).then(res=>{
            data.pageTotal = res.totalCount;
            let nodes = res.nodes;
            data.groupUserList = nodes;
        })
    }
    const handleNodeRole = (selectedKeys,selectedNodes) => {
        let roleId = selectedNodes.node.id;
        data.roleIdCurrent = roleId;
        getRoleUser();
    }
    const getRoleUser = () => {
        let d = {
            filterId: "",
            entityType: "SystemUser",
            displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
            // filterQuery: "\nRoleId\teq\t" + data.roleIdCurrent,
            page: data.pageNumber,
            rows: data.pageSize
        };
        proxy.$get(Interface.list2, d).then(res=>{
            data.pageTotal = res.totalCount;
            let nodes = res.nodes;
            data.roleUserList = nodes;
        })
    }
    const clearData = () => {
        data.selectData = {};
    }

    // 选择人员
    const handleSelectRow = (id,name, BusinessUnitIdName) => {
        console.log("id:",id,name);
        var selectUser = {
            id: id,
            name: name,
            BusinessUnitIdName: BusinessUnitIdName
        }
        emit("select-val", selectUser);
    }
    const handleSubmit = () => {
        if(Object.keys(data.selectData).length){
            emit("select-val", data.selectData);
        }else {
            alert("请选择部门!")
        }
    };
    const changePagin = (e) => {
        console.log("e",e);
        data.pageNumber = e;
        switch(data.currentTab){
            case 3:
                getDeptUser();
                break;
            case 4:
                getGroupUser();
                break;
            case 5:
                getRoleUser();
                break;
        }
    } 
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .headerTab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 0 10px;

        .search {
            width: 200px;
        }
    }

    :deep :where(.css-dev-only-do-not-override-kqecok).ant-tabs>.ant-tabs-nav,
    :where(.css-dev-only-do-not-override-kqecok).ant-tabs>div>.ant-tabs-nav {
        margin: 0 !important;
    }

    .tabContainer{
        height: 100%;
        position: relative;
        overflow: hidden;
        .deptTreeBox{
            height: 100%;
            display: flex;
            .deptTree{
                height: 100%;
                width: 200px;
                overflow: auto;
                border-right: 1px solid #e2e3e5;
            }
            .rightUserList{
                flex: 1;
                position: relative;
                .userBox{
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                }
            }
        }
        .userBox{
            height: 100%;
            overflow: auto;
            padding-bottom: 44px;
            .userItem{
                display: flex;
                align-items: center;
                padding: 10px 20px;
                border-bottom: 1px solid #e2e3e5;
                .avatar{
                    width: 40px;
                    height: 40px;
                    background: #e2e3e5;
                    border-radius: 50%;
                }
                .info{
                    flex: 1;
                    margin-left: 10px;
                    .name{
                        color: var(--textColor);
                    }
                }
            }
            .userItem:hover{
                cursor: pointer;
                background: #f4f4f4;
            }
        }
        .pageWrap{
            width: 100%;
            background: #f4f4f4;
            position: absolute;
            bottom: 0;
            padding: 10px 0;
            text-align: center;
        }
    }
</style>