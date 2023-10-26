<template>
    <div class="attendWrap">
        <p>
            <a-button type="primary" @click="handleInvite">邀请参会人</a-button>
        </p>
        <p>
            已选人员
        </p>
        <div class="userList">
            <div class="userItem" v-for="(item,index) in userList" :key="index">
                {{item.name}}
            </div>
        </div>
        <radio-user :isShow="isRadioUser" @selectVal="getUserData"></radio-user>
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
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    // 选人
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        isRadioUser: false,
        userList: []
    });
    const { isRadioUser, userList } = toRefs(data);
    // 邀请参会人
    const handleInvite = () => {
        data.isRadioUser = true;
    }
    const getUserData = (e) => {
        console.log("e",e);
        data.userList.push(e);
        data.isRadioUser = false;
        console.log(data.userList);
    }
</script>
<style lang="less">
    .userList{
        .userItem{
            display: inline-block;
            padding: 5px 8px;
            border: 1px solid #dedede;
            border-radius: 4px;
            margin-right: 10px;
            line-height: 15px;
            margin-bottom: 5px;
        }
    }
</style>