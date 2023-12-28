const formatter = () => {
    var str = `
        <div class="iconBox">
        <div class="popup">
            <div class="option-item">编辑</div>
        </div>
        <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
    `
    return str;
}
const tabsData = {
    // 合同管理
    admin: {
        tabs: [
            {
                label: "采购合同",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作",
                        formatter: formatter
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "销售合同",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            }
        ]
    },
    // 付款计划
    plan: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 付款执行
    execute: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 付款凭证
    voucher: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 付款记录
    record: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 收款计划
    collectionPlan: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 到款记录
    collectionRecord: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 开票未到账
    notPayment: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 发票管理
    invoiceAdmin: {

    },
    // 订单信息
    order: {
        tabs: [
            {
                label: "全部",
                number: "28",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "内部审批中",
                number: "11",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "待供应商签署",
                number: "11",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "双方已签署",
                number: "6",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            }
        ]
    },
    // 预警处理
    earlyWarning: {
        tabs: [
            {
                label: "合同执行风险",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "合同履约点逾期风险",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "合同变更风险",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "收款时间点逾期风险",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "故意逃避监控风险",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "外部签约方异常风险",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "合同履约率风险",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },

        ]
    },
    // 风险条款
    term: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 埋点设定
    buryingPoint: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 合同后评价
    evaluate: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 销售订单
    saleOrder: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 合同档案接收
    accept: {
        tabs: [
            {
                label: "待接收档案",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "已接受档案",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            }
        ]
    },
    // 档案条件检索
    filterSearch: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 合同档案借阅
    borrowing: {
        tabs: [
            {
                label: "可借阅档案",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "我的借阅记录",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            }
        ]
    },
    // 合同档案销毁
    destruction: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 合同档案导入
    import: {
        tabs: [
            {
                label: "导入档案案卷",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "导入档案文件",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            }
        ]
    },
    // 外部接口采集
    gather: {
        tabs: [
            {
                label: "外部档案接收",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "外部接口设置",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            }
        ]
    },
    // 合同审批权限
    approval: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 多为权责矩阵
    matrix: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 集团分级分权
    group: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 供应商管理
    supplier: {
        tabs: [
            {
                label: "全部",
                number: "17",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "未注册",
                number: "2",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "待审批",
                number: "1",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "已注册",
                number: "1",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "已拒绝",
                number: "1",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            }
        ]
    },
    // 相对方列表
    relativeList: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 合同审批
    contractApproval: {
        tabs: [
            {
                label: "直接参与",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "我的关注",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            },
            {
                label: "共享给我",
                number: "",
                table: {
                    columnsArray: [{
                        field: 'ids',
                        checkbox: true
                    }, {
                        field: "Action",
                        title: "操作"
                    },
                    {
                        field: "ProcessInstanceNumber",
                        title: '流程编号',
                        sortable: true
                    },
                    {
                        field: 'Name',
                        title: '标题',
                        sortable: true
                    }, {
                        field: 'ProcessIdName',
                        title: '流程名称',
                        sortable: true
                    }, {
                        field: 'StateCodeName',
                        title: '状态',
                        sortable: true
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
                        sortable: true
                    }]
                }
            }
        ]
    },
    // 范本库
    modelLibrary: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    },
    // 条款库
    termLibrary: {
        table: {
            columnsArray: [{
                field: 'ids',
                checkbox: true
            }, {
                field: "Action",
                title: "操作"
            },
            {
                field: "ProcessInstanceNumber",
                title: '流程编号',
                sortable: true
            },
            {
                field: 'Name',
                title: '标题',
                sortable: true
            }, {
                field: 'ProcessIdName',
                title: '流程名称',
                sortable: true
            }, {
                field: 'StateCodeName',
                title: '状态',
                sortable: true
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
                sortable: true
            }]
        }
    }
}
export default tabsData;