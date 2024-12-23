<template>
    <!-- <div class="headerCalendar">
        <div class="breadcrumb">
            我的日程
        </div>
        <div class="headerRight"> -->
            <!-- <a-button type="primary" @click="handleAddSchedule">新建日程</a-button>
            <a-button class="ml10" @click="openShare">共享日历</a-button>
            <a-button class="ml10" @click="openImport">导入日历</a-button> -->
        <!-- </div>
    </div> -->
    <div class="calendarWrap" ref="calendarWrap">
        <div class="leftBox" v-if="!isCollapsed">
            
            <div class="calendarListGroup myCalendars" ref="calendarList1">
                <div class="calendarPanelHeader">
                    <h2>我的日历</h2>
                    <div class="calendarSettingsMenu">
                        <div class="svgiconbtn">
                            <!-- <a-dropdown :placement="placement">
                                <div class="groupBtn">
                                    <Icon name="Settings" width="15" hight="15" fill="#747474" />
                                </div>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item @click="CreateCalendar(0,'8')">新建日历</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown> -->
                        </div>
                    </div>
                </div>
                <ol class="calendarList calendarList1">
                    <template v-for="(item,index) in CalendarsData" :key="index">
                        <li class="calendarListItem" v-if="item.calendar.Id==data.CurrentUserId">
                            <div class="calendarLabel">
                                <!-- <input checked="checked" type="checkbox" class="uiInput--checkbox"> -->
                                <label class="calendarItemLabel">
                                    <div :style="{'background-color':(item.calendar.Color&&item.calendar.IsDisplayed?item.calendar.Color:'#fff'),'border':'1px solid '+(item.calendar.Color&&item.calendar.IsDisplayed?item.calendar.Color:'#bbb')}" @click="changeShow(item)" title="点击显示/隐藏日历" class="visibilityToggle"></div>
                                    <span :title="item.calendar.Name||''">{{item.calendar.Name||''}}</span>
                                </label>
                            </div>
                            <div class="calendarMenu">
                                <div class="svgiconbtn">
                                    <a-dropdown :placement="placement">
                                        <div class="groupBtn">
                                            <Icon name="Down" width="15" hight="15" fill="#747474" />
                                        </div>
                                        <template #overlay>
                                            <a-menu>
                                                <a-menu-item @click="onlyShow(item.calendar.Id)" v-if="item.calendar.CalendarActionsConfig.canShowOnlyCalendar">仅显示此日历</a-menu-item>
                                                <a-menu-item @click="openShare(item.calendar.Id)" v-if="item.calendar.CalendarActionsConfig.isCalendarShareable">共享日历</a-menu-item>
                                                <a-menu-item @click="handleAddSchedule(item.calendar)" v-if="item.calendar.CalendarActionsConfig.canAddEvent">添加事件</a-menu-item>
                                                <a-menu-item @click="CreateCalendar(item.calendar.Id,'8')" v-if="item.calendar.CalendarActionsConfig.isCalendarEditable">编辑日历</a-menu-item>
                                                <a-menu-item @click="handleDeleteCalendar(item.calendar.Id)" v-if="item.calendar.CalendarActionsConfig.isCalendarDeletable">移除日历</a-menu-item>
                                                <a-menu-divider />
                                                <a-menu-item v-if="item.calendar.CalendarActionsConfig.canModifyColor">
                                                    <ul class="scrollable">
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#e1b4e8')"><span class="colorItem" style="background-color: #e1b4e8;"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#c2c9e7')"><span class="colorItem" style="background-color: #c2c9e7;"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#a6d5f8')"><span class="colorItem" style="background-color: #a6d5f8"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#96dfd3')"><span class="colorItem" style="background-color: #96dfd3"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#96e9b9')"><span class="colorItem" style="background-color: #96e9b9"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#f9ea93')"><span class="colorItem" style="background-color: #f9ea93"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#f9ce94')"><span class="colorItem" style="background-color: #f9ce94"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#bc35bc')"><span class="colorItem" style="background-color: #bc35bc"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#5679c1')"><span class="colorItem" style="background-color: #5679c1"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#3e8ede')"><span class="colorItem" style="background-color: #3e8ede"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#00aea9')"><span class="colorItem" style="background-color: #00aea9"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#3eba4d')"><span class="colorItem" style="background-color: #3eba4d"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#f6bc26')"><span class="colorItem" style="background-color: #f6bc26"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#f7931e')"><span class="colorItem" style="background-color: #f7931e"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#570d8c')"><span class="colorItem" style="background-color: #570d8c"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#001970')"><span class="colorItem" style="background-color: #001970"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#0b2399')"><span class="colorItem" style="background-color: #0b2399"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#0a7476')"><span class="colorItem" style="background-color: #0a7476"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#0a6b51')"><span class="colorItem" style="background-color: #0a6b51"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#b67d11')"><span class="colorItem" style="background-color: #b67d11"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#b75d0d')"><span class="colorItem" style="background-color: #b75d0d"></span></li>
                                                    </ul>
                                                </a-menu-item>
                                                <a-menu-item class="selcustom" @click="$('.ant-dropdown').show()" v-if="item.calendar.CalendarActionsConfig.canModifyColor">选择自定义颜色
                                                    <el-color-picker :teleported="false" v-model="item.calendar.Color" @change="function(val){setColor(item.calendar.Id,val)}" show-alpha></el-color-picker>
                                                </a-menu-item>
                                            </a-menu>
                                        </template>
                                    </a-dropdown>
                                </div>
                            </div>
                        </li>
                    </template>
                </ol>
            </div>

            <div class="calendarListGroup myCalendars" ref="calendarList2">
                <div class="calendarPanelHeader">
                    <h2>其他日历</h2>
                    <div class="calendarSettingsMenu">
                        <div class="svgiconbtn">
                            <a-dropdown :placement="placement">
                                <div class="groupBtn">
                                    <Icon name="Settings" width="15" hight="15" fill="#747474" />
                                </div>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item @click="CreateCalendar2(0,'20006')">添加日历</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </div>
                    </div>
                </div>
                <ol class="calendarList calendarList2" :style="{height:height2+'px'}">
                    <template v-for="(item,index) in OtherCalendarList" :key="index">
                        <li class="calendarListItem" v-if="item.calendar.CalendarListPanelSection!='MY_CALENDARS'||item.calendar.CalendarTypeCode=='4003'">
                            <div class="calendarLabel">
                                <!-- <input checked="checked" type="checkbox" class="uiInput--checkbox"> -->
                                <label class="calendarItemLabel">
                                    <div :style="{'background-color':(item.calendar.Color&&item.calendar.IsDisplayed?item.calendar.Color:'#fff'),'border':'1px solid '+(item.calendar.Color&&item.calendar.IsDisplayed?item.calendar.Color:'#bbb')}" @click="changeShow(item)" title="点击显示/隐藏日历" class="visibilityToggle"></div>
                                    <span :title="item.calendar.Name||''">{{item.calendar.Name||''}}</span>
                                </label>
                            </div>
                            <div class="calendarMenu">
                                <div class="svgiconbtn">
                                    <a-dropdown :placement="placement">
                                        <div class="groupBtn">
                                            <Icon name="Down" width="15" hight="15" fill="#747474" />
                                        </div>
                                        <template #overlay>
                                            <a-menu>
                                                <a-menu-item @click="onlyShow(item.calendar.Id)" v-if="item.calendar.CalendarActionsConfig.canShowOnlyCalendar">仅显示此日历</a-menu-item>
                                                <a-menu-item @click="openShare(item.calendar.Id)" v-if="item.calendar.CalendarActionsConfig.isCalendarShareable">共享日历</a-menu-item>
                                                <a-menu-item @click="handleAddSchedule(item.calendar)" v-if="item.calendar.CalendarActionsConfig.canAddEvent">添加事件</a-menu-item>
                                                <a-menu-item @click="CreateCalendar((item.calendar.ValueId||item.calendar.Id),'20006')" v-if="item.calendar.CalendarActionsConfig.isCalendarEditable">编辑日历</a-menu-item>
                                                <a-menu-item @click="handleDeleteCalendar(item.calendar.ValueId||item.calendar.Id)" v-if="item.calendar.CalendarActionsConfig.isCalendarDeletable">移除日历</a-menu-item>
                                                <a-menu-divider />
                                                <a-menu-item v-if="item.calendar.CalendarActionsConfig.canModifyColor">
                                                    <ul class="scrollable">
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#e1b4e8')"><span class="colorItem" style="background-color: #e1b4e8;"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#c2c9e7')"><span class="colorItem" style="background-color: #c2c9e7;"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#a6d5f8')"><span class="colorItem" style="background-color: #a6d5f8"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#96dfd3')"><span class="colorItem" style="background-color: #96dfd3"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#96e9b9')"><span class="colorItem" style="background-color: #96e9b9"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#f9ea93')"><span class="colorItem" style="background-color: #f9ea93"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#f9ce94')"><span class="colorItem" style="background-color: #f9ce94"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#bc35bc')"><span class="colorItem" style="background-color: #bc35bc"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#5679c1')"><span class="colorItem" style="background-color: #5679c1"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#3e8ede')"><span class="colorItem" style="background-color: #3e8ede"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#00aea9')"><span class="colorItem" style="background-color: #00aea9"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#3eba4d')"><span class="colorItem" style="background-color: #3eba4d"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#f6bc26')"><span class="colorItem" style="background-color: #f6bc26"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#f7931e')"><span class="colorItem" style="background-color: #f7931e"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#570d8c')"><span class="colorItem" style="background-color: #570d8c"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#001970')"><span class="colorItem" style="background-color: #001970"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#0b2399')"><span class="colorItem" style="background-color: #0b2399"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#0a7476')"><span class="colorItem" style="background-color: #0a7476"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#0a6b51')"><span class="colorItem" style="background-color: #0a6b51"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#b67d11')"><span class="colorItem" style="background-color: #b67d11"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor((item.calendar.ValueId||item.calendar.Id),'#b75d0d')"><span class="colorItem" style="background-color: #b75d0d"></span></li>
                                                    </ul>
                                                </a-menu-item>
                                                <a-menu-item class="selcustom" @click="$('.ant-dropdown').show()" v-if="item.calendar.CalendarActionsConfig.canModifyColor">选择自定义颜色
                                                    <el-color-picker :teleported="false" v-model="item.calendar.Color" @change="function(val){setColor((item.calendar.ValueId||item.calendar.Id),val)}" show-alpha></el-color-picker>
                                                </a-menu-item>
                                            </a-menu>
                                        </template>
                                    </a-dropdown>
                                </div>
                            </div>
                        </li>
                    </template>

                    <!-- <template v-for="(item,index) in PublicCalendarList" :key="index">
                        <li class="calendarListItem">
                            <div class="calendarLabel">
                                <label class="calendarItemLabel">
                                    <div :style="{'background-color':(item.calendar.Color&&item.calendar.IsDisplayed?item.calendar.Color:'#fff'),'border':'1px solid '+(item.calendar.Color&&item.calendar.IsDisplayed?item.calendar.Color:'#bbb')}" @click="changeShow(item)" title="点击显示/隐藏日历" class="visibilityToggle"></div>
                                    <span :title="item.calendar.Name||''">{{item.calendar.Name||''}}</span>
                                </label>
                            </div>
                            <div class="calendarMenu">
                                <div class="svgiconbtn">
                                    <a-dropdown :placement="placement">
                                        <div class="groupBtn">
                                            <Icon name="Down" width="15" hight="15" fill="#747474" />
                                        </div>
                                        <template #overlay>
                                            <a-menu>
                                                <a-menu-item @click="onlyShow(item.calendar.Id)" v-if="item.calendar.CalendarActionsConfig.canShowOnlyCalendar">仅显示此日历</a-menu-item>
                                                <a-menu-item @click="openShare(item.calendar.Id)" v-if="item.calendar.CalendarActionsConfig.isCalendarShareable">共享日历</a-menu-item>
                                                <a-menu-item @click="handleAddSchedule(item.calendar)" v-if="item.calendar.CalendarActionsConfig.canAddEvent">添加事件</a-menu-item>
                                                <a-menu-item @click="CreateCalendar(item.calendar.Id,'20006')" v-if="item.calendar.CalendarActionsConfig.isCalendarEditable">编辑日历</a-menu-item>
                                                <a-menu-item @click="handleDeleteCalendar(item.calendar.Id)" v-if="item.calendar.CalendarActionsConfig.isCalendarDeletable">移除日历</a-menu-item>
                                                <a-menu-divider />
                                                <a-menu-item v-if="item.calendar.CalendarActionsConfig.canModifyColor">
                                                    <ul class="scrollable">
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#e1b4e8')"><span class="colorItem" style="background-color: #e1b4e8;"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#c2c9e7')"><span class="colorItem" style="background-color: #c2c9e7;"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#a6d5f8')"><span class="colorItem" style="background-color: #a6d5f8"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#96dfd3')"><span class="colorItem" style="background-color: #96dfd3"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#96e9b9')"><span class="colorItem" style="background-color: #96e9b9"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#f9ea93')"><span class="colorItem" style="background-color: #f9ea93"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#f9ce94')"><span class="colorItem" style="background-color: #f9ce94"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#bc35bc')"><span class="colorItem" style="background-color: #bc35bc"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#5679c1')"><span class="colorItem" style="background-color: #5679c1"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#3e8ede')"><span class="colorItem" style="background-color: #3e8ede"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#00aea9')"><span class="colorItem" style="background-color: #00aea9"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#3eba4d')"><span class="colorItem" style="background-color: #3eba4d"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#f6bc26')"><span class="colorItem" style="background-color: #f6bc26"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#f7931e')"><span class="colorItem" style="background-color: #f7931e"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#570d8c')"><span class="colorItem" style="background-color: #570d8c"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#001970')"><span class="colorItem" style="background-color: #001970"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#0b2399')"><span class="colorItem" style="background-color: #0b2399"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#0a7476')"><span class="colorItem" style="background-color: #0a7476"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#0a6b51')"><span class="colorItem" style="background-color: #0a6b51"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#b67d11')"><span class="colorItem" style="background-color: #b67d11"></span></li>
                                                        <li class="calendarCalendarColorMenuItem" @click="setColor(item.calendar.Id,'#b75d0d')"><span class="colorItem" style="background-color: #b75d0d"></span></li>
                                                    </ul>
                                                </a-menu-item>
                                                <a-menu-item class="selcustom" @click="$('.ant-dropdown').show()" v-if="item.calendar.CalendarActionsConfig.canModifyColor">选择自定义颜色
                                                    <el-color-picker :teleported="false" v-model="item.calendar.Color" @change="function(val){setColor(item.calendar.Id,val)}" show-alpha></el-color-picker>
                                                </a-menu-item>
                                            </a-menu>
                                        </template>
                                    </a-dropdown>
                                </div>
                            </div>
                        </li>
                    </template> -->
                </ol>
            </div>

        </div>
        <div class="rightBox">
            <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
                :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div>
            <div class="calendarHeader">
                <div class="form">
                    <div class="formItem">
                        <span class="label">日程类型：</span>
                        <a-select v-model:value="formState.type" style="width: 200px;">
                            <a-select-option value="0">工作安排</a-select-option>
                            <a-select-option value="1">个人</a-select-option>
                        </a-select>
                    </div>
                    <div class="calendar-selectlist">
                        <div class="calendar-typechook">
                            <li :class="{'active':calendarType==0}" @click="calendarTypeChange(0)">日</li>
                            <li :class="{'active':calendarType==1}" @click="calendarTypeChange(1)">周</li>
                            <li :class="{'active':calendarType==2}" @click="calendarTypeChange(2)">月</li>
                        </div>
                    </div>
                    <div class="formItem ml10" v-if="calendarType==0">
                        <a-date-picker v-model:value="currentTime" @change="changeTime" />
                    </div>
                    <div class="formItem ml10 pickerTime" v-if="calendarType==1">
                        <span class="arrowIcon" @click="handlePrevWeek">
                            <LeftOutlined />
                        </span>
                        <a-date-picker v-model:value="startWeekTime" @change="changeStartTime" />
                        ~
                        <a-date-picker v-model:value="endWeekTime" @change="changeEndTime" />
                        <span class="arrowIcon" @click="handleNextWeek">
                            <RightOutlined />
                        </span>
                    </div>
                    <div class="formItem ml10" v-if="calendarType==2">
                        <a-date-picker v-model:value="monthValue" :format="monthFormat" picker="month" @change="changeMonth" />
                    </div>
                    <a-button :disabled="currentTimeNow==dayjs(currentTime).format('YYYY-MM-DD')" class="ml10" v-if="calendarType==0" @click="backNowTime(0)">今天</a-button>
                    <a-button :disabled="currentStartWeekTime==dayjs(startWeekTime).format('YYYY-MM-DD')&&currentEndWeekTime==dayjs(endWeekTime).format('YYYY-MM-DD')" class="ml10" v-if="calendarType==1" @click="backNowTime(1)">本周</a-button>
                    <a-button :disabled="currentMonthValue==dayjs(monthValue).format('YYYY-MM')" class="ml10" v-if="calendarType==2" @click="backNowTime(2)">本月</a-button>

                    <a-button class="ml10" :icon="h(RedoOutlined)" @click="calendarTypeChange(calendarType);" title="刷新"></a-button>
                </div>
               
                <div class="btnOptions">
                </div>
            </div>
            <div class="calendarBody">
                <!-- <MonthCalendar ref="MonthCalendarWrap" v-if="calendarType==2" :currentDate="currentDate" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @openNew="handleSelectCalendar" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" />
                <DayCalendar ref="DayCalendarWrap" v-if="calendarType==0" :id="id" :currentTime="currentTime"  @openNew="handleOpenNew" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" />
                <WeekVue ref="WeekVueWrap" v-if="calendarType==1" :week="week" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @openNew="handleOpenNew" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" /> -->
                <ScheduleFullCalendar ref="FullCalendarWrap" :calendarView="calendarView" :id="id" :currentTime="currentTime"  @openNew="handleOpenNew" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" @selectVal="handleNewScheduleVal" @getCalendarList="getCalendarList" />
            </div>
        </div>
        <NewCalendar :isShow="isNewCalendar" v-if="isNewCalendar" @cancel="isNewCalendar=false;" :id="CalendarId" :CalendarTypeCode="CalendarTypeCode" @selectVal="refreshScheduleVal" />
        <AddCalendar :isShow="isAddCalendar" v-if="isAddCalendar" @cancel="isAddCalendar=false;" @selectVal="getOtherCalendarList" />
        <NewSchedule :isShow="isSchedule" v-if="isSchedule" @cancel="cancelNewSchedule" />
        <AddSchedule :isShow="isAddSchedule" :id="id" v-if="isAddSchedule" :paramsTime="paramsTime" @cancel="cancelAddSchedule" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" @selectVal="handleNewScheduleVal" :calendarType="formState.type" :RegardingObjectTypeCode="RegardingObjectTypeCode" :RegardingObjectId=RegardingObjectId :RegardingObjectIdName="RegardingObjectIdName" :BgColor="BgColor" />
        <ImportSchedule :isShow="isImport" v-if="isImport"  @cancel="cancelImport" />
        <ShareCalendar :isShow="isShare" v-if="isShare"  @cancel="cancelShare" :id="CalendarId" />
        <ScheduleDetailModal ref="ScheduleDetailModal1" :isShow="isScheduleDetail" v-if="isScheduleDetail" :id="id" @cancel="isScheduleDetail=false" @selectVal="handleNewScheduleVal" @handleDelete="handleDelete" @edit="handleOpenEdit" />
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshScheduleVal" :sObjectName="sObjectName" :recordId="id" :objTypeCode="objectTypeCode" :external="external" />
        <DeleteCalendar :isShow="isDeleteCalendar" :desc="deleteDesc" @cancel="cancelDeleteCalendar" @ok="refreshCalendarList" :sObjectName="sObjectName2" :recordId="id" :objTypeCode="objectTypeCode2" :external="external" />
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
        nextTick
    } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import calendar from 'dayjs/plugin/calendar';
    import weekday from 'dayjs/plugin/weekday';
    import localeData from 'dayjs/plugin/localeData';
    
    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);

    import MonthCalendar from "@/components/schedule/calendar/ScheduleMonth.vue";
    import WeekVue from "@/components/schedule/calendar/ScheduleWeek.vue";
    import DayCalendar from "@/components/schedule/calendar/ScheduleDay2.vue";

    import ScheduleFullCalendar from "@/components/schedule/calendar/ScheduleFullCalendar.vue";
    // 新建
    import NewCalendar from "@/components/schedule/NewCalendar.vue";
    import AddCalendar from "@/components/schedule/AddCalendar.vue";
    import NewSchedule from "@/components/schedule/NewSchedule.vue";
    import AddSchedule from "@/components/schedule/AddSchedule.vue";
    import ShareCalendar from "@/components/schedule/ShareCalendar.vue";
    import ImportSchedule from "@/components/schedule/ImportSchedule.vue";
    // 详情
    import ScheduleDetailModal from "@/components/schedule/ScheduleDetailModal2.vue";
    import { SearchOutlined, DeleteOutlined, RedoOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import { girdFormatterValue } from "@/utils/common.js";
    import { getLunar } from 'chinese-lunar-calendar'
    // console.log('getLunar', getLunar(2023, 6, 27)); 
    import Delete from "@/components/listView/Delete.vue";
    import DeleteCalendar from "@/components/listView/Delete.vue";
    import { Lunar, Solar, HolidayUtil } from "lunar-javascript";
    import Icon from '@/components/icon/index.vue';
    const MonthCalendarWrap=ref(null);
    const DayCalendarWrap=ref(null);
    const WeekVueWrap=ref(null);
    const ScheduleDetailModal1=ref(null);
    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const monthFormat = 'YYYY/MM';
    const emit = defineEmits(['getCalendarActionsConfig']);
    const data = reactive({
        activeKey: "1",
        statusList: [
            {
                label: "全部",
                value: ""
            },
            {
                label: "草稿",
                value: "0"
            },
            {
                label: "已发布",
                value: "1"
            },
            {
                label: "已完成",
                value: "2"
            },
            {
                label: "已取消",
                value: "3"
            },
        ],
        statusCurrent: 0,
        MyCalendarList:[
            {
                Name: "我的事件",
                id: "",
                checked:true,
                Color:'#1677ff',
                CalendarTypeCode:'8'
            },
        ],
        PublicCalendarList:[],
        myCalendarCurrent: 0,
        searchVal: "",
        userListTree: [],
        userListTreeAll: [],
        meetingList: {},
        monthValue: dayjs(new Date()),
        calendarType: 2,
        calendarView:'dayGridMonth',
        currentTime: dayjs(),
        startWeekTime: "",
        endWeekTime: "",
        week: [],
        isSchedule: false,
        isAddSchedule: false,
        isShare: false,
        isImport: false,
        fileParams: {},
        paramsTime: {
            date: "",
            time: "",
            end:"",
            endDate:""
        },
        isCollapsed: false,
        isScheduleDetail: false,
        id: "",
        CalendarId:"",
        startTime:'',
        endTime:'',
        objectTypeCode:'4200',
        sObjectName:'ActivityPointer',
        isDelete: false,
        deleteDesc: '确定要删除吗？',
        external:false,
        treeId:'',
        isAddCalendar:false,
        isNewCalendar:false,
        placement:"bottomLeft",
        CalendarTypeCode:'',
        CurrentUserId:'',
        CurrentUserName:'',
        isDeleteCalendar:false,
        objectTypeCode2:'20006',
        sObjectName2:'CalendarFollow',
        RegardingObjectTypeCode:'',
        RegardingObjectId:'',
        RegardingObjectIdName:'',
        BgColor:'',
        CalendarsData:[],
        OtherCalendarList:[],
        height2:0,
        CalendarActionsConfig:{
            canAddEvent: false,
            canDragAndDropItems: false,
            canModifyColor: false,
            canShowOnlyCalendar: false,
            isCalendarDeletable: false,
            isCalendarEditable: false,
            isCalendarShareable: false,
            isCalendarToggleable: false,
            isCalendarUnsubscribable: false,
        }
    });
    const { CalendarActionsConfig,height2,OtherCalendarList,activeKey,MyCalendarList, PublicCalendarList,myCalendarCurrent, statusList, statusCurrent, searchVal, userListTree, userListTreeAll,meetingList,
         monthValue, calendarType, currentTime, startWeekTime, endWeekTime, week, isSchedule, isAddSchedule,treeId,isAddCalendar,isNewCalendar,CalendarId,CalendarTypeCode,RegardingObjectTypeCode,RegardingObjectId,RegardingObjectIdName,BgColor,placement,CalendarsData,
         isShare, isImport, fileParams, paramsTime, isCollapsed,isScheduleDetail,id,startTime,endTime,objectTypeCode,sObjectName,isDelete,objectTypeCode2,sObjectName2,isDeleteCalendar,deleteDesc,external,calendarView,CurrentUserId,CurrentUserName} = toRefs(data);
    const colors = ["#3399ff","#f0854e","#61cc53","#eb3d85"];
    const FullCalendarWrap=ref(null);
    const calendarWrap=ref(null);
    const calendarList1=ref(null);
    const calendarList2=ref(null);
    const calendarTypeChange=(e)=>{
        data.calendarType=e;
        if(e==2){
            data.startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
            data.endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
            data.calendarView='dayGridMonth';
            // nextTick(()=>{
            //     MonthCalendarWrap.value.getQuery();
            // })
        }
        else if(e==1){
            data.startTime = dayjs(data.startWeekTime).format("YYYY-MM-DD");
            data.endTime = dayjs(data.endWeekTime).format("YYYY-MM-DD");
            data.calendarView='timeGridWeek';
            // nextTick(()=>{
            //     WeekVueWrap.value.getQuery();
            // })
        }
        else if(e==0){
            data.startTime = dayjs(data.currentTime || new Date()).startOf("day").format("YYYY-MM-DD");
            data.endTime = dayjs(data.currentTime || new Date()).endOf('day').format('YYYY-MM-DD');
            data.calendarView='timeGridDay';
            // nextTick(()=>{
            //     DayCalendarWrap.value.getQuery();
            // })
        }
        nextTick(()=>{
            FullCalendarWrap.value.getQuery();
        })
    }
    const backFn = (list) => {
        var len = list.length;
        var index = Math.floor(Math.random() * len);
        return colors[index];
    }
    const formState = reactive({
        type: ""
    })
    // 周/日历 点击单元格新建
    const handleOpenNew = (params) => {
        data.id='';
        data.paramsTime = params;
        data.isAddSchedule = true;
    }
    // 月历 点击单元格新建
    const handleSelectCalendar = (e,info) => {
        data.id='';
        data.paramsTime={
            date: e.format("YYYY-MM-DD"),
            time: ""
        }
        data.isAddSchedule = true;
    }
    // 日-切换日期
    const changeTime = (e) => {
        data.currentTime = dayjs(e);
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const today = dayjs();
    for (let i = 0; i < 7; i++) {
        const date = today.startOf('week').add(i - 1, 'day');
        // console.log("date",date.format("YYYY-MM-DD"))
        var time = date.format("YYYY-MM-DD");
        data.week.push(time);
    }
    data.startWeekTime = dayjs(data.week[0]);
    data.endWeekTime = dayjs(data.week[data.week.length-1]);

    const currentMonthValue=dayjs(new Date()).format("YYYY-MM");
    const currentTimeNow = dayjs(new Date()).format("YYYY-MM-DD");
    const week0 = data.week;
    const currentStartWeekTime = dayjs(data.week[0]).format("YYYY-MM-DD");
    const currentEndWeekTime = dayjs(data.week[data.week.length-1]).format("YYYY-MM-DD");
    
    const backNowTime=(e)=>{
        if(e==2){
            currentDate.value = dayjs(new Date());
            data.monthValue=dayjs(new Date());
        }
        else if(e==1){
            data.week=week0;
            data.startWeekTime = dayjs(week0[0]).format("YYYY-MM-DD");
            data.endWeekTime = dayjs(week0[week0.length-1]).format("YYYY-MM-DD");
        }
        else if(e==0){
            data.currentTime=dayjs(new Date());
        }
        nextTick(()=>{
            calendarTypeChange(e);
        })
    }

    watch(week,(newVal,oldVal)=>{
        data.startWeekTime = dayjs(newVal[0]);
        data.endWeekTime = dayjs(newVal[newVal.length-1]);
    },{deep: true, immediate: true})
    // 周-切换日期
    const changeStartTime = (e) => {
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const changeEndTime = (e) => {
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    // 周-上周
    const handlePrevWeek = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            const date = dayjs(data.endWeekTime).startOf('week').add(i - 8, 'day');
            var time = date.format("YYYY-MM-DD");
            temp.push(time);
        }
        //console.log("temp",temp);
        data.week = temp;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    // 周-下周
    const handleNextWeek = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            const date = dayjs(data.endWeekTime).startOf('week').add(i + 6, 'day');
            var time = date.format("YYYY-MM-DD");
            temp.push(time);
        }
        //console.log("temp",temp);
        data.week = temp;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const handleStatus = (item, index) => {
        data.statusCurrent = index;
    }
    const onSearch = (e) => {
        data.userListTree = data.userListTreeAll.filter(item=>{
            return item.name.indexOf(data.searchVal) != -1;
        })
    }
    const myCalendarChange = (e) => {
        refreshScheduleVal();
    }
    const onSelect = (keys) => {
        data.treeId=keys[0];
        refreshScheduleVal();
    };

    const getPeople = () => {
        proxy.$get(Interface.meeting.userTree, {}).then(res => {
            let list = res.returnValue.map(item => {
                item.key = item.id;
                item.title = item.name;
                return item;
            });
            data.userListTree = list;
            data.userListTreeAll = list;
        })
    }
    //getPeople();
    const getCalendarList= (CalendarsData) => {
        data.CalendarsData=CalendarsData;
        if(data.CalendarsData&&data.CalendarsData.length){
            data.CalendarActionsConfig=data.CalendarsData[0].calendar.CalendarActionsConfig;
        }
        emit("getCalendarActionsConfig", data.CalendarActionsConfig);
    }
    const getMyCalendarList= () => {
        // let filterQuery='\nPrimaryUserId\teq\t'+data.CurrentUserId;
        // proxy.$post(Interface.list2, {
        //     filterId:'',
        //     objectTypeCode:'4003',
        //     entityName:'Calendar',
        //     filterQuery:filterQuery,
        //     search:'',
        //     page: 1,
        //     rows: 100,
        //     sort:'CreatedOn',
        //     order:'asc',
        //     displayColumns:'CalendarId,Name,Color,CalendarTypeCode,PrimaryUserId,IsPublic'
        // }).then(res => {
        //     if(res&&res.nodes){}else{return}
        //     for (var i = 0; i < res.nodes.length; i++) {
        //         var item = res.nodes[i];
        //         for(var cell in item){
        //             if(cell!='id'&&cell!='nameField'&&cell!='CalendarTypeCode'){
        //                 item[cell]=girdFormatterValue(cell,item);
        //             }
        //             if(cell=='CalendarTypeCode'){
        //                 item[cell]=item[cell]?item[cell].value:'';
        //             }
        //             if(!item.id){
        //                 item.id=item.CalendarId;
        //             }
        //             item.checked=true;
        //         }
        //         data.MyCalendarList.push(item)
        //     }
        // })
    }
    const getOtherCalendarList= () => {
        data.OtherCalendarList=[];
        proxy.$post(Interface.schedule.getOtherCalendar,{}).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.length){
                let peopleList=[];
                peopleList=res.actions[0].returnValue;
                peopleList.forEach((item,index)=>{
                    // if(item.calendar.OwnerId&&item.calendar.OwnerId!=data.CurrentUserId){
                    //     item.calendar.CalendarListPanelSection='Other_CALENDARS';
                    //     data.OtherCalendarList.push(item);
                    // }
                    item.calendar.CalendarListPanelSection='Other_CALENDARS';
                    //item.calendar.IsDisplayed=true;
                    data.OtherCalendarList.push(item);
                })
            }
        })
    }
    const getPublicCalendarList= () => {
        data.PublicCalendarList = [];
        let filterQuery='\nPrimaryUserId\tneq\t'+data.CurrentUserId+'\nIsPublic\teq\ttrue';
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'4003',
            entityName:'Calendar',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'CreatedOn',
            order:'asc',
            displayColumns:'CalendarId,Name,Color,CalendarTypeCode,PrimaryUserId,IsPublic'
        }).then(res => {
            if(res&&res.nodes){}else{return}
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='CalendarTypeCode'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='CalendarTypeCode'){
                        item[cell]=item[cell]?item[cell].value:'';
                    }
                    if(!item.id){
                        item.id=item.CalendarId;
                    }
                    item.checked=true;
                }
                data.PublicCalendarList.push(item)
            }
        })
    }

    const currentDate = ref(dayjs());
    const getListData = value => {
        let date = value.format('YYYY-MM-DD');
        // console.log("date",date);
        return data.meetingList[date] || [];
    };
    const getMonthData = value => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    const changeMonth = (e) => {
        data.monthValue = dayjs(e, monthFormat);
        // console.log("data.monthValue",data.monthValue.format("YYYY-MM"));
        // console.log('dayjs---', data.monthValue)
        window.dayjs = dayjs;
        currentDate.value = dayjs(e);
        getQuery();
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const getQuery = ()=> {
        data.startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
        data.endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
    }
    getQuery();
    // 关闭新建
    const cancelNewSchedule = (e) => {
        data.isSchedule = e;
    }
    const cancelAddSchedule = (e) => {
        data.isAddSchedule = e;
        data.RegardingObjectId='';
    }
    // 新建
    const handleAddSchedule = (item) => {
        // data.isSchedule =  true;
        data.id='';
        data.RegardingObjectTypeCode='4003';
        data.RegardingObjectId=item.Id;
        data.RegardingObjectIdName=item.Name;
        data.BgColor=item.Color;
        data.isAddSchedule = true;
    }
    // 日历-点击日期创建
    const selectCalendar = (date, {source}) => {
        //console.log("e", date.format("YYYY-MM-DD"), source);
        data.paramsTime.date = date.format("YYYY-MM-DD");
        data.isAddSchedule = true;
    };
    //新建日历
    const CreateCalendar = (id,CalendarTypeCode) => {
        data.CalendarTypeCode=CalendarTypeCode;
        data.CalendarId='';
        if(id){
            data.CalendarId=id;
        }
        data.isNewCalendar = true;
    }
    //添加日历
    const CreateCalendar2 = () => {
        data.isAddCalendar = true;
    }
    const cancelImport = (e) => {
        data.isImport = e;
    }
    const cancelShare = (e) => {
        data.isShare = e;
    }
    const changeShow=(item)=>{
        item.calendar.IsDisplayed=!item.calendar.IsDisplayed
        // data.CalendarsData.forEach(ite=>{
        //     if(ite.calendar.Id==item.calendar.Id){
        //         ite.calendar.IsDisplayed=!ite.calendar.IsDisplayed;
        //     }
        // })
        nextTick(()=>{
            FullCalendarWrap.value.refreshShow(data.CalendarsData);
        })
    }
    //仅显示此日历
    const onlyShow=(id)=>{
        data.CalendarsData.forEach(item=>{
            item.calendar.IsDisplayed=false;
            if(item.calendar.Id==id){
                item.calendar.IsDisplayed=true;
            }
        })
        nextTick(()=>{
            FullCalendarWrap.value.refreshShow(data.CalendarsData);
        })
        // data.PublicCalendarList.forEach(item=>{
        //     item.checked=false;
        //     if(item.id==id){
        //         item.checked=true;
        //     }
        // })
    }
    const openShare = (id) => {
        data.CalendarId='';
        if(id){
            data.CalendarId=id;
        }
        data.isShare = true;
    }
    const openImport = () => {
        data.isImport = true;
    }
    const handleCollapsed = () => {
        data.isCollapsed = !data.isCollapsed;
    }
    //详情
    const handleDetail = (item, date) => {
        data.id=item.Id;
        nextTick(()=>{
            data.isScheduleDetail = true;
        })
    }
    // 编辑
    const handleOpenEdit = (e) => {
        data.paramsTime={
            date: "",
            time: ""
        }
        if(e.paramsTime){
            data.paramsTime=e.paramsTime
        }
        data.id=e.Id;
        data.isAddSchedule = true;
    }
    //删除日历
    const handleDeleteCalendar= (id) => {
        data.id=id;
        data.isDeleteCalendar = true;
    }
    const cancelDeleteCalendar = (e) => {
        data.isDeleteCalendar = false;
    };
    //删除
    const handleDelete = (e) => {
        data.id=e.Id;
        data.isDelete = true;
    }
    //删除关闭
    const cancelDelete = (e) => {
        data.isDelete = false;
    };
    const refreshScheduleVal=(e)=>{
        data.isAddSchedule = false;
        //data.isScheduleDetail = false;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const handleNewScheduleVal = (e) => {
        data.RegardingObjectId='';
        refreshScheduleVal();
    }
    //设置背景颜色
    const setColor=(id,color)=>{
        if(id){
            let url = Interface.edit;
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: id,
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: 'CalendarFollow',
                            objTypeCode: '20006',
                            fields: {
                                Color:color,
                                CreatedBy:data.CurrentUserId
                            }
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then((res) => {
                message.success("设置成功！");
                data.CalendarsData.forEach(item=>{
                    if(item.calendar.Id==id){
                        item.calendar.Color=color;
                    }
                })
                data.OtherCalendarList.forEach(item=>{
                    if(item.calendar.Id==id){
                        item.calendar.Color=color;
                    }
                })
                nextTick(()=>{
                    FullCalendarWrap.value.refreshShow(data.CalendarsData);
                })
                // data.PublicCalendarList.forEach(item=>{
                //     if(item.id==id){
                //         item.Color=color;
                //     }
                // })
                //getCalendarList();
            });
        }
    }
    const refreshCalendarList=()=>{
        getOtherCalendarList();
    }
    onMounted(()=>{
        if(calendarWrap&&calendarWrap.value){
            let h = calendarWrap.value.clientHeight-105;
            let h1 = calendarList1.value.clientHeight;
            let h2=h-h1;
            data.height2=h2;
        }
        window.addEventListener("resize", (e) => {
            if(calendarWrap&&calendarWrap.value){
                let h = calendarWrap.value.clientHeight-105;
                let h1 = calendarList1.value.clientHeight;
                let h2=h-h1;
                data.height2=h2+45;
            }
        });
        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            let userId=userInfo.userId;
            data.CurrentUserId=userId;
            data.CurrentUserName=userInfo.userName;
        }
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
            getOtherCalendarList();
        })
    })
</script>
<style lang="less" scoped>
    .headerCalendar{
        border-bottom: 1px solid #e5e6eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 10px;
    }
    .calendarWrap {
        width: 100%;
        /* height: calc(~"100% - 49px"); */
        height: 100%;
        display: flex;

        .leftBox {
            width: 220px;
            height: 100%;
            border-right: 1px solid #e5e6eb;
            padding: 15px 0;

            .tabsWrap {
                padding: 0 15px;
            }

            .meetingStatelist {
                line-height: 30px;
                margin-top: 15px;
                padding: 0 15px;

                .statusItem {
                    padding-left: 20px;
                    cursor: pointer;
                    margin-bottom: 4px;

                    &:hover {
                        background: #f2f3f5;
                        color: var(--textColor);
                        font-weight: 700;
                    }

                    &.active {
                        background: #f2f3f5;
                        font-weight: 700;
                        color: var(--textColor);
                    }
                }
            }

            .peopleOrgBody {
                margin-top: 15px;
                padding: 0 15px;

                .userTree {
                    margin-top: 10px;
                }
            }
        }

        .rightBox {
            flex: 1;
            position: relative;
            flex-direction: column;
            .ant-btn{
                margin-top: 0;
            }
            .calendarHeader {
                width: 100%;
                padding: 12px;
                border-bottom: 1px solid #e5e6eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .form{
                    display: flex;
                    .formItem{
                        &.pickerTime{
                            display: flex;
                            align-items: center;
                            .arrowIcon{
                                cursor: pointer;
                            }
                            .ant-picker{
                                border: none;
                            }
                        }
                    }
                }
            }
            .calendarBody{
                height: calc(~"100% - 60px");
                overflow: auto;
            }
        }
    }

    .events {
        list-style: none;
        margin: 0;
        padding: 0;
        .messageItem{
            background: #2977f6;
            padding: 5px;
            color: #fff;
            border-radius: 3px;
            margin-bottom: 3px;
            font-size: 12px;
        }
    }

    .events .ant-badge-status {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
        font-size: 12px;
    }

    .notes-month {
        text-align: center;
        font-size: 28px;
    }

    .notes-month section {
        font-size: 28px;
    }
    .ant-picker-content{
        border-collapse: collapse;
    }
    :deep .ant-picker-content tr td{
        border: 1px solid #e2e3e5;
    }
    :deep :where(.css-dev-only-do-not-override-kqecok).ant-picker-calendar.ant-picker-calendar-full .ant-picker-calendar-date{
        border-top:none;
    }
    :deep .ant-picker-content thead tr{
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    :deep .ant-picker-content thead tr th{
        border: 1px solid #e2e3e5;
    }
    .calendar-selectlist{
        width: 122px;
        border: 1px solid #e5e6eb;
        border-radius: 4px;
        /* background: #f2f3f5; */
        background: #fff;
        height: 32px;
        padding-top: 1px;
        margin-left: 15px;
        box-sizing: content-box;
        .calendar-typechook{
            display: flex;
            height: 100%;
            li{
                cursor: pointer;
                /* padding: 3px 9px;
                margin: 0 4px;
                margin-top: 3px; */
                width: 100%;
                height: 100%;
                margin: 0;
                display: inline-block;
                text-align: center;
                line-height: 32px;
                &.active{
                    font-weight: 700;
                    background: var(--backColor);
                    border-radius: 4px;
                    /* color: var(--textColor); */
                    color: #fff;
                }
            }
        }
    }
    .meetingMessageWrap{
        width: 300px;
        .meetingHead{
            display: flex;
            align-items: center;
            .meetingLogo{
                width: 32px;
                height: 32px;
                background: var(--backColor);
                border-radius: 4px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .meetingName{
                margin-left: 15px;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .meetingBody{
            margin-top: 10px;
            .meetingInfo{
                display: flex;
                .meetingInfoItem{
                    flex: 1;
                    font-size: 12px;
                }
                :deep .ant-btn{
                    padding: 0;
                }
            }
        }
    }
    :deep .ant-picker-content tbody tr td:first-child{
        background: #f9f9f9;
    }
    :deep .ant-picker-content tbody tr td:last-child{
        background: #f9f9f9;
    }
    .lunarDisabled{
        color: rgba(0, 0, 0, 0.25);
    }
    .festivals,.holiday{
        font-size: 12px;
        padding-right: 10px;
        color: red;
    }
    .ant-tabs .ant-tabs-tab{
        padding: 12px 12px !important;
    }
    :deep .calendarCheckbox .ant-checkbox-inner{
        border-radius: 50% !important;
    }
    :deep .calendarCheckbox .ant-checkbox-checked:after{
        border-radius: 50% !important;
    }
    :deep .ant-checkbox+span{
        font-weight: normal !important;
    }
    .addCalendar{
        display: flex;
        align-items: center;
        color: #0F548C;
        position: relative;
        left: -3px;
        font-size: 15px;
        font-weight: normal !important;
        .IconWrapContent{
            margin-right: 6px;
        }
    }
    .calendarWrap .leftBox .meetingStatelist .statusItem{
        padding-left: 14px;
    }
    .calendarWrap .leftBox .meetingStatelist .statusItem2{
        line-height: 35px;
        .svgiconbtn{
            float: right;
            margin-right: 5px;
        }
        .IconWrapContent{
            position: relative;
            top: 4px;
            background: #eee;
            visibility: hidden;
        }
    }
    .calendarWrap .leftBox .meetingStatelist .statusItem2:hover{
        .IconWrapContent{
            position: relative;
            top: 4px;
            background: #eee;
            visibility: unset;
        }
    }
    .calendarListGroup{
        .calendarPanelHeader{
            position: relative;
            height: 45px;
            line-height: 45px;
        }
        h2{
            font-size: 16px;
            margin-left: 15px;
            margin-top: 0px;
        }
        .calendarSettingsMenu{
            position: absolute;
            right: 15px;
            top: 0;
        }
        .calendarListItem{
            position: relative;
            height: 45px;
            line-height: 45px;
        }
        .calendarLabel{
            display: flex;
            margin-left: 35px;
            span{
                margin-left: 8px;
            }
        }
        .calendarMenu{
            position: absolute;
            right: 15px;
            top: 0;
        }
        .calendarItemLabel{
            display: flex;
        }
        .IconWrapContent{
            position: relative;
            top: 5px;
            border-radius: 4px;
            border: 1px solid #747474 !important;
            padding: 0px 1px;
            cursor: pointer;
        }
        .visibilityToggle{
            width: 20px;
            height: 20px;
            position: relative;
            border-radius: 4px;
            top: 13px;
            cursor: pointer;
        }
        .groupBtn{
            height: 32px;
        }
    }
    :deep .ant-dropdown-menu-item-divider{
        background-color: #ddd !important;
    }
    .scrollable{ 
        li:hover {
            background: #f2f3f5 !important;
        }
        max-width: 150px;
    }
    .colorItem {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: .25rem;
        margin-right: 5px;
    }
    .calendarCalendarColorMenuItem{
        float: left;
    }
    :deep .selcustom{
        position: relative;
        .el-color-picker{
            position: absolute;
            left: 0;
            top: 0px;
            opacity: 0;
            width: 100%;
        }
        .el-color-picker__trigger{
            width: 100%;
        }
    }
    .calendarWrap{
        .calendarList1{
            display: block;
            overflow-y: auto;
            max-height: 300px !important;
        }
        .calendarList2{
            display: block;
            overflow-y: auto;
        }
    }
</style>