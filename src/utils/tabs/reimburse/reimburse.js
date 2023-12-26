const tabsData = {
    //发票台账
    ledger: {
        tabs: [
            {
                label: "全部",
                number: "15",
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
                label: "未报销",
                number: "15",
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
                label: "报销中",
                number: "15",
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
                label: "已报销",
                number: "15",
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
    // 差旅申请
    travel: {
        tabs: [
            {
                label: "全部",
                number: "10",
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
                label: "审批中",
                number: "10",
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
                label: "审批通过",
                number: "10",
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
    // 业务招待申请
    hospitality: {
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
    // 借还款中心
    borrowingAndRepayment: {
        tabs: [
            {
                label: "我的借款",
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
    // 报销申请
    apply: {
        tabs: [
            {
                label: "全部",
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
                label: "业务审批",
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
                label: "财务处理",
                number: "15",
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
    // 财务审核
    financialReview: {
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
    // 我的报销
    myReimburse: {
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