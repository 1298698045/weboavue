<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    保存新列表视图
                </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form :model="formState" :label-col="labelCol" labelAlign="left">
                        <a-form-item label="列表名称" :rules="[{ required: true, message: '请输入列表名称!' }]">
                            <a-input v-model:value="formState.name" />
                        </a-form-item>
                        <a-form-item label="列表 API 名称">
                            <a-input v-model:value="formState.apiname" />
                        </a-form-item>
                        <div class="tips">谁可以查看此列表视图？</div>
                        <a-form-item>
                            <a-radio-group v-model:value="formState.resource">
                                <a-radio value="1">只有我可以查看此列表视图</a-radio>
                                <a-radio value="2">所有用户均可以查看此列表视图</a-radio>
                                <a-radio value="3">与用户小组共享列表视图</a-radio>
                            </a-radio-group>
                        </a-form-item>

                        <div class="forceEntityShare" v-if="formState.resource==3">
                            <div class="uiInput">
                                <label for="1403:0" class="uiLabel-left form-element__label uiLabel">
                                    <span>搜索</span>
                                </label>
                                <div class="inputLookup ">
                                    <div class="contentWrapper active">
                                        <a-dropdown :trigger="['click']">
                                            <div class="inputWrapper">
                                                <a-dropdown :trigger="['click']" @click.stop>
                                                    <div class="entityMenu">
                                                        <a href="javascript:;" class="entityMenuTrigger">
                                                            <div class="entityIcon"
                                                                :style="{'background':currentEntity==2 || currentEntity == 3 ? '#34BECD' : '#779EF2'}">
                                                                <span class="uiImage">
                                                                    <img v-if="currentEntity=='1'||currentEntity=='4'"
                                                                        :src="require('@/assets/img/groups_120.png')"
                                                                        alt="">
                                                                    <img v-if="currentEntity=='2'||currentEntity=='3'"
                                                                        :src="require('@/assets/img/hierarchy_120.png')"
                                                                        alt="">
                                                                </span>
                                                            </div>
                                                            <div class="entityDownIcon">
                                                                <svg focusable="false" data-key="down"
                                                                    aria-hidden="true" viewBox="0 0 520 520"
                                                                    part="icon">
                                                                    <g>
                                                                        <path
                                                                            d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z">
                                                                        </path>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <template #overlay>
                                                        <a-menu class="fh-menu" @click="handleSelectEntity">
                                                            <a-menu-item class="fh-menu-item"
                                                                style="width: 206px;line-height: 35px;" key="1">
                                                                <div class="entityIcon">
                                                                    <span class="uiImage">
                                                                        <img :src="require('@/assets/img/groups_120.png')"
                                                                            alt="">
                                                                    </span>
                                                                </div>
                                                                <span class="entityLabel">角色</span>
                                                            </a-menu-item>
                                                            <a-menu-item class="fh-menu-item"
                                                                style="width: 206px;line-height: 35px;" key="2">
                                                                <div class="entityIcon" style="background: #34BECD;">
                                                                    <span class="uiImage">
                                                                        <img :src="require('@/assets/img/hierarchy_120.png')"
                                                                            alt="">
                                                                    </span>
                                                                </div>
                                                                <span class="entityLabel">小组</span>
                                                            </a-menu-item>
                                                            <a-menu-item class="fh-menu-item"
                                                                style="width: 206px;line-height: 35px;" key="3">
                                                                <div class="entityIcon" style="background: #34BECD;">
                                                                    <span class="uiImage">
                                                                        <img :src="require('@/assets/img/hierarchy_120.png')"
                                                                            alt="">
                                                                    </span>
                                                                </div>
                                                                <span class="entityLabel">部门</span>
                                                            </a-menu-item>
                                                            <a-menu-item class="fh-menu-item"
                                                                style="width: 206px;line-height: 35px;" key="4">
                                                                <div class="entityIcon">
                                                                    <span class="uiImage">
                                                                        <img :src="require('@/assets/img/groups_120.png')"
                                                                            alt="">
                                                                    </span>
                                                                </div>
                                                                <span class="entityLabel">用户</span>
                                                            </a-menu-item>
                                                        </a-menu>
                                                    </template>
                                                </a-dropdown>
                                                <a-dropdown :trigger="['click']">
                                                    <div class="autocompleteWrapper">
                                                        <input type="text" class="input"
                                                            :placeholder="'搜索 '+placeholder">
                                                    </div>
                                                    <div class="inputLookupIcon">
                                                        <svg focusable="false" data-key="search" aria-hidden="true"
                                                            viewBox="0 0 520 520" part="icon">
                                                            <g>
                                                                <path
                                                                    d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </a-dropdown>
                                            </div>
                                            <template #overlay>
                                                <a-menu class="fh-menu">
                                                    <a-menu-item class="fh-menu-item"
                                                        style="width:100%;line-height: 35px;"
                                                        v-for="(item, index) in listData" :key="index"
                                                        @click="handleSelectItem(item)">
                                                        <div class="entityIcon"
                                                            :style="{'background':currentEntity==2 || currentEntity == 3 ? '#34BECD' : '#779EF2'}">
                                                            <span class="uiImage">
                                                                <img v-if="currentEntity=='1'||currentEntity=='4'"
                                                                    :src="require('@/assets/img/groups_120.png')"
                                                                    alt="">
                                                                <img v-if="currentEntity=='2'||currentEntity=='3'"
                                                                    :src="require('@/assets/img/hierarchy_120.png')"
                                                                    alt="">
                                                            </span>
                                                        </div>
                                                        <span class="entityLabel">{{item.Name}}</span>
                                                    </a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                        <div class="pillContainerWrapper" v-if="selectList.length">
                                            <div class="uiPillContainer">
                                                <ul class="orderedList">
                                                    <li class="pillContainerListItem"
                                                        v-for="(item, index) in selectList" :key="index">
                                                        <a href="javascript:void(0);" class="pill">
                                                            <span
                                                                :style="{'background':item.entity==2 || item.entity == 3 ? '#34BECD' : '#779EF2'}"
                                                                class="pillIcon">
                                                                <span class="uiImage">
                                                                    <img v-if="item.entity=='1'||item.entity=='4'"
                                                                        :src="require('@/assets/img/groups_120.png')"
                                                                        alt="">
                                                                    <img v-if="item.entity=='2'||item.entity=='3'"
                                                                        :src="require('@/assets/img/hierarchy_120.png')"
                                                                        alt="">
                                                                </span>
                                                            </span>
                                                            <span class="pillText">{{item.Name}}</span>
                                                            <a href="javascript:void(0);" class="deleteAction"
                                                                @click.stop="handleDelUser(item, index)">
                                                                <span class="deleteIcon"></span>
                                                            </a>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
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
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, computed
    } from "vue";
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const modelContentRef = ref(null);
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        sObjectName: String,
        filterExpression: Array,
        filterId: String,
        filterLabel: String
    })
    const emit = defineEmits(['cancel', 'load']);
    const handleCancel = () => {
        emit("cancel", false);
    }
    const handleSubmit = () => {
        let visibility = 'GLOBAL';
        if (formState.resource == '1') {
            visibility = 'PRIVATE';
        } else if (formState.resource == '2') {
            visibility = 'GLOBAL';
        } else if (formState.resource == '3') {
            visibility = 'SHARED';
        }
        let shareIds = [];
        if (data.selectList && data.selectList.length) {
            data.selectList.map(item => {
                shareIds.push({
                    objectTypeCode: item.objectTypeCode,
                    entityName: item.entityName,
                    id: item.id
                })
            })
        }
        let url = Interface.listView.createListView;
        let d = {
            actions: [{
                id: "3767;a",
                descriptor: "serviceComponent://ui.force.components.controllers.lists.listViewManager.ListViewManagerController/ACTION$createListView",
                callingDescriptor: "UNKNOWN",
                params: {
                    entityKeyPrefixOrApiName: props.sObjectName,
                    developerName: formState.apiname || '',
                    label: formState.name || '',
                    visibility: visibility,
                    shareIds: shareIds,
                    listViewFieldCriteria: props.filterExpression,
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(url, obj).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                message.success("另存为视图成功");
                emit("load", false);
            }
            else {
                if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                    message.error(res.actions[0].errorMessage);
                }
                else {
                    message.error("另存为视图失败");
                }
            }
            setTimeout(function () {
                emit("cancel", false);
            }, 1000)
        })
    }
    const data = reactive({
        listData: [],
        menus: [
            {
                key: 1,
                name: "角色"
            },
            {
                key: 2,
                name: "小组"
            },
            {
                key: 3,
                name: "部门"
            },
            {
                key: 4,
                name: "用户"
            }
        ],
        currentMenu: '角色',
        top: "",
        currentEntity: '1',
        selectList: []
    })
    const { listData, menus, currentMenu, top, currentEntity, selectList } = toRefs(data);
    const formState = reactive({
        name: "",
        apiname: "",
        resource: "2",
        role: []
    });

    if (props.filterLabel) {
        formState.name = props.filterLabel + "的副本";
    }

    const handleMenu = (e) => {
        console.log("e", e);
        data.currentMenu = data.menus.find(item => item.key == e.key).name;
    }
    const handleSearch = (val) => {
        console.log('val', val);
        getPeople(val)
    }
    const handleChange = (e) => {
    }
    const getPeople = (val = "") => {
        proxy.$get(Interface.lookup, {
            Lktp: 30020,
            lksrch: data.currentEntity
        }).then(res => {
            data.listData = res.listData;
        })
    };
    getPeople();
    onMounted(() => {
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: data.top
    }));

    const handleSelectEntity = (e) => {
        console.log("e", e);
        data.currentEntity = e.key;
    }
    const placeholder = computed(() => {
        return data.currentEntity == '1' ? '角色' : data.currentEntity == '2' ?
            '小组' : data.currentEntity == '3' ? '部门' : data.currentEntity == '4' ? '用户' : '';
    });
    const handleSelectItem = (item) => {
        console.log(item);
        var entity = JSON.parse(JSON.stringify(data.currentEntity));
        var entityName = '';
        var objectTypeCode = '';
        if (entity == '1') {
            entityName = 'Role';
            objectTypeCode = '1036';
        } else if (entity == '2') {
            entityName = 'Group';
            objectTypeCode = '9';
        } else if (entity == '3') {
            entityName = 'BusinessUnit';
            objectTypeCode = '10';
        } else if (entity == '4') {
            entityName = '8';
            objectTypeCode = 'SystemUser';
        }
        data.selectList.push({
            entity: entity,
            ID: item.ID,
            Name: item.Name,
            objectTypeCode: objectTypeCode,
            entityName: entityName,
            id: item.ID,
        })
        console.log(data.selectList);
    };
    const handleDelUser = (item, index) => {
        data.selectList.splice(index, 1);
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .ant-radio-wrapper {
        display: flex;
        align-items: center;
        margin-top: 10px;
    }

    .modalContainer {
        .modalCenter {
            height: 319px !important;
        }
    }

    .menuRow {
        display: flex;
        align-items: center;

        .ant-btn {
            border-radius: 4px 0 0 4px;
        }

        :deep .ant-select-selector {
            border-radius: 0 4px 4px 0 !important;
            margin-left: -1px !important;
        }
    }

    .forceEntityShare {
        margin-left: 24px;

        .uiInput {
            .form-element__label {
                color: #444444;
                line-height: 1.5;
                margin-bottom: 4px;
            }

            .inputLookup {
                .contentWrapper {
                    padding: 0;
                    border-radius: 4px;
                    border: 1px solid #c9c9c9;

                    &.active {
                        border: 1px solid #1b96ff;
                        border-radius: 4px;
                        box-shadow: 0 0 3px #0176d3;
                    }

                    .inputWrapper {
                        padding-right: 8px;
                        display: flex;
                        align-items: center;

                        .entityMenu {
                            padding-left: 4px;
                            position: relative;

                            .entityMenuTrigger {
                                display: flex;
                                justify-content: center;
                                margin: 2px 0;
                                text-align: center;

                                .entityIcon {
                                    background: #779EF2;
                                    width: 24px;
                                    height: 24px;
                                    line-height: 1;
                                    fill: #ffffff;
                                    border-radius: 2px;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                        display: inherit;
                                    }
                                }

                                .entityDownIcon {
                                    padding-top: 2px;
                                    margin: 4px 0;
                                    display: inline-block;
                                    border-radius: 4px;
                                    line-height: 1;
                                    background: transparent;
                                    width: 14px;
                                    height: 14px;
                                    fill: currentColor;
                                    margin-left: 4px;

                                    svg {
                                        width: 14px;
                                        height: 14px;
                                        line-height: 1;
                                        fill: #747474;
                                    }
                                }
                            }
                        }

                        .autocompleteWrapper {
                            overflow: hidden;
                            flex-grow: 1;

                            .input {
                                color: #181818;
                                border-radius: 4px;
                                width: 100%;
                                display: inline-block;
                                padding: 0 16px 0 12px;
                                line-height: 30px;
                                min-height: 36px;
                            }

                            .input,
                            .input:focus {
                                border: none;
                                box-shadow: none;
                                background: transparent;
                                outline: 0;
                            }
                        }

                        .inputLookupIcon {
                            svg {
                                fill: #aeaeae;
                                overflow: hidden;
                                width: 14px;
                                height: 14px;
                                line-height: 1;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }

            .pillContainerWrapper {
                border-top: 1px solid #e5e5e5;

                .uiPillContainer {
                    margin: 0;
                    line-height: 26px;
                    border-radius: 5px;
                    position: relative;

                    .orderedList {
                        clear: both;
                        overflow: hidden;

                        .pillContainerListItem {
                            margin: 4px;
                            float: left;
                            list-style-type: none;
                            word-break: break-all;

                            .pill {
                                border: 1px solid #747474;
                                border-radius: 5px;
                                padding: 4px;
                                display: block;
                                white-space: nowrap;
                                text-decoration: none;
                                cursor: default;

                                &:hover {
                                    background: #f3f3f3;
                                }
                            }

                            .pillIcon {
                                height: 20px;
                                width: 20px;
                                line-height: 1;
                                border-radius: 2px;
                                margin-right: 8px;
                                display: inline-block;
                                vertical-align: middle;

                                img {
                                    max-width: 100%;
                                    height: auto;
                                    vertical-align: middle;
                                    display: inherit;
                                }
                            }

                            .pillText {
                                max-width: 215px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                display: inline-block;
                                vertical-align: middle;
                                color: #181818;
                            }

                            .deleteAction {
                                margin-left: 8px;

                                .deleteIcon {
                                    color: #747474;
                                    cursor: pointer;
                                }

                                .deleteIcon::after {
                                    content: "\2715";
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .fh-menu {
        padding: 10px 0;
        border: 1px solid #333;
        border-radius: 4px;
        max-height: 300px;
        overflow: auto;

        .fh-menu-item {
            width: 206px;
            line-height: 35px;

            .entityIcon {
                background: #779EF2;
                width: 24px;
                height: 24px;
                line-height: 1;
                fill: #ffffff;
                border-radius: 2px;
                margin-right: 12px;
                display: inline-block;

                img {
                    max-width: 100%;
                    height: 100%;
                    vertical-align: middle;
                    display: inherit;
                }
            }
        }
    }

    .message {
        background-color: #ffc;
        border-style: solid;
        border-width: 1px;
        color: #000;
        padding: 6px 8px 6px 6px;
        border-radius: 4px;
        margin: 4px 20px;
    }
</style>