<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    共享设置
                </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" style="height: auto;">
                    <a-form :model="formState" :label-col="labelCol">
                        <div class="tips">谁可以查看此列表视图？</div>
                        <a-form-item>
                            <a-radio-group v-model:value="formState.resource">
                                <a-radio value="1">只有我可以查看此列表视图</a-radio>
                                <a-radio value="2">所有用户均可以查看此列表视图</a-radio>
                                <a-radio value="3">与用户小组共享列表视图</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <!-- <a-form-item name="role" v-if="formState.resource==3">
                            <div class="menuRow">
                                <a-dropdown>
                                    <template #overlay>
                                      <a-menu @click="handleMenu">
                                        <a-menu-item v-for="(item,index) in menus" :key="item.key">
                                          <UserOutlined />
                                          {{item.name}}
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                    <a-button>
                                      <UserOutlined />
                                      <DownOutlined />
                                    </a-button>
                                </a-dropdown>
                                <a-select
                                    class="aselect"
                                    v-model:value="formState.role"
                                    show-search
                                    mode="multiple"
                                    :placeholder="'搜索'+currentMenu"
                                    :default-active-first-option="false"
                                    :filter-option="false"
                                    :not-found-content="null"
                                    @search="handleSearch"
                                    @change="handleChange"
                                    @dropdownVisibleChange="getPeople"
                                >
                                    <template #suffixIcon><SearchOutlined class="ant-select-suffix" /></template>
                                    <a-select-option :value="item.ID" v-for="(item,index) in listData" :key="index">{{item.Name}}</a-select-option>
                                </a-select>
                            </div>
                        </a-form-item> -->
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
                                                                    src="@/assets/img/groups_120.png" alt="">
                                                                <img v-if="currentEntity=='2'||currentEntity=='3'"
                                                                    src="@/assets/img/hierarchy_120.png" alt="">
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
                                                                        src="@/assets/img/groups_120.png" alt="">
                                                                    <img v-if="item.entity=='2'||item.entity=='3'"
                                                                        src="@/assets/img/hierarchy_120.png" alt="">
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

                            <div class="advancedEditSection">
                                <div class="section-title">
                                    与 {{currentShares.length}} 个用户小组共享。
                                </div>
                                <div class="search">
                                    <a-input placeholder="筛选用户组"></a-input>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="259">名称</th>
                                            <th width="259">类型</th>
                                            <th width="50"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in currentShares" :key="index">
                                            <td>{{item.name}}</td>
                                            <td>{{item.typeCode}}</td>
                                            <td>
                                                <span class="close-icon" @click="handleDeleteShare(item)">
                                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520"
                                                        part="icon" lwc-3bq099ugqsh="" data-key="close" class="iconSvg">
                                                        <g lwc-3bq099ugqsh="">
                                                            <path
                                                                d="M310 254l130-131c6-6 6-15 0-21l-20-21c-6-6-15-6-21 0L268 212a10 10 0 01-14 0L123 80c-6-6-15-6-21 0l-21 21c-6 6-6 15 0 21l131 131c4 4 4 10 0 14L80 399c-6 6-6 15 0 21l21 21c6 6 15 6 21 0l131-131a10 10 0 0114 0l131 131c6 6 15 6 21 0l21-21c6-6 6-15 0-21L310 268a10 10 0 010-14z"
                                                                lwc-3bq099ugqsh=""></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
            <Delete :isShow="isDelete" v-if="isDelete" @cancel="isDelete=false" desc="是否确定要删除？" @ok="getListShareData"
                sObjectName="RecordAccessControl" :recordId="deleteId" />
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
    import Delete from "@/components/listView/Delete.vue";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        sObjectName: String,
        recordId: String
    });

    const emit = defineEmits(['cancel', 'load']);

    const modelContentRef = ref(null);

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
        currentMenu: "角色",
        top: "",
        currentEntity: '1',
        selectList: [],
        currentShares: [],
        isDelete: false,
        deleteId: ""
    })
    const { listData, menus, currentMenu, top, currentEntity, selectList, currentShares, deleteId, isDelete } = toRefs(data);

    const formState = reactive({
        name: "",
        apiname: "",
        resource: "",
        role: []
    });

    const currentApiName = computed(() => {
        return data.currentEntity == '1' ? 'Role' : data.currentEntity == '2' ?
            'Group' : data.currentEntity == '3' ? '	BusinessUnit' : data.currentEntity == '4' ? 'SystemUser' : '';
    });

    const getListShareData = () => {
        let obj = {
            actions: [{
                id: "5642;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    listViewId: props.recordId
                },
                storable: true
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.listView.getListShareData, d).then(res => {
            // console.log("res", res);
            let currentShares = res.actions[0].returnValue.currentShares;
            data.currentShares = currentShares;
        })
    };
    getListShareData();

    const getData = () => {
        proxy.$get(Interface.listView.getListView, {
            id: props.recordId
        }).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
                let item = res.actions[0].returnValue;
                formState.apiname = item.apiName || '';
                formState.name = item.label || '';
                let visibility = item.visibility || 'GLOBAL';
                if (visibility == 'PRIVATE') {
                    formState.resource = '1';
                } else if (visibility == 'GLOBAL') {
                    formState.resource = '2';
                } else if (visibility == 'SHARED') {
                    formState.resource = '3';
                }

                if (item.selectList && item.selectList.length) {
                    data.selectList = [];
                    item.selectList.map(item1 => {
                        let entity = '';
                        if (item1.objectTypeCode == '1036' || item1.entityName == 'Role') {
                            entity == '1';
                        } else if (item1.objectTypeCode == '9' || item1.entityName == 'Group') {
                            entity == '2';
                        } else if (item1.objectTypeCode == '10' || item1.entityName == 'BusinessUnit') {
                            entity == '3';
                        } else if (item1.objectTypeCode == '8' || item1.entityName == 'SystemUser') {
                            entity == '4'
                        }
                        data.selectList.push({
                            entity: entity,
                            ID: item1.id,
                            Name: item1.Name || '',
                            objectTypeCode: item1.objectTypeCode,
                            entityName: item1.entityName,
                            id: item1.id
                        })

                    })
                }

            }
        })
    }
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
                    name: item.Name,
                    objectTypeCode: item.objectTypeCode,
                    entityName: item.entityName,
                    id: item.id
                })
            })
        }
        let url = Interface.listView.updateListView;
        let d = {
            actions: [{
                id: "6198;a",
                descriptor: "serviceComponent://ui.force.components.controllers.lists.listViewManager.ListViewManagerController/ACTION$updateListView",
                callingDescriptor: "UNKNOWN",
                params: {
                    entityKeyPrefixOrApiName: props.sObjectName,
                    listViewIdOrName: props.recordId,
                    label: formState.name || '',
                    visibility: visibility,
                    developerName: formState.apiname || '',
                    displayColumnApiNames: null,
                    listViewFieldCriteria: null,
                    listViewScope: null,
                    shareIds: shareIds,
                    // shareIds: [
                    //     {   
                    //         "objectTypeCode":8,
                    //         "entityName":"SystemUser",
                    //         "id":"00G90000002JvmLEAS"
                    //     }
                    // ]
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(url, obj).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                message.success("保存成功");
                emit("load", false);
            }
            else {
                if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                    message.error(res.actions[0].errorMessage);
                }
                else {
                    message.error("保存失败");
                }
            }
            setTimeout(function () {
                emit("cancel", false);
            }, 1000)
        })
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
    const getPeople = async (val = "") => {
        let obj = {
            actions: [{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: currentApiName.value,
                    fieldApiName: "Name",
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: currentApiName.value,
                    body: {
                        sourceRecord: {
                            apiName: currentApiName.value,
                            fields: {
                                id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        const res = await proxy.$post(Interface.lookup, d);
        let result = [];
        if(res && res.actions.length && res.actions[0].returnValue){
          let list = res.actions[0].returnValue.lookupResults.records;
          list.forEach(item=>{
            result.push({
                ID: item.fields.Id.value,
                Name: item.fields.Name.value
            })
          });
        }
        data.listData = result;
    }
    getPeople();
    onMounted(() => {
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
        getData();
    })
    const setTop = computed(() => ({
        top: data.top
    }));

    const handleSelectEntity = (e) => {
        data.currentEntity = e.key;
        getPeople();
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
    const handleDeleteShare = (item) => {
        data.deleteId = item.ValueId;
        data.isDelete = true;
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .ant-radio-wrapper {
        display: flex;
        align-items: center;
        margin-top: 10px;
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

    .advancedEditSection {
        margin-top: 20px;

        .section-title {
            background: #f3f3f3;
            padding-left: 8px;
            line-height: 30px;
            border-radius: 4px;
        }

        .search {
            padding: 10px 8px;
        }

        table {
            table-layout: fixed;
            border-collapse: collapse;

            thead {
                tr {
                    th {
                        padding: 4px 8px;
                        height: 32px;
                        background: #f3f3f3;
                        text-align: left;
                        border-right: 1px solid #aeaeae;

                        &:last-child {
                            border-right: none;
                        }

                        &:hover {
                            background: #fff;
                        }
                    }
                }
            }

            tbody {
                tr {
                    td {
                        border-top: 1px solid #c9c9c9;
                        border-bottom: 1px solid #c9c9c9;
                        padding: 4px 8px;
                    }

                    &:hover {
                        td {
                            background: #f3f3f3;
                            border-top: 2px solid #c9c9c9;
                            border-bottom: 2px solid #c9c9c9;
                        }
                    }

                    .close-icon {
                        color: #747474;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>