<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="80%"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
      >
        <template #title>
          <div>
            {{ title }}
          </div>
        </template>
        <div class="modalContainer">
          <div class="modalCenter" :style="{ height: height + 'px!important' }">
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionTitle">选择人员/小组</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="name" label="人员类型">
                            <a-radio-group v-model:value="formState.peopleType" @change="changePeopleType">
                                <a-radio value="U">用户</a-radio>
                                <a-radio value="A">角色</a-radio>
                                <a-radio value="P">个人小组</a-radio>
                                <a-radio value="R">公共小组</a-radio>
                                <a-radio value="B">部门</a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <div class="search">
                            <a-input-search
                                v-model:value="searchVal"
                                placeholder="请输入搜索字符"
                                style="width: 200px"
                                @search="onSearch"
                            />
                        </div>
                        <div class="peopleBox">
                            <div class="deptTree" v-if="formState.peopleType=='U'">
                                <div class="deptName">部门</div>
                                <div class="treeBody">
                                    <a-tree :selectedKeys="deptId"  @select="handleSelectTree" block-node :tree-data="treeData">
                                        <template  #title="{text, key }">
                                            <span>{{text}}</span>
                                        </template>
                                    </a-tree>
                                </div>
                            </div>
                            <a-transfer
                                v-model:target-keys="targetKeys"
                                v-model:selected-keys="selectedKeys"
                                :data-source="listData"
                                :list-style="{
                                    width: '260px',
                                    height: '280px',
                                }"
                                :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                                show-search
                                :titles="['可用', '已选']"
                                :render="item => item.name"
                                :disabled="disabled"
                                @change="handleChange"
                                @selectChange="handleSelectChange"
                            />
                        </div>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">流程变量</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="发起人">
                          <a-checkbox v-model:checked="formState.Variables.checked0.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="流程参与人">
                          <a-checkbox v-model:checked="formState.Variables.checked1.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="发起人部门负责人">
                          <a-checkbox v-model:checked="formState.Variables.checked2.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="发起人部门分管领导">
                          <a-checkbox v-model:checked="formState.Variables.checked3.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="与发起人相同部门人员">
                          <a-checkbox v-model:checked="formState.Variables.checked4.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="主管部门负责人">
                          <a-checkbox v-model:checked="formState.Variables.checked5.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="发起人部门分管业务领导">
                          <a-checkbox v-model:checked="formState.Variables.checked6.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="发起人的护士长">
                          <a-checkbox v-model:checked="formState.Variables.checked7.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">节点流程变量</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="docRight1" label="正文权限">
                            <a-select v-model:value="formState.docRight1">
                                <a-select-option value="2">不可见</a-select-option>
                                <a-select-option value="4">只读</a-select-option>
                                <a-select-option value="8">读写</a-select-option>
                                <a-select-option value="16">读写/留痕迹</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="来源节点相同办理人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked0.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门负责人">
                          <a-checkbox v-model:checked="formState.StepVariables.checked1.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门分管领导">
                          <a-checkbox v-model:checked="formState.StepVariables.checked2.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked3.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门的相同岗位类别人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked4.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门的相同职务人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked5.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门的相同职称人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked6.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的护士长">
                          <a-checkbox v-model:checked="formState.StepVariables.checked7.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">条件查询</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="name" label="查询范围">
                            <a-radio-group v-model:value="formState.scope">
                                <a-radio value="all">全部</a-radio>
                                <a-radio value="draftby">发起人所在部门</a-radio>
                                <a-radio value="step">来源节点</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <FilterQuery @params="getFilterQuery"></FilterQuery>
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
    inject
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
import { formTreeData } from "@/utils/common.js";
  import FilterQuery from "@/components/FilterQuery.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
//   const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    folderName: String,
    folderPicker: String,
    ObjectTypeCode: String,
    id: String,
    stepId: String,
    stepCode: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "办理人员",
    height: document.documentElement.clientHeight - 300,
    treeData: [],
    entityRightList: [],
    tableRight: {},
    listData: [],
    targetKeys: [],
    selectedKeys: [],
    deptId: [],
    searchVal: "",
    disabled: false,
    filterExpression: "",
    processId: inject("processId")
    
  });
  const {
    title, searchVal, disabled, processId,
    height, treeData, deptId, entityRightList, tableRight, listData, targetKeys, selectedKeys, filterExpression
  } = toRefs(data);
  const formState = reactive({
    peopleType: "U",
    name: "",
    Variables: {
        checked0: {
            checkbox: false,
            name: "发起人",
            value: "00000000-0000-0000-0000-000000000001"
        },
        checked1: {
            checkbox: false,
            name: "流程参与人",
            value: "00000000-0000-0000-0000-000000000002"
        },
        checked2: {
            checkbox: false,
            name: "发起人部门负责人",
            value: "00000000-0000-0000-0000-000000000003"
        },
        checked3: {
            checkbox: false,
            name: "发起人部门分管领导",
            value: "00000000-0000-0000-0000-000000000004"
        },
        checked4: {
            checkbox: false,
            name: "与发起人相同部门人员",
            value: "00000000-0000-0000-0000-000000000006"
        },
        checked5: {
            checkbox: false,
            name: "主管部门负责人",
            value: "00000000-0000-0000-0000-000000000007"
        },
        checked6: {
            checkbox: false,
            name: "发起人部门分管业务领导",
            value: "00000000-0000-0000-0000-000000000041"
        },
        checked7: {
            checkbox: false,
            name: "发起人的护士长",
            value: "00000000-0000-0000-0000-000000000020"
        },
    },
    StepVariables: {
        checked0: {
            checkbox: false,
            name: "来源节点相同办理人员",
            value: "00000000-0000-0000-0000-000000000042"
        },
        checked1: {
            checkbox: false,
            name: "来源节点办理人的部门负责人",
            value: "00000000-0000-0000-0000-000000000043"
        },
        checked2: {
            checkbox: false,
            name: "来源节点办理人的部门分管领导",
            value: "00000000-0000-0000-0000-000000000044"
        },
        checked3: {
            checkbox: false,
            name: "来源节点办理人的部门人员",
            value: "00000000-0000-0000-0000-000000000045"
        },
        checked4: {
            checkbox: false,
            name: "来源节点办理人的部门的相同岗位类别人员",
            value: "00000000-0000-0000-0000-000000000046"
        },
        checked5: {
            checkbox: false,
            name: "来源节点办理人的部门的相同职务人员",
            value: "00000000-0000-0000-0000-000000000047"
        },
        checked6: {
            checkbox: false,
            name: "来源节点办理人的部门的相同职称人员",
            value: "00000000-0000-0000-0000-000000000048"
        },
        checked7: {
            checkbox: false,
            name: "来源节点办理人的护士长",
            value: "00000000-0000-0000-0000-000000000060"
        },
    },
    scope: "all"
  });

  const onSearch = (e) => {

  }
  const getTree = () => {
    proxy.$get(Interface.flow.deptTree,{
        entity: "organizationtree"
    }).then(res=>{
        let listData = res.rows;
        data.treeData = formTreeData(listData, 'id', 'pid');
    })
  }
  getTree();
  const handleSelectTree = (selectedKeys,selectedNodes) => {
        data.deptId = [selectedNodes.node.id];
        getUserQuery(selectedNodes.node.id);
    }
    const handleChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    };
    const changePeopleType = (e) => {
        console.log("e",formState.peopleType);
        let type = formState.peopleType;
        if(type=='U'){
            // 8
            getUserQuery();
        }else if(type=='A'){
            // 1036
            getRoleUser();
        }else if(type=='P'){
            // 9
            getGroupQuery('public');
        }else if(type=='R'){
            // 9
            getGroupQuery('owner');
        }
    }
    // 用户
    const getUserQuery = (deptId) => {
        proxy.$get(Interface.flow.userList,{
            businessUnitId: deptId
        }).then(res=>{
            data.listData = res.listData.map(item=>{
                item.key = '8:' + item.systemUserId;
                item.name = '用户:'+item.fullName+'/'+item.BusinessUnitIdName;
                return item;
            });
        })
    }
    // 角色
    const getRoleUser = () => {
        proxy.$get(Interface.user.roleUser,{
        }).then(res=>{
            data.listData = res.listData.map(item=>{
                item.key = '1036:'+item.RoleId;
                item.name = '角色:' + item.Name
                return item;
            });
        })
    }
    getUserQuery();
    const getGroupQuery = (scope) => {
        proxy.$get(Interface.user.groupList,{
            scope: scope
        }).then(res=>{
            let str = '';
            if(scope=='public'){
                    str = '个人小组:';
            }else {
                str = '公共小组:';
            }
            data.listData = res.listData.map(item=>{
                item.key = '9:'+item.GroupId;
                item.name = str + item.Name
                return item;
            });
        })
    }
    const getDetail = () => {
        proxy.$get(Interface.flow.handleDetail,{
            ProcessId: data.processId,
            StepId: props.stepId,
            StepCode: props.stepCode
        }).then(res=>{
            let Variables = res.Variables;
            Variables.forEach(item=>{
                for(let key in formState.Variables){
                    if(item.Id==formState.Variables[key].value){
                        formState.Variables[key].checkbox = true;
                    }
                }
            });
            let StepVariables = res.StepVariables;
            StepVariables.Variables.forEach(item=>{
                for(let key in formState.StepVariables){
                    if(item.Id==formState.StepVariables[key].value){
                        formState.StepVariables[key].checkbox = true;
                    }
                }
            })
            let Groups = res.Groups;
            Groups.forEach(item=>{
                data.targetKeys.push(item.ObjectTypeCode+':'+item.Id);
            })
            formState.scope = res.FilterScope.Scope;
        })
    }
  getDetail();
  // 获取筛选器的数据
  const getFilterQuery = (e) => {
    console.log("e", e);
    data.filterExpression = e;
  }
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
        let Variables = [];
        let StepVariables = [];
        for (var i = 0; i < 7; i++) {
            if (formState.Variables['checked' + i].checkbox) {
                Variables.push({
                    Id: formState.Variables['checked' + i].value,
                    Name: formState.Variables['checked' + i].name
                })
            }
            if (formState.StepVariables['checked' + i].checkbox) {
                StepVariables.push({
                    Id: formState.Variables['checked' + i].value,
                    Name: formState.Variables['checked' + i].name
                })
            }
        }
        console.log("Variables:",Variables);
        console.log("StepVariables:", StepVariables);
        console.log("targetKeys:", data.targetKeys, data.listData);
        let Groups = [];
        data.listData.forEach(item=>{
            data.targetKeys.forEach(row=>{
                if(item.key == row){
                    Groups.push({
                        Id: item.key.split(":")[1],
                        ObjectTypeCode: item.key.split(":")[0],
                        Name: item.name
                    })
                }
            })
        })
        let obj = {
            Participantors: {
                StepId: props.stepId,
                StepCode: props.stepCode,
                ProcessId: data.processId,
                Name: "",
                Variables : Variables,
                StepVariables: {
                    Name: "",
                    FromStepId: "",
                    Variables: StepVariables
                },
                Groups: Groups,
                FilterExpresssion: data.filterExpression,
                FilterScope: {
                    FromStepId: "",
                    FromStepName: "",
                    Scope: formState.scope
                }
            }
        };
        let params = {
            messages: JSON.stringify(obj)
        };
        
        proxy.$get(Interface.flow.savePerm, params).then((res) => {
            message.success("保存成功！");
            emit("cancel", false);
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
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
  .treeBox{
    width: 300px;
    height: 300px;
    border: 1px solid #e2e3e5;
    border-radius: 5px;
    overflow: auto;
  }
  .tablePerm{
    width: 100%;
    border-collapse: collapse;
    thead{
        background: #f2f2f2;
    }
    tr{
        border-bottom: 1px solid #dedede;
        th{
            text-align: left;
        }
        td{
            padding: 10px 0;
        }
    }
  }
  .childRightText{
    padding-left: 10px;
    padding-right: 5px;
  }
  .peopleBox{
    display: flex;
    margin: 10px 0;
    .deptTree{
        width: 300px;
        height: 300px;
        border: 1px solid #e2e3e5;
        margin-right: 10px;
        .deptName{
            height: 30px;
            line-height: 30px;
            background: #f4f4f4;
            padding-left: 10px;
        }
        .treeBody{
            height: calc(~"100% - 30px");
            overflow: auto;
        }
    }
  }
  </style>
  