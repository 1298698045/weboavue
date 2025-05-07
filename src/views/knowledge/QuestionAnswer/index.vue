<template>
  <div class="CommunityCommentWrap">
    <div class="mainContent">
      <div class="leftContent">
        <div class="panel panel0">
          <div class="panel-head">
            <div class="panel-title">知识问答</div>
            <div class="panel-btn"></div>
          </div>
          <div class="panel-bd">
            <div class="left-menu">
              <div
                class="left-menu-item"
                :class="{ 'left-menu-item-active': data.selectmenu == 1 }"
                @click="changeMenu(1)"
              >
                <span class="left-menu-item-icon"> <BarsOutlined /> </span
                ><span class="left-menu-item-label">全部问题</span>
              </div>
              <div
                class="left-menu-item"
                :class="{ 'left-menu-item-active': data.selectmenu == 2 }"
                @click="changeMenu(2)"
              >
                <span class="left-menu-item-icon"> <UserOutlined /> </span
                ><span class="left-menu-item-label">我的问题</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middleContent" v-if="!isShowDetail">
        <div class="panel panel1">
          <div class="panel-bd">
            <div class="panelCommunityCommentWrap">
              <div class="commentBox commentBox0">
                <!-- <div class="TEditorWrap CommentWrap" v-if="activeKey == '6000' || activeKey == '0'">
                                    <TEditor ref="editorRef" :placeholder="'有什么问题需要解答?'" @input="getInputContent"
                                        :id="uploadId" :height="230" />
                                    <div class="RelaseInfoUpload" v-if="ImageList.length">
                                        <div class="uploadPanel">
                                            <div class="inboxFileList">
                                                <div class="inboxFileItem" v-for="(item, index) in ImageList"
                                                    :key="index">
                                                    <div class="FileInfo">
                                                        <img :src="item.viewUrl" class="img" />
                                                        <div class="fileOptionShow" :title="(item.name || '')">
                                                            <div class="btns">
                                                                <a-tooltip title="预览" placement="top">
                                                                    <a-button type="text" :icon="h(EyeOutlined)"
                                                                        @click="handlePreviewFile(item, index)"></a-button>
                                                                </a-tooltip>
                                                                <a-tooltip title="删除" placement="top">
                                                                    <a-button type="text" :icon="h(CloseOutlined)"
                                                                        @click="deleteFile(index)"></a-button>
                                                                </a-tooltip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="inboxFileItem">
                                                    <a-upload-dragger accept="image/*" v-model:fileList="fileList"
                                                        :headers="headers" @change="changeFiles" :data="uploadData"
                                                        :action="Interface.information.uploadMedia"
                                                        :customRequest="changeRequest" :showUploadList="false" multiple
                                                        name="files" :before-upload="beforeUpload">
                                                        <div class="uploadRow">
                                                            <p class="ant-upload-drag-icon">
                                                                <PlusOutlined />
                                                            </p>
                                                        </div>
                                                    </a-upload-dragger>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="VoteWrap" v-if="activeKey == '30400'">
                                    <div class="VoteLabel">问题</div>
                                    <a-textarea class="Votetextarea" v-model:value="data.text" placeholder="您想提问什么？"
                                        :rows="3"></a-textarea>
                                    <template v-for="(item, index) in VoteOptions" :key="index">
                                        <div class="VoteLabel">选项{{ index + 1 }}</div>
                                        <div class="VoteOption">
                                            <a-input class="VoteInput" v-model:value="item.name"></a-input>
                                            <DeleteOutlined title="删除选项" @click="deleteVoteOption(index)" />
                                        </div>
                                    </template>
</div> -->
                <div
                  class="TEditorWrap QuestionWrap"
                  v-if="activeKey == '30401' || activeKey == '1'"
                >
                  <div class="QuestionLabel">问题</div>
                  <a-textarea
                    class="Votetextarea"
                    v-model:value="data.text"
                    placeholder="有什么问题需要解答？"
                    :rows="3"
                  ></a-textarea>
                  <div class="QuestionLabel">详细信息</div>
                  <TEditor
                    ref="editorRef2"
                    :placeholder="'如果您还需要补充，请在此处添加一些细节...'"
                    :height="230"
                    :mode="'chatter'"
                    :id="uploadId"
                    @input="getInputContent2"
                  />
                </div>
              </div>
              <div class="optionalWrap">
                <!-- <a-button type="primary" class="optionalWrapLeft" @click="addQuestionOption"
                                    v-if="activeKey == '30400'">
                                    <PlusOutlined />添加新选项
                                </a-button> -->
                <!-- <a-upload v-if="activeKey == '0'" accept="image/*" v-model:fileList="fileList"
                                    :headers="headers" @change="changeFiles" :data="uploadData"
                                    :customRequest="changeRequest" :action="Interface.information.uploadMedia"
                                    :showUploadList="false" multiple name="files" :before-upload="beforeUpload">
                                    <a-button type="primary" class="optionalWrapLeft">
                                        <PlusOutlined />添加图片
                                    </a-button>
                                </a-upload> -->
                <a-button
                  type="primary"
                  class="optionalWrapRight"
                  @click="handleSendStatus"
                  :disabled="!data.text"
                  >发送</a-button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="panel panel2">
          <!-- <div class="panel-head">
                        <div class="panel-title">
                        </div>
                        <div class="panel-btn">
                        </div>
                    </div> -->
          <div class="panel-bd">
            <div class="panelCommunityCommentWrap">
              <div class="commentSearch">
                <div class="wea-left-tree-search">
                  <a-input
                    v-model:value="searchVal"
                    placeholder="搜索问题"
                    @change="onSearch"
                    allowClear
                  />
                  <div class="wea-left-tree-search-icon">
                    <SearchOutlined />
                  </div>
                </div>
              </div>
              <div class="commentList">
                <div
                  class="commentItemBox"
                  v-for="(item, index) in listData"
                  :key="index"
                >
                  <div class="leftAvatar">
                    <a-avatar :size="37">
                      <!-- <template #icon><UserOutlined /></template> -->
                      <img
                        :src="'/api/one/user/avatar/' + item.OwningUserId"
                        alt=""
                        class="commentAvatar"
                      />
                    </a-avatar>
                  </div>
                  <div class="rightComment">
                    <div class="commentName">
                      {{ item.OwningUser || "暂无" }}
                    </div>
                    <div class="commentTime">
                      {{ item.CreatedOn }}
                    </div>
                    <div class="commentMore">
                      <a-dropdown :trigger="['hover']" class="ml10">
                        <span class="btn-drop">
                          <MoreOutlined />
                        </span>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item @click.stop="handleDetail(item)">
                              <DeleteOutlined /><span class="a-menu-item-label"
                                >详情</span
                              >
                            </a-menu-item>
                            <a-menu-item
                              v-if="
                                item.OwningUserId &&
                                data.OwningUser &&
                                data.OwningUser == item.OwningUserId
                              "
                              @click.stop="handleDelete(item.id, 1, '')"
                            >
                              <DeleteOutlined /><span class="a-menu-item-label"
                                >删除</span
                              >
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <div
                      class="commentContent"
                      v-if="activeKey == '0'"
                      @click="handleDetail(item)"
                    >
                      <div
                        v-html="item.Content || '暂无'"
                        class="commentContentItem"
                      ></div>
                      <div
                        class="commentContentItem picturesList"
                        v-if="item.pictures.length"
                      >
                        <img
                          v-for="(ite, idx) in item.pictures"
                          :key="idx"
                          :src="ite.viewUrl"
                          class="img"
                        />
                      </div>
                    </div>
                    <div
                      class="commentContent"
                      v-if="activeKey == '1'"
                      @click="handleDetail(item)"
                    >
                      <div
                        v-html="item.Content || '暂无'"
                        class="commentContentItem"
                      ></div>
                      <div
                        v-html="item.Description"
                        class="commentContentItem"
                      ></div>
                    </div>
                    <div
                      class="commentContent"
                      v-if="activeKey == '30400'"
                      @click="handleDetail(item)"
                    >
                      <div class="VoteItem">
                        <div
                          v-html="item.Content || '暂无'"
                          class="commentContentItem"
                        ></div>
                        <a-radio-group
                          v-model:value="item.value"
                          class="commentContentRadio"
                          :class="{ isSubmit: item.isSubmit }"
                          :disabled="item.isSubmit"
                          @change="
                            (e) => {
                              ContentRadioChange(e, item);
                            }
                          "
                        >
                          <a-radio
                            v-for="(ite, idx) in item.options"
                            :key="idx"
                            :style="radioStyle"
                            :value="ite.pollOptionId"
                          >
                            {{ idx + 1 }}.{{ ite.name }}
                            <div v-if="item.isSubmit" class="option-percentage">
                              <a-progress
                                class="option-progress"
                                :percent="ite.percentage"
                                :size="8"
                                :show-info="true"
                                :title="'占比' + ite.percentage + '%'"
                              ></a-progress>
                              <span class="option-count"
                                >{{
                                  ite.checkedQty || 0
                                }}票&nbsp;&nbsp;&nbsp;&nbsp;{{
                                  ite.percentage || 0
                                }}%</span
                              >
                            </div>
                          </a-radio>
                        </a-radio-group>
                        <div class="vote-shur-btn">
                          <div v-if="item.isSubmit" class="disabled">
                            你已投票
                          </div>
                          <div
                            v-if="!item.isSubmit"
                            :class="{ disabled: !item.value }"
                            @click.stop="handlePoll(item)"
                          >
                            提交
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="commentBtn">
                      <!-- <span class="commentBtn-item" title="分享">
                                                <ExportOutlined /><span>{{ item.NumOfForward || 0 }}</span>
                                            </span> -->
                      <span
                        class="commentBtn-item"
                        title="评论"
                        v-if="!item.IsShowReply"
                        @click.stop="getCommentList(item.id, item)"
                      >
                        <MessageOutlined /><span>{{
                          item.NumOfComment || 0
                        }}</span>
                      </span>
                      <span
                        class="commentBtn-item"
                        title="评论"
                        v-if="item.IsShowReply"
                        @click.stop="item.IsShowReply = false"
                        style="color: #ff7d00"
                      >
                        <MessageOutlined /><span>{{
                          item.NumOfComment || 0
                        }}</span>
                      </span>
                      <span
                        class="commentBtn-item"
                        title="点赞"
                        v-if="!item.IsLike"
                        @click.stop="handleLike1(item)"
                      >
                        <LikeOutlined /><span>{{ item.NumOfLike || 0 }}</span>
                      </span>
                      <span
                        class="commentBtn-item"
                        title="取消点赞"
                        v-if="item.IsLike"
                        @click.stop="handleLike1(item)"
                        style="color: #ff7d00"
                      >
                        <LikeFilled /><span>{{ item.NumOfLike || 0 }}</span>
                      </span>
                    </div>
                    <div class="commentReply" v-if="item.IsShowReply">
                      <div class="commentBox">
                        <div class="leftAvatar">
                          <a-avatar :size="37">
                            <!-- <template #icon><UserOutlined /></template> -->
                            <img
                              :src="'/api/one/user/avatar/' + data.OwningUser"
                              alt=""
                              class="commentAvatar"
                            />
                          </a-avatar>
                        </div>
                        <div class="rightTextare">
                          <textarea
                            class="textarea"
                            v-model="item.comment"
                            placeholder-class="placeholder"
                            placeholder=""
                            name=""
                            id=""
                            cols="30"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                      <div class="optionalWrap">
                        <a-button
                          type="primary"
                          :disabled="!item.comment"
                          @click.stop="handleSendComment(item, item)"
                          >评论</a-button
                        >
                      </div>
                      <div class="commentList" v-if="listData1[item.id]">
                        <div
                          class="commentItemBox"
                          v-for="(item1, index1) in listData1[item.id].slice(
                            0,
                            5
                          )"
                          :key="index1"
                        >
                          <div class="leftAvatar">
                            <a-avatar :size="37">
                              <!-- <template #icon><UserOutlined /></template> -->
                              <img
                                :src="
                                  '/api/one/user/avatar/' + item1.OwningUserId
                                "
                                alt=""
                                class="commentAvatar"
                              />
                            </a-avatar>
                          </div>
                          <div class="rightComment">
                            <div class="commentName">
                              {{ item1.Title || item1.OwningUser || "暂无" }}
                            </div>
                            <div class="commentTime">
                              {{ item1.CreatedOn }}
                            </div>
                            <div class="commentContent">
                              {{ item1.Content || "暂无" }}
                            </div>
                            <div class="commentBtn">
                              <span
                                class="commentBtn-item"
                                title="删除"
                                v-if="
                                  item1.OwningUserId &&
                                  data.OwningUser &&
                                  data.OwningUser == item1.OwningUserId
                                "
                                @click.stop="handleDelete(item1.id, 2, item)"
                              >
                                <DeleteOutlined />
                              </span>
                              <span
                                class="commentBtn-item"
                                title="回复"
                                v-if="!item1.IsShowReply"
                                @click.stop="item1.IsShowReply = true"
                              >
                                <MessageOutlined /><span></span>
                              </span>
                              <span
                                class="commentBtn-item"
                                title="回复"
                                v-if="item1.IsShowReply"
                                @click.stop="item1.IsShowReply = false"
                                style="color: #ff7d00"
                              >
                                <MessageOutlined /><span></span>
                              </span>
                              <span
                                class="commentBtn-item"
                                title="点赞"
                                v-if="!item1.IsLike"
                                @click.stop="handleLike2(item1, true)"
                              >
                                <LikeOutlined /><span>{{
                                  item1.NumOfLike || 0
                                }}</span>
                              </span>
                              <span
                                class="commentBtn-item"
                                title="取消点赞"
                                v-if="item1.IsLike"
                                @click.stop="handleLike2(item1, false)"
                                style="color: #ff7d00"
                              >
                                <LikeFilled /><span>{{
                                  item1.NumOfLike || 0
                                }}</span>
                              </span>
                            </div>
                            <div class="commentReply" v-if="item1.IsShowReply">
                              <div class="commentBox">
                                <div class="leftAvatar">
                                  <a-avatar :size="37">
                                    <!-- <template #icon><UserOutlined /></template> -->
                                    <img
                                      :src="
                                        '/api/one/user/avatar/' +
                                        data.OwningUser
                                      "
                                      alt=""
                                      class="commentAvatar"
                                    />
                                  </a-avatar>
                                </div>
                                <div class="rightTextare">
                                  <textarea
                                    class="textarea"
                                    v-model="item1.comment"
                                    placeholder-class="placeholder"
                                    placeholder=""
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="3"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="optionalWrap">
                                <a-button
                                  type="primary"
                                  :disabled="!item1.comment"
                                  @click.stop="handleSendComment(item, item1)"
                                  >回复</a-button
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="linkMore"
                          v-if="
                            listData1[item.id] && listData1[item.id].length > 5
                          "
                          @click="handleDetail(item)"
                        >
                          <span class="linkMoreText"
                            >查看全部{{ total || 0 }}条评论</span
                          >
                          <RightOutlined class="linkMoreIcon" />
                        </div>
                        <div
                          class="empty"
                          v-if="
                            listData1[item.id] && listData1[item.id].length == 0
                          "
                        >
                          <img
                            :src="require('@/assets/img/empty.png')"
                            alt=""
                          />
                          <p class="emptyDesc">当前暂无评论</p>
                        </div>
                        <!-- <div class="pagination">
                                                    <a-pagination show-size-changer
                                                        :pageSizeOptions="['5', '10', '20', '50', '80', '100']"
                                                        :pageSize="rows" @showSizeChange="sizeChange"
                                                        v-model:current="page" :total="total" @change="ChangePage"
                                                        :show-total="total => `共 ${total} 条`" />
                                                </div> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="empty" v-if="listData.length == 0">
                  <img :src="require('@/assets/img/empty.png')" alt="" />
                  <p class="emptyDesc">当前暂无数据</p>
                </div>
                <!-- <div class="pagination">
                                    <a-pagination show-size-changer :pageSizeOptions="['10', '20', '50', '80', '100']"
                                        :pageSize="rows0" @showSizeChange="sizeChange0" v-model:current="page0"
                                        :total="total0" @change="ChangePage0" :show-total="total0 => `共 ${total0} 条`" />
                                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middleContent detailContent" v-if="isShowDetail">
        <div class="panel panel2">
          <div class="panel-bd">
            <div class="panelCommunityCommentWrap">
              <div class="commentSearch">
                <div class="detailContentTop">
                  <LeftOutlined
                    class="detailContentTopIcon"
                    @click="returnBack"
                  />
                  <span class="detailContentTopText">问题详情</span>
                </div>
              </div>
              <div class="commentList">
                <div
                  class="commentItemBox"
                  v-for="(item, index) in listData"
                  :key="index"
                >
                  <div class="leftAvatar">
                    <a-avatar :size="37">
                      <!-- <template #icon><UserOutlined /></template> -->
                      <img
                        :src="'/api/one/user/avatar/' + item.OwningUserId"
                        alt=""
                        class="commentAvatar"
                      />
                    </a-avatar>
                  </div>
                  <div class="rightComment">
                    <div class="commentName">
                      {{ item.OwningUser || "暂无" }}
                    </div>
                    <div class="commentTime">
                      {{ item.CreatedOn }}
                    </div>
                    <div class="commentMore">
                      <a-dropdown :trigger="['hover']" class="ml10">
                        <span class="btn-drop">
                          <MoreOutlined />
                        </span>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item
                              v-if="
                                item.OwningUserId &&
                                data.OwningUser &&
                                data.OwningUser == item.OwningUserId
                              "
                              @click="handleDelete(item.id, 1, '')"
                            >
                              <DeleteOutlined /><span class="a-menu-item-label"
                                >删除</span
                              >
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <div class="commentContent" v-if="activeKey == '0'">
                      <div
                        v-html="item.Content || '暂无'"
                        class="commentContentItem"
                      ></div>
                      <div
                        class="commentContentItem picturesList"
                        v-if="item.pictures.length"
                      >
                        <img
                          v-for="(ite, idx) in item.pictures"
                          :key="idx"
                          :src="ite.viewUrl"
                          class="img"
                        />
                      </div>
                    </div>
                    <div class="commentContent" v-if="activeKey == '1'">
                      <div
                        v-html="item.Content || '暂无'"
                        class="commentContentItem"
                      ></div>
                      <div
                        v-html="item.Description"
                        class="commentContentItem"
                      ></div>
                    </div>
                    <div class="commentContent" v-if="activeKey == '30400'">
                      <div class="VoteItem">
                        <div
                          v-html="item.Content || '暂无'"
                          class="commentContentItem"
                        ></div>
                        <a-radio-group
                          v-model:value="item.value"
                          class="commentContentRadio"
                          :class="{ isSubmit: item.isSubmit }"
                          :disabled="item.isSubmit"
                          @change="
                            (e) => {
                              ContentRadioChange(e, item);
                            }
                          "
                        >
                          <a-radio
                            v-for="(ite, idx) in item.options"
                            :key="idx"
                            :style="radioStyle"
                            :value="ite.pollOptionId"
                          >
                            {{ idx + 1 }}.{{ ite.name }}
                            <div v-if="item.isSubmit" class="option-percentage">
                              <a-progress
                                class="option-progress"
                                :percent="ite.percentage"
                                :size="8"
                                :show-info="true"
                                :title="'占比' + ite.percentage + '%'"
                              ></a-progress>
                              <span class="option-count"
                                >{{
                                  ite.checkedQty || 0
                                }}票&nbsp;&nbsp;&nbsp;&nbsp;{{
                                  ite.percentage || 0
                                }}%</span
                              >
                            </div>
                          </a-radio>
                        </a-radio-group>
                        <div class="vote-shur-btn">
                          <div v-if="item.isSubmit" class="disabled">
                            你已投票
                          </div>
                          <div
                            v-if="!item.isSubmit"
                            :class="{ disabled: !item.value }"
                            @click="handlePoll(item)"
                          >
                            提交
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="commentBtn">
                      <!-- <span class="commentBtn-item" title="分享">
                                                <ExportOutlined /><span>{{ item.NumOfForward || 0 }}</span>
                                            </span> -->
                      <span
                        class="commentBtn-item"
                        title="评论"
                        @click="getCommentList(item.id, item)"
                      >
                        <MessageOutlined /><span>{{
                          item.NumOfComment || 0
                        }}</span>
                      </span>
                      <!-- <span class="commentBtn-item" title="评论" v-if="item.IsShowReply"
                                                @click="item.IsShowReply = false" style="color: #ff7d00;">
                                                <MessageOutlined /><span>{{ item.NumOfComment || 0 }}</span>
                                            </span> -->
                      <span
                        class="commentBtn-item"
                        title="点赞"
                        v-if="!item.IsLike"
                        @click="handleLike1(item)"
                      >
                        <LikeOutlined /><span>{{ item.NumOfLike || 0 }}</span>
                      </span>
                      <span
                        class="commentBtn-item"
                        title="取消点赞"
                        v-if="item.IsLike"
                        @click="handleLike1(item)"
                        style="color: #ff7d00"
                      >
                        <LikeFilled /><span>{{ item.NumOfLike || 0 }}</span>
                      </span>
                    </div>
                    <div class="commentReply" v-if="item.IsShowReply">
                      <div class="commentBox">
                        <div class="leftAvatar">
                          <a-avatar :size="37">
                            <!-- <template #icon><UserOutlined /></template> -->
                            <img
                              :src="'/api/one/user/avatar/' + data.OwningUser"
                              alt=""
                              class="commentAvatar"
                            />
                          </a-avatar>
                        </div>
                        <div class="rightTextare">
                          <textarea
                            class="textarea"
                            v-model="item.comment"
                            placeholder-class="placeholder"
                            placeholder=""
                            name=""
                            id=""
                            cols="30"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                      <div class="optionalWrap">
                        <a-button
                          type="primary"
                          :disabled="!item.comment"
                          @click="handleSendComment(item, item)"
                          >评论</a-button
                        >
                      </div>
                      <div class="commentList">
                        <div
                          class="commentItemBox"
                          v-for="(item1, index1) in listData1[item.id]"
                          :key="index1"
                        >
                          <div class="leftAvatar">
                            <a-avatar :size="37">
                              <!-- <template #icon><UserOutlined /></template> -->
                              <img
                                :src="
                                  '/api/one/user/avatar/' + item1.OwningUserId
                                "
                                alt=""
                                class="commentAvatar"
                              />
                            </a-avatar>
                          </div>
                          <div class="rightComment">
                            <div class="commentName">
                              {{ item1.Title || item1.OwningUser || "暂无" }}
                            </div>
                            <div class="commentTime">
                              {{ item1.CreatedOn }}
                            </div>
                            <div class="commentContent">
                              {{ item1.Content || "暂无" }}
                            </div>
                            <div class="commentBtn">
                              <span
                                class="commentBtn-item"
                                title="删除"
                                v-if="
                                  item1.OwningUserId &&
                                  data.OwningUser &&
                                  data.OwningUser == item1.OwningUserId
                                "
                                @click="handleDelete(item1.id, 2, item)"
                              >
                                <DeleteOutlined />
                              </span>
                              <span
                                class="commentBtn-item"
                                title="回复"
                                v-if="!item1.IsShowReply"
                                @click="item1.IsShowReply = true"
                              >
                                <MessageOutlined /><span></span>
                              </span>
                              <span
                                class="commentBtn-item"
                                title="回复"
                                v-if="item1.IsShowReply"
                                @click="item1.IsShowReply = false"
                                style="color: #ff7d00"
                              >
                                <MessageOutlined /><span></span>
                              </span>
                              <span
                                class="commentBtn-item"
                                title="点赞"
                                v-if="!item1.IsLike"
                                @click="handleLike2(item1, true)"
                              >
                                <LikeOutlined /><span>{{
                                  item1.NumOfLike || 0
                                }}</span>
                              </span>
                              <span
                                class="commentBtn-item"
                                title="取消点赞"
                                v-if="item1.IsLike"
                                @click="handleLike2(item1, false)"
                                style="color: #ff7d00"
                              >
                                <LikeFilled /><span>{{
                                  item1.NumOfLike || 0
                                }}</span>
                              </span>
                            </div>
                            <div class="commentReply" v-if="item1.IsShowReply">
                              <div class="commentBox">
                                <div class="leftAvatar">
                                  <a-avatar :size="37">
                                    <!-- <template #icon><UserOutlined /></template> -->
                                    <img
                                      :src="
                                        '/api/one/user/avatar/' +
                                        data.OwningUser
                                      "
                                      alt=""
                                      class="commentAvatar"
                                    />
                                  </a-avatar>
                                </div>
                                <div class="rightTextare">
                                  <textarea
                                    class="textarea"
                                    v-model="item1.comment"
                                    placeholder-class="placeholder"
                                    placeholder=""
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="3"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="optionalWrap">
                                <a-button
                                  type="primary"
                                  :disabled="!item1.comment"
                                  @click="handleSendComment(item, item1)"
                                  >回复</a-button
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="empty"
                          v-if="
                            listData1[item.id] && listData1[item.id].length == 0
                          "
                        >
                          <img
                            :src="require('@/assets/img/empty.png')"
                            alt=""
                          />
                          <p class="emptyDesc">当前暂无评论</p>
                        </div>
                        <div class="pagination">
                          <a-pagination
                            show-size-changer
                            :pageSizeOptions="['10', '20', '50', '80', '100']"
                            :pageSize="rows"
                            @showSizeChange="sizeChange"
                            v-model:current="page"
                            :total="total"
                            @change="ChangePage"
                            :show-total="(total) => `共 ${total} 条`"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="empty" v-if="listData.length == 0">
                  <img :src="require('@/assets/img/empty.png')" alt="" />
                  <p class="emptyDesc">当前暂无数据</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rightContent">
        <div class="panel panel3">
          <div class="panel-head">
            <div class="panel-title">标签</div>
            <div class="panel-btn"></div>
          </div>
          <div class="panel-bd">
            <div class="tag-container">
              <div
                class="labCls"
                id="asklabeid_10"
                @click="loadQuestionData('服务业')"
              >
                <a href="javascript:void(0);" class="" title="服务业">服务业</a>
              </div>
              <div
                class="labCls"
                id="asklabeid_9"
                @click="loadQuestionData('房地产')"
              >
                <a href="javascript:void(0);" class="" title="房地产">房地产</a>
              </div>
              <div
                class="labCls"
                id="asklabeid_8"
                @click="loadQuestionData('电讯业')"
              >
                <a href="javascript:void(0);" class="" title="电讯业">电讯业</a>
              </div>
              <div
                class="labCls"
                id="asklabeid_7"
                @click="loadQuestionData('宾馆')"
              >
                <a href="javascript:void(0);" class="" title="宾馆">宾馆</a>
              </div>
              <div
                class="labCls"
                id="asklabeid_6"
                @click="loadQuestionData('餐饮')"
              >
                <a href="javascript:void(0);" class="" title="餐饮">餐饮</a>
              </div>
              <div
                class="labCls"
                id="asklabeid_5"
                @click="loadQuestionData('能源')"
              >
                <a href="javascript:void(0);" class="" title="能源">能源</a>
              </div>
              <div
                class="labCls"
                id="asklabeid_4"
                @click="loadQuestionData('采矿')"
              >
                <a href="javascript:void(0);" class="" title="采矿">采矿</a>
              </div>
              <div
                class="labCls"
                id="asklabeid_3"
                @click="loadQuestionData('保险业')"
              >
                <a href="javascript:void(0);" class="" title="保险业">保险业</a>
              </div>
              <div
                class="labCls"
                id="asklabeid_2"
                @click="loadQuestionData('互联网')"
              >
                <a href="javascript:void(0);" class="" title="互联网">互联网</a>
              </div>
              <div
                class="labCls"
                id="asklabeid_1"
                @click="loadQuestionData('制造业')"
              >
                <a href="javascript:void(0);" class="" title="制造业">制造业</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loadingWrap" v-if="loading">
      <loading-outlined></loading-outlined>
      <span class="loadinglabel">正在加载中，请稍候...</span>
    </div>
    <Delete
      :isShow="isDelete"
      :desc="deleteDesc"
      :sObjectName="sObjectName"
      :recordId="recordId"
      :objTypeCode="objectTypeCode"
      :external="external"
      @cancel="closeDelete"
      @ok="deleteOk"
    />
    <ImageView
      v-if="isPhoto"
      :isShow="isPhoto"
      :photoParams="photoParams"
      @cancel="isPhoto = false"
    />
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  defineEmits,
  toRaw,
  defineProps,
  nextTick,
  h,
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
import calendar from "dayjs/plugin/calendar";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);
import {
  UserOutlined,
  LikeOutlined,
  DeleteOutlined,
  ExportOutlined,
  MessageOutlined,
  BarsOutlined,
  MoreOutlined,
  SearchOutlined,
  LikeFilled,
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
  EyeOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import Delete from "@/components/listView/Delete.vue";
import TEditor from "@/components/TEditor.vue";
import ImageView from "@/components/file/ImageView.vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  title: String,
  id: String,
  RegardingObjectTypeCode: String,
});
const editorRef = ref();
const editorRef2 = ref();
const radioStyle = reactive({
  display: "flex",
  height: "30px",
  lineHeight: "30px",
});
const token = localStorage.getItem("token");
const data = reactive({
  listData: [],
  listData1: {},
  page0: 1,
  rows0: 10,
  total0: 0,
  page: 1,
  rows: 10,
  total: 0,
  text: "",
  description: "",
  activeKey: "1",
  searchVal: "",
  isDelete: false,
  recordId: "",
  objectTypeCode: "6000",
  sObjectName: "Chatter",
  deleteDesc: "确定要删除吗？",
  external: false,
  OwningUser: "",
  OwningUserName: "",
  id: "",
  uploadId: "",
  item: {},
  keyIndex: 1,
  selectmenu: 1,
  type: 1,
  typeitem: "",
  loading: false,
  VoteOptions: [
    {
      name: "",
      displayOrder: 1,
    },
    {
      name: "",
      displayOrder: 2,
    },
    {
      name: "",
      displayOrder: 3,
    },
  ],
  fileList: [],
  ImageList: [],
  uploadData: {
    id: "",
  },
  headers: {
    Authorization: token,
    Token: token,
  },
  isPhoto: false,
  photoParams: {},
  isShowDetail: false,
});
const {
  isShowDetail,
  fileList,
  ImageList,
  uploadData,
  headers,
  isPhoto,
  photoParams,
  id,
  uploadId,
  item,
  VoteOptions,
  activeKey,
  loading,
  typeitem,
  type,
  OwningUserName,
  listData1,
  selectmenu,
  keyIndex,
  listData,
  page0,
  rows0,
  total0,
  page,
  rows,
  total,
  text,
  searchVal,
  isDelete,
  recordId,
  objectTypeCode,
  sObjectName,
  deleteDesc,
  external,
} = toRefs(data);
const changeMenu = (e) => {
  data.isShowDetail = false;
  data.selectmenu = e;
  data.keyIndex = 1;
  data.page0 = 1;
  data.ImageList = [];
  data.VoteOptions = [
    {
      name: "",
      displayOrder: 1,
    },
    {
      name: "",
      displayOrder: 2,
    },
    {
      name: "",
      displayOrder: 3,
    },
  ];
  data.text = "";
  data.description = "";
  if (data.activeKey == "0" && editorRef && editorRef.value) {
    editorRef.value.content = "";
  }
  if (data.activeKey == "1" && editorRef2 && editorRef2.value) {
    editorRef2.value.content = "";
  }
  getStatusList();
};
const getValue = (list) => {
  var row = list.find(function (v) {
    return v.isChecked == true;
  });
  return (row && row.pollOptionId) || "";
};
const getStatusList = () => {
  data.loading = true;
  if (data.keyIndex) {
  } else {
    return false;
  }
  if (data.keyIndex == 1) {
    data.listData = [];
  }
  data.total0 = 0;
  //data.listData = [];
  let url = Interface.question.query;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          pageSize: data.rows0,
          pageNumber: data.keyIndex,
          ChatterTypeCode: 1,
          search: data.searchVal || "",
        },
      },
    ],
  };
  if (data.selectmenu == 2) {
    d.actions[0].params.CreatedBy = data.OwningUser;
  }
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(url, obj).then((res) => {
    var list = [];
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.rows
    ) {
      data.total0 =
        res.actions[0].returnValue.total ||
        res.actions[0].returnValue.rows.length ||
        0;
      for (var i = 0; i < res.actions[0].returnValue.rows.length; i++) {
        var item = res.actions[0].returnValue.rows[i];
        for (var cell in item) {
          if (cell == "CreatedOn" || cell == "createdOn") {
            item["CreatedOn"] = item[cell]
              ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm")
              : "";
          }
        }
        item["OwningUser"] = item.createdByName || "";
        item["OwningUserId"] = item.createdBy || "";
        item["Content"] =
          item.text == ""
            ? '<span style="color:rgba(0, 0, 0, 0.25);">暂无内容</span>'
            : item.text;
        item["Description"] = item.description == "" ? "" : item.description;
        item["NumOfLike"] = item.numOfLike || 0;
        item["NumOfComment"] = item.numOfComment || 0;
        item["IsLike"] = item.isLike * 1 == 1 ? true : false;
        item["options"] = item.options || [];
        item["value"] =
          item.options && item.options.length ? getValue(item.options) : "";
        item["pictures"] = item.pictures || [];
        item["totalPeople"] = item.totalPeople || 0;
        for (var j = 0; j < item.options.length; j++) {
          let ite = item.options[j];
          ite.percentage =
            ite.checkedQty && item.totalPeople
              ? (((ite.checkedQty * 1) / item.totalPeople) * 1 * 100).toFixed(1)
              : 0;
        }
        list.push(item);
      }
    }
    if (list && list.length) {
      data.listData = data.listData.concat(list);
    }
    //data.listData = list;
  });
  setTimeout(function () {
    data.loading = false;
  }, 500);
};
//改变页码-问题
const ChangePage0 = (page, pageSize) => {
  data.page0 = page;
  data.rows0 = pageSize;
  getStatusList();
};
const sizeChange0 = (current, size) => {
  ChangePage0(current, size);
};
//改变页码-评论
const ChangePage = (page, pageSize) => {
  data.page = page;
  data.rows = pageSize;
  getCommentList("", "");
};
const sizeChange = (current, size) => {
  ChangePage(current, size);
};
const key = "updatable";
const handleSendStatus = () => {
  if (data.text == "") {
    notification.open({
      key,
      message: "内容不能为空！",
    });
  } else {
    let url = Interface.status.submit;
    let d = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            text: data.text,
            chatterTypeCode: data.activeKey,
            description: data.description,
            location: {
              location: "",
              buidingName: "",
              longitude: "",
              latitude: "",
            },
            visible: {
              visibleType: 0,
            },
          },
        },
      ],
    };
    if (data.activeKey == "0") {
      url = Interface.status.submit;
      //d.actions[0].params.pictures = data.ImageList;
    }
    if (data.activeKey == "1") {
      url = Interface.question.submit;
      d.actions[0].params.description = data.description;
    }
    if (data.activeKey == "30400") {
      url = Interface.poll.submit;
      d.actions[0].params.options = data.VoteOptions;
    }
    let obj = {
      message: JSON.stringify(d),
    };
    proxy.$post(url, obj).then((res) => {
      if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
        message.success("发送成功！");
        data.keyIndex = 1;
        data.page0 = 1;
        data.ImageList = [];
        data.VoteOptions = [
          {
            name: "",
            displayOrder: 1,
          },
          {
            name: "",
            displayOrder: 2,
          },
          {
            name: "",
            displayOrder: 3,
          },
        ];
        data.text = "";
        data.description = "";
        if (data.activeKey == "0") {
          editorRef.value.content = "";
        }
        if (data.activeKey == "1") {
          editorRef2.value.content = "";
        }
        getStatusList();
      }
    });
  }
};
const handleSendComment = (item, item1) => {
  if (item1.comment == "") {
    notification.open({
      key,
      message: "评论内容不能为空！",
    });
  } else {
    let text = item1.comment;

    if (item.id && item1.id && item.id != item1.id) {
      text =
        data.OwningUserName +
        " 回复 " +
        item1.OwningUser +
        "：" +
        item1.comment;
    }

    let url = Interface.status.sendComment;
    let d = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            statusId: item.id,
            text: text,
          },
        },
      ],
    };

    let obj = {
      message: JSON.stringify(d),
    };
    proxy.$post(url, obj).then((res) => {
      if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
        message.success("评论成功！");
        getCommentList(item.id, item);
        item1.comment = "";
      }
    });
  }
};
const getCommentList = (id, ite) => {
  data.listData.forEach((v) => {
    v.IsShowReply = false;
  });
  data.listData1[data.id] = [];
  data.total = 0;
  if (id) {
    data.id = id;
    data.item = ite;
    data.page = 1;
  }
  let item0 = data.item;
  item0.IsShowReply = true;
  let url = Interface.status.comment;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          id: data.id,
          pageSize: data.rows,
          pageNumber: data.page,
        },
      },
    ],
  };

  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(url, obj).then((res) => {
    var list = [];
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.rows
    ) {
      data.total =
        res.actions[0].returnValue.pageInfo.total ||
        res.actions[0].returnValue.rows.length ||
        0;
      for (var i = 0; i < res.actions[0].returnValue.rows.length; i++) {
        var item = res.actions[0].returnValue.rows[i];
        for (var cell in item) {
          if (cell == "CreatedOn" || cell == "createdOn") {
            item["CreatedOn"] = item[cell]
              ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm")
              : "";
          }
        }
        item["OwningUser"] = item.createdByName || "";
        item["OwningUserId"] = item.createdBy || "";
        item["Content"] =
          item.text == ""
            ? '<span style="color:rgba(0, 0, 0, 0.25);">暂无内容</span>'
            : item.text;
        item["NumOfLike"] = item.numOfLike || 0;
        item["NumOfComment"] = item.numOfComment || 0;
        item["IsLike"] = item.isLike * 1 == 1 ? true : false;
        item["id"] = item.commentId;
        list.push(item);
      }
    }
    data.listData1[data.id] = list;
    if (item0) {
      item0.NumOfComment = list.length;
    }
  });
};
// 删除
const handleDelete = (e, type, typeitem) => {
  data.type = type;
  data.typeitem = typeitem;
  data.recordId = e;
  if (type * 1 == 1) {
    data.objectTypeCode = "6000";
    data.sObjectName = "Chatter";
  } else {
    data.objectTypeCode = "6005";
    data.sObjectName = "ChatterComment";
  }
  data.isDelete = true;
};
const closeDelete = (e) => {
  data.recordId = "";
  data.isDelete = false;
};
const deleteOk = (e) => {
  if (data.type * 1 == 1) {
    data.keyIndex = 1;
    data.page0 = 1;
    getStatusList();
  } else {
    getCommentList(data.typeitem.id, data.typeitem);
  }
};
const loadQuestionData = (e) => {
  //data.searchVal = e;
  data.keyIndex = 1;
  data.page0 = 1;
  getStatusList();
};
const onSearch = () => {
  data.keyIndex = 1;
  data.page0 = 1;
  getStatusList();
};
const getInputContent = (e) => {
  data.text = e;
};
const getInputContent2 = (e) => {
  data.description = e;
};
const addQuestionOption = () => {
  data.VoteOptions.push({
    name: "",
    displayOrder: data.VoteOptions.length + 1,
  });
};
const deleteVoteOption = (index) => {
  data.VoteOptions.splice(index, 1);
};
const changeTab = (e) => {
  data.ImageList = [];
  data.VoteOptions = [
    {
      name: "",
      displayOrder: 1,
    },
    {
      name: "",
      displayOrder: 2,
    },
    {
      name: "",
      displayOrder: 3,
    },
  ];
  data.activeKey = e;
  data.keyIndex = 1;
  data.page0 = 1;
  data.text = "";
  data.description = "";
  getStatusList();
};
//获取评论点赞
const getLike = (item) => {
  item.NumOfLike = item.NumOfLike || 0;
  item.LikeId = "";
  item.IsLike = false;
  let filterQuery = "\CommentId\teq\t" + item.id;
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "6004",
      entityName: "ChatterLike",
      filterQuery: filterQuery,
      search: "",
      page: 1,
      rows: 100,
      sort: "",
      order: "desc",
      displayColumns: "CreatedBy",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        item.NumOfLike =
          item.NumOfLike || (res.pageInfo ? res.pageInfo.total : 0);
        for (var i = 0; i < res.nodes.length; i++) {
          var ite = res.nodes[i];
          if (ite.CreatedBy.userValue.Value == data.OwningUser) {
            item.IsLike = true;
            item.LikeId = ite.id;
          }
        }
      }
    });
};
//问题点赞&取消点赞
const handleLike1 = (item) => {
  let url = Interface.status.setStatusLike;
  if (!item.IsLike) {
    let d = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            id: item.id,
            likeAction: 1,
          },
        },
      ],
    };
    let obj = {
      message: JSON.stringify(d),
    };
    proxy.$post(url, obj).then((res) => {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state &&
        res.actions[0].state == "SUCCESS"
      ) {
        message.success("点赞成功！");
        item.NumOfLike = item.NumOfLike * 1 > 0 ? item.NumOfLike * 1 + 1 : 1;
        item.IsLike = !item.IsLike;
      } else {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].state &&
          res.actions[0].errorMessage
        ) {
          message.error(res.actions[0].errorMessage);
        } else {
          message.error("点赞失败！");
        }
      }
    });
  } else {
    let d = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            id: item.id,
            likeAction: 0,
          },
        },
      ],
    };
    let obj = {
      message: JSON.stringify(d),
    };
    proxy.$post(url, obj).then((res) => {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state == "SUCCESS"
      ) {
        message.success("取消点赞成功");
        item.NumOfLike =
          item.NumOfLike * 1 - 1 > 0 ? item.NumOfLike * 1 - 1 : 0;
        item.IsLike = !item.IsLike;
      } else {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].errorMessage
        ) {
          message.success(res.actions[0].errorMessage);
        } else {
          message.error("取消点赞失败");
        }
      }
    });
  }
};
//评论点赞&取消点赞
const handleLike2 = (item) => {
  let url = Interface.status.setCommentLike;
  if (!item.IsLike) {
    let d = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            id: item.id,
            likeAction: 1,
          },
        },
      ],
    };
    let obj = {
      message: JSON.stringify(d),
    };
    proxy.$post(url, obj).then((res) => {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state &&
        res.actions[0].state == "SUCCESS"
      ) {
        message.success("点赞成功！");
        item.NumOfLike = item.NumOfLike * 1 > 0 ? item.NumOfLike * 1 + 1 : 1;
        item.IsLike = !item.IsLike;
      } else {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].state &&
          res.actions[0].errorMessage
        ) {
          message.error(res.actions[0].errorMessage);
        } else {
          message.error("点赞失败！");
        }
      }
    });
  } else {
    let d = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            id: item.id,
            likeAction: 0,
          },
        },
      ],
    };
    let obj = {
      message: JSON.stringify(d),
    };
    proxy.$post(url, obj).then((res) => {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state == "SUCCESS"
      ) {
        message.success("取消点赞成功");
        item.NumOfLike =
          item.NumOfLike * 1 - 1 > 0 ? item.NumOfLike * 1 - 1 : 0;
        item.IsLike = !item.IsLike;
      } else {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].errorMessage
        ) {
          message.success(res.actions[0].errorMessage);
        } else {
          message.error("取消点赞失败");
        }
      }
    });
  }
};
const ContentRadioChange = (e, item) => {
  //console.log(e,111)
  item.value = e.target.value;
};
//投票
const handlePoll = (item) => {
  if (item.value) {
  } else {
    return;
  }
  let url = Interface.poll.response;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          pollId: item.id,
          optionIds: [item.value],
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(url, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state &&
      res.actions[0].state == "SUCCESS"
    ) {
      message.success("投票成功！");
      item.isSubmit = true;
      item.totalPeople = item.totalPeople * 1 + 1;
      for (var j = 0; j < item.options.length; j++) {
        if (item.options[j].pollOptionId == item.value) {
          item.options[j].isChecked = true;
          item.options[j].checkedQty =
            item.options[j].checkedQty * 1 > 0
              ? item.options[j].checkedQty * 1 + 1
              : 1;
        }
        item.options[j].percentage =
          item.options[j].checkedQty && item.totalPeople
            ? (
                ((item.options[j].checkedQty * 1) / (item.totalPeople * 1)) *
                100
              ).toFixed(1)
            : 0;
      }
    } else {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state &&
        res.actions[0].errorMessage
      ) {
        message.error(res.actions[0].errorMessage);
      } else {
        message.error("投票失败！");
      }
    }
  });
};
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const beforeUpload = (e) => {
  //console.log("beforeUpload", e);
  if (e) {
    getBase64(e).then((imageUrl) => {
      data.ImageList.push({
        id: e.uid,
        downloadUrl: imageUrl,
        viewUrl: imageUrl,
        fileExtension: "png",
        name: e.name,
      });
    });
    //message.success("上传成功！");
  }
};
const changeFiles = (e) => {
  //console.log("changeFiles", e);
};
const changeRequest = (e) => {
  //console.log("changeRequest", e);
};
//预览图片
const handlePreviewFile = (item, index) => {
  data.photoParams = {
    id: item.id,
    item: item,
    imageList: data.ImageList,
    index: index,
  };
  data.isPhoto = true;
};
//删除图片
const deleteFile = (index) => {
  data.ImageList.splice(index, 1);
};
//打开详情
const handleDetail = (item) => {
  data.listData = [item];
  data.isShowDetail = true;
  getCommentList(item.id, item);
};
//返回主页列表
const returnBack = () => {
  changeMenu(data.selectmenu);
};
onMounted(() => {
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.OwningUser = userInfo.userId;
    data.OwningUserName = userInfo.fullName;
    if (data.OwningUser == "jackliu") {
      data.OwningUser = "2ec00cf2-a484-4136-8fef-e2a2719c5ed6";
    }
    data.OwningUser = data.OwningUser.toUpperCase();
  }
  getStatusList();
  window.addEventListener(
    "scroll",
    function () {
      if (document.getElementsByClassName("CommunityCommentWrap").length) {
      } else {
        return;
      }
      var clientHeight = document.getElementsByClassName(
        "CommunityCommentWrap"
      )[0].clientHeight;
      var scrollTop = document.getElementsByClassName("CommunityCommentWrap")[0]
        .scrollTop;
      var scrollHeight = document.getElementsByClassName(
        "CommunityCommentWrap"
      )[0].scrollHeight;
      if (
        scrollTop &&
        clientHeight &&
        clientHeight + scrollTop >= scrollHeight &&
        !data.isShowDetail
      ) {
        data.keyIndex = data.keyIndex + 1;
        getStatusList();
      }
    },
    true
  );
});
</script>
<style lang="less">
.CommunityCommentWrap {
  width: 100%;

  .panelCommunityCommentWrap {
    padding: 0 80px;

    .commentBox {
      display: flex;

      .leftAvatar {
        margin-right: 12px;
      }

      .rightTextare {
        flex: 1;
        border-radius: 2px;

        .textarea {
          width: 100%;
          height: 100px;
          min-height: 22px;
          border-radius: 4px;
          background: #f2f3f5;
          padding-top: 12px;
          padding-left: 12px;
          font-size: 14px;
          border: none;
          outline: 0;
          resize: vertical;
        }
      }
    }

    .optionalWrap {
      text-align: right;
      padding-top: 10px;

      .ant-upload-wrapper {
        float: left;
      }

      .optionalWrapLeft {
        float: left;
      }

      .optionalWrapRight {
        float: right;
      }
    }

    .commentList {
      .commentItemBox {
        display: flex;
        margin-top: 20px;

        .leftAvatar {
          font-size: 36px;
          color: #c9cdd4;
          margin-right: 12px;
        }

        .rightComment {
          flex: 1;
          overflow: hidden;
          position: relative;

          .commentName {
            font-size: 14px;
            color: #ff7d00;
          }

          .commentContent {
            margin: 6px 0;
          }

          .commentTime {
            font-size: 12px;
            color: #86909c;
          }

          .commentBtn {
            font-size: 12px;
            color: #86909c;
          }

          .commentMore {
            position: absolute;
            top: -5px;
            right: 0px;
            font-size: 15px;
            color: #86909c;

            .btn-drop {
              font-size: 22px;
              transform: rotate(-90deg);
              -moz-transform: rotate(-90deg);
              -webkit-transform: rotate(-90deg);
              display: block;
              cursor: pointer;
            }
          }
        }
      }
    }

    .pagination {
      margin-top: 20px;
      text-align: right;
      max-height: 74px;
    }
  }

  .commentAvatar {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0px;
  }

  .ant-avatar {
    // background: transparent !important;
    width: 40px !important;
    height: 40px !important;
    line-height: 40px !important;
  }

  .ant-avatar .ant-avatar-string {
    left: 0 !important;
    transform: unset !important;
  }

  .deleteComment {
    cursor: pointer;
    margin-left: 8px;
  }

  height: 100%;

  .panel {
    height: 100%;
    padding: 0;
  }

  .panelCommunityCommentWrap {
    padding: 0 15px;
    padding-right: 15px;
    height: 100%;
    padding-left: 0px;
  }

  .panelCommunityCommentWrap .commentBox {
    padding-left: 5px;
  }

  .panel-bd {
    height: calc(~"100% - 40px") !important;
  }

  .commentList {
    height: calc(~"100% - 225px") !important;
    overflow: auto;
    margin-top: 18px;
  }

  .commentTime {
    text-align: left;
    margin-top: 3px;
  }

  .commentBtn {
    text-align: right;
  }

  .panelCommunityCommentWrap .commentList .commentItemBox {
    margin: 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
    padding-right: 20px;
    padding-top: 20px;
    padding-left: 20px;
  }

  // .panelCommunityCommentWrap .commentList .commentItemBox:hover{
  //     background: #e9f7ff !important;
  // }
  .ant-avatar {
    line-height: 36px !important;
    position: relative;
    top: -8px;
  }

  .commentBtn-item {
    font-size: 14px;
    margin-left: 10px;
    cursor: pointer;
    color: #666;
    margin-left: 80px;
    text-align: left;

    .anticon {
      font-size: 15px;
      margin-right: 10px;
    }
  }

  .commentBtn-item:first-child {
    margin-left: 100px;
  }

  .commentBtn-item:last-child {
    margin-left: 80px;
  }
}

.ant-pagination {
  .ant-pagination-item {
    border: 1px solid #d9d9d9;
  }

  .ant-pagination-item:hover {
    border: 1px solid #1677ff;
    background: #fff !important;
  }

  .ant-pagination-item-active,
  .ant-pagination-item-active:hover {
    border: 1px solid #1677ff;
    background: #1677ff !important;

    a {
      color: #fff;
    }
  }
}

.CommunityCommentWrap {
  overflow: auto;
  height: 100%;
  padding: 0px;

  .mainContent {
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 1122px;
    margin: 0 auto;

    .leftContent {
      width: 182px;
      height: 100%;
      margin-right: 10px;
    }

    .middleContent {
      width: auto;
      flex: 1;
      margin-right: 10px;
      height: 100%;

      .commentContent {
        cursor: pointer;
      }
    }

    .detailContent {
      .detailContentTop {
        width: 100%;
        height: 46px;
        line-height: 46px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 14px;
        margin-top: 3px;
        position: relative;

        .detailContentTopIcon {
          font-size: 16px;
          font-weight: bold;
        }

        .detailContentTopText {
          font-size: 16px;
          font-weight: bold;
          margin-left: 10px;
        }
      }
    }

    .rightContent {
      width: 280px;
      height: 100%;
    }
  }

  .panel0 {
    height: 100%;
    padding: 20px 18px;

    .panel-title {
      font-size: 22px;
      color: #333;
      // font-weight: normal;
      font-weight: 500;
    }

    .left-menu {
      width: 100%;
      height: 100%;

      .left-menu-item {
        position: relative;
        padding: 10px 10px;
        cursor: pointer;
        color: #333;
        font-weight: 500;
        font-size: 16px;

        .left-menu-item-icon {
          width: 22px;
          height: 22px;
          font-size: 20px;
          position: relative;
          top: 1px;
        }

        .left-menu-item-label {
          margin-left: 10px;
        }
      }

      .left-menu-item:hover {
        color: #ff8200;
      }

      .left-menu-item-active {
        color: #ff8200;
      }
    }
  }

  .panel1 {
    min-height: 370px;
    height: auto;
    margin-bottom: 10px;
    padding: 15px;
    padding-top: 15px;
    padding-right: 0;

    .panel-head {
      margin-bottom: 15px !important;
    }

    .ant-avatar {
      top: 0px !important;
    }
  }

  .panel2 {
    height: calc(~"100% - 230px");
    height: auto !important;
    margin-bottom: 0;

    .commentList {
      height: calc(~"100% - 15px") !important;
      height: auto !important;
      margin-top: 0 !important;
      background: #e8edf4;

      .commentItemBox {
        background: #fff;
        margin-bottom: 10px;
        border-radius: 5px;
      }
    }

    .commentSearch {
      padding: 3px 0px 5px 0;
      margin-bottom: 10px;
      background: #fff;
      border-radius: 5px;

      :deep .ant-input {
        text-indent: 5px;
        height: 26px;
      }

      .wea-left-tree-search {
        width: 100%;
        height: 46px;
        line-height: 46px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 14px;
        margin-top: 3px;
        position: relative;

        :deep .ant-input {
          border: none !important;
        }

        .wea-left-tree-search-label {
          display: inline-block;
          padding-left: 14px;
          min-width: 76px;
          cursor: pointer;
          font-weight: 600;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
          color: #666;
        }

        .wea-left-tree-search-icon {
          color: #bbb;
          position: absolute;
          right: 20px;
          top: 0px;
          z-index: 1;
          font-size: 18px;
          display: block;
          width: 22px;
          height: 22px;
        }
      }
    }

    .panelCommunityCommentWrap {
      padding-right: 0;
      background: #e8edf4;
    }
  }

  .panel3 {
    height: 100%;
    padding: 15px;

    .panel-title {
      color: #333;
      font-size: 15px;
    }

    .tag-container {
      margin: 0px 10px 0px 5px;
      overflow: hidden;
      padding-bottom: 7px !important;
    }

    .tag-container div {
      float: left;
      padding: 0px 7px;
      line-height: 24px;
      background-color: rgb(238, 250, 240) !important;
      border-radius: 4px;
      color: #5b9c4a !important;
      margin: 8px 8px 0px 0px;

      a {
        color: #5b9c4a !important;
        font-size: 12px;
      }
    }
  }

  .panelCommunityCommentWrap .pagination {
    padding: 15px 15px 13px;
    background: #fff;
    margin-top: 0;
  }

  .commentBtn {
    text-align: center;
    display: flex;
    margin-top: 15px;

    .commentBtn-item {
      //margin-right: 30px;
      flex: 1;

      .anticon {
        margin-right: 10px;
      }
    }
  }

  .leftAvatar .ant-avatar .anticon {
    position: relative;
    left: 0.9px;
    font-size: 22px;
    top: 1.1px;
  }
  .ant-btn {
    border-radius: 20px !important;
  }
  .ant-btn-primary {
    background: #ff7d00 !important;
    border: 1px solid #ff7d00 !important;
    color: #fff !important;
  }
  .ant-btn-primary:hover {
    opacity: 0.8;
  }
  .ant-btn-primary:disabled {
    background: #ff7d00 !important;
    border: 1px solid #ff7d00 !important;
    opacity: 0.5;
    color: #fff !important;
  }
  .commentReply {
    margin-top: 12px;

    .commentBox {
      padding-left: 0px;
    }

    .commentBox .rightTextare .textarea {
      height: 30px;
      padding-top: 8px;
      position: relative;
      top: 5px;
    }

    .ant-avatar {
      width: 30px !important;
      height: 30px !important;
    }

    .leftAvatar .ant-avatar .anticon {
      font-size: 16px;
      top: -5px;
    }

    .optionalWrap {
      padding-top: 0px;
    }

    .ant-btn {
      font-size: 13px;
      height: 26px;
      padding: 0px 10px;
      border-radius: 20px !important;
      padding-top: 2px;
    }

    .commentList {
      background: transparent;
    }

    .commentList .commentItemBox {
      margin-bottom: 0;
      background: transparent;
      padding-left: 0 !important;
    }

    .commentBtn {
      display: block;
      margin-top: 0px;
      text-align: right !important;
    }

    .commentBtn-item {
      margin-left: 10px !important;
    }

    .commentBtn-item:last-child .anticon {
      margin-right: 5px;
    }
  }

  .ant-input-clear-icon {
    position: relative !important;
    right: 22px !important;
  }

  .ant-input {
    border: none !important;
  }

  .TEditorWrap {
    padding: 10px;
  }

  .tabContainer {
    background: #f3f3f3;

    .ant-tabs-tab:hover,
    .ant-tabs-tab-active {
      background: #fff;

      .ant-tabs-tab-btn {
        color: #333;
        font-weight: bolder;
      }
    }

    .ant-tabs-ink-bar {
      display: none;
    }
  }

  .panelCommunityCommentWrap .commentBox0 {
    display: block;
    border: 2px solid #eeeeee;
    border-radius: 8px;
    overflow: hidden;
    padding-left: 0;
  }

  button.tox-tbtn.tox-tbtn--select.tox-tbtn--bespoke {
    width: 90px !important;
  }
}

.a-menu-item-label {
  margin-left: 5px !important;
}

.loadingWrap {
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);

  .loadinglabel {
    font-size: 22px;
    margin-left: 25px;
  }
}

:deep .tox .tox-edit-area::before {
  border-radius: 10px !important;
}

.CommunityCommentWrap {
  .empty {
    height: 140px !important;
    margin-bottom: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    color: #666;
    background: #fff;

    img {
      width: 50px;
    }

    .emptyDesc {
      font-size: 14px;
    }
  }

  .VoteWrap {
    padding: 15px;
  }

  .QuestionWrap {
    padding: 15px;
  }

  .commentBox .ant-input {
    border: 1px solid #dedede !important;
    border-radius: 4px !important;
    margin-bottom: 6px;
  }

  .VoteLabel,
  .QuestionLabel {
    margin-bottom: 6px;
  }

  .VoteOption {
    display: flex;

    .anticon {
      margin-left: 10px;
      position: relative;
      top: -3px;
    }
  }

  .option-percentage {
    width: 100%;
    display: flex;
    position: relative;
    top: -10px;

    .option-progress {
      margin: 0 !important;

      .ant-progress-inner {
        background-color: #e5e5e5;
      }

      .ant-progress-outer {
        padding-right: 15px !important;
        padding-top: 3px !important;
      }

      .ant-progress-bg {
        background-color: #1677ff !important;
      }

      .anticon-check-circle,
      .ant-progress-text {
        display: none !important;
      }
    }

    .option-count {
      font-size: 14px;
      color: #666;
      margin-left: 0px;
      width: 420px;
    }
  }

  .ant-radio-group {
    display: block;
    margin: 5px 0;

    .ant-radio-wrapper {
      height: auto !important;
    }
  }

  .VoteItem {
    padding: 13px 0px 0px 0px;
    background-color: #f8f8f8;

    .commentContentItem {
      padding-left: 13px;
    }

    .ant-radio-group {
      padding-left: 13px;
    }

    .vote-shur-btn {
      font-size: 15px;
      text-align: center;
      height: 38px;
      line-height: 36px;
      border-top: 1px solid #ebedec;
      cursor: pointer;
      background-color: #f8f8f8;
      color: #1677ff;
      font-weight: bold;

      .disabled {
        cursor: not-allowed;
        color: #999;
        font-weight: normal;
        height: 38px;
      }
    }

    .vote-shur-btn:hover {
      background-color: #eee;

      .disabled {
        background-color: #f8f8f8;
      }
    }
  }

  .commentContentRadio.isSubmit {
    .ant-radio {
      position: relative;
      top: -13px;
    }
  }

  .RelaseInfoUpload {
    height: auto;
    width: 100%;
    padding: 0;

    .uploadPanel {
      .ant-upload-drag {
        background: transparent !important;
        width: 124px;
        border: none !important;
      }

      .ant-upload-wrapper {
        width: 124px !important;
        display: inline-block;
      }

      .uploadRow {
        height: 100%;
        line-height: 115px;
      }
    }

    .uploadPanel {
      .inboxFileList {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        position: relative;
        left: 4px;

        .ant-btn.ant-btn-text,
        .ant-btn.ant-btn-text:hover {
          color: #000 !important;
        }

        .inboxFileItem {
          width: 134px;
          height: 134px;
          border-radius: 4px;
          background: #f2f3f5;
          padding: 5px;
          box-sizing: border-box;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          display: flex;
          overflow: hidden;
          position: relative;

          .FileInfo {
            flex: 1;
            margin-left: 0px;
            overflow: hidden;
            color: #1d2129;
            width: 124px;
            height: 124px;
            position: relative;
            top: 0px;

            img {
              width: 124px;
              height: 124px;
            }

            .fileSize {
              color: #4e5969;
              padding-top: 4px;
            }

            .fileOptionShow {
              position: absolute;
              width: calc(~"100% - 0px");
              height: 124px;
              left: 0;
              top: 0;
              background: rgba(242, 243, 245, 0.8);
              display: none;

              .btns {
                display: flex;
                align-items: center;
                height: 100%;
                justify-content: center;
                padding-right: 0px;
                box-sizing: border-box;
              }
            }
          }

          &:hover .fileOptionShow {
            display: block;
          }
        }
      }
    }
  }

  .picturesList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .img {
      width: 165px;
      height: 165px;
      border-radius: 4px;
      background: #f2f3f5;
      padding: 5px;
      box-sizing: border-box;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      display: flex;
      overflow: hidden;
      position: relative;
    }
  }

  .linkMore {
    height: 33px;
    background: #fff;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: end;

    .linkMoreText {
      margin-right: 10px;
    }

    .linkMoreIcon {
      font-size: 14px;
      position: relative;
      top: -2px;
    }
  }

  .linkMore:hover {
    color: #ff7d00;
  }
}
</style>
