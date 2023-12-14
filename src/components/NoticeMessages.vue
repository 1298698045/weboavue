<template>
    <div class="noticeWrap">
      <a-modal
        v-model:open="props.isShow"
        width="900px"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
      >
        <template #title>
          <div>
            消息中心
          </div>
        </template>
        <div class="modalContainer">
          <div class="modalCenter" :style="{ height: height + 'px!important' }">
            <div class="messageCenter">
                <div class="messageLeft">
                    <div class="search">
                        <a-input v-model:value="userName" placeholder="请输入关键字">
                            <template #suffix>
                                <AlignCenterOutlined />
                            </template>
                        </a-input>
                    </div>
                    <div class="apps">
                        <div class="app-item" :class="{'active':current==index}" v-for="(item,index) in 10" @click="handleTab(item,index)">
                            <span class="icon">
                                <img :src="require('@/assets/img/type011.png')" alt="">
                            </span>
                            <span class="title" title="发文提醒">发文提醒</span>
                        </div>
                    </div>
                </div>
                <div class="messageRight">
                    <div class="searchRow">
                        <SearchOutlined style="font-size: 18px;" />
                    </div>
                    <div class="messages">
                        <div class="messageMore">
                            <a href="javascript:;">点击加载更多</a>
                        </div>
                        <div class="messageItem" v-for="item in 10">
                            <div class="message-time">
                                2023-12-08 20:11:23
                            </div>
                            <div class="message-content">
                                <div class="message-title">
                                    有流程到达
                                </div>
                                <div class="message-detail">
                                    <span>Ecology销售合同（合同名称:Ecology销售合同, 合同金额:490000）</span>
                                </div>
                                <div class="message-creator">
                                    创建人：杨文元（演示账号）
                                    <br />
                                    创建时间：2022-12-22 10:11:12
                                </div>
                                <a href="javascript:;" class="message-link">阅读详情<RightOutlined /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <template #footer>
        </template>
      </a-modal>
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
  import { message } from "ant-design-vue";
  import Dtable from "@/components/Dtable.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean
  });
  const data = reactive({
    height: document.documentElement.clientHeight - 370,
    current: 0
  });
  const { height, current } = toRefs(data);
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const handleTab = (item,index) => {
    data.current = index;
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });

  </script>
<style lang="less">
@import url("@/style/modal.less");
.noticeWrap .ant-modal-footer{
    display: none;
}
.ant-modal-header{
    margin-bottom: 0 !important;
}
.modalCenter{
    padding: 0 !important;
}
.messageCenter{
    height: 100%;
    display: flex;
    .messageLeft{
        padding: 12px 0;
        width: 25%;
        height: 100%;
        background: #fff;
        border-right: 1px solid #e2e2e2;
        .search{
            padding: 4px 11px;
            margin-bottom: 10px;
        }
        .apps{
            height: calc(~"100% - 42px");
            overflow-y: auto;
            .app-item{
                display: flex;
                align-items: center;
                position: relative;
                padding: 0 20px;
                width: 100%;
                height: 40px;
                text-align: left;
                line-height: 40px;
                color: #333;
                cursor: pointer;
                transition: all .3s;
                border-top: 1px solid #e2e2e2;
                &:hover{
                    background: #ebf9ff;
                }
                &.active{
                    background: #ebf9ff;
                }
                .icon{
                    display: inline-block;
                    margin-right: 17px;
                    width: 24px;
                    height: 24px;
                    font-size: 18px;
                    color: #fff;
                    border-radius: 50%;
                    line-height: 24px;
                    text-align: center;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                .title{
                    position: relative;
                    padding: 0 4px;
                    display: inline-block;
                    width: 160px;
                }
            }
        }
    }
    .messageRight{
        flex: 1;
        .searchRow{
            height: 46px;
            line-height: 46px;
            background: #fff;
            border-bottom: 1px solid #eaeaea;
            text-align: right;
            padding-right: 10px;
        }
        .messages{
            background: #f9f9f9;
            height: calc(~"100% - 46px");
            overflow-y: auto;
            .messageMore{
                text-align: center;
                padding: 10px;
            }
            .messageItem{
                margin: 0 auto;
                padding: 10px 0;
                color: #999;
                width: 500px;
                .message-time{
                    font-size: 12px;
                    margin-top: 0;
                    margin-bottom: 10px;
                    text-align: center;
                }
                .message-content{
                    text-align: left;
                    position: relative;
                    padding: 2px 12px 8px;
                    background: #fff;
                    border: 1px solid #e2e2e2;
                    .message-title{
                        margin-top: 4px;
                        margin-bottom: 4px;
                        color: #666;
                        font-weight: 700;
                        font-size: 14px;
                    }
                    .message-detail{
                        min-height: 48px;
                        max-height: 148px;
                        color: #333;
                        overflow: hidden;
                        line-height: 16px;
                    }
                    .message-creator{
                        margin-bottom: 4px;
                        min-height: 50px;
                        max-height: 150px;
                        overflow: hidden;
                        font-size: 12px;
                    }
                    .message-link{
                        color: #999;
                        padding-top: 6px;
                        border-top: 1px solid #ebebeb;
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        &:hover{
                            color: var(--textColor);
                        }
                    }
                }
            }
        }
    }
}
</style>
  