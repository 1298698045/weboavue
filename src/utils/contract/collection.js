import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
export default function useCollection() {
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
        label: '到款记录',
        name: 'caigouContract',
        summaryurl: 'contract.summary.statistics.get&Type=4',
        searchform: [],
        summary: [{
            label: '到款总金额',
            name: 'Amount',
            type: 'account'
        }, {
            label: '本月到款总金额',
            name: 'MonthReceiptAmount',
            type: 'account'
        }, {
            label: '已经匹配总金额',
            name: 'Amount1',
            type: 'account'
        }, {
            label: '未认领金额',
            name: 'Amount1',
            type: 'account'
        }],
        table: {
            objecttypecode: 10183,
            iscommon: false,
            cmd: 'entitygrid.list',
            filterquery: ['\nContractType\teq\t1'],
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
                title: '名称',
                sortable: true
            }, {
                field: 'ContractId',
                title: '合同名称',
                formatter: function formatter(value, row, index) {
                    if (value && value!='&nbsp;') {
                        return '<a href="' + $(value).attr('href') + '&objectTypeCode=1010" target="_blank">' + $(value).html() + '</a>'
                    }
                    return ''
                },
                sortable: true
            }, {
                field: 'ReceiptDate',
                title: '收款日期',
                sortable: true
            }, {
                field: 'AccountId',
                title: '付款单位',
                sortable: true
            }, {
                field: 'Amount',
                title: '金额',
                sortable: true
            }, {
                field: 'PaymentMethod',
                title: '付款方式',
                sortable: true
            }, {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true
            },
            {
                field: 'ModifiedBy',
                title: '上次修改人',
                sortable: true
            },
            {
                field: 'StatusCode',
                title: '状态',
                sortable: true
            }],
            editoption: [
                {
                    title: '认领',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractReceipt&id=' + id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                    },
                },
            ]
        }
    }, {
        label: '开票未到款',
        name: 'xiaoshouContract',
        summaryurl: 'contract.summary.statistics.get&Type=5',
        searchform: [],
        summary: [{
            label: '开票总金额',
            name: 'TotalAmount',
            type: 'account'
        }, {
            label: '开票未到款金额',
            name: 'PaymentAmount',
            type: 'account'
        }, {
            label: '本月开票未到款金额',
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
            }],
            objecttypecode: 1090,
            cmd: 'contract.collect.invoice.receipt.getlist',
            filterquery: '',
            formatOper: function (value, row, index) {
                return '<a style="color:#015ba7;font-size:13px;" onclick="showEditDialog()">付款</a>'
            },
            editoption: [
                {
                    title: '付款',
                    f: function (id) {
                        $('.popup-mask').show()
                        var url = '/layouteditor/add_layout_ie8.html?entityName=ContractReceipt&id=' + id;
                        $('#iframe').show().attr('src', url).height(620).css({ "left": "20%", "background-color": "white", "width": "60%", "max-height": "640px" })
                    },
                },
            ]
        }
    }]

    return { tabList };
}