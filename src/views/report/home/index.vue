<template>
    <div class="wrapper">
        <div class="reportView">
            <div class="folderNavigator">
                <div class="page-header">
                    <div class="flex items-center">
                        <div class="flex-col">
                            <div class="media">
                                <p class="entityName">报表</p>
                                <p class="menuName">{{menuName}}</p>
                                <p class="count-label">8 个项目</p>
                            </div>
                        </div>
                        <div class="flex-col no-flex">
                            <div class="flex">
                                <a-input v-model:value="queryParams.search" placeholder="搜索最近报表..." style="width: 240px;" @pressEnter="handleSearch">
                                    <template #prefix>
                                        <svg class="fh-input__icon fh-input__icon_left" focusable="false"
                                            data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path
                                                    d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z">
                                                </path>
                                            </g>
                                        </svg>
                                    </template>
                                </a-input>
                                <div class="btnBox">
                                    <!-- <div class="btnGroup ml10">
                                        <a-button @click="handleNewReport">新建报表</a-button>
                                        <a-button @click="handleNewFlolder">新建文件夹</a-button>
                                    </div> -->
                                    <!-- <a-button class="ml10 btnMore" title="筛选器">
                                        <svg class="btn_icon" focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-31cpu082oko="" data-key="settings"><g lwc-31cpu082oko=""><path d="M261 191c-39 0-70 31-70 70s31 70 70 70 70-31 70-70-31-70-70-70zm210 133l-37-31a195 195 0 000-68l37-31c12-10 16-28 8-42l-16-28a34 34 0 00-40-14l-46 17a168 168 0 00-59-34l-8-47c-3-16-17-25-33-25h-32c-16 0-30 9-33 25l-8 46a180 180 0 00-60 34l-46-17-11-2c-12 0-23 6-29 16l-16 28c-8 14-5 32 8 42l37 31a195 195 0 000 68l-37 31a34 34 0 00-8 42l16 28a34 34 0 0040 14l46-17c18 16 38 27 59 34l8 48a33 33 0 0033 27h32c16 0 30-12 33-28l8-48a170 170 0 0062-37l43 17 12 2c12 0 23-6 29-16l15-26c9-11 5-29-7-39zm-210 47c-61 0-110-49-110-110s49-110 110-110 110 49 110 110-49 110-110 110z" lwc-31cpu082oko=""></path></g></svg>
                                        <svg class="btn_icon btn_icon_small" focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                                    </a-button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="centerRegion">
                    <div class="bodyContainer">
                        <div class="sidebarContainer">
                            <div class="folderSidebar">
                                <nav class="nav-vertical">
                                    <div class="nav-vertical__section navItems entityItems"
                                        v-for="(item, index) in navSections" :key="index">
                                        <h2 class="text-title_caps">{{item.label}}</h2>
                                        <ul>
                                            <li class="nav-vertical__item" :class="{'active':row.id==queryScope}"
                                                v-for="(row, idx) in item.items" :key="idx">
                                                <a href="javascript:void(0);" :title="row.label"
                                                    class="nav-vertical__action"
                                                    @click="handleTabNav(row)">{{row.label}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div class="listViewContainer" ref="listViewRef">
                            <Dtable ref="gridRef" name="datagridFilter" :queryParams="queryParams" :columns="columns"
                                :gridUrl="gridUrl" :tableHeight="tableHeight" :loadFilter="loadFilter"></Dtable>
                        </div>
                    </div>
                </div>
            </div>
            <div class="defaultMenu" ref="defaultMenuRef" :style="menuStyle" v-show="isDefauleMneuActions" @click.stop>
                <div class="menuActions" style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                    <!-- <template v-if="queryScope == 'userFolders' || queryScope == 'userFoldersCreatedByMe' || queryScope == 'userFoldersSharedWithMe'">
                        <div class="menuItem" @click="handleShare">共享</div>
                        <div class="menuItem" @click="handleRename">重命名</div>
                        <div class="menuItem" @click="handleDelete('ReportTypeFolder')">删除</div>
                    </template>
                    <template v-else>
                    </template> -->
                    <div class="menuItem" @click="handleRun">运行</div>
                    <div class="menuItem">订阅</div>
                    <div class="menuItem">导出</div>
                    <div class="menuItem">收藏</div>
                </div>
            </div>
        </div>
        <NewFolder v-if="isNewFolder" :isShow="isNewFolder" @cancel="isNewFolder=false" @ok="loadGrid" />
        <CreateReport v-if="isCreateReport" :isShow="isCreateReport" @cancel="isCreateReport=false"
            @ok="createReport" />
        <Delete v-if="isDelete" :isShow="isDelete" sObjectName="Report" :recordId="rowId" @cancel="isDelete=false"
            @ok="loadGrid" desc="是否确定要删除此报表？" />
    </div>
</template>
<script setup>
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
        toRaw,
        inject,
        nextTick
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Dtable from "@/components/Dtable_nodes.vue";
    import CreateReport from "@/components/report/CreateReport.vue";
    import NewFolder from "@/components/report/NewFolder.vue";
    import Delete from "@/components/listView/Delete.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    const gridRef = ref(null);
    const listViewRef = ref(null);
    const defaultMenuRef = ref(null);
    const data = reactive({
        navSections: [],
        queryScope: "",
        columns: [
            {
                field: "Name",
                title: "报表名称",
                formatter: (val, item) => {
                    return "<a href='javascript:;' onclick=\"createReport('" + item.id + "')\">" + val.textValue + "</a>";
                }
            },
            {
                field: "FileName",
                title: "文件夹",
                formatter: (val, item) => {
                    return val.textValue;
                }
            },
            {
                field: "Description",
                title: "描述",
                formatter: (val, item) => {
                    return val.textValue;
                }
            },
            {
                field: "Createdby",
                title: "创建人",
                formatter: (val, item) => {
                    return "<a href='javascript:;'>" + val.userValue.DisplayName + "</a>";
                }
            },
            {
                field: "Createdon",
                title: "创建日期",
                formatter: (val, item) => {
                    return val.dateTime;
                }
            },
            {
                field: "Createdby1",
                title: "已定阅",
                // formatter: (val, item) => {
                //     return val.textValue;
                // }
            },
            {
                field: "Createdby1",
                title: "报表最后运行日期",
                // formatter: (val, item) => {
                //     return val.dateTime;
                // }
            },
            {
                field: "Modifiedon",
                title: "上次修改日期",
                formatter: (val, item) => {
                    return val.dateTime;
                }
            },
            {
                field: "Modifiedby",
                title: "上次修改人",
                formatter: (val, item) => {
                    return "<a href='javascript:;'>" + val.userValue.DisplayName + "</a>";
                }
            }
        ],
        gridUrl: Interface.list2,
        tableHeight: 0,
        menuName: "",
        isNewFolder: false,
        isCreateReport: false,
        queryParams: {
            entityType: "00O",
            objectTypeCode: 9100,
            displayColumns: "Name,Description,FileName,Createdby,Createdon,Modifiedby,Modifiedon",
            filterCondition: "",
            search: ""
        },
        menuStyle: "",
        isDefauleMneuActions: false,
        clickRecordData: {
            index: ""
        },
        rowId: "",
        isDelete: false
    });
    const { menuName, navSections, queryScope, columns, gridUrl, tableHeight,
        isNewFolder, isCreateReport, queryParams, menuStyle, isDefauleMneuActions, clickRecordData, rowId, isDelete } = toRefs(data);

    if (route.query.queryScope) {
        data.queryScope = route.query.queryScope;
    }

    onMounted(() => {
        nextTick(() => {
            window.addEventListener("resize", () => {
                data.tableHeight = listViewRef.value.clientHeight;
            });
            setTimeout(function () {
                window.dispatchEvent(new Event('resize'))
            })
        })
        window.addEventListener('click', () => {
            data.isDefauleMneuActions = false;
        })
    })

    const handleSearch = () => {
        loadGrid();
    }

    const handleTabNav = (row) => {
        data.queryScope = row.id;
        data.menuName = row.label;
        router.push({
            path: "/lightning/o/Report/home",
            query: {
                queryScope: row.id
            }
        })
    }

    const getConfig = () => {
        proxy.$get(Interface.report.config, {}).then(res => {
            let { navSections, entityColumns } = res.actions[0].returnValue;
            data.navSections = navSections;
            // data.columns = entityColumns;
            if (Object.keys(route.query).length == 0) {
                data.queryScope = navSections[0].items[0].id;
                data.menuName = navSections[0].items[0].label;
            }

            data.navSections.forEach(item => {
                item.items.forEach(row => {
                    if (row.id == data.queryScope) {
                        data.menuName = row.label;
                    }
                })
            });

            // getFilterInfo();
            const actions = {
                field: "actions",
                title: "操作",
                formatter: (value, row, index) => {
                    let id = row.id;
                    var str = `
                <a href="javascript:;" class="btnMenu" id="btnMenu_${index}" onclick="handleClickActions(event,'${index}','${id}')">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                </a>
                `;
                    return str;
                },
            }
            // entityColumns.forEach(item=>{
            //     data.columns.push({
            //         field: item.apiName,
            //         title: item.label,
            //         sortable: item.isSortableColumn,
            //     });
            // });
            // data.columns.push(actions);
            gridRef.value.loadGrid(data.queryParams);
        })
    }
    getConfig();
    const loadGrid = () => {
        gridRef.value.loadGrid(data.queryParams);
    }


    watch(() => route.query.queryScope, (newVal, oldVal) => {
        let str;
        let entityType = "00O";
        let objectTypeCode = 9100;
        let displayColumns = "Name,Description,FileName,Createdby,Createdon,Modifiedby,Modifiedon";
        let columns = [
            {
                field: "Name",
                title: "报表名称",
                formatter: (val, item) => {
                    return "<a href='javascript:;' onclick=\"createReport('" + item.id + "')\">" + val.textValue + "</a>";
                }
            },
            {
                field: "FileName",
                title: "文件夹",
                formatter: (val, item) => {
                    return val.textValue;
                }
            },
            {
                field: "Description",
                title: "描述",
                formatter: (val, item) => {
                    return val.textValue;
                }
            },
            {
                field: "Createdby",
                title: "创建人",
                formatter: (val, item) => {
                    return "<a href='javascript:;'>" + val.userValue.DisplayName + "</a>";
                }
            },
            {
                field: "Createdon",
                title: "创建日期",
                formatter: (val, item) => {
                    return val.dateTime;
                }
            },
            {
                field: "Createdby1",
                title: "已定阅",
                // formatter: (val, item) => {
                //     return val.textValue;
                // }
            },
            {
                field: "Createdby1",
                title: "报表最后运行日期",
                // formatter: (val, item) => {
                //     return val.dateTime;
                // }
            },
            {
                field: "Modifiedon",
                title: "上次修改日期",
                formatter: (val, item) => {
                    return val.dateTime;
                }
            },
            {
                field: "Modifiedby",
                title: "上次修改人",
                formatter: (val, item) => {
                    return "<a href='javascript:;'>" + val.userValue.DisplayName + "</a>";
                }
            },
            {
                field: "actions",
                title: "操作",
                formatter: (value, row, index) => {
                    let id = row.id;
                    var str = `
                <a href="javascript:;" class="btnMenu" id="btnMenu_${index}" onclick="handleClickActions(event,'${index}','${id}')">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                </a>
                `;
                    return str;
                },
            },
        ];


        const setFolderConfig = () => {
            entityType = "ReportTypeFolder";
            objectTypeCode = 9105;
            displayColumns = "Name,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn";
            str = "";
            columns = [
                {
                    field: "Name",
                    title: "名称",
                    formatter: (val, item) => {
                        return "<a href='javascript:;' onclick=\"createReport('" + item.id + "')\">" + val.textValue + "</a>";
                    }
                },
                {
                    field: "CreatedBy",
                    title: "创建人",
                    formatter: (val, item) => {
                        return item.CreatedBy.userValue.DisplayName
                    }
                },
                {
                    field: "CreatedOn",
                    title: "创建日期",
                    formatter: (val, item) => {
                        return item.CreatedOn.dateTime
                    }
                },
                {
                    field: "ModifiedBy",
                    title: "上次修改人",
                    formatter: (val, item) => {
                        return item.ModifiedBy.userValue.DisplayName
                    }
                },
                {
                    field: "ModifiedOn",
                    title: "上次修改日期",
                    formatter: (val, item) => {
                        return item.ModifiedOn.dateTime
                    }
                },
                // {
                //     field: "actions",
                //     title: "操作",
                //     formatter: (value, row, index) => {
                //         let id = row.id;
                //         let name = row.Name.textValue;
                //         var str = `
                // <a href="javascript:;" class="btnMenu" id="btnMenu_${index}" onclick="handleClickActions(event,'${index}','${id}','${name}')">
                //     <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                // </a>
                // `;
                //         return str;
                //     },
                // },
            ]
        }

        if (newVal == "created") {
            str = [{
                sort: "1",
                attribute: "CreatedBy",
                label: "使用人",
                operator: "eq-userid",
                logical: "等于",
                picklistValues: [],
                isEditable: false,
                column: "UsedBy",
                operands: [],
                id: 1
            }]
        } else if (newVal == "mru") {
            str = [{
                sort: "1",
                attribute: "UsedBy",
                label: "使用人",
                operator: "eq-userid",
                logical: "等于",
                picklistValues: [],
                isEditable: false,
                column: "UsedBy",
                operands: [],
                id: 1
            }]
        } else if (newVal == "mine") {
            str = [{
                sort: "1",
                attribute: "FolderId",
                column: "FolderId",
                label: "目录",
                operator: "eq",
                logical: "等于",
                picklistValues: ["专用报表"],
                isEditable: false,
                operands: [
                    "00000000-0000-0000-0000-000000000001"
                ],
                id: 1
            }]
        } else if (newVal == "organizationOwned") {
            str = [{
                sort: "1",
                attribute: "FolderId",
                column: "FolderId",
                label: "目录",
                operator: "eq",
                logical: "等于",
                picklistValues: ["专用报表"],
                isEditable: false,
                operands: [
                    "00000000-0000-0000-0000-000000000002"
                ],
                id: 1
            }]
        } else if (newVal == "userFolders") {
            setFolderConfig();
        } else if (newVal == "userFoldersCreatedByMe") {
            setFolderConfig();
            str = [{
                sort: "1",
                attribute: "CreatedBy",
                column: "CreatedBy",
                label: "创建人",
                operator: "eq-userid",
                logical: "等于",
                picklistValues: [],
                isEditable: false,
                operands: [],
                id: 1
            }]
        }
        data.columns = columns;
        data.queryParams.displayColumns = displayColumns;
        data.queryParams.entityType = entityType;
        data.queryParams.objectTypeCode = objectTypeCode;
        data.queryParams.filterCondition = JSON.stringify(str);
        getConfig();
    }, { immediate: true });


    const getFilterInfo = () => {
        let d = {
            entityType: "00O",
            objectTypeCode: 9100,
            search: "",
            filterId: ""
        }
        proxy.$post(Interface.listView.getFilterInfo, d).then(res => {
            console.log("res", res);
        })
    }

    //   参考网站模拟
    //   const loadFilter = (res) => {
    //     let fields = data.columns.map(item=>item.field);
    //     var data0 = { rows: [], total: 0 }
    //     if(res.actions[0].returnValue.result){
    //         data0.rows = res.actions[0].returnValue.result;
    //     }
    //     data0.total = res&&res.actions[0].returnValue.totalCount ? Number(res.actions[0].returnValue.totalCount) : data0.rows.length;
    //     return data0
    //   }
    const loadFilter = (res) => {
        let fields = data.columns.map(item => item.field);
        var data0 = { rows: [], total: 0 }
        if (res.nodes) {
            data0.rows = res.nodes;
        }
        data0.total = res && res.totalCount ? Number(res.totalCount) : data0.rows.length;
        return data0
    }

    const handleNewFlolder = () => {
        data.isNewFolder = true;
    }
    const handleNewReport = () => {
        data.isCreateReport = true;
    }

    const handleClickActions = (event, index, id) => {
        let windowHeight = window.document.documentElement.clientHeight;
        event.stopPropagation();
        let dom = document.querySelector("#btnMenu_" + index);
        let rect = dom.getBoundingClientRect();
        let top = rect.top - 90 + 12;
        let left = rect.left - 12 + 16 - 197;
        let menuActionsHeight = defaultMenuRef.value.clientHeight;
        if ((windowHeight - rect.top) < menuActionsHeight) {
            top = top - menuActionsHeight - 12;
        }
        data.menuStyle = {
            top: top + "px",
            left: left + "px"
        };
        if (data.clickRecordData.index == index) {
            data.isDefauleMneuActions = !data.isDefauleMneuActions;
        } else {
            data.isDefauleMneuActions = true;
        }
        data.clickRecordData.index = index;
        data.clickRecordData.id = id;
    };
    window.handleClickActions = handleClickActions;


    const handleRun = () => {
        data.rowId = data.clickRecordData.id;
        router.push({
            name: 'ReportPreview',
            query: {
                id: data.rowId,
                queryScope: data.queryScope
            }
        })
    }

    const handleEdit = () => {
        data.rowId = data.clickRecordData.id;
        router.push({
            name: 'ReportDesign',
            query: {
                id: data.rowId,
                queryScope: data.queryScope
            }
        })
    }

    const handleDelete = () => {
        data.rowId = data.clickRecordData.id;
        data.isDefauleMneuActions = false;
        data.isDelete = true;
    }

    const createReport = (id) => {
        // router.push({
        //     name: "ReportDesign",
        //     query: {
        //         id: id
        //     }
        // })
    };
    window.createReport = createReport;
</script>
<style lang="less" scoped>
    .wrapper {
        height: calc(100vh - 90px);
        /* padding: 12px; */
        /* background: #b0c4df; */
        position: relative;
        z-index: 1;

        .reportView {
            height: 100%;
            position: relative;
            z-index: 999;
            overflow: hidden;

            .folderNavigator {
                height: 100%;
                width: 100%;
                display: flex;
                box-orient: vertical;
                flex-flow: column;

                .page-header {
                    min-height: 80px;
                    padding: 8px 12px;
                    border-bottom: 1px solid #c9c9c9;
                    border-radius: 4px 4px 0 0;
                    box-shadow: none;
                    background-clip: padding-box;
                    background: #f3f3f3;

                    .media {
                        .entityName {}

                        .menuName {
                            color: #181818;
                            cursor: default;
                            outline: none;
                            text-decoration: none;
                            font-size: 20px;
                            line-height: 24px;
                            font-weight: normal;
                        }

                        .count-label {
                            font-size: 13px;
                        }
                    }
                }

                .centerRegion {
                    padding: 0;
                    display: flex;
                    height: 100%;
                    flex: 1;
                    overflow: hidden;

                    .bodyContainer {
                        display: flex;
                        flex: 1;
                        overflow: hidden;
                        width: 100%;

                        .sidebarContainer {
                            min-width: 138px;
                            background: #fff;
                            overflow-y: auto;
                            height: 100%;
                            border-bottom-left-radius: 4px;

                            .folderSidebar {
                                .nav-vertical {
                                    position: relative;
                                    display: block;

                                    .nav-vertical__section {
                                        .text-title_caps {
                                            font-size: 13px;
                                            line-height: 1.25;
                                            color: #444444;
                                            font-weight: 400;
                                            text-transform: uppercase;
                                            letter-spacing: 1px;
                                            padding: 8px 16px;
                                            padding-left: 24px;
                                        }

                                        ul {
                                            .nav-vertical__item {
                                                position: relative;

                                                &:before {
                                                    position: absolute;
                                                    top: 0;
                                                    right: 0;
                                                    bottom: 0;
                                                    left: 0;
                                                    content: '';
                                                }

                                                &.active:before {
                                                    background: #f0f3fd;
                                                }

                                                .nav-vertical__action {
                                                    position: relative;
                                                    display: flex;
                                                    align-items: center;
                                                    width: 100%;
                                                    padding: 8px 24px 8px 32px;
                                                    color: #181818;
                                                    border-top: 1px solid transparent;
                                                    border-bottom: 1px solid transparent;
                                                    border-radius: 0;
                                                    cursor: pointer;
                                                    z-index: 1;
                                                    white-space: nowrap;
                                                }

                                                &:hover {
                                                    &:before {
                                                        background: #f0f3fd;
                                                    }

                                                    .nav-vertical__action {
                                                        text-decoration: none;
                                                        box-shadow: inset 2px 0 0 #4194f9;
                                                    }
                                                }

                                                &.active {
                                                    .nav-vertical__action {
                                                        font-weight: bold;
                                                        box-shadow: inset 4px 0 0 #4194f9;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        .listViewContainer {
                            border-left: 1px solid #c9c9c9;
                            flex: 1;
                            position: relative;
                            /* overflow-x: scroll; */
                            background: #fff;
                            border-bottom-right-radius: 4px;
                        }
                    }
                }
            }
        }
    }

    .btnBox {
        display: flex;
    }
</style>
<style lang="less">
    .btnMenu {
        display: inline-block;
        width: 28px !important;
        height: 28px !important;
        line-height: 28px;
        border: 1px solid #c9c9c9 !important;
        color: #747474;
        /* vertical-align: middle; */
        border-radius: 4px;
        text-align: center;

        &:hover {
            color: var(--textColor);
        }
    }

    .defaultMenu {
        position: absolute;
        top: 0;
        z-index: 999;

        .menuActions {
            background: #fff;
        }

        .menuItem {
            min-width: 98px;
            line-height: 35px;
            cursor: pointer;
            padding: 0 12px;

            &:hover {
                background: #f3f3f3;
            }
        }
    }

    .btn_icon {
        width: 14px;
        height: 14px;
        fill: currentColor;
        vertical-align: middle;
    }
</style>