<template>
  <div class="GroupSpace">
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">发布帖子</div>
      </div>
      <div class="panel-bd">
        <TEditor
          :placeholder="'有什么新鲜事想分享给大家?'"
          @input="getInputContent"
        />
        <div class="sendWrap">
          <a-button type="primary" :disabled="!isSend" @click="sendContent">发布</a-button>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">群组动态</div>
        <div class="panel-search">
          <a-input-search
            v-model:value="searchVal"
            placeholder="搜索动态"
            style="width: 300px"
            @search="onSearch"
          />
        </div>
      </div>
      <div class="panel-bd">
        <div class="trendsWrap">
          <div
            class="trendsItem"
            v-for="(item, index) in spaceList"
            :key="index"
          >
            <div class="trendsItemBox">
              <div class="avatar">
                <img :src="item.ImageUrls" alt="" />
              </div>
              <div class="trends-info">
                <div class="info-name">
                  {{ item.OwningUser }}
                  <svg
                    viewBox="0 0 24 24"
                    aria-label="认证账号"
                    role="img"
                    class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
                  >
                    <g>
                      <path
                        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                      ></path>
                    </g>
                  </svg>
                  <span class="name2">@{{ item.OwningUser }}</span>
                </div>
                <div class="info-time">
                  {{ item.CreatedOn }}
                </div>
                <div class="info-desc" v-html="item.Description">
                </div>
              </div>
              <div class="trends-more">
                <a-dropdown>
                      <a class="ant-dropdown-link" @click.prevent>
                        <EllipsisOutlined />
                      </a>
                      <template #overlay>
                          <a-menu>
                              <a-menu-item>
                                  <a href="javascript:void(0);" @click="handleDelete(item.id)">删除</a>
                              </a-menu-item>
                          </a-menu>
                      </template>
                  </a-dropdown>
              </div>
            </div>
            <div class="trendsItemBottom">
              <div class="iconBox">
                <svg
                  title="评论"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                >
                  <g>
                    <path
                      d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                    ></path>
                  </g>
                </svg>
                <span class="num">{{ item.NumOfComment || 0 }}</span>
              </div>
              <div class="iconBox">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                >
                  <g>
                    <path
                      d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                    ></path>
                  </g>
                </svg>
                <span class="num">{{ item.NumOfLike || 0 }}</span>
              </div>
              <div class="iconBox">
                <svg
                  title="分享"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                >
                  <g>
                    <path
                      d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Delete :isShow="isDelete" :desc="deleteDesc" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" @cancel="closeDelete" @ok="deleteOk" />
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
  h,
  computed,
} from "vue";
import {
  EditOutlined,
  UnorderedListOutlined,
  EllipsisOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
let store = useStore();
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
const { proxy } = getCurrentInstance();
import { message } from "ant-design-vue";
import TEditor from "@/components/TEditor.vue";
import Delete from "@/components/listView/Delete.vue";
const data = reactive({
  adminList: [],
  peopleList: [],
  searchVal: "",
  spaceList: [],
  content: "",
  isDelete: false,
  recordId:'',
  objectTypeCode:'6000',
  sObjectName:'Chatter',
  deleteDesc: '确定要删除吗？',
  external:false,
});
const props = defineProps({
  id: String,
});
const isSend = computed(() => {
  return data.content ? true : false;
});
const getInputContent = (e) => {
  data.content = e;
};
const { adminList, peopleList, searchVal, spaceList, content,isDelete,recordId,objectTypeCode,sObjectName,deleteDesc,external } = toRefs(data);
const sendContent= () => {
  let url=Interface.create;
        let d = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName: 'Chatter',
                objTypeCode: '6000',
                fields: {
                    RegardingObjectId: props.id,
                    Description:data.content,
                    RegardingObjectTypeCode:9
                }
              }              
            }
        }]
    };
    
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url,obj).then(res=>{
      if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
        message.success("发送成功！");
        getSpace();
      }
      
    });
};
const onSearch = (e) => {
  getSpace();
};
const getSpace = () => {
  // proxy
  //   .$get(Interface.group.statusList, {
  //     objectId: store.state.groupId,
  //   })
  //   .then((res) => {
  //     data.spaceList = res.listData;
  //   });
  let filterQuery='\nRegardingObjectId\teq\t'+props.id;
  if(data.searchVal){
    filterQuery+='\nDescription\tcontains\t'+data.searchVal;
  }
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'6000',
            entityName:'Chatter',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 1000,
            sort:'CreatedOn',
            order:'desc',
            displayColumns:'OwningUser,CreatedOn,Description,NumOfComment,NumOfLike,ImageUrls'
        }).then(res => {
            var list = [];
            //console.log(pagination)
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='ImageUrls'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='ImageUrls'){
                        item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
                    }
                }
                list.push(item)
            }
            data.spaceList = list;
            
        })
};
getSpace();
// 删除
const handleDelete = (e) => {
    data.recordId=e;
    data.isDelete = true;
};
const closeDelete = (e) => {
    data.recordId='';
    data.isDelete = false;
};
const deleteOk = (e) => {
    getSpace();
};
</script>
<style lang="less">
.GroupSpace {
  .trendsWrap {
    .trendsItem {
      border-bottom: 1px solid #e2e3e5;
      .trendsItemBox {
        display: flex;
        padding: 15px 20px;
        border-radius: 3px;
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .trends-info {
          flex: 1;
          .info-name {
            display: flex;
            align-items: center;
            font-weight: bold;
            svg {
              width: 18px;
              margin: 0 3px;
              margin-left: 1px;
              fill: var(--textColor);
            }
            .name2 {
              color: #536471;
              font-weight: normal;
            }
          }
          .info-time {
            margin-top: 5px;
            color: #808080;
          }
          .info-desc {
            font-size: 15px;
            margin: 15px 0 5px 0;
          }
        }
      }
      .trendsItemBottom {
        display: flex;
        justify-content: center;
        padding: 15px 0;
        color: #666;
        .iconBox {
          flex: 1;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            width: 16px;
            fill: #666;
            border-radius: 50%;
            padding: 8px;
            box-sizing: unset;
          }
          span {
            padding-left: 10px;
          }
          &:hover {
            svg {
              fill: #3399ff;
              background: rgba(29, 155, 240, 0.1);
            }
          }
        }
      }
    }
    .trendsItem:hover {
      background: #f4f4f4;
    }
  }
  .sendWrap {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
