<template>
    <div class="tableGridWrap">
        <div class="data-grid">
          <div class="data-grid-table-ctr" style="width: 41px; height: 36px; z-index: 2;overflow: hidden;">
            <table class="data-grid-table data-grid-fixed-row-column-table">
              <colgroup class="data-grid-table-colgroup">
                <col class="data-grid-table-col" style="width: 40px;">
              </colgroup>
              <tbody>
                <tr class="data-grid-table-row">
                  <th class="data-grid-table-cell data-grid-header-cell"></th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="data-grid-table-ctr head" ref="headFiexdRef" style="height: 37px;overflow: hidden;z-index: 1;">
            <table class="data-grid-table data-grid-fixed-row-table">
              <thead>
                <tr class="data-grid-table-row data-grid-table-row-fixed-row-divider">
                  <th class="data-grid-header-cell"></th>
                  <th class="data-grid-header-cell" v-for="(item, index) in columns" :key="index">
                    <div class="data-grid-table-cell-box">
                      <div class="table-cell-measure-header">
                        <span class="table-cell-measure-header-text">
                          {{ item.label }}
                        </span>
                        <span class="table-cell-measure-header-icons">
                          <div>
                            <a-dropdown :trigger="['click']">
                              <button class="fh-btn">
                                <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                  <path
                                    d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z">
                                  </path>
                                </svg>
                              </button>
                              <template #overlay>
                                <a-menu class="fh-menu" style="width: 178px;"  @click="(e)=>handleActionMenu(e, item, index)">
                                  <a-menu-item key="asc" :disabled="item.sort=='asc'">
                                    <div class="menuItemAction">
                                      <span>
                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                          <path
                                            d="M41.4 21c.8-.8.8-1.9 0-2.7l-15-14.7c-.8-.8-2-.8-2.8 0l-15 14.7c-.8.8-.8 1.9 0 2.7l2.8 2.7c.8.8 2 .8 2.8 0l4.7-4.6c.8-.8 2.2-.2 2.2.9v27c0 1 .9 2 2 2h4c1.1 0 2-1.1 2-2V20c0-1.2 1.4-1.7 2.2-.9l4.7 4.6c.8.8 2 .8 2.8 0l2.6-2.7z">
                                          </path>
                                        </svg>
                                      </span>
                                      按升序排序
                                    </div>
                                  </a-menu-item>
                                  <a-menu-item key="desc" :disabled="item.sort=='desc'">
                                    <div class="menuItemAction">
                                      <span>
                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                          <path
                                            d="M9.6 31c-.8.8-.8 1.9 0 2.7l15 14.7c.8.8 2 .8 2.8 0l15.1-14.7c.8-.8.8-1.9 0-2.7l-2.8-2.7c-.8-.8-2-.8-2.8 0l-4.7 4.6c-.8.8-2.2.3-2.2-.9V5c0-1-.9-2-2-2h-4c-1.1 0-2 1.1-2 2v27c0 1.2-1.4 1.7-2.2.9l-4.7-4.6c-.8-.8-2-.8-2.8 0L9.6 31z">
                                          </path>
                                        </svg>
                                      </span>
                                      按降序排序
                                    </div>
                                  </a-menu-item>
                                  <a-menu-item key="groupRow">
                                    <div class="menuItemAction">
                                      <span>
                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100">
                                          <path
                                            d="M20 24v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4H24c-2.2 0-4 1.8-4 4zm54 42.5V74H40v-7.5h34zM74 53v7.5H40V53h34zm0-13.5V47H40v-7.5h34zM74 26v7.5H40V26h34z">
                                          </path>
                                        </svg>
                                      </span>
                                      按此字段分组行
                                    </div>
                                  </a-menu-item>
                                  <a-menu-item key="groupColumn">
                                    <div class="menuItemAction">
                                      <span>
                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100">
                                          <path
                                            d="M76 20H24c-2.2 0-4 1.8-4 4v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4zM33.5 74H26V40h7.5v34zM47 74h-7.5V40H47v34zm13.5 0H53V40h7.5v34zM74 74h-7.5V40H74v34z">
                                          </path>
                                        </svg>
                                      </span>
                                      按此字段分组列
                                    </div>
                                  </a-menu-item>
                                  <a-sub-menu key="count" v-if="item.dataType=='currency'||item.dataType=='numeric'" style="padding: 0;">
                                    <template #title>
                                      <div class="menuItemAction">
                                        <span>
                                          <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M48.5 2h-45C2.7 2 2 2.7 2 3.5v5c0 .8.7 1.5 1.5 1.5h45c.8 0 1.5-.7 1.5-1.5v-5c0-.8-.7-1.5-1.5-1.5zM20.5 14h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM34.5 14h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM48.5 14h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM20.5 34h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM34.5 34h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM48.5 34h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5z"></path><path d="M48.5 44h-39c-.8 0-1.5-.7-1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v13c0 .8.7 1.5 1.5 1.5h45c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM48.5 24h-39c-.8 0-1.5-.7-1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v13c0 .8.7 1.5 1.5 1.5h45c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5z"></path></svg>
                                        </span>
                                        汇总
                                      </div>
                                    </template>
                                    <div class="sumBox">
                                      <ul>
                                        <li v-for="(sumItem, sumIdx) in summarys" :key="sumIdx" @click="handleSelectSum(item, sumItem)">
                                          <span>
                                            <svg v-if="item.summarys.includes(sumItem.key+item.field)" aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M19.1 42.5L2.6 25.9c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.6 1.6-.6 2.2 0L19.4 34c.4.4 1.1.4 1.5 0L45.2 9.5c.6-.6 1.6-.6 2.2 0l2.2 2.2c.6.6.6 1.6 0 2.2L21.3 42.5c-.6.7-1.6.7-2.2 0z"></path></svg>
                                          </span>
                                          {{sumItem.name}}
                                        </li>
                                      </ul>
                                    </div>
                                  </a-sub-menu>
                                  <a-menu-item key="6">
                                    <div class="menuItemAction">
                                      <span>
                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                          <path
                                            d="M44.8 49.5H7.2c-2.6 0-4.7-2.1-4.7-4.7V7.2c0-2.6 2.1-4.7 4.7-4.7h37.6c2.6 0 4.7 2.1 4.7 4.7v37.6c0 2.6-2.1 4.7-4.7 4.7zm-36-39.2v31.3c0 .9.7 1.6 1.6 1.6h31.3c.9 0 1.6-.7 1.6-1.6V10.3c0-.9-.7-1.6-1.6-1.6H10.4c-.9.1-1.6.8-1.6 1.6z">
                                          </path>
                                          <path
                                            d="M36.2 20.3h-2.9l1.2-4.8v-.1c0-.2-.1-.4-.4-.4h-2.3c-.2 0-.3.1-.4.3l-1.2 4.9h-5.8l1.2-4.8v-.1c0-.2-.1-.4-.4-.4h-2.3c-.2 0-.3.1-.4.3l-1.3 4.9H18c-.2 0-.3.1-.4.3l-.6 2.2v.1c0 .2.1.4.4.4h3L19 28.7h-3.1c-.2 0-.3.1-.4.3l-.6 2.2v.1c0 .2.1.4.4.4h2.9L17 36.5v.1c0 .2.1.4.4.4h2.3c.2 0 .3-.1.4-.3l1.3-5h5.7L26 36.4v.1c0 .2.1.4.4.4h2.3c.2 0 .3-.1.4-.3l1.3-5h3.2c.2 0 .3-.1.4-.3l.6-2.2V29c0-.2-.1-.4-.4-.4h-3l1.4-5.6h3.1c.2 0 .3-.1.4-.3l.6-2.2v-.1c-.1.1-.3-.1-.5-.1zm-8.1 8.5h-5.8l1.4-5.6h5.7l-1.3 5.6z">
                                          </path>
                                        </svg>
                                      </span>
                                      显示唯一计数
                                    </div>
                                  </a-menu-item>
                                  <div class="has-divider"></div>
                                  <a-menu-item key="left">
                                    <div class="menuItemAction">
                                      <span>
                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M48.6 23H15.4c-.9 0-1.3-1.1-.7-1.7l9.6-9.6c.6-.6.6-1.5 0-2.1l-2.2-2.2c-.6-.6-1.5-.6-2.1 0L2.5 25c-.6.6-.6 1.5 0 2.1L20 44.6c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1l-9.6-9.6c-.6-.7-.2-1.8.7-1.8h33.2c.8 0 1.5-.6 1.5-1.4v-3c0-.8-.6-1.6-1.4-1.6z"></path></svg>
                                      </span>
                                      向左移
                                    </div>
                                  </a-menu-item>
                                  <a-menu-item key="right">
                                    <div class="menuItemAction">
                                      <span>
                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M3.4 29h33.2c.9 0 1.3 1.1.7 1.7l-9.6 9.6c-.6.6-.6 1.5 0 2.1l2.2 2.2c.6.6 1.5.6 2.1 0L49.5 27c.6-.6.6-1.5 0-2.1L32 7.4c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l9.6 9.6c.6.7.2 1.8-.7 1.8H3.5c-.8 0-1.5.6-1.5 1.4v3c0 .8.6 1.6 1.4 1.6z"></path></svg>
                                      </span>
                                      向右移
                                    </div>
                                  </a-menu-item>
                                  <div class="has-divider"></div>
                                  <a-menu-item key="delete-column">
                                    <div class="menuItemAction">
                                      <span>
                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                                      </span>
                                      删除列
                                    </div>
                                  </a-menu-item>
                                </a-menu>
                              </template>
                            </a-dropdown>
                          </div>
                        </span>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="data-grid-table-ctr leftFiexd" ref="leftFiexdRef" style="width: 41px;z-index: 1;overflow: hidden;">
            <table class="data-grid-table data-grid-fixed-column-table">
              <colgroup class="data-grid-table-colgroup">
                <col class="data-grid-table-col" style="width: 40px;">
              </colgroup>
              <tbody>
                <tr>
                    <th></th>
                </tr>
                <tr class="data-grid-table-row" v-for="(item, index) in listData" :key="index">
                    <th class="data-grid-table-cell data-grid-table-cell-fixed-column-divider">{{index++}}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="data-grid-table-ctr" ref="gridTableRef">
            <table class="data-grid-table">
              <thead>
                <tr>
                  <th class="data-grid-header-cell"></th>
                  <th class="data-grid-header-cell" v-for="(item, index) in columns" :key="index">
                    <div class="data-grid-table-cell-box">
                      <div class="table-cell-measure-header">
                        <span class="table-cell-measure-header-text">
                          {{ item.label }}
                        </span>
                        <span class="table-cell-measure-header-icons">
                          <div>
                            <a-dropdown :trigger="['click']">
                              <button class="fh-btn">
                                <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                  <path
                                    d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z">
                                  </path>
                                </svg>
                              </button>
                              <template #overlay>
                                <a-menu class="fh-menu" style="width: 136px;">
                                    <a-menu-item key="1">按升序排序</a-menu-item>
                                    <a-menu-item key="2">添加交叉筛选器</a-menu-item>
                                    <a-menu-item key="3">添加行限制</a-menu-item>
                                  </a-menu>
                              </template>
                            </a-dropdown>
                          </div>
                        </span>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in listData" :key="index">
                  <th>{{index++}}</th>
                  <td v-for="(row, idx) in item.dataCells" :key="idx">
                    <div class="data-grid-table-cell-box">
                      {{row.label}}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
    inject,
    nextTick
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();
  const headFiexdRef = ref(null);
  const leftFiexdRef = ref(null);
  const gridTableRef = ref(null);

  const props = defineProps({
    runReportData: Object
  });
  const emit =  defineEmits(['params']);
  const data = reactive({
    columns1: [
      {
        label: "姓氏",
        isPick: true
      },
      {
        label: "名字",
        isPick: true
      },
      {
        label: "称谓",
        isPick: true
      },
      {
        label: "职务",
        isPick: true
      },
      {
        label: "邮寄地址 - 国家/地区",
        isPick: true
      },
      {
        label: "邮寄地址 - 邮政编码",
        isPick: true
      },
      {
        label: "邮寄地址 - 州/省",
        isPick: true
      },
      {
        label: "邮寄地址 - 城市",
        isPick: true
      },
      {
        label: "邮寄地址 - 街道",
        isPick: false
      },
      {
        label: "电话",
        isPick: true
      },
      {
        label: "手机",
        isPick: true
      },
      {
        label: "传真",
        isPick: true
      },
      {
        label: "电子邮件",
        isPick: true
      },
      {
        label: "客户所有人",
        isPick: true
      },
      {
        label: "客户名",
        isPick: true
      },
    ],
    columns: [],
    listData: [],
    detailColumnInfo: {},
    sortBy: []
  })

  const { columns, listData, detailColumnInfo, sortBy } = toRefs(data);

  const getTableConfig = () => {
    console.log(" props.runReportData",  props.runReportData);
    let detailColumns = props.runReportData.reportMetadata.detailColumns;
    let detailColumnInfo = props.runReportData.reportExtendedMetadata.detailColumnInfo;
    data.detailColumnInfo = detailColumnInfo;
    data.sortBy = JSON.parse(JSON.stringify(props.runReportData.reportMetadata.sortBy));
    let columns = [];
    detailColumns.forEach(item=>{
      columns.push(detailColumnInfo[item])
    });
    data.columns = columns;
    // 排序字段处理
    data.sortBy.forEach(item=>{
      data.columns.forEach(row=>{
        if(item.sortColumn==row.column){
          row.sort = item.sortOrder;
        }
      })
    })
    let factMap = props.runReportData.factMap;
    data.listData = factMap['T!T'].rows;
    console.log("listData", data.listData);
  }
  getTableConfig();

  onMounted(()=>{
    gridTableRef.value.addEventListener("scroll", e=>{
      let left = e.target.scrollLeft;
      let top = e.target.scrollTop;
      headFiexdRef.value.scrollLeft = left;
      leftFiexdRef.value.scrollTop = top;
    })
  })

  // 列操作
  const handleActionMenu = (e, item, index) => {
    console.log("列表操作", e, item, index);
    switch (e.key) {
      case 'delete-column':
        data.columns.splice(index, 1);
        break;
      case 'right':
        moveColumn('right', index, item);
        break;
      case 'left':
        moveColumn('left', index, item);
        break;
      case 'desc':
        item.sort = 'desc';
        listSort('desc', index, item);
        break;
      case 'asc':
        item.sort = 'asc';
        listSort('asc', index, item);
        break;
      case 'groupRow':
        const copyItem = JSON.parse(JSON.stringify(item));
        emit('groupRow', copyItem);
        break;
    }
  }
  // 列
  watch(()=> data.columns, (newVal, oldVal)=>{
    let arr = newVal.map(item=>item.column);
    emit("params", 'detailColumns', arr);
  },{deep: true})

  const listSort = (sortOrder, index, item) => {
    let rowIdx = data.sortBy.findIndex(row=>row.sortColumn==item.column);
    if(rowIdx==-1){
      data.sortBy.push({
        sortColumn: item.column,
        sortOrder: sortOrder
      });
    }else {
      data.sortBy[rowIdx].sortOrder = sortOrder;
    }
    emit("params", 'sortBy', data.sortBy);
  };

  // 向左/向右移动
  const moveColumn = (direction, index, item) => {
    if(direction == 'left' && index) {
      const newIndex = index - 1;
      [data.columns[index], data.columns[newIndex]] = [data.columns[newIndex], data.columns[index]];
    }else if(direction == 'right' && index < data.columns.length - 1) {
      const newIndex = index + 1;
      [data.columns[index], data.columns[newIndex]] = [data.columns[newIndex], data.columns[index]]; 
    }
  }

  
</script>
<style lang="less" scoped>
    .tableGridWrap{
      width: 100%;
      height: 100%;
      .data-grid{
        width: 100%;
        height: 100%;
        position: relative;
        .data-grid-table-ctr{
          width: 100%;
          height: 100%;
          position: absolute;
          overflow: auto;
          background: #fff;
          &.head{
            /* width: calc(~"100% - 17px"); */
          }
          &.leftFiexd{
            height: calc(~"100% - 18px");
          }
        }
        .data-grid-table.data-grid-fixed-row-column-table{
          width: 40px;
        }
        .data-grid-table.data-grid-fixed-row-table{
          width: 3225px;
          table-layout: fixed;
          border-collapse: collapse;
        }
        .data-grid-table.data-grid-fixed-column-table{
          width: 40px;
        }
        .data-grid-table{
          /* width: 100%; */
          width: 3241px;
          table-layout: fixed;
          border-collapse: collapse;
          thead{
            tr{
              th{
                /* min-width: 400px; */
                background-color: #f3f3f3;
                color: #444;
                vertical-align: middle;
                font-weight: bold;
                cursor: pointer;
                fill: #747474;
                border-left: 1px solid #e1e6ef;
                border-color: #c7d4e1;
                text-align: left;
                font-size: 13px;
                border-bottom: none;
                &:first-child{
                  border-left: none;
                }
                &:hover{
                  color: #0176d3;
                  /* border-right: 3px solid #dddbda; */
                }
                .data-grid-table-cell-box{
                  padding: 6px;
                  .table-cell-measure-header{
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    line-height: 16px;
                    justify-content: space-between;
                    .table-cell-measure-header-icons{
                      .fh-btn{
                        width: 16px;
                        height: 16px;
                        padding: 0;
                        border-color: #c9c9c9;
                        background: #f3f3f3;
                        border-radius: 2px;
                        color: #7d98b3;
                        .btn_icon{
                          /* fill: #7d98b3; */
                          transform: scale(.76);
                          fill: currentColor;
                        }
                        &:hover{
                          border-color: #7d98b3;
                          color: #747474;
                        }
                      }
                    }
                  }
                }
              }
              th:first-child{
                width: 41px;
                height: 36px;
              }
            }
          }
          tbody{
            tr{
              border-top: 1px solid #e1e6ef;
              height: 36px;
              th{
                min-width: 40px;
                font-weight: normal;
                font-size: 12px;
                color: #444;
              }
              td{
                overflow: hidden;
                position: relative;
                background-clip: padding-box;
                font-size: 12px;
                font-weight: 400;
                color: #16315a;
                fill: #16315a;
                line-height: 1;
                background: #fff;
                white-space: normal;
                word-break: break-word;
                vertical-align: top;
                border-left: 1px solid #e1e6ef;
                .data-grid-table-cell-box{
                  height: 18px;
                  padding: 8px;
                }
              }
            }
          }
          .data-grid-table-cell.data-grid-header-cell{
            color: #444;
            background-color: #f3f3f3;
            border-bottom: 2px solid #c9c9c9;
            vertical-align: top;
            border-right: 1px solid #a8b8c7;
          }
          .data-grid-table-cell.data-grid-table-cell-fixed-column-divider{
            border-right: 1px solid #a8b8c7;
          }
          .data-grid-table-row.data-grid-table-row-fixed-row-divider{
            border-bottom: 1px solid #a8b8c7;
          }
        }
      }
    }
    .menuItemAction{
      white-space: nowrap;
      .btn_icon{
        width: 16px;
        height: 16px;
        transform: scale(.875, .875);
        margin-right: 8px;
      }
    }
</style>