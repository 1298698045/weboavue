<template>
    <div class="addressBook">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #893D86;">
                    <img :src="require('@/assets/img/rightMenu/tongxunlu1.png')" alt="">
                </div>
                <span class="headerTitle">通讯录</span>
            </div>
            <div class="headerRight">
                <!-- <a-button class="ml10">导入</a-button> -->
                <!-- <a-button class="ml10">导出</a-button>
                <a-button class="ml10">下载模板</a-button> -->
                <a-input-search class="ml10" v-model:value="searchVal" placeholder="请输入关键字" style="width: 150px;"
                    @search="onSearch" />
                <a-dropdown class="ml10" v-if="activeKey=='1'">
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="1" @click="choiceSort('全部','')">
                                全部
                            </a-menu-item>
                            <a-menu-item key="2" @click="choiceSort('按名称(A-Z)','Pinyin')">
                                按名称(A-Z)
                            </a-menu-item>
                            <a-menu-item key="3" @click="choiceSort('按工号','EmployeeId')">
                                按工号
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button>
                        {{sortField.name}}
                        <SortAscendingOutlined />
                    </a-button>
                </a-dropdown>
            </div>
        </div>
        <div class="todoListWrap">
            <div class="leftTree" v-if="isLeft">
                <div>
                    <!-- <a-tabs v-model:activeKey="leftTabCurrent">
                        <a-tab-pane key="1" tab="单位联系人"></a-tab-pane>
                        <a-tab-pane key="2" tab="个人联系人"></a-tab-pane>
                    </a-tabs> -->
                    <div class="switchWrap switchWrap-addressBook" v-if="leftTabCurrent==1">
                        <span class="spaceWrap">
                            <span class="spaceItem" :class="{'active':typeCurrent==0}" @click="handleTab(0)">组织结构</span>
                            <span class="spaceItem" :class="{'active':typeCurrent==1}" @click="handleTab(1)">常用小组</span>
                        </span>
                    </div>
                    <div class="wea-left-tree-search wea-left-tree-search-addressBook">
                        <a-input-search
                        v-model:value="searchTreeVal"
                        placeholder="输入查询"
                        @search="onSearchTree"
                        />
                    </div>
                </div>
                <div class="leftTreeWrap" v-if="leftTabCurrent==1">
                    <a-tree :tree-data="deptTreeData" block-node v-if="typeCurrent==0" @select="onTreeNodeSelect">
                        <template #title="{ text, key }">
                            <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ text }}</span>
                            <template v-else>{{ text }}</template>
                        </template>
                    </a-tree>
                    <a-tree :tree-data="groupList" block-node v-else @select="onTreeNodeSelect">
                        <template #title="{ Name, key }">
                            <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ Name }}</span>
                            <template v-else>{{ Name }}</template>
                        </template>
                    </a-tree>
                </div>
                <div class="personalWrap" v-if="leftTabCurrent==2">
                    <div class="rowMyGroup">
                        <span>我的小组</span>
                        <a-button :icon="h(PlusOutlined)"></a-button>
                    </div>
                </div>
            </div>
            <div class="rightContainer">
                <div class="sanlan" :class="{'active':!isLeft}" @click="handleLeftShow">
                    <!-- <span class="icon">
                        <LeftOutlined v-if="isLeft" />
                        <RightOutlined v-else />
                    </span> -->
                </div>
                <div class="rightTab">
                    <a-tabs v-model:activeKey="activeKey" @change="changeRightTab">
                        <a-tab-pane key="1" tab="全部人员"></a-tab-pane>
                        <a-tab-pane key="2" tab="同部门" v-if="typeCurrent==0"></a-tab-pane>
                        <a-tab-pane key="3" tab="我的下属" v-if="typeCurrent==0"></a-tab-pane>
                        <a-tab-pane key="4" tab="最近联系人" v-if="typeCurrent==0"></a-tab-pane>
                    </a-tabs>
                    <!-- <div class="rWrap" v-if="activeKey==2">
                        <a-button class="ml10">导入</a-button>
                        <a-button class="ml10">导出</a-button>
                        <a-button class="ml10">下载模板</a-button>
                        <a-input-search
                            class="ml10"
                            v-model:value="searchVal"
                            placeholder="请输入关键字"
                            style="width: 150px;"
                            @search="onSearch"
                        />
                        <a-dropdown class="ml10">
                            <template #overlay>
                              <a-menu @click="handleMenuClick">
                                <a-menu-item key="1" @click="choiceSort('全部','')">
                                  全部
                                </a-menu-item>
                                <a-menu-item key="2" @click="choiceSort('按名称(A-Z)','Pinyin')">
                                    按名称(A-Z)
                                </a-menu-item>
                                <a-menu-item key="3" @click="choiceSort('按工号','EmployeeId')">
                                    按工号
                                </a-menu-item>
                              </a-menu>
                            </template>
                            <a-button>
                              {{sortField.name}}
                              <SortAscendingOutlined />
                            </a-button>
                          </a-dropdown>
                    </div> -->
                </div>
                <div class="businessWrapper" v-if="!listData.length">
                    <div class="empty">
                        <img
                        src="/src/assets/img/empty.png"
                        alt=""
                        />
                        <p class="emptyDesc">当前暂无数据</p>
                    </div>
                </div>
                <div class="businessWrapper" v-if="sortField.id=='Pinyin'">
                    <div v-for="(parentItem,parentIdx) in listData" :key="parentIdx">
                        <div class="pinyin">{{parentItem.pinyin.toLocaleUpperCase()}}</div>
                        <div class="businessWrap">
                            <div class="businessCartItem" v-for="(item,index) in parentItem.listData" :key="index">
                                <div class="contactsWrap">
                                    <div class="cartItemHead">
                                        <div class="cartAvatar">
                                            <img :src="item.avatarUrl" @error="handleImageError(item)" />
                                        </div>
                                        <div class="cartInfo">
                                            <div class="name">
                                                {{item.FullName || item.fullName || ''}}
                                                <div class="cardMoreIcon" v-if="leftTab==1 && rightTab==1">
                                                    <i class="iconfont icon-gengduobiaoqian"></i>
                                                    <div class="dropMenuWapper">
                                                        <div class="dropMenu">
                                                            <div class="dropMenuItem" @click="handleEditContacts(item)">
                                                                <span class="name">编辑</span>
                                                            </div>
                                                            <div class="dropMenuItem"
                                                                @click="handleDeleteContacts(item)">
                                                                <span class="name">删除</span>
                                                            </div>
                                                            <div class="dropMenuItem"
                                                                @click="handleContactAddGroup(item)">
                                                                <span class="name">添加组</span>
                                                            </div>
                                                            <div class="dropMenuItem" @click="handleRemoveGroup(item)">
                                                                <span class="name">移出组
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="depart">{{(item.OrganizationIdName||'')}}<br v-if="item.OrganizationIdName" />{{item.BusinessUnitIdName || item.businessUnitIdName || item.ContactGroupIdName || '无'}}</p>
                                            <p class="desc" v-if="item.workStatus">({{item.workStatus || '无'}})</p>
                                        </div>
                                        <div class="more">
                                            <a-dropdown>
                                                <a class="ant-dropdown-link" @click.prevent>
                                                    <MoreOutlined />
                                                </a>
                                                <template #overlay>
                                                    <a-menu>
                                                        <a-menu-item>
                                                            <a href="javascript:void(0);" @click="openSendEmail(item)">发邮件</a>
                                                        </a-menu-item>
                                                    </a-menu>
                                                </template>
                                            </a-dropdown>
                                        </div>
                                    </div>
                                    <div class="minBoxWrap">
                                        <div class="minBox">
                                            <div class="phoneBox">
                                                <span class="label">职务</span>
                                                <br />
                                                <span class="val email">{{item.JobTitle || '无'}}</span>
                                            </div>
                                            <div class="emailBox">
                                                <span class="label">工号</span>
                                                <br />
                                                <span class="val email">{{ item.EmployeeNo || '无' }}</span>
                                            </div>
                                        </div>
                                        <div class="minBox">
                                            <div class="phoneBox">
                                                <span class="label">手机号码</span>
                                                <br />
                                                <span class="val phone">{{item.MobilePhone || item.mobilePhone ||
                                                    '无'}}</span>
                                                <span class="copyBoxWrap"
                                                    v-if="(item.MobilePhone && item.MobilePhone!='')||(item.mobilePhone && item.mobilePhone!='')">
                                                    <div class="copyIconBox">
                                                        <a-popover>
                                                            <template #content>
                                                                <p @click="handleCopy(item)">复制</p>
                                                            </template>
                                                            <CopyOutlined @click="handleCopy(item)" />
                                                        </a-popover>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="emailBox">
                                                <span class="label">邮箱</span>
                                                <br />
                                                <span class="val email">{{item.EMailAddress || item.emailAddress ||
                                                    item.EmailAddress || '无'}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="departWrap" v-else>
                                    <p class="name">{{item.businessUnitIdName || '无'}}</p>
                                    <div class="phoneBox">
                                        <p class="label">部门电话</p>
                                        <span class="phone">{{item.mobilePhone || '无'}}</span>
                                        <span class="copyBoxWrap"
                                            v-if="(item.MobilePhone && item.MobilePhone!='')||(item.mobilePhone && item.mobilePhone!='')">
                                            <span class="copyIconBox">
                                                <i class="iconfont icon-fuzhi" @click="handleCopy(item)"></i>
                                                <div class="child_tips">
                                                    复制
                                                    <div class="popper__arrow"></div>
                                                </div>
                                            </span>
                                        </span>
                                    </div>
                                    <div class="phoneBox">
                                        <p class="label">邮箱</p>
                                        <span class="phone">{{item.internalEMailAddress || '无'}}</span>
                                    </div>
                                    <div class="peoples" v-if="item.deptEmpCount && item.deptEmpCount!=0">
                                        <span
                                            style="border:2px solid #fff;display:inline-block;width:20px;height:20px;overflow:hidden;border-radius:50%;"
                                            :style="{marginLeft:(index==0?0:-6)+'px',left:(index<=5?index:5)*15+'px',zIndex:(6-index)}"
                                            v-for="(item,index) in Number(item.deptEmpCount) <= 5 ? Number(item.deptEmpCount) : 5" :key="index">
                                            <span>
                                                <i class="iconfont icon-morentouxiang"></i>
                                            </span>
                                        </span>
                                        <span class="text">等{{item.deptEmpCount}}人</span>
                                    </div>
                                </div> -->
                            </div>

                            <div class="fake_item"></div>
                            <div class="fake_item"></div>
                        </div>
                    </div>
                </div>
                <div class="businessWrapper" v-else>
                    <div class="businessWrap">
                        <div class="businessCartItem" v-for="(item,index) in listData" :key="index">
                            <div class="contactsWrap">
                                <div class="cartItemHead">
                                    <div class="cartAvatar">
                                        <img :src="item.avatarUrl" @error="handleImageError(item)" />
                                    </div>
                                    <div class="cartInfo">
                                        <div class="name">{{item.FullName || item.fullName || ''}}</div>
                                        <p class="depart">{{(item.OrganizationIdName||'')}}<br v-if="item.OrganizationIdName" />{{item.BusinessUnitIdName || item.businessUnitIdName ||item.ContactGroupIdName || '无'}}</p>
                                    </div>
                                    <div class="more">
                                        <a-dropdown>
                                            <a class="ant-dropdown-link" @click.prevent>
                                                <MoreOutlined />
                                            </a>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item>
                                                        <a href="javascript:void(0);" @click="openSendEmail(item)">发邮件</a>
                                                    </a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </div>
                                </div>
                                <div class="minBoxWrap">
                                    <div class="minBox">
                                        <div class="phoneBox"><span class="label">职务</span> <br> <span
                                                class="val email">{{item.JobTitle || '无'}}</span></div>
                                        <div class="emailBox"><span class="label">工号</span> <br> <span
                                                class="val email">{{ item.EmployeeNo || '无' }}</span></div>
                                    </div>
                                    <div class="minBox">
                                        <div class="phoneBox">
                                            <span class="label">手机号码</span>
                                            <br>
                                            <span class="val phone">{{item.MobilePhone || item.mobilePhone ||
                                                '无'}}</span>
                                            <span class="copyBoxWrap"
                                                v-if="(item.MobilePhone && item.MobilePhone!='')||(item.mobilePhone && item.mobilePhone!='')">
                                                <div class="copyIconBox">
                                                    <a-popover>
                                                        <template #content>
                                                            <p @click="handleCopy(item)">复制</p>
                                                        </template>
                                                        <CopyOutlined @click="handleCopy(item)" />
                                                    </a-popover>
                                                </div>
                                            </span>
                                        </div>
                                        <div class="emailBox">
                                            <span class="label">邮箱</span>
                                            <br>
                                            <span class="val email">{{item.EMailAddress || item.emailAddress ||
                                                item.EmailAddress || '无'}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="departWrap" v-else>
                                <p class="name">{{item.businessUnitIdName || '无'}}</p>
                                <div class="phoneBox">
                                    <p class="label">部门电话</p>
                                    <span class="phone">{{item.mobilePhone || '无'}}</span>
                                    <span class="copyBoxWrap"
                                        v-if="(item.MobilePhone && item.MobilePhone!='')||(item.mobilePhone && item.mobilePhone!='')">
                                        <div class="copyIconBox">
                                            <a-popover>
                                                <template #content>
                                                    <p @click="handleCopy(item)">复制</p>
                                                </template>
                                                <CopyOutlined @click="handleCopy(item)" />
                                            </a-popover>
                                        </div>
                                    </span>
                                </div>
                                <div class="phoneBox">
                                    <p class="label">邮箱</p>
                                    <span class="phone">{{item.internalEMailAddress || '无'}}</span>
                                </div>
                                <div class="peoples" v-if="item.deptEmpCount && item.deptEmpCount!=0">
                                    <span
                                        style="border:2px solid #fff;display:inline-block;width:20px;height:20px;overflow:hidden;border-radius:50%;"
                                        :style="{marginLeft:(index==0?0:-6)+'px',left:(index<=5?index:5)*15+'px',zIndex:(6-index)}"
                                        v-for="(item,index) in Number(item.deptEmpCount) <= 5 ? Number(item.deptEmpCount) : 5" :key="index">
                                        <span>
                                            <i class="iconfont icon-morentouxiang"></i>
                                        </span>
                                    </span>
                                    <span class="text">等{{item.deptEmpCount}}人</span>
                                </div>
                            </div> -->
                        </div>
                        <div class="fake_item"></div>
                        <div class="fake_item"></div>
                    </div>
                    <div class="paginationWrap">
                        <a-pagination v-model:current="pageNumber" :total="total" show-less-items :defaultPageSize="12" @change="changePagination" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, h
    } from "vue";
    import "@/style/common.less";
    import { SearchOutlined, MoreOutlined, CopyOutlined, SortAscendingOutlined, LeftOutlined, RightOutlined, PlusOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { formTreeData } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    import { useRouter, useRoute } from "vue-router";
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
        activeKey: "1",
        deptTreeData:[],
        deptTreeDataAll:[],
        pageNumber: 1,
        pageSize: 12,
        listData: [],
        searchVal: "",
        total: 0,
        leftTabCurrent: "1",
        typeCurrent: 0,
        groupList: [],
        groupListAll:[],
        isLeft: true,
        sortField: {
            id: '',
            name: '全部'
        },
        treeId:'',
        searchTreeVal:'',
        BusinessUnitId:'',
        currentUserId:''
    })
    const { currentUserId,BusinessUnitId,activeKey, deptTreeData, pageNumber, pageSize, listData,
        searchVal, total, leftTabCurrent, typeCurrent, groupList, isLeft, sortField,treeId,searchTreeVal,deptTreeDataAll,groupListAll} = toRefs(data);
    const choiceSort = (name, id) => {
        data.sortField = {
            name,
            id
        }
        data.pageNumber=1;
        getQuery();
    }
    watch(leftTabCurrent, (newVal, oldVal) => {
        //console.log(newVal)
        data.activeKey = '1';
        data.pageNumber=1;
        getQuery();
    })
    const handleLeftShow = () => {
        data.isLeft = !data.isLeft;
    }
    const handleTab = (e) => {
        data.typeCurrent = e;
        if (e == 0) {
            getDeptTreeData();
        } else {
            getGroupList();
        }
        data.treeId='';
        data.activeKey = '1';
        data.pageNumber=1;
        getQuery();
    }
    //处理树
    const formTree = (list) => {
        list.forEach(item=>{
            if(item.children){
            formTree(item.children);
            }
            item.children=[];
            item.id=item.businessUnitId;
            item.key=item.businessUnitId;
            item.text=item.name;
        })
        return list
    }
    // 组织结构
    const getDeptTreeData = () => {
        proxy.$get(Interface.deptTree, {
            //entity: "organizationtree"
        }).then(res => {
            let list=[];
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                list=res.actions[0].returnValue;
            }else{return false}
            list=formTree(list);   
            data.deptTreeData = formTreeData(list, 'businessUnitId', 'parentBusinessUnitId');
            data.deptTreeDataAll = list;
            //console.log("deptTreeData", data.deptTreeData);
        })
    }
    getDeptTreeData();

    const getGroupList = () => {
        let filterQuery='\nIsPublic\teq\ttrue';
        let d = {
            filterId: "",
            objectTypeCode:'9',
            entityName:'Group',
            filterQuery: filterQuery,
            search:'',
            page: 1,
            rows: 100,
            displayColumns:'Name'
        };
        proxy.$post(Interface.list2, d).then(res=>{
            let nodes = res.nodes;
            let list=[];
            list = nodes.map(item=>{
                item.Name = item.Name&&item.Name.textValue?item.Name.textValue:'';
                item.text = item.Name;
                item.GroupId = item.id;
                return item;
            });
            data.groupList=list;
            data.groupListAll=list;
        })
    }
    const onSearch = (e) => {
        data.pageNumber=1;
        getQuery();
    }
    const onSearchTree = (e) => {
        if(data.typeCurrent==0){
            let list = data.deptTreeDataAll.filter(item=>{
                return item.text.indexOf(data.searchTreeVal) !== -1;
            })
            list=formTree(list);
            data.deptTreeData = formTreeData(list, 'businessUnitId', 'parentBusinessUnitId');
        }
        else{
            data.groupList = data.groupListAll.filter(item=>{
                return item.Name.indexOf(data.searchTreeVal) !== -1;
            })
        }
    }
    const changePagination = (e) => {
        getQuery();
    };
    const onTreeNodeSelect= (value, option) => {
        if(data.typeCurrent==0){
            data.treeId=option.node.id;
        }
        else{
            data.treeId=option.node.GroupId;
        }
        onSearch();
    };
    // 右侧tab
    const changeRightTab = (e) => {
        data.pageNumber=1;
        getQuery();
    }
    
    // 获取数据
    const getQuery = () => {
        let filterQuery='';
        let url=Interface.list2;
        let d={
            filterId:'',
            objectTypeCode:'8',
            entityName:'SystemUser',
            filterQuery:filterQuery,
            search:data.searchVal||'',
            page: data.pageNumber,
            rows: data.pageSize,
            sort:data.sortField.id,
            order:'ASC',
            displayColumns:'FullName,PhotoUrl,BusinessUnitId,WorkStatus,JobTitle,EmployeeId,MobilePhone,InternalEMailAddress,OwningUser'
        }
        if(data.typeCurrent==0){
            //左侧部门tab
            if(data.treeId){
                d.filterQuery='\nBusinessUnitId\teq\t'+data.treeId;
            }
            if(data.activeKey*1==1){
                //全部
                //url=Interface.user.allUser;
            }else if(data.activeKey*1==2){
                //同部门
                //url=Interface.user.allUser;
                //d.filterQuery='\nBusinessUnitId\teq-businessunitid';
                d.filterQuery='\nBusinessUnitId\teq\t'+data.BusinessUnitId;
            }else if(data.activeKey*1==3){
                d = {
                    filterQuery:filterQuery,
                    search:data.searchVal||'',
                    page: data.pageNumber,
                    rows: data.pageSize,
                    sort:data.sortField.id,
                    order:'ASC',
                }
                //我的下属
                url=Interface.user.getSubordinates;
            }else if(data.activeKey*1==4){
                d = {
                    filterQuery:filterQuery,
                    search:data.searchVal||'',
                    page: data.pageNumber,
                    rows: data.pageSize,
                    sort:data.sortField.id,
                    order:'ASC',
                }
                //最近联系人
                url=Interface.user.getLatestUsers;
            }
        }
        else{
            d = {
                filterQuery:filterQuery,
                search:data.searchVal||'',
                page: data.pageNumber,
                rows: data.pageSize,
                sort:data.sortField.id,
                order:'ASC',
            }
            //左侧小组tab
            if(data.treeId){
                d.filterQuery='\nGroupId\teq\t'+data.treeId;
            }
            //获取小组成员
            url=Interface.user.getGroupUsers;
        }
        data.listData=[];
        proxy.$post(url,d).then(res => {
            let list = [];
            let list2 = [];
            if(res){
                if(url!=Interface.list2&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                    data.total = res.actions[0].returnValue.length||0;
                    for (var i = 0; i < res.actions[0].returnValue.length; i++) {
                        var item = res.actions[0].returnValue[i];
                        item.FullName=item.FullName||'';
                        item.PhotoUrl=item.avatarUrl||'';
                        item.BusinessUnitIdName=item.businessUnitIdName||'';
                        item.workStatus=item.WorkStatus||'';
                        item.JobTitle=item.jobTitle||'';
                        item.EmployeeNo=item.EmployeeId||'';
                        item.MobilePhone=item.MobilePhone||'';
                        item.EMailAddress=item.EMailAddress||'';
                        item.OrganizationIdName=item.organizationIdName||'';
                        item.pinyin=item.Pinyin||'';
                        item.id=item.UserId||'';
                        item.avatarUrl=Interface.pathUrl+':9091/api/one/user/avatar/'+item.id;
                        var isPinyin = list2.some(function (v) {
                            if(item.pinyin){
                                return v.pinyin == (item.pinyin.textValue).slice(0, 1)
                            }
                        })
                        if (!isPinyin) {
                            list2.push({
                                pinyin: item.pinyin?(item.pinyin.textValue).slice(0, 1):'',
                                listData: []
                            });
                        }
                        for (var j = 0; j < list2.length; j++) {
                            var row = list2[j];
                            if (item.pinyin&&row.pinyin == (item.pinyin.textValue).slice(0, 1)) {
                                row.listData.push(item);
                            }
                        }
                        list.push(item)
                    }
                    if (data.sortField.id == 'Pinyin') {
                        data.listData = list2;
                    }else{
                        data.listData = list;
                    }
                }
                else if(res.nodes){
                    data.listData = res.nodes;
                    data.total = res.pageInfo?res.pageInfo.total:0;
                    let list = [];
                    for (var i = 0; i < res.nodes.length; i++) {
                        var item = res.nodes[i];
                        item.FullName=item.FullName?item.FullName.textValue:(item.fullName?item.fullName.textValue:'');
                        item.PhotoUrl=item.PhotoUrl?item.PhotoUrl.textValue:(item.Avatar?item.Avatar.textValue:'');
                        item.BusinessUnitIdName=item.BusinessUnitId?item.BusinessUnitId.lookupValue.displayName:'';
                        item.workStatus=item.WorkStatus?item.WorkStatus.name:'';
                        item.JobTitle=item.JobTitle?item.JobTitle.textValue:'';
                        item.EmployeeNo=item.EmployeeId?item.EmployeeId.textValue:'';
                        item.MobilePhone=item.MobilePhone?item.MobilePhone.textValue:(item.mobilePhone?item.mobilePhone.textValue:'');
                        item.EMailAddress=item.EMailAddress?item.EMailAddress.textValue:(item.InternalEMailAddress?item.InternalEMailAddress.textValue:'');
                        item.pinyin=item.Pinyin?item.Pinyin.textValue:'';
                        item.avatarUrl=Interface.pathUrl+':9091/api/one/user/avatar/'+item.id;
                        var isPinyin = list.some(function (v) {
                            if(item.pinyin){
                                return v.pinyin == (item.pinyin.textValue).slice(0, 1)
                            }
                        })
                        if (!isPinyin) {
                            list.push({
                                pinyin: item.pinyin?(item.pinyin.textValue).slice(0, 1):'',
                                listData: []
                            });
                        }
                        for (var j = 0; j < list.length; j++) {
                            var row = list[j];
                            if (item.pinyin&&row.pinyin == (item.pinyin.textValue).slice(0, 1)) {
                                row.listData.push(item);
                            }
                        }
                    }
                    if (data.sortField.id == 'Pinyin') {
                        data.listData = list;
                    }
                }
            }
        })
    }
    getQuery();

    // 复制
    const handleCopy = (item) => {
        onCopy(item.MobilePhone || item.mobilePhone || '')
    }
    const onCopy = (e) => {
        const input = document.createElement("input");
        document.body.appendChild(input);
        input.setAttribute("value", e);
        input.select();
        if (document.execCommand("copy")) {
            document.execCommand("copy")
            message.success("复制成功！");
        }
        document.body.removeChild(input);
    }

    const handleMenuClick = (e) => {
        console.log("e", e);
    }
    //发送邮件
    const openSendEmail= (item) => {
        let url = router.resolve({
            path:'/email',
            name: "Email",
            query: {
                Id:item.id,
                Name:item.FullName,
                type:1
            },
        });
        window.open(url.href);
    };
    const handleImageError=(item)=>{
        item.avatarUrl='/src/assets/img/avatar.png';
        return item;
    };
    onMounted(() => {
        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            data.currentUserId=userInfo.userId;
            data.BusinessUnitId=userInfo.businessUnitId;
        }
    })
</script>
<style lang="less" scoped>
    @import "@/style/addressBook.less";
    .switchWrap-addressBook{
        margin-top: 10px !important;
    }
    .addressBook .todoListWrap .leftTree .leftTreeWrap{
        height: calc(~"100% - 100px") !important;
    }
    .wea-left-tree-search-addressBook{
        margin-top: 5px !important;
    }
    .addressBook :deep .ant-tree-title{
        white-space: nowrap !important;
    }
    .addressBook :deep .ant-input{
        border-color: #d9d9d9 !important;
    }
    .businessWrap .businessCartItem .cartItemHead .cartInfo .depart{
        font-size: 13px;
        position: relative;
        top: 3px;
    }
    .addressBook{
        .empty {
            background: #fff;
            padding: 0px 0 30px;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                width: 130px;
            }
            .emptyDesc{
                color: #333;
            }
        }
    }
    .cartAvatar{
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>