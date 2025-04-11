<template>
    <div>
        <a-modal v-model:open="props.isShow" width="950px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    素材库
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <div class="selctImageWraper">
                        <div class="selectImg-left">
                            <a-tree block-node :autoExpandParent="true" :expandedKeys="[1,2]" :tree-data="treeData">
                                <template #title="{ title, key, dataRef  }">
                                    <span style="display: flex; align-items: center;">
                                        <FolderOpenOutlined v-if="!dataRef.children || dataRef.children.length === 0" />
                                        <span style="margin-left: 8px;flex: 1;" >{{title}}</span>
                                        <!-- <span class="num">20</span> -->
                                    </span>
                                </template>
                            </a-tree>
                        </div>
                        <div class="selectImg-right">
                            <header class="header">
                                <a-select style="width: 100px;">
                                </a-select>
                                <div class="searchBox">
                                    <a-input-search placeholder="搜索素材"></a-input-search>
                                </div>
                            </header>
                            <div class="assets-imgs">
                                <div class="assets-img-item" v-for="(item, index) in imgsList" :key="index" @click="handleSelectImg(item, index)">
                                    <div :class="{'active':index==current}">
                                        <img class="assets-img" :src="Interface.pathUrl+item.url" alt="">
                                    </div>
                                    <!-- <div class="assets-img-item-text name">
                                        <span>图片</span>
                                    </div> -->
                                    <div class="assets-img-item-text desc">
                                        <span>{{item.name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits, computed } from "vue";
    import { SearchOutlined, FolderOpenOutlined, FileOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
    })
    const emit = defineEmits(['cancel','selectImg']);

    const modelContentRef = ref(null);

    const imgsList = ref([
        {
            url: "/img/report/attendance_48x48.png",
            name: "图片1",
        },
        {
            url: "/img/report/change_48x48.png",
            name: "图片2",
        },
        {
            url: "/img/report/evaluation_48x48.png",
            name: "图片3",
        },
        {
            url: "/img/report/hire_48x48.png",
            name: "图片4",
        },
        {
            url: "/img/report/hr_48x48.png",
            name: "图片5",
        }
    ])


    
    const data = reactive({
        top: "",
        current: -1,
        treeData: [
            {
                title: "系统图标库",
                key: 1,
                children: [
                    {
                        title: "线性图标",
                        key: "1-1"
                    }
                ]
            },
            {
                title: "我的素材库",
                key: 2,
                children: [
                {
                        title: "线性图标",
                        key: "2-1"
                    }
                ]
            }
        ],
    })
    const { top, current, treeData } = toRefs(data);

    const handleSelectImg = (item, index) => {
        data.current = index;
    }

    const handleSearch = () =>{

    }

    const handleTree = (e) => {
        console.log("e", e);
    }

    onMounted(()=>{
        let h = modelContentRef.value.clientHeight;
        data.top = (document.documentElement.clientHeight - (h + 130) ) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: data.top
    }));

    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {
        if(data.current==-1){
            message.error("请选择一张图片！");
        }else {
            let item = imgsList.value[data.current];
            emit("selectImg", item);
            emit("cancel");
        }
    }

</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
    .modalCenter{
        height: 600px !important;
        padding: 0 !important;
    }
    .selctImageWraper{
        display: flex;
        height: 100%;
        .selectImg-left{
            width: 200px;
            height: 100%;
            border-right: 1px solid #e5e5e5;
        }
        .selectImg-right{
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            .header{
                height: 50px;
                border-bottom: 1px solid #e5e5e5;
                display: flex;
                align-items: center;
                padding: 0 16px;
                position: relative;
                justify-content: space-between;
            }
            .assets-imgs{
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                overflow-y: auto;
                padding: 16px;
                .assets-img-item{
                    height: 155px;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: stretch;
                    cursor: pointer;
                    color: #5b6b73;
                    position: relative;
                    width: 20%;
                    padding: 0 12px;
                    display: flex;
                    &>div:first-child{
                        display: flex;
                        height: 106px;
                        align-items: center;
                        justify-content: center;
                        border-radius: 2px;
                        background-image: url("@/assets/img/item.png");
                        background-color: #f1f1f1;
                        transition: all .15s ease-in-out 0s;
                        position: relative;
                        &:hover{
                            background: #fff;
                            &::after{
                                border: 2px solid #5d9cec;
                            }
                        }
                        &.active{
                            background-color: #f1f1f1;
                            &::after{
                                border: 2px solid #5d9cec;
                            }
                        }
                        .assets-img{
                            width: auto;
                            height: auto;
                            max-width: 100%;
                            max-height: 100%;
                            pointer-events: none;
                        }
                    }
                    &>div:first-child:after{
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 2px;
                        border: 2px solid transparent;
                        transition: all .15s ease-in-out 0s;
                    }
                }
                .assets-img-item-text{
                    display: flex;
                    align-items: center;
                    line-height: 26px;
                    text-align: center;
                    cursor: text;
                    justify-content: center;
                    /* height: 26px; */
                    padding-top: 5px;
                    &.desc{
                        height: auto;
                        padding: 0 0 5px 0;
                    }
                }
            }
        }
    }
</style>
<style>
    .ant-tree .ant-tree-treenode {
        padding-left: 16px;
    }

    .ant-tree .ant-tree-treenode .ant-tree-node-content-wrapper {
        display: flex;
        align-items: center;
    }
</style>