<template>
    <div v-if="easyFlowVisible" style="height: calc(100vh);" class="body-main-content">
        <div class="body-main-left css-dx24nc">
            <button type="button" class="css-waudgt" @click="closeppopup" title="关闭">
                <span class="css-gu2hl6" style="--icon-secondary-color:#FFFFFF;">
                    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M12 10.586L6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414L12 10.586z" fill="currentColor"></path></svg>
                </span>
            </button>
        </div>
        <div class="body-main-right">
            <el-row>
            <!--顶部工具菜单-->
            <el-col :span="24">
                <div class="ef-tooltar">
                    <!-- <i class="el-icon-close" @click="closeppopup" title="关闭"></i> -->
                    <div class="xlu5pq-1 jrqSjx">
                        <div class="xlu5pq-3 boddGW">
                            <div class="xlu5pq-2 bZuMtY">工作流：</div>
                            <div class="top-head-ico">
                                <span class="css-in4yup">
                                    <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/task.svg');"></span>
                                </span>
                            </div>
                            <div class="top-head-ico">
                                <span class="css-in4yup">
                                    <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/epic.svg');"></span>
                                </span>
                            </div>
                            <div class="top-head-ico">
                                <span class="css-in4yup">
                                    <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/story.svg');"></span>
                                </span>
                            </div>
                            <div class="top-head-ico">
                                <span class="css-in4yup">
                                    <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/bug.svg');"></span>
                                </span>
                            </div>
                            <div class="top-head-ico">
                                <span class="css-in4yup">
                                    <span class="css-ob4lje" style="background-image: url('/static/img/images/icons/issuetypes/subtask.png');"></span>
                                </span>
                            </div>
                        </div>
                        <div class="xlu5pq-4 ezKJaD">
                            <li class="css-151rkes">
                                <a class="css-10fcqag css-157vuog" href="#" onclick="return false;">
                                    <span class="css-1gd7hga" :title="data.name">{{data.name}}</span>
                                </a>
                            </li>
                        </div>
                    </div>
                    <!-- <el-link type="primary" :underline="false" :title="data.name">{{data.name}}</el-link> -->
                    <!-- <el-divider direction="vertical"></el-divider>
                    <el-button type="text" icon="el-icon-delete" size="large" @click="deleteElement" :disabled="!this.activeElement.type" title="删除"></el-button> -->
                    <!-- <el-divider direction="vertical"></el-divider>
                    <el-button class="download" type="text" icon="el-icon-download" size="large" @click="downloadData" title="下载流程数据"></el-button> -->
                    <!-- <el-divider direction="vertical"></el-divider>
                    <el-button type="text" icon="el-icon-plus" size="large" @click="zoomAdd" title="放大流程图"></el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" icon="el-icon-minus" size="large" @click="zoomSub" title="缩小流程图"></el-button> -->
                    <!-- <div style="float: right;margin-right: 5px">
                        <el-button type="info" plain round icon="el-icon-document" @click="dataInfo" size="mini">流程信息</el-button>
                        <el-button type="primary" plain round @click="dataReloadA" icon="el-icon-refresh" size="mini">切换流程A</el-button>
                        <el-button type="primary" plain round @click="dataReloadB" icon="el-icon-refresh" size="mini">切换流程B</el-button>
                        <el-button type="primary" plain round @click="dataReloadC" icon="el-icon-refresh" size="mini">切换流程C</el-button>
                        <el-button type="primary" plain round @click="dataReloadD" icon="el-icon-refresh" size="mini">自定义样式</el-button>
                        <el-button type="primary" plain round @click="dataReloadE" icon="el-icon-refresh" size="mini">力导图</el-button>
                        <el-button type="info" plain round icon="el-icon-document" @click="openHelp" size="mini">帮助</el-button>
                    </div> -->
                    <div class="nodeMenu">
                        <node-menu @addNode="addNode" ref="nodeMenu"></node-menu>
                    </div>
                    <div class="rightbtn">
                        <button class="css-s5tygj" type="button"><span class="css-178ag6o">更新工作流</span></button>
                        <button class="css-1vi0drz" type="button" @click="closeppopup"><span class="css-178ag6o">关闭</span></button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div style="display: flex;height: calc(100% - 88px);">
            <div class="efContainer">
                <div id="efContainer" ref="efContainer" class="container" v-flowDrag>
                        <flow-node
                        v-for="node in data.nodeList"
                                :id="node.id"
                                :key="node.id"
                                :node="node"
                                :activeElement="activeElement"
                                @changeNodeSite="changeNodeSite"
                                @nodeRightMenu="nodeRightMenu"
                                @clickNode="clickNode"
                        >
                        </flow-node>
                    <!-- 给画布一个默认的宽度和高度 -->
                    <div style="position:absolute;top: 2000px;left: 2000px;">&nbsp;</div>
                </div>
            </div>
            <div class="rightshowbtn">
                <i class="el-icon-arrow-left el-icon-arrow1" v-show="!rightshow" @click="rightshow=!rightshow"></i>
                <i class="el-icon-arrow-right el-icon-arrow1" v-show="rightshow" @click="rightshow=!rightshow"></i>
            </div>
            <div class="sc-62strk-3 coiaJW">
                    <div class="sc-62strk-4 jpatMI">
                        <button class="css-b7h3z8" type="button" @click="zoomSub">
                        <span class="css-16j5qb5">
                            <span role="img" aria-label="缩小" class="css-1afrefi" style="--icon-primary-color:var(--ds-icon, #B3BAC5); --icon-secondary-color:var(--ds-surface, #FFFFFF);">
                            <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM13.5 11.5h-6a1 1 0 010-2h6a1 1 0 010 2" fill="currentColor" fill-rule="evenodd"></path></svg>
                            </span>
                        </span>
                        </button>
                        <input type="range" max="2" min="1" step="0.1" class="css-1t8gwkl" v-model="zoom" style="--track-fg-width:0%;">
                        <button class="css-1t9s85p" type="button" @click="zoomAdd">
                        <span class="css-16j5qb5">
                            <span role="img" aria-label="放大" class="css-1afrefi" style="--icon-primary-color:var(--ds-icon, #B3BAC5); --icon-secondary-color:var(--ds-surface, #FFFFFF);"><svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM13.5 11.5a1 1 0 000-2h-2v-2a1 1 0 00-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 002 0v-2h2z" fill="currentColor" fill-rule="evenodd"></path></svg></span>
                        </span>
                        </button>
                    </div>
                </div>
            <!-- 右侧表单 -->
            <div class="rightForm">
                <div class="rightForm-content" v-show="rightshow">
                    <flow-node-form ref="nodeForm" @setLineLabel="setLineLabel" @repaintEverything="repaintEverything" :deleteElement="deleteElement" v-show="this.activeElement.type"></flow-node-form>
                    <div class="css-1lmg9rr" v-show="!this.activeElement.type">
                        <img width="auto" height="auto" alt="" src="" class="css-1marach" style="--max-width:160px; --max-height:160px;">
                        <h4 class="css-12j2m0c">按您自己的方式制作工作流</h4>
                        <p class="css-103urqq">
                            <span class="sc-3o952d-1 hXMrAm">
                                <span class="sc-3o952d-0 izwgdw">工作流表示您团队的流程并控制人员如何推进项目的工作。</span>
                                <span class="sc-3o952d-0 izwgdw">您可以在此处添加状态，这些状态将在您的项目面板上显示为卡片的拖放区域。您可以创建状态之间的路径（称为转换），并利用规则来自动执行重复性操作。</span>
                                <span class="sc-3o952d-0 izwgdw">选择状态以显示更多详细信息。</span>
                                <span class="sc-3o952d-0 izwgdw"><a target="blank" class="css-13rhaei" href="#" onclick="return false;"><span class="css-178ag6o">了解更多</span></a></span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- 流程数据详情 -->
        <!-- <flow-info v-if="flowInfoVisible" ref="flowInfo" :data="data"></flow-info> -->
        <flow-help v-if="flowHelpVisible" ref="flowHelp"></flow-help>
        </div>
        
    </div>

</template>

<script>
    import draggable from 'vuedraggable'
    // import { jsPlumb } from 'jsplumb'
    // 使用修改后的jsplumb
    import './jsplumb'
    import { easyFlowMixin } from './mixins'
    import flowNode from '@/components/schedule/detail/workflow/node'
    import nodeMenu from './node_menu'
    // import FlowInfo from './info'
    import FlowHelp from './help'
    import FlowNodeForm from './node_form'
    import lodash from 'lodash'
    import { getDataA } from './data_A'
    import { getDataB } from './data_B'
    import { getDataC } from './data_C'
    import { getDataD } from './data_D'
    import { getDataE } from './data_E'
    import { ForceDirected } from './force-directed'

    export default {
        data() {
            return {
                // jsPlumb 实例
                jsPlumb: null,
                // 控制画布销毁
                easyFlowVisible: true,
                // 控制流程数据显示与隐藏
                flowInfoVisible: false,
                // 是否加载完毕标志位
                loadEasyFlowFinish: false,
                flowHelpVisible: false,
                // 数据
                data: {},
                // 激活的元素、可能是节点、可能是连线
                activeElement: {
                    // 可选值 node 、line
                    type: undefined,
                    // 节点ID
                    nodeId: undefined,
                    // 连线ID
                    sourceId: undefined,
                    targetId: undefined
                },
                rightshow:true,
                zoom: 1
            }
        },
        // 一些基础配置移动该文件中
        mixins: [easyFlowMixin],
        props:['closepopup'],
        components: {
            draggable, flowNode, nodeMenu, FlowNodeForm, FlowHelp
        },
        watch:{
            zoom(){
                this.$refs.efContainer.style.transform = `scale(${this.zoom})`
                this.jsPlumb.setZoom(this.zoom)
            }
        },
        directives: {
            'flowDrag': {
                bind(el, binding, vnode, oldNode) {
                    if (!binding) {
                        return
                    }
                    el.onmousedown = (e) => {
                        if (e.button == 2) {
                            // 右键不管
                            return
                        }
                        //  鼠标按下，计算当前原始距离可视区的高度
                        let disX = e.clientX
                        let disY = e.clientY
                        el.style.cursor = 'move'

                        document.onmousemove = function (e) {
                            // 移动时禁止默认事件
                            e.preventDefault()
                            const left = e.clientX - disX
                            disX = e.clientX
                            el.scrollLeft += -left

                            const top = e.clientY - disY
                            disY = e.clientY
                            el.scrollTop += -top
                        }

                        document.onmouseup = function (e) {
                            el.style.cursor = 'auto'
                            document.onmousemove = null
                            document.onmouseup = null
                        }
                    }
                }
            }
        },
        mounted() {
            this.jsPlumb = jsPlumb.getInstance()
            this.$nextTick(() => {
                // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
                this.dataReload(getDataB())
            })
        },
        methods: {
            // 返回唯一标识
            getUUID() {
                return Math.random().toString(36).substr(3, 10)
            },
            closeppopup(){
                this.closepopup()
            },
            jsPlumbInit() {
                this.jsPlumb.ready(() => {
                    // 导入默认配置
                    this.jsPlumb.importDefaults(this.jsplumbSetting)
                    // 会使整个jsPlumb立即重绘。
                    this.jsPlumb.setSuspendDrawing(false, true);
                    // 初始化节点
                    this.loadEasyFlow()
                    // 单点击了连接线, https://www.cnblogs.com/ysx215/p/7615677.html
                    this.jsPlumb.bind('click', (conn, originalEvent) => {
                        var x = document.getElementsByClassName('jtkLine');
                        if(x.length){
                            var i
                            for (i = 0; i < x.length; i++) {
                                x[i].classList.remove('activeLine')
                            }
                        }
                        this.activeElement.type = 'line'
                        this.activeElement.sourceId = conn.sourceId
                        this.activeElement.targetId = conn.targetId
                        this.$refs.nodeForm.lineInit({
                            from: conn.sourceId,
                            to: conn.targetId,
                            label: conn.getLabel()
                        })
                        this.$nextTick(() => {
                            conn.removeClass('jtkLine')
                            conn.addClass('jtkLine')
                            conn.addClass('activeLine')
                        })
                    })
                    // 连线
                    this.jsPlumb.bind("connection", (evt) => {
                        let from = evt.source.id
                        let to = evt.target.id
                        if (this.loadEasyFlowFinish) {
                            this.data.lineList.push({from: from, to: to})
                        }
                    })

                    // 删除连线回调
                    this.jsPlumb.bind("connectionDetached", (evt) => {
                        this.deleteLine(evt.sourceId, evt.targetId)
                    })

                    // 改变线的连接节点
                    this.jsPlumb.bind("connectionMoved", (evt) => {
                        this.changeLine(evt.originalSourceId, evt.originalTargetId)
                    })

                    // 连线右击
                    this.jsPlumb.bind("contextmenu", (evt) => {
                        //console.log('contextmenu', evt)
                    })

                    // 连线
                    this.jsPlumb.bind("beforeDrop", (evt) => {
                        let from = evt.sourceId
                        let to = evt.targetId
                        if (from === to) {
                            this.$message.error('节点不支持连接自己')
                            return false
                        }
                        if (this.hasLine(from, to)) {
                            this.$message.error('该关系已存在,不允许重复创建')
                            return false
                        }
                        if (this.hashOppositeLine(from, to)) {
                            this.$message.error('不支持两个节点之间连线回环');
                            return false
                        }
                        this.$message.success('连接成功')
                        return true
                    })

                    // beforeDetach
                    this.jsPlumb.bind("beforeDetach", (evt) => {
                        //console.log('beforeDetach', evt)
                    })
                    this.jsPlumb.setContainer(this.$refs.efContainer)
                })
            },
            // 加载流程图
            loadEasyFlow() {
                // 初始化节点
                for (var i = 0; i < this.data.nodeList.length; i++) {
                    let node = this.data.nodeList[i]
                    // 设置源点，可以拖出线连接其他节点
                    this.jsPlumb.makeSource(node.id, lodash.merge(this.jsplumbSourceOptions, {}))
                    // // 设置目标点，其他源点拖出的线可以连接该节点
                    this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
                    if (!node.viewOnly) {
                        this.jsPlumb.draggable(node.id, {
                            containment: 'parent',
                            stop: function (el) {
                                // 拖拽节点结束后的对调
                                //console.log('拖拽结束: ', el)
                            }
                        })
                    }
                }
                // 初始化连线
                for (var i = 0; i < this.data.lineList.length; i++) {
                    let line = this.data.lineList[i]
                    var connParam = {
                        source: line.from,
                        target: line.to,
                        label: line.label ? line.label : '',
                        connector: line.connector ? line.connector : '',
                        anchors: line.anchors ? line.anchors : undefined,
                        paintStyle: line.paintStyle ? line.paintStyle : undefined,
                    }
                    this.jsPlumb.connect(connParam, this.jsplumbConnectOptions)
                }
                this.$nextTick(function () {
                    this.loadEasyFlowFinish = true
                })
            },
            // 设置连线条件
            setLineLabel(from, to, label) {
                var conn = this.jsPlumb.getConnections({
                    source: from,
                    target: to
                })[0]
                if (!label || label === '') {
                    conn.removeClass('flowLabel')
                    conn.addClass('emptyFlowLabel')
                } else {
                    conn.addClass('flowLabel')
                }
                conn.setLabel({
                    label: label,
                })
                this.data.lineList.forEach(function (line) {
                    if (line.from == from && line.to == to) {
                        line.label = label
                    }
                })

            },
            // 删除激活的元素
            deleteElement() {
                if (this.activeElement.type === 'node') {
                    this.deleteNode(this.activeElement.nodeId)
                } else if (this.activeElement.type === 'line') {
                    this.$confirm('确定删除所点击的线吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var conn = this.jsPlumb.getConnections({
                            source: this.activeElement.sourceId,
                            target: this.activeElement.targetId
                        })[0]
                        this.jsPlumb.deleteConnection(conn)
                        this.activeElement={
                            type: '',
                            // 节点ID
                            nodeId: '',
                            // 连线ID
                            sourceId: '',
                            targetId: ''
                        }
                    }).catch(() => {
                    })
                }
            },
            // 删除线
            deleteLine(from, to) {
                this.data.lineList = this.data.lineList.filter(function (line) {
                    if (line.from == from && line.to == to) {
                        return false
                    }
                    return true
                })
            },
            // 改变连线
            changeLine(oldFrom, oldTo) {
                this.deleteLine(oldFrom, oldTo)
            },
            // 改变节点的位置
            changeNodeSite(data) {
                for (var i = 0; i < this.data.nodeList.length; i++) {
                    let node = this.data.nodeList[i]
                    if (node.id === data.nodeId) {
                        node.left = data.left
                        node.top = data.top
                    }
                }
            },
            /**
             * 拖拽结束后添加新的节点
             * @param evt
             * @param nodeMenu 被添加的节点对象
             * @param mousePosition 鼠标拖拽结束的坐标
             */
            addNode(evt, nodeMenu, mousePosition) {
                var screenX = evt.originalEvent.clientX, screenY = evt.originalEvent.clientY
                let efContainer = this.$refs.efContainer
                var containerRect = efContainer.getBoundingClientRect()
                var left = screenX, top = screenY
                // 计算是否拖入到容器中
                if (left < containerRect.x || left > containerRect.width + containerRect.x || top < containerRect.y || containerRect.y > containerRect.y + containerRect.height) {
                    this.$message.error("请把节点拖入到画布中")
                    return
                }
                left = left - containerRect.x + efContainer.scrollLeft
                top = top - containerRect.y + efContainer.scrollTop
                // 居中
                left -= 85
                top -= 16
                var nodeId = this.getUUID()
                // 动态生成名字
                var origName = nodeMenu.name
                var nodeName = origName
                var index = 1
                while (index < 10000) {
                    var repeat = false
                    for (var i = 0; i < this.data.nodeList.length; i++) {
                        let node = this.data.nodeList[i]
                        if (node.name === nodeName) {
                            nodeName = origName + index
                            repeat = true
                        }
                    }
                    if (repeat) {
                        index++
                        continue
                    }
                    break
                }
                var node = {
                    id: nodeId,
                    name: nodeName,
                    type: nodeMenu.type,
                    left: left + 'px',
                    top: top + 'px',
                    ico: nodeMenu.ico,
                    state: 'success'
                }
                /**
                 * 这里可以进行业务判断、是否能够添加该节点
                 */
                this.data.nodeList.push(node)
                this.$nextTick(function () {
                    this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions)
                    this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions)
                    this.jsPlumb.draggable(nodeId, {
                        containment: 'parent',
                        stop: function (el) {
                            // 拖拽节点结束后的对调
                            //console.log('拖拽结束: ', el)
                        }
                    })
                })
            },
            /**
             * 删除节点
             * @param nodeId 被删除节点的ID
             */
            deleteNode(nodeId) {
                var nodename='';
                this.data.nodeList = this.data.nodeList.filter(function (node) {
                        if (node.id === nodeId) {
                            nodename=node.name
                            return true
                        }
                        return true
                })
                this.$confirm('确定要删除节点 ' + nodename + '?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    /**
                     * 这里需要进行业务判断，是否可以删除
                     */
                     
                    this.data.nodeList = this.data.nodeList.filter(function (node) {
                        if (node.id === nodeId) {
                            // 伪删除，将节点隐藏，否则会导致位置错位
                            // node.show = false
                            return false
                        }
                        return true
                    })
                    this.$nextTick(function () {
                        this.jsPlumb.removeAllEndpoints(nodeId);
                    })
                    this.activeElement={
                            type: '',
                            // 节点ID
                            nodeId: '',
                            // 连线ID
                            sourceId: '',
                            targetId: ''
                    }
                }).catch(() => {
                })
                return true
            },
            clickNode(nodeId) {
                var x = document.getElementsByClassName('jtkLine');
                if(x.length){
                    var i
                    for (i = 0; i < x.length; i++) {
                        x[i].classList.remove('activeLine')
                    }
                }
                this.activeElement.type = 'node'
                this.activeElement.nodeId = nodeId
                this.$refs.nodeForm.nodeInit(this.data, nodeId)
            },
            // 是否具有该线
            hasLine(from, to) {
                for (var i = 0; i < this.data.lineList.length; i++) {
                    var line = this.data.lineList[i]
                    if (line.from === from && line.to === to) {
                        return true
                    }
                }
                return false
            },
            // 是否含有相反的线
            hashOppositeLine(from, to) {
                return this.hasLine(to, from)
            },
            nodeRightMenu(nodeId, evt) {
                this.menu.show = true
                this.menu.curNodeId = nodeId
                this.menu.left = evt.x + 'px'
                this.menu.top = evt.y + 'px'
            },
            repaintEverything() {
                this.jsPlumb.repaint()
            },
            // 流程数据信息
            dataInfo() {
                this.flowInfoVisible = true
                this.$nextTick(function () {
                    this.$refs.flowInfo.init()
                })
            },
            // 加载流程图
            dataReload(data) {
                this.easyFlowVisible = false
                this.data.nodeList = []
                this.data.lineList = []
                this.$nextTick(() => {
                    data = lodash.cloneDeep(data)
                    this.easyFlowVisible = true
                    this.data = data
                    this.$nextTick(() => {
                        this.jsPlumb = jsPlumb.getInstance()
                        this.$nextTick(() => {
                            this.jsPlumbInit()
                        })
                    })
                })
            },
            // 模拟载入数据dataA
            dataReloadA() {
                this.dataReload(getDataA())
            },
            // 模拟载入数据dataB
            dataReloadB() {
                this.dataReload(getDataB())
            },
            // 模拟载入数据dataC
            dataReloadC() {
                this.dataReload(getDataC())
            },
            // 模拟载入数据dataD
            dataReloadD() {
                this.dataReload(getDataD())
            },
            // 模拟加载数据dataE，自适应创建坐标
            dataReloadE() {
                let dataE = getDataE()
                let tempData = lodash.cloneDeep(dataE)
                let data = ForceDirected(tempData)
                this.dataReload(data)
                this.$message({
                    message: '力导图每次产生的布局是不一样的',
                    type: 'warning'
                });
            },
            zoomAdd() {
                if (this.zoom > 2) {
                    return
                }
                this.zoom = this.zoom + 0.1
                this.$refs.efContainer.style.transform = `scale(${this.zoom})`
                this.jsPlumb.setZoom(this.zoom)
            },
            zoomSub() {
                if (this.zoom <= 1) {
                    return
                }
                this.zoom = this.zoom - 0.1
                this.$refs.efContainer.style.transform = `scale(${this.zoom})`
                this.jsPlumb.setZoom(this.zoom)
            },
            // 下载数据
            downloadData() {
                this.$confirm('确定要下载该流程数据吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    var datastr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, '\t'));
                    var downloadAnchorNode = document.createElement('a')
                    downloadAnchorNode.setAttribute("href", datastr);
                    downloadAnchorNode.setAttribute("download", 'data.json')
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                    this.$message.success("正在下载中,请稍后...")
                }).catch(() => {
                })
            },
            openHelp() {
                this.flowHelpVisible = true
                this.$nextTick(function () {
                    this.$refs.flowHelp.init()
                })
            },
            handleWeel(e) {
                if (e.wheelDelta < 0) {
                    this.zoom -= 0.1;
                } else {
                    this.zoom += 0.1;
                }
                if (this.zoom >= 2) {
                    this.zoom = 2;
                    return;
                }
                if (this.zoom <= 1) {
                    this.zoom = 1;
                    return;
                }
            },
        }
    }
</script>
<style scoped>
.ef-tooltar{
    padding-left: 60px;
    height: 50px;
    line-height: 50px;
}
.css-s5tygj {
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
    color: var(--ds-text-inverse, #FFFFFF) !important;
    border-width: 0px;
    border-radius: 3px;
    text-decoration: none;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    background: var(--ds-background-brand-bold, #0052CC);
    padding: 0px 10px;
}
.css-s5tygj[disabled] {
    cursor: not-allowed;
    color: var(--ds-text-disabled, #A5ADBA) !important;
    background: var(--ds-background-disabled, rgba(9, 30, 66, 0.04));
    text-decoration: none;
}
.css-s5tygj[disabled] > *{
  pointer-events: none;
}
.css-s5tygj:hover {
    transition-duration: 0s, 0.15s;
    color: var(--ds-text-inverse, #FFFFFF) !important;
    background: var(--ds-background-brand-bold-hovered, #0065FF);
    text-decoration: inherit;
}
.css-s5tygj:focus {
    box-shadow: 0 0 0 2px var(--ds-border-focused, #4C9AFF);
    transition-duration: 0s, 0.2s;
    color: var(--ds-text-inverse, #FFFFFF) !important;
    background: var(--ds-background-brand-bold, #0052CC);
    outline: none;
}
.css-s5tygj:active {
    transition-duration: 0s, 0s;
    color: var(--ds-text-inverse, #FFFFFF) !important;
    background: var(--ds-background-brand-bold-pressed, #0747A6);
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
.css-1vi0drz {
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
    background: none;
    padding: 0px 10px;
}
.css-1vi0drz:hover {
    transition-duration: 0s, 0.15s;
    color: var(--ds-text, #42526E) !important;
    background: var(--ds-background-neutral-subtle-hovered, rgba(9, 30, 66, 0.08));
    text-decoration: inherit;
}
.css-1vi0drz:focus {
    box-shadow: 0 0 0 2px var(--ds-border-focused, #4C9AFF);
    transition-duration: 0s, 0.2s;
    color: var(--ds-text, #42526E) !important;
    background: none;
    outline: none;
}
.css-1vi0drz:active {
    transition-duration: 0s, 0s;
    color: var(--ds-text, #0052CC) !important;
    background: var(--ds-background-neutral-subtle-pressed, rgba(179, 212, 255, 0.6));
}
.rightbtn{
    float: right;
}
.rightbtn button{
    margin-left: 10px;
}
.createdproject-body{
    width: 100%;
    height: 100%;
}
.ef-tooltar{
    padding: 0px 15px;
    z-index: 10;
    position: relative;
}
.ef-tooltar i{
    font-size: 24px;
    cursor: pointer;
    font-weight: 700;
    position: relative;
    top: 5px;
    margin-right: 10px;
}
.el-button--text{
    color: #0052cc;
    font-size: 18px;
    position: relative;
    top: 3px;
}
.el-link.el-link--primary{
    color: #0052cc;
    font-size: 18px;
}
.efContainer{
    width: calc(100% - 300px);
    position: relative;
    overflow: scroll;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-left: 10px;
}
#efContainer{
    overflow: unset;
    transform-origin: left center;
}
.coiaJW{
    /* position: fixed;
    bottom: 20px;
    right: 320px; */
    position: sticky;
}
.jpatMI {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 200px;
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    background: var(--ds-surface,#F4F5F7);
    height: 40px;
    justify-content: space-evenly;
    padding: 0px 4px;
    box-shadow: var(--ds-shadow-overlay,0 12px 24px -6px rgba(9,30,66,0.31));
    bottom: 30px !important;
    right: 30px !important;
}
.css-b7h3z8 {
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
    background: none;
    padding: 0px 2px;
}
.css-b7h3z8[disabled] {
    cursor: not-allowed;
    color: var(--ds-text-disabled, #A5ADBA) !important;
    background: none;
    text-decoration: none;
}
input {
    writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: fieldtext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
    padding: 1px 2px;
    border-width: 2px;
    border-style: inset;
    border-color: rgb(118, 118, 118);
    border-image: initial;
}
input:not([type=checkbox]):not([type=radio]), select, textarea {
    outline: 0;
    border-bottom-right-radius: 3.01px;
}
input[type="range" i] {
    appearance: auto;
    cursor: default;
    color: rgb(16, 16, 16);
    padding: initial;
    border: initial;
    margin: 2px;
}
.css-1t8gwkl {
    width: 100%;
    height: 40px;
    background: transparent;
    appearance: none;
    --thumb-border: transparent;
    --thumb-shadow: var(--ds-shadow-overlay, 0 4px 8px -2px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31));
    --track-bg: var(--ds-background-neutral, #EBECF0);
    --track-fg: var(--ds-background-brand-bold, #0052CC);
}
.css-1t9s85p {
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
    background: none;
    padding: 0px 2px;
}
.css-16j5qb5 {
    opacity: 1;
    transition: opacity 0.3s ease 0s;
    display: flex;
    margin: 0px 2px;
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    align-self: center;
    font-size: 0px;
    line-height: 0;
    user-select: none;
}
.css-1afrefi {
    display: inline-block;
    flex-shrink: 0;
    line-height: 1;
    width: 24px;
    height: 24px;
}
.css-1afrefi > svg {
    overflow: hidden;
    pointer-events: none;
    max-width: 100%;
    max-height: 100%;
    color: var(--icon-primary-color);
    fill: var(--icon-secondary-color);
    vertical-align: bottom;
}
.css-1afrefi > svg {
    width: 24px;
    height: 24px;
}
.jpatMI{
    bottom: 25px;
    right: 25px;
}

input[type=range]{
    appearance: auto;
    background-size: 50% 100%;
    border: 0 !important; 
    outline: none; 
}
input[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: rgba(205, 224, 230, 0.5); 
    border: 0 !important; 
    height: 8px;
    border-radius: 10px;
    appearance: none;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    height: 15px;
    width: 15px;
    background: #fff !important; 
    border-radius: 50%;
    margin-top: -4px;
    border: 2px solid #0052CC;
    cursor: pointer;
}
input[type=range]::-webkit-fill-lower{
    -webkit-appearance: none !important;
    height: 8px;
    border-radius: 10px;
    background: #0052CC !important; 
}
svg.jtk-connector path{
    stroke:#ddd !important;
}
.nodeMenu{
    width: calc(100% - 10px);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    height: 88px;
}
.ef-node-menu-li{
    padding: 0;
    text-align: center;
    border: 0;
}
.ef-tooltar{
    height: 88px;
    line-height: 88px;
}
.el-icon-close,.el-button--text{
    z-index: 1000;
}
.top-head-ico{
    display: inline-block; 
    position: relative; 
    outline: 0px;
}
.css-ob4lje{
    border-radius: 2px;
}
.jrqSjx {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    align-self: center;
    overflow: hidden;
    white-space: nowrap;
}
.boddGW {
    display: flex;
    flex-direction: row;
}
.bZuMtY {
    font-size: 1em;
    font-style: inherit;
    line-height: 1.14286;
    color: var(--ds-text,var(--ds-text,#172B4D));
    font-weight: 600;
    letter-spacing: -0.003em;
    margin-top: 0px;
    margin-right: 2px;
}
.boddGW > div {
    align-self: center;
    display: flex;
    flex-direction: column;
}
.bZuMtY div {
    overflow: hidden;
    text-overflow: ellipsis;
}
.css-in4yup {
    height: 16px;
    width: 16px;
    -webkit-box-align: stretch;
    align-items: stretch;
    background-color: var(--ds-surface-overlay,#FFFFFF);
    border-radius: 2px;
    box-sizing: content-box;
    cursor: inherit;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    outline: none;
    overflow: hidden;
    position: static;
    transform: translateZ(0px);
    transition: transform 200ms ease 0s, opacity 200ms ease 0s;
    box-shadow: 0 0 0 2px var(--ds-surface-overlay,#FFFFFF);
    border: none;
    margin: 2px;
    padding: 0px;
    font-size: inherit;
    font-family: inherit;
}
.css-ob4lje {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    -webkit-flex: 1 1 100%;
    -ms-flex: 1 1 100%;
    flex: 1 1 100%;
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.css-151rkes {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    height: 1.7142857142857142em;
    line-height: 1.7142857142857142em;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-width: 100%;
}
.css-10fcqag {
    font-weight: 400;
    -webkit-flex-shrink: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    min-width: 0;
}
.css-157vuog {
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
    height: auto;
    line-height: inherit;
    vertical-align: baseline;
    width: auto;
    -webkit-box-pack: center;
    justify-content: center;
    color: var(--ds-text-subtle, #6B778C) !important;
    border-width: 0px;
    border-radius: 3px;
    text-decoration: none;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    background: none;
    padding: 0px;
}
.css-157vuog:visited {
    color: var(--ds-text-subtle, #6B778C) !important;
    background: none;
}
.css-157vuog:hover {
    transition-duration: 0s, 0.15s;
    color: #8993A4 !important;
    opacity: 0.9;
    background: none;
    text-decoration: underline;
}
.css-157vuog:focus {
    /* box-shadow: 0 0 0 2px var(--ds-border-focused, #4C9AFF); */
    transition-duration: 0s, 0.2s;
    color: var(--ds-text-subtle, #6B778C) !important;
    background: none;
    outline: none;
}
.css-157vuog:active {
    transition-duration: 0s, 0s;
    color: var(--ds-text, #505F79) !important;
    background: none;
}
.css-1gd7hga {
    opacity: 1;
    transition: opacity 0.3s ease 0s;
    margin: 0px;
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.css-dx24nc {
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    color: var(--ds-text-subtle, #42526E);
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    height: 100vh;
    padding-bottom: 16px;
    padding-top: 24px;
    width: 64px;
}
.css-waudgt {
    display: flex;
    width: 40px;
    height: 40px;
    margin-bottom: var(--ds-scale-200, 16px);
    padding: var(--ds-scale-0, 0px);
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background: 0px center;
    border: 0px;
    border-radius: 50%;
    color: inherit;
    cursor: pointer;
    font-size: inherit;
    line-height: 1;
}
.css-waudgt:hover {
    background-color: var(--ds-background-neutral-subtle-hovered, rgba(9, 30, 66, 0.08));
}
.css-waudgt:active {
    background-color: var(--ds-background-neutral-subtle-pressed, #DEEBFF);
    outline: 0px;
}
.css-gu2hl6 {
    display: inline-block;
    flex-shrink: 0;
    line-height: 1;
    width: 32px;
    height: 32px;
}
.css-gu2hl6 > svg {
    overflow: hidden;
    pointer-events: none;
    max-width: 100%;
    max-height: 100%;
    color: var(--icon-primary-color);
    fill: var(--icon-secondary-color);
    vertical-align: bottom;
    width: 32px;
    height: 32px;
}

.jrqSjx{
    float: left;
    position: relative;
    top: 22px;
    z-index: 1000;
}
.body-main{
    height: 100%;
    width: 100%;
    display:unset;
}
.body-main-content{
    height: 100%;
    width: 100%;
    display:flex;
}
.nodeMenu{
    width: calc(100% - 160px);
}
.body-main-right{
    width: calc(100% - 64px);
}
.efContainer{
    width: calc(100% - 350px);
}
.css-1lmg9rr {
    margin: 48px auto;
    text-align: center;
    max-width: 304px;
}
.css-1marach {
    display: block;
    max-width: var(--max-width);
    max-height: var(--max-height);
    margin: 0px auto 24px;
}
.css-12j2m0c {
    font-size: 1.42857em;
    font-style: inherit;
    line-height: 1.2;
    color: var(--ds-text, var(--ds-text, #172B4D));
    font-weight: 500;
    letter-spacing: -0.008em;
    margin-top: 0px;
    margin-bottom: 16px;
}
.css-103urqq {
    margin-top: 0px;
    margin-bottom: 24px;
    color: var(--ds-text, #172B4D);
}
.hXMrAm {
    display: block;
}
.izwgdw {
    display: block;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 12px;
}
.css-13rhaei {
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
    color: var(--ds-link, #0052CC) !important;
    border-width: 0px;
    border-radius: 3px;
    text-decoration: none;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    background: none;
    padding: 0px 10px;
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
.rightshowbtn{
    width: 15px;
    position: relative;
}
.el-icon-arrow1{
    position: absolute;
    display: block;
    width: 24px;
    text-align: center;
    line-height: 24px;
    height: 24px;
    font-size: 12px;
    font-weight: bolder;
    background: var(--ds-surface-overlay,#FFFFFF);
    border: 2px solid var(--ds-border,#DFE1E6);
    border-radius: 16px;
    color: #8993A4;
    left: 2px;
    top: 50px;
    cursor: pointer;
}
.el-icon-arrow1:hover{
    background:#4C9AFF;
    color: #fff;
}
.jpatMI{
    right: 45px !important;
}
.rightForm{
    min-width: 25px;
    border-left: 1px solid #dce3e8;
    background-color: #FBFBFB;
    overflow-y: auto;
    padding-bottom: 80px;
}
.rightForm-content{
    width: 350px;
}
</style>
