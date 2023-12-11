import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
export default function useReadingLog() {
    const formatName1 = () => {

    }
    const formatStatus1 = () => {

    }
    const formatPriority = () => {

    }
    const formatOper1 = (value, row, index) => {
        var str = `
        <div class="iconBox">
            <div class="popup">
            <div class="option-item" id=${row.ProcessInstanceId} onclick="handleTo('${row.ProcessInstanceId}')">查看</div>
            <div class="option-item" onclick="EditFlow('${row.LIST_RECORD_ID}')">修改</div>  
            <div class="option-item" onclick="handleJump('${row.ProcessId}','${row.ProcessIdName}','${row.ProcessInstanceId}')">重命名</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleCountersign('${row.ProcessId}','${row.ProcessIdName}','${row.ProcessInstanceId}')">发布</div>
            <div class="option-item" onclick="DelegateFn('${row.ProcessInstanceId}','${row.WFRuleLogId}',\'${row.InstanceName}\','${row.ExecutorIdentityName}')">归档</div>  
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">取消归档</div>
            </div>
            <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
        `
        return str;
    }
    const tabList = [
        {
            label: '收文未读',
            name: 'innoread',
            summaryurl: '',
            searchform: [
                {
                    label: '标题',
                    name: 'OfficialDocumentInName',
                    placeholder: "请填写内容",
                    type: 'S',
                },{
                    label: '姓名',
                    name: 'FavoriteUserIdName',
                    placeholder: "请填写内容",
                    type: 'S',
                }, {
                    label: '收文日期',
                    name: 'IssueDate',
                    placeholder: "请选择",
                    type: 'D',
                },
                {
                    label: '阅读时间',
                    name: 'ReadOn',
                    placeholder: "请选择",
                    type: 'D',
                },
                {
                    label: '发起时间',
                    name: 'FavoriteCreatedOn',
                    placeholder: "请选择",
                    type: 'D',
                },
            ],
            issearchform: true,
            summary: [],
            table: {
                expand: '3',
                pag: 2,
                objecttypecode: 100108,
                cmd: 'officialdocumentin.isread.all.list&type=2',
                filterquery: '',
                formatOper: function (value, row, index) {
                    return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
                },
                columnsArray: [
                {
                    field: 'Action',
                    title: '操作',
                    formatter: function formatter(value, row, index) {
                        return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">查看</a>'

                    }
                },
                {
                    field: 'DocumentNo',
                    title: '收文编号',
                    sortable: true,
                },
                {
                    field: 'OfficialDocumentInName',
                    title: '收文标题',
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">' + value + '</a>'

                    }
                },
                {
                    field: 'IssueDate',
                    title: '收文时间',
                    sortable: true,
                },
                {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '收文部门',
                    sortable: true,
                },
               {
                   field: 'FavoriteCreatedOn',
                   title: '发起时间',
                   sortable: true,
               }, {
                   field: 'FavoriteUserIdName',
                   title: '阅读人',
                   sortable: true,
               }, {
                   field: 'ReadOn',
                   title: '阅读时间',
                   sortable: true,
               }, {
                   field: 'IsReadName',
                   title: '是否阅读',
                   sortable: true,
               }, {
                   field: 'CurrentStepName',
                   title: '当前节点',
                   sortable: true,
               }, {
                   field: 'WFProcessInstanceStateCodeName',
                   title: '流程状态',
                   sortable: true,
               }, {
                   field: 'ModifiedOn',
                   title: '修改时间',
                   sortable: true,
               },
                {
                    field: 'ModifiedByName',
                    title: '修改人',
                    sortable: true,
                },
                ],
                editoption: [

                ]
            }
        },
        {
            label: '收文已读',
            name: 'inisread',
            summaryurl: '',
            searchform: [
                {
                    label: '标题',
                    name: 'OfficialDocumentInName',
                    placeholder: "请填写内容",
                    type: 'S',
                }, {
                    label: '姓名',
                    name: 'FavoriteUserIdName',
                    placeholder: "请填写内容",
                    type: 'S',
                }, {
                    label: '收文日期',
                    name: 'IssueDate',
                    placeholder: "请选择",
                    type: 'D',
                },
                {
                    label: '阅读时间',
                    name: 'ReadOn',
                    placeholder: "请选择",
                    type: 'D',
                },
                {
                    label: '发起时间',
                    name: 'FavoriteCreatedOn',
                    placeholder: "请选择",
                    type: 'D',
                },
            ],
            issearchform: true,
            summary: [],
            table: {
                expand: '3',
                pag: 2,
                objecttypecode: 100108,
                cmd: 'officialdocumentin.isread.all.list&type=1',
                filterquery: '',
                formatOper: function (value, row, index) {
                    return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
                },
                columnsArray: [
                {
                    field: 'Action',
                    title: '操作',
                    formatter: function formatter(value, row, index) {
                        return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">查看</a>'

                    }
                },
                {
                    field: 'DocumentNo',
                    title: '收文编号',
                    sortable: true,
                },
                {
                    field: 'OfficialDocumentInName',
                    title: '收文标题',
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">' + value + '</a>'

                    }
                },
                {
                    field: 'IssueDate',
                    title: '收文时间',
                    sortable: true,
                },
                {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '收文部门',
                    sortable: true,
                },
               {
                   field: 'FavoriteCreatedOn',
                   title: '发起时间',
                   sortable: true,
               }, {
                   field: 'FavoriteUserIdName',
                   title: '阅读人',
                   sortable: true,
               }, {
                   field: 'ReadOn',
                   title: '阅读时间',
                   sortable: true,
               }, {
                   field: 'IsReadName',
                   title: '是否阅读',
                   sortable: true,
               }, {
                   field: 'CurrentStepName',
                   title: '当前节点',
                   sortable: true,
               }, {
                   field: 'WFProcessInstanceStateCodeName',
                   title: '流程状态',
                   sortable: true,
               }, {
                   field: 'ModifiedOn',
                   title: '修改时间',
                   sortable: true,
               },
                {
                    field: 'ModifiedByName',
                    title: '修改人',
                    sortable: true,
                },
                ],
                editoption: [

                ]
            }
        },
        {
            label: '发文未读',
            name: 'outnoread',
            summaryurl: '',
            searchform: [
                {
                    label: '标题',
                    name: 'OfficialDocumentOutName',
                    placeholder: "请填写内容",
                    type: 'S',
                }, {
                    label: '姓名',
                    name: 'FavoriteUserIdName',
                    placeholder: "请填写内容",
                    type: 'S',
                }, {
                    label: '发文日期',
                    name: 'IssueDate',
                    placeholder: "请选择",
                    type: 'D',
                },
                {
                    label: '阅读时间',
                    name: 'ReadOn',
                    placeholder: "请选择",
                    type: 'D',
                },
                {
                    label: '发起时间',
                    name: 'FavoriteCreatedOn',
                    placeholder: "请选择",
                    type: 'D',
                },
            ],
            issearchform: true,
            summary: [],
            table: {
                expand: '3',
                pag: 2,
                objecttypecode: 100109,
                cmd: 'officialdocumentout.isread.all.list&type=2',
                filterquery: '',
                formatOper: function (value, row, index) {
                    return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
                },
                columnsArray: [
                {
                    field: 'Action',
                    title: '操作',
                    formatter: function formatter(value, row, index) {
                        return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">查看</a>'

                    }
                },
                {
                    field: 'DocumentNo',
                    title: '发文编号',
                    sortable: true,
                },
                {
                    field: 'OfficialDocumentOutName',
                    title: '发文标题',
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">' + value + '</a>'

                    }
                },
                {
                    field: 'IssueDate',
                    title: '发文时间',
                    sortable: true,
                },
                {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '发文部门',
                    sortable: true,
                },
                {
                    field: 'AuthorName',
                    title: '拟稿人',
                    sortable: true,
                }, {
                    field: 'FavoriteCreatedOn',
                    title: '发起时间',
                    sortable: true,
                }, {
                    field: 'FavoriteUserIdName',
                    title: '阅读人',
                    sortable: true,
                }, {
                    field: 'ReadOn',
                    title: '阅读时间',
                    sortable: true,
                }, {
                    field: 'CurrentStepName',
                    title: '当前节点',
                    sortable: true,
                }, {
                    field: 'WFProcessInstanceStateCodeName',
                    title: '流程状态',
                    sortable: true,
                }, {
                    field: 'IsReadName',
                    title: '是否阅读',
                    sortable: true,
                }, {
                    field: 'ModifiedOn',
                    title: '修改时间',
                    sortable: true,
                },
                {
                    field: 'ModifiedByName',
                    title: '修改人',
                    sortable: true,
                },
                ],
                editoption: [

                ]
            }
        },
        {
            label: '发文已读',
            name: 'outisread',
            summaryurl: '',
            searchform: [
                {
                    label: '标题',
                    name: 'OfficialDocumentOutName',
                    placeholder: "请填写内容",
                    type: 'S',
                }, {
                    label: '姓名',
                    name: 'FavoriteUserIdName',
                    placeholder: "请填写内容",
                    type: 'S',
                }, {
                    label: '发文日期',
                    name: 'IssueDate',
                    placeholder: "请选择",
                    type: 'D',
                },
                {
                    label: '阅读时间',
                    name: 'ReadOn',
                    placeholder: "请选择",
                    type: 'D',
                },
                {
                    label: '发起时间',
                    name: 'FavoriteCreatedOn',
                    placeholder: "请选择",
                    type: 'D',
                },
            ],
            issearchform: true,
            summary: [],
            table: {
                expand: '3',
                pag: 2,
                objecttypecode: 100109,
                cmd: 'officialdocumentout.isread.all.list&type=1',
                filterquery: '',
                formatOper: function (value, row, index) {
                    return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
                },
                columnsArray: [
                {
                    field: 'Action',
                    title: '操作',
                    formatter: function formatter(value, row, index) {
                        return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">查看</a>'

                    }
                },
                {
                    field: 'DocumentNo',
                    title: '发文编号',
                    sortable: true,
                },
                {
                    field: 'OfficialDocumentOutName',
                    title: '发文标题',
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">' + value + '</a>'

                    }
                },
                {
                    field: 'IssueDate',
                    title: '发文时间',
                    sortable: true,
                },
                {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '发文部门',
                    sortable: true,
                },
                {
                    field: 'AuthorName',
                    title: '拟稿人',
                    sortable: true,
                }, {
                    field: 'FavoriteCreatedOn',
                    title: '发起时间',
                    sortable: true,
                }, {
                    field: 'FavoriteUserIdName',
                    title: '阅读人',
                    sortable: true,
                }, {
                    field: 'ReadOn',
                    title: '阅读时间',
                    sortable: true,
                }, {
                    field: 'IsReadName',
                    title: '是否阅读',
                    sortable: true,
                }, {
                    field: 'CurrentStepName',
                    title: '当前节点',
                    sortable: true,
                }, {
                    field: 'WFProcessInstanceStateCodeName',
                    title: '流程状态',
                    sortable: true,
                }, {
                    field: 'ModifiedOn',
                    title: '修改时间',
                    sortable: true,
                },
                {
                    field: 'ModifiedByName',
                    title: '修改人',
                    sortable: true,
                },
                ],
                editoption: [

                ]
            }
        },

    ]

    return { tabList };
}