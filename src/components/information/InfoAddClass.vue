<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>新建分类</div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter">
                    <a-form :model="formState" ref="formRef">
                        <div class="section">
                            <!-- <div class="sectionTitle">基本信息</div> -->
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="分类" name="CategoryId" :rules="[{ required: true, message: '请选择分类', }]">
                                        <a-select @dropdownVisibleChange="searchClassList" v-model:value="formState.CategoryId">
                                            <a-select-option v-for="(item,index) in classList" :value="item.id">{{item.name}}</a-select-option>
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
    const emit = defineEmits(["cancel"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        height: "",
        classList: []
    });
    const { height, classList } = toRefs(data);
    const formState = reactive({
        CategoryId: ""
    });

    data.height = document.documentElement.clientHeight - 300;
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
                        objTypeCode: props.objectTypeCode,
                        fields: {
                            CategoryId:{
                                Id: formState.CategoryId
                            },
                            ContentId: {
                                Id: props.id
                            }
                        },
                        id: props.id,
                    },
                };
                var messages = JSON.stringify(obj);
                proxy.$get(Interface.saveRecord, { message: messages }).then((res) => {
                    message.success("保存成功！");
                    emit("cancel", false);
                    formRef.value.resetFields();
                });
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
    const searchClassList = (e) => {
        proxy.$get(Interface.information.tree,{
            objectTypeCode: props.objectTypeCode
        }).then(res=>{
            data.classList = res;
        })
    }
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
</style>