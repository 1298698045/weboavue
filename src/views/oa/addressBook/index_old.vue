<template>
    <div class="addressBook">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #893D86;">
                    <img :src="require('@/assets/img/rightMenu/tongxunlu1.png')" alt="">
                </div>
                <span class="headerTitle">通讯录</span>
            </div>
            <div class="headerRight" v-if="activeKey=='1'">
                <a-button class="ml10">导入</a-button>
                <a-button class="ml10">导出</a-button>
                <a-button class="ml10">下载模板</a-button>
                <a-input-search class="ml10" v-model:value="searchVal" placeholder="请输入关键字" style="width: 150px;"
                    @search="onSearch" />
                <a-dropdown class="ml10">
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="1" @click="choiceSort('全部','')">
                                全部
                            </a-menu-item>
                            <a-menu-item key="2" @click="choiceSort('按名称(A-Z)','FullName')">
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
                    <a-tabs v-model:activeKey="leftTabCurrent">
                        <a-tab-pane key="1" tab="单位联系人"></a-tab-pane>
                        <a-tab-pane key="2" tab="个人联系人"></a-tab-pane>
                    </a-tabs>
                    <div class="switchWrap" v-if="leftTabCurrent==1">
                        <span class="spaceWrap">
                            <span class="spaceItem" :class="{'active':typeCurrent==0}" @click="handleTab(0)">组织结构</span>
                            <span class="spaceItem" :class="{'active':typeCurrent==1}" @click="handleTab(1)">常用小组</span>
                        </span>
                    </div>
                </div>
                <div class="leftTreeWrap" v-if="leftTabCurrent==1">
                    <a-tree :tree-data="deptTreeData" block-node v-if="typeCurrent==0">
                        <template #title="{ text, key }">
                            <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ text }}</span>
                            <template v-else>{{ text }}</template>
                        </template>
                    </a-tree>
                    <a-tree :tree-data="groupList" block-node v-else>
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
                        <a-tab-pane key="2" tab="同部门"></a-tab-pane>
                        <a-tab-pane key="3" tab="我的下属"></a-tab-pane>
                        <a-tab-pane key="4" tab="最近联系人"></a-tab-pane>
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
                                <div class="contactsWrap"
                                    v-if="item.employeeId && item.employeeId!='' || item.SystemUserId || item.Id">
                                    <div class="cartItemHead">
                                        <div class="cartAvatar">
                                            <img v-if="item.PhotoUrl || item.photoUrl || item.Avatar"
                                                :src="item.PhotoUrl || item.photoUrl || item.Avatar" />
                                            <i v-else class="iconfont icon-morentouxiang"></i>
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
                                                            <a href="javascript:;">发邮件</a>
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
                                <div class="departWrap" v-else>
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
                                </div>
                            </div>

                            <div class="fake_item"></div>
                            <div class="fake_item"></div>
                        </div>
                    </div>
                </div>
                <div class="businessWrapper" v-else>
                    <div class="businessWrap">
                        <div class="businessCartItem" v-for="(item,index) in listData" :key="index">
                            <div class="contactsWrap"
                                v-if="item.employeeId && item.employeeId!='' || item.SystemUserId || item.Id">
                                <div class="cartItemHead">
                                    <div class="cartAvatar">
                                        <img class="img" :src="require('@/assets/img/avatar.png')" alt="">
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
                                                        <a href="javascript:;">发邮件</a>
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
                            <div class="departWrap" v-else>
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
                            </div>
                        </div>
                        <div class="fake_item"></div>
                        <div class="fake_item"></div>
                    </div>
                    <div class="paginationWrap">
                        <a-pagination v-model:current="pageNumber" :total="total" show-less-items />
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
    const { proxy } = getCurrentInstance();
    const data = reactive({
        activeKey: "1",
        deptTreeData: [],
        pageNumber: 1,
        pageSize: 12,
        listData: [],
        searchVal: "",
        total: 0,
        leftTabCurrent: "1",
        typeCurrent: 0,
        groupList: [],
        isLeft: true,
        sortField: {
            id: 'EmployeeId',
            name: '全部'
        }
    })
    const { activeKey, deptTreeData, pageNumber, pageSize, listData,
        searchVal, total, leftTabCurrent, typeCurrent, groupList, isLeft, sortField } = toRefs(data);
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
            console.log("deptTreeData", data.deptTreeData);
        })
    }
    getDeptTreeData();

    const getGroupList = () => {
        proxy.$get(Interface.user.groupList, {
        }).then(res => {
            data.groupList = res.listData;
        })
    }
    const onSearch = (e) => {

    }
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
        proxy.$get(Interface.addressBook.addresslist, {
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            sortField: data.sortField.id
        }).then(res => {
            data.listData = res.listData;
            data.total = res.Rows;
            var list = [];
            for (var i = 0; i < res.listData.length; i++) {
                var item = res.listData[i];
                var isPinyin = list.some(function (v) {
                    return v.pinyin == item.pinyin.slice(0, 1)
                })
                if (!isPinyin) {
                    list.push({
                        pinyin: item.pinyin.slice(0, 1),
                        listData: []
                    });
                }
                for (var j = 0; j < list.length; j++) {
                    var row = list[j];
                    if (row.pinyin == item.pinyin.slice(0, 1)) {
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
</script>
<style lang="less" scoped>
    @import "@/style/addressBook.less";
</style>