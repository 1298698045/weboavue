<template>
    <div class="addressBook">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #893D86;">
                    <img :src="require('@/assets/img/rightMenu/fanbenfenlei.png')" alt="">
                </div>
                <span class="headerTitle">部门通讯录</span>
            </div>
            <div class="headerRight" v-if="activeKey=='1'">
                <!-- <a-button class="ml10">导入</a-button>
                <a-button class="ml10">导出</a-button>
                <a-button class="ml10">下载模板</a-button> -->
                <a-button class="ml10" type="primary" @click="handleNew">新建</a-button>
                <a-input-search class="ml10" v-model:value="searchVal" placeholder="请输入关键字" style="width: 150px;"
                    @search="onSearch" />
                <a-dropdown class="ml10">
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="1" @click="choiceSort('全部','DisplayOrder')">
                                全部
                            </a-menu-item>
                            <a-menu-item key="2" @click="choiceSort('按名称(A-Z)','Pinyin')">
                                按名称(A-Z)
                            </a-menu-item>
                            <a-menu-item key="3" @click="choiceSort('按编号','BusinessUnitId')">
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
                                        <div class="cartInfo">
                                            <div class="name">
                                                {{item.BusinessUnitIdName}}
                                            </div>
                                            <p class="depart"></p>
                                        </div>
                                        <div class="more">
                                            <a-dropdown>
                                                <a class="ant-dropdown-link" @click.prevent>
                                                    <MoreOutlined />
                                                </a>
                                                <template #overlay>
                                                    <a-menu>
                                                        <!-- <a-menu-item>
                                                            <a href="javascript:void(0);" @click="openSendEmail(item)">发邮件</a>
                                                        </a-menu-item> -->
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
                                                            <span class="label">电话号码一</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone1 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone1 && item.TelPhone1!='')||(item.TelPhone1 && item.TelPhone1!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone1)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div class="emailBox">
                                                            <span class="label">电话号码三</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone3 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone3 && item.TelPhone3!='')||(item.TelPhone3 && item.TelPhone3!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone3)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div class="emailBox">
                                                            <span class="label">电话号码五</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone5 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone5 && item.TelPhone5!='')||(item.TelPhone5 && item.TelPhone5!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone5)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="minBox">
                                                        <div class="phoneBox">
                                                            <span class="label">电话号码二</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone2 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone2 && item.TelPhone2!='')||(item.TelPhone2 && item.TelPhone2!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone2)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div class="emailBox">
                                                           <span class="label">电话号码四</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone4 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone4 && item.TelPhone4!='')||(item.TelPhone4 && item.TelPhone4!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone4)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div class="emailBox">
                                                           <span class="label">电话号码六</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone6 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone6 && item.TelPhone6!='')||(item.TelPhone6 && item.TelPhone6!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone6)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
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
                                    <div class="cartInfo">
                                        <div class="name">{{item.BusinessUnitIdName}}</div>
                                        <p class="depart"></p>
                                    </div>
                                    <div class="more">
                                        <a-dropdown>
                                            <a class="ant-dropdown-link" @click.prevent>
                                                <MoreOutlined />
                                            </a>
                                            <template #overlay>
                                                <a-menu>
                                                    <!-- <a-menu-item>
                                                        <a href="javascript:void(0);" @click="openSendEmail(item)">发邮件</a>
                                                    </a-menu-item> -->
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
                                                            <span class="label">电话号码一</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone1 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone1 && item.TelPhone1!='')||(item.TelPhone1 && item.TelPhone1!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone1)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div class="emailBox">
                                                            <span class="label">电话号码三</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone3 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone3 && item.TelPhone3!='')||(item.TelPhone3 && item.TelPhone3!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone3)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div class="emailBox">
                                                            <span class="label">电话号码五</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone5 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone5 && item.TelPhone5!='')||(item.TelPhone5 && item.TelPhone5!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone5)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="minBox">
                                                        <div class="phoneBox">
                                                            <span class="label">电话号码二</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone2 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone2 && item.TelPhone2!='')||(item.TelPhone2 && item.TelPhone2!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone2)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div class="emailBox">
                                                           <span class="label">电话号码四</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone4 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone4 && item.TelPhone4!='')||(item.TelPhone4 && item.TelPhone4!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone4)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div class="emailBox">
                                                           <span class="label">电话号码六</span>
                                                            <br />
                                                            <span class="val phone">{{item.TelPhone6 || '无'}}</span>
                                                            <span class="copyBoxWrap" v-if="(item.TelPhone6 && item.TelPhone6!='')||(item.TelPhone6 && item.TelPhone6!='')">
                                                                <span class="copyIconBox">
                                                                    <i class="iconfont icon-fuzhi" @click="handleCopy(item.TelPhone6)"></i>
                                                                    <div class="child_tips">
                                                                        复制
                                                                        <div class="popper__arrow"></div>
                                                                    </div>
                                                                </span>
                                                            </span>
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
        <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="onSearch" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal>
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
    import { formTreeData,girdFormatterValue } from "@/utils/common.js";
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
        typeCurrent: 0,
        groupList: [],
        groupListAll:[],
        isLeft: true,
        sortField: {
            id: 'DisplayOrder',
            name: '全部'
        },
        treeId:'',
        searchTreeVal:'',
        isCommon: false,
        recordId:'',
        objectTypeCode:'83',
        sObjectName:'BusinessUnitPhone',
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
        proxy.$get(Interface.user.groupList, {
        }).then(res => {
            data.groupList = res.listData;
            data.groupListAll = res.listData;
        })
    }
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
    //data.listData=[{BusinessUnitIdName:'666',Location1:1,TelPhone1:1,Location2:1,TelPhone2:1,Location3:1,TelPhone3:1,Location4:1,TelPhone4:1,Location5:1,TelPhone5:1,Location6:1,TelPhone6:1}]
    //getLastList();
    const getQuery = () => {
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
            sort:data.sortField.id,
            order:'ASC',
            displayColumns:'BusinessUnitId,Location1,TelPhone1,Location2,TelPhone2,Location3,TelPhone3,Location4,TelPhone4,Location5,TelPhone5,Location6,TelPhone6,OwningUser'
        }).then(res => {
            data.listData = res.nodes;
            data.total = res.pageInfo?res.pageInfo.total:0;
            var list = [];
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                 item.BusinessUnitIdName=item.BusinessUnitId?(item.BusinessUnitId.lookupValue.displayName||'无'):'';
                // item.Location1=item.Location1?item.Location1.textValue:'';
                // item.TelPhone1=item.TelPhone1?item.TelPhone1.textValue:'';
                // item.Location2=item.Location2?item.Location2.textValue:'';
                // item.TelPhone2=item.TelPhone2?item.TelPhone2.textValue:'';
                // item.Location3=item.Location3?item.Location3.textValue:'';
                // item.TelPhone3=item.TelPhone3?item.TelPhone3.textValue:'';
                // item.Location4=item.Location4?item.Location4.textValue:'';
                // item.TelPhone4=item.TelPhone4?item.TelPhone4.textValue:'';
                // item.Location5=item.Location5?item.Location5.textValue:'';
                // item.TelPhone5=item.TelPhone5?item.TelPhone5.textValue:'';
                // item.Location6=item.Location6?item.Location6.textValue:'';
                // item.TelPhone6=item.TelPhone6?item.TelPhone6.textValue:'';
                 item.pinyin=item.Pinyin?item.Pinyin.textValue:'';
                for(var cell in item){
                    if(cell!='BusinessUnitIdName'&&cell!='pinyin'&&cell!='id'&&cell!='nameField'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                }
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
      //console.log(key,2222222)
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
        // let url = router.resolve({
        //     path:'/email/write',
        //     name: "WriteEmail",
        //     query: {
        //         Id:item.id,
        //         Name:item.BusinessUnitIdName,
        //         type:2
        //     },
        // });
        let url = router.resolve({
            path:'/email',
            name: "Email",
            query: {
                Id:item.id,
                Name:item.BusinessUnitIdName,
                type:2
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
    .businessWrap .businessCartItem .phoneBox{
        margin-top: 15px !important;
    }
    .addressBook :deep .ant-input{
        border-color: #d9d9d9 !important;
    }
</style>