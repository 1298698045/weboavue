import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
export default function useReceivingAdmin() {
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
    const tabList = [{
        label: '全部',
        name: 'all',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'Name',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文部门',
                name: 'BusinessUnitId',
                placeholder: "请选择",
                type: 'O',
                objtypecode:10
            }, {
                label: '创建日期',
                name: 'CreatedOn',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        treeentity: 'docouttype',
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'entitygrid.list&entityType=A09&sort=CreatedOn&order=desc',
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);
                }
            },
                {
                    field: 'Name',
                    title: '标题',
                    sortable: true,
                },{
                    field: 'DocumentNo',
                    title: '文号',
                    sortable: true,
                }, {
                    field: 'IssueDate',
                    title: '发文日期',
                    sortable: true,
                },
                {
                    field: 'CreatedBy',
                    title: '创建人',
                    sortable: true,
                },
                {
                    field: 'CreatedOn',
                    title: '创建时间',
                    sortable: true,
                },
                {
                    field: 'ModifiedOn',
                    title: '上一次修改时间',
                    sortable: true,
                },
            ],
            editoption: [
            ]
        }
    },
    {
        label: '已完成',
        name: 'state3',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'Name',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文部门',
                name: 'BusinessUnitId',
                placeholder: "请选择",
                type: 'O',
                objtypecode: 10
            }, {
                label: '创建日期',
                name: 'CreatedOn',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        treeentity: 'docouttype',
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'entitygrid.list&entityType=A09&sort=CreatedOn&order=desc',
            filterquery: '\nWFProcessInstanceStateCode\teq\t3',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);
                }
            },
                {
                    field: 'Name',
                    title: '标题',
                    sortable: true,
                }, {
                    field: 'DocumentNo',
                    title: '文号',
                    sortable: true,
                }, {
                    field: 'IssueDate',
                    title: '发文日期',
                    sortable: true,
                },
                {
                    field: 'CreatedBy',
                    title: '创建人',
                    sortable: true,
                },
                {
                    field: 'CreatedOn',
                    title: '创建时间',
                    sortable: true,
                },
                {
                    field: 'ModifiedOn',
                    title: '上一次修改时间',
                    sortable: true,
                },

            ],
            editoption: [
            ]
        }
    }, {
        label: '搁置',
        name: 'state2',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'Name',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文部门',
                name: 'BusinessUnitId',
                placeholder: "请选择",
                type: 'O',
                objtypecode: 10
            }, {
                label: '创建日期',
                name: 'CreatedOn',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        treeentity: 'docouttype',
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'entitygrid.list&entityType=A09&sort=CreatedOn&order=desc',
            filterquery: '\nWFProcessInstanceStateCode\teq\t2',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);

                }
            },
               {
                   field: 'Name',
                   title: '标题',
                   sortable: true,
               }, {
                   field: 'DocumentNo',
                   title: '文号',
                   sortable: true,
               }, {
                   field: 'IssueDate',
                   title: '发文日期',
                   sortable: true,
               },
                {
                    field: 'CreatedBy',
                    title: '创建人',
                    sortable: true,
                },
                {
                    field: 'CreatedOn',
                    title: '创建时间',
                    sortable: true,
                },
                {
                    field: 'ModifiedOn',
                    title: '上一次修改时间',
                    sortable: true,
                },

            ],
            editoption: [
            ]
        }
    }, {
        label: '流转中',
        name: 'state1',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'Name',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文部门',
                name: 'BusinessUnitId',
                placeholder: "请选择",
                type: 'O',
                objtypecode: 10
            }, {
                label: '创建日期',
                name: 'CreatedOn',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        treeentity: 'docouttype',
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'entitygrid.list&entityType=A09&sort=CreatedOn&order=desc',
            filterquery: '\nWFProcessInstanceStateCode\teq\t1',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);

                }
            },
                {
                    field: 'Name',
                    title: '标题',
                    sortable: true,
                }, {
                    field: 'DocumentNo',
                    title: '文号',
                    sortable: true,
                }, {
                    field: 'IssueDate',
                    title: '发文日期',
                    sortable: true,
                },
                {
                    field: 'CreatedBy',
                    title: '创建人',
                    sortable: true,
                },
                {
                    field: 'CreatedOn',
                    title: '创建时间',
                    sortable: true,
                },
                {
                    field: 'ModifiedOn',
                    title: '上一次修改时间',
                    sortable: true,
                },

            ],
            editoption: [
            ]
        }
    }, {
        label: '草稿',
        name: 'state0',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'Name',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '创建日期',
                name: 'CreatedOn',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        treeentity: 'docouttype',
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'entitygrid.list&entityType=A09&sort=CreatedOn&order=desc',
            filterquery: '\nWFProcessInstanceStateCode\teq\t0',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);

                }
            },
               {
                   field: 'Name',
                   title: '标题',
                   sortable: true,
               }, {
                   field: 'DocumentNo',
                   title: '文号',
                   sortable: true,
               }, {
                   field: 'IssueDate',
                   title: '发文日期',
                   sortable: true,
               },
                {
                    field: 'CreatedBy',
                    title: '创建人',
                    sortable: true,
                },
                {
                    field: 'CreatedOn',
                    title: '创建时间',
                    sortable: true,
                },
                {
                    field: 'ModifiedOn',
                    title: '上一次修改时间',
                    sortable: true,
                },

            ],
            editoption: [
            ]
        }
    }
    ]

    return { tabList };
}