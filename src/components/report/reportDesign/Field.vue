<template>
    <div class="fieldWrap">
        <div class="fields-panel-search hideTypeFilter">
          <div class="fieldsSearch">
            <input class="input" placeholder="搜索所有字段..." type="search" v-model="searchVal" @input="handleSearch">
            <span class="fh-btn-icon">
              <svg aria-hidden="true" class="btn_icon" style="transform: scale(1.3, 1.3);" viewBox="0 0 52 52"><path d="M49.62 45.27L36.22 32a18.9 18.9 0 10-34.1-9.2A18.91 18.91 0 0032 36.27l13.3 13.3a1.45 1.45 0 002.1 0l2.1-2.1a1.68 1.68 0 00.12-2.2zm-28.7-11.5a12.9 12.9 0 1112.9-12.9 12.87 12.87 0 01-12.9 12.9z" fill-rule="evenodd"></path></svg>
              <svg aria-hidden="true" class="btn_icon btn_icon_small" viewBox="0 0 52 52"><path d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z"></path></svg>
            </span>
            <span class="fh-btn-icon" @click="handleCancelFiled">
              <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
            </span>
          </div>
        </div>
        <div class="fields-panel-body">
          <div class="fieldsTree">
            <ul class="fh-tree">
              <li class="fieldsTree-formulas_" v-for="(item,index) in treeData" :key="index">
                <div class="fh-tree_item" :class="{'active':item.isExpanded}" @click="item.isExpanded=!item.isExpanded">
                  <button class="fh-btn-icon">
                    <svg aria-hidden="true" class="btn_icon btn_icon_small" viewBox="0 0 52 52"><path d="M17.9 4.4l20.7 20.5c.6.6.6 1.6 0 2.2L17.9 47.6c-.6.6-1.6.6-2.2 0l-2.2-2.2c-.6-.6-.6-1.6 0-2.2l16.3-16.1c.6-.6.6-1.6 0-2.2L13.6 8.8c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.5 1.5-.5 2.1 0z"></path></svg>
                  </button>
                  <span class="size_1-of-1">
                    <span class="fh-tree__item-label fh-truncate">
                      <span class="tree-branch-label">
                        <span class="fh-icon_container fh-icon-standard-folder">
                          <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100"><path d="M75 34.7H46.6c-1.8 0-3.4-1-4.4-2.5l-4.4-7.6C37 23 35.4 22 33.5 22H25c-2.8 0-5 2.3-5 5.1v45.8c0 2.8 2.2 5.1 5 5.1h50c2.8 0 5-2.3 5-5.1V39.8c0-2.8-2.2-5.1-5-5.1z"></path><path d="M75 24.5H44.9c-.5 0-.8.5-.5.9l2 3.4c.2.5.6.8 1.1.8H75c1.4 0 2.8.3 3.9.8.5.3 1.1-.1 1.1-.8 0-2.8-2.2-5.1-5-5.1z"></path></svg>
                        </span>
                        {{item.label}} (33)
                      </span>
                    </span>
                  </span>
                </div>
                <ul class="fh-is-expanded" v-if="item.isExpanded">
                  <draggable class="list-group" :sort="false" ghost-class="ghost" :list="item.children" :group="gourpA" itemKey="name">
                    <template #item="{ element, index }">
                      <li class="draggable" @click="changeTreeItem(item, element.key)">
                        <div class="fh-tree__item" :class="{'active':element.key==treeKey}">
                          <button class="fh-btn-icon">
                            <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M50.37 47.59L32.74 4a2.41 2.41 0 00-2.2-1.47H20.11A2.21 2.21 0 0018.06 4L1.9 47.59a1.43 1.43 0 001.32 1.91h6a2.36 2.36 0 002.06-1.62L16 34.81h19.68l5.14 13.07a2.36 2.36 0 002.06 1.62h6a1.52 1.52 0 001.49-1.91zM19.08 26l5.73-14.69H26L32.3 26z"></path></svg>
                          </button>
                          <!-- {{item.columns[key].label}} -->
                           {{element.label}}
                        </div>
                      </li>
                    </template>
                  </draggable>
                  <!-- <li class="draggable" v-for="(row, key, index) in item.columns" @click="changeTreeItem(item, key)">
                    <div class="fh-tree__item" :class="{'active':key==treeKey}">
                      <button class="fh-btn-icon">
                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M50.37 47.59L32.74 4a2.41 2.41 0 00-2.2-1.47H20.11A2.21 2.21 0 0018.06 4L1.9 47.59a1.43 1.43 0 001.32 1.91h6a2.36 2.36 0 002.06-1.62L16 34.81h19.68l5.14 13.07a2.36 2.36 0 002.06 1.62h6a1.52 1.52 0 001.49-1.91zM19.08 26l5.73-14.69H26L32.3 26z"></path></svg>
                      </button>
                      {{item.columns[key].label}}
                    </div>
                  </li> -->
                </ul>
              </li>
            </ul>
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
  import draggable from "vuedraggable";
  import Interface from "@/utils/Interface.js";
  import { searchTree, filterTreeWithParents } from "@/utils/common.js";
  const { proxy } = getCurrentInstance();
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();
  const props = defineProps({
    describeReport: Object
  })
  const emit = defineEmits(['cancel']);
  const data = reactive({
    treeData: [],
    searchVal: "",
    categories: [],
    treeKey: "",
    gourpA: {
      name: "gourp",
      pull: 'clone',
      put: false,
      clone: true
    }
  })
  const { treeData, searchVal, treeKey, gourpA } = toRefs(data);

  const loadFn = () => {
    if(props.describeReport){
      let categories = JSON.parse(JSON.stringify(props.describeReport.reportTypeMetadata.categories));
      data.categories = categories.map(item=>{
        item.isExpanded = true;
        item.children = [];
        let keys = Object.keys(item.columns);
        for(let key in item.columns){
          item.children.push({
            key: key,
            label: item.columns[key].label
          })
        }
        return item;
      });
      data.treeData = props.describeReport.reportTypeMetadata.categories.map(item=>{
        item.isExpanded = true;
        item.children = [];
        let keys = Object.keys(item.columns);
        for(let key in item.columns){
          item.children.push({
            key: key,
            label: item.columns[key].label
          })
        }
        return item;
      });
    }
  }
  loadFn();
  // const getTree = () => {
  //   proxy.$get(Interface.report.reportDesign.tree, {}).then(res=>{
  //     let { reportTypeMetadata } = res.actions[0].returnValue;
  //     data.categories = JSON.parse(JSON.stringify(reportTypeMetadata.categories));
  //     data.treeData = reportTypeMetadata.categories.map(item=>{
  //       item.isExpanded = true;
  //       item.children = [];
  //       let keys = Object.keys(item.columns);
  //       for(let key in item.columns){
  //         item.children.push({
  //           key: key,
  //           label: item.columns[key].label
  //         })
  //       }
  //       return item;
  //     });
  //   })
  // }
  // getTree();

  const changeTreeItem = (item, key) => {
    data.treeKey = key;
  }

  const handleSearch = () => {
    data.categories = data.categories.map(item=>{
        item.isExpanded = true;
        item.children = [];
        let keys = Object.keys(item.columns);
        for(let key in item.columns){
          item.children.push({
            key: key,
            label: item.columns[key].label
          })
        }
        return item;
    });
    data.treeData = data.searchVal ? filterTreeWithParents(data.categories, data.searchVal) : data.categories;
  }
  const handleCancelFiled = () => {
    emit("cancel", false);
  }
</script>
<style lang="less" scoped>
    .fieldWrap{
      height: 100%;
      display: flex;
      flex-flow: column;
      .fields-panel-search{
        min-height: 34px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        background-color: #f3f3f3;
        padding-bottom: 5px;
        border-bottom: 1px solid #c9c9c9;
        .fieldsSearch{
          width: 100%;
          background-color: transparent;
          border: none;
          font-size: 14px;
          padding-left: 12px;
          margin-right: 8px;
          margin-left: 8px;
          display: flex;
          align-items: center;
          .input{
            padding-top:0;
            padding-right: 16px;
            padding-bottom: 0;
            padding-left: 12px;
            width: 100%;
            border-radius: 4px;
            line-height: 30px;
            box-sizing: border-box;
            min-height: 8px;
            height: 28px;
            background-color: #f3f3f3;
            border: 0;
            &:focus{
              box-shadow: 0 0 0 2px #0B5CAB;
              outline: 0;
              background-color: #f3f3f3;
            }
          }
          .fh-btn-icon{
            display: inline-flex;
            padding: 0 8px;
            color: #747474;
            align-items: center;
            cursor: pointer;
            &:hover{
              color: #032d60;
            }
          }
        }
      }
      .fields-panel-body{
        padding: 6px 4px 4px 12px;
        overflow: auto;
        overflow-x: hidden;
      }
    }
    .fieldsTree{
      .fh-tree{
        .fieldsTree-formulas_{
          .fh-tree_item{
            color: #444;
            font-size: 14px;
            font-weight: inherit;
            margin-top: 6px;
            margin-bottom: 6px;
            margin-right: 0;
            padding-left: 0;
            display: flex;
            align-items: center;
            text-transform: none;
            cursor: pointer;
            background-color: transparent;
            &.active{
              .fh-btn-icon{
                .btn_icon{
                  transform: scale(.75, .75) rotate(90deg);
                }
              }
            }
            .fh-btn-icon{
              color: #7d98b3;
              margin-right: 4px;
              .btn_icon{
                width: 12px;
                height: 12px;
                cursor: pointer;
                transform: scale(.75, .75);
              }
            }
            .size_1-of-1{
              width: 100%;
              max-width: calc(~"100% - 26px");
              span{
                display: flex;
              }
              .fh-truncate{
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .tree-branch-label{
                  .fh-icon_container{
                    font-size: 14px;
                    border-radius: 2px;
                    margin-right: 6px;
                    text-align: center;
                    text-transform: none;
                    position: relative;
                    display: inline-block;
                    line-height: 1;
                    .btn_icon{
                      width: 16px;
                      height: 16px;
                      transform: scale(1.3, 1.3);
                      background: #f3f3f3;
                      fill: #747474;
                    }
                  }
                }
              }
            }
          }
          .fh-is-expanded{
            height: auto;
            overflow: visible;
          }
          .draggable{
            cursor: move;
          }
          .fh-tree__item{
            margin-right: -4px;
            margin-left: -12px;
            padding-left: 33px;
            font-size: 13px;
            height: 25px;
            white-space: nowrap;
            overflow: hidden;
            cursor: pointer;
            display: flex;
            align-items: center;
            text-transform: none;
            background-color: transparent;
            &.active{
              color: #fff;
              background-color: #0176d3;
              .fh-btn-icon{
                color: #fff;
              }
            }
            .fh-btn-icon{
              width: 20px;
              color: #747474;
              margin-left: 0;
              cursor: default;
              .btn_icon{
                width: 12px;
                height: 12px;
              }
            }
          }
        }
      }
    }
</style>