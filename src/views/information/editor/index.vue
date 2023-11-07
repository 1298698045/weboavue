<template>
    <div class="editorWrap">
        <div class="editorHeader">
            <div class="editPageHeadBd">
                <div class="left">
                    <input type="text" v-model="detail.Title" class="titleInp" autocomplete="off">
                </div>
                <div class="right">
                    <div class="avatarGroup">
                        <div name="合同管理员" class="avatarItem"><i class="iconfont icon-morentouxiang"></i></div>
                        <div name="oa管理员" class="avatarItem"><i class="iconfont icon-morentouxiang"></i></div>
                    </div>
                    <div class="invitation" @click="handleInvitation">
                        <i class="iconfont icon-tianjia"></i>
                    </div>
                    <div>
                        <div class="btnText"><i class="iconfont icon-sousuo"></i></div>
                        <div class="btnText"><i class="iconfont icon-xiugaimima"></i></div>
                        <a-button type="primary" class="ml10" @click="handleSave">保存</a-button>
                        <a-button type="primary" class="ml10" @click="handleSubmit">发布</a-button>
                        <a-button class="ml10" @click="closeEditor">关闭</a-button>
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
                    <Editor v-if="isEditor" placeholder="" ref="editorRef" :height="height" @input="getContent" />
                    <div class="uploadPanel">
                        <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                            <div class="uploadRow">
                                <p class="ant-upload-drag-icon">
                                    <inbox-outlined></inbox-outlined>
                                </p>
                                <p class="ant-upload-text">将文件拖到此处，或点击上传</p>
                            </div>
                            <template #itemRender="{ file, actions }">
                                <div class="uploadList">
                                    <div class="uploadItem">
                                        <div>
                                            <img :src="require('@/assets/img/filetype/doc.png')"
                                                v-if="file.FileExtension=='ocx'||file.FileExtension=='docx'||file.FileExtension=='doc'" />
                                            <img :src="require('@/assets/img/filetype/rar.png')"
                                                v-else-if="file.FileExtension=='rar'||file.FileExtension=='zip'" />
                                            <img :src="require('@/assets/img/filetype/Excel.png')"
                                                v-else-if="file.FileExtension=='xlsx'||file.FileExtension=='xls'" />
                                            <img :src="require('@/assets/img/filetype/pdf.png')"
                                                v-else-if="file.FileExtension=='pdf'" />
                                            <img :src="require('@/assets/img/filetype/TXT.png')"
                                                v-else-if="file.FileExtension=='TXT' || file.FileExtension=='txt'" />
                                            <img :src="require('@/assets/img/filetype/PPT.png')"
                                                v-else-if="file.FileExtension=='ppt'||file.FileExtension=='pptx'" />
                                            <img :src="require('@/assets/img/filetype/video.png')"
                                                v-else-if="file.FileExtension=='mp4'||file.FileExtension=='.mp4'" />
                                            <img :src="require('@/assets/img/filetype/defaultImg.png')"
                                                v-else-if="file.FileExtension=='jpg'||file.FileExtension=='png'||record.FileExtension=='gif'" />
                                            <img :src="require('@/assets/img/filetype/File.png')" v-else />
                                            <div class="filemsg">

                                            </div>
                                            <div class="uploadAction">
                                                <div class="icons">
                                                    <span class="icon">
                                                        <ZoomInOutlined />
                                                    </span>
                                                    <span class="icon">
                                                        <DownloadOutlined />
                                                    </span>
                                                    <span class="icon">
                                                        <DeleteOutlined />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </template>
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
                                <div class="templateItem" v-for="(item,index) in templateList" :key="index" @mouseover="handleMouseover(item)">
                                    <div class="avatar"></div>
                                    <div class="templateInfo">
                                        <p class="name">{{item.name}}</p>
                                        <p class="desc">
                                            {{item.desc}}
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
        <RadioUser :isShow="isRadioUser" @cancel="cancleRadio" @selectVal="handleSelectUser" />
        <RelaseInfo :isShow="isRelaseInfo" @cancel="cancelRelaseInfo" />
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
    import { UnorderedListOutlined, InboxOutlined, ZoomInOutlined, DownloadOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import Editor from "@/components/TEditor.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import RelaseInfo from  "@/components/information/RelaseInfo.vue";
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const contentRef = ref();
    const editorRef = ref();
    const data = reactive({
        height: 0,
        content: "",
        activeKey: '1',
        detail: "",
        isRadioUser: false,
        fileList: [],
        searchVal: "",
        isEditor: false,
        templateList: [
            {
                name: '会议',
                desc: '这是会议模板',
                htmlDiv: '<en-note id="en-note" class="ProseMirror ProseMirror-focused peso semantic font-size-m editable" contenteditable="true" style="font-family: 默认字体, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;, -apple-system, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, BlinkMacSystemFont; padding: 12px 433px 150px 432px; margin-right: 0px;"><h2 data-b_id="NUiySy2dpR_">会议信息</h2><ul data-b_id="CYGdT6wnFoi"><li data-b_id="_oMjQmKvHb7"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 15.5px;"></div><div class="list-content"><div data-b_id="aQg0T-lQ22j" class="p">主题：<span style="color: #D5D5DE;">如 XX产品项目立项评审会议</span></div></div></li><li data-b_id="IRHrRycZGgT"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 15.5px;"></div><div class="list-content"><div data-b_id="LrZZQ2qI05D" class="p">时间：<span style="color: #D5D5DE;">如 </span><span class="date-box_1zQei" contenteditable="false"><en-date class=""><div class="datetime_2yqXw"><span>2022/4/20 16:30</span></div></en-date></span><span style="color: #D5D5DE;">，可使用“插入时间”添加</span></div></div></li><li data-b_id="yl-3SeQHqbl"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 15.5px;"></div><div class="list-content"><div data-b_id="BDpqS6XMzW6" class="p">地点：<span style="color: #D5D5DE;">具体会议地点</span></div></div></li><li data-b_id="n_PtT-2qi6B"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 15.5px;"></div><div class="list-content"><div data-b_id="Q6eMS6L8bdK" class="p">参会人：<span style="color: #D5D5DE;">参会人员名单</span></div></div></li></ul><div data-b_id="KcuoSi-s3E4" class="p"><br></div><div class="custom-hr" contenteditable="false"><div class="block-insert-handle" draggable="false"><svg viewBox="1.3 1.3 14 14"><use xlink:href="#3pIoG"></use></svg></div><div class="block-drag-handle" draggable="true"><svg viewBox="0 0 14 14"><use xlink:href="#5jqQY"></use></svg></div></div><h2 data-b_id="YDOOQ2Zmoh5">会议资料</h2><p data-b_id="C85BQmLp2kq" class="p">请与会者提前阅读资料，确保会议效率。</p><en-blockquote spellcheck="false"><div class="quoteComponentWarp" contenteditable="false"></div><div class="quoteContent"><div data-b_id="5t1MRy8TuMC" class="p"><span style="font-size: 14px;">点击“+”或输入“/”，选择插入“<span style="background-color: #e2f0fe;">🧷附件</span>”上传项目相关文档资料</span></div></div></en-blockquote><div class="custom-hr" contenteditable="false"><div class="block-insert-handle" draggable="false"><svg viewBox="1.3 1.3 14 14"><use xlink:href="#3pIoG"></use></svg></div><div class="block-drag-handle" draggable="true"><svg viewBox="0 0 14 14"><use xlink:href="#5jqQY"></use></svg></div></div><h2 data-b_id="ubPEQ6RQqg8">会议议题</h2><en-blockquote spellcheck="false"><div class="quoteComponentWarp" contenteditable="false"></div><div class="quoteContent"><div data-b_id="-GFaSmjAaAf" class="p">明确本次会议的讨论要点，避免会议过程发散</div></div></en-blockquote><ol data-b_id="e44XTmFdwX5"><li data-b_id="jlIaTamtzCl"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 15.5px;" data-index="1."></div><div class="list-content"><div data-b_id="LMTdTyXU4u6" class="p"> </div></div></li><li data-b_id="nkKlTebVM0s"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 15.5px;" data-index="2."></div><div class="list-content"><div data-b_id="PGJ0Se94hyb" class="p"> </div></div></li><li data-b_id="SafwS217Kr6"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 16.5px;" data-index="3."></div><div class="list-content"><div data-b_id="Eg-SRG-qiNv" class="p"><br></div></div></li></ol><h2 data-b_id="pZCGTK_XG-j">结论</h2><en-blockquote spellcheck="false"><div class="quoteComponentWarp" contenteditable="false"></div><div class="quoteContent"><div data-b_id="68-XR-_gXm2" class="p">本次会议主要结论</div></div></en-blockquote><ol data-b_id="BYLXTmasVGG"><span draggable="false" class="block-insert-handle ProseMirror-widget" title="点击在下方插入模块或新增一行" contenteditable="false"><svg style="top: 4px; left: -67px;" draggable="false" viewBox="1.3 1.3 14 14">' +
                    '                            <use xlink:href="#3pIoG"></use>' +
                    '                        </svg></span><li data-b_id="lAN2QWtGw-X"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 15.5px;" data-index="1."></div><div class="list-content"><div data-b_id="XZyFQakV1ws" class="p"> </div></div></li><li data-b_id="VMfaSuCyyX_"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 15.5px;" data-index="2."></div><div class="list-content"><div draggable="true" class="list-drag-handle ProseMirror-widget" contenteditable="false"><svg draggable="false" viewBox="0 0 14 14"><use xlink:href="#5jqQY"></use></svg></div><div data-b_id="pNdbT247mbz" class="p"> </div></div></li><li data-b_id="EN_wT6AgCZr"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 16.5px;" data-index="3."></div><div class="list-content"><div data-b_id="PsBYSGlxup4" class="p"><br></div></div></li></ol><div class="custom-hr" contenteditable="false"><div class="block-insert-handle" draggable="false"><svg viewBox="1.3 1.3 14 14"><use xlink:href="#3pIoG"></use></svg></div><div class="block-drag-handle" draggable="true"><svg viewBox="0 0 14 14"><use xlink:href="#5jqQY"></use></svg></div></div><h2 data-b_id="d85wQKHrgdx">下一步行动</h2><en-blockquote spellcheck="false"><div class="quoteComponentWarp" contenteditable="false"></div><div class="quoteContent"><div data-b_id="XGOpTe1EPJY" class="p">为确保会议有效，建议会议结束后明确详细Todo、执行人、时间点信息</div></div></en-blockquote><ul data-b_id="myg0S6fA-Ca" class="en-todolist"><li data-b_id="661hSOEINTT"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 16.5px;"></div><div class="list-content"><p data-b_id="4ISGSefrNkN" class="p">To-do1说明，交付时间，执行人</p></div></li></ul><ul data-b_id="YwuFTCOnpeh" class="en-todolist"><li data-checked="false" data-b_id="pJspSi3A1yz"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 16.5px;"></div><div class="list-content"><p data-b_id="v9myQuPcLPu" class="p">To-do2说明，交付时间，执行人</p></div></li><li data-checked="false" data-b_id="zQdGTONmjNs"><div class="list-bullet user-no-select" contenteditable="false" style="opacity: 1; top: 16.5px;"></div><div class="list-content"><p data-b_id="CIFESimkNJG" class="p">……</p></div></li></ul><div data-b_id="5AkOTaP_HL8" class="p"><br></div></en-note>'
            }
        ],
        isRelaseInfo: false
    })
    const { height, activeKey, content, detail, isRadioUser,
         fileList, searchVal, isEditor, templateList, isRelaseInfo } = toRefs(data);
    onMounted(() => {
        data.height = contentRef.value.clientHeight;
        data.isEditor = true;
        console.log("height", data.height);
        // console.log("editorRef.value.init();",editorRef.value.init.height = data.height)
        // editorRef.value.init.height = data.height;
        window.addEventListener("resize", () => {
            data.height = contentRef.value.clientHeight;
            console.log("data.height", data.height);

        })
    })
    const getContent = (e) => {
        console.log('e', e);
        data.content = e;
    }
    const handleInvitation = () => {
        data.isRadioUser = true;
    }
    // 关闭发布弹窗
    const cancleRadio = (e) => {
        data.isRadioUser = e;
    }
    const cancelRelaseInfo = (e) => {
        data.isRelaseInfo = e;
    }
    const handleSelectUser = (params) => {
        console.log("params", params);
        proxy.$get(Interface.information.invite,{
            userIds: params.ID,
            contentid: ""
        }).then(res=>{
            message.success(res.msg);
            data.isRadioUser = false;
        })
    }
    const getDetail = () => {
        proxy.$get(Interface.information.detail, {
            id: "",
            objectTypeCode: "100201"
        }).then(res => {
            data.detail = res.actions[0].returnValue.record;
        })
    }
    const onSearch = (e) => {

    }
    getDetail();
    const handleMouseover = (item) => {
        $('.showPreviewTemplate').html(item.htmlDiv)
    }
    const getFiles = () => {
        proxy.$get(Interface.information.files, {}).then(res => {
            console.log("res", res);
            data.fileList = res.listData;
        })
    }
    getFiles();
    // 保存
    const handleSave = () => {
        var obj = {
            params: {
                recordRep: {
                    objTypeCode: "",
                    id: "",
                    ContentTypeCode: 1,
                    fields: {
                        Title: data.detail.Title,
                        FolderId:{
                            Id: ""
                        },
                        ContentBody: data.content
                    }
                }
            }
        }
        var d = {
            message: JSON.stringify(obj)
        }
        proxy.$get(Interface.saveRecord,d).then(res=>{
            if (res.status == 1) {
                message.success("保存成功！");
            }
        })
    }
    const handleSubmit = () => {
        data.isRelaseInfo = true;
    }
    const closeEditor = () => {
        window.close();
    }
</script>
<style lang="less">
    .editorWrap {
        height: 100vh;
    }

    .editorWrap {
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

                .avatarGroup {
                    .avatarItem {
                        width: 36px;
                        height: 36px;
                        display: inline-block;
                        border-radius: 50%;
                        cursor: pointer;
                        margin-left: -8px;

                        .iconfont {
                            font-size: 36px;
                            color: #C9CDD4;
                        }
                    }
                }

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

                    .iconfont {
                        font-size: 14px;
                        color: #091e42;
                    }

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

    .centerScrollWrap {
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

                        &:hover .templateItem {
                            background: #EBECF0;
                        }

                        &:hover .showPreviewTemplate {
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

                        .showPreviewTemplate {
                            position: absolute;
                            z-index: 999;
                            right: 100%;
                            top: -100px;
                            width: 500px;
                            height: 300px;
                            background: #fff;
                            box-shadow: rgba(9, 30, 66, 31%) 0px 0px 1px, rgba(9, 30, 66, 20%) 0px 3px 5px;
                            display: none;
                            padding: 20px;
                            box-sizing: border-box;
                            overflow: hidden;
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
    :where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag p.ant-upload-drag-icon{
        margin-bottom: 0 !important;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag .ant-upload {
        padding: 0 !important;
    }

    .ant-upload-list {
        display: flex;
        flex-wrap: wrap;

        .ant-upload-list-item-container {
            width: 148px;
            height: 148px;
            margin-right: 10px;
        }
    }

    .uploadItem {
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        margin: 0 8px 8px 0;
        display: inline-block;
        position: relative;
        cursor: pointer;

        img {
            width: 125px;
        }

        &:hover .uploadAction {
            opacity: 1;
        }

        .uploadAction {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            cursor: default;
            text-align: center;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: rgba(0, 0, 0, .5);
            -webkit-transition: opacity .3s;
            transition: opacity .3s;
            display: flex;
            align-items: center;
            justify-content: center;

            .icons {
                display: flex;

                .icon {
                    display: inline-block;
                    width: 30px;
                    cursor: pointer;

                    &:hover {
                        color: var(--textColor);
                    }
                }
            }
        }
    }
    
</style>