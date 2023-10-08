<template>
    <div class="wrapper">
        <div class="headerTop">
            <div class="leftAll">
                <div class="menuImg">
                    <img class="img" :src="require('@/assets/task_120.png')" alt="">
                </div>
                <div class="menu-box">
                    <div class="label">科室轮转</div>
                    <div class="row">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click.prevent>
                              {{currentMenu}}
                              <DownOutlined />
                            </a>
                            <template #overlay>
                              <a-menu>
                                <a-menu-item v-for="(item,index) in menus" :key="index" @click="handleSwitchMenu(item)">
                                    <span class="iconitem">
                                        <CheckOutlined v-if="item.name==currentMenu" />
                                    </span>
                                    <a href="javascript:;">{{item.name}}</a>
                                </a-menu-item>
                              </a-menu>
                            </template>
                        </a-dropdown>
                        <div class="lockBtn" title="固定此列表视图" @click="handleLock">
                            <img v-if="isLock" :src="require('@/assets/pinned14.png')" class="img active" alt="">
                            <img v-else :src="require('@/assets/pin_italic14.png')" class="img active" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightBtns">
                <a-button class="ml10" type="primary" v-for="(item,index) in actionList" :key="index">{{item.label}}</a-button>
            </div>
        </div>
        <div class="center">
            <div class="bd">
                <div class="searchWrap">
                    <div class="search-common">
                        <list-form-search ref="searchRef" @update-height="changeHeight"></list-form-search>
                    </div>
                    <div class="search-btns">
                        <a-dropdown :trigger="['click']">
                            <a-button><SettingOutlined /><CaretDownOutlined style="font-size: 10px;" /></a-button>
                            <template #overlay>
                              <a-menu @click="handleMenuClick">
                                <a-menu-item key="1">新建</a-menu-item>
                                <a-menu-item key="2">导出</a-menu-item>
                                <a-menu-item key="3">复制</a-menu-item>
                                <a-menu-item key="4">重命名</a-menu-item>
                                <a-menu-item key="5">共享设置</a-menu-item>
                                <a-menu-item key="6">选择要显示的字段</a-menu-item>
                                <a-menu-item key="7">删除</a-menu-item>
                              </a-menu>
                            </template>
                        </a-dropdown>
                        <a-dropdown  class="ml10" :trigger="['click']">
                            <a-button><SettingOutlined /><CaretDownOutlined style="font-size: 10px;" /></a-button>
                            <template #overlay>
                              <a-menu @click="handleMenuClick">
                                <a-menu-item key="1">列表</a-menu-item>
                                <a-menu-item key="2">卡片</a-menu-item>
                                <a-menu-item key="3">分屏视图</a-menu-item>
                              </a-menu>
                            </template>
                        </a-dropdown>
                        <a-button class="ml10"><RedoOutlined /></a-button>
                        <div class="groupBtn ml10">
                            <a-button><RedoOutlined /></a-button>
                            <a-button><RedoOutlined /></a-button>
                        </div>
                        <a-button class="ml10"><SearchOutlined /></a-button>
                    </div>
                </div>
                <div class="gridWrap">
                    <div id="datagrid"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
        CheckOutlined,
        SettingOutlined,
        RedoOutlined,
        SearchOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    // var columns = [
    //     {
    //         field: 'Name',
    //         title: '标题',
    //         sortable: true,
    //     },
    // ]

    const data = reactive({
        currentMenu: "全部",
        menus: [
            {
                id: 1,
                name:'全部'
            },
            {
                id: 2,
                name:'未审批的轮转'
            },
            {
                id: 3,
                name:'本科轮科人员'
            },
            {
                id: 4,
                name:'我创建的'
            }
        ],
        isLock: true,
        columns: [],
        actionList: [],
        listViewActions: [],
        entityType: 'a1K'
    })
    const  { currentMenu, menus, isLock, columns, actionList, listViewActions,entityType } = toRefs(data);
    const handleSwitchMenu = (item)=>{
        data.currentMenu = item.name;
        data.isLock = false;
    }
    const handleLock = ()=> {
        data.isLock = !data.isLock;
    }
    onMounted(()=>{
        
    })
    const loadGrid = (columns) => {
        if ($.fn.pagination.defaults != undefined) {//分页工具栏处理
            $.fn.pagination.defaults.beforePageText = "";
            $.fn.pagination.defaults.afterPageText = "/{pages}";
            $.fn.pagination.defaults.displayMsg = "从{from} 到 {to} 总计 {total} 条";
        }
        $('#datagrid').datagrid({
          url: Interface.listView.list,
          method: "get",
          columns: [columns],
          queryParams: {},
          // data: tableList,
          singleSelect: false,
          checkOnSelect: false,
          selectOnCheck: false,
          pagination: true,
          pageNumber: 1,
          pageSize: 10,
          fit: true,
          striped: false,
          rownumbers: true,
          onLoadSuccess: function () {
          }
        });
    }
    const getConfig = ()=> {
        function formatOper(val, row, index, entityType, listViewActions) {
            var rowId = row["LIST_RECORD_ID"];
            var action = "";
            for (var i = 0; i < listViewActions.length; i++) {
                var item = listViewActions[i];
                action +=
                '<a style="color:#015ba7;font-size:13px;" href="javascript:;" onclick="' +
                [item.devNameOrId] +
                "('" +
                rowId +
                "','" +
                entityType +
                "')\">" +
                item.title +
                "</a>&nbsp;&nbsp;";
            }
            return action;
        }
      proxy.$get(Interface.listView.config,{}).then(res=>{
        console.log(res,'res');
        
        var cols = res.DataSet.Columns;
        var columnsArray = [];
        var col = {
            field: "Action",
            title: "操作",
            formatter: function formatter(value, row, index) {
                return formatOper(
                    value,
                    row,
                    index,
                    data.entityType,
                    data.listViewActions
                );
            }
        };
        columnsArray.push(col);
        for (var i = 0; i < cols.length; i++) {
            var c = cols[i];
            var col = {
                field: c.Name,
                title: c.Title,
                sortable: true
            };
            columnsArray.push(col);
        }
        data.columns = columnsArray;
        loadGrid(data.columns);
      })  
    }
    
    
    const getActions = () => {
        proxy.$get(Interface.listView.handleActions,{
            objectTypeCode: 30053,
        }).then(res=>{
            var listViewActions = res.actions[0].returnValue.actionsContainers[0].listViewActions;
            var actionList = res.actions[0].returnValue.actionsContainers[0].actionList;
            data.actionList = actionList;
            data.listViewActions = listViewActions;
            getConfig();
        })
    }
    getActions();
</script>
<style lang="less">
    .wrapper {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 3px;
        padding: 15px;
        box-sizing: border-box;
        .headerTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e2e3e5;
            padding-bottom: 10px;
            .leftAll {
                padding-left: 10px;
                display: flex;
                align-items: center;
                .menuImg{
                    width: 32px;
                    height: 32px;
                    border-radius: 4px;
                    background: #4BC076;
                    margin-right: 10px;
                    .img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .menu-box{
                    min-width: 130px;
                    .label{
                        font-size: 14px;
                    }
                    .row{
                        display: flex;
                        align-items: center;
                    }
                }
                .lockBtn{
                    width: 24px;
                    height: 24px;
                    background: #fff;
                    border-radius: 4px;
                    border: 1px solid #e2e3e5;
                    text-align: center;
                    line-height: 24px;
                    cursor: pointer;
                    margin-left: 10px;
                    .img{
                        width: 14px;
                        height: 14px;
                    }
                }
            }
        }
        .searchWrap{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .search-common{
                flex: 1;
            }
            .search-btns{
                display: flex;
                .groupBtn{
                    .ant-btn:first-child{
                        border-radius: 0.25rem 0 0 0.25rem;
                    }
                    .ant-btn+.ant-btn{
                        margin-left: -1px;
                    }
                    .ant-btn:last-child{
                        border-radius: 0 0.25rem 0.25rem 0;
                        border: 1px solid rgb(221, 219, 218);
                        background: #fff;
                        color: rgb(112, 110, 107);
                    }
                }
            }
        }
        .center{
            height: calc(~"100% - 58px");
            .bd{
                height: 100%;
                .gridWrap{
                    height: calc(~"100% - 60px")
                }
            }
        }
    }
    .ant-dropdown-link{
        min-width: 130px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
    }
    .iconitem{
        display: inline-block;
        width: 20px;
    }
</style>