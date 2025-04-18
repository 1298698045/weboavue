<template>
  <div class="dtable" :style="{height:tableHeight+'px'}">
    <div :id="name"></div>
  </div>
</template>

<script setup>
  import { ref, reactive, toRefs, onMounted, watch, defineProps, defineExpose, defineEmits } from "vue";
  const props = defineProps({
    tableHeight: [String, Number],
    isCollapsed: Boolean,
    columns: Array,
    gridUrl: String,
    name: {
      default: 'datagrid'
    },
    singleSelect: Boolean,
    loadFilter: {
      type: Function,
      default: () => {}
    }
  })
  watch(()=> props.isCollapsed, (newVal,oldVal) => {
    $("#datagrid").datagrid("reload");
  })
  const emit = defineEmits(['onSelect']);
  const loadGrid = (queryParams) => {
    $.ajaxSetup({
        beforeSend: function(xhr) {
          const token = localStorage.getItem('token');
          xhr.setRequestHeader('Authorization', token);
        }
    });
    var height = props.tableHeight;
    var singleSelect = props.singleSelect || false;
    var columns = props.columns;
    var loadFilter = props.loadFilter;
    if ($.fn.pagination.defaults != undefined) {//分页工具栏处理

      $.fn.pagination.defaults.beforePageText = "";

      $.fn.pagination.defaults.afterPageText = "/{pages}";

      $.fn.pagination.defaults.displayMsg = "从{from} 到 {to} 总计 {total} 条";

    }
    var url = props.gridUrl;
    $('#'+props.name).datagrid({
      // url: '/localData/datalist.json',
      url: url,
      loadMsg: '正在加载中，请稍候...',
      // loadFilter: function (data) {
      //   console.log("columns",columns);
      //     var data0 = { rows: [], total: 0 }
      //     if (data) {
      //         if (data.rows) {
      //             if (data.rows.Table) {
      //                 data0.rows = data.rows.Table;
      //             }
      //             else {
      //                 data0.rows = data.rows;
      //             }
      //         }
      //         else if (data.data && data.data.Table) {
      //             data0.rows = data.data.Table;
      //         }
      //         else if (data.listData) {
      //             data0.rows = data.listData;
      //         } else if(data.nodes){
      //           data0.rows = data.nodes;
      //         }
      //         else {
      //             data0.rows = data;
      //         }
      //     }
      //     data0.total = data&&data.total ? Number(data.total) : data0.rows.length;
      //     return data0
      // },
      loadFilter: loadFilter,
      method: "post",
      columns: [columns],
      queryParams: queryParams,
      // data: tableList,
      singleSelect: singleSelect,
      checkOnSelect: false,
      selectOnCheck: true,
      pagination: true,
      pageNumber: 1,
      pageSize: 20,
      fit: true,
      striped: false,
      rownumbers: true,
      onLoadSuccess: function () {
        $('#'+props.name).datagrid('resize', { height: height });
      },
      idField: "LIST_RECORD_ID",
      onSelect: function (index,row) {
          emit("onSelect", row);
      }
    });
  }
  
  
  const getCheckList = () => {
    let list = $('#'+props.name).datagrid("getChecked");
    // console.log("list",list);
    return list;
  }
  defineExpose({loadGrid,getCheckList})
</script>
<style lang="less">
  .iconBox{
    position: relative;
    cursor: pointer;
  }
  .icon.img{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .iconBox:hover .popup{
    display: block;
  }
  .popup{
    position: absolute;
    top: 0;
    min-width: 100px;
    background: #fff;
    display: none;
    z-index: 999999;
    box-shadow: 0 1px 6px hsla(0,0%,39%,.2);
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
  .popup .option-item{
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 6px 6px 0 0;
  }
  .popup .option-item:hover{
    background: #eaf8fe;
  }
  td[field="Action"] .datagrid-cell{
    overflow: initial !important;
  }
</style>