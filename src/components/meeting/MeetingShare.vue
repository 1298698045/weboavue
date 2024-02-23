<template>
    <div>
        <a-form :model="formState" ref="formRef">
            <div class="section">
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="搜索">
                            <div class="searchMenuBox">
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
                                    <a-select class="aselect" v-model:value="users" show-search
                                         :placeholder="'搜索'+currentMenu"
                                        :default-active-first-option="false" :filter-option="false"
                                        :not-found-content="null" @search="handleSearch" @change="handleChange"
                                        @dropdownVisibleChange="getPeople">
                                        <template #suffixIcon>
                                            <SearchOutlined class="ant-select-suffix" />
                                        </template>
                                        <a-select-option :value="item.ID" v-for="(item,index) in peoples"
                                            :key="index">{{item.Name}}</a-select-option>
                                    </a-select>
                                </div>
                                <div class="selectPeople">
                                    <div class="peopleItem" v-for="(row,rowIdx) in objects" :key="rowIdx">
                                        <span class="icon">
                                            <UserOutlined />
                                        </span>
                                        <span class="name">
                                            {{ row.Name }}
                                        </span>
                                        <div class="delIcon" @click.stop="handleRmovePeople(rowIdx)">
                                            <CloseOutlined  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="访问权限">
                            <a-select v-model:value="rightCode">
                                <a-select-option value="2">允许查看</a-select-option>
                                <a-select-option value="4">允许查看和新建事件</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </div>
            </div>
            <div class="addBtn">
                <a-button type="primary" @click="handleAddPrem">添加</a-button>
            </div>
            <div class="section">
                <div class="sectionTitle">已添加人</div>
                <div class="rowBox" v-for="(item,index) in listData" :key="index">
                    <div class="imgs">
                        <img :src="require('@/assets/img/user.png')" alt="" />
                    </div>
                    <div class="name">
                        {{item.ObjectName}}
                    </div>
                    <div class="option">
                        <a-select v-model:value="item.SharedRights" style="width: 200px;" @change="(e)=>{changeItemPerm(e,item)}">
                            <a-select-option :value="2">允许查看</a-select-option>
                                <a-select-option :value="4">允许查看和新建事件</a-select-option>
                        </a-select>
                    </div>
                    <div class="delIcon">
                        <CloseOutlined @click="handleItemDelete(item)"  v-if="item.ObjectId != '00000000-0000-0000-0000-000000000000' && item.ObjectId != '00000000-0000-0000-0000-000000000001' && item.IsCreated != 'true'" />
                    </div>
                </div>
            </div>
        </a-form>
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
        CloseOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    console.log(document.documentElement.clientHeight);
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        fileParams: Object
    });
    const formRef = ref();

    const data = reactive({
        title: "设置权限",
        height: document.documentElement.clientHeight - 300,
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
        listData: [],
        rightCode: '2',
        users: "",
        peoples: [],
        objects: []
    });
    const {
        title,
        height,
        menus,
        currentMenu,
        listData,
        rightCode,
        users,
        peoples,
        objects
    } = toRefs(data);
    const formState = reactive({
        name: "",
    });

    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });
    // 删除搜索的人
    const handleRmovePeople = (index) => {
        data.objects.splice(index, 1);
    }
    // 添加权限
    const handleAddPrem = () => {
        console.log("data",data.users, data.rightCode);
        var objects = [];
        data.objects.forEach(item=>{
            let str = item.type+':'+item.ID+':'+item.Name;
            objects.push(str);
        })
        proxy.$get(Interface.meeting.addShare,{
            // entityId: props.fileParams.id,
            objects: objects.join(','),
            rightCode: data.rightCode
        }).then(res=>{
            message.success("添加成功！");
            data.objects = [];
        })
    }
    const handleMenu = (e)=> {
        data.currentMenu = data.menus.find(item=>item.key==e.key).name;
    }

    const getAccess = () => {
        proxy.$get(Interface.meeting.sharedList,{
            // id: props.fileParams.id,
            objecttypecode: 'file'
        }).then(res=>{
            data.listData = res.rows;
        })
    }
    getAccess();

    const handleSearch = (val) =>{
        getPeople(val);
    }
    const handleChange = (e) => {
        console.log('e',e);
        let item = data.peoples.find(item=>item.ID==e);
        console.log("item",item, data.currentMenu);
        item.type = data.currentMenu;
        data.objects.push(item);

        data.users = '';
    }
    const getPeople = (val="")=>{
        proxy.$get(Interface.uilook,{
            Lktp: 30020,
            lksrch: val
        }).then(res=>{
            data.peoples = res.listData;
        })
    }
    // 删除已添加人
    const handleItemDelete = (item) => {
        proxy.$get(Interface.meeting.removeShare,{
            id: item.CalendarShareId
        }).then(res=>{
            message.success(res.msg);
            getAccess();
        })
    }
    const changeItemPerm = (e,item) => {
        console.log(e,item);
        let obj = {
            actions: [
                {
                    params: {
                        CalendarShareId: item.CalendarShareId,
                        SharedRights: item.SharedRights
                    }
                }
            ]
        }
        let messages = JSON.stringify(obj);
        proxy.$get(Interface.meeting.sharedRight, {message: messages}).then(res=>{
            message.success("设置成功");
            getAccess();
        })
    }
</script>
<style lang="less" scoped>
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
        .selectPeople{
            display: flex;
            flex-wrap: wrap;
            .peopleItem{
                display: flex;
                border: 1px solid #e2e3e5;
                border-radius: 2px;
                padding: 5px 2px;
                margin-right: 8px;
                margin-top: 8px;
                cursor: pointer;
                .name {
                    padding: 0 5px;
                }
            }
        }
        .sectionRow {
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

    .rowBox {
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 10px 10px;

        .imgs {
            width: 30px;
            height: 30px;
            background: var(--backColor);

            img {
                width: 100%;
                height: 100%;
            }
        }

        .name {
            flex: 1;
            margin-left: 20px;
        }
        .delIcon{
            width: 50px;
            cursor: pointer;
            padding-left: 20px;
        }
    }
    .searchMenuBox{
        border: 1px solid #e3e3e5;
        padding: 5px;
        .menuRow{
            display: flex;
            /* align-items: center; */
            
            .ant-btn{
                border-radius: 4px 0 0 4px;
            }
            .ant-select-selector{
                border-radius: 0 4px 4px 0 !important;
                margin-left: -1px !important;
            }
        }
    }
    .addBtn{
        padding-left: 10px;
        padding-bottom: 10px;
    }
</style>