import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "@/utils/request.js";
import Interface from "@/utils/Interface.js";
export default function useWorkAdmin() {
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
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">查看</div>
            <div class="option-item" onclick="EditFlow('${row.LIST_RECORD_ID}')">打印</div>  
            <div class="option-item" onclick="CirculationFn('${row.ProcessInstanceId}','${row.WFRuleLogId}',\'${row.InstanceName}\','${row.ExecutorIdentityName}')">跳转</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">加签</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">委派</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">撤销</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">结束</div>
            <div class="option-item" id=${row.WFRuleLogId} onclick="handleTo('${row.WFRuleLogId}')">发布</div>
            </div>
            <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
        `
        return str;
    }
    const tabList = [{
        label: '全部',
        name: 'all',
        summaryurl: '',
        searchform: [{
            label: '标题',
            name: 'Name',
            placeholder: "请填写内容",
            type: 'S',
        }, {
            label: '发起人',
            name: 'CreatedBy',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 8
        }, {
            label: '发起部门',
            name: 'BusinessUnitId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10
        }, {
            label: '状态',
            name: 'StateCode',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '紧急程度',
            name: 'Priority',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '提交日期',
            name: 'CreatedOn',
            placeholder: "请选择",
            type: 'D',
        },
        ],
        issearchform: true,
        summary: [],
        treeentity: 'processtree',
        //treequeryurl: 'process.instance.tree.get&type=1',
        table: {
            objecttypecode: 122,
            iscommon: false,
            cmd: 'entity.grid.search&entityType=WFProcessInstances&sort=CreatedOn&order=desc',
            //filterquery: '\nStateCode\tneq\t0',
            filterquery:'',
            orderBy: 'CreatedOn',
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);
                }
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true,
                formatter: formatName1
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true,
                formatter: formatStatus1
            }, {
                field: 'ExpiredOn',
                title: '截至时间',
                sortable: true
            }, {
                field: 'AttachQty',
                title: '附件数量',
                sortable: true
            },{
                field: 'CreatedByName',
                title: '发起人',
                sortable: true
            },
            {
                field: 'CurrentStepName',
                title: '当前步骤',
                sortable: true
            },
             {
                 field: 'CreatedOn',
                 title: '发起时间',
                 sortable: true
             },
            {
                field: 'BusinessUnitIdName',
                title: '发起人部门',
                sortable: true
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            },{
                field: 'PriorityName',
                title: '紧急程度',
                sortable: true,
                formatter: formatPriority
            }]
        }
    }, {
        label: '流转中',
        name: 'state1',
        summaryurl: '',
        searchform: [{
            label: '标题',
            name: 'Name',
            placeholder: "请填写内容",
            type: 'S',
        }, {
            label: '发起人',
            name: 'CreatedBy',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 8
        }, {
            label: '发起部门',
            name: 'BusinessUnitId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10
        }, {
            label: '状态',
            name: 'StateCode',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '紧急程度',
            name: 'Priority',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '提交日期',
            name: 'CreatedOn',
            placeholder: "请选择",
            type: 'D',
        },
        ],
        issearchform: true,
        summary: [],
        treeentity: 'processtree',
        //treequeryurl: 'process.instance.tree.get&type=1',
        table: {
            objecttypecode: 122,
            iscommon: false,
            cmd: 'entity.grid.search&entityType=WFProcessInstances&sort=CreatedOn&order=desc',
            filterquery: '\nStateCode\teq\t1',
            orderBy: 'CreatedOn',
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);
                }
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true,
                formatter: formatName1
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true,
                formatter: formatStatus1
            }, {
                field: 'ExpiredOn',
                title: '截至时间',
                sortable: true
            }, {
                field: 'AttachQty',
                title: '附件数量',
                sortable: true
            }, {
                field: 'CreatedByName',
                title: '发起人',
                sortable: true
            },
            {
                field: 'CurrentStepName',
                title: '当前步骤',
                sortable: true
            },
             {
                 field: 'CreatedOn',
                 title: '发起时间',
                 sortable: true
             },
            {
                field: 'BusinessUnitIdName',
                title: '发起人部门',
                sortable: true
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            }, {
                field: 'PriorityName',
                title: '紧急程度',
                sortable: true,
                formatter: formatPriority
            }]
        }
    }, {
        label: '已完成',
        name: 'state3',
        summaryurl: '',
        searchform: [{
            label: '标题',
            name: 'Name',
            placeholder: "请填写内容",
            type: 'S',
        }, {
            label: '发起人',
            name: 'CreatedBy',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 8
        }, {
            label: '发起部门',
            name: 'BusinessUnitId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10
        }, {
            label: '状态',
            name: 'StateCode',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '紧急程度',
            name: 'Priority',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '提交日期',
            name: 'CreatedOn',
            placeholder: "请选择",
            type: 'D',
        },
        ],
        issearchform: true,
        summary: [],
        treeentity: 'processtree',
        //treequeryurl: 'process.instance.tree.get&type=1',
        table: {
            objecttypecode: 122,
            iscommon: false,
            cmd: 'entity.grid.search&entityType=WFProcessInstances&sort=CreatedOn&order=desc',
            filterquery: '\nStateCode\teq\t3',
            orderBy: 'CreatedOn',
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);
                }
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true,
                formatter: formatName1
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true,
                formatter: formatStatus1
            }, {
                field: 'ExpiredOn',
                title: '截至时间',
                sortable: true
            }, {
                field: 'AttachQty',
                title: '附件数量',
                sortable: true
            }, {
                field: 'CreatedByName',
                title: '发起人',
                sortable: true
            },
            {
                field: 'CurrentStepName',
                title: '当前步骤',
                sortable: true
            },
             {
                 field: 'CreatedOn',
                 title: '发起时间',
                 sortable: true
             },
            {
                field: 'BusinessUnitIdName',
                title: '发起人部门',
                sortable: true
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            }, {
                field: 'PriorityName',
                title: '紧急程度',
                sortable: true,
                formatter: formatPriority
            }]
        }
    }, {
        label: '已退回',
        name: 'state4',
        summaryurl: '',
        searchform: [{
            label: '标题',
            name: 'Name',
            placeholder: "请填写内容",
            type: 'S',
        }, {
            label: '发起人',
            name: 'CreatedBy',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 8
        }, {
            label: '发起部门',
            name: 'BusinessUnitId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10
        }, {
            label: '状态',
            name: 'StateCode',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '紧急程度',
            name: 'Priority',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '提交日期',
            name: 'CreatedOn',
            placeholder: "请选择",
            type: 'D',
        },
        ],
        issearchform: true,
        summary: [],
        treeentity: 'processtree',
        //treequeryurl: 'process.instance.tree.get&type=1',
        table: {
            objecttypecode: 122,
            iscommon: false,
            cmd: 'entity.grid.search&entityType=WFProcessInstances&sort=CreatedOn&order=desc',
            filterquery: '\nStateCode\teq\t6',
            orderBy: 'CreatedOn',
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);
                }
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true,
                formatter: formatName1
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true,
                formatter: formatStatus1
            }, {
                field: 'ExpiredOn',
                title: '截至时间',
                sortable: true
            }, {
                field: 'AttachQty',
                title: '附件数量',
                sortable: true
            }, {
                field: 'CreatedByName',
                title: '发起人',
                sortable: true
            },
            {
                field: 'CurrentStepName',
                title: '当前步骤',
                sortable: true
            },
             {
                 field: 'CreatedOn',
                 title: '发起时间',
                 sortable: true
             },
            {
                field: 'BusinessUnitIdName',
                title: '发起人部门',
                sortable: true
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            }, {
                field: 'PriorityName',
                title: '紧急程度',
                sortable: true,
                formatter: formatPriority
            }]
        }
    }, {
        label: '已撤销',
        name: 'state5',
        summaryurl: '',
        searchform: [{
            label: '标题',
            name: 'Name',
            placeholder: "请填写内容",
            type: 'S',
        }, {
            label: '发起人',
            name: 'CreatedBy',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 8
        }, {
            label: '发起部门',
            name: 'BusinessUnitId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10
        }, {
            label: '状态',
            name: 'StateCode',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '紧急程度',
            name: 'Priority',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '提交日期',
            name: 'CreatedOn',
            placeholder: "请选择",
            type: 'D',
        },
        ],
        issearchform: true,
        summary: [],
        treeentity: 'processtree',
        //treequeryurl: 'process.instance.tree.get&type=1',
        table: {
            objecttypecode: 122,
            iscommon: false,
            cmd: 'entity.grid.search&entityType=WFProcessInstances&sort=CreatedOn&order=desc',
            filterquery: '\nStateCode\teq\t5',
            orderBy: 'CreatedOn',
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);
                }
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true,
                formatter: formatName1
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true,
                formatter: formatStatus1
            }, {
                field: 'ExpiredOn',
                title: '截至时间',
                sortable: true
            }, {
                field: 'AttachQty',
                title: '附件数量',
                sortable: true
            }, {
                field: 'CreatedByName',
                title: '发起人',
                sortable: true
            },
            {
                field: 'CurrentStepName',
                title: '当前步骤',
                sortable: true
            },
             {
                 field: 'CreatedOn',
                 title: '发起时间',
                 sortable: true
             },
            {
                field: 'BusinessUnitIdName',
                title: '发起人部门',
                sortable: true
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            }, {
                field: 'PriorityName',
                title: '紧急程度',
                sortable: true,
                formatter: formatPriority
            }]
        }
    }, {
        label: '草稿',
        name: 'state0',
        summaryurl: '',
        searchform: [{
            label: '标题',
            name: 'Name',
            placeholder: "请填写内容",
            type: 'S',
        }, {
            label: '发起人',
            name: 'CreatedBy',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 8
        }, {
            label: '发起部门',
            name: 'BusinessUnitId',
            placeholder: "请填写内容",
            type: 'O',
            objtypecode: 10
        }, {
            label: '状态',
            name: 'StateCode',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '紧急程度',
            name: 'Priority',
            placeholder: "请选择",
            type: 'L',
        }, {
            label: '提交日期',
            name: 'CreatedOn',
            placeholder: "请选择",
            type: 'D',
        },
        ],
        issearchform: true,
        summary: [],
        treeentity: 'processtree',
        //treequeryurl: 'process.instance.tree.get&type=1',
        table: {
            objecttypecode: 122,
            iscommon: false,
            cmd: 'entity.grid.search&entityType=WFProcessInstances&sort=CreatedOn&order=desc',
            filterquery: '\nStateCode\teq\t0',
            orderBy: 'CreatedOn',
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return formatOper1(value, row, index);
                }
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true,
                formatter: formatName1
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true,
                formatter: formatStatus1
            }, {
                field: 'ExpiredOn',
                title: '截至时间',
                sortable: true
            }, {
                field: 'AttachQty',
                title: '附件数量',
                sortable: true
            }, {
                field: 'CreatedByName',
                title: '发起人',
                sortable: true
            },
            {
                field: 'CurrentStepName',
                title: '当前步骤',
                sortable: true
            },
             {
                 field: 'CreatedOn',
                 title: '发起时间',
                 sortable: true
             },
            {
                field: 'BusinessUnitIdName',
                title: '发起人部门',
                sortable: true
            }, {
                field: 'ModifiedOn',
                title: '上一次修改时间',
                sortable: true
            }, {
                field: 'PriorityName',
                title: '紧急程度',
                sortable: true,
                formatter: formatPriority
            }]
        }
    }];

    return { tabList };
}