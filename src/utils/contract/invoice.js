import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
export default function useInvoice() {
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
        label: '收票记录',
        name: 'caigouContract',
        summaryurl: 'contract.summary.statistics.get&Type=7',
        searchform: [],
        summary: [{
            label: '收票总金额',
            name: 'TotalAmount',
            type: 'account'
        },{
            label: '退票总额',
            name: 'RefundAmount',
            type: 'account'
        },{
            label: '本月收票总额',
            name: 'MonthTotalAmount',
            type: 'account'
        },{
            label: '本月退票总额',
            name: 'MonthRefundAmount',
            type: 'account'
        }],
        table: {
            objecttypecode: 1090,
            iscommon: false,
            cmd: 'entitygrid.list',
            filterquery: '\nInvoiceDirection\teq\t1',
            // formatOper: function (value, row, index) {
            //     return '<ul class="layui-nav" lay-filter="">'
            //             + '  <li class="layui-nav-item">'
            //             + '    <a href="javascript:;">更多操作</a>'
            //             + '    <dl class="layui-nav-child">'
            //             + '      <dd><a href="">操作1</a></dd>'
            //             + '      <dd><a href="">操作2</a></dd>'
            //             + '      <dd><a href="">操作3</a></dd>'
            //             + '    </dl>'
            //             + '  </li>'
            //             + '</ul>'
            // },
            columnsArray: [
                {
                    field: "Action",
                    title: "操作",
                    formatter: function formatter(value, row, index) {
                        return formatOper1(value, row, index);
                    },
                },
                {
                field: 'InvoiceNumber',
                title: '发票号',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.LIST_RECORD_ID + '\',\'1090\')">' + value + '</a>'
                }
            }, {
                field: 'Name',
                title: '发票抬头',
                sortable: true,
            }, {
                field: 'InvoiceType',
                title: '发票类型',
                sortable: true,
            }, {
                field: 'AccountId',
                title: '开票单位',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    if (value && value != '&nbsp;' && value != undefined) {
                        var href = $(value).attr('href') + '&objectTypeCode=1';
                        return '<a style="color:blue;" href="' + href + '" target="_blank">' + $(value).html() + '</a>'
                    }
                    return ''
                },
            }, {
                field: 'IssueDate',
                title: '开票日期',
                sortable: true,
            }, {
                field: 'TotalAmount',
                title: '总金额',
                sortable: true,
            }, {
                field: 'StateCode',
                title: '发票状态',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return formatOperstatecode(value, row, index);
                }
            }, {
                field: 'ContractIdName',
                title: '合同名称',
                formatter: function formatter(value, row, index) {
                    if (value && value != '&nbsp;' && value != undefined) {
                        return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                    }
                    return ''
                },
                sortable: true,
            }, {
                field: 'TaxRate',
                title: '税点',
                sortable: true,
            },
            {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true,
            },
            {
                field: 'ModifiedBy',
                title: '上次修改人',
                sortable: true,
            },
            {
                field: 'ModifiedOn',
                title: '上次修改时间',
                sortable: true,
            },
            {
                field: 'InvoiceDirection',
                title: '发票方向',
                sortable: true,
            },
            {
                field: 'StatusCode',
                title: '审批状态',
                sortable: true,
                //formatter: function formatter(value, row, index) {
                //    return formatOperstatecode(value, row, index);
                //}
            },
            ],
            editoption: [
                {
                    title: '查看',
                    f: function (id) {
                        lookupFieldView(id, 1090)
                    },
                },
                {
                    title: '退票',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=Invoice&id=' + id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
                {
                    title: '编辑',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=Invoice&id=' + id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
                {
                    title: '删除',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/alert/delete_ie8.html?objtypecode=1090&id=' + id;
                        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
            ]
        }
    }, {
        label: '开票记录',
        name: 'xiaoshouContract',
        summaryurl: 'contract.summary.statistics.get&Type=8',
        searchform: [],
        summary: [{
            label: '已开票总金额',
            name: 'TotalAmount',
            type: 'account'
        }, {
            label: '已废止发票总金额',
            name: 'StopTotalAmount',
            type: 'account'
        }, {
            label: '本月开票金额',
            name: 'MonthStopTotalAmount',
            type: 'account'
        }],
        table: {
            objecttypecode: 1090,
            iscommon: false,
            cmd: 'entitygrid.list',
            filterquery: '\nInvoiceDirection\teq\t2',
            formatOper: function (value, row, index) {
                return '<a style="color:#015ba7;font-size:13px;" onclick="showEditDialog()">付款</a>'
            },
            columnsArray: [
                {
                    field: "Action",
                    title: "操作",
                    formatter: function formatter(value, row, index) {
                        return '<div class="editoption"  data-accountid="' + row.LIST_RECORD_ID + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
                    }
                },
                {
                    field: 'InvoiceNumber',
                    title: '发票号',
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.LIST_RECORD_ID + '\',\'1090\')">' + value + '</a>'
                    }
                }, {
                    field: 'Name',
                    title: '发票抬头',
                    sortable: true,
                }, {
                    field: 'InvoiceType',
                    title: '发票类型',
                    sortable: true,
                }, {
                    field: 'AccountId',
                    title: '开票单位',
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        if (value && value != '&nbsp;' && value != undefined) {
                            var href = $(value).attr('href') + '&objectTypeCode=1';
                            return '<a style="color:blue;" href="' + href + '" target="_blank">' + $(value).html() + '</a>'
                        }
                        return ''
                    },
                }, {
                    field: 'IssueDate',
                    title: '开票日期',
                    sortable: true,
                }, {
                    field: 'TotalAmount',
                    title: '总金额',
                    sortable: true,
                }, {
                    field: 'StateCode',
                    title: '发票状态',
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        return formatOperstatecode(value, row, index);
                    }
                }, {
                    field: 'ContractIdName',
                    title: '合同名称',
                    formatter: function formatter(value, row, index) {
                        if (value && value != '&nbsp;' && value != undefined) {
                            return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                        }
                        return ''
                    },
                    sortable: true,
                }, {
                    field: 'TaxRate',
                    title: '税点',
                    sortable: true,
                },
            {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true,
            },
            {
                field: 'ModifiedBy',
                title: '上次修改人',
                sortable: true,
            },
            {
                field: 'ModifiedOn',
                title: '上次修改时间',
                sortable: true,
            },
            {
                field: 'InvoiceDirection',
                title: '发票方向',
                sortable: true,
            },
            {
                field: 'StatusCode',
                title: '审批状态',
                sortable: true,
                //formatter: function formatter(value, row, index) {
                //    return formatOperstatecode(value, row, index);
                //}
            },
            ],
            editoption: [
                {
                    title: '查看',
                    f: function (id) {
                        lookupFieldView(id, 1090)
                    },
                },
                {
                    title: '退票',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=Invoice&id=' + id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
                {
                    title: '编辑',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=Invoice&id=' + id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
                {
                    title: '删除',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/alert/delete_ie8.html?objtypecode=1090&id=' + id;
                        $('#iframe').show().attr('src', url).height(280).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    },
                },
            ]
        }
    }]

    return { tabList };
}