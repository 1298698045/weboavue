<template>
    <div class="wrapper">
        <div class="settingCenter">
            <div class="leftWrap">
                <div class="settingMenu">
                    <div class="settingMenuItem" @click="handleTabMenu(item,index)" :class="{'active':current==index}" v-for="(item,index) in menus" :key="index">{{item.name}}</div>
                </div>
            </div>
            <div class="rightWrap">
                <FoundationSetting v-if="current==0" />
                <EnterSetting v-if="current==1" />
                <WhiteList v-if="current==2" />
                <BlackList v-if="current==3" />
                <InspectionSeeting  v-if="current==4" />
                <UseSetting v-if="current==5" />
                <PermSetting v-if="current==6" />
                <ServiceSetting v-if="current==7" />
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
       UnorderedListOutlined,
       DownOutlined,
       CaretDownOutlined,
       UserOutlined
   } from "@ant-design/icons-vue";
   import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
   import FoundationSetting from "@/components/reimburse/invoice/foundationSetting/FoundationSetting.vue";
   import BlackList from "@/components/reimburse/invoice/foundationSetting/BlackList.vue";
   import EnterSetting from "@/components/reimburse/invoice/foundationSetting/EnterSetting.vue";
   import InspectionSeeting from "@/components/reimburse/invoice/foundationSetting/InspectionSeeting.vue";
   import PermSetting from "@/components/reimburse/invoice/foundationSetting/PermSetting.vue";
   import ServiceSetting from "@/components/reimburse/invoice/foundationSetting/ServiceSetting.vue";
   import UseSetting from "@/components/reimburse/invoice/foundationSetting/UseSetting.vue";
   import WhiteList from "@/components/reimburse/invoice/foundationSetting/WhiteList.vue";

   import Interface from "@/utils/Interface.js";
   const { proxy } = getCurrentInstance();
   const data = reactive({
    menus: [
        {
            name: "基础设置"
        },
        {
            name: "录入设置"
        },
        {
            name: "白名单"
        },
        {
            name: "黑名单"
        },
        {
            name: "查验设置"
        },
        {
            name: "使用设置"
        },
        {
            name: "权限设置"
        },
        {
            name: "服务商设置"
        }
    ],
    current: 0
   });
   const { menus, current } = toRefs(data);
   const handleTabMenu = (item,index) => {
    data.current = index;
   }
 </script>
 <style lang="less" scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        .settingCenter{
            width: 100%;
            height: 100%;
            display: flex;
            background: #fff;
            .leftWrap{
                width: 180px;
                height: 100%;
                border-right: 1px solid #e6e6e6;
                .settingMenu{
                    .settingMenuItem{
                        height: 50px;
                        line-height: 50px;
                        font-size: 14px;
                        color: #303133;
                        padding: 0 20px;
                        cursor: pointer;
                        transition: border-color .3s,background-color .3s,color .3s;
                        &:hover{
                            background: #ecf5ff;
                        }
                        &.active{
                            background: #ecf5ff;
                        }
                    }
                }
            }
            .rightWrap{
                flex: 1;
                width: calc(~"100% - 180px");
                height: 100%;
                padding: 30px 30px 0;
            }
        }
    }
 </style>