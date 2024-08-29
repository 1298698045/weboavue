<template>
    <div class="flow-menu" ref="tool">
        <draggable @end="end" @start="move" v-model="menuList" :options="draggableOptions" class="node-menu-list">
            <div v-for="menu in menuList" class="node-menu-list-item" :key="menu.id" :type="menu.type">
                <button class="css-7q1vr1 sc-1c50r4m-0 dhguMl" type="button" :title="'向下拖拽添加'+menu.name">
                    <img class="sc-1c50r4m-2 eAGhMF" :src="menu.icourl" alt="">
                    <span class="sc-1c50r4m-1 eRwkhr">{{menu.name}}</span>
                </button>
            </div>
        </draggable>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'

    var mousePosition = {
        left: -1,
        top: -1
    }

    export default {
        data() {
            return {
                activeNames: '1',
                // draggable配置参数参考 https://www.cnblogs.com/weixin186/p/10108679.html
                draggableOptions: {
                    preventOnFilter: false,
                    sort: false,
                    disabled: false,
                    ghostClass: 'tt',
                    // 不使用H5原生的配置
                    forceFallback: true,
                    // 拖拽的时候样式
                    // fallbackClass: 'flow-node-draggable'
                },
                menuList: [
                            {
                                id: '11',
                                type: 'todo',
                                name: '待办状态',
                                ico:'el-icon-plus',
                                icourl: '/static/img/images/icons/workflow/to-do-status.svg',
                                style: {}
                            }, {
                                id: '22',
                                type: 'progress',
                                name: '正在进行状态',
                                ico:'el-icon-plus',
                                icourl: '/static/img/images/icons/workflow/in-progress-status.svg',
                                style: {}
                            },
                            {
                                id: '33',
                                type: 'done',
                                name: '完成状态',
                                ico:'el-icon-plus',
                                icourl: '/static/img/images/icons/workflow/done-status.svg',
                                style: {}
                            }
                ],
                nodeMenu: {}
            }
        },
        components: {
            draggable
        },
        created() {
            /**
             * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
             * @param event
             */
            if (this.isFirefox()) {
                document.body.ondrop = function (event) {
                    // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
                    mousePosition.left = event.layerX
                    mousePosition.top = event.clientY - 50
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        },
        methods: {
            // 根据类型获取左侧菜单对象
            getMenuByType(type) {
                for (let i = 0; i < this.menuList.length; i++) {
                    let item = this.menuList[i];
                    if (item.type === type) {
                        return item
                    }
                }
            },
            // 拖拽开始时触发
            move(evt, a, b, c) {
                var type = evt.item.attributes.type.nodeValue
                this.nodeMenu = this.getMenuByType(type)
            },
            // 拖拽结束时触发
            end(evt, e) {
                this.$emit('addNode', evt, this.nodeMenu, mousePosition)
            },
            // 是否是火狐浏览器
            isFirefox() {
                var userAgent = navigator.userAgent
                if (userAgent.indexOf("Firefox") > -1) {
                    return true
                }
                return false
            }
        }
    }
</script>
<style scoped>
.node-menu-list-item button{
    background: #fff;
}
.node-menu-list{
    display: flex;
}
.dhguMl {
    color: var(--ds-text-subtlest,#6B778C);
    min-width: 48px;
}
.css-7q1vr1 {
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
}
.css-7q1vr1:hover {
    transition-duration: 0s, 0.15s;
    color: var(--ds-text, #42526E) !important;
    background: var(--ds-background-neutral-hovered, rgba(9, 30, 66, 0.08));
    text-decoration: inherit;
}
.css-7q1vr1:focus {
    box-shadow: 0 0 0 2px var(--ds-border-focused, #4C9AFF);
    transition-duration: 0s, 0.2s;
    color: var(--ds-text, #42526E) !important;
    background: var(--ds-background-neutral, rgba(9, 30, 66, 0.04));
    outline: none;
}
.css-7q1vr1:active {
    transition-duration: 0s, 0s;
    color: var(--ds-text, #0052CC) !important;
    background: var(--ds-background-neutral-pressed, rgba(179, 212, 255, 0.6));
}
.node-menu-list-item button{
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    height: auto;
    width: 92px;
    margin-right: 5px;
    padding-bottom: 5px;
}
.eAGhMF {
    height: 24px;
    width: 24px;
    padding: 4px 0px;
    opacity: 1;
}
.eRwkhr {
    font-size: 11px;
    line-height: 16px;
    min-width: 56px;
    max-width: 200px;
}
</style>
