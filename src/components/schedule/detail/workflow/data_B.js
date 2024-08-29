let dataB = {
    name: '流程名称',
    nodeList: [
        {
            id: 'nodeA',
            name: '状态A',
            type: 'todo',
            left: '18px',
            top: '223px',
            ico: 'el-icon-plus',
            state: 'warning',
            viewOnly: false
        },
        {
            id: 'nodeB',
            type: 'progress',
            name: '状态B',
            left: '351px',
            top: '96px',
            ico: 'el-icon-plus',
            state: 'running'
        },
        {
            id: 'nodeC',
            name: '状态C',
            type: 'progress',
            left: '354px',
            top: '351px',
            ico: 'el-icon-plus',
            state: 'running'
        }, {
            id: 'nodeD',
            name: '状态D',
            type: 'done',
            left: '723px',
            top: '215px',
            ico: 'el-icon-plus',
            state: 'success'
        }
    ],
    lineList: [{
        from: 'nodeA',
        to: 'nodeB',
        label: '条件A'
    }, {
        from: 'nodeA',
        to: 'nodeC',
        label: '条件B'
    }, {
        from: 'nodeB',
        to: 'nodeD',
        label: '条件B'
    }, {
        from: 'nodeC',
        to: 'nodeD',
        label: '条件C'
    }
    ]
}

export function getDataB () {
    return dataB
}
