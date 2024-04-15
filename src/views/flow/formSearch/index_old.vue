<template>
    <div class="formSearchWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    选择流程
                </div>
                <div class="panel-search">
                    <a-input placeholder="搜索流程"></a-input>
                </div>
            </div>
            <div class="panel-bd">
                <div class="tabList">
                    <div class="tabItem" :class="{'active':index==current}" v-for="(item,index) in list" :key="index" @click="handleTab(item,index)">
                        {{item.ItemName}}
                    </div>
                </div>
                <div class="moduleBoxWrap">
                    <div class="moduleBox" v-for="(item,index) in list[current] && list[current].ProcessFormInfo" :key="index" @click="handleDetail(item)">
                        <div class="title">
                            {{item.Name}}
                        </div>
                    </div>
                    <div class="fake_item"></div>
                    <div class="fake_item"></div>
                </div>
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
        inject
    } from "vue";
    import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  import { message } from "ant-design-vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const data = reactive({
    list: [],
    current: 0
  });
  const { list, current } = toRefs(data);
  const getProcessList = () => {
    proxy.$get(Interface.flow.permissionform,{

    }).then(res=>{
        let ProcessFormInfo = [];
        res.forEach(item=>{
            item.ProcessFormInfo.forEach(row=>{
                ProcessFormInfo.push(row);
            })
        })
        let list = res;
        list.unshift({
            ItemName: "全部",
            ProcessFormInfo: ProcessFormInfo
        });
        data.list = list;
        console.log("list",list);

    })
  }
  getProcessList();
  const handleTab = (item,index) => {
    data.current = index;
  }
  const handleDetail = (item) => {
    console.log(item);
    router.push({
        path: "/flow/formSearch/list",
        query: {
            objectTypeCode: item.ObjectTypeCode,
            entityType: item.EntityType
        }
    })
  }
</script>
<style lang="less" scoped>
    .formSearchWrap{
        width: 100%;
        height: 100%;
        background: #fff;
        .tabList{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .tabItem{
                padding: 6px 16px;
                border-radius: 16px;
                background: transparent;
                font-size: 14px;
                margin-right: 10px;
                color: #4e5969;
                white-space: nowrap;
                margin-bottom: 5px;
                &:hover{
                    background: #f2f3f5;
                    cursor: pointer;
                }
                &.active{
                    background: #f2f3f5;
                    color: var(--textColor);
                    font-weight: bold;
                }
                
            }
        }
        .panel{
            height: 100%;
            overflow: hidden;
        }
        .panel-bd{
            height: 100%;
        }
        .moduleBoxWrap{
            height: calc(~"100% - 150px");
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-top: 25px;
            overflow-y: auto;
            align-content: flex-start;
            .moduleBox{
                width: 22%;
                border-radius: 4px;
                margin-bottom: 16px;
                padding: 16px;
                box-sizing: border-box;
                cursor: pointer;
                background-color: #f2f3f5;
                border: 1px solid #e5e6eb;
                &:hover{
                    box-shadow: 4px 4px 10px 0 rgba(0,0,0,.1);
                }
                .leftTitle{
                    font-size: 14px;
                    color: #1d2129;
                    font-weight: bold;
                }
            }
            .fake_item{
                flex: 0 0 22%;
                height: 0;
            }
        }
    }
</style>