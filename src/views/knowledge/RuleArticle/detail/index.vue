<template>
    <div class="detailWrap RuleArticleDetailWrap">
        <div class="detail-header">
            <div class="leftBox">
                <div class="title">
                    <!-- <span class="backText" @click="backToList"> « 返回列表</span> -->
                    <span>制度文件详情</span>
                </div>
                <div class="tabWrap">
                    <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                        <a-tab-pane v-for="(item,index) in tabs" :key="index">
                            <template #tab>
                                <span>
                                    {{item.label}}
                                </span>
                            </template>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
            <div class="rightBox">
                <a-button class="ml10" @click="printForm">导出PDF</a-button>
                <a-dropdown :trigger="['hover']" class="ml10">
                    <span class="btn-drop">
                      <UnorderedListOutlined style="color: #1D2129;" />
                    </span>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="1" @click="printForm">
                          导出Excel
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
            </div>
        </div>
        <div class="detail-scroll">
            <div class="detail-bd">
                <div class="tabContainer containerForm" v-if="activeKey==0" style="padding: 24px 0 24px 24px;">
                    <div class="leftContent">
                        <div class="tableBox">
                            <div id="main-content">
                                <table class="table1">
                                    <tr><td colspan="6" class="formtd"><p class="formtitle">制度台账</p></td></tr>
                                    <tr>
                                        <td colspan="1">制度编号</td>
                                        <td colspan="2" class="righttd">{{FormData.ArticleNumber||''}}</td>
                                        <td colspan="1">制度名称</td>
                                        <td colspan="2" class="righttd">{{FormData.Title||''}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">版本号</td>
                                        <td colspan="2" class="righttd">{{FormData.VersionNumber||''}}</td>
                                        <td colspan="1">状态</td>
                                        <td colspan="2" class="righttd">
                                            <span style="color:#bbb;" v-if="FormData.StateCode=='0'">草稿</span>
                                            <span style="color:#31BA6A;" v-if="FormData.StateCode=='1'">已发布</span>
                                            <span style="color:#F9A6AB;" v-if="FormData.StateCode=='2'">已废止</span>
                                            <span style="color:#015ba7;" v-if="FormData.StateCode=='3'">流转中</span>
                                            <span style="color:#F9A6AB;" v-if="FormData.StateCode=='4'">未通过</span>
                                            <span style="color:#015ba7;" v-if="FormData.StateCode=='5'">已修订</span>
                                            <span style="color:#015ba7;" v-if="FormData.StateCode=='6'">已变更</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">制度目录</td>
                                        <td colspan="2" class="righttd">{{FormData.FolderId&&FormData.FolderId.Name?FormData.FolderId.Name:''}}</td>
                                        <td colspan="1">公开方式</td>
                                        <td colspan="2" class="righttd">{{FormData.PublicationScope||''}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">生效日期</td>
                                        <td colspan="2" class="righttd">{{FormData.ActiveOn||''}}</td>
                                        <td colspan="1">失效日期</td>
                                        <td colspan="2" class="righttd">{{FormData.ExpiresOn||''}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">编制人</td>
                                        <td colspan="2" class="righttd">{{FormData.CreatedBy&&FormData.CreatedBy.Name?FormData.CreatedBy.Name:''}}</td>
                                        <td colspan="1">编制部门</td>
                                        <td colspan="2" class="righttd">{{FormData.BusinessUnitId&&FormData.BusinessUnitId.Name?FormData.BusinessUnitId.Name:''}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">制度文件</td>
                                        <td colspan="5" class="righttd">
                                            <div class="tagWrap">
                                                <span class="tag fileItemImg" v-for="(item,index) in files" :key="index">
                                                    <img :src="require('@/assets/img/filetype/doc.png')" v-if="item.FileExtension == 'ocx' || item.FileExtension == 'docx' || item.FileExtension == 'doc'" />
                                                    <img :src="require('@/assets/img/filetype/rar.png')" v-else-if="item.FileExtension == 'rar' || item.FileExtension == 'zip'" />
                                                    <img :src="require('@/assets/img/filetype/Excel.png')" v-else-if="item.FileExtension == 'xlsx' || item.FileExtension == 'xls'" />
                                                    <img :src="require('@/assets/img/filetype/pdf.png')" v-else-if="item.FileExtension == 'pdf'" />
                                                    <img :src="require('@/assets/img/filetype/TXT.png')" v-else-if="item.FileExtension == 'TXT'||item.FileExtension == 'txt'" />
                                                    <img :src="require('@/assets/img/filetype/PPT.png')" v-else-if="item.FileExtension == 'ppt'||item.FileExtension == 'pptx'" />
                                                    <img :src="require('@/assets/img/filetype/video.png')" v-else-if="item.FileExtension == 'mp4'||item.FileExtension == '.mp4'" />
                                                    <img :src="require('@/assets/img/filetype/defaultImg.png')" v-else-if="item.FileExtension == 'jpg'||item.FileExtension == 'png'||item.FileExtension == 'gif'" />
                                                    <img :src="require('@/assets/img/filetype/File.png')" v-else />
                                                    {{item.Name}}{{item.FileExtension?'.'+item.FileExtension:''}}&nbsp;&nbsp;&nbsp;{{item.FileSize&&Number(item.FileSize)?(Number(item.FileSize)/1024).toFixed(1)+'KB':''}}
                                                    <span class="filebtn">
                                                        <a href="#" @click="openZW(item)">查看</a>
                                                        <a href="#" @click="openZW(item)">下载</a>
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContainer" v-if="activeKey==1">
                    <Related :id="id" :entityApiName="'InstitutionHistory'" :title="'变更记录'" />
                </div>
                <div class="tabContainer" v-if="activeKey==2">
                    <Related :id="id" :entityApiName="'KbArticleVersion'" :title="'修订记录'" />
                </div>
                <div class="tabContainer" v-if="activeKey==3">
                    <Related :id="id" :entityApiName="'KbArticleAbolish'" :title="'废止记录'" />
                </div>
                <div class="tabContainer" v-if="activeKey==4">
                    <Comment :isTitle="false" :id="id" />
                </div>
            </div>
        </div>
        <SubmitProcess ref="processRef" v-if="isProcess" :isShow="isProcess" @update-status="updateStatus" :paramsData="ProcessData" />
        <ApprovalRejection ref="rejectionRef" v-if="isRejection" :isShow="isRejection" @update-status="updateStatus" :paramsData="RejectionData"  />
        <circulation-modal ref="circulationRef" @update-status="updateStatus" v-if="isCirculation" :paramsData="CirculationData.params" :isShow="isCirculation"></circulation-modal>
        <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal" v-if="isModal" />
        <Urging ref="UrgingRef" @update-status="updateStatus" v-if="isUrging" :paramsData="UrgingData.params" :isShow="isUrging" />
        <RelateInstance v-if="isRelateInstance" :id="id" :entityApiName="lookEntityApiName" :entityType="lookEntityType" :objectTypeCode="lookObjectTypeCode" :isShow="isRelateInstance" @select="handleSelectLook" @cancel="isRelateInstance=false" />
    </div>
</template>
<script setup>
    import "@/style/detail.less";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined,
        UpOutlined,
        PlusOutlined
    } from "@ant-design/icons-vue";
    import Related from "@/components/detail/Related2.vue";
    import Info from "@/components/detail/Info.vue";
    import ReadRecord from "@/components/detail/ReadRecord.vue";
    import Comment from "@/components/detail/Comment.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import useWrokDetail from "@/utils/workDetail";
    const { relatedList, getRelatedWork } = useWrokDetail();
    import SubmitProcess from "@/components/workflow/SubmitProcess.vue";
    import ApprovalRejection from "@/components/workflow/ApprovalRejection.vue";
    import CirculationModal from "@/components/workflow/CirculationModal.vue";
    import Delegate from "@/components/workflow/Delegate.vue";
    import Urging from "@/components/workflow/Urging.vue";
    import RelateInstance from "@/components/workflow/RelateInstance.vue";
    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
        tabs: [
            {
                label: "基本信息"
            },
            {
                label: "变更记录"
            },
            {
                label: "修订记录"
            },
            {
                label: "废止记录"
            },
            {
                label: "意见反馈"
            },
        ],
        activeKey: 0,
        isProcess: false,
        isRejection: false,
        ProcessData: {},
        RejectionData: {},
        isCirculation: false,
        isModal: false,
        isUrging: false,
        categoryFiles: [],
        isAside: true,
        reqIndex: 1,
        pageCurrent: 1,
        id:route.query.id,
        fileList:[],
        isRelateInstance:false,
        lookEntityApiName: "",
        lookObjectTypeCode: "",
        lookEntityType:"",
        FormData:{}
    })
    const { tabs, activeKey, isProcess,isRejection, ProcessData, RejectionData,FormData,
         isCirculation, isModal, isUrging, categoryFiles, isAside, reqIndex,id,fileList,isRelateInstance,lookEntityApiName,lookObjectTypeCode,lookEntityType,
         pageCurrent } = toRefs(data);
    const changeTabs = (e) => {
        data.activeKey = e;
    }
    const backToList = () =>{
        if(route.query.reurl){
            router.push({
                path: route.query.reurl,
                query: {
                }
            });
        }
        //window.history.go(-1);
    }
    getRelatedWork();
    
    const handleSubmitProcess = () => {
        data.isProcess = true;
    }
    const handleRejection = () => {
        data.isRejection = true;
    }
    const updateStatus = () => {
        data.isProcess = false;
        data.isRejection = false;
        data.isCirculation = false;
        data.isModal = false;
        data.isUrging = false;
    }
    const CirculationData = reactive({
        params: {}
    })
    const DelegateData = reactive({
        params: {}
    })
    function CirculationFn(InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName){
        CirculationData.params = {
            InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName
        }
        data.isCirculation = true;
    }
    const handleCirculation = () => {
        data.isCirculation = true;
    }
    const handleDelegate = () => {
        data.isModal = true;
    }
    const UrgingData = reactive({
        params: {}
    })
    const handleUrging = () => {
        data.isUrging = true;
    };

    const getFiles = () => {
        proxy.$get(Interface.flow.files, {
            InstanceId: "",
            InstanceState: 1,
            right: 16
        }).then(res=>{
            data.categoryFiles = res.CategoryFiles
        })
    };
    getFiles();
    const changePagination = (e) => {

    };
    const openZW=(row)=>{
        let url='';
        if(row&&row.FileExtension == 'pdf'){
            url='/pdfjs/web/viewer.html?file='+encodeURIComponent('../../resources/uploadfiles'+row.ViewLinkUrl)+"";
        }
        window.open(url);
    }
    //保存
    const handSave=()=>{
        message.success("保存成功");
    }
    //打印
    const printForm= () => {
            let url = router.resolve({
                path:'/lightning/workflow/WFFormPrint',
                name: "WFFormPrint",
                query: {
                    id: route.query.id,
                },
            });
            window.open(url.href);
    }
    //添加关联事务
    const addRelateInstance=()=>{
        data.isRelateInstance=true;
    }
    //关联事务选中
    const handleSelectLook=()=>{
        data.isRelateInstance=false;
    }
</script>
<style lang="less" scoped>
    .collapse{
        .collapseItem{
            margin: 5px;
            .collapseHead{
                height: 32px;
                background: #f3f2f2;
                color: #4e5969;
                border-radius: 4px;
                font-size: 13px;
                padding: 0 10px;
                display: flex;
                align-items: center;
                .collapseItemName{
                    flex: 1;
                    padding-left: 10px;
                }
            }
            .collapseBd{
                background: #fff;
                .files{
                    .fileItem{
                        display: flex;
                        padding: 10px;
                        border-bottom: 1px solid #e5e6eb;
                        .fileItemImg{
                            width: 40px;
                            height: 40px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .fileItemInfo{
                            flex: 1;
                            font-size: 14px;
                            margin-left: 10px;
                            .link{
                                a{
                                    color: #3399ff;
                                }
                            }
                            .time{
                                font-size: 12px;
                                color: #b8bbcc;
                            }
                        }
                        
                    }
                }
            }
        }
    }

    .reqWrap{
        width: 100%;
        margin-top: 20px;
        box-shadow: 0 0 5px #ddd;
        background: #fff;
        .reqHead{
            height: 48px;
            line-height: 48px;
            background: #f4f4f4;
            border: 1px solid #d0d0d0;
            border-top-width: 0;
        }
        .reqBd{
            .reqSignList>div{
                border-top-width: 0;
            }
            .reqSignList{
                padding: 11px 10px;
                .reqSignListCont{
                    position: relative;
                    padding: 15px 21px;
                    border-bottom: 1px dashed #e4e4e4;
                    display: flex;
                    .content-left>div{
                        line-height: 24px;
                        margin-right: 10px;
                    }
                    .content-left{
                        padding-left: 48px;
                        line-height: 36px;
                        display: flex;
                        .avatarImg{
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            margin: 5px 0 0 -48px;
                            text-align: center;
                            margin-right: 10px;
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .operate-name-label{
                            display: inline-block;
                            word-break: break-all;
                            color: #4d7ad8;
                        }
                        .left-department-span{
                            word-break: break-all;
                            display: inline-block;
                        }
                    }
                    .content-right{
                        flex: 1;
                        .content-right-remark-html{
                            min-height: 24px;
                            word-wrap: break-word;
                            word-break: normal;
                        }
                        .logitem-Recipient{
                            line-height: 24px;
                            color: #8a8a8a;
                        }
                        .loglist-item-operatedate{
                            line-height: 22px;
                            margin-top: 10px;
                            color: #9a9a9a;
                            overflow: hidden;
                        }
                    }
                }
                .pagination{
                    text-align: right;
                    padding: 15px 0 10px 0;
                }
            }
        }
    }
    .RuleArticleDetailWrap{
        .leftContent{
            width:calc(~"100% - 25px");
            border: none;
        }
        .detail-scroll{
            height: calc(~"100% - 70px") !important;
        }
        .tableBox{
            width:  calc(~"100% - 0px") !important;
            height: 100%;
        }
        #main-content td {
            border: 1px solid #333;
            min-width: 80px;
            box-sizing: border-box;
            padding: 5px;
            width: 95px;
            word-break: break-all;
        }

        #main-content tr td:first-child {
            max-width: 100px;
        }

        #main-content td.title {
            font-weight: 700;
        }

        .dataspan {
            border-bottom: 1px solid #333;
        }

        .printbtn {
            width: 98%;
            text-align: right;
            padding-top: 15px;
        }

        #main-content {
            padding: 10px;
        }

        .formtitle {
            font-size: 26px;
            line-height: 40px;
            /*font-weight:700;*/
            text-align: center;
        }

        #main-content tr {
            line-height: 28px;
        }

        #main-content tr td p.text {
            text-align: left;
            margin-left: 15px;
        }

        #main-content tr td .opinion {
            text-align: left;
            width: 120px;
            margin-left: 70%;
            margin-top: 10px;
            height: 70px;
            overflow: hidden;
        }

        .table1 {
            border-collapse: collapse;
            width: 100%;
            text-align: center;
            font-size: 16px;
        }

        .formtitle {
            font-family: SimHei;
            font-size: 30px;
            margin-bottom: 15px;
        }

        .formtitlebottom {
            height: 30px;
            text-align: right;
            margin-top: 40px;
            font-size: 21px;
            font-family: FangSong;
        }

        #main-content {
            width: 750px;
            margin: 0 auto;
            text-align: left;
            color: #000;
        }

        .table1 {
            margin-bottom: 20px;
        }

        #main-content .table1 tr td {
            min-width: 120px;
            text-align: center;
        }
        #main-content .table1 tr td.formtd{
            border:0;
            border-bottom:1px solid #000;
        }
    }
</style>