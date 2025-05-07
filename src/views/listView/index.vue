<template>
  <div class="pageWrapper">
    <div class="home home2" ref="contentRef" v-if="viewType == 'list'">
      <div class="headFilter" ref="headFilterRef">
        <div class="headerTop">
          <div class="leftAll">
            <div class="menuImg" :style="{background:initialData?.recordThemeInfo?.primaryPalette ? '#'+initialData?.recordThemeInfo?.primaryPalette:'red'}">
                <img class="img" :src="Interface.pathUrl+initialData?.recordThemeInfo?.iconImageURL" alt="" />
            </div>
            <div class="menu-box">
              <div class="label">{{title}}</div>
              <div class="row">
                <div class="triggerLinkTextAndIconWrapper" @click.stop="isFilterPicker=true">
                  <h1>{{ currentFilter.name }}</h1>
                  <svg class="fh-svg-icon" focusable="false" data-key="down" aria-hidden="true" viewBox="0 0 520 520"
                    part="icon">
                    <g>
                      <path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"></path>
                    </g>
                  </svg>
                  <div class="listViewPickerPanel" v-if="isFilterPicker">
                    <div class="fh-searchbox">
                      <span class="fh-icon-utility-search">
                        <svg focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                          <g>
                            <path
                              d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z">
                            </path>
                          </g>
                        </svg>
                      </span>
                      <input class="fh-search" v-model="searchFilterVal" type="text" placeholder="搜索列表..."
                        @input="serachFilter">
                    </div>
                    <ul class="fh-dropdown__list">
                      <li class="fh-dropdown__header fh-text-heading--label">最近列表视图</li>
                      <li class="fh-dropdown__item" v-for="(item, index) in filterList" :key="index"
                        @click.stop="handleSwitchFilter(item)">
                        <a href="javascript:void(0);">
                          <span class="fh-icon-utility-check">
                            <svg class="fh-svg" v-if="currentFilter.id == item.id" focusable="false" data-key="check"
                              aria-hidden="true" viewBox="0 0 520 520" part="icon">
                              <g>
                                <path
                                  d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z">
                                </path>
                              </g>
                            </svg>
                          </span>
                          <span class="virtualAutocompleteOptionText">
                            {{item.name}}
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="lockBtn" title="固定此列表视图" @click="handleLock">
                  <img v-if="isLock" :src="require('@/assets/pinned14.png')" class="img active" alt="" />
                  <img v-else :src="require('@/assets/pin_italic14.png')" class="img active" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="rightBtns">
            <!-- <a-button @click="handleNew">新建</a-button> -->
            <div class="btnBox" v-for="(item, index) in actionList" :key="index">
              <div class="btnGroup ml4" v-if="Array.isArray(item)">
                <a-button v-for="(row, idx) in item" :key="idx" @click="handleClickBtn(row.devNameOrId)">{{ row.label
                  }}</a-button>
              </div>
              <a-button class="ml4" @click="handleClickBtn(item.devNameOrId)" v-else>{{ item.label }}</a-button>
            </div>
          </div>
        </div>
        <div class="searchWrap">
          <div class="searchVal">
            <a-tooltip placement="bottomLeft" title="客户所有人别名不可搜索。使用筛选器，或改为对此字段进行排序。">
              <a-input placeholder="搜索此列表..." style="width: 240px;" v-model:value="queryParams.search"
                @pressEnter="handleSearch">
                <template #prefix>
                  <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true"
                    viewBox="0 0 520 520" part="icon">
                    <g>
                      <path
                        d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z">
                      </path>
                    </g>
                  </svg>
                </template>
              </a-input>
            </a-tooltip>
          </div>
          <div class="search-btns">
            <a-dropdown :trigger="['click']">
              <a-tooltip placement="topLeft" title="列表视图控制">
                <a-button class="ant-btn-icon ml4">
                  <svg class="btn_icon" focusable="false" data-key="settings" aria-hidden="true" viewBox="0 0 520 520"
                    part="icon">
                    <g>
                      <path
                        d="M261 191c-39 0-70 31-70 70s31 70 70 70 70-31 70-70-31-70-70-70zm210 133l-37-31a195 195 0 000-68l37-31c12-10 16-28 8-42l-16-28a34 34 0 00-40-14l-46 17a168 168 0 00-59-34l-8-47c-3-16-17-25-33-25h-32c-16 0-30 9-33 25l-8 46a180 180 0 00-60 34l-46-17-11-2c-12 0-23 6-29 16l-16 28c-8 14-5 32 8 42l37 31a195 195 0 000 68l-37 31a34 34 0 00-8 42l16 28a34 34 0 0040 14l46-17c18 16 38 27 59 34l8 48a33 33 0 0033 27h32c16 0 30-12 33-28l8-48a170 170 0 0062-37l43 17 12 2c12 0 23-6 29-16l15-26c9-11 5-29-7-39zm-210 47c-61 0-110-49-110-110s49-110 110-110 110 49 110 110-49 110-110 110z">
                      </path>
                    </g>
                  </svg>
                  <svg class="btn_icon btn_icon_small" focusable="false" data-key="down" aria-hidden="true"
                    viewBox="0 0 520 520" part="icon">
                    <g>
                      <path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z">
                      </path>
                    </g>
                  </svg>
                </a-button>
              </a-tooltip>
              <template #overlay>
                <a-menu class="fh-menu listViewMenu" @click="handleMenuClick">
                  <span class="fh-menu-desc">列表视图控制</span>
                  <a-menu-item class="listView-menuItem" key="1"
                    :disabled="!initialData?.entityListViewPermissions?.canCreateListView">新建</a-menu-item>
                  <a-menu-item class="listView-menuItem" key="2">导出</a-menu-item>
                  <a-menu-item class="listView-menuItem" key="3">复制</a-menu-item>
                  <a-menu-item class="listView-menuItem" key="4">重命名</a-menu-item>
                  <a-menu-item class="listView-menuItem" key="5">共享设置</a-menu-item>
                  <a-menu-item class="listView-menuItem" key="6">选择要显示的字段</a-menu-item>
                  <a-menu-item class="listView-menuItem" key="7">删除</a-menu-item>
                  <a-menu-item class="listView-menuItem" key="8" disabled>Kanban设置</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-dropdown class="ml4" :trigger="['click']">
              <a-tooltip placement="topLeft" title="选择列表显示">
                <a-button class="ant-btn-icon">
                  <svg class="btn_icon" focusable="false" data-key="table" aria-hidden="true" viewBox="0 0 520 520"
                    part="icon">
                    <g>
                      <path
                        d="M465 20H55c-8 0-15 7-15 15v50c0 8 7 15 15 15h410c8 0 15-7 15-15V35c0-8-7-15-15-15zM145 140H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 240H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 340H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 440H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15z">
                      </path>
                    </g>
                  </svg>
                  <svg class="btn_icon btn_icon_small" focusable="false" data-key="down" aria-hidden="true"
                    viewBox="0 0 520 520" part="icon">
                    <g>
                      <path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"></path>
                    </g>
                  </svg>
                </a-button>
              </a-tooltip>
              <template #overlay>
                <a-menu class="fh-menu listViewMenu" style="width: 136px;" @click="changePageType">
                  <span class="fh-menu-desc" style="font-weight: bold;">选择列表显示</span>
                  <a-menu-item class="listView-menuItem" key="list">
                    <span class="successIcon">
                      <svg v-if="viewType == 'list'" focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u=""
                        data-key="check" class="iconSvg">
                        <g lwc-1e39mgvor8u="">
                          <path
                            d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"
                            lwc-1e39mgvor8u=""></path>
                        </g>
                      </svg>
                    </span>
                    <span class="text">
                      列表
                    </span>
                    <span class="listView-img">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-798fdvkdslc=""
                        data-key="table" class="iconSvg">
                        <g lwc-798fdvkdslc="">
                          <path
                            d="M465 20H55c-8 0-15 7-15 15v50c0 8 7 15 15 15h410c8 0 15-7 15-15V35c0-8-7-15-15-15zM145 140H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 240H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 340H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 440H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15z"
                            lwc-798fdvkdslc=""></path>
                        </g>
                      </svg>
                    </span>
                  </a-menu-item>
                  <a-menu-item class="listView-menuItem" key="card">
                    <span class="successIcon">
                      <svg v-if="viewType == 'card'" focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u=""
                        data-key="check" class="iconSvg">
                        <g lwc-1e39mgvor8u="">
                          <path
                            d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"
                            lwc-1e39mgvor8u=""></path>
                        </g>
                      </svg>
                    </span>
                    <span class="text">
                      卡片
                    </span>
                    <span class="listView-img">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-7ieqdqdoapk=""
                        data-key="kanban" class="iconSvg">
                        <g lwc-7ieqdqdoapk="">
                          <path
                            d="M320 175c0-8-7-15-15-15h-90c-8 0-15 7-15 15v270c0 8 7 15 15 15h90c8 0 15-7 15-15zm-180 0c0-8-7-15-15-15H35c-8 0-15 7-15 15v310c0 8 7 15 15 15h90c8 0 15-7 15-15zm360 0c0-8-7-15-15-15h-90c-8 0-15 7-15 15v230c0 8 7 15 15 15h90c8 0 15-7 15-15zm0-140c0-8-7-15-15-15H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h450c8 0 15-7 15-15z"
                            lwc-7ieqdqdoapk=""></path>
                        </g>
                      </svg>
                    </span>
                  </a-menu-item>
                  <a-menu-item class="listView-menuItem" key="screen">
                    <span class="successIcon">
                      <svg v-if="viewType == 'screen'" focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u=""
                        data-key="check" class="iconSvg">
                        <g lwc-1e39mgvor8u="">
                          <path
                            d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"
                            lwc-1e39mgvor8u=""></path>
                        </g>
                      </svg>
                    </span>
                    <span class="text">
                      分屏视图
                    </span>
                    <span class="listView-img">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-4md4vihfsb1=""
                        data-key="side_list" class="iconSvg">
                        <g lwc-4md4vihfsb1="">
                          <path
                            d="M485 40H215c-8 0-15 7-15 15v410c0 8 7 15 15 15h270c8 0 15-7 15-15V55c0-8-7-15-15-15zm-340 0H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15V55c0-8-7-15-15-15zm0 120H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15v-50c0-8-7-15-15-15zm0 120H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15v-50c0-8-7-15-15-15zm0 120H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15v-50c0-8-7-15-15-15z"
                            lwc-4md4vihfsb1=""></path>
                        </g>
                      </svg>
                    </span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-tooltip placement="topLeft" title="刷新">
              <a-button title="刷新" class="ant-btn-icon ml4" @click="handleRefresh">
                <svg class="btn_icon" focusable="false" data-key="refresh" aria-hidden="true" viewBox="0 0 520 520"
                  part="icon">
                  <g>
                    <path
                      d="M465 40h-30c-8 0-15 7-15 15v70c0 9-5 13-12 7l-10-10a210 210 0 10-12 309c7-6 7-16 1-22l-21-21c-5-5-14-6-20-1a152 152 0 01-172 14 152 152 0 0177-281 150 150 0 01118 58c3 8-4 12-13 12h-70c-8 0-15 7-15 15v31c0 8 6 14 14 14h183c7 0 13-6 13-13V55c-1-8-8-15-16-15z">
                    </path>
                  </g>
                </svg>
              </a-button>
            </a-tooltip>
            <div class="btnGroup ml4">
              <a-tooltip placement="topLeft" title="图表">
                <a-button class="ant-btn-icon" :class="{'active':isChartModal}" title="图表"
                  @click="handleShowChart">
                  <svg class="btn_icon" focusable="false" data-key="chart" aria-hidden="true" viewBox="0 0 520 520"
                    part="icon">
                    <g>
                      <path
                        d="M455 234L250 347a20 20 0 01-30-18V84c0-10-10-18-19-15a220 220 0 10276 175c-2-10-13-15-22-10zm-178 46l197-105c12-6 16-22 8-33A302 302 0 00287 22c-14-3-27 8-27 22v226c0 9 9 14 17 10z">
                      </path>
                    </g>
                  </svg>
                </a-button>
              </a-tooltip>
              <a-tooltip placement="topLeft" title="筛选器">
                <a-button class="ant-btn-icon" :class="{'active':isFilterModal}" title="筛选器" @click="handleShowFilter">
                  <svg class="btn_icon" focusable="false" data-key="filterList" aria-hidden="true" viewBox="0 0 520 520"
                    part="icon">
                    <g>
                      <path
                        d="M483 40H39c-15 0-22 17-13 28l194 227c6 7 9 17 9 26v144c0 8 8 15 16 15h30c8 0 14-7 14-15V321c0-10 4-19 11-26L496 68c9-11 2-28-13-28z">
                      </path>
                    </g>
                  </svg>
                </a-button>
              </a-tooltip>
            </div>
            <a-tooltip placement="topLeft" title="高级搜索">
              <a-button class="ant-btn-icon ml4" :class="{'active':isSearchModal}" @click="handleShowSearch">
                <svg class="btn_icon" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520"
                  part="icon">
                  <g>
                    <path
                      d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z">
                    </path>
                  </g>
                </svg>
              </a-button>
            </a-tooltip>
          </div>
        </div>
      </div>
      <div class="todo-content" :style="{height:(tableHeight)+'px'}">
        <a-row>
          <a-col :span="'24'" class="wea-left-right-layout-right">
            <div style="height: 100%">
              <div class="wea-tabContent" :style="{height:(tableHeight)+'px'}" ref="tabContent">
                <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="(tableHeight)"
                  :isCollapsed="isCollapsed"></Dtable>
                <div class="filterModalWrap" v-if="isFilterModal">
                  <Filter @close="closeFilterModal" :sObjectName="sObjectName" :filterId="currentFilter.id"
                    @success="refreshFilterLoad" />
                </div>
                <div class="chartModalWrap" v-if="isChartModal">
                  <ChartAside @close="isChartModal=false" :filterId="currentFilter.id" :sObjectName="sObjectName" />
                </div>
                <div class="listRightModal searchModalWrap" v-if="isSearchModal">
                  <SearchQuery :sObjectName="sObjectName" :filterId="currentFilter.id" @cancel="isSearchModal = false"
                    @load="loadSearchQuery"></SearchQuery>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <SplitScreenView v-else-if="viewType == 'screen'" :entityApiName="sObjectName" @type="changePageType" @clickBtn="handleClickBtn"></SplitScreenView>
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="listId?'编辑':'新建'"
      @success="handleSearch" :id="listId" :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName"></common-form-modal>

    <!-- 弹窗 -->
    <NewVue :isShow="isNewModal" v-if="isNewModal" @cancel="isNewModal=false" @load="getFilterList"
      :sObjectName="sObjectName" />
    <Copy :isShow="isCopyModal" v-if="isCopyModal" @cancel="isCopyModal=false" @load="getFilterList"
      :sObjectName="sObjectName" :recordId="currentFilter.id" />
    <Rename :isShow="isRenameModal" v-if="isRenameModal" @cancel="isRenameModal=false" @load="loadRenameSuccess"
      :sObjectName="sObjectName" :recordId="currentFilter.id" />
    <export-field :isShow="isExportModal" v-if="isExportModal" @cancel="isExportModal=false" :sObjectName="sObjectName"
      :recordId="currentFilter.id"></export-field>
    <share-setting :isShow="isShareModal" v-if="isShareModal" @cancel="isShareModal=false" @load="getFilterList"
      :sObjectName="sObjectName" :recordId="currentFilter.id"></share-setting>
    <show-field :isShow="isShowModal" v-if="isShowModal" @cancel="isShowModal=false" @load="getListConfig"
      :sObjectName="sObjectName" :recordId="currentFilter.id"></show-field>
    <DeleteVue :isShow="isDeleteModal" v-if="isDeleteModal" :desc="desc" @cancel="isDeleteModal=false"
      :recordId="deleteId" :sObjectName="sObjectName" @ok="deleteSuccess" />

    <!-- 动态组件弹窗 -->
    <!-- <component :is="component" :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="listId?'编辑':'新建'"
      @success="handleSearch" :id="listId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" /> -->
  </div>
</template>
<script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
    CheckOutlined,
    SettingOutlined,
    RedoOutlined,
    SearchOutlined

  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick } from "vue";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";

  // 新建列表视图
  import NewVue from "@/components/listView/New.vue";
  import Copy from "@/components/listView/Copy.vue";
  import Rename from "@/components/listView/Rename.vue";
  import ShareSetting from "@/components/listView/ShareSetting.vue";
  // 导出字段
  import ExportField from "@/components/listView/ExportField.vue";
  import ShowField from "@/components/listView/ShowField.vue";
  import DeleteVue from "@/components/listView/Delete.vue";
  // 筛选器弹层
  import Filter from "@/components/listView/Filter.vue";
  // 图表
  import ChartAside from "@/components/listView/ChartAside.vue";
  import SearchQuery from "@/components/listView/SearchQuery.vue";
  import SplitScreenView from "@/components/commonListPage/SplitScreenView.vue";

  import { message } from "ant-design-vue";
  import moment from "moment";
  import { formTreeData } from "@/utils/common.js";
  import { getComponent, getActionFunc } from "@/utils/ButtonLinkActions.js";
  const { proxy } = getCurrentInstance();
  const headFilterRef = ref(null);

  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    queryParams: {
      entityType: route.params.sObjectName,
      objectTypeCode: '',
      search: "",
      filterId: ""
    },
    isModal: false,
    isCirculation: false,
    isCommon: false,
    currentMenu: "全部",
    menus: [
      {
        id: 1,
        name: "全部",
      },
      {
        id: 2,
        name: "未审批的轮转",
      },
      {
        id: 3,
        name: "本科轮科人员",
      },
      {
        id: 4,
        name: "我创建的",
      },
    ],
    isLock: false,
    filterList: [],
    currentFilter: {
      id: "",
      name: ""
    },
    isNewModal: false,
    isExportModal: false,
    isCopyModal: false,
    isRenameModal: false,
    isShareModal: false,
    isShowModal: false,
    isDeleteModal: false,
    isFilterModal: false,
    isFilterPicker: false,
    searchFilterVal: "",
    filterListFixed: [],
    entityType: route.params.sObjectName,
    sObjectName: route.params.sObjectName,
    initialData: {}, // 元数据
    actionList: [],
    title: "",
    isChartModal: false, // 图表
    columns: [],
    objectTypeCode: "",
    listBtnActions: [],
    listId: "",
    desc: "如果您删除此列表视图，该视图将为所有具备访问权限的用户永久删除。是否确定要删除？",
    deleteType: 0,
    deleteId: "",
    isSearchModal: false,
    component: null,
    viewType: "list"
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { component, isCollapsed, tableHeight, isFilterPicker,
    isModal, isCirculation, isCommon, isLock, filterList, currentFilter,
    isNewModal, isExportModal, isCopyModal, isRenameModal, isShareModal, isShowModal,
    isDeleteModal, isFilterModal, searchFilterVal, filterListFixed, entityType,
    initialData, actionList, title, sObjectName, isChartModal, columns, objectTypeCode, listBtnActions,
    listId, desc, deleteType, deleteId, isSearchModal, queryParams, viewType } = toRefs(data);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);

  const changePageType = ({ key }) => {
    data.viewType = key;
    if(key == "list"){
      nextTick(()=>{
        initLoad();
      })
    }
  }
  const handleSwitchFilter = (item) => {
    data.isFilterModal = false;
    data.currentFilter = {
      id: item.id,
      name: item.name
    };
    data.isFilterPicker = false;
    let row = data.filterList.find(item => item.id == data.currentFilter.id);
    if (row) {
      data.isLock = row.isPinned;
    }
    data.queryParams.filterId = item.id;
    columns.value = [];
    getListConfig();
  };
  const handleLock = () => {
    data.isLock = !data.isLock;
    if (!data.isLock) { return false }
    let url = Interface.listView.pinListView;
    let d = {
      actions: [{
        id: "7696;a",
        descriptor: "serviceComponent://ui.force.components.controllers.lists.listViewManager.ListViewManagerController/ACTION$updateListView",
        callingDescriptor: "UNKNOWN",
        params: {
          entityKeyPrefixOrApiName: data.sObjectName,
          listViewIdOrName: data.currentFilter.id
        }
      }]
    };
    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
      if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
        message.success("固定成功");
      }
      else {
        if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
          message.error(res.actions[0].errorMessage);
        }
        else {
          message.error("固定失败");
        }
      }
    })
  };
  onMounted(() => {
    window.addEventListener('resize', changeHeight);
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    })
    window.addEventListener('click', () => {
      data.isFilterPicker = false;
    })
  })
  function changeHeight(h) {
    if (typeof h == 'number') {
      formSearchHeight.value = h;
    }
    let headFilterHeight = headFilterRef.value.clientHeight;
    let contentHeight = contentRef.value.clientHeight; 1
    data.tableHeight = contentHeight - headFilterHeight - 8;
  }

  const gridUrl = ref(Interface.listView.list);
  // const columns = ref([]);

  // 通用弹窗关闭
  const handleCommonCancel = (params) => {
    data.isCommon = params;
  };

  const handleSearch = () => {
    gridRef.value.loadGrid(data.queryParams);
  }

  // 获取元数据
  const getMetadataInitialLoad = async () => {
    let response;
    await proxy.$get(Interface.listView.getMetadataInitialLoad, {
      entityType: data.entityType,
      // sObjectName: data.sObjectName,
      // name: "",
    }).then(res => {
      console.log("res1", res);
      response = res;
    })
    return response;
  }
  // getMetadataInitialLoad().then(res=>{
  //   console.log("resAsync", res);
  //   data.initialData = res.actions[0].returnValue;
  //   data.currentFilter = {
  //     id: data.initialData.listViewId,
  //     name: data.initialData.listViewLabel
  //   }
  //   data.title = data.initialData.breadCrumbList.length ? data.initialData.breadCrumbList[0].label : '';
  //   data.queryParams.filterId = data.currentFilter.id;
  //   //getActions();
  //   getActionsTop();
  //   getListConfig();
  //   getFilterList();
  // });
  const loadRenameSuccess = (e) => {
    data.currentFilter.name = e;
    getFilterList();
  }

  const refreshFilterLoad = () => {
    getActionsTop();
    getListRowActions();
    getListConfig();
    getFilterList();
  }
  const handleRefresh = () => {
    refreshFilterLoad();
  }
  const handleShowSearch = () => {
    data.isChartModal = false;
    data.isFilterModal = false;
    data.isSearchModal = true;
  }
  const loadSearchQuery = (e) => {
    console.log("loadSearchQuery", e);
    data.isSearchModal = false;
    data.queryParams.filterCondition = JSON.stringify(e);
    refreshFilterLoad();
  }
  const initLoad = () => {
    columns.value = [];
    getMetadataInitialLoad().then(res => {
      console.log("resAsync", res);
      data.initialData = res.actions[0].returnValue;
      let entityType = res.actions[0].returnValue.recordThemeInfo.entityType;
      data.objectTypeCode = entityType;
      data.currentFilter = {
        id: data.initialData.listViewId,
        name: data.initialData.listViewLabel
      }
      data.title = data.initialData.breadCrumbList.length ? data.initialData.breadCrumbList[0].label : '';
      data.queryParams.filterId = data.currentFilter.id;
      getActionsTop();
      getListRowActions();
      getListConfig();
      getFilterList();
    });
  };

  watch(() => route.params.sObjectName, (newVal, oldVal) => {
    //console.log("route.params.sObjectName", newVal, oldVal);
    if (route.params.sObjectName) {
      data.sObjectName = route.params.sObjectName;
      data.entityType = route.params.sObjectName;
      data.queryParams.entityType = route.params.sObjectName;
      initLoad();
    }
  }, { immediate: true })

  const getActions = () => {
    proxy.$get(Interface.listView.actions, {
      entityApiName: data.sObjectName,
      entityType: data.entityType
    }).then(res => {
      let actions = res.actions[0].returnValue;
      let actionList = [];
      data.actionList = actions;
    })
  }
  const getActionsRow = () => {
    let d = {
      actions: [{

        "id": "",
        "descriptor": "",
        "callingDescriptor": "UNKNOWN",
        "params": {
          "recordId": "",
          "context": "LIST_VIEW_RECORD",
          "actionTypes": [
            "standardButton"
          ],
          "inContextOfRecordId": null,
          "listNameOrId": "",
          "entityApiName": data.sObjectName,
          "isLABPreview": false,
          "actionsRequestId": 1
        }


      }]
    };
    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(Interface.listView.actionsrow, obj).then((res) => {
      var temp = [];
      if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
        data.listViewActions = res.actions[0].returnValue;
      }
    });
  };
  const getActionsTop = () => {
    let d = {
      "actions": [
        {
          "id": "3817;a",
          "descriptor": "",
          "callingDescriptor": "UNKNOWN",
          "params": {
            "recordId": null,
            "context": "LIST_VIEW",
            "entityApiName": data.sObjectName,
            "record": null,
            "listNameOrId": "",
            "size": 5,
            "maxWidth": -1,
            "actionTypes": [],
            "bulkedAction": false,
            "actionNames": [],
            "enableActionsConfiguration": false,
            "isLABPreview": false,
            "actionsRequestId": 5
          }
        }
      ]

    };
    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(Interface.listView.actionstop, obj).then((res) => {
      var temp = [];
      if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
        var actionList = res.actions[0].returnValue;
        for (var i = 0; i < actionList.length; i++) {
          let item = actionList[i];
          if (item.isSeparator) {
            temp.push([item]);
          } else {
            if (Array.isArray(temp[temp.length - 1])) {
              temp[temp.length - 1].push(item);
            } else {
              temp.push(item);
            }
          }
        }
      }
      //console.log("temp", temp);
      data.actionList = temp;
    });
  };

  const getListRowActions = () => {
    let obj = {
      actions: [{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: "",
          context: "LIST_VIEW_RECORD",
          actionTypes: ["standardButton"],
          inContextOfRecordId: null,
          entityApiName: data.sObjectName,
          listNameOrId: "",
          isLABPreview: false,
          actionsRequestId: 1
        }
      }]
    }
    let d = {
      message: JSON.stringify(obj)
    };
    proxy.$post(Interface.listView.actionsrow, d).then(res => {
      if (res && res.actions[0].returnValue) {
        let list = res.actions[0].returnValue;
        data.listBtnActions = list;
        getListConfig();
      }
    })
  }

  const formatOper = (val, row, index, entityType, listBtnActions) => {
    var rowId = row["LIST_RECORD_ID"];
    var action = "";
    action += '<div class="iconBox">'
    action += '<div class="popup">'
    for (var i = 0; i < listBtnActions.length; i++) {
      var item = listBtnActions[i];
      action +=
        '<div class="option-item" href="javascript:;" onclick="' +
        [item.devNameOrId] +
        "('" +
        rowId +
        "','" +
        entityType +
        "')\">" +
        item.title +
        "</div>";
    }
    action += '</div><svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>'
    return action;
  }

  const getListConfig = () => {
    proxy.$get(Interface.listView.getFilterInfo, {
      entityType: data.entityType,
      objectTypeCode: data.objectTypeCode,
      search: "",
      filterId: data.currentFilter.id
    }).then(res => {
      let columns = [];
      var col = {
        field: "Action",
        title: "操作",
        formatter: function formatter(value, row, index) {
          return formatOper(
            value,
            row,
            index,
            data.entityType,
            data.listBtnActions
          );
        },
      };
      columns.push(col);
      let { fields } = res.actions[0].returnValue;
      fields.forEach(item => {
        columns.push({
          field: item.name,
          title: item.label,
          sortable: true
        });
      })
      data.columns = columns;
      nextTick(() => {
        gridRef.value.loadGrid(data.queryParams);
      })
    })
  }
  const getFilterList = () => {
    proxy.$get(Interface.listView.filterList, {
      entityType: data.entityType,
      objectTypeCode: data.objectTypeCode,
      search: ""
    }).then(res => {
      data.filterList = res.actions[0].returnValue;
      data.filterListFixed = JSON.parse(JSON.stringify(res.actions[0].returnValue));
      // data.currentFilter = data.filterList[0];
      let row = data.filterList.find(item => item.id == data.currentFilter.id);
      if (row) {
        data.isLock = row.isPinned;
      }
    })
  };

  const deleteSuccess = () => {
    if (data.deleteType == 0) {
      getFilterList();
    } else {
      getListConfig();
    }
  }

  const handleDeleteView = () => {
    let url = Interface.listView.deleteListView;
    let obj = {
      actions: [{
        id: "3450;a",
        descriptor: "serviceComponent://ui.force.components.controllers.lists.listViewManager.ListViewManagerController/ACTION$deleteListView",
        callingDescriptor: "UNKNOWN",
        params: {
          "entityApiName": data.sObjectName,
          "recordId": data.currentFilter.id,
          "newListViewIdOrName": "all"
        }
      }]
    };
    let d = {
      message: JSON.stringify(obj)
    }
    proxy.$post(url, d).then(res => {
      if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
        message.success("删除成功");
        getFilterList();
      }
      else {
        if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
          message.success(res.actions[0].errorMessage);
        }
        else {
          message.success("删除失败");
        }
      }
      data.isDeleteModal = false;
    })
  }

  // 右侧菜单操作
  const handleMenuClick = (e) => {
    // console.log(e);
    switch (e.key) {
      case "1":
        data.isNewModal = true;
        break;
      case "2":
        data.isExportModal = true;
        break;
      case "3":
        data.isCopyModal = true;
        break;
      case "4":
        data.isRenameModal = true;
        break;
      case "5":
        data.isShareModal = true;
        break;
      case "6":
        data.isShowModal = true;
        break;
      case "7":
        data.desc = "如果您删除此列表视图，该视图将为所有具备访问权限的用户永久删除。是否确定要删除？";
        data.deleteId = data.currentFilter.id;
        data.deleteType = 0;
        data.isDeleteModal = true;
        break;
    }
  };
  const handleShowChart = () => {
    data.isFilterModal = false;
    data.isSearchModal = false;
    data.isChartModal = true;
  };
  // 显示筛选器
  const handleShowFilter = () => {
    data.isChartModal = false;
    data.isSearchModal = false;
    data.isFilterModal = true;
  };
  const closeFilterModal = () => {
    data.isFilterModal = false;
  }
  const serachFilter = () => {
    console.log("data.serachFilter", data.searchFilterVal);
    data.filterList = data.filterListFixed.filter(item => {
      return item.name.indexOf(data.searchFilterVal) !== -1;
    })
  }
  
  const New = () => {
    data.listId = '';
    data.isCommon = true;
  }
  window.New = New;
  const Edit = (id) => {
    data.listId = id;
    data.isCommon = true;
  }
  window.Edit = Edit;

  const Delete = (id) => {
    console.log("id", id);
    data.listId = id;
    data.desc = "确定要删除吗？";
    data.deleteId = id;
    data.deleteType = 1;
    data.isDeleteModal = true;
  }
  window.Delete = Delete;

  const handleClickBtn = (devNameOrId) => {
    if (typeof (eval(devNameOrId)) == "function") {
      var result = eval(devNameOrId + "();");
    } else {

    }
  }
  watch(() => route, (newVal, oldVal) => {
    if (route.path) {
      data.component = getComponent(route.path);
    }
  }, { deep: true, immediate: true })
  onMounted(() => {
    getActionFunc();
  });
</script>
<style lang="less" scoped>
  @import url("@/style/listView.less");
  .pageWrapper {
    width: 100%;
    height: 100%;
  }

  .home.home2 {
    overflow: hidden;
    height: 100%;
    padding: 0px;
    background: transparent;
    position: relative;
    z-index: 1;
    left: 0;
    right: 0;
    transition: left .25s;

    /* background-image: url('~@/assets/img/lightning_blue_background.png');
        background-repeat: repeat-x;
        background-position: top left; */
    .todo-content {
      border-radius: 0 0 4px 4px;
      overflow: hidden;
    }
  }

  .headFilter {
    background: #f3f3f3 !important;
    /* border-bottom: 1px solid #dedede; */
    border-radius: 4px 4px 0 0;
  }

  .ant-btn:hover {
    z-index: 1 !important;
  }

  .ant-btn:active {
    z-index: 1 !important;
  }
</style>
<style>
  :where(.css-dev-only-do-not-override-kqecok).ant-tree {
    height: 100% !important;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-tree .ant-tree-list {
    height: 100% !important;
  }
</style>