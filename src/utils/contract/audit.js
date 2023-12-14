import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
export default function useAudit() {
    const formatOperstatecode = (value, row, index) => {
        var color = ''
        if (value == '执行中' || value == '未付款' || value == '履约中' || value == '履行中' || value == '流转中' || value == '运行中') {
            color = '#5AAAFF'
        } else if (value == '已付款' || value == '已完成') {
            color = '#31BA6A'
        } else if (value == '已开票') {
            color = 'orange'
        } else if (value == '已取消' || value == '已退票取消') {
            color = '#555'
        } else if (value == '已过期' || value == '已废止') {
            color = '#aaa'
        }
        else if (value == '内容变更' || value == '变更') {
            color = '#F3C774'
        }
        else if (value == '合同终止' || value == '终止') {
            color = '#F9A6AB'
        }
        else if (value == '合同暂停' || value == '暂停') {
            color = '#8DAAFF'
        }
        else if (value == '合同解除' || value == '解约') {
            color = '#555'
        }
        else if (value == '草稿') {
            color = '#bbb'
        }
        else if (value == '已撤销' || value == '已退回' || value == '退回') {
            color = '#FF5722'
        }
        return '<div class="tag-format" style="display: block;margin:0 auto;width:69px;line-height:24px;color:#fff;text-align: center;border-radius: 10px;background: ' + color + '">' + value + '</div>'
    }
    const formatOper1 = (value, row, index) => {
        var str = `
        <div class="iconBox">
            <div class="popup">
            <div class="option-item" id=${row.ProcessInstanceId} onclick="handleTo('${row.ProcessInstanceId}')">查看</div>
            <div class="option-item" onclick="EditFlow('${row.LIST_RECORD_ID}')">退票</div>  
            <div class="option-item" onclick="handleJump('${row.ProcessId}','${row.ProcessIdName}','${row.ProcessInstanceId}')">编辑</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleCountersign('${row.ProcessId}','${row.ProcessIdName}','${row.ProcessInstanceId}')">删除</div>
            </div>
            <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
        `
        return str;
    }
    const tabList = [{
        label: '待审批审计',
        name: 'caigouContract',
        summaryurl: 'contract.summary.statistics.get&Type=0',
        searchform: [{
            label: '合同名称',
            name: 'ContractId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 1010
        }, {
            label: '审计报告',
            name: 'AuditReportId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10186
        }, {
            label: '抽查时间',
            name: 'AuditedOn',
            placeholder: "请填写内容",
            type: 'D',
            objtypecode: 30020
        }],
        issearchform: true,
        summary: [],
        table: {
            objecttypecode: 10185,
            cmd: 'contract.audit.getlist&type=1',
            //filterquery: ['\nProcessInstanceStateCode\teq\t3', '\nStatusCode\teq\t1'],
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [{
                field: 'LIST_RECORD_ID',
                checkbox: true
            }, {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption" data-name="' + $(row.Name).html() + '" data-accountid="' + row.ProcessInstanceStateCode + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

                }
            }, {
                field: 'ContractTitle',
                title: '合同名称',
                sortable: true,
                //formatter: function formatter(value, row, index) {
                //    return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.LIST_RECORD_ID + '\',\'10185\')">' + $(value).html() + '</a>'
                //}
                //formatter: function formatter(value, row, index) {
                //    if (value && value!='&nbsp;') {
                //        return '<a style="color:blue;" href="' + $(value).attr('href') + '&objectTypeCode=1010" target="_blank">' + $(value).html() + '</a>'
                //    }
                //    return ''
                //}
                formatter: function formatter(value, row, index) {
                    if (value && value != '&nbsp;') {
                        return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                    }
                    return ''
                },
            }, {
                field: 'ContractNumber',
                title: '合同编号',
                sortable: true
            }, {
                field: 'ContractTotalPrice',
                title: '合同金额',
                sortable: true
            }, {
                field: 'StatusCodeName',
                title: '审计状态',
                sortable: true
            }, {
                field: 'AuditedByName',
                title: '审计人',
                sortable: true
            }, {
                field: 'AuditedOn',
                title: '审计日期',
                sortable: true
            }, {
                field: 'AuditReportName',
                title: '审计报告名称',
                sortable: true
            }, {
                field: 'ProcessInstanceStateCodeName',
                title: '审批状态',
                sortable: true
            }, {
                field: 'CurrentStepName',
                title: '当前步骤',
                sortable: true
            }, {
                field: 'Rate',
                title: '评分',
                sortable: true
            }, {
                field: 'ApplyIdName',
                title: '申请人',
                sortable: true
            }, {
                field: 'GUIKOUBUMENName',
                title: '归口部门',
                sortable: true
            }, {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            }],
            editoption: [
                {
                    title: '审批',
                    f: function (LIST_RECORD_ID, ProcessInstanceStateCode, Name) {
                        window.open('/a0M/e?source=i&id=' + LIST_RECORD_ID + '&retURL=')

                       //debugger;
                        // if (ProcessInstanceStateCode == '' || ProcessInstanceStateCode=="0") {
                            //var processId = "D387BEC8-5068-44C6-A57A-E5990EE5AF1F"
                            //processEntityIntanceSubmit(LIST_RECORD_ID, processId, Name)
                        //}
                        //else{
                        //    layer.msg('审批流程已提交，请勿重复提交')
                        //}
                    },
                },
                //{
                //    title: '查看审批单',
                //    f: function (LIST_RECORD_ID, ProcessInstanceStateCode) {
                //        // if (ProcessInstanceStateCode != '0'&& ProcessInstanceStateCode != '') {
                //        window.open('/a0M/e?source=i&id=' + LIST_RECORD_ID + '&retURL=%2f123%2fo')
                //       // }
                //       // else {
                //       //     layer.msg('审批流程未提交，无法查看流程')
                //       // }
                //    },
                //},
                {
                    title: '查看',
                    f: function (Id) {
                        //window.open('/C85/detail?objectTypeCode=10185&id=' + Id)
                        lookupFieldView(Id, 10185)
                        $('#iframe').height(640).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                    },
                },
                {
                    title: '编辑',
                    f: function (Id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAudit&id=' + Id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
                {
                    title: '删除',
                    f: function (Id) {
                        $('.popup-mask').show()
                        var url = '/alert/delete1.html?id=' + Id;
                        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
            ]
        }
    }, {
        label: '流转中审计',
        name: 'caigouContract',
        summaryurl: 'contract.summary.statistics.get&Type=0',
        searchform: [{
            label: '合同名称',
            name: 'ContractId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 1010
        }, {
            label: '审计报告',
            name: 'AuditReportId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10186
        }, {
            label: '抽查时间',
            name: 'AuditedOn',
            placeholder: "请填写内容",
            type: 'D',
            objtypecode: 30020
        }],
        issearchform: true,
        summary: [],
        table: {
            objecttypecode: 10185,
            cmd: 'contract.audit.getlist&type=2',
            //filterquery: ['\nProcessInstanceStateCode\teq\t3', '\nStatusCode\teq\t1'],
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [{
                field: 'LIST_RECORD_ID',
                checkbox: true
            }, {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption" data-name="' + $(row.Name).html() + '" data-accountid="' + row.ProcessInstanceStateCode + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

                }
            }, {
                field: 'ContractTitle',
                title: '合同名称',
                sortable: true,
                //formatter: function formatter(value, row, index) {
                //    return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.LIST_RECORD_ID + '\',\'10185\')">' + $(value).html() + '</a>'
                //}
                //formatter: function formatter(value, row, index) {
                //    if (value && value != '&nbsp;') {
                //        return '<a style="color:blue;" href="' + $(value).attr('href') + '&objectTypeCode=1010" target="_blank">' + $(value).html() + '</a>'
                //    }
                //    return ''
                //}
                formatter: function formatter(value, row, index) {
                    if (value && value != '&nbsp;') {
                        return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                    }
                    return ''
                },
            }, {
                field: 'ContractNumber',
                title: '合同编号',
                sortable: true
            }, {
                field: 'ContractTotalPrice',
                title: '合同金额',
                sortable: true
            }, {
                field: 'StatusCodeName',
                title: '审计状态',
                sortable: true
            }, {
                field: 'AuditedByName',
                title: '审计人',
                sortable: true
            }, {
                field: 'AuditedOn',
                title: '审计日期',
                sortable: true
            }, {
                field: 'AuditReportName',
                title: '审计报告名称',
                sortable: true
            }, {
                field: 'ProcessInstanceStateCodeName',
                title: '审批状态',
                sortable: true
            }, {
                field: 'CurrentStepName',
                title: '当前步骤',
                sortable: true
            }, {
                field: 'Rate',
                title: '评分',
                sortable: true
            }, {
                field: 'ApplyIdName',
                title: '申请人',
                sortable: true
            }, {
                field: 'GUIKOUBUMENName',
                title: '归口部门',
                sortable: true
            }, {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            }],
            editoption: [
                {
                    title: '审批',
                    f: function (LIST_RECORD_ID, ProcessInstanceStateCode, Name) {
                        window.open('/a0M/e?source=i&id=' + LIST_RECORD_ID + '&retURL=')

                        //debugger;
                        // if (ProcessInstanceStateCode == '' || ProcessInstanceStateCode=="0") {
                        //var processId = "D387BEC8-5068-44C6-A57A-E5990EE5AF1F"
                        //processEntityIntanceSubmit(LIST_RECORD_ID, processId, Name)
                        //}
                        //else{
                        //    layer.msg('审批流程已提交，请勿重复提交')
                        //}
                    },
                },
                //{
                //    title: '查看审批单',
                //    f: function (LIST_RECORD_ID, ProcessInstanceStateCode) {
                //        // if (ProcessInstanceStateCode != '0'&& ProcessInstanceStateCode != '') {
                //        window.open('/a0M/e?source=i&id=' + LIST_RECORD_ID + '&retURL=%2f123%2fo')
                //        // }
                //        // else {
                //        //     layer.msg('审批流程未提交，无法查看流程')
                //        // }
                //    },
                //},
                {
                    title: '查看',
                    f: function (Id) {
                        //window.open('/C85/detail?objectTypeCode=10185&id=' + Id)
                        lookupFieldView(Id, 10185)
                        $('#iframe').height(640).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                    },
                },
                {
                    title: '编辑',
                    f: function (Id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAudit&id=' + Id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
                //{
                //    title: '删除',
                //    f: function (Id) {
                //        $('.popup-mask').show()
                //        var url = '/alert/delete1.html?id=' + Id;
                //        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%" })
                //    },
                //},
            ]
        }
    }, {
        label: '审批完成审计',
        name: 'caigouContract',
        summaryurl: 'contract.summary.statistics.get&Type=0',
        searchform: [{
            label: '合同名称',
            name: 'ContractId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 1010
        }, {
            label: '审计报告',
            name: 'AuditReportId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10185
        }, {
            label: '审计时间',
            name: 'AuditedOn',
            placeholder: "请填写内容",
            type: 'D',
            objtypecode: 30020
        }],
        issearchform: true,
        summary: [],
        table: {
            objecttypecode: 10185,
            cmd: 'contract.audit.getlist&type=3',
            //filterquery: ['\nProcessInstanceStateCode\teq\t3', '\nStatusCode\teq\t3'],
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.ValueId + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [{
                field: 'LIST_RECORD_ID',
                checkbox: true
            }, {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption" data-accountid="' + row.LIST_RECORD_ID + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

                }
            },{
                field: 'ContractTitle',
                title: '合同名称',
                sortable: true,
                //formatter: function formatter(value, row, index) {
                //    //return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.ContractId + '\',\'10185\')">' + value + '</a>'
                //    return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                //}
                //formatter: function formatter(value, row, index) {
                //    if (value && value!='&nbsp;') {
                //        return '<a style="color:blue;" href="' + $(value).attr('href') + '&objectTypeCode=1010" target="_blank">' + $(value).html() + '</a>'
                //    }
                //    return ''
                //}
                formatter: function formatter(value, row, index) {
                    if (value && value != '&nbsp;') {
                        return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                    }
                    return ''
                },
            }, {
                field: 'ContractNumber',
                title: '合同编号',
                sortable: true,
            }, {
                field: 'ContractTotalPrice',
                title: '合同金额',
                sortable: true,
            }, {
                field: 'StatusCodeName',
                title: '审计状态',
                sortable: true,
            }, {
                field: 'AuditedByName',
                title: '审计人',
                sortable: true,
            }, {
                field: 'AuditedOn',
                title: '审计日期',
                sortable: true,
            }, {
                field: 'AuditReportName',
                title: '审计报告名称',
                sortable: true,
            }, {
                field: 'ProcessInstanceStateCodeName',
                title: '审批状态',
                sortable: true
            }, {
                field: 'Rate',
                title: '评分',
                sortable: true,
            }, {
                field: 'ApplyIdName',
                title: '申请人',
                sortable: true
            }, {
                field: 'GUIKOUBUMENName',
                title: '归口部门',
                sortable: true
            }, {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true,
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true,
            }],
            editoption: [
                {
                    title: '查看审批单',
                    f: function (id) {
                        window.open('/a0M/e?source=i&id=' + id)
                    }
                },
                {
                    title: '查看',
                    f: function (id) {
                        //window.open('/C85/detail?objectTypeCode=10185&id=' + id)
                        lookupFieldView(id, 10185)
                        $('#iframe').height(640).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                    },
                },
                {
                    title: '编辑',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAudit&id=' + id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
                {
                    title: '删除',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/alert/delete_ie8.html?objtypecode=10185&id=' + id;
                        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
            ]
        }
    },
    {
        label: '未生成报告审计',
        name: 'caigouContract',
        summaryurl: 'contract.summary.statistics.get&Type=0',
        searchform: [{
            label: '合同名称',
            name: 'ContractId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 1010
        }, {
            label: '审计报告',
            name: 'AuditReportId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10186
        }, {
            label: '抽查时间',
            name: 'AuditedOn',
            placeholder: "请填写内容",
            type: 'D',
            objtypecode: 30020
        }],
        issearchform: true,
        summary: [],
        table: {
            objecttypecode: 10185,
            cmd: 'contract.audit.getlist&type=4',
            //filterquery: ['\nProcessInstanceStateCode\teq\t3', '\nStatusCode\teq\t1'],
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [{
                field: 'LIST_RECORD_ID',
                checkbox: true
            }, {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption" data-name="' + $(row.Name).html() + '" data-accountid="' + row.ProcessInstanceStateCode + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

                }
            }, {
                field: 'ContractTitle',
                title: '合同名称',
                sortable: true,
                //formatter: function formatter(value, row, index) {
                //    return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.LIST_RECORD_ID + '\',\'10185\')">' + $(value).html() + '</a>'
                //}
                //formatter: function formatter(value, row, index) {
                //    if (value && value != '&nbsp;') {
                //        return '<a style="color:blue;" href="' + $(value).attr('href') + '&objectTypeCode=1010" target="_blank">' + $(value).html() + '</a>'
                //    }
                //    return ''
                //}
                formatter: function formatter(value, row, index) {
                    if (value && value != '&nbsp;') {
                        return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                    }
                    return ''
                },
            }, {
                field: 'ContractNumber',
                title: '合同编号',
                sortable: true
            }, {
                field: 'ContractTotalPrice',
                title: '合同金额',
                sortable: true
            }, {
                field: 'StatusCodeName',
                title: '审计状态',
                sortable: true
            }, {
                field: 'AuditedByName',
                title: '审计人',
                sortable: true
            }, {
                field: 'AuditedOn',
                title: '审计日期',
                sortable: true
            }, {
                field: 'AuditReportName',
                title: '审计报告名称',
                sortable: true
            }, {
                field: 'ProcessInstanceStateCodeName',
                title: '审批状态',
                sortable: true
            }, {
                field: 'CurrentStepName',
                title: '当前步骤',
                sortable: true
            }, {
                field: 'Rate',
                title: '评分',
                sortable: true
            }, {
                field: 'ApplyIdName',
                title: '申请人',
                sortable: true
            }, {
                field: 'GUIKOUBUMENName',
                title: '归口部门',
                sortable: true
            }, {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            }],
            editoption: [
                {
                    title: '审批',
                    f: function (LIST_RECORD_ID, ProcessInstanceStateCode, Name) {
                        window.open('/a0M/e?source=i&id=' + LIST_RECORD_ID + '&retURL=')

                        //debugger;
                        // if (ProcessInstanceStateCode == '' || ProcessInstanceStateCode=="0") {
                        //var processId = "D387BEC8-5068-44C6-A57A-E5990EE5AF1F"
                        //processEntityIntanceSubmit(LIST_RECORD_ID, processId, Name)
                        //}
                        //else{
                        //    layer.msg('审批流程已提交，请勿重复提交')
                        //}
                    },
                },
                {
                    title: '查看审批单',
                    f: function (LIST_RECORD_ID, ProcessInstanceStateCode) {
                        // if (ProcessInstanceStateCode != '0'&& ProcessInstanceStateCode != '') {
                        window.open('/a0M/e?source=i&id=' + LIST_RECORD_ID + '&retURL=%2f123%2fo')
                        // }
                        // else {
                        //     layer.msg('审批流程未提交，无法查看流程')
                        // }
                    },
                },
                {
                    title: '查看',
                    f: function (Id) {
                        //window.open('/C85/detail?objectTypeCode=10185&id=' + Id)
                        lookupFieldView(Id, 10185)
                        $('#iframe').height(640).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                    },
                },
                {
                    title: '编辑',
                    f: function (Id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAudit&id=' + Id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
                {
                    title: '删除',
                    f: function (Id) {
                        $('.popup-mask').show()
                        var url = '/alert/delete1.html?id=' + Id;
                        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
            ]
        }
    },
    {
        label: '审计报告',
        name: 'contractAuditReport',
        summaryurl: 'contract.summary.statistics.get&Type=0',
        searchform: [{
            label: '报告名称',
            name: 'LIST_RECORD_ID',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10186
        }, {
            label: '审计状态',
            name: 'StatusCode',
            placeholder: "请填写内容",
            type: 'S'
        }, {
            label: '审批状态',
            name: 'ProcessInstanceStateCodeName',
            placeholder: "请填写内容",
            type: 'S'
        }, {
            label: '审计时间',
            name: 'AuditedOn',
            placeholder: "请填写内容",
            type: 'D',
            objtypecode: 30020
        }],
        issearchform: true,
        summary: [],
        table: {
            objecttypecode: 10186,
            cmd: 'contract.auditreport.getlist',
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.ValueId + '" data-id="' + row.ValueId + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [{
                field: 'LIST_RECORD_ID',
                checkbox: true
            }, {
                field: 'Action',
                title: '操作',
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption" data-accountid="' + row.LIST_RECORD_ID + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'

                }
            }, {
                field: 'Name',
                title: '报告名称',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.ContractId + '\',\'10186\')">' + value + '</a>'
                }
            }, {
                field: 'ApplyIdName',
                title: '申请人',
                sortable: true
            }, {
                field: 'AuditedOn',
                title: '审计日期',
                sortable: true
            }, {
                field: 'StatusCode',
                title: '审计状态',
                sortable: true
            }, {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true
            },
            {
                field: 'AuditedOn',
                title: '审计日期',
                sortable: true
            },
            {
                field: 'AuditScope',
                title: '审计范围',
                sortable: true
            },
            {
                field: 'ProcessInstanceStateCodeName',
                title: '审批状态',
                sortable: true
            },
            {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            }],
            editoption: [
                {
                    title: '查看报告',
                    f: function (id) {
                        window.open('/a0M/e?source=i&id=' + id)
                    }
                },
                //{
                //    title: '查看报告',
                //    f: function (id) {
                //        window.open('/C86/detail?objectTypeCode=10186&id=' + id)
                //    },
                //},
                {
                    title: '编辑报告',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractAuditReport&id=' + id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
                {
                    title: '删除报告',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/alert/delete_ie8.html?objtypecode=10186&id=' + id;
                        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
            ]
        }
    }]

    return { tabList };
}