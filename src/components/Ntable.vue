<template>
  <div class="dtable" :style="{height:tableHeight+'px'}">
    <div :id="name"></div>
  </div>
</template>

<script setup>
  import { ref, reactive, toRefs, onMounted, watch, defineProps, defineExpose } from "vue";
  const props = defineProps({
    tableHeight: [String, Number],
    isCollapsed: Boolean,
    columns: Array,
    gridUrl: String,
    name: {
      default: 'datagrid'
    },
    singleSelect: Boolean
  })
  watch(()=> props.isCollapsed, (newVal,oldVal) => {
    $("#"+props.name).datagrid("reload");
  })
  const loadGrid = (queryParams) => {
    console.log('loadGrid:queryParams', queryParams)
    var height = props.tableHeight;
    var singleSelect = props.singleSelect || false;
    console.log('height',height);
    var columns = props.columns;
    
    if ($.fn.pagination.defaults != undefined) {//分页工具栏处理

      $.fn.pagination.defaults.beforePageText = "";

      $.fn.pagination.defaults.afterPageText = "/{pages}";

      $.fn.pagination.defaults.displayMsg = "从{from} 到 {to} 总计 {total} 条";

    }
    var url = props.gridUrl;
    $('#'+props.name).datagrid({
      url: url,
      loadFilter: function (data) {
          var data0 = { rows: [], total: 0 }
          if (data) {
              if (data.nodes) {
                data0.rows = data.nodes;
              }
              data0.total = data&&data.totalCount ? Number(data.totalCount) : data0.rows.length;
          }
          return data0
      },
      method: "post",
      columns: [columns],
      queryParams: queryParams,
      singleSelect: singleSelect,
      checkOnSelect: false,
      selectOnCheck: true,
      pagination: true,
      pageNumber: 1,
      pageSize: 10,
      fit: true,
      striped: false,
      rownumbers: true,
      onLoadSuccess: function () {
        $('#'+props.name).datagrid('resize', { height: height });
      }
    });
  }
  
  
  const getCheckList = () => {
    let list = $('#'+props.name).datagrid("getChecked");
    console.log("list",list);
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