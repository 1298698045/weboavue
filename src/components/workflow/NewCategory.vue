<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="850px"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
      >
        <template #title>
          <div>
            {{ title }}
          </div>
        </template>
        <div class="modalContainer">
          <div class="modalCenter" :style="{ height: height + 'px!important' }">
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionTitle">基本信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="ObjectTypeCode" label="类型" :rules="[{ required: true, message: '请选择类型' }]">
                            <a-input disabled v-model:value="formState.ObjectTypeCode"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Name" label="文件夹标签" :rules="[{ required: true, message: '请输入文件夹标签' }]">
                            <a-input v-model:value="formState.Name"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="SortNumber" label="序号" :rules="[{ required: true, message: '请输入序号' }]">
                            <a-input v-model:value="formState.SortNumber"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="ParentId" label="父栏目" :rules="[{ required: true, message: '请选择父栏目' }]">
                            <div class="treeBox">
                                <a-tree :selectedKeys="formState.ParentId"  @select="handleSelectTree" block-node :tree-data="treeData">
                                    <template  #title="{text, key }">
                                        <span>{{text}}</span>
                                    </template>
                                </a-tree>
                            </div>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="NeedCensor" label="审批发布">
                          <a-checkbox v-model:checked="formState.NeedCensor"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="AllowComment" label="打开评论">
                          <a-checkbox v-model:checked="formState.AllowComment"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">其他信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Description" label="描述">
                            <a-textarea :rows="4" v-model:value="formState.Description" />
                        </a-form-item>
                    </div>
                </div>
              </div>
            </a-form>
          </div>
        </div>
        <template #footer>
          <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
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
    toRaw,
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    folderName: String,
    folderPicker: String,
    ObjectTypeCode: String,
    id: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "新建分类",
    height: document.documentElement.clientHeight - 300,
    treeData: []
  });
  const {
    title,
    height, treeData
  } = toRefs(data);
  const formState = reactive({
    ObjectTypeCode: props.ObjectTypeCode,
    Name: "",
    SortNumber: "",
    NeedCensor: false,
    AllowComment: false,
    Description: "",
    ParentId: []
  });
  const getTree = () => {
    proxy.$get(Interface.flow.tree,{
        entity: "processtree"
    }).then(res=>{
        let listData = res.rows;
        let formTree = (list) => {
        list.forEach(item=>{
            if(item.children){
                formTree(item.children);
            }
            item.key = item.id;
            item.value = item.id;
        })
        }
        formTree(listData);
        data.treeData = listData;
    })
  }
  getTree();
  const handleSelectTree = (selectedKeys,selectedNodes) => {
        // console.log("e",selectedKeys,selectedNodes);
        formState.ParentId = [selectedNodes.node.id];
    }
  const getDetail = () => {
    proxy.$get(Interface.flow.treeDetail,{
        id: props.id,
        objTypeCode: 100200
    }).then(res=>{
        let record = res.record;
        formState.Name = record.Name;
        formState.SortNumber = record.SortNumber;
        formState.NeedCensor = record.NeedCensor;
        formState.AllowComment = record.AllowComment;
        formState.Description = record.Description;
        formState.ParentId = [record.Id];
    })
  }
  if(props.id){
      getDetail();
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let obj = {
          params: {
            objTypeCode: 100200,
            fields: {
                ObjectTypeCode: formState.ObjectTypeCode,
                Name: formState.Name,
                SortNumber: formState.SortNumber,
                NeedCensor: formState.NeedCensor,
                AllowComment: formState.AllowComment,
                Description: formState.Description,
                ParentId: {
                    Id: formState.ParentId.join(',')
                }
            },
            id: "",
          },
        };
        var messages = JSON.stringify(obj);
        proxy.$get(Interface.saveRecord, { message: messages }).then((res) => {
          formRef.value.resetFields();
          message.warning("保存成功！");
          emit("cancel", false);
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  </script>
  <style lang="less">
  @import url("@/style/modal.less");
  .ant-modal-content .modalContainer .modalCenter {
    /* height: 500px !important; */
  }
  .section {
    .sectionTitle {
      height: 30px;
      background-color: rgb(243, 242, 242);
      line-height: 30px;
      border-radius: 4px;
      padding-left: 15px;
      margin-bottom: 12px;
      /* margin: 2rem 2rem 0.5rem 2rem; */
    }
    .sectionRow {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      .sectionItem {
        flex: 1;
        margin-right: 20px;
        .ant-row {
          display: block !important;
        }
      }
      .sectionItem:last-child {
        margin-right: 0;
      }
    }
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-picker {
    width: 100%;
  }
  .ant-form-item {
    position: relative;
  }
  .selectIcon {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .treeBox{
    width: 300px;
    height: 300px;
    border: 1px solid #e2e3e5;
    border-radius: 5px;
    overflow: auto;
  }
  </style>
  