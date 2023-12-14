import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
export default function usePayment() {
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
        label: '付款记录',
        name: 'fukuanjilu',
        searchform: [],
        summaryurl: 'contract.summary.statistics.get&Type=1',
        summary: [{
            label: '应付款金额',
            name: 'TotalAmount',
            type: 'account'
        }, {
            label: '实际付款金额',
            name: 'PaidAmount',
            type: 'account'
        }],
        table: {
            iscommon:false,
            objecttypecode: 10182,
            cmd: 'entitygrid.list',
            filterquery: '\nContractType\teq\t2',
            formatOper: function (value, row, index) {
                return '<ul class="layui-nav" lay-filter="">'
                        + '  <li class="layui-nav-item">'
                        + '    <a href="javascript:;">更多操作</a>'
                        + '    <dl class="layui-nav-child">'
                        + '      <dd><a href="">操作1</a></dd>'
                        + '      <dd><a href="">操作2</a></dd>'
                        + '      <dd><a href="">操作3</a></dd>'
                        + '    </dl>'
                        + '  </li>'
                        + '</ul>'
            },
            columnsArray: [{
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption"  data-accountid="' + row.AccountId + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
                }
            }, {
                field: 'Name',
                title: '付款单名称',
                formatter: function formatter(value, row, index) {
                    if (value && value != '&nbsp;') {
                        return '<a style="color:blue;" href="' + $(value).attr('href') + '" target="_blank">' + $(value).html() + '</a>'
                    }
                    return ''
                },
                sortable: true
            }, {
                field: 'BillNo',
                title: '付款单号',
                sortable: true
            }, {
                field: 'ContractId',
                title: '合同名称',
                formatter: function formatter(value, row, index) {
                    if (value && value != '&nbsp;') {
                        return '<a style="color:blue;" href="' + $(value).attr('href') + '&objectTypeCode=1010" target="_blank">' + $(value).html() + '</a>'
                    }
                    return ''
                },
                sortable: true
            },
            {
                field: 'ContractNumber',
                title: '合同编号',
                sortable: true
            },
            {
                field: 'Amount',
                title: '付款金额',
                sortable: true
            },
            {
                field: 'DeptId',
                title: '申请部门',
                sortable: true
            },
            {
                field: 'ApplyDate',
                title: '申请日期',
                sortable: true
            },
            {
                field: 'OwningUser',
                title: '申请人',
                sortable: true
            }, {
                field: 'StatusCode',
                title: '审批状态',
                sortable: true
            }, {
                field: 'PaymentCategory',
                title: '款项类别',
                sortable: true
            }, {
                field: 'PaymentMethod',
                title: '付款方式',
                sortable: true
            }, {
                field: 'ContractPlanId',
                title: '付款计划',
                sortable: true
            }, {
                field: 'InvoiceId',
                title: '相关发票',
                sortable: true
            }, {
                field: 'AccountName',
                title: '收款单位全称',
                sortable: true
            }, {
                field: 'PayedOn',
                title: '付款日期',
                sortable: true
            }, {
                field: 'AccountId',
                title: '付款单位',
                sortable: true
            }, {
                field: 'BankName',
                title: '收款单位开户行',
                sortable: true
            },
            {
                field: 'BankNumber',
                title: '收款单位银行账号',
                sortable: true
            }],
            editoption: [
                /*{
                    title: '查看合同',
                    f: function (id, AccountId) {
                        window.open('/800/detail?objectTypeCode=1010&id=' + id)
                    },
                },*/
                {
                    title: '查看审批单',
                    f: function (id) {
                        window.open('/a0M/e?source=i&id=' + id)
                    }
                }
            ]
        }
    }, {
        label: '收票未付款',
        name: 'shoupiaoweifukuan',
        searchform: [],
        summaryurl: 'contract.summary.statistics.get&Type=2',
        summary: [{
            label: '收票总额',
            name: 'TotalAmount',
            type: 'TotalAmount'
        }, {
            label: '收票未付款总额',
            name: 'UnPaidAmount',
            type: 'account'
        }],
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption"  data-accountid="' + row.InvoiceId + '" data-id="' + row.LIST_RECORD_ID + '">付款<i class="layui-icon layui-icon-down"></i></div>'
                }
            }, {
                field: 'InvoiceNumber',
                title: '发票票号',
                sortable: true
            }, {
                field: 'AccountIdName',
                title: '开票单位',
                sortable: true
            }, {
                field: 'TotalAmount',
                title: '发票金额',
                sortable: true
            }, {
                field: 'ContractTitle',
                title: '相关合同',
                sortable: true
            }, {
                field: 'ContractNumber',
                title: '合同编号',
                sortable: true
            }, {
                field: 'ContractTotalAmount',
                title: '合同总金额',
                sortable: true
            }, {
                field: 'IssueDate',
                title: '开票时间',
                sortable: true
            },
            {
                field: 'CreatedOn',
                title: '收票时间',
                sortable: true
            },
            {
                field: 'ProcessInstanceName',
                title: '付款流程',
                sortable: true
            }, {
                field: 'ProcessInstanceName',
                title: '相关流程',
                sortable: true,
            }],
            cmd: 'contract.invoice.notpay.getlist',
            objecttypecode: 1090,
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<a style="color:#015ba7;font-size:13px;" onclick="showEditDialog()">付款</a>'
            },
        }
    }, {
        label: '应付计划表',
        name: 'yingfujihuabiao',
        summaryurl: 'contract.summary.statistics.get&Type=3',
        searchform: [],
        summary: [{
            label: '已付款总金额',
            name: 'TotalAmount',
            type: 'account'
        }, {
            label: '申请付款总金额',
            name: 'PaymentAmount',
            type: 'account'
        }, {
            label: '本月收票总额',
            name: 'MonthAmount',
            type: 'account'
        },  {
            label: '本月付款总额',
            name: 'MonthPaymentAmount',
            type: 'account'
        }],
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption"  data-accountid="' + row.LIST_RECORD_ID + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
                }
            }, {
                field: 'Name',
                title: '阶段名称',
                sortable: false
            }, {
                field: 'ContractNumber',
                title: '合同号',
                sortable: true
            }, {
                field: 'ContractIdTitle',
                title: '合同名称',
                formatter: function formatter(value, row, index) {
                    if (value && value != '&nbsp;') {
                        return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                    }
                    return ''
                },
                sortable: true
            }, {
                field: 'Rate',
                title: '比例',
                sortable: false
            } , {
                field: 'Amount',
                title: '应付金额',
                sortable: true
            }, {
                field: 'PlanPayOn',
                title: '计划付款时间',
                sortable: true
            },{
                field: 'StatusCodeName',
                title: '付款状态',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return formatOperstatecode(value, row, index);
                }
            }, {
                field: 'OwningUserName',
                title: '执行人',
                sortable: true
            }, {
                field: 'AccountIdName',
                title: '供应商名称',
                sortable: true
            }],
            cmd: 'contract.plan.getlist',
            objecttypecode: 1012,
            filterquery: '',
            formatOper: function (value, row, index) {
                return ''
            },
            editoption: [
                {
                    title: '查看',
                    f: function (id) {
                        lookupFieldView(id, 1012)
                        $('#iframe').height(640).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                    }
                },
                {
                    title: '编辑',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractPlan&id=' + id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%" })
                    }
                },
                {
                    title: '付款申请',
                    f: function (id) {
                        alert("待升级");
                    }
                }
          ]
        }
    },{
    label: '合同付款',
    name: 'yingfujihuabiao',
    searchform: [],
    summary: [],
    table: {
        columnsArray: [{
            field: 'ids',
            checkbox: true
        }, {
            field: "Action",
            title: "操作",
            formatter: function formatter(value, row, index) {
                return '<div class="editoption"  data-accountid="' + row.AccountId + '" data-id="' + row.LIST_RECORD_ID + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            }
        }, {
            field: 'ContractNumber',
            title: '合同号',
            sortable: true,
        }, {
            field: 'Title',
            title: '合同名称',
            sortable: true,
            //formatter: function formatter(value, row, index) {
            //    return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.ContractId + '\',\'1010\')">' + value + '</a>'
            //}
            formatter: function formatter(value, row, index) {
                //return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.ContractId + '\',\'1010\')">' + value + '</a>'
                return '<a style="color:blue; cursor:pointer;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
            }
        }, {
            field: 'AccountIdName',
            title: '供应商名称',
            sortable: true,
            formatter: function formatter(value, row, index) {
                var filterquery = 'Account//eq//' + row.AccountId
                return '<a style="color:blue; cursor:pointer;" onclick=\'formcomponents.chooselookup("10182","","","","' + filterquery + '","readonly")\'>' + row.AccountIdName + '</a>'
            }
        }, {
            field: 'contractTotalAmount',
            title: '合同金额',
            sortable: true,
        }, {
            field: 'invoiceAmount',
            title: '已开票金额',
            sortable: true,
        }, {
            field: 'PaidAmount',
            title: '已付金额',
            sortable: true,
        }, {
            field: 'UnpaidAmount',
            title: '未付金额',
            sortable: true,
        },{
            field: 'paymentProgress',
            title: '付款进度',
            sortable: true,
            formatter: function formatter(value, row, index) {
                return formatOperprogeress(value, row, index);
            }
        }, {
            field: 'Invoices',
            title: '相关发票',
            formatter: function formatter(value, row, index) {
                var filterquery = 'ContractId//eq//' + row.ContractId
                return '<a style="color:blue;cursor:pointer;" onclick=\'formcomponents.chooselookup("1090","","","","' + filterquery + '","readonly")\'>相关发票</a>'
            }
        }, {
            field: 'Payments',
            title: '付款记录',
            formatter: function formatter(value, row, index) {
                var filterquery = 'ContractId//eq//' + row.ContractId
                return '<a style="color:blue;cursor:pointer;" onclick=\'formcomponents.chooselookup("10182","","","","' + filterquery + '","readonly")\'>付款记录</a>'
            }
        }],
        cmd: 'contract.payment.getlist',
        objecttypecode: 1010,
        filterquery: '',
        formatOper: function (value, row, index) {
            return ''
        },
        editoption: [
                /*{
                    title: '查看合同',
                    f: function (id, AccountId) {
                        window.open('/800/detail?objectTypeCode=1010&id=' + id)
                    },
                },*/
                {
                    title: '查看审批单',
                    f: function (id) {
                        window.open('/a0M/e?source=i&id=' + id)
                    }
                }
        ]
    }
    },
    {
    label: '付款未开发票',
    name: 'fukuanweikaifapiao',
    searchform: [],
    summaryurl: 'contract.summary.statistics.get&Type=1',
    summary: [],
    table: {
        cmd: 'contract.payment.not.invoice.list',
        objecttypecode: 10182,
        filterquery: '',
        formatOper: function (value, row, index) {
            return ''
        },
        columnsArray: [
        //{
        //    field: "Action",
        //    title: "操作",
        //    formatter: function formatter(value, row, index) {
        //        return '<div class="editoption"  data-accountid="' + row.AccountId + '" data-id="' + row.ContractId + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
        //    }
        //},
        {
            field: 'Name',
            title: '付款单名称',
            sortable: true,
        }, {
            field: 'BillNo',
            title: '付款单号',
            sortable: true,
        }, {
            field: 'Amount',
            title: '付款金额',
            sortable: true,
        }, {
            field: 'ContractNumber',
            title: '合同编号',
            sortable: true,
        }, {
            field: 'ContractIdTitle',
            title: '合同名称',
            formatter: function formatter(value, row, index) {
                if (value && value != '&nbsp;') {
                    return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                }
                return ''
            },
            sortable: true,
        }, {
            field: 'StatusCodeName',
            title: '付款状态',
            sortable: true,
        }, {
            field: 'PaymentMethod',
            title: '付款方式',
            sortable: true,
        }, {
            field: 'PlanName',
            title: '付款计划',
            sortable: true,
        }, {
            field: 'PayedOn',
            title: '付款日期',
            sortable: true,
        }, {
            field: 'AccountName',
            title: '付款单位',
            sortable: true,
        }],
        editoption: [
        ]
    }
}, 
    ]

    return { tabList };
}