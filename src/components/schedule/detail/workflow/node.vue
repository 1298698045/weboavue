<template>
    <div
            ref="node"
            :style="nodeContainerStyle"
            @click="clickNode"
            @mouseup="changeNodeSite"
            :class="nodeContainerClass"
    >
        <!-- 最左侧的那条竖线 -->
        <div class="ef-node-left"></div>
        <!-- 节点类型的图标 -->
        <div class="ef-node-left-ico flow-node-drag" title="拖拽添加连接线">
            <i :class="nodeIcoClass"></i>
        </div>
        <!-- 节点名称 -->
        <div class="ef-node-text" :show-overflow-tooltip="true">
            {{node.name}}
        </div>
        <!-- 节点状态图标 -->
        <div class="ef-node-right-ico">
            <i class="el-icon-circle-check el-node-state-success" v-show="node.state === 'success'"></i>
            <i class="el-icon-circle-close el-node-state-error" v-show="node.state === 'error'"></i>
            <i class="el-icon-warning-outline el-node-state-warning" v-show="node.state === 'warning'"></i>
            <i class="el-icon-loading el-node-state-running" v-show="node.state === 'running'"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            node: Object,
            activeElement: Object
        },
        data() {
            return {}
        },
        computed: {
            nodeContainerClass() {
                return {
                    'ef-node-container': true,
                    'ef-node-container1': this.node.type=='todo',
                    'ef-node-container2': this.node.type=='progress',
                    'ef-node-container3': this.node.type=='done',
                    'ef-node-active': this.activeElement.type == 'node' ? this.activeElement.nodeId === this.node.id : false
                }
            },
            // 节点容器样式
            nodeContainerStyle() {
                return {
                    top: this.node.top,
                    left: this.node.left
                }
            },
            nodeIcoClass() {
                var nodeIcoClass = {}
                nodeIcoClass[this.node.ico] = true
                // 添加该class可以推拽连线出来，viewOnly 可以控制节点是否运行编辑
                nodeIcoClass['flow-node-drag'] = this.node.viewOnly ? false : true
                return nodeIcoClass
            }
        },
        methods: {
            // 点击节点
            clickNode() {
                this.$emit('clickNode', this.node.id)
            },
            // 鼠标移动后抬起
            changeNodeSite() {
                // 避免抖动
                if (this.node.left == this.$refs.node.style.left && this.node.top == this.$refs.node.style.top) {
                    return;
                }
                this.$emit('changeNodeSite', {
                    nodeId: this.node.id,
                    left: this.$refs.node.style.left,
                    top: this.$refs.node.style.top,
                })
            }
        }
    }
</script>

<style scoped>
.ef-node-container1{
    background: #ECEDF0 !important;
    border: 2px solid rgb(193, 199, 208);
}
.ef-node-container1 .ef-node-text{
    color: #172B4D;
}
.ef-node-container2{
    background: #DEEBFF !important;
    border: 2px solid rgb(179, 212, 255);
}
.ef-node-container2 .ef-node-text{
    color: rgb(7, 71, 166);
}
.ef-node-container3{
    background: #E2FFEE !important;
    border: 2px solid rgb(171, 245, 209);
}
.ef-node-container3 .ef-node-text{
    color: rgb(0, 102, 68);
}
.ef-node-left{
    display:none;
}
.ef-node-container:hover {
    cursor: move;
    /* box-shadow: rgb(38, 132, 255) 0px 0px 12px 0px; */
    background-color: #F0F7FF;
    border: 2px dashed rgb(38, 132, 255);
}
.ef-node-active {
    /* box-shadow: rgb(38, 132, 255) 0px 0px 12px 0px; */
    background-color: #F0F7FF;
    border: 2px solid rgb(38, 132, 255)
}

</style>
