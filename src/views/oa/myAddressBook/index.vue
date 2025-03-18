<template>
    <div class="addressBook">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #893D86;">
                    <img :src="require('@/assets/img/rightMenu/daibanshiwu.png')" alt="">
                </div>
                <span class="headerTitle">个人通讯录</span>
            </div>
            <div class="headerRight" v-if="activeKey=='1'">
                <!-- 
                <a-button class="ml10">导出</a-button>
                <a-button class="ml10">下载模板</a-button> -->
                <!-- <a-button class="ml10">导入</a-button> -->
                <a-button class="ml10" type="primary" @click="handleNew">新建</a-button>
                <a-input-search class="ml10" v-model:value="searchVal" placeholder="请输入关键字" style="width: 150px;"
                    @search="onSearch" />
                <a-dropdown class="ml10">
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="1" @click="choiceSort('全部','')">
                                全部
                            </a-menu-item>
                            <a-menu-item key="2" @click="choiceSort('按姓名(A-Z)','FullName')">
                                按名称(A-Z)
                            </a-menu-item>
                            <a-menu-item key="3" @click="choiceSort('按编号','EmployeeId')">
                                按编号
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
                    <!-- <div class="switchWrap switchWrap-addressBook" v-if="leftTabCurrent==1">
                        <span class="spaceWrap">
                            <span class="spaceItem" :class="{'active':typeCurrent==0}" @click="handleTab(0)">组织结构</span>
                            <span class="spaceItem" :class="{'active':typeCurrent==1}" @click="handleTab(1)">常用小组</span>
                        </span>
                    </div> -->
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
                    <a-tree :tree-data="groupList" block-node v-if="typeCurrent==1" @select="onTreeNodeSelect">
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
                        <a-tab-pane key="1" tab="全部"></a-tab-pane>
                        <!-- <a-tab-pane key="2" tab="同部门"></a-tab-pane>
                        <a-tab-pane key="3" tab="我的下属"></a-tab-pane>
                        <a-tab-pane key="4" tab="最近联系人"></a-tab-pane> -->
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
                <div class="businessWrapper" v-if="sortField.id=='Pinyin'">
                    <div v-for="(parentItem,parentIdx) in listData" :key="parentIdx">
                        <div class="pinyin">{{parentItem.pinyin.toLocaleUpperCase()}}</div>
                        <div class="businessWrap">
                            <div class="businessCartItem" v-for="(item,index) in parentItem.listData" :key="index">
                                <div class="contactsWrap">
                                    <div class="cartItemHead">
                                        <div class="cartAvatar">
                                            <img v-if="item.AvatarUrl&&item.AvatarUrl.value"
                                                :src="Interface.pathUrl+item.AvatarUrl.value" />
                                            <img v-else src="/src/assets/img/avatar.png" />
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
                                            <p class="depart">{{item.BusinessUnitIdName || item.businessUnitIdName ||
                                                item.ContactGroupIdName || '无'}}</p>
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
                                                        <a-menu-item>
                                                            <a href="javascript:void(0);" @click="handleEdit(item.id)">编辑</a>
                                                        </a-menu-item>
                                                        <a-menu-item>
                                                            <a href="javascript:void(0);" @click="handleDelete(item.id)">删除</a>
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
                                        <img v-if="item.AvatarUrl&&item.AvatarUrl.value"
                                                :src="Interface.pathUrl+item.AvatarUrl.value" />
                                            <img v-else src="/src/assets/img/avatar.png" />
                                    </div>
                                    <div class="cartInfo">
                                        <div class="name">{{item.FullName || item.fullName || ''}}</div>
                                        <p class="depart">{{item.BusinessUnitIdName || item.businessUnitIdName ||
                                            item.ContactGroupIdName || '无'}}</p>
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
                                                    <a-menu-item>
                                                        <a href="javascript:void(0);" @click="handleEdit(item.id)">编辑</a>
                                                    </a-menu-item>
                                                    <a-menu-item>
                                                        <a href="javascript:void(0);" @click="handleDelete(item.id)">删除</a>
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
        <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @success="onSearch" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal>
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
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
    import CommonFormModal from "@/components/listView/CommonFormModal.vue";
    import Delete from "@/components/listView/Delete.vue";
    import { useRouter, useRoute } from "vue-router";
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
        activeKey: "1",
        deptTreeData:[],
        deptTreeDataAll:[],
        pageNumber: 1,
        pageSize: 20,
        listData: [],
        searchVal: "",
        total: 0,
        leftTabCurrent: "1",
        typeCurrent: 1,
        groupList: [],
        groupListAll:[],
        isLeft: true,
        sortField: {
            id: '',
            name: '全部'
        },
        treeId:'',
        searchTreeVal:'',
        isCommon: false,
        recordId:'',
        objectTypeCode:'2',
        sObjectName:'Contact',
        isDelete: false,
        deleteDesc: '确定要删除吗？',
        external:false
    })
    const { activeKey, deptTreeData, pageNumber, pageSize, listData,
        searchVal, total, leftTabCurrent, typeCurrent, groupList, isLeft, sortField,treeId,searchTreeVal,deptTreeDataAll,groupListAll,isCommon,recordId,objectTypeCode,sObjectName,isDelete,deleteDesc,external} = toRefs(data);
    const choiceSort = (name, id) => {
        data.sortField = {
            name,
            id
        }
        getQuery();
    }
    watch(leftTabCurrent, (newVal, oldVal) => {
        console.log(newVal)
        data.activeKey = '1';
        getQuery();
        // if (newVal == 2) {
        //     getQuery();
        // } else {
        //     getLastList();
        // }
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
    }
    // 组织结构
    const getDeptTreeData = () => {
        proxy.$get(Interface.treeList, {
            entity: "organizationtree"
        }).then(res => {
            let list = res.rows;
            data.deptTreeData = formTreeData(list, 'id', 'pid');
            data.deptTreeDataAll = list;
            //console.log("deptTreeData", data.deptTreeData);
        })
    }
    //getDeptTreeData();

    const getGroupList = () => {
        // proxy.$get(Interface.user.groupList, {
        // }).then(res => {
        //     data.groupList = res.listData;
        //     data.groupListAll = res.listData;
        // })
        let filterQuery='';
        let d = {
            filterId: "",
            objectTypeCode:'7021',
            entityName:'ContactGroup',
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
    getGroupList();
    const onSearch = (e) => {
        if (data.activeKey == 4) {
            getLastList();
        } else {
            getQuery();
        }
    }
    const onSearchTree = (e) => {
        if(data.typeCurrent==0){
            let list = data.deptTreeDataAll.filter(item=>{
                return item.text.indexOf(data.searchTreeVal) !== -1;
            })
            data.deptTreeData = formTreeData(list, 'id', 'pid');
        }
        else{
            data.groupList = data.groupListAll.filter(item=>{
                return item.Name.indexOf(data.searchTreeVal) !== -1;
            })
        }
    }
    const changePagination = (e) => {
        onSearch();
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
        if (e == 4) {
            getLastList();
        } else {
            getQuery();
        }
    }
    // 最近联系人
    const getLastList = () => {
        proxy.$get(Interface.addressBook.lastList, {
            pageNumber: data.pageNumber,
            pageSize: data.pageSize
        }).then(res => {
            data.listData = res.listData;
            data.total = res.rowsPerPage;
        })
    }
    //getLastList();
    const getQuery = () => {
        //let filterQuery='\nAccountId\teq-userid';
        let filterQuery='';
        if(data.typeCurrent==0&&data.treeId){
            filterQuery+='\nBusinessUnitId\teq\t'+data.treeId;
        }
        else if(data.treeId){
            filterQuery+='\nContactGroupId\teq\t'+data.treeId;
        }
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:data.objectTypeCode,
            entityName:data.sObjectName,
            filterQuery:filterQuery,
            search:data.searchVal||'',
            page: data.pageNumber,
            rows: data.pageSize,
            sort: data.sortField.id||'',
            order:'ASC',
            displayColumns:'FullName,PhotoUrl,Department,WorkStatus,JobTitle,EmployeeNo,MobilePhone,EMailAddress1,OwningUser'
        }).then(res => {
            data.listData = res.nodes;
            data.total = res.pageInfo?res.pageInfo.total:0;
            var list = [];
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                item.FullName=item.FullName?item.FullName.textValue:(item.fullName?item.fullName.textValue:'');
                item.PhotoUrl=item.PhotoUrl?item.PhotoUrl.textValue:(item.photoUrl?item.photoUrl.textValue:(item.Avatar?item.Avatar.textValue:''));
                item.BusinessUnitIdName=item.Department?item.Department.textValue:'';
                item.workStatus=item.WorkStatus?item.WorkStatus.textValue:'';
                item.JobTitle=item.JobTitle?item.JobTitle.textValue:'';
                item.EmployeeNo=item.EmployeeNo?item.EmployeeNo.textValue:'';
                item.MobilePhone=item.MobilePhone?item.MobilePhone.textValue:(item.Telephone1?item.Telephone1.textValue:'');
                item.EMailAddress=item.EMailAddress1?item.EMailAddress1.textValue:(item.EMailAddress?item.EMailAddress.textValue:'');
                item.pinyin=item.Pinyin?item.Pinyin.textValue:'';
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
    //新建
    const handleNew = (e) => {
      data.recordId='';
      data.isCommon = true;
    }
    //编辑
    const handleEdit = (key) => {
      console.log(key,2222222)
      data.recordId=key;
      data.isCommon = true;
    }
    // 通用弹窗关闭
    const handleCommonCancel = (params) => {
        data.isCommon=false;
    };
    //删除
    const handleDelete = (key) => {
        data.recordId=key;
        data.isDelete = true;
    }
    //删除关闭
    const cancelDelete = (e) => {
        data.isDelete = false;
    };
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
</script>
<style lang="less" scoped>
    @import "@/style/addressBook.less";
    .switchWrap-addressBook{
        margin-top: 10px !important;
    }
    .addressBook .todoListWrap .leftTree .leftTreeWrap{
        height: calc(~"100% - 50px") !important;
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
    .cartAvatar{
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>