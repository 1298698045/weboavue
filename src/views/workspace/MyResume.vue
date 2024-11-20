<template>
  <div class="MyResumeWrap">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-bd">
        <div class="printBtnGroup">
            <div class="printBtn" @click="handlePrint">打印</div>
            <!-- <div class="printBtn" @click="handleEdit">编辑</div> -->
        </div>
        <div class="main-content">
            <div class="mi-content">
                <div class="profile section">
                    <!-- <div class="profile-bg">
                    </div> -->
                    <div id="detailview" v-cloak>
                        <div class="profile-message">
                            <div class="profile-message-leftmessage">
                                <div class="profile-photo">
                                    <img :src="require('@/assets/img/user/MyResume/showEmpAvatar.png')" alt="" />
                                </div>
                                <div class="profile-name"><label>姓名：</label>{{record.FullName||''}}</div>
                                <div class="profile-name"><label>部门：</label>{{record.DeptId.Name||''}}</div>
                                <div class="profile-name"><label>工号：</label>{{record.EmployeeNo||''}}</div>
                                <div class="profile-name"><label>电话：</label>{{record.MobileNumber||''}}</div>
                            </div>
                            <div class="profile-message-rightmessage">
                                <el-collapse v-model="activesections">
                                    <el-collapse-item v-show="sections.isCollapsible" v-for="(sections,index) in list.sections" :key="index" :name="index">
                                <div :id="sections.sectionId" v-show="sections.showHeader" class="sectiontitle">{{sections.title}}</div>
                                        <div class="slds-gutters_small" v-for="(rows,rowsIndex) in sections.rows" :key="rowsIndex">
                                            <div class="slds-col slds-has-flexi-truncate forcePageBlockItem" v-for="(attributes,attributesIndex) in rows.attributes" :key="attributesIndex">
                                                <div class="slds-form-element">
                                                    <div class="slds-form-element__label">
                                                        <span>{{attributes.label}}：</span>
                                                    </div>
                                                    <div class="slds-form-element__control">
                                                        <div class="slds-form-element__static slds-truncate">
                                                            
                                                            <span v-if="attributes.attributes.type=='O'||attributes.attributes.type=='U'||attributes.attributes.type=='Y'||attributes.attributes.type=='Y_MD'" style="display: inline-block;">{{record[attributes.localId].Name}}</span>
                                                            <span v-else style="display: inline-block;">{{record[attributes.localId]}}</span>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                        </div>
                                    </el-collapse-item>
                                    <div style="margin:0 0 25px 0;" v-show="!sections.isCollapsible" v-for="(sections,index) in list.sections" :key="index">
                                        <div class="sectiontitle" v-show="sections.showHeader">{{sections.title}}</div>
                                        <div class="slds-gutters_small" v-for="(rows,rowsIndex) in sections.rows" :key="rowsIndex">
                                                <div class="slds-col slds-has-flexi-truncate forcePageBlockItem" v-for="(attributes,attributesIndex) in rows.attributes" :key="attributesIndex">
                                                    <div class="slds-form-element">
                                                        <div class="slds-form-element__label">
                                                            <span>{{attributes.label}}：</span>
                                                        </div>
                                                        <div class="slds-form-element__control">
                                                            <div class="slds-form-element__static slds-truncate">
                                                                
                                                                <span v-if="attributes.attributes.type=='O'||attributes.attributes.type=='U'||attributes.attributes.type=='Y'||attributes.attributes.type=='Y_MD'" style="display: inline-block;">{{record[attributes.localId].Name}}</span>
                                                                <span v-else style="display: inline-block;">{{record[attributes.localId]}}</span>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="clear"></div>
                                            </div>

                                    </div>
                                    
                                </el-collapse>
                            </div>
                        </div>
                    </div>
                </div>
            <div id="vueRelatedListBlock" v-cloak>
                <div class="section list" v-for="(relatedLists,relatedListsIndex) in relatedLists" :key="relatedListsIndex">
                    <div class="section-title" :id="relatedLists.relatedListApiName">{{relatedLists.label}}</div>
                    <div class="section-body">
                        <div class="section-item"
                            v-show="recordIds[relatedLists.relatedSObject]" 
                            v-for="(recordId,recordIdIndex) in recordIds[relatedLists.relatedSObject].recordIds" 
                            :key="recordIdIndex"
                            >
                            <div class="items-left">
                                <img :src="require('@/assets/img/user/MyResume/default.png')" alt="" />
                            </div>
                            <div class="items-right">
                                <div class="items-right-label" v-for="(listItems,listItemsIndex) in listItems[relatedLists.relatedSObject]" :key="listItemsIndex">
                                    <span class="items-right-label-title">{{listItems.title}}:</span> 
                                    <span class="items-right-label-value">{{records[recordId][relatedLists.relatedSObject].record.fields[listItems.field].displayValue}}</span> 
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import "@/style/common.less";
import "@/style/icon/iconfont.css";
import {
  ref,
  toRefs,
  reactive,
  toRaw,
  onMounted,
  watch,
  getCurrentInstance,
  defineEmits,
  defineExpose,
  defineProps,
} from "vue";
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import RadioUser from "@/components/commonModal/MultipleUser.vue";
import Delete from "@/components/listView/Delete.vue";
const { proxy } = getCurrentInstance();
const PersonnelLst = ref();
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  id: String,
});
const emit = defineEmits(["load"]);
const data = reactive({
  loading: false,
  listData: [],
  listDataDetail: {},
  height:100,
  id: route.query.id,
  ParentSubjectName:'',
  Description:'',

  record: {
      DeptId: {}
  },
  list: {
      sections: []
  },
  detailviewloading: true,
  activesections: [],
  relatedLists: [],
  listItems: {},
  recordIds: {},
  records: {},
});
const { record,list,detailviewloading,activesections,relatedLists,listItems,recordIds,records,id,height,listData,loading,listDataDetail,ParentSubjectName,Description} = toRefs(data);
const getQuery = () => {
  data.listData=[];
  let filterQuery='\nParentSubject\teq\t'+data.id;
  proxy.$post(Interface.list2, {
      filterId:'',
      objectTypeCode:'100310',
      entityName:'KbSubject',
      filterQuery:filterQuery,
      search:'',
      page: 1,
      rows: 100,
      sort:'DisplayOrder',
      order:'ASC',
      displayColumns:'Name,ParentSubject,Description'
  }).then(res => {
      var list = [];
      if(res&&res.nodes&&res.nodes.length){
        for (var i = 0; i < res.nodes.length; i++) {
            var item = res.nodes[i];
            for(var cell in item){
                if(cell!='id'&&cell!='nameField'){
                    item[cell]=girdFormatterValue(cell,item);
                }
            }
            list.push(item);
            getArticle(item.id);
        }
      }
      data.listData = list;
      
  })
};
const getArticle=(id)=>{
    data.listDataDetail[id] = [];
    let filterQuery='\nSubjectId\teq\t'+id;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'100311',
            entityName:'KbSubjectContent',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'DisplayOrder',
            order:'asc',
            displayColumns:'Name'
        }).then(res => {
            if(res&&res.nodes&&res.nodes.length){
              var list = [];
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'&&cell!='ContentId'&&cell!='SubjectId'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                      // if(cell=='ContentId'||cell=='SubjectId'){
                      //   item[cell+'Value']=item[cell].lookupValue.value;
                      //   item[cell]=girdFormatterValue(cell,item);
                      // }
                      // if(cell=='CreatedOn'||cell=='ModifiedOn'){
                      //     item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                      // }
                  }
                  list.push(item)
              }
              data.listDataDetail[id] = list;
            }
        })
  }
const onSearch = (e) => {
  getQuery();
};
const onClear = (e) => {
  data.searchVal='';
  getQuery();
};
const getDetail = () => {
    let d = {
        actions:[{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
              recordId: data.id,
              apiName: 'KbSubject',
              objTypeCode: '100310',
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.detail,obj).then(res=>{
        if(res&&res.actions&&res.actions[0]){
          let record = res.actions[0].returnValue.fields;
          data.ParentSubjectName=record.Name?record.Name.displayValue:'';
          data.Description=record.Description?record.Description.value:'';
        }
    })
    
  }
  const getData = () => {
    let data1={"actions": [{"state":"SUCCESS","msg":"","returnValue":{"id":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6","entityLabel":"人员档案","keyPrefix":"a0V","entityApiName":"HREmployee","objectTypeCode":30020,"record":{"CreatedBy":{"Id":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6","Name":"刘优","objectTypeCode":"8","sobjectType":"SystemUser"},"CreatedOn":"2021-11-09 10:21","ModifiedBy":{"Id":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6","Name":"刘优","objectTypeCode":"8","sobjectType":"SystemUser"},"ModifiedOn":"2024-10-12 09:51","EmployeeNo":"10000","FullName":"刘优","RootDeptId":{"Id":"63a1820f-e332-4c71-bfb5-39677c7ecdd8","Name":"信息中心","objectTypeCode":"10","sobjectType":"BusinessUnit"},"DeptId":{"Id":"63a1820f-e332-4c71-bfb5-39677c7ecdd8","Name":"信息中心","objectTypeCode":"10","sobjectType":"BusinessUnit"},"SubDeptId":{"Id":"63a1820f-e332-4c71-bfb5-39677c7ecdd8","Name":"信息中心","objectTypeCode":"10","sobjectType":"BusinessUnit"},"ContractTypeCode":"科研博士后","EmpCategoryCode":"医师","CategoryCode":"","CategoryOfFinance":"","PostCategoryCode":"管理人员","PostLevelCode":"","PostSubCategory":"行政","PostId":{"Id":"00000000-0000-0000-0000-000000000000","Name":"信息职员","objectTypeCode":"30010","sobjectType":"30010"},"StateCode":"在岗","SubStateCode":"","WorkStartDate":"2020-08-01","JoinDate":"2020-08-01","EndProbationOn":"2020-08-01","EstablishedOn":"","SalaryPostCategory":"管理","SalaryPostCode":"管理一级","SalaryLevel":"3","SalaryPostStart":"2020-08-01","SalaryNo":"","SalaryMemo":"","PeopleSourceCode":"","IsMiddleLevel":"","IsMultipleJob":"","StaffLevel":"","EmpPool":"在编在岗","JobTitle":"","JobTitleLevelCode":"","JobTitleStart":"2020-08-01","JobTitleCode":"","ProfessionTitle":"","ProfessionRankCode":"","ProfessionGrade":"","ProfessionTitleHiredOn":"2020-08-01","ProfessionTitleGetOn":"2020-08-01","ProfessionRankCodeOfHired":"正高","TeachingTitle":"333","TeachingTitleGetOn":"2020-08-01","SKillType":"1111","SKillLevelCode":"高级技师","SkillGetOn":"2020-08-01","SkillHiredOn":"2020-08-01","FEducationGradeCode":"博士研究生","FDegreeCode":"学士","FGraduateDate":"2020-08-01","FLengthOfEducation":"","FMajor":"计算机软件与技术","FSchoolName":"1","EducationGradeCode":"本科","DegreeCode":"学士","LengthOfEducation":"2","GraduateDate":"","SchoolName":"","MajorCategory":"执业医师","Major":"","MasterName":"1","StartWorkLengthDate":"2020-08-01","PractiseMajor":"","IDType":"","IDNumber":"12","Birthday":"2020-08-01","GenderCode":"男","Age":1,"PlaceOfNative":"","DistrictOfBirth":"","PlaceOfBirth":"","MarryStatusCode":"未婚","RaceCode":"","ResidenceCode":"","DwellAddress":"","IDAddress":"","HomeAddress":"","MobileNumber":"13333333334","WorkPhone":"","HomePhone":"","EmailAddress1":"lzy@phxinfo.com.cn","Fax":"","InternalEmailAddress":"","NurseLevel":"","NurseStart":"2020-08-01","NurseYears":"","HasNurseExtraSalary":"","ShoeSize":"","MealCardNumber":"1","BadgeNumber":"1","CertNo":"","CertDate":"2020-08-01","QualificationCertLevel":"","PhysicianLicenseCode":"","PracticingCertName":"","CertNoOfPractise":"","CertDateOfPractise":"2020-08-01","CadreSourceCode":"分配干部","StatusOfHouse":"有","HealthStatusCode":"健康","PartyCode":"","UnitPartyOfFrom":"","UnitOfParty":"","PartyUnitId":{"Id":"","Name":"","objectTypeCode":"31300","sobjectType":"31300"},"ApplyPartyDate":"2020-08-01","PartyActiveMemberDate":"","PartyRecommendBy":"","JoinPartyDate":"2020-08-01","PartyPreJoinDate":"","PartyUnitApprovedOn":"","PartySuperiorApprovedOn":"","PartyDisconnetDate":"2020-08-01","IsFlowPartyMem":"","PartyStatus":"正常","ScheduledRetire":"2023-08-10","Workinglife":2.0,"WorkingYears":2.0,"DeductWorkingLife":null,"Sequence":"","DisplayOrder":1000,"JobTitlePart":"","CarNo":"","EvalTypeCode":"专业技术","Language":"英语","BloodType":"A","LoginName":"jackliu","Pinyin":"ly","LabelCode":"","FilePlaceCode":"","IdentityCate":"职员","StatusCode":"未审批","OrganizationCode":"","RecruitMethod":"","QuitOn":"2023-07-05","QuitReason":"","Specialty":"","IsParentsSeparation":"","IsSpouseSeparation":"","Description":"","PercentOfFloatingSalary":1.10,"IsPaySalary":"是","ResidentStartYear":"","deptnum":"","PracticingScope":"","UnitPartyIn":"","JobTitlePartStart":"","sigle":""}}}],"context":{"globalValueProviders":[{"entityId":"$Record","values":{"objectMetadata":{"HREmployee":{"_nameField":"FullName","_entityLabel":"人员档案","_keyPrefix":"a0V"}}}}],"componentDefs":[{"lt":{"entityLabel":"人员档案","entityApiName":"HREmployee","layoutId":null,"name":null,"objectTypeCode":30020,"recordNameField":null,"keyPrefix":"a0V","isInlineEditable":true,"isUserLayout":false,"headerActions":[{"executionComponent":{"descriptor":null,"isEvent":true,"isClientSideCreatable":true,"componentName":null},"devNameOrId":"SaveEdit","requiresSelectionForUsage":false,"isSelected":true,"label":"保存","title":"保存","isRenderEntityIcon":false,"isVisible":false,"assertive":false,"section":"Page","icon":"/img/icon/t4v35/action/new_custom19_120.png","url":null,"isMassAction":false,"actionTypeEnum":"StandardButton"},{"executionComponent":{"descriptor":null,"isEvent":true,"isClientSideCreatable":true,"componentName":null},"devNameOrId":"SaveAndNew","requiresSelectionForUsage":false,"isSelected":false,"label":"保存并新建","title":"保存并新建","isRenderEntityIcon":false,"isVisible":false,"assertive":false,"section":"Page","icon":"/img/icon/t4v35/action/new_custom19_120.png","url":null,"isMassAction":false,"actionTypeEnum":"StandardButton"},{"executionComponent":{"descriptor":null,"isEvent":true,"isClientSideCreatable":true,"componentName":null},"devNameOrId":"CancelEdit","requiresSelectionForUsage":false,"isSelected":false,"label":"取消","title":"取消","isRenderEntityIcon":false,"isVisible":false,"assertive":false,"section":"Page","icon":"/img/icon/t4v35/action/new_custom19_120.png","url":null,"isMassAction":false,"actionTypeEnum":"StandardButton"}],"inlineEditActions":[],"sections":[{"sectionId":"6a49dd86-a30a-4ed9-ba5c-62cfc1780dab","labelKey":"Basic","title":"基本信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"工号","localId":"EmployeeNo","targetValue":"EmployeeNo","attributes":{"maxlength":10,"type":"S","dataType":null,"labelClass":null,"required":true,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"姓名","localId":"FullName","targetValue":"FullName","attributes":{"maxlength":100,"type":"S","dataType":null,"labelClass":null,"required":true,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"人员人事类别","localId":"ContractTypeCode","targetValue":"ContractTypeCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":true,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"人员岗位类别","localId":"EmpCategoryCode","targetValue":"EmpCategoryCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":true,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2},{"attributes":[{"label":"人员状态","localId":"StateCode","targetValue":"StateCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":true,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"人员子状态","localId":"SubStateCode","targetValue":"SubStateCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":3},{"attributes":[{"label":"一级部门","localId":"RootDeptId","targetValue":"RootDeptId","attributes":{"maxlength":36,"type":"O","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":10,"sObjectType":10,"onError":{}}},{"label":"部门","localId":"DeptId","targetValue":"DeptId","attributes":{"maxlength":36,"type":"O","dataType":null,"labelClass":null,"required":true,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":10,"sObjectType":10,"onError":{}}}],"rowNumber":4},{"attributes":[{"label":"参加工作时间","localId":"WorkStartDate","targetValue":"WorkStartDate","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":true,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"进院时间","localId":"JoinDate","targetValue":"JoinDate","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":true,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":5},{"attributes":[{"label":"人员类别2","localId":"CategoryCode","targetValue":"CategoryCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"岗位二级分类","localId":"PostSubCategory","targetValue":"PostSubCategory","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":6},{"attributes":[{"label":"身份证号","localId":"IDNumber","targetValue":"IDNumber","attributes":{"maxlength":30,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"出生年月","localId":"Birthday","targetValue":"Birthday","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":7},{"attributes":[{"label":"性别","localId":"GenderCode","targetValue":"GenderCode","attributes":{"maxlength":4,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"年龄","localId":"Age","targetValue":"Age","attributes":{"maxlength":18,"type":"N","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":8},{"attributes":[{"label":"出生地","localId":"PlaceOfBirth","targetValue":"PlaceOfBirth","attributes":{"maxlength":10,"type":"Province","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"籍贯地区","localId":"DistrictOfBirth","targetValue":"DistrictOfBirth","attributes":{"maxlength":255,"type":"Province","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":9},{"attributes":[{"label":"婚姻状态","localId":"MarryStatusCode","targetValue":"MarryStatusCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"民族","localId":"RaceCode","targetValue":"RaceCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":10},{"attributes":[{"label":"户口性质","localId":"ResidenceCode","targetValue":"ResidenceCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"人员来源","localId":"PeopleSourceCode","targetValue":"PeopleSourceCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":11},{"attributes":[{"label":"是否双肩挑","localId":"IsMultipleJob","targetValue":"IsMultipleJob","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"是中层","localId":"IsMiddleLevel","targetValue":"IsMiddleLevel","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":12},{"attributes":[{"label":"住房情况","localId":"StatusOfHouse","targetValue":"StatusOfHouse","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"干部录聘来源","localId":"CadreSourceCode","targetValue":"CadreSourceCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":13},{"attributes":[{"label":"饭卡号","localId":"MealCardNumber","targetValue":"MealCardNumber","attributes":{"maxlength":1,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"胸卡号","localId":"BadgeNumber","targetValue":"BadgeNumber","attributes":{"maxlength":100,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":14},{"attributes":[{"label":"档案存放","localId":"FilePlaceCode","targetValue":"FilePlaceCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"显示顺序","localId":"DisplayOrder","targetValue":"DisplayOrder","attributes":{"maxlength":18,"type":"N","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":15},{"attributes":[{"label":"科员等级","localId":"StaffLevel","targetValue":"StaffLevel","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":16}]},{"sectionId":"15d271c6-5556-48ed-8074-9afab168f9e5","labelKey":"Salary ","title":"薪资","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"薪资岗位类别","localId":"SalaryPostCategory","targetValue":"SalaryPostCategory","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"薪资岗位级别","localId":"SalaryPostCode","targetValue":"SalaryPostCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"薪级别","localId":"SalaryLevel","targetValue":"SalaryLevel","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"工资编号","localId":"SalaryNo","targetValue":"SalaryNo","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2},{"attributes":[{"label":"薪资岗位设置日期","localId":"SalaryPostStart","targetValue":"SalaryPostStart","attributes":{"maxlength":10,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":3}]},{"sectionId":"49b5ae46-4bbd-483e-8e9b-f40f69a52ad8","labelKey":"Education Information","title":"教育信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"第一学历","localId":"FEducationGradeCode","targetValue":"FEducationGradeCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":true,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"第一学历学位","localId":"FDegreeCode","targetValue":"FDegreeCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"第一学历毕业时间","localId":"FGraduateDate","targetValue":"FGraduateDate","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"第一学历学制","localId":"FLengthOfEducation","targetValue":"FLengthOfEducation","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2},{"attributes":[{"label":"第一学历专业","localId":"FMajor","targetValue":"FMajor","attributes":{"maxlength":100,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"第一学历学校","localId":"FSchoolName","targetValue":"FSchoolName","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":3},{"attributes":[{"label":"最高学历","localId":"EducationGradeCode","targetValue":"EducationGradeCode","attributes":{"maxlength":50,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"最高学位","localId":"DegreeCode","targetValue":"DegreeCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":4},{"attributes":[{"label":"最高学历专业","localId":"Major","targetValue":"Major","attributes":{"maxlength":100,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"最高学历学制","localId":"LengthOfEducation","targetValue":"LengthOfEducation","attributes":{"maxlength":18,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":5},{"attributes":[{"label":"最高学历毕业时间","localId":"GraduateDate","targetValue":"GraduateDate","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"最高学历学校","localId":"SchoolName","targetValue":"SchoolName","attributes":{"maxlength":100,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":6},{"attributes":[{"label":"最高学历专业类别","localId":"MajorCategory","targetValue":"MajorCategory","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"导师姓名","localId":"MasterName","targetValue":"MasterName","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":7}]},{"sectionId":"d27baf37-57ab-46cb-a5af-b75e542ec739","labelKey":"Job Information","title":"职务信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"职务","localId":"JobTitle","targetValue":"JobTitle","attributes":{"maxlength":100,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"职务级别","localId":"JobTitleLevelCode","targetValue":"JobTitleLevelCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"管理职务名称","localId":"JobTitleCode","targetValue":"JobTitleCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"职务任职时间","localId":"JobTitleStart","targetValue":"JobTitleStart","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2}]},{"sectionId":"a526ad5e-fd26-47ac-8b22-b0af00c6b94b","labelKey":"Profession","title":"专业技术","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"技术职务名称","localId":"ProfessionTitle","targetValue":"ProfessionTitle","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"职称级别","localId":"ProfessionRankCode","targetValue":"ProfessionRankCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"任职职称时间","localId":"ProfessionTitleHiredOn","targetValue":"ProfessionTitleHiredOn","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"职称岗位等级（停）","localId":"ProfessionGrade","targetValue":"ProfessionGrade","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2},{"attributes":[{"label":"取得职称时间","localId":"ProfessionTitleGetOn","targetValue":"ProfessionTitleGetOn","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"聘任职称级别","localId":"ProfessionRankCodeOfHired","targetValue":"ProfessionRankCodeOfHired","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":3}]},{"sectionId":"a84c6519-2c93-4a03-b610-9a9e2ffb4837","labelKey":"Skill","title":"工勤","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"技术工种","localId":"SKillType","targetValue":"SKillType","attributes":{"maxlength":255,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"技术技能级别","localId":"SKillLevelCode","targetValue":"SKillLevelCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"取得技能时间","localId":"SkillGetOn","targetValue":"SkillGetOn","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"技能聘任时间","localId":"SkillHiredOn","targetValue":"SkillHiredOn","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2}]},{"sectionId":"77cc2f40-e4ad-4afe-a0e2-377489aea4ae","labelKey":"Worker","title":"编制岗位","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"岗位类别","localId":"PostCategoryCode","targetValue":"PostCategoryCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"岗位级别","localId":"PostLevelCode","targetValue":"PostLevelCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"入编时间","localId":"EstablishedOn","targetValue":"EstablishedOn","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"考核类别","localId":"EvalTypeCode","targetValue":"EvalTypeCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2},{"attributes":[{"label":"岗位","localId":"PostId","targetValue":"PostId","attributes":{"maxlength":36,"type":"Y","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":30010,"sObjectType":30010,"onError":{}}}],"rowNumber":3}]},{"sectionId":"46c8e617-bce8-46ba-82a9-2f8ed16d8727","labelKey":"Education Prof","title":"教育职称","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"教学职称","localId":"TeachingTitle","targetValue":"TeachingTitle","attributes":{"maxlength":255,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"教学职称取得时间","localId":"TeachingTitleGetOn","targetValue":"TeachingTitleGetOn","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"外语","localId":"Language","targetValue":"Language","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2}]},{"sectionId":"2bc82b7b-65c0-4069-a6a6-fc259a89eb0c","labelKey":"Certification","title":"证书信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"资格证书编码","localId":"CertNo","targetValue":"CertNo","attributes":{"maxlength":18,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"资格证书批准日期","localId":"CertDate","targetValue":"CertDate","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"执业证书编码","localId":"CertNoOfPractise","targetValue":"CertNoOfPractise","attributes":{"maxlength":18,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"执业证书取得时间","localId":"CertDateOfPractise","targetValue":"CertDateOfPractise","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2},{"attributes":[{"label":"执业资格名称","localId":"PracticingCertName","targetValue":"PracticingCertName","attributes":{"maxlength":255,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"执业类别","localId":"PhysicianLicenseCode","targetValue":"PhysicianLicenseCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":3},{"attributes":[{"label":"资格证书级别","localId":"QualificationCertLevel","targetValue":"QualificationCertLevel","attributes":{"maxlength":50,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":4}]},{"sectionId":"9984b3ee-853b-4e8b-9ef4-a63b4a5cac0f","labelKey":"Contact Information","title":"联系信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"手机号码","localId":"MobileNumber","targetValue":"MobileNumber","attributes":{"maxlength":255,"type":"H","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"家庭电话","localId":"HomePhone","targetValue":"HomePhone","attributes":{"maxlength":255,"type":"H","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"家庭地址","localId":"HomeAddress","targetValue":"HomeAddress","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"居住地址","localId":"DwellAddress","targetValue":"DwellAddress","attributes":{"maxlength":200,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2},{"attributes":[{"label":"邮箱地址","localId":"EmailAddress1","targetValue":"EmailAddress1","attributes":{"maxlength":255,"type":"E","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"内部邮件地址","localId":"InternalEmailAddress","targetValue":"InternalEmailAddress","attributes":{"maxlength":255,"type":"E","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":3},{"attributes":[{"label":"办公电话","localId":"WorkPhone","targetValue":"WorkPhone","attributes":{"maxlength":255,"type":"H","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"传真","localId":"Fax","targetValue":"Fax","attributes":{"maxlength":255,"type":"H","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":4},{"attributes":[{"label":"证件地址","localId":"IDAddress","targetValue":"IDAddress","attributes":{"maxlength":200,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":5}]},{"sectionId":"74ba0984-b983-44d7-a94c-22156713845a","labelKey":"Nurse Information","title":"护理信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"护士层级","localId":"NurseLevel","targetValue":"NurseLevel","attributes":{"maxlength":50,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"护龄开始时间","localId":"NurseStart","targetValue":"NurseStart","attributes":{"maxlength":18,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"护士鞋号","localId":"ShoeSize","targetValue":"ShoeSize","attributes":{"maxlength":20,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"享受护士10%","localId":"HasNurseExtraSalary","targetValue":"HasNurseExtraSalary","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2}]},{"sectionId":"b26a7822-bcd2-4ab0-a10e-dea346f844ae","labelKey":"Party","title":"党员信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"政治面貌","localId":"PartyCode","targetValue":"PartyCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"入党时间","localId":"JoinPartyDate","targetValue":"JoinPartyDate","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"申请入党时间","localId":"ApplyPartyDate","targetValue":"ApplyPartyDate","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"现所在党支部","localId":"UnitOfParty","targetValue":"UnitOfParty","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2},{"attributes":[{"label":"入党介绍人","localId":"PartyRecommendBy","targetValue":"PartyRecommendBy","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":3},{"attributes":[{"label":"确定积极分子时间","localId":"PartyActiveMemberDate","targetValue":"PartyActiveMemberDate","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"列为发展对象时间","localId":"PartyPreJoinDate","targetValue":"PartyPreJoinDate","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":4}]},{"sectionId":"f2c66561-9cd0-4a5e-a3e8-e17ea9b848db","labelKey":"Category Information","title":"分类","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"人员标识","localId":"LabelCode","targetValue":"LabelCode","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"所属序列","localId":"Sequence","targetValue":"Sequence","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"人员库","localId":"EmpPool","targetValue":"EmpPool","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"财务人员类别","localId":"CategoryOfFinance","targetValue":"CategoryOfFinance","attributes":{"maxlength":10,"type":"L","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2}]},{"sectionId":"22cd6004-e891-455d-95fa-f20767c99838","labelKey":"Probation Information","title":"试用信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"转正时间","localId":"EndProbationOn","targetValue":"EndProbationOn","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1}]},{"sectionId":"709ed701-e6ba-4161-8255-acbcf43c82f8","labelKey":"Quit Information","title":"离职信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"拟退休日期","localId":"ScheduledRetire","targetValue":"ScheduledRetire","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"退离日期","localId":"QuitOn","targetValue":"QuitOn","attributes":{"maxlength":8,"type":"D","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"离职原因","localId":"QuitReason","targetValue":"QuitReason","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2}]},{"sectionId":"9e008c64-0816-4bdd-b766-bc12dcea8e8b","labelKey":"Health Information","title":"健康信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"健康状态","localId":"HealthStatusCode","targetValue":"HealthStatusCode","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"血型","localId":"BloodType","targetValue":"BloodType","attributes":{"maxlength":10,"type":"DT","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1}]},{"sectionId":"cd48459e-12ce-450a-90b3-a5895214cdbb","labelKey":"Other Information","title":"其它","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"从事专业方向","localId":"PractiseMajor","targetValue":"PractiseMajor","attributes":{"maxlength":255,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"姓名首拼音","localId":"Pinyin","targetValue":"Pinyin","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"车牌号码","localId":"CarNo","targetValue":"CarNo","attributes":{"maxlength":20,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"用户名","localId":"LoginName","targetValue":"LoginName","attributes":{"maxlength":50,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2}]},{"sectionId":"d494a5b0-7d7e-4152-9cc5-0dabb22c3853","labelKey":"Basic","title":"基本信息","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[]},{"sectionId":"f21c7b28-a489-4963-99aa-cd7291571815","labelKey":"Stat","title":"统计","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"工作年限","localId":"WorkingYears","targetValue":"WorkingYears","attributes":{"maxlength":18,"type":"N","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}},{"label":"工龄","localId":"Workinglife","targetValue":"Workinglife","attributes":{"maxlength":18,"type":"N","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"工龄减年限","localId":"DeductWorkingLife","targetValue":"DeductWorkingLife","attributes":{"maxlength":18,"type":"N","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2}]},{"sectionId":"47da5f2b-4a82-425f-897a-4c7ba4232ed7","labelKey":"Remark","title":"备注","showHeader":true,"isCollapsed":false,"isCollapsible":false,"rows":[{"attributes":[{"label":"工资备注","localId":"SalaryMemo","targetValue":"SalaryMemo","attributes":{"maxlength":100,"type":"S","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":1},{"attributes":[{"label":"备注","localId":"Description","targetValue":"Description","attributes":{"maxlength":255,"type":"X","dataType":null,"labelClass":null,"required":false,"readonly":false,"alwaysDisplayed":true,"alwaysReadonly":false,"referencedEntityObjectTypeCode":0,"sObjectType":0,"onError":{}}}],"rowNumber":2}]}],"localizedTitle":"人员档案","lookupAttributes":[{"objectTypeCode":10,"name":"RootDeptId"},{"objectTypeCode":10,"name":"DeptId"},{"objectTypeCode":30010,"name":"PostId"}]}}],"compactLayoutFields":[{"name":"FullName","label":"姓名"},{"name":"EmployeeNo","label":"工号"},{"name":"DeptId","label":"部门"},{"name":"ContractTypeCode","label":"人员人事类别"},{"name":"EmpCategoryCode","label":"人员岗位类别"},{"name":"StateCode","label":"人员状态"}]}};
    data.record = data1.actions[0].returnValue.record;
    data.list.sections = data1.context.componentDefs[0].lt.sections
    for (var i = 0; i < data.list.sections.length; i++) {
        if (data.list.sections[i].isCollapsed) {
            data.activesections.push(i)
        }
    }
    data.detailviewloading = false;
    let data2={"actions":[{"id":"","state":"SUCCESS","returnValue":{"parentEntityLabel":"","parentEntityLabelPlural":null,"relatedLists":[{"id":"RL__HREmployeeEducation","relatedListId":"5e4441ae-96df-4e3b-b014-0faef6d1b814","relatedListApiName":"HREmployeeEducations","label":"教育经历","relatedSObject":"HREmployeeEducation","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30023,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0W","isHiddenByDefault":false},{"id":"RL__HREmployeeWorkExperience","relatedListId":"62e530a5-d4e2-4821-9ffe-6f61fefa93c4","relatedListApiName":"HREmployeeWorkExperiences","label":"工作经历","relatedSObject":"HREmployeeWorkExperience","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30025,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0Y","isHiddenByDefault":false},{"id":"RL__HREmployeeTraining","relatedListId":"f433f74c-8e1e-487d-9121-f6a3a3d9e431","relatedListApiName":"HREmployeeTrainings","label":"进修培训","relatedSObject":"HREmployeeTraining","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30024,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0X","isHiddenByDefault":false},{"id":"RL__HREmployeeJobTransfer","relatedListId":"dabf9329-482f-430c-8329-e6980cd57c7a","relatedListApiName":"HREmployeeJobTransfers","label":"部门变动","relatedSObject":"HREmployeeJobTransfer","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30027,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0O","isHiddenByDefault":false},{"id":"RL__HREmployeeProfessionTitle","relatedListId":"0ece1298-51ea-4585-b28f-429063cb192c","relatedListApiName":"HREmployeeProfessionTitles","label":"职称变动","relatedSObject":"HREmployeeProfessionTitle","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30034,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0J","isHiddenByDefault":false},{"id":"RL__HREmployeeReward","relatedListId":"113c1a50-3386-48a3-9bbb-4bd2bea2e9c2","relatedListApiName":"HREmployeeRewards","label":"奖励情况","relatedSObject":"HREmployeeReward","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30028,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a1N","isHiddenByDefault":false},{"id":"RL__HREmpPunishment","relatedListId":"753c0b32-8e5d-47ad-9a36-5f2ff856b980","relatedListApiName":"HREmpPunishments","label":"惩罚情况","relatedSObject":"HREmpPunishment","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30055,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a1O","isHiddenByDefault":false},{"id":"RL__HREmployeeBook","relatedListId":"24862f9e-28b9-4f8e-8061-8ee6ca0ae05e","relatedListApiName":"HREmployeeBooks","label":"出版专著","relatedSObject":"HREmployeeBook","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30026,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0Z","isHiddenByDefault":false},{"id":"RL__HREmployeeJobTitle","relatedListId":"eb86bda0-1825-4930-94fe-bad3e710b89f","relatedListApiName":"HREmployeeJobTitles","label":"职务变动","relatedSObject":"HREmployeeJobTitle","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30030,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0f","isHiddenByDefault":false},{"id":"RL__HREmployeeCertificate","relatedListId":"eb9e9928-a4ed-4b93-89cc-57a02c1cb56d","relatedListApiName":"HREmployeeCertificates","label":"资格证书","relatedSObject":"HREmployeeCertificate","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30029,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0e","isHiddenByDefault":false},{"id":"RL__HREmployeeProfessionSkill","relatedListId":"c4135d51-6661-4bfc-9419-88dedcc06512","relatedListApiName":"HREmployeeProfessionSkills","label":"工人技术职务","relatedSObject":"HREmployeeProfessionSkill","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30031,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0g","isHiddenByDefault":false},{"id":"RL__HREmpMedicalIncident","relatedListId":"371ab944-4e1b-4c5a-a73b-ec617d1bc5b3","relatedListApiName":"HREmpMedicalIncidents","label":"医疗事故","relatedSObject":"HREmpMedicalIncident","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30286,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a1T","isHiddenByDefault":false},{"id":"RL__HREmployeeTeachingTitle","relatedListId":"a7077ad9-8b47-43c5-98b1-d02e121715d7","relatedListApiName":"HREmployeeTeachingTitles","label":"教学职称","relatedSObject":"HREmployeeTeachingTitle","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30035,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0I","isHiddenByDefault":false},{"id":"RL__HREmpLanguage","relatedListId":"e32c1a68-69b6-44b4-943d-6b2f357fd834","relatedListApiName":"HREmpLanguages","label":"语言能力","relatedSObject":"HREmpLanguage","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30054,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a1C","isHiddenByDefault":false},{"id":"RL__HREmpPartyApply","relatedListId":"af258e54-b6dd-4e25-882f-7109c2f57277","relatedListApiName":"HREmpPartyApplys","label":"政治面貌","relatedSObject":"HREmpPartyApply","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30046,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0L","isHiddenByDefault":false},{"id":"RL__HREmployeeAcademicGroup","relatedListId":"ef359eb7-9adb-4f3b-9400-909b4885679e","relatedListApiName":"HREmployeeAcademicGroups","label":"社会兼职","relatedSObject":"HREmployeeAcademicGroup","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30032,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0h","isHiddenByDefault":false},{"id":"RL__HREmpWorkingyearsAdjust","relatedListId":"3624d879-9d7c-439a-b4cd-9a486d55ad80","relatedListApiName":"HREmpWorkingyearsAdjusts","label":"工龄调整","relatedSObject":"HREmpWorkingyearsAdjust","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30058,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a2L","isHiddenByDefault":false},{"id":"RL__HREmployeeFamily","relatedListId":"a6417a68-ee60-4188-98dc-5a6c0c8ebef0","relatedListApiName":"HREmployeeFamilys","label":"家庭成员及社会关系","relatedSObject":"HREmployeeFamily","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30051,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0C","isHiddenByDefault":false},{"id":"RL__HREmpMedicalComplaint","relatedListId":"d4abd470-b599-4729-ac47-de389ebfcc4d","relatedListApiName":"HREmpMedicalComplaints","label":"医疗投诉","relatedSObject":"HREmpMedicalComplaint","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30056,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a1B","isHiddenByDefault":false},{"id":"RL__HREmpRound","relatedListId":"d6cf996a-1fe0-4d82-9017-fd89d9cf52a5","relatedListApiName":"HREmpRounds","label":"科室轮转","relatedSObject":"HREmpRound","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30033,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a3C","isHiddenByDefault":false},{"id":"RL__HREmployeePartyJobTitle","relatedListId":"1db4bc32-b7be-4605-b066-1a4ec4546dfd","relatedListApiName":"HREmployeePartyJobTitles","label":"党内职务","relatedSObject":"HREmployeePartyJobTitle","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30052,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a0K","isHiddenByDefault":false},{"id":"RL__HREmployeeSKill","relatedListId":"728c90ca-d038-40d6-b109-2cfd2772c70b","relatedListApiName":"HREmployeeSKills","label":"技能","relatedSObject":"HREmployeeSKill","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30057,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a1L","isHiddenByDefault":false},{"id":"RL__HREmployeeTalent","relatedListId":"fe54e805-1582-41ab-bf45-7285e2d56153","relatedListApiName":"HREmployeeTalents","label":"人才","relatedSObject":"HREmployeeTalent","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30053,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a1K","isHiddenByDefault":false},{"id":"RL__HREmpSendOut","relatedListId":"d70d8ca5-de41-4a01-a2aa-780ed0dbe76a","relatedListApiName":"HREmpSendOuts","label":"外派","relatedSObject":"HREmpSendOut","relatedObjectAttributeName":"EmployeeId","showActions":true,"objectTypeCode":30124,"themeIcon":"/img/icon/t4v35/standard/case_120.png","themeColor":"themeColor","entityKeyPrefix":"a3B","isHiddenByDefault":false}]},"error":[]}],"context":{"globalValueProviders":null,"picklistValuesMap":{},"appContextUser":{"userId":null,"name":null,"isAdmin":false,"token":null},"enableAccessChecks":false}};
    data.relatedLists = data2.actions[0].returnValue.relatedLists;
    let data3={"actions":[{"id":"","state":"SUCCESS","returnValue":{"recordIds":{"HREmployeeEducation":{"recordIds":["bfdfe561-ca11-4730-9287-4bdc38d712be"],"fields":[]},"HREmployeeWorkExperience":{"recordIds":[],"fields":[]},"HREmployeeTraining":{"recordIds":["26810758-03d8-44f3-ad4c-edb12308e8e6"],"fields":[]},"HREmployeeJobTransfer":{"recordIds":["3babf892-6970-465f-bece-34a0ce931d89","ac9b54e6-28b4-4c06-8b22-da4bb880812c","5bf83bb1-de00-46d0-b7cc-fefa493330b2"],"fields":[]},"HREmployeeProfessionTitle":{"recordIds":[],"fields":[]},"HREmployeeReward":{"recordIds":[],"fields":[]},"HREmpPunishment":{"recordIds":[],"fields":[]},"HREmployeeBook":{"recordIds":["12097f4b-0410-4f8e-b353-955eec5f5fb9","8c566978-9484-4da0-82e7-c25390066b37"],"fields":[]},"HREmployeeJobTitle":{"recordIds":[],"fields":[]},"HREmployeeCertificate":{"recordIds":["d2cf1d88-1130-497e-8cdf-020623b7888b","6e066554-bec7-4bbb-9f6f-0ab446620f50","98d57570-f277-4d5a-8732-2ece4aa97695","bbe2c38d-bce8-4d3b-9d48-80d2697c4661","734d8815-395d-44bc-b4f1-9905df77f852","adc4d758-976a-4431-9059-b985dcaaab84","fae161ca-d3a8-449a-9395-cd4ed018a6d7","71e4a379-0146-4743-badc-f09e359e117e"],"fields":[]},"HREmployeeProfessionSkill":{"recordIds":[],"fields":[]},"HREmpMedicalIncident":{"recordIds":[],"fields":[]},"HREmployeeTeachingTitle":{"recordIds":[],"fields":[]},"HREmpLanguage":{"recordIds":[],"fields":[]},"HREmpPartyApply":{"recordIds":["cfce01df-a07d-4ffa-9e63-0ce5be3eafe0"],"fields":[]},"HREmployeeAcademicGroup":{"recordIds":["a2c7427c-adbc-4e76-b07b-102c3a72bccf","727470ed-df71-43e7-927b-6857ab4603ea","4219797c-01a0-4a67-8fee-7695f542c4a7"],"fields":[]},"HREmpWorkingyearsAdjust":{"recordIds":[],"fields":[]},"HREmployeeFamily":{"recordIds":["ede1c179-fe19-4107-849d-a39fd91cc169","8b5c0e11-589a-4727-a445-5c9b44d2bfdd","e48f7a70-5c00-43da-9804-dfbf3d45471b","1ed3d612-153d-4d90-b9ca-40427c3c3032"],"fields":[]},"HREmpMedicalComplaint":{"recordIds":["ae718649-8fbd-4b09-9ba2-4bc75784904d","32a18fee-9b9b-4f70-a766-32cac14bea9d","51cf6146-e576-4534-a640-c5cbc9b9e703","08dc3edf-5c5f-46d6-a3eb-a5fdc3a06304","08b81ac3-6199-48b9-a1ae-bb6b9d286c52","832900da-a6bf-48b8-9601-e8841ae428cc","ff8b01f6-81c2-486c-a0cc-bbe5d27d2e5d"],"fields":[]},"HREmpRound":{"recordIds":["152bdac1-c00e-49c5-affa-acc50f5dbba5"],"fields":[]},"HREmployeePartyJobTitle":{"recordIds":[],"fields":[]},"HREmployeeSKill":{"recordIds":[],"fields":[]},"HREmployeeTalent":{"recordIds":[],"fields":[]},"HREmpSendOut":{"recordIds":[],"fields":[]}},"listItems":{"HREmployeeEducation":[{"field":"DegreeCode","title":"学位","isSortable":false,"dType":"DT","sobjectType":0},{"field":"EducationGradeCode","title":"学历","isSortable":false,"dType":"DT","sobjectType":0},{"field":"StartDate","title":"入学时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"EndDate","title":"毕业时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"SchoolingLength","title":"学制","isSortable":false,"dType":"L","sobjectType":0},{"field":"Name","title":"学校","isSortable":false,"dType":"S","sobjectType":0},{"field":"ModifiedBy","title":"修改人","isSortable":false,"dType":"U","sobjectType":8}],"HREmployeeWorkExperience":[{"field":"WorkMajor","title":"从事工作","isSortable":false,"dType":"S","sobjectType":0},{"field":"EndDate","title":"结束时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"StartDate","title":"开始时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"JobTitle","title":"担任职务","isSortable":false,"dType":"S","sobjectType":0},{"field":"EndorsePhone","title":"证明人电话","isSortable":false,"dType":"H","sobjectType":0},{"field":"Name","title":"工作单位","isSortable":false,"dType":"S","sobjectType":0}],"HREmployeeTraining":[{"field":"EndDate","title":"培训结束时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"IssueDate","title":"发证日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"CertificateName","title":"证书名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"Name","title":"项目名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"StartDate","title":"培训开始时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"Location","title":"培训地点","isSortable":false,"dType":"S","sobjectType":0}],"HREmployeeJobTransfer":[{"field":"TransferDate","title":"调入时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"FromDept","title":"调出部门","isSortable":false,"dType":"O","sobjectType":10},{"field":"StatusCode","title":"状态","isSortable":false,"dType":"L","sobjectType":0},{"field":"ToDept","title":"调入部门","isSortable":false,"dType":"O","sobjectType":10},{"field":"Name","title":"名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"FromPost","title":"原来职务","isSortable":false,"dType":"S","sobjectType":0},{"field":"ToPost","title":"调入职务","isSortable":false,"dType":"S","sobjectType":0}],"HREmployeeProfessionTitle":[{"field":"FirstStart","title":"首聘此专技岗时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"ProfessionRankCode","title":"职称级别","isSortable":false,"dType":"L","sobjectType":0},{"field":"EndDate","title":"聘任终止时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"StartDate","title":"聘任起始时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"QualificationSource","title":"取得资格途径","isSortable":false,"dType":"S","sobjectType":0},{"field":"Name","title":"职称名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"ProfessionTitleGetOn","title":"取得资格批准时间","isSortable":false,"dType":"D","sobjectType":0}],"HREmployeeReward":[{"field":"RewardProject","title":"获奖项目","isSortable":false,"dType":"S","sobjectType":0},{"field":"Name","title":"奖励名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"Description","title":"奖励原因","isSortable":false,"dType":"J","sobjectType":0},{"field":"RewardDate","title":"奖励时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"RewardLevel","title":"奖励级别","isSortable":false,"dType":"DT","sobjectType":0},{"field":"RewardOrg","title":"颁发单位","isSortable":false,"dType":"S","sobjectType":0}],"HREmpPunishment":[{"field":"CreatedOn","title":"创建时间","isSortable":false,"dType":"F","sobjectType":0},{"field":"CreatedBy","title":"创建人","isSortable":false,"dType":"U","sobjectType":8},{"field":"PunishedOn","title":"惩罚日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"Name","title":"名称","isSortable":false,"dType":"S","sobjectType":0}],"HREmployeeBook":[{"field":"CreatedOn","title":"创建时间","isSortable":false,"dType":"F","sobjectType":0},{"field":"CreatedBy","title":"创建人","isSortable":false,"dType":"U","sobjectType":8},{"field":"Magazine","title":"刊物名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"Publisher","title":"出版商","isSortable":false,"dType":"S","sobjectType":0},{"field":"Name","title":"题目","isSortable":false,"dType":"S","sobjectType":0},{"field":"PublishDate","title":"出版时间","isSortable":false,"dType":"D","sobjectType":0}],"HREmployeeJobTitle":[{"field":"Name","title":"职务名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"JobTitleStart","title":"任职开始时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"JobTitleEnd","title":"结束日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"JobTitleLevelCode","title":"职务级别","isSortable":false,"dType":"L","sobjectType":0},{"field":"DocumentNo","title":"任职文号","isSortable":false,"dType":"S","sobjectType":0}],"HREmployeeCertificate":[{"field":"IssuingAuthority","title":"发证机关","isSortable":false,"dType":"S","sobjectType":0},{"field":"CertificateNo","title":"资格证书编号","isSortable":false,"dType":"S","sobjectType":0},{"field":"CreatedBy","title":"创建人","isSortable":false,"dType":"U","sobjectType":8},{"field":"CertificateDate","title":"批准日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"ExpiredOn","title":"到期时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"Name","title":"资格名称 ","isSortable":false,"dType":"S","sobjectType":0}],"HREmployeeProfessionSkill":[{"field":"Name","title":"技能名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"SKillLevelCode","title":"技能级别","isSortable":false,"dType":"L","sobjectType":0},{"field":"IssueOrganization","title":"批准技术职务单位名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"GetOn","title":"取得技能时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"StartDate","title":"技术职务起始时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"EndDate","title":"技术职务终止时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"HiredOn","title":"聘用勤岗时间","isSortable":false,"dType":"D","sobjectType":0}],"HREmpMedicalIncident":[],"HREmployeeTeachingTitle":[{"field":"Name","title":"教学职称名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"StartTime","title":"聘任开始时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"EndTime","title":"结束时间","isSortable":false,"dType":"D","sobjectType":0}],"HREmpLanguage":[{"field":"Name","title":"语言","isSortable":false,"dType":"S","sobjectType":0}],"HREmpPartyApply":[{"field":"JoinPartyDate","title":"入党时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"Name","title":"党派名称","isSortable":false,"dType":"S","sobjectType":0}],"HREmployeeAcademicGroup":[{"field":"Name","title":"团体名称 ","isSortable":false,"dType":"S","sobjectType":0},{"field":"StartDate","title":"任职开始时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"CreatedBy","title":"创建人","isSortable":false,"dType":"U","sobjectType":8},{"field":"JobTitle","title":"担任职务","isSortable":false,"dType":"S","sobjectType":0},{"field":"CreatedOn","title":"创建时间","isSortable":false,"dType":"F","sobjectType":0}],"HREmpWorkingyearsAdjust":[{"field":"DeductYears","title":"减去工龄","isSortable":false,"dType":"N","sobjectType":0},{"field":"ChanagedOn","title":"减龄日期","isSortable":false,"dType":"D","sobjectType":0}],"HREmployeeFamily":[{"field":"Birthday","title":"出生日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"CreatedBy","title":"创建人","isSortable":false,"dType":"U","sobjectType":8},{"field":"JoinParty","title":"政治面貌","isSortable":false,"dType":"DT","sobjectType":0},{"field":"Name","title":"姓名","isSortable":false,"dType":"S","sobjectType":0},{"field":"Workfor","title":"工作单位与职务","isSortable":false,"dType":"S","sobjectType":0},{"field":"EducationGrade","title":"文化程度","isSortable":false,"dType":"S","sobjectType":0},{"field":"FamilyRelationCode","title":"称谓","isSortable":false,"dType":"DT","sobjectType":0}],"HREmpMedicalComplaint":[{"field":"ComplaintedOn","title":"投诉日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"Name","title":"患者姓名","isSortable":false,"dType":"S","sobjectType":0}],"HREmpRound":[{"field":"EndTime","title":"结束日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"BusinessUnitId","title":"部门","isSortable":false,"dType":"O","sobjectType":10},{"field":"StartTime","title":"开始时间","isSortable":false,"dType":"D","sobjectType":0},{"field":"Name","title":"名称","isSortable":false,"dType":"S","sobjectType":0}],"HREmployeePartyJobTitle":[{"field":"JobStart","title":"开始日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"Name","title":"名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"JobEnd","title":"结束日期","isSortable":false,"dType":"D","sobjectType":0}],"HREmployeeSKill":[{"field":"Name","title":"名称","isSortable":false,"dType":"S","sobjectType":0},{"field":"CreatedOn","title":"创建时间","isSortable":false,"dType":"F","sobjectType":0},{"field":"CreatedBy","title":"创建人","isSortable":false,"dType":"U","sobjectType":8},{"field":"LevelCode","title":"熟练程度","isSortable":false,"dType":"DT","sobjectType":0}],"HREmployeeTalent":[{"field":"SourceCode","title":"人才级别","isSortable":false,"dType":"DT","sobjectType":0},{"field":"Organization","title":"批准机构","isSortable":false,"dType":"S","sobjectType":0},{"field":"CreatedBy","title":"创建人","isSortable":false,"dType":"U","sobjectType":8},{"field":"ApprovedOn","title":"批准日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"Amount","title":"经费","isSortable":false,"dType":"N","sobjectType":0},{"field":"Name","title":"人才名称","isSortable":false,"dType":"S","sobjectType":0}],"HREmpSendOut":[{"field":"OutStart","title":"开始日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"OutEnd","title":"截止日期","isSortable":false,"dType":"D","sobjectType":0},{"field":"Name","title":"单位","isSortable":false,"dType":"S","sobjectType":0},{"field":"OutTypeCode","title":"外派类型","isSortable":false,"dType":"L","sobjectType":0},{"field":"Location","title":"地址","isSortable":false,"dType":"S","sobjectType":0}]},"records":{"bfdfe561-ca11-4730-9287-4bdc38d712be":{"HREmployeeEducation":{"record":{"apiName":null,"eTag":null,"fields":{"DegreeCode":{"displayValue":"","value":""},"EducationGradeCode":{"displayValue":"本科","value":"本科"},"StartDate":{"displayValue":"2020-09-25","value":"2020-09-25 00:00:00"},"EndDate":{"displayValue":"2020-09-25","value":"2020-09-25 00:00:00"},"SchoolingLength":{"displayValue":"","value":""},"Name":{"displayValue":"啊啊啊12345","value":"啊啊啊12345"},"ModifiedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"}},"id":"bfdfe561-ca11-4730-9287-4bdc38d712be","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"26810758-03d8-44f3-ad4c-edb12308e8e6":{"HREmployeeTraining":{"record":{"apiName":null,"eTag":null,"fields":{"EndDate":{"displayValue":"2024-08-08","value":"2024-08-08 00:00:00"},"IssueDate":{"displayValue":"","value":""},"CertificateName":{"displayValue":"","value":""},"Name":{"displayValue":"住院医师培训","value":"住院医师培训"},"StartDate":{"displayValue":"2024-08-01","value":"2024-08-01 00:00:00"},"Location":{"displayValue":"","value":""}},"id":"26810758-03d8-44f3-ad4c-edb12308e8e6","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"3babf892-6970-465f-bece-34a0ce931d89":{"HREmployeeJobTransfer":{"record":{"apiName":null,"eTag":null,"fields":{"TransferDate":{"displayValue":"2024-02-01","value":"2024-02-01 00:00:00"},"FromDept":{"displayValue":"人力资源处","value":"a97909d8-d097-4ae0-92e7-e1c5aa790400"},"StatusCode":{"displayValue":"审核生效","value":"3"},"ToDept":{"displayValue":"信息中心","value":"63a1820f-e332-4c71-bfb5-39677c7ecdd8"},"Name":{"displayValue":"刘优","value":"刘优"},"FromPost":{"displayValue":"","value":""},"ToPost":{"displayValue":"","value":""}},"id":"3babf892-6970-465f-bece-34a0ce931d89","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"ac9b54e6-28b4-4c06-8b22-da4bb880812c":{"HREmployeeJobTransfer":{"record":{"apiName":null,"eTag":null,"fields":{"TransferDate":{"displayValue":"2019-12-12","value":"2019-12-12 00:00:00"},"FromDept":{"displayValue":"信息中心","value":"63a1820f-e332-4c71-bfb5-39677c7ecdd8"},"StatusCode":{"displayValue":"审核生效","value":"3"},"ToDept":{"displayValue":"财务部2","value":"38518011-767e-4548-837d-5f8390bd5a4c"},"Name":{"displayValue":"","value":""},"FromPost":{"displayValue":"","value":""},"ToPost":{"displayValue":"","value":""}},"id":"ac9b54e6-28b4-4c06-8b22-da4bb880812c","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"5bf83bb1-de00-46d0-b7cc-fefa493330b2":{"HREmployeeJobTransfer":{"record":{"apiName":null,"eTag":null,"fields":{"TransferDate":{"displayValue":"2024-02-01","value":"2024-02-01 00:00:00"},"FromDept":{"displayValue":"信息中心","value":"63a1820f-e332-4c71-bfb5-39677c7ecdd8"},"StatusCode":{"displayValue":"审核生效","value":"3"},"ToDept":{"displayValue":"人力资源处","value":"a97909d8-d097-4ae0-92e7-e1c5aa790400"},"Name":{"displayValue":"刘优","value":"刘优"},"FromPost":{"displayValue":"","value":""},"ToPost":{"displayValue":"","value":""}},"id":"5bf83bb1-de00-46d0-b7cc-fefa493330b2","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"12097f4b-0410-4f8e-b353-955eec5f5fb9":{"HREmployeeBook":{"record":{"apiName":null,"eTag":null,"fields":{"CreatedOn":{"displayValue":"2024-06-06 12:16","value":"2024-06-06 12:16:04"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"Magazine":{"displayValue":"","value":""},"Publisher":{"displayValue":"","value":""},"Name":{"displayValue":"测试-关节功能障碍患者针灸推拿治疗的临床效果关节功能障碍患者针灸推拿治疗的临床效果","value":"测试-关节功能障碍患者针灸推拿治疗的临床效果关节功能障碍患者针灸推拿治疗的临床效果"},"PublishDate":{"displayValue":"","value":""}},"id":"12097f4b-0410-4f8e-b353-955eec5f5fb9","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"8c566978-9484-4da0-82e7-c25390066b37":{"HREmployeeBook":{"record":{"apiName":null,"eTag":null,"fields":{"CreatedOn":{"displayValue":"2024-06-06 14:35","value":"2024-06-06 14:35:05"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"Magazine":{"displayValue":"哈哈哈","value":"哈哈哈"},"Publisher":{"displayValue":"北京大学出版社","value":"北京大学出版社"},"Name":{"displayValue":"关于神经科学","value":"关于神经科学"},"PublishDate":{"displayValue":"2024-06-06","value":"2024-06-06 00:00:00"}},"id":"8c566978-9484-4da0-82e7-c25390066b37","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"d2cf1d88-1130-497e-8cdf-020623b7888b":{"HREmployeeCertificate":{"record":{"apiName":null,"eTag":null,"fields":{"IssuingAuthority":{"displayValue":"123","value":"123"},"CertificateNo":{"displayValue":"123123","value":"123123"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"CertificateDate":{"displayValue":"","value":""},"ExpiredOn":{"displayValue":"","value":""},"Name":{"displayValue":"213123","value":"213123"}},"id":"d2cf1d88-1130-497e-8cdf-020623b7888b","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"6e066554-bec7-4bbb-9f6f-0ab446620f50":{"HREmployeeCertificate":{"record":{"apiName":null,"eTag":null,"fields":{"IssuingAuthority":{"displayValue":"北京医学会","value":"北京医学会"},"CertificateNo":{"displayValue":"11","value":"11"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"CertificateDate":{"displayValue":"2023-07-01","value":"2023-07-01 00:00:00"},"ExpiredOn":{"displayValue":"2023-07-03","value":"2023-07-03 00:00:00"},"Name":{"displayValue":"11","value":"11"}},"id":"6e066554-bec7-4bbb-9f6f-0ab446620f50","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"98d57570-f277-4d5a-8732-2ece4aa97695":{"HREmployeeCertificate":{"record":{"apiName":null,"eTag":null,"fields":{"IssuingAuthority":{"displayValue":"北京医学会","value":"北京医学会"},"CertificateNo":{"displayValue":"113123","value":"113123"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"CertificateDate":{"displayValue":"","value":""},"ExpiredOn":{"displayValue":"","value":""},"Name":{"displayValue":"123666","value":"123666"}},"id":"98d57570-f277-4d5a-8732-2ece4aa97695","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"bbe2c38d-bce8-4d3b-9d48-80d2697c4661":{"HREmployeeCertificate":{"record":{"apiName":null,"eTag":null,"fields":{"IssuingAuthority":{"displayValue":"","value":""},"CertificateNo":{"displayValue":"123","value":"123"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"CertificateDate":{"displayValue":"","value":""},"ExpiredOn":{"displayValue":"","value":""},"Name":{"displayValue":"执业证书","value":"执业证书"}},"id":"bbe2c38d-bce8-4d3b-9d48-80d2697c4661","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"734d8815-395d-44bc-b4f1-9905df77f852":{"HREmployeeCertificate":{"record":{"apiName":null,"eTag":null,"fields":{"IssuingAuthority":{"displayValue":"北京医学会","value":"北京医学会"},"CertificateNo":{"displayValue":"113","value":"113"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"CertificateDate":{"displayValue":"2024-04-23","value":"2024-04-23 00:00:00"},"ExpiredOn":{"displayValue":"2024-04-23","value":"2024-04-23 00:00:00"},"Name":{"displayValue":"A","value":"A"}},"id":"734d8815-395d-44bc-b4f1-9905df77f852","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"adc4d758-976a-4431-9059-b985dcaaab84":{"HREmployeeCertificate":{"record":{"apiName":null,"eTag":null,"fields":{"IssuingAuthority":{"displayValue":"","value":""},"CertificateNo":{"displayValue":"132123","value":"132123"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"CertificateDate":{"displayValue":"","value":""},"ExpiredOn":{"displayValue":"","value":""},"Name":{"displayValue":"A123123","value":"A123123"}},"id":"adc4d758-976a-4431-9059-b985dcaaab84","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"fae161ca-d3a8-449a-9395-cd4ed018a6d7":{"HREmployeeCertificate":{"record":{"apiName":null,"eTag":null,"fields":{"IssuingAuthority":{"displayValue":"北京医学会","value":"北京医学会"},"CertificateNo":{"displayValue":"113","value":"113"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"CertificateDate":{"displayValue":"","value":""},"ExpiredOn":{"displayValue":"","value":""},"Name":{"displayValue":"A123123","value":"A123123"}},"id":"fae161ca-d3a8-449a-9395-cd4ed018a6d7","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"71e4a379-0146-4743-badc-f09e359e117e":{"HREmployeeCertificate":{"record":{"apiName":null,"eTag":null,"fields":{"IssuingAuthority":{"displayValue":"北京医学会","value":"北京医学会"},"CertificateNo":{"displayValue":"1000001","value":"1000001"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"CertificateDate":{"displayValue":"","value":""},"ExpiredOn":{"displayValue":"","value":""},"Name":{"displayValue":"执业证书","value":"执业证书"}},"id":"71e4a379-0146-4743-badc-f09e359e117e","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"cfce01df-a07d-4ffa-9e63-0ce5be3eafe0":{"HREmpPartyApply":{"record":{"apiName":null,"eTag":null,"fields":{"JoinPartyDate":{"displayValue":"","value":""},"Name":{"displayValue":"123123","value":"123123"}},"id":"cfce01df-a07d-4ffa-9e63-0ce5be3eafe0","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"a2c7427c-adbc-4e76-b07b-102c3a72bccf":{"HREmployeeAcademicGroup":{"record":{"apiName":null,"eTag":null,"fields":{"Name":{"displayValue":"7777","value":"7777"},"StartDate":{"displayValue":"2023-11-01","value":"2023-11-01 00:00:00"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"JobTitle":{"displayValue":"11111","value":"11111"},"CreatedOn":{"displayValue":"2023-11-24 00:31","value":"2023-11-24 00:31:48"}},"id":"a2c7427c-adbc-4e76-b07b-102c3a72bccf","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"727470ed-df71-43e7-927b-6857ab4603ea":{"HREmployeeAcademicGroup":{"record":{"apiName":null,"eTag":null,"fields":{"Name":{"displayValue":"123","value":"123"},"StartDate":{"displayValue":"2024-05-01","value":"2024-05-01 00:00:00"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"JobTitle":{"displayValue":"31123","value":"31123"},"CreatedOn":{"displayValue":"2024-05-15 09:47","value":"2024-05-15 09:47:32"}},"id":"727470ed-df71-43e7-927b-6857ab4603ea","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"4219797c-01a0-4a67-8fee-7695f542c4a7":{"HREmployeeAcademicGroup":{"record":{"apiName":null,"eTag":null,"fields":{"Name":{"displayValue":"123","value":"123"},"StartDate":{"displayValue":"2024-05-08","value":"2024-05-08 00:00:00"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"JobTitle":{"displayValue":"11111","value":"11111"},"CreatedOn":{"displayValue":"2024-05-15 09:46","value":"2024-05-15 09:46:22"}},"id":"4219797c-01a0-4a67-8fee-7695f542c4a7","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"ede1c179-fe19-4107-849d-a39fd91cc169":{"HREmployeeFamily":{"record":{"apiName":null,"eTag":null,"fields":{"Birthday":{"displayValue":"2023-07-01","value":"2023-07-01 00:00:00"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"JoinParty":{"displayValue":"中共党员","value":"中共党员"},"Name":{"displayValue":"爸爸","value":"爸爸"},"Workfor":{"displayValue":"","value":""},"EducationGrade":{"displayValue":"","value":""},"FamilyRelationCode":{"displayValue":"爸爸","value":"爸爸"}},"id":"ede1c179-fe19-4107-849d-a39fd91cc169","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"8b5c0e11-589a-4727-a445-5c9b44d2bfdd":{"HREmployeeFamily":{"record":{"apiName":null,"eTag":null,"fields":{"Birthday":{"displayValue":"2024-04-16","value":"2024-04-16 00:00:00"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"JoinParty":{"displayValue":"","value":""},"Name":{"displayValue":"刘优","value":"刘优"},"Workfor":{"displayValue":"","value":""},"EducationGrade":{"displayValue":"","value":""},"FamilyRelationCode":{"displayValue":"儿子","value":"儿子"}},"id":"8b5c0e11-589a-4727-a445-5c9b44d2bfdd","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"e48f7a70-5c00-43da-9804-dfbf3d45471b":{"HREmployeeFamily":{"record":{"apiName":null,"eTag":null,"fields":{"Birthday":{"displayValue":"2024-04-23","value":"2024-04-23 00:00:00"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"JoinParty":{"displayValue":"","value":""},"Name":{"displayValue":"刘优","value":"刘优"},"Workfor":{"displayValue":"12","value":"12"},"EducationGrade":{"displayValue":"123123","value":"123123"},"FamilyRelationCode":{"displayValue":"儿子","value":"儿子"}},"id":"e48f7a70-5c00-43da-9804-dfbf3d45471b","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"1ed3d612-153d-4d90-b9ca-40427c3c3032":{"HREmployeeFamily":{"record":{"apiName":null,"eTag":null,"fields":{"Birthday":{"displayValue":"2024-04-23","value":"2024-04-23 00:00:00"},"CreatedBy":{"displayValue":"刘优","value":"2ec00cf2-a484-4136-8fef-e2a2719c5ed6"},"JoinParty":{"displayValue":"","value":""},"Name":{"displayValue":"刘优","value":"刘优"},"Workfor":{"displayValue":"","value":""},"EducationGrade":{"displayValue":"","value":""},"FamilyRelationCode":{"displayValue":"女儿","value":"女儿"}},"id":"1ed3d612-153d-4d90-b9ca-40427c3c3032","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"ae718649-8fbd-4b09-9ba2-4bc75784904d":{"HREmpMedicalComplaint":{"record":{"apiName":null,"eTag":null,"fields":{"ComplaintedOn":{"displayValue":"2024-04-03","value":"2024-04-03 00:00:00"},"Name":{"displayValue":"123123123132","value":"123123123132"}},"id":"ae718649-8fbd-4b09-9ba2-4bc75784904d","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"32a18fee-9b9b-4f70-a766-32cac14bea9d":{"HREmpMedicalComplaint":{"record":{"apiName":null,"eTag":null,"fields":{"ComplaintedOn":{"displayValue":"2024-04-23","value":"2024-04-23 00:00:00"},"Name":{"displayValue":"123123888","value":"123123888"}},"id":"32a18fee-9b9b-4f70-a766-32cac14bea9d","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"51cf6146-e576-4534-a640-c5cbc9b9e703":{"HREmpMedicalComplaint":{"record":{"apiName":null,"eTag":null,"fields":{"ComplaintedOn":{"displayValue":"2024-04-16","value":"2024-04-16 00:00:00"},"Name":{"displayValue":"123123","value":"123123"}},"id":"51cf6146-e576-4534-a640-c5cbc9b9e703","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"08dc3edf-5c5f-46d6-a3eb-a5fdc3a06304":{"HREmpMedicalComplaint":{"record":{"apiName":null,"eTag":null,"fields":{"ComplaintedOn":{"displayValue":"2024-04-17","value":"2024-04-17 00:00:00"},"Name":{"displayValue":"123123888312313","value":"123123888312313"}},"id":"08dc3edf-5c5f-46d6-a3eb-a5fdc3a06304","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"08b81ac3-6199-48b9-a1ae-bb6b9d286c52":{"HREmpMedicalComplaint":{"record":{"apiName":null,"eTag":null,"fields":{"ComplaintedOn":{"displayValue":"2024-04-16","value":"2024-04-16 00:00:00"},"Name":{"displayValue":"1233","value":"1233"}},"id":"08b81ac3-6199-48b9-a1ae-bb6b9d286c52","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"832900da-a6bf-48b8-9601-e8841ae428cc":{"HREmpMedicalComplaint":{"record":{"apiName":null,"eTag":null,"fields":{"ComplaintedOn":{"displayValue":"2024-04-23","value":"2024-04-23 00:00:00"},"Name":{"displayValue":"123123","value":"123123"}},"id":"832900da-a6bf-48b8-9601-e8841ae428cc","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"ff8b01f6-81c2-486c-a0cc-bbe5d27d2e5d":{"HREmpMedicalComplaint":{"record":{"apiName":null,"eTag":null,"fields":{"ComplaintedOn":{"displayValue":"2024-04-16","value":"2024-04-16 00:00:00"},"Name":{"displayValue":"888","value":"888"}},"id":"ff8b01f6-81c2-486c-a0cc-bbe5d27d2e5d","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}},"152bdac1-c00e-49c5-affa-acc50f5dbba5":{"HREmpRound":{"record":{"apiName":null,"eTag":null,"fields":{"EndTime":{"displayValue":"2024-01-31","value":"2024-01-31 00:00:00"},"BusinessUnitId":{"displayValue":"人力资源处","value":"a97909d8-d097-4ae0-92e7-e1c5aa790400"},"StartTime":{"displayValue":"2024-01-02","value":"2024-01-02 00:00:00"},"Name":{"displayValue":"刘优","value":"刘优"}},"id":"152bdac1-c00e-49c5-affa-acc50f5dbba5","lastModifiedById":null,"lastModifiedDate":null,"recordTypeId":null,"recordTypeInfo":null},"isPrimary":false}}}},"error":[]}],"context":{"globalValueProviders":null,"picklistValuesMap":{},"appContextUser":{"userId":null,"name":null,"isAdmin":false,"token":null},"enableAccessChecks":false}};
    data.listItems = data3.actions[0].returnValue.listItems;
    data.recordIds = data3.actions[0].returnValue.recordIds;
    data.records = data3.actions[0].returnValue.records;
  }
  const handlePrint=()=>{
    window.print()
  }
  const handleEdit=()=>{
    
  }
onMounted(() => {
  let h = document.documentElement.clientHeight;
      data.height=h;
      window.addEventListener("resize", (e) => {
        let h = document.documentElement.clientHeight;
        data.height=h;
      });
      //getQuery();
      //getDetail();
      getData();
})
</script>
<style lang="less">
.MyResumeWrap {
  width: 100%;
  .panel{
    //padding: 12px 8px;
    padding:0;
    margin-bottom: 0;
    background: #e8edf4;
    overflow-x: hidden;
    border-radius: 0;
    height: 100% !important;
      .panel-bd{
        background: #fff;
        height: calc(~'100% - 0px') !important;
        overflow-y: auto;
        .main-content {
            width: 730px;
            margin: 0 auto;
        }
        .mi-content {
            width: 730px;
            padding: 20px;
            box-sizing: border-box;
        }
        .section {
            box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 2px 3px rgba(0, 0, 0, .2);
            transition: box-shadow 83ms;
            background-color: #fff;
            border-radius: 2px;
            overflow: hidden;
            position: relative;
        }
        .profile-bg {
            background: url(~@/assets/img/user/MyResume/bg.png) no-repeat center;
            height: 200px;
            background-size: cover;
        }
        .profile-photo img {
            width: 140px;
            height: 150px;
            position: absolute;
            z-index: 2;
            border-radius: 50%;
            cursor: pointer;
            margin-top: -90px;
            margin-left: 25px;
        }
        #detailview {
            clear: both;
        }
        .profile-message {
            padding: 0px;
            display: flex;
        }
        .profile-message-leftmessage {
            margin-top: 50px;
            width: 270px;
            padding: 20px;
            border-right:1px solid #dedede;
        }
        .profile-message-rightmessage{
            flex: 1;
            padding: 20px;
        }
        .profile-name {
            height: 29px;
        }
        .el-collapse {
            border-top: 1px solid #EBEEF5;
            border-bottom: 1px solid #EBEEF5;
        }
        .section.list {
            margin-top: 20px;
            position: relative;
        }
        .section-title {
            padding: 20px 0 10px 20px;
            font-size: 20px;
        }
        .section-item {
            cursor: pointer;
            position: relative;
            display: flex;
        }
        .items-left {
            float: left;
            padding: 25px;
        }
        .items-left img {
            width: 50px;
            height: 50px;
        }
        .items-right {
            float: left;
            width: 660px;
            border-bottom: 1px solid #dedede;
            box-sizing: border-box;
            padding: 25px 0;
        }
        .section-item:last-child .items-right {
            border: 0;
        }
        .items-right-label {
            font-size: 14px;
            color: #333;
            width: 50%;
            float: left;
        }
        .items-right div {
            line-height: 20px;
        }
        .items-right-label-title {
            display: inline-block;
            width: 80px;
            float: left;
        }
        .items-right-label-value {
            display: inline-block;
            width: 230px;
            float: left;
        }
        .slds-gutters_small {
            display: flex;
        }
        .slds-has-flexi-truncate {
            flex: 1 1 0%;
            min-width: 0;
        }
        .forcePageBlockItem {
            width: 47%;
            cursor: pointer;
            display: inline-block;
            border-bottom: 1px solid rgb(221, 219, 218);
        }
        .slds-col.slds-has-flexi-truncate.forcePageBlockItem {
            margin-left: 15px;
        }
        .slds-form-element__label {
            display: inline-block;
            color: rgb(62, 62, 60);
            font-size: .75rem;
            margin-right: .5rem;
            padding-top: .25rem;
            margin-bottom: .125rem;
        }

        .slds-form-element__control {
            width: 100%;
            flex-basis: 100%;
            clear: left;
            position: relative;
            border-bottom: 0;
            padding-left: 0;
        }
        .printBtnGroup{
          position: fixed;
          right: 25px;
          top: 15px;
        }
        .printBtn{
          padding-left: 1rem;
          padding-right: 1rem;
          text-align: center;
          vertical-align: middle;
          border: 1px solid rgb(221, 219, 218);
          transition: border .15s linear;
          border-color: rgb(221, 219, 218);
          background-color: rgb(255, 255, 255);
          border-radius: 4px;
          height: 32px;
          line-height: 32px;
          cursor: pointer;
          color: rgba(27, 82, 151, 1.0);
          font-size: 14px;
          float: right;
          margin-left: 10px;
        }
        .printBtn:hover{
          background-color: rgb(244, 246, 249);
        }
      }
    }
    .panel .panel-bd .main-content{
        width: 1000px;
    }
    .panel .panel-bd .mi-content{
        width: 100%;
    }
    .panel .panel-bd .profile-photo{
        position: relative;
        height: auto;
        text-align: center;
        img{
            width: 200px;
            height: auto;
            position: relative;
            z-index: 2;
            border-radius: 0;
            cursor: pointer;
            margin-top: 10px;
            margin-left: 0;
            margin-bottom: 40px;
        }
    }
    .panel .panel-bd .profile-message-leftmessage{
        margin-top: 20px;
        width:260px;
    }
    .panel .panel-bd .profile-name{
        font-size: 14px;
        color: #000;
        padding-left: 20px;
        height: 40px;
        label{
            color:#868686;
        }
    }
    .sectiontitle{
        width:100%;
        font-weight:700;
        height:30px;
        line-height:30px;
        padding-left:10px;

        font-size: 14px;
        color: #868686;
        border-bottom: 1px solid #e2e2e2;
        background-color: #f4faff;
        border-left: 2px solid #2b9dec;
    }
    .panel .panel-bd .el-collapse{
        border-top: 0;
    }
    .slds-form-element{
        display: flex;
        padding: 10px 10px 10px 15px;
        padding-left: 0;
    }
    .panel .panel-bd .slds-form-element__label{
        min-width: 140px;
        color: #000;
    }
    .panel .panel-bd .forcePageBlockItem{
        border-bottom: 0;
    }
    .panel .panel-bd .slds-form-element__control{
        border-bottom: 1px solid #dedede;
        padding-left: 10px;
        padding-bottom: 5px;
        font-size: 12px;
        .slds-form-element__static{
            white-space: normal;
            word-break: break-all;
        }
    }
}
@media print {
    .printBtn {
        display: none;
    }
}
</style>
