<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel" :style="setTop"
            @ok="handleSubmit">
            <template #title>
                <div>移动到邮件标签</div>
            </template>
            <div class="modalContainer" ref="ChangeLabelModelContentRef">
                <div class="modalCenter ChangeLabelModelContent">
                    <a-form :model="formState" ref="formRef">
                        <div class="section">
                            <!-- <div class="sectionTitle">基本信息</div> -->
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="标签名称" name="Labeld" :rules="[{ required: true, message: '请选择标签', }]">
                                        <a-select v-model:value="formState.Labeld">
                                            <a-select-option v-for="(item,index) in LabelList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                                        </a-select>
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
        computed
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
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        id: String,
        objectTypeCode: [String, Number]
    });
    const formRef = ref();
    const ChangeLabelModelContentRef= ref(null);
    const emit = defineEmits(["cancel"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        height: "",
        top:"",
        LabelList:[]
    });
    const { height,top,LabelList } = toRefs(data);
    const formState = reactive({
        Labeld: "0"
    });
    const handleSubmit = () => {
        formRef.value
            .validate()
            .then(() => {
                //console.log("values", formState, toRaw(formState));
                let currentUserId='';
                let userInfo=window.localStorage.getItem('userInfo');
                if(userInfo){
                    userInfo=JSON.parse(userInfo);
                    currentUserId=userInfo.userId;
                }
                let url=Interface.create;
                let d = {
                    actions:[{
                        id: "2919;a",
                        descriptor: "",
                        callingDescriptor: "UNKNOWN",
                        params: {
                        recordInput: {
                            allowSaveOnDuplicate: false,
                            apiName: 'MailInbox',
                            objTypeCode: '20021',
                            fields: {
                                Labeld:formState.Labeld,
                                ModifiedBy: currentUserId
                            }
                        }              
                        }
                    }]
                };
                if(props.id){
                    url=Interface.edit;
                    d.actions[0].params.recordId=props.id;
                }
                let obj = {
                    message: JSON.stringify(d)
                }
                proxy.$post(url,obj).then(res=>{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                        message.success("移动成功！");
                        formRef.value.resetFields();
                        emit("cancel", false);
                    }
                    else{
                        if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                            message.success(res.actions[0].errorMessage);
                        }
                        else{
                            message.success("移动失败！");
                        }
                    }
                });
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
    const getDetail = () => {
        let d = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordId: props.id,
                  apiName:'MailInbox',
                  objTypeCode: 20021
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.detail,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
              let fields=res.actions[0].returnValue.fields;
              formState.Labeld=fields.Labeld.value||'';
            }
        })
    }
    // 获取我的标签
    const getMyFolder = () => {
        data.LabelList=[];
        let url=Interface.list2;
        let obj={
                filterId:'',
                objectTypeCode:'20609',
                entityName:'MailLabel',
                filterQuery:'\nCreatedBy\teq-userid',
                search:'',
                page: 1,
                rows: 100,
                sort:'CreatedOn',
                order:'ASC',
                displayColumns:'Name'
            }
            proxy.$post(url, obj).then(res => {
            if(res&&res.nodes.length){
                let nodes=res.nodes;
                if(nodes&&nodes.length){
                    nodes.forEach(function (item,index) {
                        data.LabelList.push({
                            label:item.Name?item.Name.textValue:'',
                            value:item.id,
                        })
                    })
                }
            }
            getDetail();
        })
    }
    data.height = document.documentElement.clientHeight - 400;
    const setTop = computed(() => ({
        top: `calc(50% - ${data.top})`
    }));
    onMounted(() => {
        getMyFolder();
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 400;
        });
        let h = ChangeLabelModelContentRef.value.clientHeight;
        data.top = (h + 180) / 2 + 'px';
    });
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
    .ChangeLabelModelContent{
        height: 150px !important;
    }
</style>