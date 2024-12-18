<template>
    <div>
      <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel"
        @ok="handleSubmit">
        <template #title>
          <div class="modal_title">创建文件夹</div>
        </template>
        <div class="modalContainer" ref="modelContentRef">
          <div class="modalCenter">
            <a-form :model="formState" ref="formRef">
                <a-form-item label="文件夹标签" :rules="[{ required: true, message: '请输入文件夹标签!' }]">
                    <a-input v-model:value="formState.Name" />
                </a-form-item>
                <a-form-item label="文件夹唯一名称" :rules="[{ required: true, message: '请输入文件夹唯一名称!' }]">
                    <a-input v-model:value="formState.Name" />
                </a-form-item>
            </a-form>
          </div>
        </div>
        <template #footer>
          <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click.prevent="handleSubmit">确认</a-button>
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
    const emit = defineEmits(["cancel", "ok"]);

    const handleCancel = () => {
      emit("cancel", false);
    };
    

    const formState = reactive({
        Name: "",
        // apiname: ""
    })

    const data = reactive({

    });
    // const {  } = toRefs(data);
    
    onMounted(() => {

    })
    const handleSubmit = () => {
      formRef.value.validate().then(() => {
        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput:{
                        allowSaveOnDuplicate: false,
                        apiName: "ReportTypeFolder",
                        objTypeCode: 9105,
                        fields: toRaw(formState)
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.create, d).then(res=>{
          formRef.value.resetFields();
          Toast("保存成功！");
          emit("ok", false);
          emit("cancel", false);
        })
      }).catch((err) => {
        console.log("error", err);
      });
    };

  </script>
  <style lang="less">
    @import url("@/style/modal.less");
  </style>