<template>
    <div class="design">
        <div class="designHead">
            <a-button>添加模板</a-button>
            <a-button class="ml10">更改布局</a-button>
            <a-button type="primary" class="ml10">完成</a-button>
        </div>
        <div class="designBody">
            <div class="itxst row">
                <div class="columnItem col-3" v-for="(self,selfIdx) in columns" :key="selfIdx">
                    <transition name="fade" mode="out-in">
                        <draggable class="list-group" :component-data="{name:'fade'}" :list="self.components" group="people" itemKey="name">
                            <template #item="{ element, index }">
                                <div class="itemBox panelItemWrap">
                                    <div class="panel">
                                        <div class="panel-head">
                                            <div class="panel-title">
                                                <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><circle cx="10" cy="8" r="1"></circle> <circle cx="14" cy="8" r="1"></circle> <circle cx="10" cy="16" r="1"></circle> <circle cx="14" cy="16" r="1"></circle> <circle cx="10" cy="12" r="1"></circle> <circle cx="14" cy="12" r="1"></circle></g></svg>    
                                                {{element.label}}
                                                <span v-if="element.componentType!='calendar'&&element.componentType!='abstract'&&element.componentType!='chart'">
                                                    <span class="descNum" v-if="element.componentType=='tablist'">（{{element.tabs && element.tabs.length || 0}}项）</span>
                                                    <span class="descNum" v-else>（{{element.dataList && element.dataList.length || 0}}项）</span>
                                                </span>
                                            </div>
                                            <div class="panel-btns">
                                                <button class="btn buttonIcon" @click.stop="handleMore(element)">
                                                    <i class="iconfont icon-gengduobiaoqian"></i>
                                                    <div class="dropMenuWapper" v-if="element.isMore" @click.stop>
                                                        <div class="dropMenu">
                                                            <div class="colorTemplate">
                                                                <p class="colorDesc">突出显示颜色</p>
                                                                <div class="colorsBox">
                                                                    <span class="colorItem" :style="'background:'+colorItem" v-for="(colorItem,colorIdx) in colorList" :key="colorIdx">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                                                                            <path
                                                                                d="M7.356 10.942a.497.497 0 00-.713 0l-.7.701a.501.501 0 00-.003.71l3.706 3.707a.501.501 0 00.705.003l7.712-7.712a.493.493 0 00-.006-.708l-.7-.7a.504.504 0 00-.714 0l-6.286 6.286a.506.506 0 01-.713 0l-2.288-2.287z"
                                                                                fill="currentColor"></path>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="dropMenuItem">
                                                                <div class="item">配置</div>
                                                            </div>
                                                            <div class="dropMenuItem">
                                                                <div class="item">查看更多</div>
                                                            </div>
                                                            <div class="dropMenuItem">
                                                                <div class="item">重命名</div>
                                                            </div>
                                                            <div class="dropMenuItem">
                                                                <div class="item">删除</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <!-- 日历 -->
                                        <div class="panel-bd" v-if="element.componentType=='calendar'">
                                            <div :style="{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                                                <a-calendar :locale="locale" v-model:value="date" :fullscreen="false" @panelChange="onPanelChange" />
                                              </div>
                                        </div>
                                        <!-- 轮播图 -->
                                        <div class="panel-bd" v-else-if="element.componentType=='swiper'">
                                            <a-carousel dots-class="slick-dots slick-thumb" autoplay>
                                                <div v-for="(listItem,listitemIdx) in element.list" :key="listitemIdx">
                                                    <img :src="listItem.ImgUrl" alt="">
                                                </div>
                                            </a-carousel>
                                        </div>
                                        <!-- 常用链接 -->
                                        <div class="panel-bd oftenLinkBody" v-else-if="element.componentType=='text-grid'">
                                            <div class="oftenLinkList">
                                                <div class="oftenLinkItem" v-for="listItem in element.dataList" @click="gotoMoreUrl(listItem.LinkUrl)">
                                                    <a href="#">{{listItem.Name}}</a>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 快捷入口 -->
                                        <div class="panel-bd" v-else-if="element.componentType=='icon-grid'">
                                            <div class="oftenLinkList">
                                                <div class="oftenLinkItem oftenLinkItem1" v-for="listItem in element.dataList" @click="gotoMoreUrl(listItem.LinkUrl)">
                                                    <div class="oftenLinkIcon">
                                                        <img :src="listItem.ImageUrl"  />
                                                    </div>
                                                    <div class="oftenLinkText">
                                                        <a :href="listItem.LinkUrl">{{listItem.Name}}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel-bd" v-else-if="element.componentType=='list'||element.componentType=='list-survey'">

                                        </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import "@/style/icon/iconfont.css";
    import {
        EllipsisOutlined,
    } from "@ant-design/icons-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        h,
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

    import draggable from 'vuedraggable'
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const data = reactive({
        dboardName: "workspace",
        columns: [],
        colorList: [
            '#2684ff',
            '#ff5630',
            '#ffab00',
            '#36b37e',
            '#00b8d9',
            '#6554c0',
            '#97a0af',
            '#ffffff'
        ],
        date: ""
    });
    const { dboardName, columns, colorList, group, list1, list2, date } = toRefs(data);
    const getLayout = () => {
        proxy.$get(Interface.design.list,{
            dboardName: data.dboardName
        }).then(res=>{
            data.columns = res.Board.columns;
        })
    }
    getLayout();

    const handleMore = (item) => {
        item.isMore = !item.isMore;
    }
    onMounted(()=>{
        window.addEventListener('click', function () {
            data.columns.forEach(function (item) {
                item.components.forEach(function (self) {
                    self.isMore = false;
                })
            })
        })
    })
    const log = (evt)=> {
      window.console.log(evt);
    }
    const onPanelChange = (value, mode) => {
        console.log(value, mode);
    };
    const gotoMoreUrl = (link) => {
        window.open(link);
    }
</script>
<style lang="less" scoped>
    .designHead{
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 10px 20px;
        align-items: center;
    }
    .buttonIcon {
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #f2f3f5;
        border-radius: 2px;
    }
    .buttonIcon:hover {
        background: #e5e6eb;
        cursor: pointer;
    }
    .btn.buttonIcon {
        padding: 0;
        position: relative;
        .iconfont{
            font-size: 12px;
            color: #4e5959;
        }
    }
    .dropMenuWapper {
        display: block;
        top: 100%;
        right: 0;
        width: 286px;
    }
    .designBody{
        .itxst{
            padding: 10px 10px 0 10px;
            box-sizing: border-box;
            display: flex;
            width: 100%;
            overflow: hidden;
            .columnItem{
                width: 30%;
                flex: 1;
                padding: 10px;
                border: solid 1px #eee;
                border-radius: 5px;
                .panelItemWrap {
                    width: 100%;
                    margin-right: 0;
                    &:hover{
                        cursor: move;
                    }
                }
                .itemBox {
                    border: solid 1px #eee;
                    background-color: #fff;
                    border-top: 4px solid #165dff;
                    border-radius: 3px;
                    margin-bottom: 16px;
                    
                }
            }
            .columnItem+.columnItem{
                margin-left: 10px;
            }
        }
    }
    .colorTemplate {
        color: rgb(107, 119, 140);
        border-bottom: 1px solid #e2e3e5;
    }
    .colorDesc, .colorsBox {
        padding: 0 12px;
        display: flex;
        padding-bottom: 10px;
        justify-content: space-between;
        .colorItem {
            width: 24px;
            height: 24px;
            border-radius: 3px;
            display: inline-block;
            border: 1px solid rgba(0, 0, 0, 0.2);
            svg{
                color: #fff;
            }
        }
    }
    .panel-title{
        display: flex;
        align-items: center;
        svg{
            color: #97A0AF;
        }
        .descNum{
            color: #aaaaaa;
            font-weight: normal;
        }
    }
    .list-group{
        height: 100%;
    }
    /* For demo */
    :deep(.slick-slide) {
        text-align: center;
        height: 100%;
        background: #364d79;
        overflow: hidden;
    }
    :deep(.slick-slide h3) {
        color: #fff;
    }
    .ant-carousel{
        width: 100%;
        height: 220px;
        cursor: pointer;
    }
    :deep :where(.css-dev-only-do-not-override-kqecok).ant-carousel .slick-slider{
        height: 100%;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-carousel .slick-slider .slick-track, :where(.css-dev-only-do-not-override-kqecok).ant-carousel .slick-slider .slick-list{
        height: 100% !important;
    }
    :deep :where(.css-dev-only-do-not-override-kqecok).ant-carousel .slick-list{
        height: 100% !important;
        .slick-track{
            height: 100%;
        }
    }
    .slick-slider{
        height: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .oftenLinkList{
        display: flex;
        flex-wrap: wrap;
        .oftenLinkItem {
            width: 48%;
            height: auto;
            padding: 8px 10px;
            box-sizing: border-box;
            color: #4e5969;
            background: #f2f3f5;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            &:hover{
                color: var(--textColor);
                background: rgb(229,230,235);
            }
            a {
                color: inherit;
                text-decoration: none;
            }
        }
        .oftenLinkItem1 {
            width: 33%;
            background: #fff;
            text-align: center;
            height: auto;
            margin-right: 0;
            &:hover{
                background: #fff;
            }
            .oftenLinkIcon {
                background: #f2f3f5;
                width: 32px;
                height: 32px;
                padding: 8px 0;
                margin: 0 auto;
                border-radius: 8px;
                margin-bottom: 10px;
                overflow: hidden;
            }
            .oftenLinkText {
                font-size: 14px;
            }
        }
    }
</style>