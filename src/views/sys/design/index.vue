<template>
    <div class="designWrap">
        <div class="design">
            <div class="designHead">
                <a-button @click="showTemplate(true)">添加模板</a-button>
                <a-button class="ml10 layoutBtn">更改布局
                    <div class="dropMenuWapper">
                        <div class="layoutIconList">
                            <div title="一列" class="img" :class="{'active':layoutType=='A'}" @click.stop="choiceLayout('A')"><svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" fill-rule="evenodd"></rect></svg></div>
                            <div title="两列" class="img" :class="{'active':layoutType=='AA'}" @click.stop="choiceLayout('AA')"><svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M5 5h5a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zm9 0h5a1 1 0 011 1v12a1 1 0 01-1 1h-5a1 1 0 01-1-1V6a1 1 0 011-1z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
                            <div title="三列" class="img" :class="{'active':layoutType=='AAA'}" @click.stop="choiceLayout('AAA')"><svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M5 5h2a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zm6 0h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V6a1 1 0 011-1zm6 0h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V6a1 1 0 011-1z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
                            <div title="左侧边栏" class="img" :class="{'active':layoutType=='BA'}" @click.stop="choiceLayout('BA')"><svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M5 5h1a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zm5 0h9a1 1 0 011 1v12a1 1 0 01-1 1h-9a1 1 0 01-1-1V6a1 1 0 011-1z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
                            <div title="右侧边栏" class="img" :class="{'active':layoutType=='AB'}" @click.stop="choiceLayout('AB')"><svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M18 5h1a1 1 0 011 1v12a1 1 0 01-1 1h-1a1 1 0 01-1-1V6a1 1 0 011-1zM5 5h9a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
                        </div>
                    </div>
                </a-button>
                <a-button type="primary" class="ml10" @click="handleComplete">
                    完成
                </a-button>
            </div>
            <div class="designBody">
                <div class="itxst row">
                    <div class="columnItem col-3" v-for="(self,selfIdx) in columns" :key="selfIdx">
                        <transition name="fade" mode="out-in">
                            <draggable class="list-group" :component-data="{name:'fade'}" :list="self.components" group="people" itemKey="name">
                                <template #item="{ element, index }">
                                    <div class="itemBox panelItemWrap" :style="'border-top:4px solid' + element?.config?.color">
                                        <div class="panel">
                                            <div class="panel-head">
                                                <div class="panel-title"  v-if="!element.isRename">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><circle cx="10" cy="8" r="1"></circle> <circle cx="14" cy="8" r="1"></circle> <circle cx="10" cy="16" r="1"></circle> <circle cx="14" cy="16" r="1"></circle> <circle cx="10" cy="12" r="1"></circle> <circle cx="14" cy="12" r="1"></circle></g></svg>    
                                                    <span>{{element.label}}</span>
                                                    <span v-if="element.componentType!='calendar'&&element.componentType!='abstract'&&element.componentType!='chart'">
                                                        <span class="descNum" v-if="element.componentType=='tablist'">（{{element.tabs && element.tabs.length || 0}}项）</span>
                                                        <span class="descNum" v-else>（{{element.dataList && element.dataList.length || 0}}项）</span>
                                                    </span>
                                                </div>
                                                <div class="panel-title" v-else>
                                                    <a-input :ref="(e)=>{setInputRef(e,element)}" @pressEnter="e=>{changeTitle(e,element)}" @blur="e=>{changeTitle(e,element)}" v-model:value="element.label"></a-input>
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
                                                                            <svg width="24" height="24" viewBox="0 0 24 24" role="presentation" v-if="element.config.color==colorItem">
                                                                                <path
                                                                                    d="M7.356 10.942a.497.497 0 00-.713 0l-.7.701a.501.501 0 00-.003.71l3.706 3.707a.501.501 0 00.705.003l7.712-7.712a.493.493 0 00-.006-.708l-.7-.7a.504.504 0 00-.714 0l-6.286 6.286a.506.506 0 01-.713 0l-2.288-2.287z"
                                                                                    fill="currentColor"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div class="dropMenuItem" v-if="element.componentType!='calendar'" @click="handleRowConfig(element)">
                                                                    <div class="item">配置</div>
                                                                </div>
                                                                <div class="dropMenuItem" v-if="element.componentType!='calendar'&&element.componentType!='abstract'&&element.componentType!='chart'">
                                                                    <div class="item">查看更多</div>
                                                                </div>
                                                                <div class="dropMenuItem" @click="handleRename(element)">
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
                                            <!-- 列表-list  list-survey-->
                                            <div class="panel-bd" v-else-if="element.componentType=='list'||element.componentType=='list-survey'">
                                                <ul class="listWrap" v-if="!element.isConfig" :class="{'listWrapFixed':element.showHeader}">
                                                    <div  v-if="element.dataList.length>0">
                                                        <li class="listItem isFixed" v-if="element.listColumns!=''&&element.showHeader">
                                                            <span v-for="child in element.listColumns && element.listColumns">{{child.label}}</span>
                                                        </li>
                                                        <li class="listItem" v-for="child in element.dataList" @click="handleRowDetail(element.detailUrl,child)">
                                                            <template v-if="element.listColumns!=''&&element.listColumns">
                                                                <span v-for="cell in element.listColumns && element.listColumns">
                                                                    <span v-if="cell.field=='IsTop'">
                                                                        <button class="btnTag tagWarning" v-if="child[cell.field]==1">置顶</button>
                                                                    </span>
                                                                    <span v-else>
                                                                        {{child[cell.field]}}
                                                                    </span>
                                                                </span>
                                                            </template>
                                                            <template v-else>
                                                                <span v-for="(cell,key,cellIdx) in child" v-if="key!='ID'&&key!='LIST_RECORD_ID'">{{cell}}</span>
                                                            </template>
                                                        </li>
                                                    </div>
                                                    <div class="empty" v-else><img :src="require('@/assets/img/empty.png')" alt=""><p class="emptyDesc">当前暂无数据</p></div>
                                                </ul>
                                                <ListConfig :item="element" v-else></ListConfig>
                                            </div>
                                            <!-- tabllist -->
                                            <div class="panel-bd" v-else-if="element.componentType=='tablist'">
                                                <div>
                                                    <div class="tabContainer flex">
                                                        <div class="tabList">
                                                            <div class="tab" :class="{'active':element.currentTab==tabIdx}" v-for="(tab,tabIdx) in element.tabs" @click="handleItemTab(element,tabIdx)">
                                                                <div class="tabHover">
                                                                    <span class="tabText">
                                                                        {{tab.displayName}}
                                                                        <span class="tabnum">{{tab.listComponent.dataList.length}}</span>
                                                                        <span style="font-weight:normal;" @click.stop="deleteTabListTag(element,tab,tabIdx)">
                                                                            <i class="iconfont icon-yishanchu"></i>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="rightAdd">
                                                            <a-popover trigger="click" placement="right">
                                                                <template #content>
                                                                  <a-form>
                                                                    <a-form-item label="标签名称">
                                                                        <a-input v-model:value="element.addTagName"></a-input>
                                                                    </a-form-item>
                                                                    <a-form-item label="对象代码">
                                                                        <a-select v-model:value="element.addObjCode" placeholder="请选择对象代码">
                                                                            <a-select-option  v-for="(field,fieldIdx) in objCodeList" :key="fieldIdx" :value="field.ID">{{field.Name}}</a-select-option>
                                                                          </a-select>
                                                                    </a-form-item>
                                                                    <div>
                                                                        <a-button type="primary"  @click="handleAddTags(element)">确认添加</a-button>
                                                                    </div>
                                                                  </a-form>
                                                                </template>
                                                                <a-button type="link">添加标签</a-button>
                                                            </a-popover>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tabListWrap" v-for="(tab,tabIdx) in element.tabs" :key="tabIdx"  :class="{'isheadlist':tab.listComponent&&tab.listComponent.showHeader}">
                                                    <ul class="listWrap"  v-if="element.currentTab==tabIdx">
                                                        <div v-if="tab.listComponent.dataList.length>0">
                                                            <li class="listItem listItemHead" v-if="tab.listComponent.listColumns && tab.listComponent.showHeader">
                                                                <p class="listItemTitle" v-for="child in tab.listComponent.listColumns">
                                                                    <span v-if="child.field != 'Priority' && child.field != 'IsTop' && child.field != 'UrgentLevel' && child.field != 'IsImportant'">{{child.label}}</span>
                                                                </p>
                                                            </li>
                                                            <li class="listItem tablistItem" v-for="child in tab.listComponent.dataList" @click="handleRowDetail(element.detailUrl,listItem)">
                                                                <template v-if="tab.listComponent.displayColumns">
                                                                    <template v-for="(cell,index) in tab.listComponent.displayColumns&&(tab.listComponent.displayColumns).split(',')">
                                                                        <p v-if="cell == 'Name' || cell == 'FullName' || cell == 'Title'" class="listItemTitle listItemTitle1">
                                                                            {{child[cell]}}
                                                                        </p>
                                                                        <p v-else-if="cell == 'BusinessUnitIdName'" class="listItemDept">{{child[cell]}}</p>
                                                                        <p v-else-if="cell=='CreatedOn'||cell=='PlanPayOn'" class="listItemTime">{{child[cell]?child[cell].split(' ')[0]:''}}</p>
                                                                        <p v-else-if="cell != 'Priority' && cell != 'IsTop' && cell != 'UrgentLevel' && cell != 'IsImportant'" class="listItemTitle">{{child[cell]}}</p>
                                                                    </template>
                                                                </template>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </div>
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
        <div class="context-panel" v-if="isTemplate">
            <div class="context-head">
                <p class="name">添加模板</p>
                <div class="closeIcon" @click="showTemplate(false)"><i class="iconfont icon-guanbi"></i></div>
            </div>
            <div class="search">
                <a-input-search
                    v-model:value="searchVal"
                    placeholder="搜索模板"
                    style="width: 100%"
                    @search="getTemplate"
                />
            </div>
            <div class="context-content">
                <div class="templateList">
                    <draggable
                        class="list-group"
                        :list="templateList"
                        group="people"
                        itemKey="template"
                        @change="changeTemplate"
                    >
                        <template #item="{ element, index }">
                            <div class="templateItem">
                                <div class="itemLeft">
                                    <div class="thumbnail">
                                        <img :src="element.pictureUrl?item.pictureUrl:'https://jackliu185.atlassian.net/s/azc3hx/b/8/f3df60f8ce75a4f8aa003d30ed6116b219461d32/_/download/resources/com.atlassian.jira.gadgets:two-dimensional-stats-gadget/twoDimensionalStats-thumb.png'" alt="" />
                                    </div>
                                    <a-button type="primary" @click="handleAddLeft(element)">添加</a-button>
                                </div>
                                <div class="itemRight">
                                    <strong class="title">{{element.displayName}}</strong>
                                    <div class="sc-12e1e96-2 duqoAg">由 Atlassian 创建</div>
                                    <p class="desc">{{element.description}}</p>
                                </div>
                            </div>
                        </template>
                    </draggable>
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
    import { message } from "ant-design-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        h,
        nextTick
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

    import draggable from 'vuedraggable';
    import ListConfig from "@/components/design/ListConfig.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const itemRefs = [];
    const data = reactive({
        id: "",
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
        date: "",
        searchVal: "",
        list2: [
            { name: "Juan", id: 5 },
            { name: "Edgard", id: 6 },
            { name: "Johnson", id: 7 }
        ],
        templateList: [],
        layoutType: "",
        isTemplate: false,
        objCodeList: []
    });
    const { id, dboardName, columns, colorList, group, list1, list2, date, searchVal, templateList,
        layoutType, isTemplate, objCodeList } = toRefs(data);
    const getLayout = () => {
        proxy.$get(Interface.design.list,{
            dboardName: data.dboardName
        }).then(res=>{
            data.columns = res.Board.columns;
            data.columns.forEach(item=>{
                item.components.forEach(row=>{
                    if(row.componentType=='tablist'){
                        row.currentTab = 0;
                    }
                    if(row.componentType=='list'){
                        var orderExpression2 = JSON.parse(row.config.orderExpression);
                        if(!Array.isArray(orderExpression2) || orderExpression2.length==0){
                            orderExpression2 = [{
                                attributeName: "",
                                SortDir: "",
                                sort: ""
                            }]
                        }
                        row.orderExpression2 = orderExpression2;
                    }
                    row.isConfig = false;
                    row.isRename = false;
                })
            })
        })
    }
    getLayout();
    // 获取对象代码列表
    const getObjList = () => {
        proxy.$get(Interface.uilook,{
            Lktp: 100000
        }).then(res=>{
            data.objCodeList = res.listData;
        })
    }
    getObjList();
    const showTemplate = (isBook) => {
        data.isTemplate = isBook;
    }
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
    // 搜索模板
    const getTemplate = () => {
        proxy.$get(Interface.design.templateList,{}).then(res=>{
            data.templateList = res.rows;
            data.templateList.forEach(item=>{
                item.id = item.Id;
                item.label = item.displayName;
                item.componentType = item.name;
                item.isNewAdd = true;
            })
        })
    }
    getTemplate();
    const changeTemplate = (e) => {
        console.log("e",e);
        let columnNumber,
        displayOrder;
        let id = e.removed.element.Id;
        // console.log('data',data.columns);
        for(let i = 0; i < data.columns.length; i++) {
            for ( let j = 0; j < data.columns[i].components.length; j++) {
                let item = data.columns[i].components[j];
                if(id == item.id){
                    columnNumber = i+1;
                    displayOrder = j+1;
                    break;
                }
            }
        }
        let item = e.removed.element;
        item.ColumnNumber = columnNumber;
        item.DisplayOrder = displayOrder;
        console.log('columnNumber',columnNumber, displayOrder);
        handleAddLeft(item);
    }
    // 更换布局
    const choiceLayout = (layoutType) => {
        data.layoutType = layoutType;
        saveLayout();
    }
    const saveLayout = () => {
        var obj = {
            params: {
                recordRep: {
                    objTypeCode: 9170,
                    id: data.id,
                    fields: {
                        LayoutType: data.layoutType
                    }
                }
            }
        }
        var d = {
            message: JSON.stringify(obj)
        }
        proxy.$get(Interface.saveRecord,d).then(res=>{

        })
    }
    // 完成
    const handleComplete = () => {
        var result = [];
        data.columns.forEach(function (item) {
            item.components.forEach(function (v, idx) {
                if (v.componentType != 'tab-calendar-item') {
                    v.columnNumber = item.columnNumber;
                    v.displayOrder = idx + 1;
                    result.push(v);
                }
            });
        });
        let len = result.length;
        for(var i = 0; i < result.length; i++){
            var _result$i = result[i];
            var id = _result$i.id;
            var columnNumber = _result$i.columnNumber;
            var displayOrder = _result$i.displayOrder;
            setTemplateSort(id, columnNumber, displayOrder,result[i], i, len)
        }
    }
    //排序
    const setTemplateSort = (itemid, columnsIndex, displayOrder,item, i, len) => {
        var obj = {
            params: {
                recordRep: {
                    objTypeCode: 9171,
                    id: itemid,
                    fields: {
                        DisplayOrder: displayOrder,
                        ColumnNumber: columnsIndex,
                    }
                }
            }
        }
        var d = {
            message: JSON.stringify(obj)
        }
        proxy.$get(Interface.saveRecord,d).then(res=>{
            if(res && i==len-1){
                message.success("保存成功！");
            }
        })
    }
    // tablist 添加标签
    const handleAddTags = (item) => {
        let addObjCode = item.addObjCode;
        var d = {
            Id: addObjCode,
            ObjTypeCode: 100000
        }
        proxy.$get(Interface.detail,d).then(res=>{
            let addObjectTypeCode = res.record.ObjectTypeCode;
            let copyObj = {
                id:'',
                name: item.addTagName,
                displayName: item.addTagName,
                listComponent: {

                }
            }
            item.tabs.push(copyObj);
            saveRowListTags(item);
        })
    }
    const saveRowListTags = (item) => {
        let config = {
            componentType: item.componentType,
            tabs: item.tabs
        }
        var obj = {
            params: {
                recordRep: {
                    id: item.id,
                    objTypeCode: 9171,
                    fields: {
                        Config: JSON.stringify(config)
                    }
                }
            }
        }
        var d = {
            message: JSON.stringify(obj)
        }
        proxy.$get(Interface.saveRecord,d).then(res=>{
            getLayout();
        })
    }
    // 重命名
    const handleRename = (item) => {
        item.isRename = true;
        nextTick(()=>{
            let refName = 'ref_'+item.name;
            let index = itemRefs.findIndex(row=>row.name==refName);
            itemRefs[index].el.focus();
            item.isMore = false;
        })
    }
    const setInputRef = (el,item) => {
        if(el && el!=null){
            itemRefs.push({
                name: 'ref_'+item.name,
                el
            })
        }
    }
    // 修改标题
    const changeTitle = (e, item) => {
        saveTitle(item);
    }
    const saveTitle = (item) => {
        var obj = {
            params: {
                recordRep: {
                    id: item.id,
                    objTypeCode: 9171,
                    fields: {
                        DisplayName: item.label
                    }
                }
            }
        }
        var d = {
            message: JSON.stringify(obj)
        }
        proxy.$get(Interface.saveRecord,d).then(res=> {
            message.success("保存成功！")
            item.isRename = false;
        })
    }
    // 添加模板
    const handleAddLeft = (item) => {
        var obj = {
            params: {
                recordRep: {
                    objTypeCode: 9171,
                    fields: {
                        ComponentType: item.componentType,
                        DisplayName: item.displayName,
                        DashboardId:{
                            Id: data.id
                        },
                        config: JSON.stringify(item.config),
                        DisplayOrder: item.DisplayOrder || 1,
                        ColumnNumber: item.ColumnNumber || 1,
                        filterExpression: item.config.filterExpression,
                        DisplayColumns: item.config.displayColumns,
                        orderExpression: item.config.OrderExpression,
                        EntityCode: item.config.entityCode,
                        TemplateObjectTypeCode: item.config.templateObjectTypeCode,
                        DetailUrl: item.config.detailURL,
                        MoreLinkURL: item.config.moreLinkURL,
                        TemplateId: {
                            Id: item.config.templateId
                        }
                    }
                }
            }
        }
        if(item.componentType=='tablist'){
            obj.params.recordRep.fields.config = JSON.stringify(item.configTab);
        }else {
            var addObj = {
                filterExpression: item.config.filterExpression,
                DisplayColumns: item.config.displayColumns,
                orderExpression: item.config.orderExpression || '',
                EntityCode: item.config.entityCode,
                TemplateObjectTypeCode: item.config.templateObjectTypeCode,
                DetailUrl: item.config.detailURL,
                MoreLinkURL: item.config.moreLinkURL
            }
            Object.assign(obj.params.recordRep.fields, addObj)
        }
        var d = {
            message: JSON.stringify(obj)
        }
        proxy.$get(Interface.saveRecord,d).then(res=>{
            message.success("添加成功！");
            getLayout();
        })
    }
    // 配置
    const handleRowConfig = (item) => {
        item.isConfig = !item.isConfig;
        item.isMore = false;
    }
</script>
<style lang="less" scoped>
    .designWrap{
        display: flex;
        .design{
            flex: 1;
            min-width: calc(~"100% - 320px");
        }
        .context-panel {
            width: 320px;
            height: 100vh;
            background: #fff;
            z-index: 99;
            box-shadow: rgb(235, 236, 240) 2px 0px 0px 0px inset;
            padding: 16px;
            box-sizing: border-box;
            .context-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                .name{
                    color: #4e5969;
                    font-weight: bold;
                }
                .closeIcon {
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    border-radius: 2px;
                    cursor: pointer;
                    &:hover{
                        background: rgba(9,30,66,0.08);
                    }
                    .iconfont{
                        color: #4e5969;
                    }
                }
            }
            .templateList{
                .templateItem{
                    display:flex;
                    margin:16px 0;
                    .itemLeft{
                        width: 75px;
                        .thumbnail{
                            width: 100%;
                            img{
                                width:100%;
                            }
                        }
                    }
                }
                .itemRight{
                    flex:1;
                    margin-left: 12px;
                    .title{
                        font-weight: 600;
                    }
                    .desc{
                        color:#6b778c;
                        font-size:12px;
                    }
                }
            }
        }
    }
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
        .oftenLinkItem:nth-child(2n){
            margin-right: 0;
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
    .panelItemWrap {
        .listWrap{
            height: 300px;
            overflow-y: auto;
            .listItem{
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #e5e6eb;
                display: flex;
                align-items: center;
                cursor: pointer;
                &:hover{
                    background: #f2f3f5;
                }
                span{
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-right: 10px;
                    box-sizing: border-box;
                }
                .listItemTitle {
                    flex: 1;
                    color: #4e5969;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: left;
                }
                .listItemTime {
                    width: 100px;
                    margin-right: 10px;
                    text-align: right;
                    color: #b8bbcc;
                    margin-left: auto;
                }
            }
        }
    }

    .tabContainer.flex{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tabContainer{
        border-bottom: 1px solid #e5e6eb;
        .tabList {
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            .tab{
                font-size: 14px;
                color: #4e5969;
                padding: 0 8px;
                float: left;
                width: auto !important;
                &:hover{
                    .tabHover{
                        background: #f2f3f5;
                    }
                }
                .tabHover{
                    border-radius: 2px;
                    padding: 0 8px !important;
                    box-sizing: border-box;
                    background: transparent;
                    display: inline-block;
                    height: 29px;
                    line-height: 29px;
                    .bottom{
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        background: var(--textColor);
                        top: 33px;
                        left: 1px;
                    }
                    .tabText{
                        position: relative;
                        .num.active{
                            color: #f53f3f;
                        }
                    }
                    
                }
            }
            .tab.active{
                .tabHover{
                    .tabText{
                        color: var(--textColor);
                        font-weight:700;
                    }
                    .tabText::before{
                        content: '';
                        display: inline-block;
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        background: var(--textColor);
                        top: 29px;
                        left: 0;
                        transition: all .5s;
                    }
                }
                &:hover {
                    .tabHover{
                        background: transparent;
                    }
                }
            }
        }
    }
    .tabContainer.notBorder{
        border: none;
    }
    .tabnum {
        color: red;
        margin-left: 5px;
    }
    .isheadlist{
        position: relative;
        text-align: center;
        .listItem.listItemHead {
            position: absolute !important;
            top: 0px !important;
            width: calc(~"100% - 10px");
            background: #f2f3f5;
            .listItemTitle{
                flex: 1;
                margin: 0;
            }
        }
        .listItemTitle{
            flex: 1;
            text-align: center !important;
        }
    }
    .layoutBtn{
        position: relative;
        &:hover {
            .dropMenuWapper{
                display: block;
            }
        }
        .dropMenuWapper{
            width: auto;
            left: inherit;
            right: 0;
            top: 100%;
            padding: 4px;
            display: none;
            .layoutIconList{
                display: flex;
                color: #4e5969;
                .img{
                    width: 32px;
                    height: 32px;
                    text-align: center;
                    font-weight: 500;
                    border-radius: 3px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 3px;
                    &:hover,&.active{
                        background: rgba(9,30,66,0.08);
                    }
                    svg{
                        width: 24px;
                        height: 24px;
                    }
                }
            }
        }
    }
</style>