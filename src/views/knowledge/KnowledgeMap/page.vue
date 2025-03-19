<template>
  <div class="KnowledgeMapFirstPage">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-bd">
        <section id="directory" data-bi-name="directory-hero" class="hero hero-sm hero-image gradient-border-right gradient-border-body-accent background-color-body-accent">
									<div class="hero-content">
										<p class="supertitle is-spaced letter-spacing-wide is-uppercase">目录</p>
										<h1 class="title is-1">知识地图</h1>
										<p class="font-size-lg">搜索知识库目录。</p>
										<div id="form-wrapper" class="margin-top-sm">
											<div id="directory-search-form-replacement" name="directory-search-form" aria-label="搜索" role="search">
												<div class="columns is-mobile is-gapless">
													<div class="column">
														<div id="autocomplete-replacement" class="autocomplete display-block">
															<div class="control">
																<input id="facet-search-input" class="autocomplete-input input control input-lg" type="text" placeholder="搜索" @change="onSearch" v-model="searchVal">
															</div>
														</div>
													</div>
													<div class="column is-narrow">
														<button class="button button-primary button-filled button-lg margin-left-xxs" type="button" id="directory-search-submit" @click="onSearch">
															<span class="icon" aria-hidden="true">
																<SearchOutlined />
															</span>
															<span>
																搜索
															</span>
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>
          <section class="uhf-container">
            <div class="padding-block-xl">
              <p class="supertitle is-uppercase letter-spacing-wide">索引</p>
              <h2 class="title is-2 margin-top-none margin-bottom-xs">知识目录</h2>
              <p class="font-size-lg">按主题浏览指南和文章。</p>
              <div class="margin-top-lg">
                <ul class="has-three-text-columns">
                  <li class="has-three-text-columns-list-items" v-for="(item,index) in listData" :key="index">
                    <a class="bar-link has-inner-focus" :href="'/#/lightning/page/KnowledgeMap?id='+(item.id||'')" target="_blank">
                      {{item.Name||item.name||''}}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import "@/style/knowledge/site-ltr.less";
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
  SearchOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import RadioUser from "@/components/commonModal/MultipleUser.vue";
import Delete from "@/components/listView/Delete.vue";
const { proxy } = getCurrentInstance();
const PersonnelLst = ref();
const props = defineProps({
  id: String,
});
const emit = defineEmits(["load"]);
const data = reactive({
  loading: false,
  listData: [],
  height:100,
  searchVal:''
});
const { height,listData,loading,searchVal} = toRefs(data);
const getQuery = () => {
  data.listData=[];
  let filterQuery='\nParentSubject\tnull';
  if(data.searchVal){
    filterQuery+='\nName\tcontains\t'+data.searchVal;
  }
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
      displayColumns:'Name'
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
            list.push(item)
        }
      }
      data.listData = list;
      let dataSource={"id":"","state":"SUCCESS","returnValue":[{
            "IsArticle": false,
            "ArticleQuantity": 0,
            "Bread": null,
            "Description": "",
            "Url": null,
            "id": "bfdc4c7c-f81f-4527-b8b2-e976e5331d58",
            "name": "JAVA",
            "text": null,
            "quantity": 0,
            "parent": null,
            "children": [

            ]
        },{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"9ac36911-10b0-4da6-a7b7-f502686a5b64","name":"党章","text":null,"quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"a1bb4755-12a9-4047-b50b-9520471dbddb","name":"总纲","text":"总纲","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"5a3d94b0-432b-467e-b55e-9927dafe3e65","name":"总纲","text":"总纲","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"8f29dbc5-661e-4095-a84e-d7456ef97ad3","name":"第一章","text":"第一章","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"04dc6e8e-f3fd-4d54-9c38-bafa3dcd2989","name":"第一章   党　员","text":"第一章   党　员","quantity":0,"parent":null,"children":[]}]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"bfdc4c7c-f81f-4527-b8b2-e976e5331d58","name":"合同管理系统","text":null,"quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":2,"Bread":null,"Description":"","Url":null,"id":"eee2ba17-fd91-424a-b1ec-d7bc2d1a733d","name":"OA系统","text":null,"quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"a509436c-2495-454d-bf43-6091e5048514","name":"对象定义","text":"对象定义","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"1081d3ea-ebf0-4806-bf8f-95b457fa5f42","name":"表单定义","text":"表单定义","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"0a590281-1a89-469b-b0e1-0ecd97604bc6","name":"782","text":"782","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"9d7428e6-df29-45ce-8732-d74c7ca3b716","name":"郝主题","text":"郝主题","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"36489f2c-48ec-41a5-8dff-e914e25c7d8f","name":"流程设置","text":"流程设置","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"59f07f02-59f2-4445-8960-c7f321a8ea7d","name":"人力资源系统","text":null,"quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":2,"Bread":null,"Description":"1","Url":null,"id":"502d155a-2b8a-4885-ad63-b48400d7067b","name":"系统设置","text":null,"quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"764a6e7f-cdcd-4bed-986d-971f69718bec","name":"知识库分类1","text":null,"quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"测试1","Url":null,"id":"2767f62b-2f54-4fe3-ab1f-46b1d530bba5","name":"测试主题1","text":"测试主题1","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"1e59ea78-5f07-4049-a8d8-7c3c063d102e","name":"测试添加文章","text":"测试添加文章","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"c0d31ddf-b65d-4b4b-a02d-f006cea77d1d","name":"234234234","text":"234234234","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"测试2","Url":null,"id":"54a689e1-c4e8-4dda-a7a0-841494094bbc","name":"测试主题2","text":"测试主题2","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":1,"Bread":null,"Description":"2","Url":null,"id":"0e684a7f-9119-467a-841f-8d0bb73e06cf","name":"项目","text":null,"quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"c2885acc-27db-494d-ac6e-82a83b9d8fa3","name":"知识文档测试","text":null,"quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"38fbe554-de18-4e46-b288-71910e386ab3","name":"说明","text":"说明","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"0d6ad8af-7e34-4287-b679-7af0b675a64b","name":"小说","text":"小说","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"http://localhost:61053/SysFiles/kb/c2885acc-27db-494d-ac6e-82a83b9d8fa3/0d6ad8af-7e34-4287-b679-7af0b675a64b/b8993eb9-4bdf-4154-931c-466839156aea.html","id":"b8993eb9-4bdf-4154-931c-466839156aea","name":"三体——科学边界(2)","text":"三体——科学边界(2)","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"http://localhost:61053/SysFiles/kb/c2885acc-27db-494d-ac6e-82a83b9d8fa3/0d6ad8af-7e34-4287-b679-7af0b675a64b/86c5b079-a19e-4cef-8cfa-4b06e932f3b7.html","id":"86c5b079-a19e-4cef-8cfa-4b06e932f3b7","name":"三体——科学边界(1)","text":"三体——科学边界(1)","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"http://localhost:61053/SysFiles/kb/c2885acc-27db-494d-ac6e-82a83b9d8fa3/0d6ad8af-7e34-4287-b679-7af0b675a64b/d1668b2a-abc1-46a2-b103-4c6f1223f781.html","id":"d1668b2a-abc1-46a2-b103-4c6f1223f781","name":"三体——射手和农场主(1)","text":"三体——射手和农场主(1)","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"http://localhost:61053/SysFiles/kb/c2885acc-27db-494d-ac6e-82a83b9d8fa3/0d6ad8af-7e34-4287-b679-7af0b675a64b/e2487f35-c455-4516-888b-4fc9b2596916.html","id":"e2487f35-c455-4516-888b-4fc9b2596916","name":"三体——台球","text":"三体——台球","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"http://localhost:61053/SysFiles/kb/c2885acc-27db-494d-ac6e-82a83b9d8fa3/0d6ad8af-7e34-4287-b679-7af0b675a64b/7b2ea870-e5c8-4e8a-a9b5-9015f045f3d2.html","id":"7b2ea870-e5c8-4e8a-a9b5-9015f045f3d2","name":"三体——射手和农场主(2)","text":"三体——射手和农场主(2)","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"http://localhost:61053/SysFiles/kb/c2885acc-27db-494d-ac6e-82a83b9d8fa3/0d6ad8af-7e34-4287-b679-7af0b675a64b/9c001185-218e-4c88-9e9f-d680d58b1135.html","id":"9c001185-218e-4c88-9e9f-d680d58b1135","name":"三体——射手和农场主(3)","text":"三体——射手和农场主(3)","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"b68c65c8-904a-4eee-bac6-fca47cea009a","name":"公文","text":"公文","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"http://localhost:61053/SysFiles/kb/c2885acc-27db-494d-ac6e-82a83b9d8fa3/b68c65c8-904a-4eee-bac6-fca47cea009a/aceca1a8-1150-4241-9485-251283e4ebac.html","id":"aceca1a8-1150-4241-9485-251283e4ebac","name":"新闻","text":"新闻","quantity":0,"parent":null,"children":[]}]}]},{"IsArticle":false,"ArticleQuantity":2,"Bread":null,"Description":"","Url":null,"id":"9c0e9fbc-af2c-44e1-96a6-74c3e826e69f","name":"项目管理系统","text":null,"quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"31c7b897-639d-47e4-ba82-0fe4f2b6f544","name":"项目管理主题","text":"项目管理主题","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"25301f24-06fe-4fbd-a766-70c4f6f03c88","name":"项目详情","text":"项目详情","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"84e1d3ee-caef-4de8-9759-e445fd2352fd","name":"项目管理","text":"项目管理","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"4a3545eb-6c70-4220-ac00-26b2b60e3d18","name":"开发文档","text":null,"quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"4cb9649e-37df-4840-8687-91a8a8f5985d","name":"组件","text":"组件","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"8284b41b-01b3-4413-892c-16a69f27847a","name":"弹窗选择人员、部门","text":"弹窗选择人员、部门","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"56d427d2-3e90-442a-82d1-9173e33e2ac2","name":"标准表单弹窗","text":"标准表单弹窗","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"523e62a3-a290-4606-8496-b3d4f3fc64f1","name":"index","text":"index","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"523e62a3-a290-4606-8496-b3d4f3fc64f1","name":"index","text":"index","quantity":0,"parent":null,"children":[]}]}]}]},{"IsArticle":false,"ArticleQuantity":5,"Bread":null,"Description":"","Url":null,"id":"66c0686a-3126-4793-8cd2-084901eda695","name":"报销系统","text":null,"quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"e09a318b-4c33-491e-8ecb-014a7b25a144","name":"新建分类3","text":"新建分类3","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"69182211-20e7-4cf1-a475-26c8c3ae20ac","name":"AA111","text":"AA111","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"b6347c3a-5a6c-452e-819e-83f40baf5b11","name":"123","text":"123","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"3ae31db9-3795-4e21-8104-33103dad31d5","name":"新建分类","text":"新建分类","quantity":0,"parent":null,"children":[{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":"","id":"4597c434-3d65-474b-8da9-d3fdb7a3b584","name":"测试","text":"测试","quantity":0,"parent":null,"children":[]}]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"60d7bbeb-2dab-4521-8e90-5ed1627d02cd","name":"新建分类1","text":"新建分类1","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"4b1ec85c-86d0-45a9-8c26-7677f679280c","name":"新建分类1","text":"新建分类1","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"bf448159-ab63-4776-b650-8880ee507e85","name":"新建分类4","text":"新建分类4","quantity":0,"parent":null,"children":[]},{"IsArticle":false,"ArticleQuantity":0,"Bread":null,"Description":"","Url":null,"id":"68866673-d839-4023-b267-99aa8a43e3c4","name":"新建分类2","text":"新建分类2","quantity":0,"parent":null,"children":[]}]}],"error":[]};
      //data.listData=dataSource.returnValue;
  })
};
const onSearch = (e) => {
  getQuery();
};
const onClear = (e) => {
  data.searchVal='';
  getQuery();
};

onMounted(() => {
  let h = document.documentElement.clientHeight;
      data.height=h-0;
      window.addEventListener("resize", (e) => {
        let h = document.documentElement.clientHeight;
        data.height=h-0;
      });
      getQuery();
})
</script>
<style lang="less">
.KnowledgeMapFirstPage {
  width: 100%;
  .panel{
    padding: 0;
    margin-bottom: 0;
    background: #e8edf4;
    overflow-x: hidden;
    overflow-x: hidden;
      .panel-bd{
        background: #fff;
        height: calc(~'100% - 0px') !important;
        overflow-y: auto;
        overflow-x: hidden;
        .icon-sousuo{
          position: relative;
          top: 1px;
          right: 3px;
          cursor: pointer;
        }
        .gradient-border-body-accent {
          background-repeat: no-repeat;
          background-position: right;
          background: url("~@/assets/img/knowledge/directory-hero_light.jpg") no-repeat right;
          --hero-background-image-light: url("~@/assets/img/knowledge/directory-hero_light.jpg");
          --hero-background-image-dark: url("~@/assets/img/knowledge/directory-hero_dark.jpg");
        }
        .hero .hero-content{
          padding-left: 70px;
        }
        #facet-search-input{
          text-indent: 15px;
        }
        a{
          color: #1055BC;
        }
        .uhf-container{
          width: 100%;
          max-width: 100%;
          //height: 100%;
          .padding-block-xl{
            padding: 50px 75px !important;
            .supertitle{
              font-size: .875rem;
              line-height: 1.25;
            }
            .is-uppercase {
                text-transform: uppercase !important;
            }
            .letter-spacing-wide {
                letter-spacing: 0.225rem !important;
            }
            .title {
                font-size: 1.75rem;
                font-weight: 600;
                line-height: 1.125;
            }
            .title.is-2 {
                font-size: 2.125rem;
            }
            .title, .subtitle {
                word-break: break-word;
            }
            .margin-bottom-xs {
                margin-block-end: 1rem !important;
            }
            .margin-top-none {
                margin-block-start: 0 !important;
            }
            .font-size-lg {
                font-size: 1.125rem !important;
            }
            .margin-top-lg {
                margin-block-start: 3rem !important;
            }
            .has-three-text-columns{
                -moz-columns: 3;
                columns: 3;
                .has-three-text-columns-list-items {
                    -moz-column-break-inside: avoid;
                    break-inside: avoid;
                    .barLink, .bar-link {
                        border-left: 6px solid #e6e6e6;
                        min-height: 36px;
                        align-items: center;
                        font-size: 1.125rem;
                        line-height: 28px;
                        display: flex;
                        margin-top: 5px !important;
                        padding-left: .75rem !important;
                        padding-right: 0.75rem !important;
                    }
                }
                .has-three-text-columns-list-items:hover{
                  .barLink, .bar-link{
                    border-left: 6px solid #1055BC;
                  }
                }
              }
          }
        }
      }
    }
}
#directory-search-submit{
  .anticon{
    font-size: 19px;
    position: relative;
    top: 0px;
  }
}
</style>
