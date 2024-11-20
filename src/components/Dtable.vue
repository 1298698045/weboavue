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
    // const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    var height = props.tableHeight;
    var singleSelect = props.singleSelect || false;
    console.log('height',height);
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
    //             <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
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
    var authorization=window.localStorage.getItem('token')||'';
    var url = props.gridUrl;
    $('#'+props.name).datagrid({
      // url: '/localData/datalist.json',
      url: url,
      loadFilter: function (data) {
          var data0 = { rows: [], total: 0 }
          if (data) {
              if (data.rows) {
                  if (data.rows.Table) {
                      data0.rows = data.rows.Table;
                  }
                  else {
                      data0.rows = data.rows;
                  }
              }
              else if (data.data && data.data.Table) {
                  data0.rows = data.data.Table;
              }
              else if (data.listData) {
                  data0.rows = data.listData;
              }
              else {
                  data0.rows = data;
              }
          }
          data0.total = data&&data.totalCount ? Number(data.totalCount) : data0.rows.length;
          return data0
      },
      method: "get",
      columns: [columns],
      queryParams: queryParams,
      headers:{authorization:authorization},
      // data: tableList,
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
  :deep .iconBox{
  text-align: center;
  .popup{
    text-align: left;
    top: 20px;
  }
  .moreaction{
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }
}
</style>