<template>
    <div class="swiperConfigWrap">
        <div class="swiperConfitList">
            <div class="swiperConifgItem" v-for="(swiperItem,swiperIdx) in item.list" :key="swiperIdx">
                <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="/apps/CommandProcessor.ashx?c=1&cmd=file.attachment.upload"
                    :before-upload="(e)=>beforeUpload(e,swiperItem)"
                >
                    <img v-if="swiperItem.ImgUrl" :src="swiperItem.ImgUrl" class="avatar">

                    <div v-else>
                    <!-- <loading-outlined v-if="loading"></loading-outlined> -->
                    <plus-outlined></plus-outlined>
                    <div class="ant-upload-text">上传图片</div>
                    </div>
                </a-upload>
                <a-form class="formRow">
                    <a-form-item label="名称" class="formItem">
                        <a-input v-model:value="swiperItem.Name" placeholder="名称"></a-input>
                    </a-form-item>
                    <a-form-item label="跳转路径" class="formItem">
                        <a-input v-model:value="swiperItem.LnkUrl" placeholder="跳转路径"></a-input>
                    </a-form-item>
                </a-form>
                <i class="iconfont icon-yishanchu cursorPointer" @click="handleDelSwiperItem(item,swiperItem,swiperIdx)" style="padding-left: 10px;"></i>

            </div>
        </div>
        <div>
            <a-button type="link" @click="handleAddSwiper(item)">添加轮播图</a-button>
        </div>
        <div class="footBtns">
            <a-button @click="saveConfig(item)">保存</a-button>
            <a-button class="ml10" type="primary" @click="cancel">取消</a-button>
        </div>
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import "@/style/icon/iconfont.css";
    import {
        EllipsisOutlined, PlusOutlined, LoadingOutlined 
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        h,
        nextTick,
        defineProps,
        defineExpose,
        defineEmits,
    } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import calendar from 'dayjs/plugin/calendar';
    import weekday from 'dayjs/plugin/weekday';
    import localeData from 'dayjs/plugin/localeData';

    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);

    import draggable from 'vuedraggable';

    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        item: Object
    })
    
    const data = reactive({

    });
    // const {  } = toRefs(data);
    
    console.log(props);

    const beforeUpload = (e,item) => {

    }
    const handleAddSwiper = (item) => {
        let len = item.list.length;
        item.list.push({
            ImgUrl: "",
            LnkUrl: "",
            Name: "",
            Position: len+1,
            ValueId: ""
        })
    }
    const cancel = () => {
        props.item.isConfig = false;
    }
    // 保存
    const saveConfig = (item) => {
        item.list.forEach(function(v){
            saveSwiperImg(v);
        })
        return Promise.all(item.list).then(function(res){
            console.log('success',res)
            message.success("保存成功！");
            item.isConfig = false;
        }).catch(function(error){
            console.log('err', error)
        })
    }
    const saveSwiperImg = async (swiperItem) => {
        var obj = {
            params: {
                recordRep: {
                    objTypeCode: 20549,
                    id: swiperItem.ValueId || '',
                    fields: {
                        ImgUrl: swiperItem.ImgUrl,
                        LinkUrl: swiperItem.LnkUrl,
                        Position: swiperItem.Position,
                        Name: swiperItem.Name
                    }
                }
            }
        }
        var d = {
            message: JSON.stringify(obj)
        }
        return new Promise((resolve,reject)=>{
            proxy.$get(Interface.saveRecord,d).then(res=>{
                resolve(res);
            })
        })
    }
    const handleDelSwiperItem = (item, swiperItem, swiperIdx) => {
        var d = {
            objTypeCode: 20549,
            id: swiperItem.ValueId
        }
        proxy.$get(Interface.delete, d).then(res=>{
            if(res.status === 1){
                item.list.splice(swiperIdx,1);
                message.success("删除成功！");
            }
        })
    }
</script>
<style lang="less" scoped>
    .formItem{
        margin-bottom: 10px;
        :deep .ant-row{
            display: block !important;
        }
    }
    .formRow{
        display: flex;
        .formItem{
            flex: 1;
        }
    }
    .swiperConfitList{
        .swiperConifgItem {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .ant-upload-wrapper{
                width: 80px;
                height: 80px;
            }
            :deep :where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select{
                width: 80px;
                height: 80px;
            }
            .ant-form{
                flex: 1;
                .formItem{
                    margin-left: 10px;
                }
            }
        }
    }
</style>