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
                            <li class="userItem" v-for="(item,index) in sameDeptUserList" :key="index" @click="handleSelectRow(item.SystemUserId,item.FullName)">
                                <div class="avatar"></div>
                                <div class="info">
                                    <div>
                                        <span class="name">{{item.FullName}}</span>/{{item.UserName}}/{{ item.EmployeeNo }}
                                    </div>
                                    <p class="dept">{{item.BusinessUnitIdName}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="tabContainer" v-if="currentTab==3">
                        <div class="deptTreeBox">
                            <div class="deptTree">
                                <a-tree :tree-data="deptTreeList" v-model:selectedKeys="deptIdCurrent" block-node @select="handleSelectTree">
                                    <template #title="{ text, key }">
                                        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ text }}</span>
                                        <template v-else>{{ text }}</template>
                                    </template>
                                </a-tree>
                            </div>
                            <ul class="userBox rightUserList">
                                <li class="userItem" v-for="(item,index) in deptUserList" :key="index" @click="handleSelectRow(item.systemUserId,item.fullName)">
                                    <div class="avatar"></div>
                                    <div class="info">
                                        <div>
                                            <span class="name">{{item.fullName}}</span>/{{item.userName}}/{{ item.employeeNo }}
                                        </div>
                                        <p class="dept">{{item.OrganizationName}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="tabContainer" v-if="currentTab==4">
                        <div class="deptTreeBox">
                            <div class="deptTree">
                                <a-tree :tree-data="groupList" block-node  v-model:selectedKeys="groupIdCurrent" @select="handleNodeGroup">
                                    <template #title="{ Name, key }">
                                        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ Name }}</span>
                                        <template v-else>{{ Name }}</template>
                                    </template>
                                </a-tree>
                            </div>
                            <ul class="userBox rightUserList">
                                <li class="userItem" v-for="(item,index) in groupUserList" :key="index" @click="handleSelectRow(item.SystemUserId,item.FullName)">
                                    <div class="avatar"></div>
                                    <div class="info">
                                        <div>
                                            <span class="name">{{item.FullName}}</span>/{{item.UserName}}/{{ item.EmployeeId }}
                                        </div>
                                        <p class="dept">{{item.BusinessUnitIdName}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="tabContainer" v-if="currentTab==5">
                        <ul class="userBox">
                            <li class="userItem" v-for="(item,index) in roleList" :key="index" @click="handleSelectRow(item.RoleId,item.Name)">
                                <div class="avatar"></div>
                                <div class="info">
                                    <div>
                                        <span class="name">{{item.Name}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
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
        groupIdCurrent: []
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
        roleList, deptUserList, groupList, groupUserList, deptIdCurrent, groupIdCurrent } = toRefs(data);

    const getSameDeptUser = () => {
        proxy.$get(Interface.user.mybusinessUser,{}).then(res=>{
            // console.log("res",res);
            data.sameDeptUserList = res.listData;
        })
    }
    getSameDeptUser();

    // 角色
    const getRoleList = () => {
        proxy.$get(Interface.user.roleUser,{}).then(res=>{
            // console.log("res",res);
            data.roleList = res.listData;
        })
    }
    const changeTab = (e) => {
        console.log("e",e);
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
        proxy.$get(Interface.treeList, {
            entity: "organizationtree",
            search: ""
        }).then(res => {
            console.log("res", res);
            data.deptList = res.rows;
            let rows = res.rows.map(item=>{
                item.key = item.id;
                return item;
            });
            data.deptTreeList = formTreeData(rows);
            console.log("deptTreeList", data.deptTreeList);
            data.deptIdCurrent = [data.deptList[0].id];
            getDeptUser(data.deptList[0].id);
        })
    }

    const formTreeData = (list) => {
        var result = [];
        if (!Array.isArray(list)) {
            return result;
        }
        var map = {};
        list.forEach(function (item) {
            map[item.id] = item;
        });
        list.forEach(function (item) {
            var parent = map[item.pid];
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(item);
            } else {
                result.push(item);
            }
        });
        return result;
    }

    const handleSelectTree = (selectedKeys,selectedNodes) => {
        console.log("e",selectedKeys,selectedNodes);
        var deptId = selectedNodes.node.id;
        getDeptUser(deptId);
    }

    // 获取部门用户
    const getDeptUser = (deptId) => {
        proxy.$get(Interface.user.sysUser,{
            businessUnitId: deptId
        }).then(res=>{
            var list = res.listData;
            data.deptUserList = list;
        })
    }

    // 获取小组
    const getGroup = () => {
        proxy.$get(Interface.user.groupList,{

        }).then(res=>{
            data.groupList = res.listData.map(item=>{
                item.key = item.GroupId;
                return item;
            });
            data.groupIdCurrent = [data.groupList[0].GroupId];
            getGroupUser(data.groupList[0].GroupId);
        })
    }
    const handleNodeGroup = (selectedKeys,selectedNodes) => {
        let groupId = selectedNodes.node.GroupId;
        getGroupUser(groupId);
    }
    // 获取小组用户
    const getGroupUser = (groupId) => {
        proxy.$get(Interface.user.groupUser,{
            GroupId: groupId
        }).then(res=>{
            data.groupUserList = res.listData;
        })
    }
    const clearData = () => {
        data.selectData = {};
    }

    // 选择人员
    const handleSelectRow = (id,name) => {
        console.log("id:",id,name);
        var selectUser = {
            id: id,
            name: name
        }
        emit("select-val", selectUser);
    }
    const handleSubmit = () => {
        if(Object.keys(data.selectData).length){
            emit("select-val", data.selectData);
        }else {
            alert("请选择部门!")
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
        .deptTreeBox{
            height: 100%;
            display: flex;
            .deptTree{
                height: 100%;
                width: 200px;
                overflow: auto;
                border-right: 1px solid #e2e3e5;
            }
            .userBox.rightUserList{
                height: 100%;
                overflow: auto;
                flex: 1;
            }
        }
        .userBox{
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
    }
</style>