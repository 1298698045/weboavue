<template>
    <div>
      <a-modal v-model:open="props.isShow" width="602px" :maskClosable="false" @cancel="handleCancel">
        <template #title>
          <div class="modal_title">选择文件夹</div>
        </template>
        <div class="modalContainer" ref="modelContentRef">
          <div class="selectFolder" :style="{ height: height + 'px !important',maxHeight: height + 'px' }">
            <div class="folder-header">
                <ol class="breadcrumb">
                    <li class="breadcrumb_item not">
                        <a>全部文件夹</a>
                    </li>
                    <!-- <li class="breadcrumb_item">
                        <span>123</span>
                    </li> -->
                </ol>
            </div>
            <div class="search-container">
                <a-input placeholder="搜索文件夹..." v-model:value="searchVal" @change="getQuery">
                    <template #prefix>
                        <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                    </template>
                </a-input>
            </div>
            <div class="folder-container">
                <div class="folderPickerDialogPanel">
                    <div class="folderList">
                        <div class="folderItem">
                            <a href="javascript:;">全部文件夹</a>
                        </div>
                        <div class="folderItem">
                            <a href="javascript:;">由我创建</a>
                        </div>
                        <div class="folderItem">
                            <a href="javascript:;">与我共享</a>
                        </div>
                        <div class="folderItem">
                            <a href="javascript:;">专用报表</a>
                        </div>
                        <div class="folderItem">
                            <a href="javascript:;">公用报表</a>
                        </div>
                    </div>
                </div>
                <div class="folderPickerDialogPanel">
                    <div class="folderList">
                        <div class="folderItem" :class="{'active':item.id==selectParams.Id}" v-for="(item, index) in listData" :key="index" @click="handleSelect(item, index)">
                            <span class="folderIcon">
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-57l6k3qsmc9="" data-key="open_folder" class="iconSvg"><g lwc-57l6k3qsmc9=""><path d="M460 140H233c-14 0-27-8-35-20l-35-60a40 40 0 00-35-20H60a40 40 0 00-40 40v360a40 40 0 0040 40h400a40 40 0 0040-40V180a40 40 0 00-40-40zm0-80H219c-4 0-6 4-4 7l16 27c2 4 5 6 9 6h220c11 0 22 2 31 6 4 2 9-1 9-6a40 40 0 00-40-40z" lwc-57l6k3qsmc9=""></path></g></svg>
                            </span>
                            <a href="javascript:;">{{item.Name.textValue}}</a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <template #footer>
          <div class="flex" style="justify-content: space-between">
            <div>
                <a-button>
                    <span>
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-57l6k3qsmc9="" data-key="open_folder" class="btn_icon btn_icon_left"><g lwc-57l6k3qsmc9=""><path d="M460 140H233c-14 0-27-8-35-20l-35-60a40 40 0 00-35-20H60a40 40 0 00-40 40v360a40 40 0 0040 40h400a40 40 0 0040-40V180a40 40 0 00-40-40zm0-80H219c-4 0-6 4-4 7l16 27c2 4 5 6 9 6h220c11 0 22 2 31 6 4 2 9-1 9-6a40 40 0 00-40-40z" lwc-57l6k3qsmc9=""></path></g></svg>
                    </span>
                    新建文件夹
                </a-button>
            </div>
            <div>
                <a-button @click="handleCancel">取消</a-button>
                <a-button type="primary" @click.prevent="handleSubmit">选择</a-button>
            </div>
          </div>
        </template>
      </a-modal>
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
      computed,
      toRaw
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
  
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
      isShow: Boolean,
    });
    const formRef = ref(null);
    const emit = defineEmits(["cancel", "ok", "params"]);
    

    const handleCancel = () => {
      emit("cancel", false);
    };
    

    const formState = reactive({
        Name: "",
        // apiname: ""
    })

    const data = reactive({
        height: document.documentElement.clientHeight - 300,
        listData: [],
        selectParams: {
            Id: ""
        },
        searchVal: ""
    });
    const { height, listData, selectParams, searchVal } = toRefs(data);
    
    onMounted(() => {

    })

    const getQuery = () => {
        let d = {
            filterId: "",
            entityName: "ReportTypeFolder",
            objectTypeCode: 9105,
            search: data.searchVal
        }
        proxy.$post(Interface.list2, d).then(res=>{
            data.listData = res.nodes;
        })
    }
    getQuery();

    const handleSelect = (item, index) => {
        data.selectParams = {
            Id: item.id,
            Name: item.Name.textValue
        }
    }

    const handleSubmit = () => {
      if(data.selectParams.Id){
        emit("ok", data.selectParams);
      }
    };

  </script>
  <style lang="less">
    @import url("@/style/modal.less");
  </style>
  <style lang="less" scoped>
    .selectFolder{
        .folder-header{
            width: 100%;
            height: 38px;
            line-height: 16px;
            padding: 12px 16px 8px 16px;
            .breadcrumb{
                display: flex;
                position: relative;
                .breadcrumb_item{
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 1.25;
                    position: relative;
                    &:first-child{
                        a{
                            padding-left: 0;
                        }
                    }
                    a{
                        color: #014486;
                    }
                    span,a{
                        font-size: 20px;
                        line-height: 24px;
                        font-weight: normal;
                        display: inline;
                        padding: 8px;
                    }
                }
                .breadcrumb_item:not(.not)::before{
                    content: '';
                    position: relative;
                    left: 0;
                    top: 6px;
                    color: transparent;
                    background-image: url("~@/assets/img/chevronright.png");
                    background-size: 8px 14px;
                    background-repeat: no-repeat;
                    width: 8px;
                    height: 14px;
                    display: inline-block;
                    vertical-align: top;
                }
            }
        }
        .search-container{
            margin: 12px 16px;
        }
        .folder-container{
            width: 100%;
            height: calc(~"100% - 94px");
            position: relative;
            border-top: 2px solid #dddbda;
            display: flex;
            background: #f3f3f3;
            .folderPickerDialogPanel{
                flex: 1;
                .folderList{
                    background: #fff;
                    max-height: 100%;
                    overflow: auto;
                    .folderItem{
                        height: 38px;
                        line-height: 38px;
                        display: flex;
                        align-items: center;
                        padding: 0 8px;
                        background-image: url('~@/assets/img/right.png');
                        background-repeat: no-repeat;
                        background-position: calc(~"100% - 16px") 14px;
                        background-size: 6px 10px;
                        padding-right: 0;
                        cursor: pointer;
                        border-bottom: 1px solid #c9c9c9;
                        &.active,&:hover{
                            background-color: #f3f3f3;
                            box-shadow: #e5e5e5 0 calc(-1 * 1px) 0 inset, #e5e5e5 0 1px 0 inset;
                            a{
                                text-decoration: underline;
                            }
                        }
                        a{
                            color: #0176d3;
                        }
                        .folderIcon{
                            /* width: 16px;
                            height: 16px; */
                            display: inline-block;
                            margin-right: 8px;
                        }
                        .iconSvg{
                            width: 16px;
                            height: 16px;
                            fill: #747474;
                        }
                    }
                }

            }
            .folderPickerDialogPanel:first-child{
                border-right: 1px solid #dddbda;
            }
        }
    }
  </style>