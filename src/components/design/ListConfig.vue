<template>
    <div class="configWrap">
        <a-form>
            <a-form-item label="详情链接" class="formItem">
                <a-input v-model:value="item.detailUrl"></a-input>
            </a-form-item>
            <a-form-item label="更多链接" class="formItem">
                <a-input v-model:value="item.moreLinkURL"></a-input>
            </a-form-item>
            <a-form-item label="选择对象">
                <a-select v-model:value="item.entityId" style="width: 200px;">
                    <a-select-option v-for="(row,idx) in objectCodeList" :key="idx" :value="row.ID">{{row.Name}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="是否显示列头">
                <a-checkbox></a-checkbox>
            </a-form-item>
            <a-form-item label="显示列" class="formItem">
                <div class="showList">          
                    <div class="dragList">
                        <draggable
                            class="list-group"
                            :list="item.listColumns"
                            group="list"
                            itemKey="list"
                        >
                            <template #item="{ element, index }">
                                <div class="dragListItem">
                                    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><circle cx="10" cy="8" r="1"></circle> <circle cx="14" cy="8" r="1"></circle> <circle cx="10" cy="16" r="1"></circle> <circle cx="14" cy="16" r="1"></circle> <circle cx="10" cy="12" r="1"></circle> <circle cx="14" cy="12" r="1"></circle></g></svg>
                                    <span class="field">
                                        {{element.field}}
                                    </span>
                                    <span class="delIcon"><i class="iconfont icon-yishanchu"></i></span>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </a-form-item>
            <div class="rowAddShowList">
                <a-popover trigger="click" placement="right">
                    <template #content>
                        <a-select style="width: 200px;margin-right: 10px;">
                            <a-select-option v-for="(row,idx) in attributes" :key="idx" :value="row.attributeId">{{row.label}}</a-select-option>
                          </a-select>
                        <a-button type="primary">确认添加</a-button>
                    </template>
                    <a-button type="link">添加显示列</a-button>
                </a-popover>
            </div>
            <div class="sortBox">
                <div class="formRow" v-for="(sortItem,sortIdx) in item.orderExpression2" :key="sortIdx">
                    <a-form-item label="排序字段" class="formItem">
                        <a-select v-model:value="sortItem.attributeName" style="width: 200px;margin-right: 10px;">
                            <a-select-option value="beijing">Zone two</a-select-option>
                          </a-select>
                    </a-form-item>
                    <a-form-item label="排序方式" class="formItem">
                        <a-select v-model:value="sortItem.sort" style="width: 200px;margin-right: 10px;">
                            <a-select-option value="ASC">升序</a-select-option>
                            <a-select-option value="DESC">降序</a-select-option>
                          </a-select>
                    </a-form-item>
                </div>
                <div>
                    <a-button type="link" @click="handleAddItemSort">添加排序</a-button>
                </div>
            </div>
            <div class="footBtns">
                <a-button>保存</a-button>
                <a-button class="ml10" type="primary">取消</a-button>
            </div>
        </a-form>
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
        nextTick,
        defineProps,
        defineExpose,
        defineEmits,
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
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        item: Object
    })
    
    const data = reactive({
        attributes: [],
        objectCodeList: []
    });
    const { attributes, objectCodeList } = toRefs(data);
    console.log(props);
    const getConfig = () => {
        proxy.$get(Interface.design.attrs,{
            objTypeCode: props.item.config.templateObjectTypeCode
        }).then(res=>{
            data.attributes = res.attributes;
        });
    }
    getConfig();
    const getLook = () => {
        proxy.$get(Interface.design.look,{
            Lktp: 100000
        }).then(res=>{
            data.objectCodeList = res.listData;
            props.item.entityId = props.item.config.templateId.toLocaleUpperCase();
        })
    }
    getLook();
    // 添加排序
    const handleAddItemSort = () => {
        props.item.orderExpression2.push({
            attributeName: "",
            SortDir: "",
            sort: ""
        })
    }
</script>
<style lang="less" scoped>
    .showList{
        margin-top: 20px;
        width: 249px;
        border-bottom: 1px solid #dfe1e6;
        .dragListItem {
            line-height: 48px;
            height: 48px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:hover{
                background: #f2f3f5;
            }
            svg{
                color: #97A0AF;
                padding-right: 5px;
            }
            .field{
                flex: 1;
            }
            .delIcon{
                cursor: pointer;
            }
        }
    }
    .formItem{
        margin-bottom: 10px;
        :deep .ant-row{
            display: block !important;
        }
    }
    .formRow{
        display: flex;
        .formItem{
            flex: 1;
        }
    }
</style>