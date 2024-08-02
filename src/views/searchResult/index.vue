<template>
    <div class="SearchResultWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                </div>
                <div class="panel-btn">
                </div>
                <div class="result-input">
                    <div class="weeso-con">
                        <div class="weeso-con-main">
                            <div class="weeso-tab " style="width: 455px;">
                                <div class="ant-spin-nested-loading">
                                    <div class="ant-spin-container">
                                        <ul class="weeso-tab-content">
                                            <li class="weeso-tab-moredefault" id="ALL">全部</li>
                                            <li class="weeso-tab-defeault" id="DOC">信息</li>
                                            <li class="weeso-tab-defeault" id="CPT">通知</li>
                                            <li class="weeso-tab-defeault" id="EMAIL">邮件</li>
                                            <li class="weeso-tab-defeault" id="WF">流程</li>
                                            <li class="weeso-tab-defeault" id="WKP">日程</li>
                                            <li class="weeso-tab-defeault" id="MET">会议</li>
                                            <li class="weeso-tab-defeault" id="ODOC">公文</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="weeeso-input">
                                <div class="input-search">
                                    <input placeholder="请输入搜索内容关键字" class="input" v-model="data.searchVal" @change="getSearchResultList">
                                    <button type="button" class="ant-btn ant-btn-primary wesoo-search-btn" @click="getSearchResultList">
                                        <span>搜 索</span>
                                    </button>
                                </div>
                                <div class="input-left">
                                    <div class="flip-container">
                                        <ProfileTwoTone />
                                    </div>
                                    <span class="input-line"></span>
                                </div>
                                <div class="esearch-pc-AboutBrowser-alink-content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="result-tool">
                        <p class="tool-left" style="width: calc(100% - 90px);">
                            <span class="tool-left-desc" :title="'搜索 '+data.searchVal+' 获得 '+data.total+' 条结果'">
                                <span>搜索 <b style="color:red;">{{data.searchVal}}</b> 获得 {{data.total}} 条结果</span></span>
                            </p>
                            <p class="tool-right">高级搜索</p>
                        </div>
                    </div>
            </div>
            <div class="panel-bd">
                <div class="panelSearchResultWrap">
                    <div class="SearchResultList">
                        <template v-if="listData.length">
                            <div class="SearchResultItemBox" v-for="(item,index) in listData" :key="index">
                            <div class="SearchResultRow SearchResultRow1">
                                <span class="SearchResultType">{{ item.type?'['+item.type+'] ':'' }}</span>
                                <span class="SearchResultTitle" v-html="item.Title" @click="handleDetail(item.id)"></span>
                            </div>
                            <div class="SearchResultRow SearchResultRow2">
                                <span class="SearchResultContent ellipsis-multiline" v-html="item.ContentBody"></span>
                            </div>
                            <div class="SearchResultRow SearchResultRow3">
                                <span class="SearchResultBottom">创建者：{{ item.CreatedBy }}</span>
                                <span class="SearchResultBottom">目录：{{ item.FolderId }}</span>
                                <span class="SearchResultBottom">创建日期：{{ item.CreatedOn }}</span>
                            </div>
                        </div>
                        </template>
                        <template v-if="listData.length==0">
                            <div class="emptyContentbox">关键字 {{ data.searchVal }} 搜索结果为空,或最后一页了!</div>
                        </template>
                    </div>
                    <div class="pagination">
                        <a-pagination v-model:current="page" :total="total" show-less-items @change="ChangePage" :show-total="total => `共 ${total} 条`" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, defineProps,watch } from "vue";
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

    import { ProfileTwoTone } from "@ant-design/icons-vue";
    import { notification } from 'ant-design-vue';
    import Interface from "@/utils/Interface.js";
    import { girdFormatterValue } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    import { useRouter, useRoute } from "vue-router";
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();
    const props = defineProps({
        isTitle: {
            default: true,
            type: Boolean
        },
        id:String
    })
    const data = reactive({
        listData: [],
        page: 1,
        rows: 10,
        total: 0,
        SearchResult: "",
        searchVal:''
    })
    const { listData, page, rows, total, SearchResult,searchVal } = toRefs(data);
    const textContent = (value) => {
        const div = document.createElement('div');
        div.innerHTML = value;
        return div.textContent || div.innerText || '';
    };
    const getSearchResultList = () => {
        data.listData = [];
        data.total = 0;
        let filterQuery='';
        if(data.searchVal){}else{return false}
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'100201',
            entityName:'Content',
            filterQuery:filterQuery,
            search:data.searchVal,
            page: data.page,
            rows: data.rows,
            sort:'CreatedOn',
            order:'desc',
            displayColumns:'Title,FolderId,CreatedBy,CreatedOn,ContentBody'
        }).then(res => {
            var list = [];
            data.total = res.pageInfo?res.pageInfo.total:0;
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='Title'&&cell!='ContentBody'&&cell!='CreatedOn'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='Title'||cell=='ContentBody'){
                        var value=girdFormatterValue(cell,item);
                        if(value){
                            value=textContent(value);
                            item[cell]=value.replaceAll(data.searchVal, '<b class="keyword">' + data.searchVal + '</b>').replaceAll('&nbsp;', '');
                        }
                        else{
                            item[cell]='';
                        }
                    }
                    if(cell=='CreatedOn'){
                        var value=girdFormatterValue(cell,item);
                        if(value){
                            item[cell]=value?dayjs(value).format("YYYY-MM-DD HH:mm"):'';
                        }
                        else{
                            item[cell]='';
                        }
                    }
                }
                item.type='信息';
                list.push(item);
            }
            data.listData = list;
        })
    }
    //getSearchResultList();
    watch(() => route.query.searchVal, (newVal, oldVal) => {
        data.searchVal = newVal;
        getSearchResultList();
    }, {immediate: true});
    //改变页码
    const ChangePage=(page, pageSize)=>{
        data.page=page;
        getSearchResultList();
    }
    const handleDetail=(id)=>{
        let reUrl = router.resolve({
            path:"/previewContent",
            query: {
            id: id,
            objectTypeCode:'100201'
            }
        })
        window.open(reUrl.href); 
    }
</script>
<style lang="less">
    .SearchResultWrap{
        width: 100%;
        .panelSearchResultWrap{
            padding: 0 80px;
            height: 100% !important;
            .SearchResultBox{
                display: flex;
                .leftAvatar{
                    margin-right: 12px;
                }
                .rightTextare{
                    flex: 1;
                    border-radius: 2px;
                    .textarea{
                        width: 100%;
                        height: 100px;
                        min-height: 22px;
                        border-radius: 2px;
                        background: #f2f3f5;
                        padding-top: 6px;
                        padding-left: 12px;
                        font-size: 14px;
                        border: none;
                        outline: 0;
                        resize: vertical;
                    }
                }
            }
            .optionalWrap{  
                text-align: right;
                padding-top: 10px;
            }
            .SearchResultList{
                height: calc(~"100% - 168px");
                overflow-y: auto;
                .SearchResultItemBox{
                    display: flex;
                    margin-top: 20px;
                    .leftAvatar{
                        font-size: 36px;
                        color: #C9CDD4;
                        margin-right: 12px;
                    }
                    .rightSearchResult{
                        flex: 1;
                        overflow: hidden;
                        line-height: 23px;
                        position: relative;
                        top: 5px;
                        .SearchResultName{
                            font-size: 14px;
                            color: #ff7d00;
                        }
                        .SearchResultContent{
                            margin: 6px 0;
                        }
                        .SearchResultTime{
                            font-size: 12px;
                            color: #86909c;
                        }
                    }
                }
            }
            .pagination{
                margin-top: 20px;
                text-align: left;
                max-height: 74px;
            }
        }
        .keyword{
            color: red;
        }
        height: 100%;
        .panel{
            height: 100%;
            overflow: unset;
            padding: 8px 8px 20px 10px;
        }
        .panel-bd{
            height: 100% !important;
        }
        .panelSearchResultWrap{
            padding: 0 10px;
        }
        .SearchResultType{
            color:#333;
            font-size: 14px;
            font-weight: bold;
        }
        .SearchResultRow{
            display: block;
            margin-bottom: 6px;
        }
        .SearchResultTitle{
            color:#4d7ad8;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
        }
        .SearchResultRow3{
            color: #999;
            font-size: 12px;
        }
        .panelSearchResultWrap .SearchResultList .SearchResultItemBox{
            display: block;
            margin-top: 0;
            margin-bottom: 25px;
        }
        .SearchResultBottom{
            margin-right: 20px;
        }
        .SearchResultContent{
            color:#333;
            // height: 34px;
        }
        .SearchResultContent *{
            font-size: 14px !important;
            margin-top: 0 !important;
        }
        .ellipsis-multiline {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /* 显示的行数，可以根据需要修改 */
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .result-input{
            padding-left: 10px;
            border-bottom: 1px solid #e2e2e2;
            height: 105px;
            width: 100%;
            .weeso-con-main {
                float: left;
                width: 100%;
            }
             .weeso-con .weeso-tab {
                position: relative;
                height: 33px;
                overflow: hidden;
                width: 455px;
            }
            .ant-spin-nested-loading {
                width: 100% !important;
            }
             .weeso-con .weeso-tab .weeso-tab-content {
                float: left;
                max-width: 489px;
                white-space: nowrap;
                overflow: hidden;
            }
             .weeso-con .weeso-tab .weeso-tab-content>li {
                cursor: pointer;
                display: inline-block;
                padding: 6px 7px;
                border-radius: 4px;
                margin-right: 1px;
                font-size: 12px;
            }
            .weeso-con .weeso-tab .weeso-tab-content>li:first-child{
                padding-left: 0;
            }
             .weeso-con .weeso-tab-moredefault {
                padding: 0;
                color: #00a9ff;
                text-decoration: none;
            }
             .weeso-con .weeeso-input {
                padding-top: 0px;
                position: relative;
                width: 100%;
            }
             .weeso-con .input-search {
                display: -ms-inline-flexbox;
                display: inline-flex;
                height: 36px;
                line-height: 34px;
                position: relative;
            }
            .weeso-con .input-search .input {
                width: 442px;
                height: 36px;
                padding-left: 40px;
                border: 1px solid #2db7f5;
                outline: none;
                color: #333;
            }
            .weeso-con .input-search .wesoo-search-btn{
                display: -ms-inline-flexbox;
                display: inline-flex;
                -ms-flex-align: center;
                align-items: center;
                -ms-flex-pack: center;
                justify-content: center;
                cursor: pointer;
                border-radius: 0px; 
                height: 36px; 
                width: 62px;
            }
            .ant-btn span {
                background: transparent !important;
                float: none;
                padding: 0;
            }
            .ant-btn-primary {
                color: #fff;
                background-color: #2db7f5;
                border-color: #2db7f5;
                border-radius: 0px !important;
            }
             .result-tool {
                width: 100%;
                height: 30px;
                color: #999;
                line-height: 35px;
                overflow: hidden;
                font-size: 12px;
            }
             .result-tool .tool-left {
                float: left;
                height: 30px;
                width: 414px !important;
            }
             .result-tool .tool-left .tool-left-desc {
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                display: inline-block;
                max-width: calc(100% - 38px);
            }
             .result-tool .tool-right {
                float: left;
                text-align: right;
                cursor: pointer;
                width: 84px;
            }
            .weeso-con .weeeso-input .input-left {
                position: absolute;
                top: 5px;
                left: 2px;
                cursor: pointer;
            }
            .weeso-con .weeeso-input .flip-container {
                width: 26px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                padding: 0 3px;
                position: relative;
                top: 2px;
                left: 1px;
                font-size: 18px;
            }
            
            .weeso-con .weeeso-input .input-line {
                width: 8px;
                border-left: 1px solid #e2e2e2;
                height: 14px;
                display: inline-block;
                position: absolute;
                top: 7px;
                left: 26px;
            }
        }
        .panel-head{
            margin-bottom: 15px;
        }
        .emptyContentbox {
            // height: calc(~"100% - 115px");
            // display: flex;
            // justify-content: center;
            // align-items: center;
            font-size: 12px;
            color: #333;
        }
    }
</style>