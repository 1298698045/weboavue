<template>
    <div class="filed" :name="field.id" :label="field.label">
        <span class="required" v-if="print!=1 && field?.required">*</span>
        <div v-if="type=='S'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-input v-else :disabled="disabledPermission" :placeholder="'请输入' + field.label" v-model:value="list[field.id]" style="min-width: 100px;"></a-input>
            </span>
        </div>
        <div v-else-if="type=='N'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-input v-else :disabled="disabledPermission" type="Number" v-model:value="list[field.id]" :placeholder="'请输入' + field.label"></a-input>
            </span>
        </div>
        <div v-else-if="type=='H'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-input v-else :disabled="disabledPermission" type="Number" v-model:value="list[field.id]" maxlength="11" :placeholder="'请输入' + field.label"></a-input>
            </span>
        </div>
        <div v-else-if="type=='6'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-input v-else :disabled="disabledPermission" type="password" v-model:value="list[field.id]" :placeholder="'请输入' + field.label"></a-input>
            </span>
        </div>
        <div v-else-if="type=='P'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <div v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <div v-else style="width: 150px;display: flex;">
                    <a-slider :disabled="disabledPermission" style="flex: 1;" v-model:value="inputValue1" :min="1" :max="100" />
                    <a-input-number :disabled="disabledPermission" v-model:value="inputValue1" :min="1" :max="100" style="width: 50px;margin-left: 16px" />
                </div>
            </div>
        </div>
        <div v-else-if="type=='L' || type=='LT' || type=='DT'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-select v-else :disabled="disabledPermission" style="min-width: 150px;width: 100%;" v-model:value="list[field.id]" :placeholder="'请选择' + field.label">
                    <a-select-option v-for="(option, optionIdx) in select[field.id] && select[field.id].values" :key="optionIdx" :value="option.value">{{option.label}}</a-select-option>
                </a-select>
            </span>
        </div>
        <div v-else-if="type == 'MC' || type == 'RBL'">
            <span class="valText" v-if="print==1">
                <table>
                    <tbody>
                        <tr v-for="(item, index) in chunkArray(field)" :key="index">
                            <td v-for="(option, optionIdx) in item" :key="optionIdx">
                                <span class="checkbox-img">
                                    <img src="@/assets/img/checkbox_unchecked.gif" alt="" v-if="!list[field.id].includes(option.value)">
                                    <img src="@/assets/img/checkbox_checked.gif" alt="" v-else>
                                </span>
                                {{option.label}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </span>
            <span v-else>
                <span class="valText"
                    v-if="field?.permission == 4 || field?.permission == '' || stateCode == 2 || field?.permission == 0">
                    <table>
                        <tbody>
                            <tr v-for="(item, index) in chunkArray(field)" :key="index">
                                <td v-for="(option, optionIdx) in item" :key="optionIdx">
                                    <span class="checkbox-img">
                                        <img src="@/assets/img/checkbox_unchecked.gif" alt="" v-if="!list[field.id].includes(option.value)">
                                        <img src="@/assets/img/checkbox_checked.gif" alt="" v-else>
                                    </span>
                                    {{option.label}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </span>
                <span v-else-if="field?.permission == 2"></span>
            </span>
        </div>
        <div v-else-if="type=='D'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-date-picker v-else :disabled="disabledPermission" style="min-width: 150px;width: 100%;" valueFormat="YYYY-MM-DD" v-model:value="list[field.id]" :placeholder="'请选择' + field.label" />
            </span>
        </div>
        <div v-else-if="type=='F'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-date-picker v-else :disabled="disabledPermission" style="min-width: 150px;width: 100%;" valueFormat="YYYY-MM-DD HH:mm:ss" show-time v-model:value="list[field.id]" :placeholder="'请选择' + field.label" />
            </span>
        </div>
        <div v-else-if="type=='Year'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-date-picker v-else :disabled="disabledPermission" style="min-width: 150px;width: 100%;" picker="year" v-model:value="list[field.id]" :placeholder="'请选择' + field.label" />
            </span>
        </div>
        <div v-else-if="type=='Month'||type=='Y_M'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-date-picker v-else :disabled="disabledPermission" style="min-width: 150px;width: 100%;" picker="month" v-model:value="list[field.id]" :placeholder="'请选择' + field.label" />
            </span>
        </div>
        <div v-else-if="type=='X' || type=='J'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-textarea  v-else :disabled="disabledPermission" v-model:value="list[field.id]" :placeholder="'请输入' + field.label" :rows="2" />
            </span>
        </div>
        <div v-else-if="type=='z' || type=='UCS'">
            <span class="valText" v-if="print==1">
                <!-- {{ list[field.id] }} -->
                <div class="suggestion">
                    <div class="suggestion-item" v-for="(sug, sugIdx) in suggestionObj[field.id]" :key="sugIdx">
                        <span v-if="sug?.Comment">
                            <span>{{ sug.Comment }}</span>
                            <div class="signImg" v-if="field.ShowSignature">
                                <img :src="Interface.pathUrl+sug.sinatureUrl" alt="">
                            </div>
                            <div class="sign-info">
                                [ {{sug.FullName}} <span v-if="field.ShowDept">{{ sug.DeptName }}</span> <span v-if="field.ShowApproveTime">{{sug.CreateTime}}</span> ]
                            </div>
                        </span>
                    </div>
                </div>
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <template v-else>
                    <a-textarea :disabled="disabledPermission" v-model:value="list[field.id]" :placeholder="'请输入' + field.label" :rows="4" />
                    <div>
                        <a-popover placement="right">
                            <!-- <a-button type="link">选意见</a-button> -->
                            <template #content>
                                <div class="suggestionWrap">
                                    <div class="suggestion-list">
                                        <div class="suggestion-item" v-for="(option, optionIdx) in suggestions" :key="optionIdx" @click="selectSuggestion(option, field)">
                                            {{option.name}}
                                        </div>
                                    </div>
                                    <div class="suggestion-footer">
                                        <span class="label">创建意见</span>
                                        <div class="add-form">
                                            <a-input class="suggestion-inp" placeholder="请输入新的意见"></a-input>
                                            <a-button size="small" type="primary">保存</a-button>
                                        </div>
                                        <!-- <a-button size="small" type="primary">创建意见</a-button> -->
                                    </div>
                                </div>
                            </template>
                        </a-popover>
                        <div class="signImg" v-if="field.ShowSignature">
                            <img src="@/assets/img/sign.png" alt="">
                        </div>
                    </div>
                </template>
            </span>
        </div>
        <div v-else-if="type=='UC'">
            <span class="valText" v-if="print==1">
                <!-- {{ list[field.id] }} -->
                <div class="suggestion">
                    <div class="suggestion-item" v-for="(sug, sugIdx) in suggestionObj[field.id]" :key="sugIdx">
                        <span v-if="sug?.Comment">
                            <span>{{ sug.Comment }}</span>
                            <div class="sign-info">
                                [ {{sug.FullName}} {{ sug.DeptName }} {{sug.CreateTime}} ]
                            </div>
                        </span>
                    </div>
                </div>
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <template v-else>
                    <a-textarea :disabled="disabledPermission" v-model:value="list[field.id]" :placeholder="'请输入' + field.label"
                        :rows="4" />
                    <div>
                        <a-popover placement="right">
                            <!-- <a-button type="link">选意见</a-button> -->
                            <template #content>
                                <div class="suggestionWrap">
                                    <div class="suggestion-list">
                                        <div class="suggestion-item" v-for="(option, optionIdx) in suggestions" :key="optionIdx"
                                            @click="selectSuggestion(option, field)">
                                            {{option.name}}
                                        </div>
                                    </div>
                                    <div class="suggestion-footer">
                                        <span class="label">创建意见</span>
                                        <div class="add-form">
                                            <a-input class="suggestion-inp" placeholder="请输入新的意见"></a-input>
                                            <a-button size="small" type="primary">保存</a-button>
                                        </div>
                                        <!-- <a-button size="small" type="primary">创建意见</a-button> -->
                                    </div>
                                </div>
                            </template>
                        </a-popover>
                    </div>
                </template>
            </span>
        </div>
        <div v-else-if="type == 'HS'">
            <span v-if="field?.permission == 2"></span>
            <span v-else>
                <div class="signImg" v-if="list[field.id]">
                    <img :src="list[field.id]" alt="">
                </div>
            </span>
        </div>
        <div v-else-if="type=='B'">
            <span class="valText" v-if="print==1">
                {{ list[field.id] ? '是' : '否' }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] ? '是' : '否' }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-checkbox v-else :disabled="disabledPermission" v-model:checked="list[field.id]"></a-checkbox>
            </span>
        </div>
        <div v-else-if="type=='BC'">
            <a-form-item name="appStyle" label="应用程序个性化设置">
                <a-checkbox-group style="width: 100%">
                    <a-checkbox value="checkbox1">checkbox1</a-checkbox>
                    <a-checkbox value="checkbox2">checkbox2</a-checkbox>
                </a-checkbox-group>
            </a-form-item>
        </div>
        <div v-else-if="type=='RBL'">
            <a-radio-group>
                <a-radio :value="1">Option A</a-radio>
                <a-radio :value="2">Option B</a-radio>
            </a-radio-group>
        </div>
        <div v-else-if="type=='Q'">
            <a-transfer
                v-model:target-keys="targetKeys"
                v-model:selected-keys="selectedKeys"
                :data-source="mockData"
                :titles="['Source', 'Target']"
                :render="item => item.title"
                :disabled="disabled"
                @change="handleChange"
                @selectChange="handleSelectChange"
                @scroll="handleScroll"
            />
        </div>
        <div class="searchLook" v-else-if="type=='U' || type=='O' || type=='Y' || type=='Y_MD'">
            <span class="valText" v-if="print==1">
                {{ computedName }}
            </span>
            <div v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ computedName }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <template v-else>
                    <a-select style="min-width: 150px;width: 100%;" :disabled="disabledPermission" showSearch v-model:value="list[field.id]" :placeholder="'请选择' + field.label" @search="(e)=>searchlookup(e, field)" @dropdownVisibleChange="(e)=>{searchlookup('', field, e)}"
                        @change="(e)=>changeSearchField(e, field)" allowClear>
                        <template #suffixIcon></template>
                        <a-select-option v-for="(option, optionIdx) in search[field.id]" :key="optionIdx" :value="option.ID">
                            {{ option.Name }}
                        </a-select-option>
                    </a-select>
                    <div class="searchIcon">
                        <!-- <SearchOutlined
                          class="ant-select-suffix"
                          @click="handleOpenLook"
                        /> -->
                    </div>
                </template>
            </div>
        </div>
        <div class="uploadPhoto" v-else-if="type=='I'">
            <a-upload
                v-model:file-list="fileList"
                name="file"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
            >
                <a-button>
                    上传图片
                </a-button>
            </a-upload>
            单个文件不超过200MB,格式要求
        </div>
        <div class="Province" v-else-if="type=='Province'">
            <a-cascader v-model:value="value" :options="options" placeholder="Please select" />
        </div>
        <div v-else-if="type=='ColorPicker'">
            <!-- <InputColor /> -->
        </div>
        <div v-else-if="type=='LT'">
            <a-tree-select
                v-model:value="value"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :placeholder="'请选择' + field.label"
                allow-clear
                tree-default-expand-all
                :tree-data="treeData"
                tree-node-filter-prop="label"
            >
                <template #title="{ value: val, label }">
                    <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
                    <template v-else>{{ label }}</template>
                </template>
            </a-tree-select>
        </div>
        <div v-else>
            <span class="valText" v-if="print==1">
                {{ list[field.id] }}
            </span>
            <span v-else>
                <span class="valText" v-if="field?.permission == 4">
                    {{ list[field.id] }}
                </span>
                <span v-else-if="field?.permission == 2"></span>
                <a-input v-else :disabled="disabledPermission" v-model:value="list[field.id]" :placeholder="'请输入' + field.label" style="min-width: 100px;"></a-input>
            </span>
        </div>
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
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose,
        inject,
        computed
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    // import InputColor from "@/components/workflow/formPreview/InputColor.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const props = defineProps({
        type: String,
        field: Object,
        entityApiName: String,
        select: Object,
        attributes: Array,
        list: Object,
        search: Object,
        print: [String, Number],
        suggestionObj: Object
    });
    

    const emit = defineEmits(['openlook','setValue','lookup','select','suggestion']);

    // const formState = reactive({

    // });
    // formState[props.field.id] = "";

    // watch(()=> formState, (newVal, oldVal)=>{
    //     emit('setValue', props.field.id, formState[props.field.id]);
    // }, {deep: true})

    // const changeValue = (e) => {
    //     emit('setValue', props.field.id, formState[props.field.id]);
    // };


    const computedName = computed(()=>{
        const id = props.field.id;
        const search = props.search;
        const val = props.list[id];
        let name = search[id].find(item=>item.ID==val)?.Name || '';
        return name;
    })

    // 控制字段默认值可编辑/不可编辑
    const disabledPermission = computed(()=>{
        const permission = props.field.permission;
        const isDisabled = permission == 16 ? true : false;
        return true;
    })
    const treeData = ref([
        {
            label: 'root 1',
            value: 'root 1',
            children: [
            {
                label: 'parent 1',
                value: 'parent 1',
                children: [
                {
                    label: 'parent 1-0',
                    value: 'parent 1-0',
                    children: [
                    {
                        label: 'my leaf',
                        value: 'leaf1',
                    },
                    {
                        label: 'your leaf',
                        value: 'leaf2',
                    },
                    ],
                },
                {
                    label: 'parent 1-1',
                    value: 'parent 1-1',
                },
                ],
            },
            {
                label: 'parent 2',
                value: 'parent 2',
            },
            ],
        },
    ]);
    const mockData = [];
    for (let i = 0; i < 20; i++) {
        mockData.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            disabled: i % 3 < 1,
        });
    }
    const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
    const disabled = ref(false);
    const targetKeys = ref(oriTargetKeys);
    const selectedKeys = ref(['1', '4']);
    const handleChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    };
    const handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };
    const data = reactive({
        fileList: [],
        options: [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                    ],
                },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                    ],
                },
                ],
            },
        ],
        inputValue1: 10,
        // search: {},
        suggestions: [
            {
                id: 1,
                name: "123"
            },
            {
                id: 2,
                name: "123123"
            },
            {
                id: 3,
                name: "123123"
            },
            {
                id: 4,
                name: "122385673"
            }
        ]
    });
    const { fileList, options, inputValue1, suggestions } = toRefs(data);

    const handleOpenLook = () => {
        if(props.field?.permission == 16){
            return false;
        }
        emit('openlook', props.field);
    }

    const searchlookup = (search, field, isBook=true) => {
        if(isBook){
            emit("lookup", search, field);
        }
    };

    const changeSearchField = (e, field) => {
        emit("select", e, field);
    }

    const searchlookup_old = (search, field) => {
        let targetApiName;
        console.log("props.attributes", props.attributes);
        console.log("field", field);
        let findRow = props.attributes.find(item=>field.id == item.name);
        console.log("findRow", findRow);

        targetApiName = findRow.referencedEntity.EntityName;
        let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: props.entityApiName,
                    fieldApiName: field.id,
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: targetApiName,
                    body: {
                        sourceRecord: {
                            apiName: props.entityApiName,
                            fields: {
                                Id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup, d).then((res) => {
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                let isBook = data.options.some(row=>row.ID==item.fields.Id.value);
                if(!isBook){
                    arr.push({
                        ID: item.fields.Id.value,
                        Name: item.fields.Name.value
                    })
                }
            });
            console.log("arr", arr);
            data.search[field.id] = arr;
            console.log("data.search", data.search);
        })
    }
    const selectSuggestion = (option, field) => {
        let name = option.name;
        emit("suggestion", name, field)
    }
    const chunkArray = (field) => {
        let list = props.select[field.id] && props.select[field.id].values;
        let cols = Number(field.cols) || 3;
        let result = [];
        for (let i = 0; i < list.length; i += cols) {
            result.push(list.slice(i, i + cols));
        }
        return result;
    }
</script>
<style lang="less" scoped>
    .filed{
        padding: 5px;
        /* min-width: 100px; */
        font-size: 14px !important;
        font-weight: normal !important;
        position: relative;
        color: #333 !important;
        overflow: hidden;
        display: flex;
        text-align: left;
        .searchLook{
            position: relative;
            .searchIcon{
                position: absolute;
                right: 6px;
                top: 8px;
                z-index: 999;
            }
        }
        .required{
            /* position: absolute;
            top: 12px;
            left: 10px;
            z-index: 99; */
        }
        /* >div{
            flex: 1;
        } */
        .signImg{
            img{
                width: 120px;
                height: 56px;
            }
        }
    }
    .suggestionWrap{
        width: 200px;
        .suggestion-list{
            min-height: 100px;
            max-height: 400px;
            overflow-y: auto;
            .suggestion-item{
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                text-align: left;
                &:hover{
                    background: #f4f4f4;
                    cursor: pointer;
                }
            }
        }
        .suggestion-footer{
            border-top: 1px solid #e2e3e5;
            padding: 5px 10px;
            .label{
                font-size: 12px;
                color: #666;
            }
            .add-form{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .suggestion-inp{
                    margin-right: 10px;
                }
            }
        }
    }
    .suggestion-item{
        text-align: left;
    }
</style>