import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
export default function useExecution() {
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
    function formatOperprogeress(value, row, index) {
        return '<div class="layui-progress"><div class="layui-progress-bar layui-bg-blue" lay-percent="' + (value < 1 ? value * 100 : value / 100) + '%"></div></div><span class="layui-progress-text">' + (value < 1 ? value * 100 : value / 100).toFixed(2) + '%</span>'
    }
    const formatOper1 = (value, row, index) => {
        var str = `
        <div class="iconBox">
            <div class="popup">
            <div class="option-item" id=${row.ProcessInstanceId} onclick="handleTo('${row.ProcessInstanceId}')">查看合同</div>
            <div class="option-item" onclick="EditFlow('${row.LIST_RECORD_ID}')">新建收票</div>  
            <div class="option-item" onclick="handleJump('${row.ProcessId}','${row.ProcessIdName}','${row.ProcessInstanceId}')">设置计划</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleCountersign('${row.ProcessId}','${row.ProcessIdName}','${row.ProcessInstanceId}')">查看会签单</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleCountersign('${row.ProcessId}','${row.ProcessIdName}','${row.ProcessInstanceId}')">上传签章版</div>
            </div>
            <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
        `
        return str;
    }
    const tabList = [
        {
        label: '付款类合同',
        name: 'caigouContract',
        summaryurl: 'contract.summary.statistics.get&Type=0&ContractType=2',
        searchform: [],
        summary: [{
            label: '合同总数',
            name: 'ContractNumber',
            type: 'wancheng'
        }, {
            label: '合同总金额',
            name: 'Total',
            type: 'account'
        }, {
            label: '履行中金额',
            name: 'ImplementTotal',
            type: 'account'
        }, {
            label: '暂停合同总金额',
            name: 'StopTotal',
            type: 'account'
        }, {
            label: '解除合同总金额',
            name: 'SuspendedTotal',
            type: 'account'
        }],
        table: {
            objecttypecode: 1010,
            cmd: 'contract.owner.getlist&ContractType=2',
            filterquery: ['\nContractType\teq\t2\nOwningUser\teq-userid'],
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.AccountId + '" data-id="' + row.ContractId + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return formatOper1(value,row,index);
                }
            }, {
                field: 'Title',
                title: '合同名称',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    //return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.ContractId + '\',\'1010\')">' + value + '</a>'
                    return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                }
            }, {
                field: 'ContractNumber',
                title: '合同编号',
                sortable: true,
            }, {
                field: 'AccountIdName',
                title: '合作方',
                sortable: true,
            }, {
                field: 'ActiveOn',
                title: '开始日期',
                sortable: true,
            }, {
                field: 'ExpiresOn',
                title: '截止日期',
                sortable: true,
            }, {
                field: 'TotalPrice',
                title: '合同总额',
                sortable: true,
            }, {
                field: 'PaidAmount',
                title: '已付金额',
                sortable: true,
            }, {
                field: 'UnpaidAmount',
                title: '未付金额',
                sortable: true,
            }, {
                field: 'StateCodeName',
                title: '合同状态',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return formatOperstatecode(value, row, index);
                }
            }, {
                field: 'WfprocessinstancesStateCodeName',
                title: '审批状态',
                sortable: true,
            }, {
                field: 'PaymentPercentage',
                title: '付款进度',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return formatOperprogeress(value, row, index);
                }
            }, {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true,
            }, {
                field: 'IsArchived',
                title: '是否归档',
                sortable: true
            }, {
                field: 'ArchivedOn',
                title: '归档日期',
                sortable: true
            }],
            editoption: [{
                title: '查看合同',
                f: function (id) {
                    window.open('/800/detail?objectTypeCode=1010&id=' + id)
                },
            }, {
                title: '新建收票',
                f: function (id, AccountId) {
                    $('.popup-mask').show()
                    var url = '/layouteditor/add_layoutandupload.html?entityName=Invoice&type=related&dataname=InvoiceDirection&datavalue=2'
                    url += '&relatedObjectAttributeName=AccountId,ContractId&inContextOfRecordId=' + AccountId + ',' + id
                    $('#iframe').show().attr('src', url)
                },
            }, {
                title: '设置计划',
                f: function (id, AccountId, name, amount) {
                    //$('.popup-mask').show()
                    //var url = '/layouteditor/add_layout_ie8.html?entityName=ContractPlan&type=related'
                    //url += '&relatedObjectAttributeName=ContractId&inContextOfRecordId=' + ContractId
                    //$('#iframe').show().attr('src', url)
                    $('.popup-mask').show()
                    $('#iframe').attr('src', '/alert/cntrt/batch_add_cntrplan.html?pid=' + id + '&pname=' + name + '&pamount=' + amount).height(620).css('margin-top', '-300px');
                    $('#iframe').show();
                },
            }, {
                title: '查看会签单',
                f: function (id) {
                    window.open('/a0M/e?source=i&id=' + id)
                },

            },
            {
                title: '上传签章版',
                f: function (id, AccountId, name, amount) {
                    //$('.popup-mask').show()
                    //var url = '/layouteditor/add_layout_ie8.html?entityName=ContractPlan&type=related'
                    //url += '&relatedObjectAttributeName=ContractId&inContextOfRecordId=' + ContractId
                    //$('#iframe').show().attr('src', url)
                    $('.popup-mask').show()
                    $('#iframe').attr('src', '/alert/contract/add_contractupload.html?id=' + id).height(360);
                    $('#iframe').show();
                },
            },
            //{
            //    title: '新建付款',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同暂停',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同变更',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同解除',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同终止',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同结项',
            //    f: function (id) {
            //    },
            //}
            ]
        }
        },
    {
        label: '收款类合同',
        name: 'xiaoshouContract',
        searchform: [],
        summaryurl: 'contract.summary.statistics.get&Type=0&ContractType=1',
        summary: [{
            label: '合同总数',
            name: 'ContractNumber',
            type: 'wancheng'
        }, {
            label: '合同总金额',
            name: 'Total',
            type: 'account'
        }, {
            label: '履行中金额',
            name: 'ImplementTotal',
            type: 'account'
        }, {
            label: '暂停合同总金额',
            name: 'StopTotal',
            type: 'account'
        }, {
            label: '解除合同总金额',
            name: 'SuspendedTotal',
            type: 'account'
        }
        ],
        table: {
            objecttypecode: 1010,
            cmd: 'contract.owner.getlist&ContractType=1',
            filterquery: ['\nContractType\teq\t1\nOwningUser\teq-userid'],
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.AccountId + '" data-id="' + row.ContractId + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption"  data-amount="' + row.TotalPrice + '" data-name="' + row.Title + '" data-accountid="' + row.AccountId + '" data-id="' + row.ContractId + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
                }
            }, {
                field: 'Title',
                title: '合同名称',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    //return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.ContractId + '\',\'1010\')">' + value + '</a>'
                    return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                }
            }, {
                field: 'ContractNumber',
                title: '合同编号',
                sortable: true,
            }, {
                field: 'AccountIdName',
                title: '合作方',
                sortable: true,
            }, {
                field: 'ActiveOn',
                title: '开始日期',
                sortable: true,
            }, {
                field: 'ExpiresOn',
                title: '截止日期',
                sortable: true,
            }, {
                field: 'TotalPrice',
                title: '合同总额',
                sortable: true,
            }, {
                field: 'PaidAmount',
                title: '已付金额',
                sortable: true,
            }, {
                field: 'UnpaidAmount',
                title: '未付金额',
                sortable: true,
            }, {
                field: 'StateCodeName',
                title: '合同状态',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return formatOperstatecode(value, row, index);
                }
            }, {
                field: 'WfprocessinstancesStateCodeName',
                title: '审批状态',
                sortable: true,
            }, {
                field: 'PaymentPercentage',
                title: '付款进度',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return formatOperprogeress(value, row, index);
                }
            }, {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true,
            }, {
                field: 'IsArchived',
                title: '是否归档',
                sortable: true
            }, {
                field: 'ArchivedOn',
                title: '归档日期',
                sortable: true
            }],
            editoption: [{
                title: '查看合同',
                f: function (id) {
                    window.open('/800/detail?objectTypeCode=1010&id=' + id)
                },
            }, {
                title: '新建收票',
                f: function (id, AccountId) {
                    $('.popup-mask').show()
                    var url = '/layouteditor/add_layoutandupload.html?entityName=Invoice&type=related&dataname=InvoiceDirection&datavalue=1'
                    url += '&relatedObjectAttributeName=AccountId,ContractId&inContextOfRecordId=' + AccountId + ',' + id
                    $('#iframe').show().attr('src', url)
                },
            }, {
                title: '设置计划',
                f: function (id, AccountId, name, amount) {
                    //$('.popup-mask').show()
                    //var url = '/layouteditor/add_layout_ie8.html?entityName=ContractPlan&type=related'
                    //url += '&relatedObjectAttributeName=ContractId&inContextOfRecordId=' + ContractId
                    //$('#iframe').show().attr('src', url)
                    $('.popup-mask').show()
                    $('#iframe').attr('src', '/alert/cntrt/batch_add_cntrplan.html?pid=' + id + '&pname=' + name + '&pamount=' + amount).height(620).css('margin-top', '-300px');
                    $('#iframe').show();
                },
            }, {
                title: '查看会签单',
                f: function (id) {
                    window.open('/a0M/e?source=i&id=' + id)
                },
            },
            {
                title: '上传签章版',
                f: function (id, AccountId, name, amount) {
                    //$('.popup-mask').show()
                    //var url = '/layouteditor/add_layout_ie8.html?entityName=ContractPlan&type=related'
                    //url += '&relatedObjectAttributeName=ContractId&inContextOfRecordId=' + ContractId
                    //$('#iframe').show().attr('src', url)
                    $('.popup-mask').show()
                    $('#iframe').attr('src', '/alert/contract/add_contractupload.html?id=' + id).height(360);
                    $('#iframe').show();
                },
            },
            //{
            //    title: '新建付款',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同暂停',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同变更',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同解除',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同终止',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同结项',
            //    f: function (id) {
            //    },
            //},
            ]
        }
    },
    {
        label: '其他',
        name: 'qitaContract',
        searchform: [],
        summaryurl: 'contract.summary.statistics.get&Type=0&ContractType=3',
        summary: [{
            label: '合同总数',
            name: 'ContractNumber',
            type: 'wancheng'
        }, {
            label: '合同总金额',
            name: 'Total',
            type: 'account'
        }, {
            label: '履行中金额',
            name: 'ImplementTotal',
            type: 'account'
        }, {
            label: '暂停合同总金额',
            name: 'StopTotal',
            type: 'account'
        }, {
            label: '解除合同总金额',
            name: 'SuspendedTotal',
            type: 'account'
        }
        ],
        table: {
            objecttypecode: 1010,
            cmd: 'contract.owner.getlist',
            filterquery: ['\nContractType\teq\t3\nOwningUser\teq-userid'],
            formatOper: function (value, row, index) {
                return '<div class="editoption" data-accountid="' + row.AccountId + '" data-id="' + row.ContractId + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
            },
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return '<div class="editoption"  data-accountid="' + row.AccountId + '" data-id="' + row.ContractId + '">更多操作<i class="layui-icon layui-icon-down"></i></div>'
                }
            }, {
                field: 'Title',
                title: '合同名称',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    //return '<a style="color:blue;" href="javascript:lookupFieldView(\'' + row.ContractId + '\',\'1010\')">' + value + '</a>'
                    return '<a style="color:blue;" href="/800/detail?objectTypeCode=1010&id=' + row.ContractId + '" target="_blank">' + value + '</a>'
                }
            }, {
                field: 'ContractNumber',
                title: '合同编号',
                sortable: true,
            }, {
                field: 'AccountIdName',
                title: '合作方',
                sortable: true,
            }, {
                field: 'ActiveOn',
                title: '开始日期',
                sortable: true,
            }, {
                field: 'ExpiresOn',
                title: '截止日期',
                sortable: true,
            }, {
                field: 'TotalPrice',
                title: '合同总额',
                sortable: true,
            }, {
                field: 'PaidAmount',
                title: '已付金额',
                sortable: true,
            }, {
                field: 'UnpaidAmount',
                title: '未付金额',
                sortable: true,
            }, {
                field: 'StateCodeName',
                title: '合同状态',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return formatOperstatecode(value, row, index);
                }
            }, {
                field: 'PaymentPercentage',
                title: '付款进度',
                sortable: true,
                formatter: function formatter(value, row, index) {
                    return formatOperprogeress(value, row, index);
                }
            }, {
                field: 'CreatedOn',
                title: '创建时间',
                sortable: true,
            }, {
                field: 'IsArchived',
                title: '是否归档',
                sortable: true
            }, {
                field: 'ArchivedOn',
                title: '归档日期',
                sortable: true
            }],
            editoption: [{
                title: '查看合同',
                f: function (ContractId) {
                    window.open('/800/detail?objectTypeCode=1010&id=' + ContractId)
                },
            }, {
                title: '新建收票',
                f: function (ContractId, AccountId) {
                    $('.popup-mask').show()
                    var url = '/layouteditor/add_layoutandupload.html?entityName=Invoice&type=related&dataname=InvoiceDirection&datavalue=1'
                    url += '&relatedObjectAttributeName=AccountId,ContractId&inContextOfRecordId=' + AccountId + ',' + ContractId
                    $('#iframe').show().attr('src', url)
                },
            }, {
                title: '设置计划',
                f: function (ContractId) {
                    $('.popup-mask').show()
                    var url = '/layouteditor/add_layout_ie8.html?entityName=ContractPlan&type=related'
                    url += '&relatedObjectAttributeName=ContractId&inContextOfRecordId=' + ContractId
                    $('#iframe').show().attr('src', url)
                },
            }, {
                title: '查看会签单',
                f: function (ContractId) {
                    window.open('/a0M/e?source=i&id=' + ContractId)
                },
            },
            {
                title: '上传签章版',
                f: function (ContractId) {
                    $('.popup-mask').show()
                    $('#iframe').attr('src', '/alert/contract/add_contractupload.html?id=' + ContractId).height(360);
                    $('#iframe').show();
                },
            },
            //{
            //    title: '新建付款',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同暂停',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同变更',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同解除',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同终止',
            //    f: function (id) {
            //    },
            //}, {
            //    title: '合同结项',
            //    f: function (id) {
            //    },
            //},
            ]
        }
    },
    ]

    return { tabList };
}