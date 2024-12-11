<template>
    <div>
        <a-modal v-model:open="props.isShow" width="600px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    委派
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
                        <!-- <div class="form-tip">请输入流程事务标题，建立事务</div> -->
                        <a-form-item label="当前节点名称：" name="ProcessName">
                            <div class="ProcessName">{{ formState.ProcessName || '' }}</div>
                        </a-form-item>
                        <a-form-item name="executorIdentityId" label="代理人：" :rules="[{ required: true, message: '请选择代理人' }]">
                            <a-select
                                v-model:value="formState.executorIdentityId"
                                :default-active-first-option="false" :filter-option="false"
                                showSearch @search=" (e) => { searchlookup(e, '8','OwningUser'); } "
                                @dropdownVisibleChange=" (e) => { searchlookup('', '8','OwningUser'); } "
                                :placeholder="'请选择代理人'">
                                <template #suffixIcon></template>
                                <a-select-option v-for="(option, optionIdx) in OwningUser"
                                    :key="optionIdx" :value="option.ID">
                                    <!-- <a-avatar :size="37">
                                        <template #icon><UserOutlined /></template>
                                    </a-avatar> -->
                                    {{ option.Name }}
                                </a-select-option>
                            </a-select>
                            <div class="selectIcon">
                                <SearchOutlined class="ant-select-suffix"
                                    @click="handleOpenLook('8','OwningUser')" />
                            </div>
                        </a-form-item>
                        <a-form-item label="通知代理人：" name="Description">
                            <a-textarea :rows="3" v-model:value="formState.Description" />
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
                    <a-button @click="handleCancel">取消</a-button>
                </div>
            </template>
        </a-modal>
        <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser"></radio-user>
    </div>
</template>
<script setup>
    import {
        ref,
        reactive,
        watch,
        h,
        defineComponent,
        onMounted,
        defineProps,
        toRefs,
        getCurrentInstance,
        defineExpose,
        defineEmits,
        computed,
    } from "vue";
    import { PieChartOutlined,SearchOutlined,UserOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import { message } from "ant-design-vue";
    import { unique } from "@/utils/common.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        paramsData: Object,
        isShow: Boolean,
        ruleLogId: String
    });
    const isModal = ref(true);
    const labelCol = ref({ style: { width: '100px' } });
    const emit = defineEmits(['update-status']);
    const formRef = ref(null);
    const data = reactive({
        top:0,
        OwningUser: [],
        isRadioUser:false,
    });
    const { top, OwningUser, isRadioUser } = toRefs(data);
    const formState = reactive({
        ProcessName: "",
        Title:"",
        Priority:"0",
        Description:"",
        executorIdentityId: ""
    });

    const executorIdentityName = computed(()=>{
        let row = data.OwningUser.find(item=>item.ID == formState.executorIdentityId);
        return row.Name || '';
    });

    const searchlookup = (search, Lktp, fieldApiName) => {
        let obj = {
        actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName:fieldApiName,
                    fieldApiName: fieldApiName,
                    pageParam: 1,
                    pageSize: 25,
                    q: search,
                    searchType: "Recent",
                    targetApiName: 'SystemUser',
                    body: {
                        sourceRecord: {
                        apiName: fieldApiName,
                            fields: {
                                Id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        }
        if(Lktp=='8'){
            obj.actions[0].params.targetApiName='SystemUser';
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup,d).then(res=>{
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            data[fieldApiName] = data[fieldApiName].concat(arr);
            data[fieldApiName] = unique(data[fieldApiName],'ID');
        })
    };
    const handleOpenLook= (Lktp, fieldApiName) => {
        if(Lktp=='8'){
            data.isRadioUser = true;
        }
    }
    const closeUser = (e) => {
        data.isRadioUser = false;
    };
    const getUserData = (params) => {
      data.isRadioUser = false;
      if(params.id){
        let index = data.OwningUser.findIndex(item=>item.ID==params.id);
        if(index==-1 && params.id){
            data.OwningUser.push({
                ID: params.id,
                Name: params.name
            });
            formState.executorIdentityId = params.id;
        }
        if(index>=0){
            message.error("不能重复添加！");
        }
      }
    };
    const modelContentRef = ref(null);
    onMounted(()=>{
        formState.ProcessName = props.paramsData.InstanceIdName;
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 180) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: `calc(50% - ${data.top})`
    }));


    const handleSubmit = () => {
        formRef.value.validate().then(()=>{
            let obj = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: props.ruleLogId,
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: 'WFRuleLog',
                            objTypeCode: 123,
                            fields: {
                                ExecutorIdentityId: formState.executorIdentityId,
                                ExecutorIdentityName: executorIdentityName.value,
                                Description: formState.Description
                            }
                        }
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            };
            proxy.$post(Interface.edit, d).then((res) => {
                if(res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS'){
                    message.success("委派成功！");
                    handleCancel();
                }else {
                    message.error("委派失败！");
                }
            });
        }).catch(()=>{

        });
    };

    const handleCancel = () => {
        emit("update-status",false);
    };

    defineExpose({ isModal });
</script>
<style lang="less">
    .ant-modal-content{
    padding: 0 !important;
    .ant-modal-header{
        border-bottom: 2px solid #e5e6eb;
        padding: 12px;
        font-size: 16px;
        color: #000;
        text-align: center;
    }
    .ant-modal-footer{
        border-top: 2px solid #e5e6eb;
        padding: 16px 20px;
        box-sizing: border-box;
    }
    .modalContainer{
        .modalCenter{
            padding: 10px 15px;
            box-sizing: border-box;
            height: 300px;
            overflow-y: auto;
            .form-tip {
                font-size: 12px;
                margin-bottom: 12px;
                color: #606266;
            }
            .ProcessName {
                color: var(--textColor);
            }
            .form-tip1 {
                font-size: 12px;
                color: red;
                line-height: 8px;
                margin-top: 10px;
                margin-bottom: 7px;
            }
            .processTitle .ant-form-item-required{
                color: red !important;
            }
        }
        .selectIcon {
            position: absolute;
            right: 10px;
            top: 6px;
        }
        .ant-select-selection-item-content .ant-avatar{
            display: none !important;
        }
    }
}
</style>