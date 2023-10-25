<template>
    <div class="weekWrap">
        <div class="slds-brand-band-zhou">
            <div class="calendar3">
                <div class="calendarTop bumpForScrollBar">
                    <div class="calendarUserTimezoneOffset">
                        <strong class="rili_calender_strong">
                            <span>时间</span>
                        </strong>
                    </div>
                    <div class="calendarDayHeaders">
                        <strong class="widthitem3 calenderDayHeader" time="2019-10-27">11/1(周日)</strong>
                        <strong class="widthitem3 calenderDayHeader" time="2019-10-27">11/1(周日)</strong>
                        <strong class="widthitem3 calenderDayHeader" time="2019-10-27">11/1(周日)</strong>
                        <strong class="widthitem3 calenderDayHeader" time="2019-10-27">11/1(周日)</strong>
                        <strong class="widthitem3 calenderDayHeader" time="2019-10-27">11/1(周日)</strong>
                        <strong class="widthitem3 calenderDayHeader" time="2019-10-27">11/1(周日)</strong>
                        <strong class="widthitem3 calenderDayHeader" time="2019-10-27">11/1(周日)</strong>
                    </div>
                    <div class="calendarTrough">
                        <ul class="calendarTroughContainer week">
                        </ul>
                    </div>
                </div>
                <div class="calendarRow">
                    <div class="calendarKey">
                        <strong time=""></strong>
                        <strong time="06:00">
                            <span>6:00</span>
                        </strong>
                        <strong time="07:00">
                            <span>7:00</span>
                        </strong>
                        <strong time="08:00">
                            <span>8:00</span>
                        </strong>
                        <strong time="09:00">
                            <span>9:00</span>
                        </strong>
                        <strong time="10:00">
                            <span>10:00</span>
                        </strong>
                        <strong time="11:00">
                            <span>11:00</span>
                        </strong>
                        <strong time="12:00">
                            <span>12:00</span>
                        </strong>
                        <strong time="13:00">
                            <span>13:00</span>
                        </strong>
                        <strong time="14:00">
                            <span>14:00</span>
                        </strong>
                        <strong time="15:00">
                            <span>15:00</span>
                        </strong>
                        <strong time="16:00">
                            <span>16:00</span>
                        </strong>
                        <strong time="17:00">
                            <span>17:00</span>
                        </strong>
                        <strong time="18:00">
                            <span>18:00</span>
                        </strong>
                        <strong time="19:00">
                            <span>19:00</span>
                        </strong>
                        <strong time="20:00">
                            <span>20:00</span>
                        </strong>
                        <strong time="21:00">
                            <span>21:00</span>
                        </strong>
                        <strong time="22:00">
                            <span>22:00</span>
                        </strong>
                        <strong time="23:00">
                            <span>23:00</span>
                        </strong>
                    </div>
                    <div class="rowCore">
                        <div class="calendarDay ">
                            <div class="eventList widthitem3"></div>
                        </div>
                        <div class="calendarDay">
                            <div class="eventList widthitem3"></div>
                        </div>
                        <div class="calendarDay">
                            <div class="eventList widthitem3"></div>
                        </div>
                        <div class="calendarDay">
                            <div class="eventList widthitem3"></div>
                        </div>
                        <div class="calendarDay">
                            <div class="eventList widthitem3"></div>
                        </div>
                        <div class="calendarDay">
                            <div class="eventList widthitem3"></div>
                        </div>
                        <div class="calendarDay">
                            <div class="eventList widthitem3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calder-content">
                <div class="calder-content-head">
                    <p>28</p>
                    <p>星期日</p>
                </div>
                <div id="time-chook"></div>
                <div class="calendarListPanel" style="display: none;">
                    <div class="calendarListPanel-item">
                        <div class="calendarListPanel-item-head">
                            <div class="calendarListPanel-item-head-left">
                                <span>我的日历</span>
                            </div>

                        </div>
                        <div class="calendarListPanel-item-body">
                            <div class="calendarListPanel-item-body-left">
                                <div class="item-color"></div>
                                <div class="calendarlist-item-name">我的事件</div>
                            </div>
                            <div class="calendarListPanel-item-body-right selectbuttonbtn">
                                <div class="selectlist2">
                                    <ul class="">
                                        <li>仅显示此日历</li>
                                        <li class="sharecal">共享日历</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="calendarListPanel-item-head">
                            <div class="calendarListPanel-item-head-left">
                                <span>其他日历</span>
                            </div>
                            <div class="calendarListPanel-item-head-right">
                                <div class="selectlist2">
                                    <ul class="">
                                        <li class="addcal">添加日历</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="calendarListPanel-item-body">
                            <div class="calendarListPanel-item-body-left">
                                <div class="item-color"></div>
                                <div class="calendarlist-item-name">我的事件</div>
                            </div>
                            <div class="calendarListPanel-item-body-right">
                                <div class="selectlist2">
                                    <ul class="scrollable">
                                        <li>仅显示此日历
                                        </li>
                                        <li>添加事件
                                        </li>
                                        <li>可拆卸共享日历
                                        </li>
                                        <li style="border-top: 1px solid #cccccc; height: 1px;"></li>
                                        <li class="calendarCalendarColorMenuItem">
                                            <span class="colorItem" style="background-color: #e1b4e8;"></span>
                                        </li>
                                        <li class="calendarCalendarColorMenuItem">
                                            <span class="colorItem" style="background-color: #c2c9e7;"></span>
                                        </li>
                                        <li class="calendarCalendarColorMenuItem">
                                            <span class="colorItem" style="background-color: #a6d5f8"></span>
                                        </li>
                                        <li class="calendarCalendarColorMenuItem">
                                            <span class="colorItem" style="background-color: #96dfd3"></span>
                                        </li>
                                        <li class="calendarCalendarColorMenuItem">
                                            <span class="colorItem" style="background-color: #96e9b9"></span>
                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #f9ea93"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #f9ce94"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #bc35bc"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #5679c1"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #3e8ede"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #00aea9"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #3eba4d"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #f6bc26"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #f7931e"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #570d8c"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #001970"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #0b2399"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #0a7476"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #0a6b51"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">

                                            <span class="colorItem" style="background-color: #b67d11"></span>

                                        </li>
                                        <li class="calendarCalendarColorMenuItem">
                                            <span class="colorItem" style="background-color: #b75d0d"></span>
                                        </li>
                                        <li style="clear: both; height: 0px"></li>
                                        <li>选择自定义颜色
                                        </li>
                                    </ul>
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
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({

    });
</script>
<style lang="less" scoped>
    .weekWrap {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .slds-brand-band-zhou {
        width: 100%;
        height: 100%;

        .calendarTop {
            background: #fff;
            border-bottom: 1px solid #e5e6eb;

            .calendarUserTimezoneOffset {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 80px;
                text-align: center;
                z-index: 3;
                background-color: white;
                .rili_calender_strong{
                    font-weight: 400;
                    color: #333;
                    font-size: 14px;
                }
            }
            .calendarDayHeaders{
                padding: 0 0 0 80px;
                padding-right: 15px;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1;
                overflow: hidden;
                .calenderDayHeader {
                    position: relative;
                    line-height: 40px;
                    vertical-align: middle;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-weight: normal;
                    /* font-size: .75rem; */
                    width: 220px;
                    display: block;
                    float: left;
                }
                .widthitem3{
                    width: 14.07%;
                    border-width: 1px;
                    border-color: #eee;
                }
            }
        }
        .calendarRow{
            position: relative;
            height: calc(~"100% - 47px");
            .calendarKey{
                background: #f0f2f6;
                float: left;
                border-right: 1px solid rgb(221, 219, 218);
                border-bottom: 1px solid rgb(221, 219, 218);
                min-width: 80px;
                max-width: 80px;
                text-align: center;
                height: 780px;
                position: absolute;
                z-index: 3;
                top: -1px;
                .strong{
                    display: block;
                    height: 60px;
                    border-top: 1px solid rgb(221, 219, 218);
                    padding: 10px 0 0 0;
                    font-size: .8125rem;
                    color: rgb(62, 62, 60);
                    font-weight: normal;
                    box-sizing: border-box;
                    &:first-child{
                        border-top: 0;
                    }
                    span{
                        position: relative;
                        top: -20px;
                        padding: 6px;
                        background: #f0f2f6;
                    }
                }
            }
            .rowCore{
                width: calc(~"100% - 80px");
                height: calc(~"100% - 51px");
                max-height: 376px;
                overflow: auto;
                float: left;
                margin-left: 80px;
                overflow: auto;
                border-right: 1px solid rgb(221, 219, 218);
                margin-top: -1px;
                .calendarDay{
                    width: 14.27%;
                    position: relative;
                }
            }
        }
    }
</style>