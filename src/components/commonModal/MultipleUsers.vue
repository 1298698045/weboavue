<template>
    <div>
        <a-modal v-model:open="props.isShow" width="900px" :maskClosable="false" @cancel="handleCancel"
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
                </div>
                <div class="modalCenter">
                    <div class="muti-container">
                        <div class="muti-left">
                            <div class="muti-head">
                                <div class="muti-search">
                                    <a-input v-model:value="searchVal" @change="searchUser">
                                        <template #suffix>
                                            <SearchOutlined />
                                        </template>
                                    </a-input>
                                </div>
                            </div>
                            <template v-if="currentTab == 0 || currentTab == 1 || currentTab == 2 || currentTab == -1">
                                <div class="muti-center muti-left-center" :class="{'active':currentTab==1||currentTab==-1 && total > 10}">
                                    <ul class="user-list">
                                        <li class="user-item" :class="{'active':item.checked}" v-for="(item, index) in filterUserList" :key="index" @click="handleSelectUser(item)">
                                            <div class="user-avatar">
                                                <!-- <div class="avatar-img">
                                                </div> -->
                                                <div class="user-name">{{item.name.slice(0,2)}}</div>
                                            </div>
                                            <div class="user-info">
                                                <div class="info-row">
                                                    <span>{{item.name}}</span>
                                                    <span>{{item.employeeId}}</span>
                                                </div>
                                                <div class="info-row">
                                                    <span>{{item.organizationIdName}}</span>-
                                                    <span>{{item.businessUnitIdName}}</span>
                                                </div>
                                            </div>
                                            <div class="icon-wrap"></div>
                                            <span class="icon-coms-Selected">
                                                <CheckOutlined />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="muti-left-footer" v-if="(currentTab==1||currentTab==-1) && total > 10">
                                    <span>
                                        共{{total}}条
                                    </span>
                                    <a-pagination size="small" v-model:current="pageNumber" :total="total" show-less-items />
                                </div>
                            </template>
                            <template v-else>
                                <div class="muti-center">
                                    <div class="muti-row">
                                        <div class="tree-container" v-if="currentTab==3">
                                            <a-tree :tree-data="deptTreeList" :selectedKeys="[deptIdCurrent]" :fieldNames="fieldNames" block-node
                                                @select="handleSelectTree">
                                                    <template #title="{name, key }">
                                                        <span>{{name}}</span>
                                                    </template>
                                            </a-tree>
                                        </div>
                                        <div class="tree-container" v-if="currentTab==4">
                                            <a-tree :tree-data="groupList" :selectedKeys="[groupIdCurrent]" block-node @select="handleNodeGroup">
                                                <template #title="{ Name, key }">
                                                    <span>{{ Name.textValue }}</span>
                                                </template>
                                            </a-tree>
                                        </div>
                                        <div class="tree-container" v-if="currentTab==5">
                                            <a-tree :tree-data="roleList" :selectedKeys="[roleIdCurrent]" block-node @select="handleNodeRole">
                                                <template #title="{ Name, key }">
                                                    <span>{{ Name.textValue }}</span>
                                                </template>
                                            </a-tree>
                                        </div>
                                        <div class="userList">
                                            <ul class="user-list" :class="{active:currentTab==3}">
                                                <li class="user-item" :class="{'active':item.checked}" v-for="(item, index) in filterUserList" :key="index" @click="handleSelectUser(item)">
                                                    <div class="user-avatar">
                                                        <!-- <div class="avatar-img">
                                                        </div> -->
                                                        <div class="user-name">{{item.name.slice(0,2)}}</div>
                                                    </div>
                                                    <div class="user-info">
                                                        <div class="info-row">
                                                            <span>{{item.name}}</span>
                                                            <span>{{item.employeeId}}</span>
                                                        </div>
                                                        <div class="info-row">
                                                            <span>{{item.organizationIdName}}</span>-
                                                            <span>{{item.businessUnitIdName}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="icon-wrap"></div>
                                                    <span class="icon-coms-Selected">
                                                        <CheckOutlined />
                                                    </span>
                                                </li>
                                            </ul>
                                            <div class="muti-left-footer" v-if="currentTab==3  && total > 10">
                                                <span>
                                                    共{{total}}条
                                                </span>
                                                <a-pagination size="small" v-model:current="pageNumber" :total="total" show-less-items @change="getDeptUser" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="transfer-opration">
                            <button class="btn-radius" :class="{'primary':currentSelectedList.length}" :disabled="currentSelectedList.length>0?false:true" @click="handleAddRightUser">
                                <RightOutlined />
                            </button>
                            <button class="btn-radius" :class="{'primary':userSelectedListChecked.length}" :disabled="userSelectedListChecked.length?false:true" @click="handleAddLeftUser">
                                <LeftOutlined />
                            </button>
                            <button class="btn-radius primary" :disabled="filterUserList.length == 0 ? true : false" @click="handleAddRightUserAll">
                                <RightOutlined />
                            </button>
                            <button class="btn-radius primary" :disabled="userSelectedList.length == 0 ? true : false" @click="handleAddLeftUserAll">
                                <LeftOutlined />
                            </button>
                        </div>
                        <div class="muti-right">
                            <div class="muti-head">
                                <div class="muti-search">
                                    <a-input>
                                        <template #suffix>
                                            <SearchOutlined />
                                        </template>
                                    </a-input>
                                </div>
                            </div>
                            <div class="muti-center muti-left-center">
                                <ul class="user-list">
                                    <li class="user-item" :class="{'active':item.checked}" v-for="(item, index) in userSelectedList" :key="index" @click="selectCheckedUser(item)">
                                        <div class="user-avatar">
                                            <!-- <div class="avatar-img">
                                            </div> -->
                                            <div class="user-name">{{item.name.slice(0,2)}}</div>
                                        </div>
                                        <div class="user-info">
                                            <div class="info-row">
                                                <span>{{item.name}}</span>
                                                <span>{{item.employeeId}}</span>
                                            </div>
                                            <div class="info-row">
                                                <span>{{item.organizationIdName}}</span>-
                                                <span>{{item.businessUnitIdName}}</span>
                                            </div>
                                        </div>
                                        <div class="icon-wrap"></div>
                                        <span class="icon-coms-Selected">
                                            <CheckOutlined />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">确定
                        <span v-if="userSelectedList.length">({{userSelectedList.length}})</span>
                    </a-button>
                    <a-button @click="clearSelectedUser">清除</a-button>
                    <a-button @click="handleCancel">取消</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, toRaw, computed
    } from "vue";
    import { SearchOutlined, DownOutlined, UserOutlined, RightOutlined, LeftOutlined, CheckOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { formTreeData } from "@/utils/common.js";
    import { message } from "ant-design-vue";

    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean
    })
    const emit = defineEmits(['cancel', 'select']);
    const handleCancel = () => {
        emit("cancel", false);
    }

    const data = reactive({
        currentTab: 0,
        deptTreeList: [],
        userList: [],
        deptUserList: [],
        groupList: [],
        roleList: [],
        userList: [],
        currentSelectedList: [],
        userSelectedList: [],
        userSelectedListChecked: [],
        fieldNames: {
            key: "id",
            title: "name",
            children: "children"
        },
        deptIdCurrent: "",
        groupIdCurrent: "",
        roleIdCurrent: "",
        searchVal: "",
        pageNumber: 1,
        pageSize: 10,
        total: 0
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
    const { currentTab, deptTreeList, userList, groupList,
        roleList, deptUserList, currentSelectedList, userSelectedList, userSelectedListChecked,
        fieldNames, deptIdCurrent, groupIdCurrent, roleIdCurrent, searchVal, pageNumber, pageSize, total } = toRefs(data);

    const filterUserList = computed(()=>{
        return data.userList.filter((item=>{
            let isBook = data.userSelectedList.some(row=>row.id==item.id);
            if(!isBook){
                return item;
            }
        }))
    });

    const searchUser = () => {
        data.currentTab = -1;
        data.userList = [];
        let d = {
            filterId: "",
            entityType: "SystemUser",
            displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
            search: data.searchVal,
            filterQuery: "",
            page: data.pageNumber,
            rows: data.pageSize
        };
        proxy.$get(Interface.list2, d).then(res=>{
            data.total = res.totalCount;
            let nodes = res.nodes;
            data.userList = nodes.map(item=>{
                item.name = item.FullName.textValue;
                item.businessUnitIdName = item.BusinessUnitIdName.textValue || '';
                item.organizationIdName = item.OrganizationId.lookupValue.displayName || '';
                item.employeeId = item.EmployeeId.textValue;
                return item;
            });
        })
    }

    // 最近使用
    const getLatestUsers = () => {
        proxy.$get(Interface.user.getLatestUsers, {}).then(res=>{
            let list = res.actions[0].returnValue;
            data.userList = list.map(item=>{
                item.id = item.UserId;
                item.name = item.FullName;
                item.employeeId = item.EmployeeId;
                return item;
            });
        })
    };
    getLatestUsers();

    // 获取同部门
    const getSameDeptUser = () => {
        let d = {
            filterId: "",
            entityType: "SystemUser",
            displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
            filterQuery: "\nBusinessUnitId\teq-businessunitid",
            page: data.pageNumber,
            rows: data.pageSize
        };
        proxy.$get(Interface.list2, d).then(res=>{
            let nodes = res.nodes;
            data.total = res.totalCount;
            data.userList = nodes.map(item=>{
                item.name = item.FullName.textValue;
                item.businessUnitIdName = item.BusinessUnitIdName.textValue || '';
                item.organizationIdName = item.OrganizationId.lookupValue.displayName || '';
                item.employeeId = item.EmployeeId.textValue || '';
                return item;
            });
        })
    }

    const getSubordinates = () => {
        proxy.$get(Interface.user.getSubordinates, {}).then(res=>{
            let list = res.actions[0].returnValue;
            data.userList = list.map(item=>{
                item.id = item.UserId;
                item.name = item.FullName;
                item.employeeId = item.EmployeeId || '';
                return item;
            });
        })
    }

    // 左侧选中的数据
    const handleSelectUser = (item) => {
        item.checked = !item.checked;
        if(item.checked){
            data.currentSelectedList.push(item);
        }else {
            let idx = data.currentSelectedList.findIndex(row=>row.id == item.id);
            data.currentSelectedList.splice(idx, 1);
        };
    };

    // 添加用户到右侧
    const handleAddRightUser = () => {
        data.currentSelectedList.forEach(item=>{
            item.checked = false;
        })
        data.userSelectedList = data.userSelectedList.concat(data.currentSelectedList);
        // data.userList = data.userList.filter(item => {
        //     return !data.userSelectedList.some(row => row.id === item.id);
        // });
        data.currentSelectedList = [];
    };

    // 添加用户到左侧
    const handleAddLeftUser = () => {
        data.userSelectedListChecked.forEach(item=>{
            item.checked = false;
        })

        // data.userList = data.userList.concat(data.userSelectedListChecked);

        data.userSelectedList = data.userSelectedList.filter(item => {
            return !data.userSelectedListChecked.some(row => row.id === item.id);
        });
        data.userSelectedListChecked = [];
    };

    // 全部用户添加到右侧
    const handleAddRightUserAll = () => {
        data.currentSelectedList = [];
        data.userList.forEach(item=>{
            item.checked = false;
        })
        data.userSelectedList = data.userSelectedList.concat(data.userList);
        // data.userList = [];
    };

    // 全部用户添加到左侧
    const handleAddLeftUserAll = () => {
        data.userSelectedListChecked = [];
        data.userSelectedList.forEach(item=>{
            item.checked = false;
        })
        // data.userList = data.userList.concat(data.userSelectedList);
        data.userSelectedList = [];
    };

    // 选择右侧的用户
    const selectCheckedUser = (item) => {
        item.checked = !item.checked;
        if(item.checked){
            data.userSelectedListChecked.push(item);
        }else {
            let idx = data.userSelectedListChecked.findIndex(row=>row.id == item.id);
            data.userSelectedListChecked.splice(idx, 1);
        };
    };
    
    const changeTab = (e) => {
        data.pageNumber = 1;
        data.userList = [];
        switch(e){
            case 0:
                getLatestUsers();
                break;
            case 1:
                getSameDeptUser();
                break;
            case 2:
                getSubordinates();
                break;
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
            let listData = res.actions[0].returnValue;
            data.deptList = listData;
            let rows = listData.map(item=>{
                item.key = item.id;
                item.children = [];
                return item;
            });
            data.deptTreeList = formTreeData(rows, 'id', 'parentId');
            let deptId = data.deptTreeList[0].id;
            data.deptIdCurrent = deptId;
            getDeptUser(deptId)
        });
    };

    const handleSelectTree = (selectedKeys,selectedNodes) => {
        let deptId = selectedNodes.node.id;
        data.deptIdCurrent = deptId;
        data.pageNumber = 1;
        getDeptUser(deptId);
    }

    // 获取部门用户
    const getDeptUser = () => {
        let d = {
            filterId: "",
            entityType: "SystemUser",
            displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
            filterQuery: "\nBusinessUnitId\teq\t" + data.deptIdCurrent,
            page: data.pageNumber,
            rows: data.pageSize
        };
        proxy.$get(Interface.list2, d).then(res=>{
            let nodes = res.nodes;
            data.total = res.totalCount;
            data.userList = nodes.map(item=>{
                item.name = item.FullName.textValue;
                item.businessUnitIdName = item.BusinessUnitIdName.textValue || '';
                item.organizationIdName = item.OrganizationId.lookupValue.displayName || '';
                item.employeeId = item.EmployeeId.textValue|| '';
                return item;
            });
        })
    }

    // 获取小组
    const getGroup = () => {
        let d = {
            filterId: "",
            entityType: "Group",
            filterQuery: "\nIsPublic\teq\ttrue"
        };
        proxy.$get(Interface.list2, d).then(res=>{
            let nodes = res.nodes;
            data.groupList = nodes.map(item=>{
                item.key = item.id;
                return item;
            });
            data.groupIdCurrent = data.groupList[0].id;
            getGroupUser();
        })
    }
    const handleNodeGroup = (selectedKeys,selectedNodes) => {
        let groupId = selectedNodes.node.id;
        data.groupIdCurrent = groupId;
        getGroupUser(groupId);
    }
    // 获取小组用户
    const getGroupUser = () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: data.groupIdCurrent
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.user.getGroupUsers, d).then(res=>{
            let list = res.actions[0].returnValue;
            data.userList = list.map(item=>{
                item.id = item.UserId;
                item.name = item.FullName;
                item.employeeId = item.EmployeeId;
                return item;
            });
        })
    };

    const handleNodeRole = (selectedKeys,selectedNodes) => {
        let RoleId = selectedNodes.node.id;
        data.roleIdCurrent = RoleId;    
        getRoleUser(RoleId);
    }

    // 角色
    const getRoleList = () => {
        let d = {
            filterId: "",
            entityType: "Role",
        };
        proxy.$get(Interface.list2, d).then(res=>{
            let nodes = res.nodes;
            data.roleList = nodes.map(item=>{
                item.key = item.id;
                return item;
            });
            data.roleIdCurrent = data.roleList[0].id;
            getRoleUser();
        })
    };
    const getRoleUser = () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: data.roleIdCurrent
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.user.getRoleUsers, d).then(res=>{
            let list = res.actions[0].returnValue;
            data.userList = list.map(item=>{
                item.id = item.UserId;
                item.name = item.FullName;
                item.employeeId = item.EmployeeId;
                return item;
            });
        })
    };



    const clearSelectedUser = () => {
        data.userSelectedList = [];
    }

    const handleSubmit = () => {
        if(data.userSelectedList.length == 0){
            message.error("请选择人员!");
        }else {
            // console.log("userSelectedList:", data.userSelectedList);
            let list = [];
            data.userSelectedList.forEach(item=>{
                list.push({
                    id: item.id,
                    name: item.name,
                    businessUnitIdName: item.businessUnitIdName,
                    organizationIdName: item.organizationIdName
                })
            });
            
            emit("select", list);
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
    }

    :deep :where(.css-dev-only-do-not-override-kqecok).ant-tabs>.ant-tabs-nav,
    :where(.css-dev-only-do-not-override-kqecok).ant-tabs>div>.ant-tabs-nav {
        margin: 0 !important;
    }
    .modalCenter{
        height: 415px !important;
    }
    .btn-radius{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        line-height: 33px;
        color: #fff;
        font-weight: bold;
        margin: 12px 0;
        &.primary{
            color: #fff;
            background-color: #2db7f5;
            border-color: #2db7f5;
            cursor: pointer;
        }
        &[disabled]{
            cursor: not-allowed;
            background: #c9c9c9;
        }
    }
    .muti-container{
        height: 100%;
        overflow: hidden;
        position: relative;
        .muti-left{
            width: 46%;
            height: 100%;
            display: inline-block;
            border: 1px solid #dadada;
            border-top: none;
            float: left;
            position: relative;
            .muti-center.muti-left-center{
                &.active{
                    height: calc(100% - 70px);
                }
            }
            .muti-left-footer{
                position: absolute;
                width: 100%;
                bottom: 0;
                height: 35px;
                line-height: 35px;
                background: #f7f7f7;
                color: #333;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .muti-head{
            height: 35px;
        }
        .muti-center{
            width: 100%;
            height: calc(100% - 35px);
            &:hover{
                overflow-y: auto;
            }
            .user-list{
                width: 100%;
                /* height: 1000px; */
                .user-item{
                    width: 100%;
                    padding: 6px 0 6px 20px;
                    overflow: hidden;
                    cursor: pointer;
                    border-bottom: 1px solid #e9e9e9;
                    position: relative;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    &:last-child{
                        border-bottom: none;
                    }
                    &:hover,&.active{
                        background: #eaf8fe;
                    }
                    .user-avatar{
                        min-width: 30px;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        vertical-align: middle;
                        overflow: hidden;
                        background: #55b1f9;
                        margin-right: 15px;
                        .avatar-img{
                            width: 100%;
                            height: 100%;
                            border-radius: 30%;
                        }
                        .user-name{
                            width: 100%;
                            height: 100%;
                            line-height: 30px;
                            border-radius: 30%;
                            font-size: 12px;
                            color: #fff;
                            background: #55b1f9;
                            text-align: center;
                        }
                    }
                    .user-info{
                        span{
                            margin-right: 5px;
                        }
                    }
                    .icon-wrap{
                        position: absolute;
                        top: 0;
                        right: 0;
                        height: 0;
                        width: 0;
                        border-top: 21px solid #0b93da;
                        border-left: 22px solid transparent;
                        display: none;
                    }
                    .icon-coms-Selected{
                        position: absolute;
                        font-size: 11px;
                        color: #fff;
                        top: 0;
                        right: 1px;
                        font-size: 10px;
                        display: none;
                    }
                    &.active{
                        .icon-wrap,.icon-coms-Selected{
                            display: block;
                        }
                    }
                }
            }
        }
        .transfer-opration{
            width: 30px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .muti-right{
            width: 46%;
            height: 100%;
            display: inline-block;
            float: right;
            border: 1px solid #dadada;
            border-top: none;
        }
    }
    .muti-row{
        height: 100%;
        display: flex;
        overflow: hidden;
        .tree-container{
            height: 100%;
            overflow: auto;
        }
        .userList{
            flex: 1;
            height: 100%;
            /* overflow-y: auto; */
            border-left: 1px solid #dadada;
            position: relative;
            .user-list{
                overflow-y: auto;
                height: 100%;
                &.active{
                    height: calc(100% - 35px);
                }
            }
        }
    }
</style>
<style>
    .muti-search .ant-input-affix-wrapper{
        border-radius: 0;
        border-left: none;
        border-right: none;
        height: 35px;
    }
</style>