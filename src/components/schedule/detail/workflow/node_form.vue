<template>
    <div>
        <div class="ef-node-form">
            <div class="ef-node-form-header">
                <div class="right-title">{{type === 'node'?'状态':'转换'}}</div>
                <div class="right-subtitle">{{type === 'node'?'状态捕获了您工作流程的各个阶段。':'转换连接状态，即通过工作流移动工作的操作。'}}</div>
            </div>
            <div class="ef-node-form-body">
                <el-form :model="node" ref="dataForm" label-width="80px" v-show="type === 'node'">
                    
                    <el-form-item label="名称">
                        <el-input v-model="node.name"></el-input>
                    </el-form-item>
                    <el-form-item label="类别">
                        <el-select v-model="node.type" placeholder="请选择" @change="(val)=>typeChange(val)">
                            <el-option
                                    v-for="item in typeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="转换">
                        <div class="ruledesc">转换将与状态相关联。它们表示用户在您的工作流中为推动事务所执行的操作。</div>
                        <el-button class="add-rule-btn" title="创建转换">
                            <span class="css-178ag6o">
                                <span class="css-1wits42" style="--icon-secondary-color:#FFFFFF;">
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M13 11V3.993A.997.997 0 0012 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 003 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0021 12c0-.556-.445-1-.993-1H13z" fill="currentColor" fill-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </span>
                        </el-button>
                    </el-form-item>
                    <el-form-item class="bottombtn">
                        <!-- <el-button icon="el-icon-refresh" @click="reset">重置</el-button> -->
                        <el-button icon="el-icon-close" @click="deleteitem">删除状态</el-button>
                        <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
                    </el-form-item>
                </el-form>

                <el-form :model="line" ref="dataForm" label-width="80px" v-show="type === 'line'">
                    <el-form-item label="名称">
                        <el-input v-model="line.label" placeholder="任何转移到“未分配”的状态"></el-input>
                    </el-form-item>
                    <el-form-item label="规则">
                        <div class="ruledesc">规则可在随时移动事务时帮助您节省时间。</div>
                        <el-button class="add-rule-btn" title="添加规则">
                            <span class="css-178ag6o">
                                <span class="css-1wits42" style="--icon-secondary-color:#FFFFFF;">
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M13 11V3.993A.997.997 0 0012 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 003 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0021 12c0-.556-.445-1-.993-1H13z" fill="currentColor" fill-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </span>
                        </el-button>
                    </el-form-item>
                    <el-form-item class="bottombtn">
                        <!-- <el-button icon="el-icon-refresh" @click="reset">重置</el-button> -->
                        <el-button icon="el-icon-close" @click="deleteitem">删除转换</el-button>
                        <el-button type="primary" icon="el-icon-check" @click="saveLine">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--            <div class="el-node-form-tag"></div>-->
        </div>
    </div>

</template>

<script>
    import { cloneDeep } from 'lodash'

    export default {
        data() {
            return {
                visible: true,
                // node 或 line
                type: 'node',
                node: {},
                line: {},
                data: {},
                typeList: [{
                    value: 'todo',
                    label: '待办状态'
                },{
                    value: 'progress',
                    label: '正在进行状态'
                },{
                    value: 'done',
                    label: '完成状态'
                }],
                stateList: [{
                    state: 'warning',
                    label: '待办'
                },{
                    state: 'running',
                    label: '正在进行'
                },{
                    state: 'success',
                    label: '完成'
                },{
                    state: 'error',
                    label: '错误'
                }]
            }
        },
        props:['deleteElement'],
        methods: {
            /**
             * 表单修改，这里可以根据传入的ID进行业务信息获取
             * @param data
             * @param id
             */
            nodeInit(data, id) {
                this.type = 'node'
                this.data = data
                data.nodeList.filter((node) => {
                    if (node.id === id) {
                        this.node = cloneDeep(node)
                    }
                })
            },
            lineInit(line) {
                this.type = 'line'
                this.line = line
            },
            // 修改连线
            saveLine() {
                this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
            },
            save() {
                this.data.nodeList.filter((node) => {
                    if (this.node.id&&node.id === this.node.id) {
                        node.name = this.node.name
                        node.left = this.node.left
                        node.top = this.node.top
                        node.ico = this.node.ico
                        node.state = this.node.state
                        node.type = this.node.type
                        this.$emit('repaintEverything')
                    }
                })
            },
            typeChange(val){
                if(val=='todo'){
                    this.node.state='warning'
                }
                if(val=='progress'){
                    this.node.state='running'
                }
                if(val=='done'){
                    this.node.state='success'
                }
            },
            reset(){
                this.node.name=''
                this.node.ico=''
                this.node.state=''
                this.node.type=''
                this.line.label=''
            },
            deleteitem(){
                this.deleteElement()
            }
        }
    }
</script>

<style>
    .el-node-form-tag {
        position: absolute;
        top: 50%;
        margin-left: -15px;
        height: 40px;
        width: 15px;
        background-color: #fbfbfb;
        border: 1px solid rgb(220, 227, 232);
        border-right: none;
        z-index: 0;
    }
    .bottombtn {
        margin-top: 15px;
        position: absolute;
        bottom: 10px;
    }
    .bottombtn button.el-button--small{
        padding-left: 10px;
    }
    .ef-node-form-header{
        background:transparent !important;
        border: none !important;
        color: #172B4D;
        line-height: 22px;
        height: auto;
        margin: 24px 12px 20px;
    }
    .ef-node-form-header .right-title{
        font-size: 20px;
    }
    .ef-node-form-header .right-subtitle{
        font-size: 12px;
        color: #6B778C;
    }
    body .el-form-item__label{
        width: 100% !important;
        text-align: left;
    }
    body .el-form-item__content{
        margin-left: 0 !important;
    }
    .el-form-item--small.el-form-item{
        margin-bottom: 15px;
        margin-left: 25px;
        margin-right: 15px;
    }

    .el-button{
        -webkit-box-align: baseline;
        align-items: baseline;
        box-sizing: border-box;
        display: inline-flex;
        font-size: inherit;
        font-style: normal;
        font-family: inherit;
        font-weight: 500;
        max-width: 100%;
        position: relative;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        height: 2.28571em;
        line-height: 2.28571em;
        vertical-align: middle;
        width: auto;
        -webkit-box-pack: center;
        justify-content: center;
        color: var(--ds-text, #42526E) !important;
        border-width: 0px;
        border-radius: 3px;
        text-decoration: none;
        transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
        background: var(--ds-background-neutral, rgba(9, 30, 66, 0.04));
        padding: 0px 10px;
        font-size: 14px;
    }
    .el-button:hover {
        transition-duration: 0s, 0.15s;
        color: var(--ds-text, #42526E) !important;
        background: var(--ds-background-neutral-hovered, rgba(9, 30, 66, 0.08));
        text-decoration: inherit;
    }
    .el-button:focus {
        box-shadow: 0 0 0 2px var(--ds-border-focused, #4C9AFF);
        transition-duration: 0s, 0.2s;
        color: var(--ds-text, #42526E) !important;
        background: var(--ds-background-neutral, rgba(9, 30, 66, 0.04));
        outline: none;
    }
    .el-button:active {
        transition-duration: 0s, 0s;
        color: var(--ds-text, #0052CC) !important;
        background: var(--ds-background-neutral-pressed, rgba(179, 212, 255, 0.6));
    }
    body .el-button.el-button--primary{
        color: var(--ds-text, #fff) !important;
    }
    body .el-form-item__label{
        font-size: 12px;
        color: #172B4D;
        font-weight: 600;
    }
    .el-select{
        width: 100%;
    }
    .ruledesc{
        color: #6B778C;
        font-size: 11px;
        position: relative;
        top: 0px;
        line-height: 16px;
        width: 295px;
    }

.add-rule-btn{
    position: absolute;
    top: 0px;
    right: 0px;
    height: 24px;
    line-height: 26px !important;
    background:transparent !important;
    border: none !important;
}
.el-button--small{
    padding: 0px 10px !important;
}
.css-178ag6o {
    opacity: 1;
    transition: opacity 0.3s ease 0s;
    margin: 0px 2px;
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.css-1wits42 {
    display: inline-block;
    flex-shrink: 0;
    line-height: 1;
    width: 16px;
    height: 16px;
}
.css-1wits42 > svg {
    overflow: hidden;
    pointer-events: none;
    max-width: 100%;
    max-height: 100%;
    color: var(--icon-primary-color);
    fill: var(--icon-secondary-color);
    vertical-align: bottom;
    width: 16px;
    height: 16px;
}
body .el-button.el-button--primary{
    padding: 0 10px !important;
}
</style>
