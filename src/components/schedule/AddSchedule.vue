<template>
    <div>
        <a-modal v-model:open="props.isShow" width="1122px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{ title }}
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <div class="tabPanel">
                        <div class="barContainer">
                            <div class="groupContainer">
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <SwapOutlined />
                                        </span>
                                        <span class="text">答复选项</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">请求答复</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">允许转发</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon"></span>
                                                    <span class="menuText">隐藏与会者列表</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <div class="ribbon">
                                    <span class="ribbon-bottom-bar-divider"></span>
                                </div>
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <SwapOutlined />
                                        </span>
                                        <span class="text">忙碌</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">空闲</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">在其他地方工作</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">暂定</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">忙碌</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">外出</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <SwapOutlined />
                                        </span>
                                        <span class="text">15分钟前</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-for="(item,index) in menuTimes" :key="index">
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">{{item}}</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <div class="ribbon">
                                    <span class="ribbon-bottom-bar-divider"></span>
                                </div>
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <SwapOutlined />
                                        </span>
                                        <span class="text">分类</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-for="(item,index) in categoryList" :key="index">
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">{{item.label}}</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item
                                                style="border-top: 1px solid #e2e3e5;border-radius: 0 4px 0px 4px;">
                                                <div class="menu-row">
                                                    <span class="icon">
                                                    </span>
                                                    <span class="menuText">新建类别</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item
                                                style="border-top: 1px solid #e2e3e5;border-radius: 0 4px 0px 4px;">
                                                <div class="menu-row">
                                                    <span class="icon">
                                                    </span>
                                                    <span class="menuText">管理类别</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <div class="groupBtn">
                                    <span class="icon">
                                        <SwapOutlined />
                                    </span>
                                    <span class="text">私人</span>
                                </div>
                                <div class="ribbon">
                                    <span class="ribbon-bottom-bar-divider"></span>
                                </div>
                                <a-dropdown>
                                    <div class="groupBtn" style="padding: 0 4px;">
                                        <span class="text">
                                            <EllipsisOutlined></EllipsisOutlined>
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">我的模板</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="formContent">
                        <div class="leftForm">
                            <div class="formWrap">
                                <a-form :model="formState" ref="formRef">
                                    <a-form-item name="Subject">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <a-button :icon="h(SearchOutlined)" />
                                            </div>
                                            <div class="rVal">
                                                <input type="text" v-model="formState.Subject" class="title"
                                                    placeholder="添加标题">
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <a-form-item name="OwningUser">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <UserOutlined />
                                            </div>
                                            <div class="rVal">
                                                <a-select mode="multiple" allowClear
                                                    v-model:value="formState.OwningUser.Id"
                                                    :default-active-first-option="false" :filter-option="false"
                                                    showSearch @search=" (e) => { searchlookup(e, '30020'); } "
                                                    @dropdownVisibleChange=" (e) => { searchlookup('', '30020'); } "
                                                    :placeholder="'请选择被分配人'">
                                                    <template #suffixIcon></template>
                                                    <a-select-option v-for="(option, optionIdx) in OwningUserList"
                                                        :key="optionIdx" :value="option.ID">{{ option.Name
                                                        }}</a-select-option>
                                                </a-select>
                                                <div class="selectIcon">
                                                    <SearchOutlined class="ant-select-suffix"
                                                        @click="handleOpenLook(attribute)" />
                                                </div>
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <a-form-item>
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <UserOutlined />
                                            </div>
                                            <div class="rVal">
                                                <input type="text" placeholder="邀请可选与会者">
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <div class="formRow" style="align-items: self-start;">
                                        <div class="lIcon">
                                            <UserOutlined />
                                        </div>
                                        <div class="timeBox">
                                            <div class="rowTime">
                                                <div class="date">
                                                    <a-date-picker v-model:value="formState.StartDateTime"
                                                        :valueFormat="dateFormat" />
                                                </div>
                                                <div class="time">
                                                    <a-time-picker v-model:value="formState.StartDateTime_time"
                                                        :valueFormat="hourFormat" format="HH:mm" />
                                                </div>
                                                <div class="switch">
                                                    <a-switch v-model:checked="formState.IsAllDayEvent" />
                                                    <span class="text">全天</span>
                                                </div>
                                            </div>
                                            <div class="rowTime">
                                                <div class="date">
                                                    <a-date-picker v-model:value="formState.EndDateTime"
                                                        :valueFormat="dateFormat" />
                                                </div>
                                                <div class="time">
                                                    <a-time-picker v-model:value="formState.EndDateTime_time"
                                                        :valueFormat="hourFormat" format="HH:mm" />
                                                </div>
                                                <div class="groupContainer">
                                                    <a-dropdown>
                                                        <div class="groupBtn show">
                                                            <span class="icon">
                                                                <SwapOutlined />
                                                            </span>
                                                            <span class="text">不重复</span>
                                                            <span class="arrowIcon">
                                                                <DownOutlined />
                                                            </span>
                                                        </div>
                                                        <template #overlay>
                                                            <a-menu>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon">
                                                                            <CheckOutlined />
                                                                        </span>
                                                                        <span class="menuText">不重复</span>
                                                                    </div>
                                                                </a-menu-item>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon">
                                                                            <CheckOutlined />
                                                                        </span>
                                                                        <span class="menuText">每天</span>
                                                                    </div>
                                                                </a-menu-item>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon"></span>
                                                                        <span class="menuText">每周</span>
                                                                    </div>
                                                                </a-menu-item>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon"></span>
                                                                        <span class="menuText">每月</span>
                                                                    </div>
                                                                </a-menu-item>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon"></span>
                                                                        <span class="menuText">每年</span>
                                                                    </div>
                                                                </a-menu-item>
                                                            </a-menu>
                                                        </template>
                                                    </a-dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a-form-item name="Location">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <UserOutlined />
                                            </div>
                                            <div class="rVal">
                                                <input type="text" v-model="formState.Location" placeholder="搜索位置">
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <a-form-item name="Description">
                                        <div class="formRow" style="align-items: self-start;">
                                            <div class="lIcon">
                                                <UserOutlined />
                                            </div>
                                            <div class="rVal">
                                                <TEditor :placeholder="'添加描述或附件文档'" :height=500
                                                    @input="getEditorContent" />
                                            </div>
                                        </div>
                                    </a-form-item>
                                </a-form>
                            </div>
                        </div>
                        <div class="rightCalendar">

                        </div>
                    </div>
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
        toRaw, h
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
        SwapOutlined,
        CheckOutlined,
        EllipsisOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import TEditor from "@/components/TEditor.vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        folderName: String,
        folderPicker: String
    });
    const dateFormat = 'YYYY-MM-DD';
    const hourFormat = 'HH:mm'
    const formRef = ref();
    const emit = defineEmits(["cancel"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        title: "新建日程",
        height: document.documentElement.clientHeight - 300,
        menuTimes: [
            '不要提醒我', '在事件发生时', '5 分钟 钱', '30分钟 前', '1小时 前',
            '2小时 前', '12小时 前', '1天 前', '1周 前', '添加电子邮件提醒'
        ],
        categoryList: [
            {
                value: "#ff8c00",
                label: "橙色类别"
            },
            {
                value: "#e74856",
                label: "红色类别"
            },
            {
                value: "#fff100",
                label: "黄色类别"
            },
            {
                value: "#00bcf2",
                label: "蓝色类别"
            },
            {
                value: "#47d041",
                label: "绿色类别"
            },
            {
                value: "#8764b8",
                label: "紫色类别"
            }
        ],
        OwningUserList: []
    });
    const {
        title,
        height,
        menuTimes, categoryList, OwningUserList
    } = toRefs(data);
    const formState = reactive({
        RegardingObjectTypeCode: 20290,
        RegardingObjectId: {},
        Subject: '',
        StartDateTime: '',
        StartDateTime_time: '',
        ScheduledStart: '',
        ScheduledEnd: '',
        EndDateTime: '',
        EndDateTime_time: '',
        OwningUser: {},
        IsAllDayEvent: false,
        Location: '',
        Description: '',
        CalendarType: '',
        RegardingObjectIdName: '',
        BgColor: '',
        IsPrivate: false,
        Reminder: false,
        startTime: "",
        endTime: "",
    });
    const getEditorContent = (e) => {
        formState.Description = e;
    }
    watch(()=>formState.StartDateTime,(newVal,oldVal)=>{
        formState.startTime = newVal + '' + formState.StartDateTime_time;
    }, {deep: true})
    watch(()=>formState.StartDateTime_time,(newVal,oldVal)=>{
        formState.startTime = formState.StartDateTime + '' + newVal;
    }, {deep: true})
    watch(()=>formState.EndDateTime,(newVal,oldVal)=>{
        formState.endTime = newVal + '' + formState.EndDateTime_time;
    }, {deep: true})
    watch(()=>formState.EndDateTime_time,(newVal,oldVal)=>{
        formState.endTime = formState.EndDateTime + '' + newVal;
    }, {deep: true})
    const searchlookup = (search, Lktp) => {
        proxy
            .$get(Interface.uilook, {
                Lktp: Lktp,
                Lksrch: search,
            })
            .then((res) => {
                let listData = res.listData;
                data.OwningUserList = listData;
            });
    };
    const getPickerList = () => {
        proxy.$get(Interface.schedule.pickList, {
            objectTypeCode: 4200
        }).then(res => {
            var rows = res.actions[0].returnValue.picklistFieldValues.CalendarType;
            data.CalendarTypeList = rows.values;
        })
    }
    getPickerList();
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
                var data = {
                    Location: formState.Location,
                    Subject: formState.Subject,
                    IsAllDayEvent: formState.IsAllDayEvent,
                    Description: formState.Description,
                    ScheduledStart: formState.startTime,
                    ScheduledEnd: formState.endTime,
                    CalendarType: formState.CalendarType,
                    Phone: formState.Phone,
                    RegardingObjectTypeCode: formState.RegardingObjectTypeCode ? formState.RegardingObjectTypeCode : '',
                    RegardingObjectIdName: formState.RegardingObjectIdName,
                    RegardingObjectId: formState.RegardingObjectId.Id,
                    ReminderTime: formState.ReminderTime,
                    BgColor: formState.BgColor,
                    IsPrivate: formState.IsPrivate,
                    Reminder: formState.Reminder,
                }
                proxy.$get(Interface.saveRecord, data).then((res) => {
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
<style lang="less" scoped>
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
        top: 14px;
    }

    .timeWrap {
        display: flex;
        align-items: center;

        .timeItem:last-child {
            margin-left: 10px;
        }
    }

    .menuRow {
        display: flex;
        align-items: center;

        .ant-btn {
            border-radius: 4px 0 0 4px;
        }

        .ant-select-show-search:where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-customize-input) .ant-select-selector {
            border-radius: 0 4px 4px 0 !important;
            margin-left: -1px !important;
        }
    }

    .selectFlex {
        width: 100%;
        position: relative;

        .suffixIcon {
            position: absolute;
            right: 5px;
        }
    }

    .tabPanel {
        padding: 0 4px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);

        .barContainer {
            display: flex;

        }
    }

    .groupContainer {
        display: flex;
        align-items: center;

        .groupBtn {
            height: 32px;
            line-height: 32px;
            text-align: center;
            margin: 4px 0;
            border: 1px solid transparent;
            padding-left: 9px;
            border-radius: 4px;

            .icon {
                font-size: 16px;
            }

            .arrowIcon {
                height: 12px;
                line-height: 12px;
                width: 12px;
                fill: #242424;
                margin-left: 4px;
                margin-right: 2px;
                font-size: 12px;
            }

            &:hover {
                background: #fafafa;
                color: #242424;
                border: 1px solid #e5e5e5;
                cursor: pointer;
            }

            &.show {
                background: #fafafa;
                color: #242424;
                border: 1px solid #e5e5e5;
                cursor: pointer;
            }

            .text {
                line-height: 16.41px;
                text-align: left;
                margin-left: 4px;
                margin-right: 2px;
                font-weight: 400;
                font-size: 14px;
            }
        }

        .ribbon {
            display: inline-flex;
            height: 32px;
            align-items: center;
            padding: 4px;

            .ribbon-bottom-bar-divider {
                width: 1px;
                height: 100%;
                background-color: #e0e0e0;
                border-radius: 0px;
            }
        }
    }

    .menu-row {
        display: flex;

        .icon {
            min-width: 30px;
        }
    }

    .formContent {
        height: calc(~"100% - 60px");
        margin-top: 12px;
        display: flex;

        .leftForm {
            flex: 1;
            border: 1px solid #f0f0f0;
            background: #fff;
            border-radius: 4px;
            overflow: auto;
            margin-right: 10px;

            .formWrap {
                padding: 0 16px 19px 8px;

                input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: 0;
                }

                input.title {
                    font-size: 21px;
                    font-weight: 600;
                    color: #424242;
                }

                input::placeholder {}

                .formRow {
                    display: flex;
                    min-height: 48px;
                    align-items: center;

                    .lIcon {
                        width: 32px;
                        height: 32px;
                        margin-right: 9px;
                        text-align: center;
                    }

                    .rVal {
                        flex: 1;
                        height: 32px;
                        border-bottom: 1px solid #e0e0e0;
                    }

                    .timeBox {
                        .rowTime {
                            display: flex;
                            align-items: center;
                            margin-bottom: 10px;

                            .date {
                                width: 142px;
                            }

                            .time {
                                width: 98px;
                                margin-left: 5px;
                                margin-right: 10px;
                            }

                            .switch {
                                display: flex;
                                align-items: center;

                                .text {
                                    padding-left: 5px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .rightCalendar {
            width: 371px;
            min-height: 250px;
            height: 100%;
            border: 1px solid #f0f0f0;
            border-radius: 4px;
        }
    }
    :deep .ant-select-show-search:where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-customize-input) .ant-select-selector{
        border: none !important;
        outline: 0 !important;
    }
</style>