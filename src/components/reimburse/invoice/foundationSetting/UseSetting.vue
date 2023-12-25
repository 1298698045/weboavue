<template>
    <div class="statusContent">
        <div class="main">
            <span class="caption">允许报销的发票查验状态</span>
            <a-checkbox-group v-model:value="value">
                <a-checkbox value="有效已查验" disabled>有效已查验</a-checkbox>
                <a-checkbox value="有效" disabled>有效</a-checkbox>
                <a-checkbox value="未查验">未查验</a-checkbox>
                <a-checkbox value="无效">无效</a-checkbox>
                <a-checkbox value="校验失败">校验失败</a-checkbox>
            </a-checkbox-group>
        </div>
        <div class="stip">默认选中有效、有效已查验且不可取消选中，支持设置其他查验状态的发票也可发起报销</div>
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
   import Interface from "@/utils/Interface.js";
   const { proxy } = getCurrentInstance();
   const data = reactive({
    value: ['有效已查验','有效']
   });
   const { value } = toRefs(data);
 </script>
 <style lang="less" scoped>
    .statusContent{
        width: 100%;
        padding: 14px 16px;
        background: #fff;
        border: 1px solid #e5e5e5;
        position: relative;
        .main{
            display: flex;
            align-items: center;
           .caption {
                color: #111;
                font-size: 14px;
                padding-right: 10px;
            }
        }
        .stip{
            height: 12px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999;
            line-height: 12px;
            font-weight: 400;
            margin-top: 13px;
        }
    }
 </style>