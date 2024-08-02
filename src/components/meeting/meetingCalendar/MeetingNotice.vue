<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    会议室预约须知
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <div class="confirmIframe">
                        <p style="text-align: center;font-size:18px;font-weight:bold;margin-bottom: 10px; padding-left: 11px;">管理办法</p>
                        <p style="text-indent:28px;">第一条&nbsp;&nbsp;&nbsp;会议室由院办公室统一管理和安排，负责使用登记、设备维护、卫生清洁等相关事宜。会议室中的多媒体
                        </p>
                        <p>设备和桌椅等设施由专人负责保管、管理与调试，未经允许不得擅自使用、挪动、接拉电源，不得操作标示告知勿动的</p>
                        <p>设备。严禁安排院外人员代办以及操作会议室设备。</p>
                        <p style="text-indent:28px;">
                            第二条&nbsp;&nbsp;&nbsp;除重大、紧急会议外，使用会议室需至少提前1个工作日进行预约，至多提前30天预约会议室。登记表需</p>
                        <p>明确使用时间、参会人数、使用的设备和物品设施等相关情况，以便提前做好准备工作。使用会议室前可领取会议室钥</p>
                        <p>匙等物品。使用部门自行负责人员接待、会议记录、摄影摄像等事项。</p>
                        <p style="text-indent:28px;">第三条&nbsp;&nbsp;&nbsp;使用部门应在预约时间内使用会议室。若长时间未到，则会议室使用权由院办公室另作安排。如取消使用
                        </p>
                        <p>会议室，需提前报送至院办公室。取消预约后再使用时，需重新预约申请。</p>
                        <p style="text-indent:28px;">第四条&nbsp;&nbsp;&nbsp;会议室使用需遵循先登记先使用、先紧急后一般、先全局后部门的原则。各部门之间可本着重要、紧急优
                        </p>
                        <p>先的原则自行协商解决。如遇特殊情况、紧急会议，需先与院办公室负责人联系，可立即开启会议室先行使用，会后补</p>
                        <p>办相关登记手续。</p>
                        <p style="text-indent:28px;">第五条 使用完毕后，需及时归还钥匙、桌签壳等所借物品，关好门窗、空调、电源等。由会议室管理人员进行检</p>
                        <p>查并签字验收。</p>
                        <p style="text-indent:28px;">第六条 使用部门需爱护会议室的设备设施，保持会议室的整洁，严禁乱扔垃圾。会议室使用完成后应带走垃圾、</p>
                        <p>恢复原状。如发现设备故障或公物损坏需及时反馈至院办公室，严禁隐瞒或自行处理。使用会议室时，申请者临时负责</p>
                        <p>会议室安全，安全责任人为申请者所属部门负责人。</p>
                        <p style="text-indent:28px;">第七条 如违反上述规定，院办公室将采取通报警告或暂停使用等措施。</p>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">已读</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits
    } from "vue";
    import { message } from 'ant-design-vue';
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean
    })
    const emit = defineEmits(['cancel', 'select-val']);
    const handleCancel = () => {
        emit("cancel", false);
    }

    const data = reactive({
        currentTab: '1',
        height: document.documentElement.clientHeight - 350,
    })
    const { currentTab, height } = toRefs(data);
    const handleSubmit = () => {
        emit("select-val", '');
    }
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 350;
        });
    });
</script>
<style lang="less">
    @import url('@/style/modal.less');

    .headerTab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 0 10px;

        .search {
            width: 200px;
        }
    }

    :deep :where(.css-dev-only-do-not-override-kqecok).ant-tabs>.ant-tabs-nav,
    :where(.css-dev-only-do-not-override-kqecok).ant-tabs>div>.ant-tabs-nav {
        margin: 0 !important;
    }
    .confirmIframe p{
        padding-left: 35px;
    }
</style>