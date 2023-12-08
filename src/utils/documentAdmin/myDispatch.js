import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
export default function useMyDispatch() {
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
            <div class="option-item" onclick="EditFlow('${row.LIST_RECORD_ID}')">打印</div>  
            <div class="option-item" onclick="handleJump('${row.ProcessId}','${row.ProcessIdName}','${row.ProcessInstanceId}')">跳转</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleCountersign('${row.ProcessId}','${row.ProcessIdName}','${row.ProcessInstanceId}')">加签</div>
            <div class="option-item" onclick="DelegateFn('${row.ProcessInstanceId}','${row.WFRuleLogId}',\'${row.InstanceName}\','${row.ExecutorIdentityName}')">委派</div>  
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">撤销</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">结束</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleRelase('${row.ProcessInstanceId}')">发布</div>
            </div>
            <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
        `
        return str;
    }
    const tabList = [{
        label: '待办发文',
        name: 'mineDocumentOutTasks',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'OfficialDocumentOutName',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文日期',
                name: 'IssueDate',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'officialdocumentout.no.owner.list',
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
                //{
            //    field: 'Action',
            //    title: '操作',
            //    formatter: function formatter(value, row, index) {
            //        return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

            //    }
            //},
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<a style="color:blue;" href="/a0M/e?id=' + row.WFRuleLogId + '&source=l&retURL=%2f123%2fo" target="_blank">办理</a>'
                }
            },
                {
                    field: 'OfficialDocumentOutName',
                    title: '标题',
                    sortable: true,
                },
                {
                    field: 'IssueDate',
                    title: '发文日期',
                    sortable: true,
                }, {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                }, {
                    field: 'DocumentNo',
                    title: '发文编号',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '发文部门',
                    sortable: true,
                },
                {
                    field: 'Author',
                    title: '拟稿人',
                    sortable: true,
                }, {
                    field: 'StartByName',
                    title: '发起人',
                    sortable: true,
                }, {
                    field: 'FromActivityName',
                    title: '来源节点',
                    sortable: true,
                }, {
                    field: 'CreatedByName',
                    title: '提交人',
                    sortable: true,
                }, {
                    field: 'WFRuleLogCreatedOn',
                    title: '来源时间',
                    sortable: true,
                }, {
                    field: 'ProcessIdName',
                    title: '流程名称',
                    sortable: true,
                },

            ],
            editoption: [
                //{
                //    title: '查看',
                //    f: function (id) {
                //        window.open('/a0M/e?id=' + id + '&source=l&retURL=%2f123%2fo')
                //        //lookupFieldView(id, 20211)
                //        //$('#iframe').height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '编辑',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAccount&id=' + id;
                //        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '删除',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/alert/delete_ie8.html?objtypecode=20211&id=' + id;
                //        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "280px" })
                //    },
                //},
            ]
        }
    },
    {
        label: '已办发文',
        name: 'mineDocumentOutClosedTasks',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'OfficialDocumentOutName',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文日期',
                name: 'IssueDate',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'officialdocumentout.wfprocessinstances.owner.list',
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
                //{
            //    field: 'Action',
            //    title: '操作',
            //    formatter: function formatter(value, row, index) {
            //        return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

            //    }
            //},
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">查看</a>'

                }
            },
                {
                    field: 'OfficialDocumentOutName',
                    title: '标题',
                    sortable: true,
                },
                {
                    field: 'IssueDate',
                    title: '发文日期',
                    sortable: true,
                }, {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                }, {
                    field: 'DocumentNo',
                    title: '发文编号',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '发文部门',
                    sortable: true,
                },
                {
                    field: 'Author',
                    title: '拟稿人',
                    sortable: true,
                }, {
                    field: 'StartByName',
                    title: '发起人',
                    sortable: true,
                }, {
                    field: 'CurrentStepName',
                    title: '当前节点',
                    sortable: true,
                }, {
                    field: 'CreatedByName',
                    title: '提交人',
                    sortable: true,
                }, {
                    field: 'WFProcessInstanceStateCodeName',
                    title: '流程状态',
                    sortable: true,
                }, {
                    field: 'ProcessIdName',
                    title: '流程名称',
                    sortable: true,
                },

            ],
            editoption: [
                //{
                //    title: '查看',
                //    f: function (id) {
                //        window.open('/a0M/e?id=' + id + '&source=l&retURL=%2f123%2fo')
                //        //lookupFieldView(id, 20211)
                //        //$('#iframe').height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '编辑',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAccount&id=' + id;
                //        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '删除',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/alert/delete_ie8.html?objtypecode=20211&id=' + id;
                //        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "280px" })
                //    },
                //},
            ]
        }
    }, {
        label: '已读',
        name: 'mineDocumentOutRead',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'OfficialDocumentOutName',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文日期',
                name: 'IssueDate',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'officialdocumentout.isread.owner.list&Type=1',
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
                //{
            //    field: 'Action',
            //    title: '操作',
            //    formatter: function formatter(value, row, index) {
            //        return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

            //    }
            //},
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">查看</a>'

                }
            },
                {
                    field: 'OfficialDocumentOutName',
                    title: '标题',
                    sortable: true,
                },
                {
                    field: 'IssueDate',
                    title: '发文日期',
                    sortable: true,
                }, {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                }, {
                    field: 'DocumentNo',
                    title: '发文编号',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '发文部门',
                    sortable: true,
                },
                {
                    field: 'Author',
                    title: '拟稿人',
                    sortable: true,
                },
                {
                    field: 'CreatedOn',
                    title: '创建日期',
                    sortable: true,
                },

            ],
            editoption: [
                //{
                //    title: '查看',
                //    f: function (id) {
                //        window.open('/a0M/e?id=' + id + '&source=l&retURL=%2f123%2fo')
                //        //lookupFieldView(id, 20211)
                //        //$('#iframe').height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '编辑',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAccount&id=' + id;
                //        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '删除',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/alert/delete_ie8.html?objtypecode=20211&id=' + id;
                //        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "280px" })
                //    },
                //},
            ]
        }
    }, {
        label: '未读',
        name: 'mineDocumentOutUnread',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'OfficialDocumentOutName',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文日期',
                name: 'IssueDate',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'officialdocumentout.isread.owner.list&Type=2',
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
                //{
            //    field: 'Action',
            //    title: '操作',
            //    formatter: function formatter(value, row, index) {
            //        return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

            //    }
            //},
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">查看</a>'

                }
            },
                {
                    field: 'OfficialDocumentOutName',
                    title: '标题',
                    sortable: true,
                },
                {
                    field: 'IssueDate',
                    title: '发文日期',
                    sortable: true,
                }, {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                }, {
                    field: 'DocumentNo',
                    title: '发文编号',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '发文部门',
                    sortable: true,
                },
                {
                    field: 'Author',
                    title: '拟稿人',
                    sortable: true,
                },
                {
                    field: 'CreatedOn',
                    title: '创建日期',
                    sortable: true,
                },

            ],
            editoption: [
                //{
                //    title: '查看',
                //    f: function (id) {
                //        window.open('/a0M/e?id=' + id + '&source=l&retURL=%2f123%2fo')
                //        //lookupFieldView(id, 20211)
                //        //$('#iframe').height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '编辑',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAccount&id=' + id;
                //        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '删除',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/alert/delete_ie8.html?objtypecode=20211&id=' + id;
                //        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "280px" })
                //    },
                //},
            ]
        }
    }, {
        label: '我的发起',
        name: 'mineDocumentOut',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'OfficialDocumentOutName',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文日期',
                name: 'IssueDate',
                placeholder: "请选择",
                type: 'D',
            }
        ],
        issearchform: true,
        summary: [],
        table: {
            expand: '3',
            pag: 2,
            objecttypecode: 100109,
            cmd: 'officialdocumentout.owner.list&type=2',
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
                //{
            //    field: 'Action',
            //    title: '操作',
            //    formatter: function formatter(value, row, index) {
            //        return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

            //    }
            //},
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo" target="_blank">查看</a>'

                }
            },
                {
                    field: 'OfficialDocumentOutName',
                    title: '标题',
                    sortable: true,
                },
                {
                    field: 'IssueDate',
                    title: '发文日期',
                    sortable: true,
                }, {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                }, {
                    field: 'DocumentNo',
                    title: '发文编号',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '发文部门',
                    sortable: true,
                },
                {
                    field: 'Author',
                    title: '拟稿人',
                    sortable: true,
                }, {
                    field: 'StartByName',
                    title: '发起人',
                    sortable: true,
                }, {
                    field: 'CurrentStepName',
                    title: '当前节点',
                    sortable: true,
                }, {
                    field: 'CreatedByName',
                    title: '提交人',
                    sortable: true,
                }, {
                    field: 'WFProcessInstanceStateCodeName',
                    title: '流程状态',
                    sortable: true,
                }, {
                    field: 'ProcessIdName',
                    title: '流程名称',
                    sortable: true,
                }, {
                    field: 'CreatedOn',
                    title: '创建日期',
                    sortable: true,
                },

            ],
            editoption: [
                //{
                //    title: '查看',
                //    f: function (id) {
                //        window.open('/a0M/e?id=' + id + '&source=l&retURL=%2f123%2fo')
                //        //lookupFieldView(id, 20211)
                //        //$('#iframe').height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '编辑',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAccount&id=' + id;
                //        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '删除',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/alert/delete_ie8.html?objtypecode=20211&id=' + id;
                //        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "280px" })
                //    },
                //},
            ]
        }
    }, {
        label: '草稿箱',
        name: 'mineDocumentOutDraft',
        summaryurl: '',
        searchform: [
            {
                label: '标题',
                name: 'OfficialDocumentOutName',
                placeholder: "请填写内容",
                type: 'S',
            }, {
                label: '发文日期',
                name: 'IssueDate',
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
            cmd: 'officialdocumentout.owner.list&type=1',
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [
                //{
            //    field: 'Action',
            //    title: '操作',
            //    formatter: function formatter(value, row, index) {
            //        return '<div class="editoption" data-accountid="' + row.valueid + '" data-id="' + row.valueid + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

            //    }
            //},
            {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<div><a style="color:blue;" href="/a0M/e?id=' + row.LIST_RECORD_ID + '&source=l&retURL=%2f123%2fo")\' target="_blank">修改</a>&nbsp;&nbsp;<span style="color:blue;cursor: pointer;" onclick=\'deleted(100109,"' + row.LIST_RECORD_ID + '")\'>删除</span></div>'

                }
            },
               {
                   field: 'OfficialDocumentOutName',
                   title: '标题',
                   sortable: true,
               },
                {
                    field: 'IssueDate',
                    title: '发文日期',
                    sortable: true,
                }, {
                    field: 'DocumentTypeCode',
                    title: '文种',
                    sortable: true,
                }, {
                    field: 'DocumentNo',
                    title: '发文编号',
                    sortable: true,
                },
                {
                    field: 'BusinessUnitIdName',
                    title: '发文部门',
                    sortable: true,
                },
                {
                    field: 'Author',
                    title: '拟稿人',
                    sortable: true,
                }, {
                    field: 'CreatedByName',
                    title: '提交人',
                    sortable: true,
                }, {
                    field: 'WFProcessInstanceStateCodeName',
                    title: '流程状态',
                    sortable: true,
                }, {
                    field: 'ProcessIdName',
                    title: '流程名称',
                    sortable: true,
                }, {
                    field: 'CreatedOn',
                    title: '创建日期',
                    sortable: true,
                },

            ],
            editoption: [
                //{
                //    title: '查看',
                //    f: function (id) {
                //        window.open('/a0M/e?id=' + id + '&source=l&retURL=%2f123%2fo')
                //        //lookupFieldView(id, 20211)
                //        //$('#iframe').height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '编辑',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAccount&id=' + id;
                //        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                //    },
                //},
                //{
                //    title: '删除',
                //    f: function (id) {
                //        $('.popup-mask').show()
                //        var url = '/alert/delete_ie8.html?objtypecode=20211&id=' + id;
                //        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "280px" })
                //    },
                //},
            ]
        }
    }
    ]

    return { tabList };
}