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
        <div>备注</div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" :style="{ height: height + 'px' }">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionTitle">基本信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item
                    label="标题"
                    name="Name"
                    :rules="[
                      {
                        required: true,
                        message: '请输入标题',
                      },
                    ]"
                  >
                    <a-input v-model:value="formState.Name"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item label="私有" name="IsPrivate">
                    <a-checkbox
                      v-model:checked="formState.IsPrivate"
                    ></a-checkbox>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item
                    label="备注"
                    name="Body"
                    :rules="[
                      {
                        required: true,
                        message: '请输入备注',
                      },
                    ]"
                  >
                    <a-textarea :rows="4" v-model:value="formState.Body" />
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
import { useStore } from "vuex";
let store = useStore();
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { girdFormatterValue } from "@/utils/common.js";
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  id:String
});
const formRef = ref();
const emit = defineEmits(["cancel"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  height: "",
  id:''
});
const { height,id } = toRefs(data);
const formState = reactive({
  Name: "",
  IsPrivate: false,
  Body: "",
});

const getNote = () => {
        let filterQuery='\nParentId\teq\t'+props.id;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'1002',
            entityName:'RelatedNote',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 10,
            sort:'',
            order:'',
            displayColumns:'Name,Body,IsPrivate'
        }).then(res => {
            var list = [];
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='IsPrivate'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='IsPrivate'){
                        item[cell]=item[cell].selected;
                    }
                }
                list.push(item)
            }
            if(list.length){
              data.id=list[0].id;
              formState.Name=list[0].Name;
              formState.IsPrivate=list[0].IsPrivate;
              formState.Body=list[0].Body;
            }
        })
};

data.height = document.documentElement.clientHeight - 300;
onMounted(() => {
  getNote();
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 300;
  });
});

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      let url=Interface.create;
      let fields = JSON.parse(JSON.stringify(formState));
      fields.ParentId = props.id;
            let d = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'RelatedNote',
                    objTypeCode: 1002,
                    fields: fields
                  }              
                }
            }]
            };
            if(data.id){
                d.actions[0].params.recordId=data.id;
                url=Interface.edit;
            }
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                    message.success("保存成功！");
                    emit("cancel", false);
                    formRef.value.resetFields();
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                        message.error(res.actions[0].errorMessage);
                    }
                    else{
                        message.error("保存失败！");
                    }
                }
            });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
</script>
<style lang="less">
@import url("@/style/modal.less");


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
</style>
