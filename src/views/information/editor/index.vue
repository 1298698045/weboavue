<template>
    <div class="editorWrap">
        <div class="editorHeader">
            <div class="editPageHeadBd">
                <div class="left">
                    <input type="text" v-model="detail.Title" class="titleInp" autocomplete="off">
                </div>
                <div class="right">
                    <div class="invitation" @click="handleInvitation">
                        <i class="iconfont icon-tianjia"></i>
                    </div>
                    <div>
                        <div class="btnText"><i class="iconfont icon-sousuo"></i></div>
                        <div class="btnText"><i class="iconfont icon-xiugaimima"></i></div>
                        <a-button type="primary" class="ml10">保存</a-button>
                        <a-button type="primary" class="ml10">发布</a-button>
                        <a-button class="ml10">关闭</a-button>
                        <a-dropdown :trigger="['hover']" class="ml10">
                            <div class="btnText">
                                <i class="iconfont icon-gengduo"></i>
                            </div>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>
                                        取消发布
                                    </a-menu-item>
                                    <a-menu-item>
                                        查看详情
                                    </a-menu-item>
                                    <a-menu-item>
                                        预览
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div class="centerScrollWrap" ref="contentRef">
            <div class="editorBody">
                <div class="editorBox">
                    <Editor placeholder="" ref="editorRef" :height="height" @input="getContent" />
                    <div class="uploadPanel">
                        <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            >
                            <div class="uploadRow">
                                <p class="ant-upload-drag-icon">
                                    <inbox-outlined></inbox-outlined>
                                </p>
                                <p class="ant-upload-text">将文件拖到此处，或点击上传</p>
                            </div>

                        </a-upload-dragger>
                    </div>
                </div>
                <div class="context-panel">
                    <div class="context-content">
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="模板"></a-tab-pane>
                        </a-tabs>
                        <div class="searchBox">
                            <a-input-search v-model:value="searchVal" placeholder="搜索模板" style="width: 100%"
                                @search="onSearch" />
                        </div>
                        <div class="templateList">
                            <div class="templateItemWrap">
                                <div class="templateItem">
                                    <div class="avatar"></div>
                                    <div class="templateInfo">
                                        <p class="name">会议</p>
                                        <p class="desc">
                                            这是会议模板
                                        </p>
                                    </div>
                                </div>
                                <div class="showPreviewTemplate">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <RadioUser :isShow="isRadioUser" @cancel="cancleRadio" />
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import "@/style/icon/iconfont.css";
    import "@/style/modal.less";
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, h, toRaw, computed
    } from "vue";
    import Interface from "@/utils/Interface.js";
    import { useRouter, useRoute } from "vue-router";
    import { UnorderedListOutlined, InboxOutlined } from "@ant-design/icons-vue";
    import Editor from "@/components/TEditor.vue"
    import RadioUser from "@/components/commonModal/RadioUser.vue"
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const contentRef = ref();
    const editorRef = ref();
    const data = reactive({
        height: 500,
        activeKey: '1',
        detail: "",
        isRadioUser: false,
        fileList: [],
        searchVal: ""
    })
    const { height, activeKey, detail, isRadioUser, fileList, searchVal } = toRefs(data);
    onMounted(()=>{
        data.height = contentRef.value.clientHeight;
        console.log("editorRef.value.init();",editorRef.value)
    })
    const getContent = (e) => {
        console.log('e', e);
    }
    const handleInvitation = () => {
        data.isRadioUser = true;
    }
    const cancleRadio = (e) => {
        data.isRadioUser = e;
    }
    const getDetail = () => {
        proxy.$get(Interface.information.detail,{
            id: "",
            objectTypeCode: "100201"
        }).then(res=>{
            data.detail = res.actions[0].returnValue.record;
        })
    }
    const onSearch = (e) => {

    }
    getDetail();
</script>
<style lang="less">
    .editorWrap{
        height: 100vh;
    }
    .editorWrap{
        overflow: hidden;
    }
    .editorHeader {
        width: 100%;
        height: 56px;
        position: sticky;
        left: 0;
        top: 0;
        background: #fff;
        z-index: 100;
        box-shadow: rgb(235, 236, 240) 0px 2px 0px 0px;

        .editPageHeadBd {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;

            .left {
                flex: 1;

                .titleInp {
                    line-height: 56px;
                    font-weight: bold;
                    width: 99%;
                    font-size: 24px;
                    border: none;
                    outline: 0;
                }
            }

            .right {
                display: flex;
                align-items: center;

                .invitation {
                    width: 36px;
                    height: 36px;
                    display: inline-block;
                    border-radius: 50%;
                    cursor: pointer;
                    background: rgb(244, 245, 247);
                    text-align: center;
                    line-height: 36px;
                    margin-left: -4px;
                    margin-right: 10px;

                    &:hover {
                        background: rgba(9, 30, 66, 0.08);
                    }
                }

                .btn-drop:hover {
                    cursor: pointer;
                }
            }
        }
    }
    .centerScrollWrap{
        height: calc(~"100% - 56px");
        overflow: auto;
    }
    .editorBody {
        display: flex;

        .editorBox {
            width: calc(~"100% - 340px");
        }

        .context-panel {
            width: 320px;
            position: absolute;
            right: 20px;
            height: calc(~"100% - 56px");
            background: #fff;
            z-index: 99;
            box-shadow: rgb(235, 236, 240) 2px 0px 0px 0px inset;

            .context-content {
                padding: 20px;
                box-sizing: border-box;
                position: relative;

                .searchBox {
                    margin: 20px 0;
                }

                .templateList {
                    .templateItemWrap {
                        position: relative;
                        &:hover .templateItem{
                            background: #EBECF0;
                        }
                        &:hover .showPreviewTemplate{
                            visibility: visible;
                            display: block;

                        }
                        .templateItem {
                            display: flex;
                            cursor: pointer;
                            font-size: 14px;
                            padding: 12px;
                            box-sizing: border-box;
                            border-radius: 3px;
                            .avatar {
                                width: 32px;
                                height: 32px;
                                background: #ccc;
                                border-radius: 4px;
                            }

                            .templateInfo {
                                flex: 1;
                                margin-left: 20px;

                                .name {
                                    margin-top: -4px;
                                    min-height: 19px;
                                    max-height: 38px;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    margin-right: 20px;
                                    line-height: 1.4;
                                }

                                .desc {
                                    margin-top: 4px;
                                    min-height: 16px;
                                    max-height: 64px;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 4;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    color: #6b778c;
                                }
                            }
                        }
                        .showPreviewTemplate{
                            position: absolute;
                            z-index: 999;
                            right: 100%;
                            top: -100px;
                            width: 500px;
                            height: 300px;
                            background: #fff;
                            box-shadow: rgba(9, 30, 66,31%) 0px 0px 1px, rgba(9, 30, 66, 20%) 0px 3px 5px;
                            visibility: hidden;
                            display: none;
                            padding: 20px;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }
    }

    .uploadRow {
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag .ant-upload {
        padding: 0 !important;
    }
</style>