<template>
    <div class="appcenter-common-app-modal">
        <div class="larkc-modall-wrapper larkc-modall-wrapper-mask content-center" v-if="isModal">
            <div class="larkc-modall-wrapper larkc-modall-wrapper-mask content-center"></div>
            <div class="larkc-modall-content">
                <div class="appcenter-common-app-modal larkc-modall larkc-modall-middle">
                    <div class="larkc-modall-main">
                        <header class="larkc-modall-header">
                            <div class="larkc-modall-title-wrapper">
                                <div class="larkc-modall-title">添加常用应用</div>
                            </div>
                        </header>
                        <main class="larkc-modall-body">
                            <div class="appcenter-common-app-content">
                                <div class="appcenter-common-app-body">
                                    <div class="app-list">
                                        <div class="app-search-container">
                                            <svg class="larkc-svg-icon app-search-icon" aria-hidden="true"
                                                viewBox="0 0 1024 1024">
                                                <path
                                                    d="M769.130667 673.493333l144.682666 144.682667a21.333333 21.333333 0 0 1 0 30.165333l-36.202666 36.202667a21.333333 21.333333 0 0 1-30.165334 0L706.56 743.68A361.258667 361.258667 0 0 1 469.333333 832c-200.298667 0-362.666667-162.368-362.666666-362.666667S269.034667 106.666667 469.333333 106.666667s362.666667 162.368 362.666667 362.666666c0 75.712-23.189333 146.005333-62.869333 204.16zM469.333333 742.4c150.826667 0 273.066667-122.24 273.066667-273.066667S620.16 196.266667 469.333333 196.266667 196.266667 318.506667 196.266667 469.333333 318.506667 742.4 469.333333 742.4z">
                                                </path>
                                            </svg>
                                            <input class="app-search" type="text" v-model="searchVal" @change="changeSearch" placeholder="搜索">
                                        </div>
                                        <div class="app-list-content">
                                            <div class="scroller"
                                                style="position: relative; height: 100%; width: 100%; overflow: hidden overlay; transform: translateY(0px); contain: strict;">
                                                <div class="scroller_content">
                                                    <div
                                                        style="height: 1px; width: 100%; position: absolute; transform: translate(0px, -1px);">
                                                    </div>
                                                    <div class="list_items">
                                                        <div class="app-item"
                                                            v-for="(item,index) in listData" :key="index"
                                                            @click="changeCheck(item,index)">
                                                            <div
                                                                class="larkc-avatar larkc-avatar-small app-avatar">
                                                                <img class="larkc-avatar-img" alt="Avatar"
                                                                :src="getImagePath(item.PictureUrl)">
                                                            </div>
                                                            <div class="app-info">
                                                                <div class="app-name">{{item.Label}}</div>
                                                                <div class="app-desc">{{item.Name}}</div>
                                                            </div>
                                                            <div class="larkc-checkbox app-list-checkbox"
                                                                :class="{'larkc-checkbox-checked':item.isChecked}">
                                                                <svg class="larkc-svg-icon larkc-checkbox-icon"
                                                                    v-if="item.isChecked" aria-hidden="true"
                                                                    viewBox="0 0 1024 1024">
                                                                    <path
                                                                        d="M864 32a128 128 0 0 1 128 128v704a128 128 0 0 1-128 128H160a128 128 0 0 1-128-128V160a128 128 0 0 1 128-128h704z m-124.736 312.64a32 32 0 0 0-45.248 0l-249.44 249.44-113.76-113.696a32 32 0 0 0-45.248 0L240.32 525.632a32 32 0 0 0 0 45.248l181.024 181.024c6.272 6.304 14.528 9.408 22.816 9.408a31.904 31.904 0 0 0 23.584-9.376l316.8-316.8a32 32 0 0 0 0-45.248l-45.28-45.248z">
                                                                    </path>
                                                                </svg>
                                                                <svg class="larkc-svg-icon larkc-checkbox-icon"
                                                                    v-else aria-hidden="true"
                                                                    viewBox="0 0 1024 1024">
                                                                    <path
                                                                        d="M160 32h704a128 128 0 0 1 128 128v704a128 128 0 0 1-128 128H160a128 128 0 0 1-128-128V160a128 128 0 0 1 128-128z m0 64a64 64 0 0 0-64 64v704a64 64 0 0 0 64 64h704a64 64 0 0 0 64-64V160a64 64 0 0 0-64-64H160z">
                                                                    </path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="app-selected">
                                        <div class="app-selected-info">
                                            <div class="app-selected-info-left">已选：{{selectData.length}}
                                            </div>
                                            <!-- <div class="app-selected-info-right" @click="clearData">清空</div> -->
                                        </div>
                                        <div class="app-selected-list">
                                            <div class="app-item" v-for="(item,index) in selectData"
                                                :key="index">
                                                <div class="larkc-avatar larkc-avatar-small app-avatar"><img
                                                        class="larkc-avatar-img" alt="Avatar"
                                                        :src="getImagePath(item.PictureUrl)">
                                                </div>
                                                <div class="app-info">
                                                    <div class="app-name">{{item.Label}}</div>
                                                    <div class="app-desc">{{item.Name}}</div>
                                                </div><svg @click="deleteSelect(item,index)"
                                                    class="larkc-svg-icon app-selected-remove"
                                                    aria-hidden="true" viewBox="0 0 1024 1024">
                                                    <path
                                                        d="M509.568 447.082667L796.16 160.469333a21.333333 21.333333 0 0 1 30.165333 0l30.165334 30.165334a21.333333 21.333333 0 0 1 0 30.186666L569.898667 507.434667 856.512 794.026667a21.333333 21.333333 0 0 1 0 30.165333l-30.165333 30.165333a21.333333 21.333333 0 0 1-30.165334 0L509.568 567.765333 222.933333 854.378667a21.333333 21.333333 0 0 1-30.186666 0l-30.165334-30.165334a21.333333 21.333333 0 0 1 0-30.165333l286.613334-286.613333L162.602667 220.8a21.333333 21.333333 0 0 1 0-30.186667l30.165333-30.165333a21.333333 21.333333 0 0 1 30.186667 0l286.613333 286.613333z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer-action">
                                    <button
                                        class="larkc-btn larkc-btn-normal larkc-btn-minor larkc-btn-large"
                                        type="button" @click="cancelModal">取消</button>
                                    <button
                                        class="larkc-btn confirm larkc-btn-normal larkc-btn-primary larkc-btn-large"
                                        type="button" @click="handleSubmit">确定</button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        toRaw,
        inject
    } from "vue";
    import {
        AlignCenterOutlined, SearchOutlined, RightOutlined
    } from "@ant-design/icons-vue";
    import "@/style/personalCenter.css";
    import Interface from "@/utils/Interface.js";
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        isModal: Boolean,
        objData: Object
    })
    const emit = defineEmits(['cancel']);
    const data = reactive({
        searchVal: "",
        selectData: [],
        listData: [],
        fixedData: []
    });
    const { searchVal, selectData, listData, fixedData } = toRefs(data);


    var applications = [];
    props.objData.Groups.forEach(function(item){
        if(item.GroupId){
            item.Applications.forEach(function(v){
                applications.push(v);
            })
        }
    });
    data.selectData = props.objData.favouriteApplicationLinks.map(function(item){
        item.isChecked = true;
        item.id = item.Id;
        return item;
    });
    data.listData = applications.map(function(item){
        let isBook = data.selectData.some(function(v){
            return v.Name==item.Name;
        });
        item.isChecked = isBook;
        item.id = item.Id;
        return item;
    });
    data.fixedData = data.listData;
    const getImagePath = (imagePath) => {
        try {
            return require(`@/assets${imagePath}`);
        } catch (error) {
            console.error(`Error loading image: ${error.message}`);
            return '';
        }
    }
    const changeSearch = ()=> {
        data.listData = [];
        if(data.fixedData&&data.fixedData.length){
            for (var i = 0; i < data.fixedData.length; i++) {
                if ((data.fixedData[i].Label).indexOf(data.searchVal)==-1) {
                    
                }
                else {
                    data.listData.push(data.fixedData[i]);
                }
            }
        }
    }
    const cancelModal = ()=>  {
        emit('cancel', false);
    }
    const handleSubmit = ()=> {
        for(var i = 0; i < data.selectData.length; i++){
            var obj = {
                params: {
                    recordRep:{
                        objTypeCode: 100060,
                        id: data.selectData[i].Id,
                        fields: {
                            IsFavored: 1
                        }
                    }
                }
            }
            var messages = JSON.stringify(obj);
            proxy.$get(Interface.saveRecord, {
                message: messages
            }).then(res=>{
                if(res.status==1 && data.selectData.length-1 == i){
                    message.success('添加成功！');
                    emit('cancel', false, 1);
                }
            })
        }
        
    }
    const changeCheck = (item, index)=> {
        item.isChecked = !item.isChecked;
        let isExist = data.selectData.findIndex(function(row){
            return row.id == item.id;
        });
        if (isExist == -1 && item.isChecked) {
            data.selectData.push(item);
        } else {
            deleteApplication(item.Id);
            data.selectData.splice(isExist, 1)
        }
    }
    const clearData = ()=> {
        data.selectData = [];
        data.listData.forEach(function(item) {
            item.isChecked = false;
        })
    }
    const deleteSelect = (item, index) => {
        deleteApplication(item.Id);
        data.selectData.splice(index, 1);
        data.listData.forEach(function(row) {
            if (item.id == row.id) {
                row.isChecked = false;
            }
        })
    }
    const deleteApplication = (id) => {
        var obj = {
            params: {
                recordRep:{
                    objTypeCode: 100060,
                    id: id,
                    fields: {
                        IsFavored: 0
                    }
                }
            }
        }
        var messages = JSON.stringify(obj);
        proxy.$get(Interface.saveRecord, {
            message: messages
        }).then(res=>{

        })
    }
</script>