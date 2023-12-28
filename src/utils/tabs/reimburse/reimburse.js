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
    //发票台账
    ledger: {
        headerBtns: [
            {
                label: "文件识别",
                name: "",
                type: 'primary'
            },
            {
                label: "手动录入",
                name: "",
                type: "default"
            },
            {
                label: "发起报销",
                name: "",
                disabled: true,
                type: "default"
            },
            {
                label: "链接识别发票",
                name: "",
                type: "default"
            },
            {
                label: "批量操作",
                name: "",
                isMenu: true
            },
        ],
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
                },
                headerBtns: [
                    {
                        label: "文件识别",
                        name: "",
                        type: 'primary'
                    },
                    {
                        label: "手动录入",
                        name: "",
                        type: "default"
                    },
                    {
                        label: "发起报销",
                        name: "",
                        disabled: true,
                        type: "default"
                    },
                    {
                        label: "链接识别发票",
                        name: "",
                        type: "default"
                    },
                    {
                        label: "批量操作",
                        name: "",
                        isMenu: true
                    },
                ]
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
        headerBtns: [
            {
                label: "发起差旅申请",
                name: "",
                type: 'primary'
            },
            {
                label: "商旅对账",
                name: "",
                type: 'primary'
            },
            {
                label: "费用分摊",
                name: "",
                type: 'primary'
            },
        ],
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
        headerBtns: [
            {
                label: "业务招待申请",
                name: "",
                type: 'primary'
            }
        ],
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
                },
                headerBtns: [
                    {
                        label: "发起差旅费报销",
                        name: "",
                        type: 'primary'
                    },
                    {
                        label: "发起日常费用报销",
                        name: "",
                        type: 'primary'
                    },
                    {
                        label: "发起业务招待费用申请",
                        name: "",
                        type: 'primary'
                    }
                ],
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
                },
                headerBtns: [
                    {
                        label: "智能审批",
                        name: "",
                        type: 'primary'
                    }
                ],
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
                },
                headerBtns: [
                    {
                        label: "扫码收单",
                        name: "",
                        type: 'primary'
                    },
                    {
                        label: "智能票审",
                        name: "",
                        type: 'primary'
                    }
                ],
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
        },
        headerBtns: [
            {
                label: "扫码收单",
                name: "",
                type: 'primary'
            },
            {
                label: "智能票审",
                name: "",
                type: "primary"
            }
        ],
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
        },
        headerBtns: [
            {
                label: "扫码收单",
                name: "",
                type: 'primary'
            },
            {
                label: "智能票审",
                name: "",
                type: "primary"
            }
        ],
    }
}
export default tabsData;