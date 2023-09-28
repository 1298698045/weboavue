<template>
  <div class="dtable" :style="{height:tableHeight+'px'}">
    <div id="datagrid"></div>
  </div>
</template>

<script setup>
  import { ref, reactive, toRefs, onMounted, watch, defineProps, defineExpose } from "vue";
  const props = defineProps({
    tableHeight: String,
    isCollapsed: Boolean,
    columns: Array,
    gridUrl: String
  })
  watch(()=> props.isCollapsed, (newVal,oldVal) => {
    $("#datagrid").datagrid("reload");
  })
  const loadGrid = (queryParams) => {
    console.log('loadGrid:queryParams', queryParams)
    // const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    var height = props.tableHeight;
    var columns = props.columns;
    // var columns = [
    //   {
    //     field: 'ids',
    //     checkbox: true
    //   },
    //   {
    //       field: "Action",
    //       title: "操作",
    //       formatter: function formatter(value, row, index) {
    //         var str = `
    //           <div class="iconBox">
    //             <div class="popup">
    //               <div class="option-item">办理</div>
    //               <div class="option-item">委派</div>  
    //               <div class="option-item">传阅</div>  
    //               <div class="option-item">打印</div>
    //             </div>
    //             <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
    //         `
    //         return str;
    //       }
    //   },
    //   {
    //     field: 'IsRead', title: '已读', sortable: true, formatter: function (value, row, index) {
    //       if (value == 'True' || value == 'true' || value == true) {
    //         return '<img style=\"height:18px;width:24px;margin-left:7px;\" src="' + imgUrl + '" />';
    //       }
    //       else {
    //         return '';
    //       }
    //     }
    //   },
    //   { field: 'Name', title: '标题', sortable: true },
    //   { field: 'PriorityName', title: '紧急程度', sortable: true },
    //   { field: 'ToActivityName', title: '当前环节', sortable: true },
    //   { field: 'FromActivityName', title: '来源环节', sortable: true },
    //   { field: 'CreatedByName', title: '来源提交人', sortable: true },
    //   { field: 'CreatedOn', title: '来源提交', sortable: true },
    //   { field: 'StartByName', title: '发起人姓名', sortable: true },
    //   { field: 'StartedOn', title: '发起时间', sortable: true },
    //   { field: 'BusinessUnitIdName', title: '发起人部门', sortable: true },
    //   { field: 'Deadline', title: '办理期限', sortable: true },
    //   { field: 'ProcessIdName', title: '流程', sortable: true },
    // ]
    if ($.fn.pagination.defaults != undefined) {//分页工具栏处理

      $.fn.pagination.defaults.beforePageText = "";

      $.fn.pagination.defaults.afterPageText = "/{pages}";

      $.fn.pagination.defaults.displayMsg = "从{from} 到 {to} 总计 {total} 条";

    }
    var url = props.gridUrl;
    $('#datagrid').datagrid({
      // url: '/localData/datalist.json',
      url: url,
      method: "get",
      columns: [columns],
      queryParams: queryParams,
      // data: tableList,
      singleSelect: false,
      checkOnSelect: false,
      selectOnCheck: false,
      pagination: true,
      pageNumber: 1,
      pageSize: 10,
      fit: true,
      striped: false,
      rownumbers: true,
      onLoadSuccess: function () {
        $('#datagrid').datagrid('resize', { height: height });
      }
    });
  }
  defineExpose({loadGrid})
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