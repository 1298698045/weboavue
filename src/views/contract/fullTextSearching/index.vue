<template>
    <div class="wrapper">
        <div class="topbox">
            <span class="seeting">设置</span>
        </div>
        <div class="searchTitle">
            合同查询
        </div>
        <div class="searchBox">
            <a-input-search
                v-model:value="searchVal"
                placeholder="请输入搜索内容关键字"
                enter-button
                @search="onSearch"
                style="width: 400px;"
            />
        </div>
        <div class="esearch-tags-container">
            <a-card title="历史搜索" style="width: 393px;height: 500px;">
                <template #extra>
                    <span class="icon"><RedoOutlined /></span>
                    <span class="icon"><DeleteOutlined /></span>
                </template>
                <div class="card-bd">
                    <div class="esearch-tag" v-for="item in 10">
                        <span>123</span>
                        <span class="delicon">
                            <CloseCircleOutlined />
                        </span>
                    </div>
                </div>
            </a-card>
            <a-card title="历史搜索" style="width: 393px;height: 500px;">
                <template #extra>
                    <span class="icon"><RedoOutlined /></span>
                    <span class="icon"><SettingOutlined /></span>
                </template>
                <div class="card-bd">
                    <div class="esearch-tag" v-for="item in 10">
                        <span>123</span>
                        <span class="delicon">
                            <CloseCircleOutlined />
                        </span>
                    </div>
                </div>
            </a-card>
        </div>
    </div>
</template>
<script setup>
    import {
    RedoOutlined, DeleteOutlined, CloseCircleOutlined, SettingOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated  } from "vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const data = reactive({
    searchVal: ""
  });
  const { searchVal } = toRefs(data);
  const onSearch = (e) => {

  }
</script>
<style lang="less" scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        background: #fff;
        .topbox{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #f4f4f4;
            padding: 10px 20px;
            text-align: right;
            color: #666;
        }
        .searchTitle{
            text-align: center;
            padding-top: 90px;
            padding-bottom: 60px;
            font-size: 40px;
            color: #333;
        }
        .searchBox{
            text-align: center;
        }
        .esearch-tags-container{
            margin: 20px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .ant-card{
                margin-left: 20px;
                .icon{
                    font-size: 16px;
                    padding-left: 10px;
                    color: #666;
                    cursor: pointer;
                }
                .card-bd{
                    .esearch-tag{
                        display: inline-block;
                        position: relative;
                        line-height: 30px;
                        background: #f4f4f4;
                        border-radius: 15px;
                        padding: 0 14px;
                        margin: 8px;
                        cursor: pointer;
                        &:hover .delicon{
                            display: block;
                        }
                        .delicon{
                            position: absolute;
                            right: -5px;
                            top: -10px;
                            color: #666;
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>