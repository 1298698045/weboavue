<template>
    <div>
        <a-modal v-model:open="props.isShow" width="1200px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{ title }}
                </div>
            </template>
            <div class="modalContainer AddScheduleModalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <div class="mcrpC">
                        <div class="jJjU6">
                            <div class="UmKjU">
                                <!-- <div class="PZGsT">其他人将看不到此日历。</div> -->
                                <div class="ux0Sa">
                                    <div class="body-166">
                                        <div class="ms-TextField ms-TextField--underlined root-371">
                                            <div class="ms-TextField-wrapper wrapper-372" :style="{'border-bottom-color':formState.Color+' !important'}">
                                                <div class="ms-TextField-fieldGroup fieldGroup-373">
                                                    <input v-model="formState.Name" type="text" id="TextField839" placeholder="请输入日历名称" class="ms-TextField-field dqxE8 field-374" :style="{'color':formState.Color}" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ApQFv">
                                    <div class="DgEy6">颜色</div>
                                    <div class="wia7f">
                                        <div class="ms-FocusZone css-174 ms-swatchColorPickerBodyContainer focusedContainer-385">
                                            <table id="SwatchColorPicker" class="root-386">
                                                <tbody>
                                                    <tr>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-A4262C-0" title="绛紫" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#A4262C'}" @click="setColor('#A4262C')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="绛紫" viewBox="0 0 20 20" fill="#A4262C" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-D13438-1" title="红色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#D13438'}" @click="setColor('#D13438')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="红色" viewBox="0 0 20 20" fill="#D13438" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-F7630C-2" title="橙色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#F7630C'}" @click="setColor('#F7630C')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="橙色" viewBox="0 0 20 20" fill="#F7630C" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-FDE300-3" title="黄色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#FDE300'}" @click="setColor('#FDE300')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="黄色" viewBox="0 0 20 20" fill="#FDE300" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-8E562E-4" title="褐色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#8E562E'}" @click="setColor('#8E562E')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="褐色" viewBox="0 0 20 20" fill="#8E562E" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-00CC6A-5" title="海蓝色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#00CC6A'}" @click="setColor('#00CC6A')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="海蓝色" viewBox="0 0 20 20" fill="#00CC6A" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-107C10-6" title="绿色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#107C10'}" @click="setColor('#107C10')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="绿色" viewBox="0 0 20 20" fill="#107C10" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-038387-7" title="青色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#038387'}" @click="setColor('#038387')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="青色" viewBox="0 0 20 20" fill="#038387" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-0099BC-8" title="蓝绿色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#0099BC'}" @click="setColor('#0099BC')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="蓝绿色" viewBox="0 0 20 20" fill="#0099BC" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-0078D4-9" title="蓝色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='rgb(51, 153, 255)'}" @click="setColor('rgb(51, 153, 255)')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="蓝色" viewBox="0 0 20 20" fill="rgb(51, 153, 255)" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-0027B4-10"  title="海军蓝" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#0027B4'}" @click="setColor('#0027B4')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="海军蓝" viewBox="0 0 20 20" fill="#0027B4" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-5C2E91-11"  title="紫色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#5C2E91'}" @click="setColor('#5C2E91')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="紫色" viewBox="0 0 20 20" fill="#5C2E91" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-B146C2-12"  title="淡紫" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#B146C2'}" @click="setColor('#B146C2')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="淡紫" viewBox="0 0 20 20" fill="#B146C2" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-BF0077-13"  title="洋红色" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#BF0077'}" @click="setColor('#BF0077')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="洋红色" viewBox="0 0 20 20" fill="#BF0077" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="tableCell-384">
                                                            <button type="button" id="SwatchColorPicker-colorCell-69797E-14"  title="白金" class="ms-Button ms-Button--action ms-Button--command colorCell-389" :class="{'active':formState.Color=='#69797E'}" @click="setColor('#69797E')">
                                                                <span class="ms-Button-flexContainer flexContainer-308">
                                                                    <svg class="svg-388" role="img" aria-label="白金" viewBox="0 0 20 20" fill="#69797E" focusable="false"><circle cx="50%" cy="50%" r="50%"></circle></svg>
                                                                </span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <span class="mvbDn">
                                            <button type="button" class="ms-Link root-367 customcolor" :style="{'color':formState.Color}">自定义</button>
                                            <el-color-picker v-model="formState.Color" @change="setColor" show-alpha></el-color-picker>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div id="charmSet837" class="DgEy6">魅力</div>
                                    <div class="ms-FocusZone css-174 zJ2w3">
                                        <div>
                                            <button type="button" id="nocharmcharm" class="ms-Button ms-Button--icon oTdms SMAEx pFfKB root-262" :class="{'active':formState.Charm=='nocharmcharm'}" @click="setCharm('nocharmcharm')" title="没有图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID0">

                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="planecharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='planecharm'}" @click="setCharm('planecharm')" title="飞机图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID3">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="plane">
                                                                <path transform="translate(0 0)" d="M14.875-10.625a2.034,2.034,0,0,1,.822.17,2.176,2.176,0,0,1,.677.457,2.176,2.176,0,0,1,.457.677A2.034,2.034,0,0,1,17-8.5a2.025,2.025,0,0,1-.17.826A2.19,2.19,0,0,1,16.373-7a2.176,2.176,0,0,1-.677.457,2.034,2.034,0,0,1-.822.17H11.156L7.969,0H4.25L6.375-6.375H4.25L3.719-5.312H0L1.063-8.5,0-11.687H3.719l.531,1.063H6.375L4.25-17H7.969l3.188,6.375Zm0,3.188a1.03,1.03,0,0,0,.415-.083,1.08,1.08,0,0,0,.336-.228,1.08,1.08,0,0,0,.228-.336,1.03,1.03,0,0,0,.083-.415,1.03,1.03,0,0,0-.083-.415,1.08,1.08,0,0,0-.228-.336,1.08,1.08,0,0,0-.336-.228,1.03,1.03,0,0,0-.415-.083H10.5q-.822-1.594-1.6-3.183T7.313-15.937H5.728q.531,1.6,1.054,3.192T7.853-9.562H3.594l-.531-1.062H1.478q.174.531.344,1.063T2.183-8.5q-.191.531-.361,1.063T1.478-6.375H3.063l.531-1.062H7.853Q7.3-5.844,6.782-4.254T5.728-1.062H7.313q.805-1.6,1.585-3.192t1.6-3.183Z" class="cls-2-105" data-name="Path 4" id="Path_4"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="document1charm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='document1charm'}" @click="setCharm('document1charm')" title="笔记图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID4">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="document1">
                                                                <path transform="translate(0 0)" d="M13.846-15.929h1.029V0H2.125V-15.929H3.171V-17H4.233v1.071H6.375V-17H7.438v1.071H9.579V-17h1.063v1.071h2.142V-17h1.063ZM13.813-1.062v-13.8H3.188v13.8ZM11.688-12.742v1.063H5.313v-1.062ZM5.313-3.171V-4.233h6.375v1.063Zm0-4.258V-8.492h6.375v1.063Z" class="cls-2-106" data-name="Path 5" id="Path_5"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="firstaidcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='firstaidcharm'}" @click="setCharm('firstaidcharm')" title="急救图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID5">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="firstaid">
                                                                <path transform="translate(0 0)" d="M7.438-10.625V-8.5H5.313v2.125H7.438V-4.25H9.563V-6.375h2.125V-8.5H9.563v-2.125Zm3.188,1.063H12.75v4.25H10.625v2.125H6.375V-5.312H4.25v-4.25H6.375v-2.125h4.25Zm4.781-4.25a1.564,1.564,0,0,1,.623.125,1.6,1.6,0,0,1,.506.34,1.6,1.6,0,0,1,.34.506,1.564,1.564,0,0,1,.125.623v9.563a1.564,1.564,0,0,1-.125.623,1.6,1.6,0,0,1-.34.506,1.6,1.6,0,0,1-.506.34,1.564,1.564,0,0,1-.623.125H1.594a1.564,1.564,0,0,1-.623-.125,1.6,1.6,0,0,1-.506-.34,1.6,1.6,0,0,1-.34-.506A1.564,1.564,0,0,1,0-2.656v-9.562a1.564,1.564,0,0,1,.125-.623,1.6,1.6,0,0,1,.34-.506,1.6,1.6,0,0,1,.506-.34,1.564,1.564,0,0,1,.623-.125H4.25q0-.307-.008-.681a2.421,2.421,0,0,1,.079-.693,1.162,1.162,0,0,1,.307-.535.946.946,0,0,1,.685-.216h6.375a1.13,1.13,0,0,1,.506.1.828.828,0,0,1,.315.266,1.139,1.139,0,0,1,.17.386,2.709,2.709,0,0,1,.071.457,4.5,4.5,0,0,1,.008.473q-.008.237-.008.444Zm-10.094,0h6.375v-1.062H5.313Zm10.625,1.594a.511.511,0,0,0-.158-.374.511.511,0,0,0-.374-.158H1.594a.511.511,0,0,0-.374.158.511.511,0,0,0-.158.374v9.563a.511.511,0,0,0,.158.374.511.511,0,0,0,.374.158H15.406a.511.511,0,0,0,.374-.158.511.511,0,0,0,.158-.374Z" class="cls-2-107" data-name="Path 6" id="Path_6"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="trophycharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='trophycharm'}" @click="setCharm('trophycharm')" title="奖杯图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID6">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="trophy">
                                                                <path transform="translate(0 0)" d="M13.813-14.875v3.71a2.589,2.589,0,0,1-.162.909,2.657,2.657,0,0,1-.448.78,2.693,2.693,0,0,1-.685.585,2.64,2.64,0,0,1-.863.332,3.557,3.557,0,0,1-.344,1.166,3.773,3.773,0,0,1-.689.971,3.72,3.72,0,0,1-.959.706A3.537,3.537,0,0,1,8.5-5.354v1.1h3.188v2.125H12.75v1.063H3.188V-2.125H4.25V-4.25H7.438v-1.1a3.537,3.537,0,0,1-1.162-.361,3.72,3.72,0,0,1-.959-.706,3.773,3.773,0,0,1-.689-.971,3.557,3.557,0,0,1-.344-1.166A2.64,2.64,0,0,1,3.42-8.89a2.693,2.693,0,0,1-.685-.585,2.657,2.657,0,0,1-.448-.78,2.589,2.589,0,0,1-.162-.909v-3.71H4.25v-1.062h7.438v1.063ZM5.313-3.187v1.063h5.313V-3.187ZM3.188-11.165a1.526,1.526,0,0,0,.079.486,1.659,1.659,0,0,0,.216.432,1.648,1.648,0,0,0,.332.349,1.478,1.478,0,0,0,.436.237v-4.15H3.188Zm4.781,4.79A2.572,2.572,0,0,0,9-6.583a2.678,2.678,0,0,0,.843-.569A2.724,2.724,0,0,0,10.413-8a2.558,2.558,0,0,0,.212-1.033v-5.844H5.313v5.844A2.6,2.6,0,0,0,5.52-8a2.666,2.666,0,0,0,.569.847,2.666,2.666,0,0,0,.847.569A2.6,2.6,0,0,0,7.969-6.375Zm4.781-7.437H11.688v4.15a1.566,1.566,0,0,0,.432-.237,1.6,1.6,0,0,0,.336-.349,1.659,1.659,0,0,0,.216-.432,1.526,1.526,0,0,0,.079-.486Z" class="cls-2-108" data-name="Path 7" id="Path_7"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="homecharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='homecharm'}" @click="setCharm('homecharm')" title="家庭图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID7">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="home">
                                                                <path transform="translate(0 0)" d="M8.5-15.63l7.811,7.819-.747.747-.689-.681v6.682H9.563V-6.375H7.438v5.313H2.125V-7.745l-.689.681L.689-7.811ZM13.813-2.125V-8.807L8.5-14.12,3.188-8.807v6.682H6.375V-7.437h4.25v5.313Z" class="cls-2-109" data-name="Path 8" id="Path_8"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="pillcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='pillcharm'}" @click="setCharm('pillcharm')" title="药丸图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID8">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="pill">
                                                                <path transform="translate(0 0)" d="M12.75-11.156a.511.511,0,0,1,.374.158.511.511,0,0,1,.158.374.511.511,0,0,1-.158.374.511.511,0,0,1-.374.158.511.511,0,0,1-.374-.158.511.511,0,0,1-.158-.374A.511.511,0,0,1,12.376-11,.511.511,0,0,1,12.75-11.156ZM11.156-9.562a.511.511,0,0,1,.374.158.511.511,0,0,1,.158.374.511.511,0,0,1-.158.374.511.511,0,0,1-.374.158.511.511,0,0,1-.374-.158.511.511,0,0,1-.158-.374.513.513,0,0,1,.154-.378A.513.513,0,0,1,11.156-9.562ZM9.563-11.156A.511.511,0,0,1,9.936-11a.511.511,0,0,1,.158.374.511.511,0,0,1-.158.374.511.511,0,0,1-.374.158.511.511,0,0,1-.374-.158.511.511,0,0,1-.158-.374A.511.511,0,0,1,9.189-11,.511.511,0,0,1,9.563-11.156ZM12.708-17a4.2,4.2,0,0,1,1.673.336,4.312,4.312,0,0,1,1.365.917,4.312,4.312,0,0,1,.917,1.365A4.2,4.2,0,0,1,17-12.708a4.256,4.256,0,0,1-.324,1.639,4.232,4.232,0,0,1-.93,1.39L7.321-1.253a4.232,4.232,0,0,1-1.39.93A4.256,4.256,0,0,1,4.292,0,4.2,4.2,0,0,1,2.619-.336a4.312,4.312,0,0,1-1.365-.917A4.312,4.312,0,0,1,.336-2.619,4.2,4.2,0,0,1,0-4.292,4.256,4.256,0,0,1,.324-5.931a4.232,4.232,0,0,1,.93-1.39l8.425-8.425a4.232,4.232,0,0,1,1.39-.93A4.256,4.256,0,0,1,12.708-17ZM4.292-1.062A3.178,3.178,0,0,0,5.52-1.3a3.2,3.2,0,0,0,1.046-.706L10.417-5.86,5.86-10.417,2.009-6.566a3.206,3.206,0,0,0-.7,1.046,3.192,3.192,0,0,0-.245,1.237,3.133,3.133,0,0,0,.253,1.258A3.223,3.223,0,0,0,2.009-2a3.308,3.308,0,0,0,1.025.689A3.133,3.133,0,0,0,4.292-1.062Zm10.7-9.372a3.218,3.218,0,0,0,.7-1.042,3.161,3.161,0,0,0,.245-1.233,3.133,3.133,0,0,0-.253-1.258,3.273,3.273,0,0,0-.693-1.025,3.273,3.273,0,0,0-1.025-.693,3.133,3.133,0,0,0-1.258-.253,3.161,3.161,0,0,0-1.233.245,3.218,3.218,0,0,0-1.042.7L6.607-11.173l4.565,4.565Z" class="cls-2-110" data-name="Path 9" id="Path_9"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="luggagecharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='luggagecharm'}" @click="setCharm('luggagecharm')" title="行李图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID9">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="luggage">
                                                                <path transform="translate(0 0)" d="M15.406-13.812a1.564,1.564,0,0,1,.623.125,1.6,1.6,0,0,1,.506.34,1.6,1.6,0,0,1,.34.506,1.564,1.564,0,0,1,.125.623v9.563a1.564,1.564,0,0,1-.125.623,1.6,1.6,0,0,1-.34.506,1.6,1.6,0,0,1-.506.34,1.564,1.564,0,0,1-.623.125H1.594a1.564,1.564,0,0,1-.623-.125,1.6,1.6,0,0,1-.506-.34,1.6,1.6,0,0,1-.34-.506A1.564,1.564,0,0,1,0-2.656v-9.562a1.564,1.564,0,0,1,.125-.623,1.6,1.6,0,0,1,.34-.506,1.6,1.6,0,0,1,.506-.34,1.564,1.564,0,0,1,.623-.125H5.313v-1.062A1.03,1.03,0,0,1,5.4-15.29a1.08,1.08,0,0,1,.228-.336,1.08,1.08,0,0,1,.336-.228,1.03,1.03,0,0,1,.415-.083h4.25a1.03,1.03,0,0,1,.415.083,1.08,1.08,0,0,1,.336.228,1.08,1.08,0,0,1,.228.336,1.03,1.03,0,0,1,.083.415v1.063Zm-9.031,0h4.25v-1.062H6.375ZM4.25-12.75V-2.125h8.5V-12.75ZM1.063-2.656a.511.511,0,0,0,.158.374.511.511,0,0,0,.374.158H3.188V-12.75H1.594a.511.511,0,0,0-.374.158.511.511,0,0,0-.158.374Zm14.875-9.562a.511.511,0,0,0-.158-.374.511.511,0,0,0-.374-.158H13.813V-2.125h1.594a.511.511,0,0,0,.374-.158.511.511,0,0,0,.158-.374Z" class="cls-2-111" data-name="Path 10" id="Path_10"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="groupcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='groupcharm'}" @click="setCharm('groupcharm')" title="组图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID11">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="group">
                                                                <path transform="translate(0 0)" d="M13.58-11.248a4.294,4.294,0,0,1,.975.677,4.328,4.328,0,0,1,.743.9,4.266,4.266,0,0,1,.473,1.063,4.169,4.169,0,0,1,.166,1.175H14.875a3.063,3.063,0,0,0-.253-1.237,3.256,3.256,0,0,0-.685-1.013,3.256,3.256,0,0,0-1.013-.685,3.063,3.063,0,0,0-1.237-.253,3.063,3.063,0,0,0-1.237.253,3.256,3.256,0,0,0-1.013.685,3.256,3.256,0,0,0-.685,1.013A3.063,3.063,0,0,0,8.5-7.437,3.138,3.138,0,0,1,8.156-6a3.157,3.157,0,0,1-.95,1.129A4.294,4.294,0,0,1,8.18-4.2a4.328,4.328,0,0,1,.743.9A4.266,4.266,0,0,1,9.4-2.237a4.169,4.169,0,0,1,.166,1.175H8.5A3.063,3.063,0,0,0,8.247-2.3a3.256,3.256,0,0,0-.685-1.013A3.256,3.256,0,0,0,6.549-4,3.063,3.063,0,0,0,5.313-4.25,3.063,3.063,0,0,0,4.076-4a3.256,3.256,0,0,0-1.013.685A3.256,3.256,0,0,0,2.378-2.3a3.063,3.063,0,0,0-.253,1.237H1.063a4.169,4.169,0,0,1,.166-1.175A4.266,4.266,0,0,1,1.7-3.3a4.328,4.328,0,0,1,.743-.9,4.294,4.294,0,0,1,.975-.677A3.157,3.157,0,0,1,2.469-6a3.138,3.138,0,0,1-.344-1.436,3.063,3.063,0,0,1,.253-1.237,3.256,3.256,0,0,1,.685-1.013,3.256,3.256,0,0,1,1.013-.685,3.063,3.063,0,0,1,1.237-.253,3.138,3.138,0,0,1,1.436.344,3.157,3.157,0,0,1,1.129.95,4.331,4.331,0,0,1,.805-1.112,4.331,4.331,0,0,1,1.112-.805,3.157,3.157,0,0,1-.95-1.129A3.138,3.138,0,0,1,8.5-13.812a3.063,3.063,0,0,1,.253-1.237,3.256,3.256,0,0,1,.685-1.013,3.256,3.256,0,0,1,1.013-.685A3.063,3.063,0,0,1,11.688-17a3.063,3.063,0,0,1,1.237.253,3.256,3.256,0,0,1,1.013.685,3.256,3.256,0,0,1,.685,1.013,3.063,3.063,0,0,1,.253,1.237,3.138,3.138,0,0,1-.344,1.436A3.157,3.157,0,0,1,13.58-11.248ZM5.313-5.312a2.034,2.034,0,0,0,.822-.17,2.176,2.176,0,0,0,.677-.457,2.19,2.19,0,0,0,.457-.672,2.024,2.024,0,0,0,.17-.826,2.034,2.034,0,0,0-.17-.822,2.176,2.176,0,0,0-.457-.677,2.176,2.176,0,0,0-.677-.457,2.034,2.034,0,0,0-.822-.17,2.024,2.024,0,0,0-.826.17,2.19,2.19,0,0,0-.672.457,2.176,2.176,0,0,0-.457.677,2.034,2.034,0,0,0-.17.822,2.024,2.024,0,0,0,.17.826,2.19,2.19,0,0,0,.457.672,2.19,2.19,0,0,0,.672.457A2.024,2.024,0,0,0,5.313-5.312Zm4.25-8.5a2.024,2.024,0,0,0,.17.826,2.19,2.19,0,0,0,.457.672,2.19,2.19,0,0,0,.672.457,2.024,2.024,0,0,0,.826.17,2.034,2.034,0,0,0,.822-.17,2.176,2.176,0,0,0,.677-.457,2.19,2.19,0,0,0,.457-.672,2.024,2.024,0,0,0,.17-.826,2.034,2.034,0,0,0-.17-.822,2.176,2.176,0,0,0-.457-.677,2.176,2.176,0,0,0-.677-.457,2.034,2.034,0,0,0-.822-.17,2.024,2.024,0,0,0-.826.17,2.19,2.19,0,0,0-.672.457,2.176,2.176,0,0,0-.457.677A2.034,2.034,0,0,0,9.563-13.812Z" class="cls-2-112" data-name="Path 91" id="Path_91"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="timercharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='timercharm'}" @click="setCharm('timercharm')" title="计时器图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID12">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="timer">
                                                                <path transform="translate(0 0)" d="M11.688-7.437v1.063H7.438v-5.312H8.5v4.25ZM13.6-12.85a8.424,8.424,0,0,1,1.727,2.469,7.061,7.061,0,0,1,.606,2.943,7.321,7.321,0,0,1-.266,1.98,7.438,7.438,0,0,1-.751,1.776,7.471,7.471,0,0,1-1.162,1.5,7.471,7.471,0,0,1-1.5,1.162,7.438,7.438,0,0,1-1.776.751A7.321,7.321,0,0,1,8.5,0,7.321,7.321,0,0,1,6.52-.266a7.438,7.438,0,0,1-1.776-.751,7.471,7.471,0,0,1-1.5-1.162,7.471,7.471,0,0,1-1.162-1.5,7.438,7.438,0,0,1-.751-1.776,7.321,7.321,0,0,1-.266-1.98,7.3,7.3,0,0,1,.22-1.793,7.52,7.52,0,0,1,.623-1.644,7.392,7.392,0,0,1,.975-1.432,7.539,7.539,0,0,1,1.278-1.17,7.393,7.393,0,0,1,1.536-.851A7.375,7.375,0,0,1,7.438-14.8v-1.137H5.313V-17h5.313v1.063H8.5v1.063a7.5,7.5,0,0,1,2.245.34,7.08,7.08,0,0,1,2.03,1.013L14.5-15.249l.747.747ZM8.5-1.062a6.16,6.16,0,0,0,2.478-.5A6.482,6.482,0,0,0,13-2.934a6.482,6.482,0,0,0,1.37-2.025,6.16,6.16,0,0,0,.5-2.478,6.16,6.16,0,0,0-.5-2.478A6.482,6.482,0,0,0,13-11.941a6.482,6.482,0,0,0-2.025-1.37,6.16,6.16,0,0,0-2.478-.5,6.16,6.16,0,0,0-2.478.5A6.482,6.482,0,0,0,4-11.941a6.482,6.482,0,0,0-1.37,2.025,6.16,6.16,0,0,0-.5,2.478,6.16,6.16,0,0,0,.5,2.478A6.482,6.482,0,0,0,4-2.934a6.482,6.482,0,0,0,2.025,1.37A6.16,6.16,0,0,0,8.5-1.062Z" class="cls-2-113" data-name="Path 12" id="Path_12"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="musiccharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='musiccharm'}" @click="setCharm('musiccharm')" title="音乐图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID13">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="music">
                                                                <path transform="translate(0 0)" d="M14.875-5.312a1.687,1.687,0,0,1-.245.909A2.254,2.254,0,0,1,14-3.74a2.97,2.97,0,0,1-.859.411,3.216,3.216,0,0,1-.921.141,3.216,3.216,0,0,1-.921-.141,2.97,2.97,0,0,1-.859-.411A2.254,2.254,0,0,1,9.807-4.4a1.687,1.687,0,0,1-.245-.909,1.693,1.693,0,0,1,.245-.9,2.235,2.235,0,0,1,.631-.668A2.97,2.97,0,0,1,11.3-7.3a3.216,3.216,0,0,1,.921-.141,3.345,3.345,0,0,1,.83.1,2.81,2.81,0,0,1,.764.32v-8.11L6.375-13.265V-3.187a1.687,1.687,0,0,1-.245.909,2.254,2.254,0,0,1-.631.664A2.97,2.97,0,0,1,4.64-1.2a3.216,3.216,0,0,1-.921.141A3.216,3.216,0,0,1,2.8-1.2a2.97,2.97,0,0,1-.859-.411,2.254,2.254,0,0,1-.631-.664,1.687,1.687,0,0,1-.245-.909,1.693,1.693,0,0,1,.245-.9,2.235,2.235,0,0,1,.631-.668A2.97,2.97,0,0,1,2.8-5.171a3.216,3.216,0,0,1,.921-.141,3.345,3.345,0,0,1,.83.1,2.81,2.81,0,0,1,.764.32v-9.206l9.563-2.391ZM3.719-2.125a2.131,2.131,0,0,0,.5-.066,2.251,2.251,0,0,0,.519-.2,1.337,1.337,0,0,0,.411-.328.716.716,0,0,0,.166-.473.716.716,0,0,0-.166-.473,1.337,1.337,0,0,0-.411-.328,2.251,2.251,0,0,0-.519-.2,2.131,2.131,0,0,0-.5-.066,2.131,2.131,0,0,0-.5.066,2.251,2.251,0,0,0-.519.2,1.337,1.337,0,0,0-.411.328.716.716,0,0,0-.166.473.716.716,0,0,0,.166.473,1.337,1.337,0,0,0,.411.328,2.251,2.251,0,0,0,.519.2A2.131,2.131,0,0,0,3.719-2.125Zm8.5-2.125a2.131,2.131,0,0,0,.5-.066,2.251,2.251,0,0,0,.519-.2,1.337,1.337,0,0,0,.411-.328.716.716,0,0,0,.166-.473.716.716,0,0,0-.166-.473,1.337,1.337,0,0,0-.411-.328,2.251,2.251,0,0,0-.519-.2,2.131,2.131,0,0,0-.5-.066,2.131,2.131,0,0,0-.5.066,2.251,2.251,0,0,0-.519.2,1.337,1.337,0,0,0-.411.328.716.716,0,0,0-.166.473.716.716,0,0,0,.166.473,1.337,1.337,0,0,0,.411.328,2.251,2.251,0,0,0,.519.2A2.131,2.131,0,0,0,12.219-4.25Z" class="cls-2-114" data-name="Path 13" id="Path_13"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="carcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='carcharm'}" @click="setCharm('carcharm')" title="汽车图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID15">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="car">
                                                                <path transform="translate(0 0)" d="M3.188-7.437a1.03,1.03,0,0,1,.415.083,1.08,1.08,0,0,1,.336.228,1.08,1.08,0,0,1,.228.336,1.03,1.03,0,0,1,.083.415,1.03,1.03,0,0,1-.083.415,1.08,1.08,0,0,1-.228.336A1.08,1.08,0,0,1,3.6-5.4a1.03,1.03,0,0,1-.415.083A1.03,1.03,0,0,1,2.772-5.4a1.08,1.08,0,0,1-.336-.228,1.08,1.08,0,0,1-.228-.336,1.03,1.03,0,0,1-.083-.415,1.03,1.03,0,0,1,.083-.415,1.08,1.08,0,0,1,.228-.336,1.08,1.08,0,0,1,.336-.228A1.03,1.03,0,0,1,3.188-7.437Zm10.625,0a1.03,1.03,0,0,1,.415.083,1.08,1.08,0,0,1,.336.228,1.08,1.08,0,0,1,.228.336,1.03,1.03,0,0,1,.083.415,1.03,1.03,0,0,1-.083.415,1.08,1.08,0,0,1-.228.336,1.08,1.08,0,0,1-.336.228,1.03,1.03,0,0,1-.415.083A1.03,1.03,0,0,1,13.4-5.4a1.08,1.08,0,0,1-.336-.228,1.08,1.08,0,0,1-.228-.336,1.03,1.03,0,0,1-.083-.415,1.03,1.03,0,0,1,.083-.415,1.08,1.08,0,0,1,.228-.336,1.08,1.08,0,0,1,.336-.228A1.03,1.03,0,0,1,13.813-7.437Zm2.88-2.125-.548.54q.017.042.083.249t.162.49q.1.282.2.606t.2.594q.091.27.149.448L17-6.458v5.4a1.03,1.03,0,0,1-.083.415,1.08,1.08,0,0,1-.228.336,1.08,1.08,0,0,1-.336.228A1.03,1.03,0,0,1,15.938,0H14.875a1.03,1.03,0,0,1-.415-.083,1.08,1.08,0,0,1-.336-.228A1.08,1.08,0,0,1,13.9-.647a1.03,1.03,0,0,1-.083-.415H3.188A1.03,1.03,0,0,1,3.1-.647a1.08,1.08,0,0,1-.228.336,1.08,1.08,0,0,1-.336.228A1.03,1.03,0,0,1,2.125,0H1.063A1.03,1.03,0,0,1,.647-.083,1.08,1.08,0,0,1,.311-.311,1.08,1.08,0,0,1,.083-.647,1.03,1.03,0,0,1,0-1.062v-5.4l.058-.178q.058-.178.149-.448t.2-.594Q.515-8,.61-8.284t.162-.49q.066-.208.083-.249l-.548-.54H0v-1.062H.755l.473.481.614-1.851a2.533,2.533,0,0,1,.386-.743,2.669,2.669,0,0,1,.585-.573,2.765,2.765,0,0,1,.726-.369,2.57,2.57,0,0,1,.826-.133h8.268a2.57,2.57,0,0,1,.826.133,2.765,2.765,0,0,1,.726.369,2.592,2.592,0,0,1,.581.573,2.759,2.759,0,0,1,.39.743l.614,1.851.473-.481H17v1.063ZM4.366-12.75a1.548,1.548,0,0,0-.934.3,1.577,1.577,0,0,0-.577.789l-.706,2.1h12.7l-.706-2.1a1.577,1.577,0,0,0-.577-.789,1.548,1.548,0,0,0-.934-.3ZM11.688-2.532,10.824-4.25H6.176L5.313-2.532v.407h6.375Zm4.25.407V-6.292l-.05-.154q-.05-.154-.129-.386t-.17-.51q-.091-.278-.174-.523t-.145-.419q-.062-.174-.071-.216H1.8q-.017.042-.075.216t-.141.419q-.083.245-.174.523t-.17.51q-.079.232-.129.386l-.05.154v4.167H4.25v-.656L5.512-5.312h5.977L12.75-2.781v.656Z" class="cls-2-115" data-name="Path 15" id="Path_15"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="starcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='starcharm'}" @click="setCharm('starcharm')" title="星形图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID16">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="star">
                                                                <path transform="translate(0 0)" d="M12.133-6.255l2.125,6.8L8.774-3.667,3.29.548l2.125-6.8L0-10.419H6.718L8.774-17l2.056,6.581h6.718Zm.043,3.822Q11.85-3.5,11.525-4.546t-.668-2.112q.883-.66,1.739-1.328t1.731-1.337h-4.3l-1.251-4-1.251,4h-4.3q.874.668,1.731,1.337T6.692-6.658Q6.349-5.6,6.024-4.546T5.372-2.433l3.4-2.622Z" class="cls-2-116" data-name="Path 16" id="Path_16"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="personcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='personcharm'}" @click="setCharm('personcharm')" title="人员图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID18">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="person">
                                                                <path transform="translate(0 0)" d="M11.04-7.014a7.111,7.111,0,0,1,2.038,1.092A7.209,7.209,0,0,1,14.622-4.3,7.4,7.4,0,0,1,15.6-2.283,7.651,7.651,0,0,1,15.938,0H14.875a6.51,6.51,0,0,0-.486-2.528,6.188,6.188,0,0,0-1.341-2.021,6.188,6.188,0,0,0-2.021-1.341A6.51,6.51,0,0,0,8.5-6.375a6.47,6.47,0,0,0-1.71.224,6.405,6.405,0,0,0-1.531.635,6.216,6.216,0,0,0-1.287.988,6.216,6.216,0,0,0-.988,1.287A6.405,6.405,0,0,0,2.349-1.71,6.47,6.47,0,0,0,2.125,0H1.063a7.471,7.471,0,0,1,.349-2.287,7.4,7.4,0,0,1,.988-2A7.294,7.294,0,0,1,3.947-5.9a7.533,7.533,0,0,1,2.03-1.1,5.22,5.22,0,0,1-1.162-.847,5.274,5.274,0,0,1-.876-1.108,5.441,5.441,0,0,1-.556-1.3,5.23,5.23,0,0,1-.2-1.424A5.2,5.2,0,0,1,3.6-13.759,5.344,5.344,0,0,1,4.74-15.448a5.344,5.344,0,0,1,1.689-1.137A5.2,5.2,0,0,1,8.5-17a5.2,5.2,0,0,1,2.071.415,5.344,5.344,0,0,1,1.689,1.137A5.344,5.344,0,0,1,13.4-13.759a5.2,5.2,0,0,1,.415,2.071,5.185,5.185,0,0,1-.2,1.419,5.382,5.382,0,0,1-.556,1.295,5.5,5.5,0,0,1-.872,1.108A5.14,5.14,0,0,1,11.04-7.014ZM4.25-11.687a4.092,4.092,0,0,0,.336,1.652A4.336,4.336,0,0,0,5.5-8.687a4.336,4.336,0,0,0,1.349.913A4.092,4.092,0,0,0,8.5-7.437a4.092,4.092,0,0,0,1.652-.336A4.336,4.336,0,0,0,11.5-8.687a4.336,4.336,0,0,0,.913-1.349,4.092,4.092,0,0,0,.336-1.652,4.092,4.092,0,0,0-.336-1.652,4.336,4.336,0,0,0-.913-1.349,4.336,4.336,0,0,0-1.349-.913A4.092,4.092,0,0,0,8.5-15.937a4.092,4.092,0,0,0-1.652.336,4.336,4.336,0,0,0-1.349.913,4.336,4.336,0,0,0-.913,1.349A4.092,4.092,0,0,0,4.25-11.687Z" class="cls-2-117" data-name="Path 18" id="Path_18"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="ballooncharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='ballooncharm'}" @click="setCharm('ballooncharm')" title="气球图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID19">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="balloon">
                                                                <path transform="translate(0 0)" d="M14.344-10.625a.511.511,0,0,1-.374-.158.511.511,0,0,1-.158-.374,1.564,1.564,0,0,0-.125-.623,1.6,1.6,0,0,0-.34-.506,1.6,1.6,0,0,0-.506-.34,1.564,1.564,0,0,0-.623-.125.511.511,0,0,1-.374-.158.511.511,0,0,1-.158-.374.511.511,0,0,1,.158-.374.511.511,0,0,1,.374-.158,2.6,2.6,0,0,1,1.033.208,2.666,2.666,0,0,1,.847.569,2.666,2.666,0,0,1,.569.847,2.6,2.6,0,0,1,.208,1.033.511.511,0,0,1-.158.374A.511.511,0,0,1,14.344-10.625Zm-9.562-4.25a2.6,2.6,0,0,1,1.033.208,2.666,2.666,0,0,1,.847.569,2.666,2.666,0,0,1,.569.847,2.6,2.6,0,0,1,.208,1.033.511.511,0,0,1-.158.374.511.511,0,0,1-.374.158.511.511,0,0,1-.374-.158.511.511,0,0,1-.158-.374,1.564,1.564,0,0,0-.125-.623,1.6,1.6,0,0,0-.34-.506,1.6,1.6,0,0,0-.506-.34,1.564,1.564,0,0,0-.623-.125.511.511,0,0,1-.374-.158.511.511,0,0,1-.158-.374.511.511,0,0,1,.158-.374A.511.511,0,0,1,4.781-14.875ZM12.75-4.441q0,.166-.012.382a1.626,1.626,0,0,0,.025.407.707.707,0,0,0,.154.328.453.453,0,0,0,.365.137,2.6,2.6,0,0,1,1.033.208,2.666,2.666,0,0,1,.847.569,2.666,2.666,0,0,1,.569.847,2.6,2.6,0,0,1,.208,1.033.511.511,0,0,1-.158.374A.511.511,0,0,1,15.406,0a.511.511,0,0,1-.374-.158.511.511,0,0,1-.158-.374,1.564,1.564,0,0,0-.125-.623,1.6,1.6,0,0,0-.34-.506A1.6,1.6,0,0,0,13.9-2a1.564,1.564,0,0,0-.623-.125,1.564,1.564,0,0,1-.623-.125,1.6,1.6,0,0,1-.506-.34,1.6,1.6,0,0,1-.34-.506,1.564,1.564,0,0,1-.125-.623v-.722a7.4,7.4,0,0,1-2.05-1.436A7.2,7.2,0,0,1,8.193-7.919,7.281,7.281,0,0,1,6.915-6.524,7.225,7.225,0,0,1,5.313-5.5v.722a1.564,1.564,0,0,0,.125.623,1.6,1.6,0,0,0,.34.506,1.6,1.6,0,0,0,.506.34,1.564,1.564,0,0,0,.623.125q.44,0,.83,0a4.089,4.089,0,0,1,.747.058,2.49,2.49,0,0,1,.689.228,2.73,2.73,0,0,1,.672.5,2.652,2.652,0,0,1,.581.859,2.613,2.613,0,0,1,.2,1.017.511.511,0,0,1-.158.374A.511.511,0,0,1,10.094,0,.511.511,0,0,1,9.72-.158a.511.511,0,0,1-.158-.374,1.564,1.564,0,0,0-.125-.623A1.6,1.6,0,0,0,9.1-1.66,1.6,1.6,0,0,0,8.591-2a1.564,1.564,0,0,0-.623-.125H6.906a2.6,2.6,0,0,1-1.033-.208A2.666,2.666,0,0,1,5.026-2.9a2.666,2.666,0,0,1-.569-.847A2.6,2.6,0,0,1,4.25-4.781V-5.5A7.248,7.248,0,0,1,2.49-6.666,7.433,7.433,0,0,1,1.15-8.247,7.524,7.524,0,0,1,.3-10.131,7.31,7.31,0,0,1,0-12.219a4.626,4.626,0,0,1,.378-1.859A4.855,4.855,0,0,1,1.4-15.6a4.855,4.855,0,0,1,1.519-1.025A4.626,4.626,0,0,1,4.781-17a4.691,4.691,0,0,1,1.245.166,4.844,4.844,0,0,1,1.146.477,4.823,4.823,0,0,1,.988.755,4.584,4.584,0,0,1,.764,1,4.652,4.652,0,0,1,1.515-.992,4.7,4.7,0,0,1,1.781-.344,4.626,4.626,0,0,1,1.859.378A4.855,4.855,0,0,1,15.6-14.535a4.855,4.855,0,0,1,1.025,1.519A4.626,4.626,0,0,1,17-11.156a7.31,7.31,0,0,1-.3,2.088,7.524,7.524,0,0,1-.851,1.884A7.433,7.433,0,0,1,14.51-5.6,7.248,7.248,0,0,1,12.75-4.441ZM4.781-6.425a6.244,6.244,0,0,0,1.54-.992,6.425,6.425,0,0,0,1.17-1.357,6.37,6.37,0,0,0,.747-1.631A6.305,6.305,0,0,0,8.5-12.219a3.587,3.587,0,0,0-.295-1.448,3.788,3.788,0,0,0-.8-1.179,3.788,3.788,0,0,0-1.179-.8,3.587,3.587,0,0,0-1.448-.295,3.587,3.587,0,0,0-1.448.295,3.788,3.788,0,0,0-1.179.8,3.788,3.788,0,0,0-.8,1.179,3.587,3.587,0,0,0-.295,1.448,6.305,6.305,0,0,0,.261,1.814,6.37,6.37,0,0,0,.747,1.631,6.425,6.425,0,0,0,1.17,1.357A6.244,6.244,0,0,0,4.781-6.425ZM8.865-9.073A6.061,6.061,0,0,0,9.4-7.9a6.5,6.5,0,0,0,.76,1.029,6.322,6.322,0,0,0,.946.855,6.453,6.453,0,0,0,1.108.656,6.244,6.244,0,0,0,1.54-.992,6.425,6.425,0,0,0,1.17-1.357,6.37,6.37,0,0,0,.747-1.631,6.305,6.305,0,0,0,.261-1.814,3.587,3.587,0,0,0-.295-1.448,3.788,3.788,0,0,0-.8-1.179,3.788,3.788,0,0,0-1.179-.8,3.587,3.587,0,0,0-1.448-.295,3.6,3.6,0,0,0-1.569.353,3.718,3.718,0,0,0-1.27.992,4.558,4.558,0,0,1,.137.647,4.869,4.869,0,0,1,.046.664A7.5,7.5,0,0,1,9.388-10.6,7.2,7.2,0,0,1,8.865-9.073Z" class="cls-2-118" data-name="Path 19" id="Path_19"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="forkknifecharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='forkknifecharm'}" @click="setCharm('forkknifecharm')" title="刀叉图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID20">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="forkknife">
                                                                <path transform="translate(0 0)" d="M7.969-17a.511.511,0,0,1,.374.158.511.511,0,0,1,.158.374v5.844a2.024,2.024,0,0,1-.17.826,2.19,2.19,0,0,1-.457.672A2.176,2.176,0,0,1,7.2-8.67a2.033,2.033,0,0,1-.822.17V-.531a.511.511,0,0,1-.158.374A.511.511,0,0,1,5.844,0,.511.511,0,0,1,5.47-.158a.511.511,0,0,1-.158-.374V-8.5a2.025,2.025,0,0,1-.826-.17,2.19,2.19,0,0,1-.672-.457A2.19,2.19,0,0,1,3.358-9.8a2.024,2.024,0,0,1-.17-.826v-5.844a.511.511,0,0,1,.158-.374A.511.511,0,0,1,3.719-17a.511.511,0,0,1,.374.158.511.511,0,0,1,.158.374v5.844a1.029,1.029,0,0,0,.083.415,1.08,1.08,0,0,0,.228.336,1.08,1.08,0,0,0,.336.228,1.03,1.03,0,0,0,.415.083v-6.906a.511.511,0,0,1,.158-.374A.511.511,0,0,1,5.844-17a.511.511,0,0,1,.374.158.511.511,0,0,1,.158.374v6.906a1.03,1.03,0,0,0,.415-.083,1.08,1.08,0,0,0,.336-.228,1.08,1.08,0,0,0,.228-.336,1.029,1.029,0,0,0,.083-.415v-5.844a.511.511,0,0,1,.158-.374A.511.511,0,0,1,7.969-17Zm5.844,0V-.531a.511.511,0,0,1-.158.374A.511.511,0,0,1,13.281,0a.511.511,0,0,1-.374-.158.511.511,0,0,1-.158-.374V-5.312q-.307,0-.664.008t-.71-.012a3.88,3.88,0,0,1-.681-.1,1.679,1.679,0,0,1-.581-.257,1.269,1.269,0,0,1-.4-.473,1.679,1.679,0,0,1-.149-.76v-6.375a3.587,3.587,0,0,1,.295-1.448,3.789,3.789,0,0,1,.8-1.179,3.788,3.788,0,0,1,1.179-.8A3.587,3.587,0,0,1,13.281-17ZM12.75-15.888a2.457,2.457,0,0,0-.851.336,2.816,2.816,0,0,0-.672.594,2.669,2.669,0,0,0-.444.776,2.581,2.581,0,0,0-.158.9v6.375a.511.511,0,0,0,.158.374.511.511,0,0,0,.374.158H12.75Z" class="cls-2-119" data-name="Path 20" id="Path_20"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="heartcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='heartcharm'}" @click="setCharm('heartcharm')" title="心形图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID21">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="heart">
                                                                <path transform="translate(0 0)" d="M12.484-15.937a4.369,4.369,0,0,1,1.76.357,4.639,4.639,0,0,1,1.436.967,4.483,4.483,0,0,1,.967,1.436A4.422,4.422,0,0,1,17-11.422a4.482,4.482,0,0,1-.344,1.735,4.467,4.467,0,0,1-.975,1.461L8.5-1.054,1.32-8.226A4.467,4.467,0,0,1,.344-9.687,4.482,4.482,0,0,1,0-11.422a4.422,4.422,0,0,1,.353-1.756,4.483,4.483,0,0,1,.967-1.436,4.639,4.639,0,0,1,1.436-.967,4.369,4.369,0,0,1,1.76-.357,4.382,4.382,0,0,1,1.229.158,4.214,4.214,0,0,1,1,.436,5.351,5.351,0,0,1,.88.668q.419.39.876.855.457-.465.876-.855a5.351,5.351,0,0,1,.88-.668,4.214,4.214,0,0,1,1-.436A4.382,4.382,0,0,1,12.484-15.937Zm2.44,6.956a3.372,3.372,0,0,0,.747-1.121,3.462,3.462,0,0,0,.257-1.32,3.42,3.42,0,0,0-.266-1.349,3.326,3.326,0,0,0-.735-1.087,3.433,3.433,0,0,0-1.1-.722,3.468,3.468,0,0,0-1.349-.261,3.255,3.255,0,0,0-1.237.22,4.158,4.158,0,0,0-1,.577,7.458,7.458,0,0,0-.876.809q-.419.452-.876.917-.448-.448-.872-.9a7.9,7.9,0,0,0-.884-.822,4.382,4.382,0,0,0-1-.6,3.086,3.086,0,0,0-1.224-.232,3.384,3.384,0,0,0-1.345.27,3.465,3.465,0,0,0-1.1.739,3.465,3.465,0,0,0-.739,1.1,3.384,3.384,0,0,0-.27,1.345,3.414,3.414,0,0,0,.261,1.32,3.427,3.427,0,0,0,.751,1.121L8.5-2.557Z" class="cls-2-120" data-name="Path 21" id="Path_21"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="soccercharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='soccercharm'}" @click="setCharm('soccercharm')" title="足球图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID22">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="soccer">
                                                                <path transform="translate(0 0)" d="M10.467-5.844H6.533L5.313-9.587,8.5-11.9l3.188,2.316Zm-.033-3.345L8.5-10.592l-1.934,1.4L7.3-6.906H9.7ZM8.5-17a8.373,8.373,0,0,1,2.258.3,8.6,8.6,0,0,1,2.034.855,8.441,8.441,0,0,1,1.722,1.328,8.441,8.441,0,0,1,1.328,1.722,8.6,8.6,0,0,1,.855,2.034A8.373,8.373,0,0,1,17-8.5a8.373,8.373,0,0,1-.3,2.258,8.6,8.6,0,0,1-.855,2.034,8.441,8.441,0,0,1-1.328,1.722,8.441,8.441,0,0,1-1.722,1.328A8.6,8.6,0,0,1,10.758-.3,8.373,8.373,0,0,1,8.5,0,8.373,8.373,0,0,1,6.242-.3a8.6,8.6,0,0,1-2.034-.855A8.441,8.441,0,0,1,2.486-2.486,8.441,8.441,0,0,1,1.158-4.208,8.614,8.614,0,0,1,.3-6.238,8.359,8.359,0,0,1,0-8.5a8.373,8.373,0,0,1,.3-2.258,8.6,8.6,0,0,1,.855-2.034,8.441,8.441,0,0,1,1.328-1.722,8.441,8.441,0,0,1,1.722-1.328,8.614,8.614,0,0,1,2.03-.855A8.359,8.359,0,0,1,8.5-17Zm7.363,7.429a7.4,7.4,0,0,0-.78-2.391l-1.121-.166-.291,1.951,1.386,1.4ZM9.753-15.83a6.177,6.177,0,0,0-.627-.083q-.311-.025-.627-.025t-.627.025a6.177,6.177,0,0,0-.627.083L6.74-14.817l1.76.88,1.76-.88ZM1.917-11.961a7.4,7.4,0,0,0-.78,2.391l.805.8,1.386-1.4-.291-1.951ZM3.179-3.312A7.346,7.346,0,0,0,5.213-1.834l1-.515L5.3-4.1,3.362-4.424ZM6.541-1.328A7.4,7.4,0,0,0,8.5-1.062a7.4,7.4,0,0,0,1.959-.266L9.355-1.9,11-5.063l3.511-.581.208,1.22A7.48,7.48,0,0,0,15.572-6.2a7.441,7.441,0,0,0,.357-1.947l-.888.88-2.5-2.54.531-3.528,1.229.183a7.282,7.282,0,0,0-1.432-1.365,7.374,7.374,0,0,0-1.739-.934l.556,1.112L8.5-12.75,5.313-14.344l.556-1.112a7.374,7.374,0,0,0-1.739.934A7.282,7.282,0,0,0,2.7-13.157l1.229-.183.531,3.528-2.5,2.54-.888-.88A7.441,7.441,0,0,0,1.428-6.2a7.48,7.48,0,0,0,.855,1.781l.208-1.22L6-5.063,7.645-1.9Zm5.246-.506a7.346,7.346,0,0,0,2.034-1.478l-.183-1.112L11.7-4.1l-.9,1.751Z" class="cls-2-121" data-name="Path 22" id="Path_22"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="moviecharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='moviecharm'}" @click="setCharm('moviecharm')" title="电影图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID23">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="movie">
                                                                <path transform="translate(0 0)" d="M15.938-9.562v6.906a1.564,1.564,0,0,1-.125.623,1.6,1.6,0,0,1-.34.506,1.6,1.6,0,0,1-.506.34,1.564,1.564,0,0,1-.623.125H2.656a1.564,1.564,0,0,1-.623-.125,1.6,1.6,0,0,1-.506-.34,1.6,1.6,0,0,1-.34-.506,1.564,1.564,0,0,1-.125-.623V-6.865q0-.307.012-.556t.017-.494q0-.245,0-.494t-.029-.556a2.5,2.5,0,0,0-.05-.32Q.979-9.43.942-9.562t-.083-.27q-.046-.137-.087-.311L.183-12.509l14.427-3.6,1.029,4.125L5.918-9.562ZM5.653-12.783l-2.665.664L5.91-10.658l2.665-.664Zm4.507,1.071,2.673-.672L9.911-13.837l-2.673.664Zm-8.683.033.506,2,2.341-.581Zm12.36-3.146-2.341.589,2.839,1.419ZM14.875-8.5H2.125v5.844a.511.511,0,0,0,.158.374.511.511,0,0,0,.374.158H14.344a.511.511,0,0,0,.374-.158.511.511,0,0,0,.158-.374Z" class="cls-2-122" data-name="Path 32" id="Path_32"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="bookscharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='bookscharm'}" @click="setCharm('bookscharm')" title="书籍图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID25">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="books">
                                                                <path transform="translate(0 0)" d="M15.938-14.875V-1.062H0V-14.875H2.125v-1.062H5.313a4.445,4.445,0,0,1,1.407.224,4.113,4.113,0,0,1,1.249.672,4.113,4.113,0,0,1,1.249-.672,4.445,4.445,0,0,1,1.407-.224h3.188v1.063Zm-5.312,0a3.341,3.341,0,0,0-1.129.2,3.244,3.244,0,0,0-1,.569V-3.7a4.234,4.234,0,0,1,1.029-.411,4.436,4.436,0,0,1,1.1-.137H12.75V-14.875ZM3.188-4.25H5.313a4.436,4.436,0,0,1,1.1.137A4.234,4.234,0,0,1,7.438-3.7V-14.111a3.244,3.244,0,0,0-1-.569,3.341,3.341,0,0,0-1.129-.2H3.188ZM1.063-2.125h6.69a4.678,4.678,0,0,0-.54-.452,3.582,3.582,0,0,0-.569-.332,2.939,2.939,0,0,0-.623-.208,3.372,3.372,0,0,0-.71-.071H2.125V-13.812H1.063ZM14.875-13.812H13.813V-3.187H10.625a3.372,3.372,0,0,0-.71.071,2.939,2.939,0,0,0-.623.208,3.582,3.582,0,0,0-.569.332,4.678,4.678,0,0,0-.54.452h6.69Z" class="cls-2-123" data-name="Path 24" id="Path_24"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="cakecharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='cakecharm'}" @click="setCharm('cakecharm')" title="蛋糕图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID26">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="birthday">
                                                                <path transform="translate(0 0)" d="M17-1.05V.2H0V-1.05H1.133V-6.676a3.307,3.307,0,0,1,.222-1.212,3.129,3.129,0,0,1,.607-.991,2.926,2.926,0,0,1,.9-.675,2.479,2.479,0,0,1,1.1-.247H7.935v-3.438A.2.2,0,0,1,8-13.39a.492.492,0,0,1,.159-.1.9.9,0,0,1,.19-.05c.05-.007.1-.012.151-.014a1.079,1.079,0,0,1,.151.014.9.9,0,0,1,.19.05.492.492,0,0,1,.159.1.208.208,0,0,1,.067.152V-9.8h3.963a2.5,2.5,0,0,1,1.1.249,2.921,2.921,0,0,1,.9.675,3.278,3.278,0,0,1,.612.991,3.258,3.258,0,0,1,.226,1.212v5.626H17ZM3.967-8.551a1.562,1.562,0,0,0-.62.126,1.685,1.685,0,0,0-.519.354,1.893,1.893,0,0,0-.373.532,1.965,1.965,0,0,0-.181.658,2.258,2.258,0,0,0,.767.615,2.1,2.1,0,0,0,.924.216,1.91,1.91,0,0,0,1.012-.259,2.941,2.941,0,0,0,.8-.739.911.911,0,0,1,.2-.185A.456.456,0,0,1,6.231-7.3a.433.433,0,0,1,.252.069,1.031,1.031,0,0,1,.2.185,3.017,3.017,0,0,0,.8.739A1.915,1.915,0,0,0,8.5-6.049a1.91,1.91,0,0,0,1.012-.259,2.94,2.94,0,0,0,.8-.739.911.911,0,0,1,.2-.185.456.456,0,0,1,.252-.069.433.433,0,0,1,.252.069,1.031,1.031,0,0,1,.2.185,3.017,3.017,0,0,0,.8.739,1.915,1.915,0,0,0,1.012.259,2.063,2.063,0,0,0,.924-.216,2.258,2.258,0,0,0,.767-.615,1.965,1.965,0,0,0-.181-.658,1.893,1.893,0,0,0-.373-.532,1.685,1.685,0,0,0-.519-.354,1.515,1.515,0,0,0-.62-.126Zm-1.7,7.5H14.732V-5.3a4.945,4.945,0,0,1-.823.366,2.748,2.748,0,0,1-.877.131,3.141,3.141,0,0,1-1.213-.235,3.321,3.321,0,0,1-1.053-.706,3.321,3.321,0,0,1-1.053.706A3.141,3.141,0,0,1,8.5-4.8a3.141,3.141,0,0,1-1.213-.235,3.321,3.321,0,0,1-1.053-.706,3.321,3.321,0,0,1-1.053.706A3.141,3.141,0,0,1,3.969-4.8,2.812,2.812,0,0,1,3.1-4.932,4.793,4.793,0,0,1,2.272-5.3ZM8.5-14.8a.52.52,0,0,1-.4-.185.622.622,0,0,1-.168-.44.9.9,0,0,1,.071-.3c.047-.124.1-.254.164-.39s.125-.266.185-.39L8.5-16.8l.146.292c.062.124.123.254.185.39s.116.266.164.39a.9.9,0,0,1,.071.3.631.631,0,0,1-.168.44A.528.528,0,0,1,8.5-14.8Z" class="cls-2-124" data-name="Path 129" id="Path_129"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="tvcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='tvcharm'}" @click="setCharm('tvcharm')" title="电视图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID27">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="tv">
                                                                <path transform="translate(0 0)" d="M15.938-5.312H8.5V-4.25h2.125v1.063H5.313V-4.25H7.438V-5.312H0v-9.562H15.938Zm-14.875-8.5v7.438H14.875v-7.437Z" class="cls-2-125" data-name="Path 26" id="Path_26"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="packagedeliverycharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='packagedeliverycharm'}" @click="setCharm('packagedeliverycharm')" title="包裹递送图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID29">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="packagedelivery">
                                                                <path transform="translate(0 0)" d="M17-4.25H12.65a1.533,1.533,0,0,1-.232.436,1.566,1.566,0,0,1-.344.332,1.66,1.66,0,0,1-.432.216,1.526,1.526,0,0,1-.486.079,1.526,1.526,0,0,1-.486-.079,1.66,1.66,0,0,1-.432-.216,1.566,1.566,0,0,1-.344-.332,1.533,1.533,0,0,1-.232-.436H5.213a1.533,1.533,0,0,1-.232.436,1.566,1.566,0,0,1-.344.332,1.66,1.66,0,0,1-.432.216,1.526,1.526,0,0,1-.486.079,1.526,1.526,0,0,1-.486-.079A1.66,1.66,0,0,1,2.8-3.482a1.566,1.566,0,0,1-.344-.332,1.533,1.533,0,0,1-.232-.436H0v-9.562H11.688v1.063h2.988L17-8.093ZM1.063-5.312H2.225a1.629,1.629,0,0,1,.232-.432A1.525,1.525,0,0,1,2.8-6.08,1.66,1.66,0,0,1,3.233-6.3a1.526,1.526,0,0,1,.486-.079A1.526,1.526,0,0,1,4.2-6.3a1.66,1.66,0,0,1,.432.216,1.525,1.525,0,0,1,.344.336,1.629,1.629,0,0,1,.232.432H9.662a1.525,1.525,0,0,1,.369-.594,1.525,1.525,0,0,1,.594-.369V-12.75H1.063ZM3.719-4.25a.511.511,0,0,0,.374-.158.511.511,0,0,0,.158-.374.511.511,0,0,0-.158-.374.511.511,0,0,0-.374-.158.511.511,0,0,0-.374.158.511.511,0,0,0-.158.374.511.511,0,0,0,.158.374A.511.511,0,0,0,3.719-4.25Zm7.438,0a.511.511,0,0,0,.374-.158.511.511,0,0,0,.158-.374.511.511,0,0,0-.158-.374.511.511,0,0,0-.374-.158.511.511,0,0,0-.374.158.511.511,0,0,0-.158.374.511.511,0,0,0,.158.374A.511.511,0,0,0,11.156-4.25Zm4.781-3.594-1.926-3.843H11.688v5.412a1.525,1.525,0,0,1,.594.369,1.525,1.525,0,0,1,.369.594h3.287Z" class="cls-2-126" data-name="Path 34" id="Path_34"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="eventcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='eventcharm'}" @click="setCharm('eventcharm')" title="活动图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID31">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="event">
                                                                <path transform="translate(0 0)" d="M17-9.562a1.03,1.03,0,0,0-.415.083,1.08,1.08,0,0,0-.336.228,1.08,1.08,0,0,0-.228.336,1.03,1.03,0,0,0-.083.415,1.03,1.03,0,0,0,.083.415,1.08,1.08,0,0,0,.228.336,1.08,1.08,0,0,0,.336.228A1.03,1.03,0,0,0,17-7.437v4.25H0v-4.25a1.03,1.03,0,0,0,.415-.083,1.08,1.08,0,0,0,.336-.228,1.08,1.08,0,0,0,.228-.336A1.03,1.03,0,0,0,1.063-8.5a1.03,1.03,0,0,0-.083-.415,1.08,1.08,0,0,0-.228-.336,1.08,1.08,0,0,0-.336-.228A1.03,1.03,0,0,0,0-9.562v-4.25H17ZM15.938-12.75H1.063v2.407a2.111,2.111,0,0,1,.78.78A2.092,2.092,0,0,1,2.125-8.5a2.092,2.092,0,0,1-.282,1.063,2.111,2.111,0,0,1-.78.78V-4.25H15.938V-6.657a2.111,2.111,0,0,1-.78-.78A2.092,2.092,0,0,1,14.875-8.5a2.092,2.092,0,0,1,.282-1.062,2.111,2.111,0,0,1,.78-.78Z" class="cls-2-127" data-name="Path 28" id="Path_28"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="creditcardcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='creditcardcharm'}" @click="setCharm('creditcardcharm')" title="信用卡图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID33">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="creditcard">
                                                                <path transform="translate(0 0)" d="M15.672-14.875a1.286,1.286,0,0,1,.515.1,1.347,1.347,0,0,1,.423.286,1.347,1.347,0,0,1,.286.423,1.286,1.286,0,0,1,.1.515v9.031A1.286,1.286,0,0,1,16.9-4a1.347,1.347,0,0,1-.286.423,1.347,1.347,0,0,1-.423.286,1.286,1.286,0,0,1-.515.1H1.328a1.286,1.286,0,0,1-.515-.1A1.347,1.347,0,0,1,.39-3.578,1.347,1.347,0,0,1,.1-4,1.286,1.286,0,0,1,0-4.516v-9.031a1.286,1.286,0,0,1,.1-.515,1.347,1.347,0,0,1,.286-.423,1.347,1.347,0,0,1,.423-.286,1.286,1.286,0,0,1,.515-.1ZM1.328-13.812a.259.259,0,0,0-.191.075.259.259,0,0,0-.075.191v1.859H15.938v-1.859a.259.259,0,0,0-.075-.191.259.259,0,0,0-.191-.075ZM15.672-4.25a.259.259,0,0,0,.191-.075.259.259,0,0,0,.075-.191v-6.109H1.063v6.109a.259.259,0,0,0,.075.191.259.259,0,0,0,.191.075ZM11.688-7.437h2.125v1.063H11.688Z" class="cls-2-128" data-name="Path 30" id="Path_30"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="bikecharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='bikecharm'}" @click="setCharm('bikecharm')" title="自行车图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID34">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="bike">
                                                                <path transform="translate(0 0)" d="M3.188-7.437a3.106,3.106,0,0,1,1.237.249A3.213,3.213,0,0,1,5.441-6.5a3.213,3.213,0,0,1,.685,1.017A3.106,3.106,0,0,1,6.375-4.25a3.1,3.1,0,0,1-.249,1.241A3.226,3.226,0,0,1,5.441-2a3.213,3.213,0,0,1-1.017.685,3.106,3.106,0,0,1-1.237.249,3.1,3.1,0,0,1-1.241-.249A3.226,3.226,0,0,1,.934-2,3.226,3.226,0,0,1,.249-3.009,3.1,3.1,0,0,1,0-4.25,3.106,3.106,0,0,1,.249-5.487,3.213,3.213,0,0,1,.934-6.5a3.226,3.226,0,0,1,1.013-.685A3.1,3.1,0,0,1,3.188-7.437Zm0,5.313a2.068,2.068,0,0,0,.826-.166,2.146,2.146,0,0,0,.677-.457,2.146,2.146,0,0,0,.457-.677,2.068,2.068,0,0,0,.166-.826,2.068,2.068,0,0,0-.166-.826,2.146,2.146,0,0,0-.457-.677,2.146,2.146,0,0,0-.677-.457,2.068,2.068,0,0,0-.826-.166,2.068,2.068,0,0,0-.826.166,2.146,2.146,0,0,0-.677.457,2.146,2.146,0,0,0-.457.677,2.068,2.068,0,0,0-.166.826,2.068,2.068,0,0,0,.166.826,2.146,2.146,0,0,0,.457.677,2.146,2.146,0,0,0,.677.457A2.068,2.068,0,0,0,3.188-2.125ZM13.813-7.437a3.106,3.106,0,0,1,1.237.249,3.213,3.213,0,0,1,1.017.685,3.213,3.213,0,0,1,.685,1.017A3.106,3.106,0,0,1,17-4.25a3.1,3.1,0,0,1-.249,1.241A3.226,3.226,0,0,1,16.066-2a3.213,3.213,0,0,1-1.017.685,3.106,3.106,0,0,1-1.237.249,3.1,3.1,0,0,1-1.241-.249A3.226,3.226,0,0,1,11.559-2a3.226,3.226,0,0,1-.685-1.013,3.1,3.1,0,0,1-.249-1.241,3.106,3.106,0,0,1,.249-1.237A3.213,3.213,0,0,1,11.559-6.5a3.226,3.226,0,0,1,1.013-.685A3.1,3.1,0,0,1,13.813-7.437Zm0,5.313a2.068,2.068,0,0,0,.826-.166,2.146,2.146,0,0,0,.677-.457,2.146,2.146,0,0,0,.457-.677,2.068,2.068,0,0,0,.166-.826,2.068,2.068,0,0,0-.166-.826,2.146,2.146,0,0,0-.457-.677,2.146,2.146,0,0,0-.677-.457,2.068,2.068,0,0,0-.826-.166,2.068,2.068,0,0,0-.826.166,2.146,2.146,0,0,0-.677.457,2.146,2.146,0,0,0-.457.677,2.068,2.068,0,0,0-.166.826,2.068,2.068,0,0,0,.166.826,2.146,2.146,0,0,0,.457.677,2.146,2.146,0,0,0,.677.457A2.068,2.068,0,0,0,13.813-2.125ZM11.688-7.969a.511.511,0,0,1-.374-.158l-.955-.946-.847.838q.075.075.178.166a2.072,2.072,0,0,1,.191.191,1.308,1.308,0,0,1,.149.208.457.457,0,0,1,.062.232v3.719a1.564,1.564,0,0,1-.125.623,1.6,1.6,0,0,1-.34.506,1.6,1.6,0,0,1-.506.34,1.564,1.564,0,0,1-.623.125,1.564,1.564,0,0,1-.623-.125,1.6,1.6,0,0,1-.506-.34,1.6,1.6,0,0,1-.34-.506,1.564,1.564,0,0,1-.125-.623v-2.44q-.224-.224-.448-.452T6-7.064A2.927,2.927,0,0,1,5.5-7.7a1.577,1.577,0,0,1-.183-.793,1.852,1.852,0,0,1,.05-.448A1.68,1.68,0,0,1,5.5-9.313a1.732,1.732,0,0,1,.228-.332q.137-.158.3-.324L9.6-13.53a1.068,1.068,0,0,1-.025-.141,1.281,1.281,0,0,1-.008-.141,2.068,2.068,0,0,1,.166-.826,2.146,2.146,0,0,1,.457-.677,2.146,2.146,0,0,1,.677-.457,2.068,2.068,0,0,1,.826-.166,2.068,2.068,0,0,1,.826.166,2.146,2.146,0,0,1,.677.457,2.146,2.146,0,0,1,.457.677,2.068,2.068,0,0,1,.166.826,2.074,2.074,0,0,1-.108.668,2.137,2.137,0,0,1-.3.585,2.06,2.06,0,0,1-.469.461,2.221,2.221,0,0,1-.606.3l.639.639h1.378a1.564,1.564,0,0,1,.623.125,1.6,1.6,0,0,1,.506.34,1.6,1.6,0,0,1,.34.506,1.564,1.564,0,0,1,.125.623,1.564,1.564,0,0,1-.125.623,1.6,1.6,0,0,1-.34.506,1.6,1.6,0,0,1-.506.34,1.564,1.564,0,0,1-.623.125Zm0-6.906a1.03,1.03,0,0,0-.415.083,1.08,1.08,0,0,0-.336.228,1.08,1.08,0,0,0-.228.336,1.03,1.03,0,0,0-.083.415,1.03,1.03,0,0,0,.083.415,1.08,1.08,0,0,0,.228.336,1.08,1.08,0,0,0,.336.228,1.03,1.03,0,0,0,.415.083,1.03,1.03,0,0,0,.415-.083,1.08,1.08,0,0,0,.336-.228,1.08,1.08,0,0,0,.228-.336,1.03,1.03,0,0,0,.083-.415,1.03,1.03,0,0,0-.083-.415,1.08,1.08,0,0,0-.228-.336,1.08,1.08,0,0,0-.336-.228A1.03,1.03,0,0,0,11.688-14.875ZM8.234-8.234a.511.511,0,0,1,.158-.374L9.986-10.2a.511.511,0,0,1,.374-.158.511.511,0,0,1,.374.158l1.17,1.17h2.44a.511.511,0,0,0,.374-.158.511.511,0,0,0,.158-.374.511.511,0,0,0-.158-.374.511.511,0,0,0-.374-.158H12.75a.511.511,0,0,1-.374-.158l-2.283-2.283L6.749-9.189a2.586,2.586,0,0,0-.261.3.638.638,0,0,0-.112.386.644.644,0,0,0,.1.365,1.914,1.914,0,0,0,.241.291l1.1,1.1a.511.511,0,0,1,.158.374v2.656a.511.511,0,0,0,.158.374.511.511,0,0,0,.374.158.511.511,0,0,0,.374-.158.511.511,0,0,0,.158-.374v-3.5l-.639-.639A.511.511,0,0,1,8.234-8.234Z" class="cls-2-129" data-name="Path 105" id="Path_105"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="buscharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='buscharm'}" @click="setCharm('buscharm')" title="公交车图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID38">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="bus">
                                                                <path transform="translate(0 0)" d="M15.938-11.687v2.125H14.875v7.969a5.631,5.631,0,0,1-.029.569,1.635,1.635,0,0,1-.133.515.868.868,0,0,1-.315.369A1.046,1.046,0,0,1,13.813,0q-.208,0-.444.008A4.5,4.5,0,0,1,12.9,0a2.709,2.709,0,0,1-.457-.071,1.139,1.139,0,0,1-.386-.17.828.828,0,0,1-.266-.315,1.13,1.13,0,0,1-.1-.506H4.25a1.03,1.03,0,0,1-.083.415,1.08,1.08,0,0,1-.228.336A1.08,1.08,0,0,1,3.6-.083,1.03,1.03,0,0,1,3.188,0q-.573,0-.979-.008a1.447,1.447,0,0,1-.66-.145.806.806,0,0,1-.369-.465,3.094,3.094,0,0,1-.116-.975V-9.562H0v-2.125H1.063v-2.656a1.564,1.564,0,0,1,.125-.623,1.6,1.6,0,0,1,.34-.506,1.6,1.6,0,0,1,.506-.34,1.564,1.564,0,0,1,.623-.125H13.281a1.564,1.564,0,0,1,.623.125,1.6,1.6,0,0,1,.506.34,1.6,1.6,0,0,1,.34.506,1.564,1.564,0,0,1,.125.623v2.656ZM13.813-6.375H2.125V-4.25H3.188q0-.149,0-.336a1.284,1.284,0,0,1,.037-.349.558.558,0,0,1,.154-.27.481.481,0,0,1,.344-.108.481.481,0,0,1,.344.108.558.558,0,0,1,.154.27,1.284,1.284,0,0,1,.037.349q0,.187,0,.336h7.438q0-.149,0-.336a1.284,1.284,0,0,1,.037-.349.558.558,0,0,1,.154-.27.481.481,0,0,1,.344-.108.481.481,0,0,1,.344.108.558.558,0,0,1,.154.27,1.284,1.284,0,0,1,.037.349q0,.187,0,.336h1.063ZM7.438-7.437v-4.25H2.125v4.25Zm6.375-4.25H8.5v4.25h5.313ZM2.656-14.875a.511.511,0,0,0-.374.158.511.511,0,0,0-.158.374v1.594H13.813v-1.594a.511.511,0,0,0-.158-.374.511.511,0,0,0-.374-.158ZM13.813-2.125V-3.187H2.125v1.063Z" class="cls-2-130" data-name="Path 99" id="Path_99"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="classcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='classcharm'}" @click="setCharm('classcharm')" title="课程图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID42">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="class">
                                                                <path transform="translate(0 0)" d="M13.132-8.16a5.14,5.14,0,0,1,.51,1.249,5.251,5.251,0,0,1,.17,1.332v.855L8.5-2.059,3.188-4.723q0-.5.012-.93A6.959,6.959,0,0,1,3.275-6.5a4.714,4.714,0,0,1,.2-.813,4.884,4.884,0,0,1,.394-.851L2.125-9.031v4.873a1.533,1.533,0,0,1,.436.232,1.607,1.607,0,0,1,.336.349,1.564,1.564,0,0,1,.216.436,1.6,1.6,0,0,1,.075.486V0H0V-2.656a1.6,1.6,0,0,1,.075-.486,1.564,1.564,0,0,1,.216-.436,1.607,1.607,0,0,1,.336-.349,1.533,1.533,0,0,1,.436-.232v-5.4L0-10.094l8.5-4.25,8.5,4.25ZM2.125-2.656a.511.511,0,0,0-.158-.374.511.511,0,0,0-.374-.158.511.511,0,0,0-.374.158.511.511,0,0,0-.158.374v1.594H2.125Zm.249-7.437L8.5-7.031l6.126-3.063L8.5-13.157ZM12.75-5.379a5.408,5.408,0,0,0-.125-1.191,4.177,4.177,0,0,0-.44-1.116L8.5-5.844,4.814-7.687A4.353,4.353,0,0,0,4.4-6.67,4.15,4.15,0,0,0,4.25-5.578v.2L8.5-3.254Z" class="cls-2-131" data-name="Path 98" id="Path_98"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="gymcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='gymcharm'}" @click="setCharm('gymcharm')" title="健身房图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID46">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="gym">
                                                                <path transform="translate(0 0)" d="M15.63-11.687l1.063,1.063L14.344-8.284l-2.656-2.648-5.62,5.62L8.716-2.656,6.375-.307,5.313-1.37,3.984-.05,2.391-1.635a2.055,2.055,0,0,0-.17.174,2.332,2.332,0,0,1-.183.187,1.1,1.1,0,0,1-.208.149.48.48,0,0,1-.237.062A.511.511,0,0,1,1.22-1.22a.511.511,0,0,1-.158-.374.48.48,0,0,1,.062-.237,1.1,1.1,0,0,1,.149-.208,2.332,2.332,0,0,1,.187-.183,2.055,2.055,0,0,0,.174-.17L.05-3.984,1.37-5.312.307-6.375,2.656-8.716,5.313-6.068l5.62-5.62L8.284-14.344l2.341-2.349,1.063,1.063,1.328-1.32,1.594,1.585a2.055,2.055,0,0,0,.17-.174,2.332,2.332,0,0,1,.183-.187,1.1,1.1,0,0,1,.208-.149.48.48,0,0,1,.237-.062.511.511,0,0,1,.374.158.511.511,0,0,1,.158.374.48.48,0,0,1-.062.237,1.1,1.1,0,0,1-.149.208,2.332,2.332,0,0,1-.187.183,2.055,2.055,0,0,0-.174.17l1.585,1.594ZM4.557-2.125,2.125-4.557l-.573.573L3.984-1.552Zm2.665-.531L2.656-7.222l-.838.847L6.375-1.818Zm5.221-12.219,2.432,2.432.573-.573-2.432-2.432Zm2.739,4.25-4.557-4.557-.847.838,4.565,4.565Z" class="cls-2-132" data-name="Path 110" id="Path_110"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="islandcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='islandcharm'}" @click="setCharm('islandcharm')" title="小岛图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID47">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="island">
                                                                <path transform="translate(0 0)" d="M14.344-3.187a.511.511,0,0,1,.374.158.511.511,0,0,1,.158.374.511.511,0,0,1-.158.374.511.511,0,0,1-.374.158H7.969A.511.511,0,0,1,7.6-2.283a.511.511,0,0,1-.158-.374A.511.511,0,0,1,7.6-3.03a.511.511,0,0,1,.374-.158ZM13.281-1.062a.511.511,0,0,1,.374.158.511.511,0,0,1,.158.374.511.511,0,0,1-.158.374A.511.511,0,0,1,13.281,0H9.031a.511.511,0,0,1-.374-.158A.511.511,0,0,1,8.5-.531.511.511,0,0,1,8.658-.9a.511.511,0,0,1,.374-.158Zm1.976-4.25H17V-4.25H4.458q-.083.531-.12,1.063T4.279-2.129q-.021.527-.021,1.058T4.25,0H1.063V-1.6q0-.672.05-1.328t.141-1.32H0V-5.312H1.428a18.733,18.733,0,0,1,1.253-3.91,18.854,18.854,0,0,1,2.075-3.544,5.7,5.7,0,0,1-2.225-.51A6.285,6.285,0,0,1,.681-14.6l-.374-.382.39-.365A6.183,6.183,0,0,1,2.59-16.573a5.819,5.819,0,0,1,2.216-.419,5.719,5.719,0,0,1,2.374.486,6.672,6.672,0,0,1,1.984,1.39,4.623,4.623,0,0,1,1.237.2,4.806,4.806,0,0,1,1.112.5,4.883,4.883,0,0,1,.938.747,4.781,4.781,0,0,1,.726.955,4.774,4.774,0,0,1,.469,1.121,4.631,4.631,0,0,1,.166,1.245v.531h-.531a4.613,4.613,0,0,1-2.054-.469A4.854,4.854,0,0,1,9.579-11.6,6.011,6.011,0,0,1,7.994-9.72,5.726,5.726,0,0,1,5.761-8.683q-.357.822-.635,1.66a16.944,16.944,0,0,0-.469,1.71h2.4a4.223,4.223,0,0,1,.573-1.282A4.27,4.27,0,0,1,8.562-7.6a4.3,4.3,0,0,1,1.208-.66A4.1,4.1,0,0,1,11.156-8.5a4.1,4.1,0,0,1,1.386.237,4.3,4.3,0,0,1,1.208.66,4.27,4.27,0,0,1,.934,1.009A4.223,4.223,0,0,1,15.257-5.312Zm-4.98-8.533a5.64,5.64,0,0,1-.216,1.1,3.744,3.744,0,0,0,1.116,1.212,3.652,3.652,0,0,0,1.531.614,3.739,3.739,0,0,0-.291-.959,3.693,3.693,0,0,0-.527-.834,3.784,3.784,0,0,0-.726-.668A3.756,3.756,0,0,0,10.276-13.846Zm-1.046.058a4.567,4.567,0,0,0-1.6.419,4.976,4.976,0,0,0-1.336.913,4.97,4.97,0,0,0-.971,1.3,4.8,4.8,0,0,0-.5,1.569,4.75,4.75,0,0,0,1.336-.3,4.7,4.7,0,0,0,1.154-.643,4.873,4.873,0,0,0,.93-.934,5.16,5.16,0,0,0,.672-1.191,4.576,4.576,0,0,0,.2-.556A4.481,4.481,0,0,0,9.23-13.788ZM1.859-14.95a4.913,4.913,0,0,0,1.469.838A4.879,4.879,0,0,0,5-13.821a4.914,4.914,0,0,0,1.556-.249,4.815,4.815,0,0,0,1.39-.73,4.913,4.913,0,0,0-1.469-.838,4.879,4.879,0,0,0-1.668-.291,4.914,4.914,0,0,0-1.556.249A4.815,4.815,0,0,0,1.859-14.95ZM4.5-8.517a.546.546,0,0,1-.133.017H4.233q-.133,0-.266,0T3.7-8.517v-.39a18.4,18.4,0,0,0-.743,1.926,16.66,16.66,0,0,0-.49,1.909A17.57,17.57,0,0,0,2.2-3.117q-.079.992-.079,2.054H3.188q0-1,.071-1.942t.224-1.851a18.258,18.258,0,0,1,.4-1.818A18.92,18.92,0,0,1,4.5-8.517Zm3.669,3.2h5.977a3.157,3.157,0,0,0-.465-.867,3.129,3.129,0,0,0-.693-.672,3.252,3.252,0,0,0-.859-.432,3.076,3.076,0,0,0-.971-.154,3.076,3.076,0,0,0-.971.154,3.252,3.252,0,0,0-.859.432,3.129,3.129,0,0,0-.693.672A3.157,3.157,0,0,0,8.168-5.312Z" class="cls-2-133" data-name="Path 92" id="Path_92"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="professionalcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='professionalcharm'}" @click="setCharm('professionalcharm')" title="职业图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID50">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="professional">
                                                                <path transform="translate(0 0)" d="M10.625-16.693l5.313,5.313V0H14.875V-10.932L11.688-14.12v3.495H12.75V0H9.563V-3.187H8.5V0H5.313V-10.625H8.5v-1.062H2.125V0H1.063V-12.75h8.5v2.125h1.063Zm1.063,15.63v-8.5H6.375v8.5H7.438V-4.25h3.188v3.188Zm-8.5-8.5v-1.062H4.25v1.063Zm0,2.125V-8.5H4.25v1.063Zm0,2.125V-6.375H4.25v1.063Zm0,2.125V-4.25H4.25v1.063Zm0,2.125V-2.125H4.25v1.063ZM10.625-8.5v1.063H9.563V-8.5Zm0,2.125v1.063H9.563V-6.375ZM8.5-8.5v1.063H7.438V-8.5Zm0,2.125v1.063H7.438V-6.375Z" class="cls-2-134" data-name="Path 100" id="Path_100"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="repaircharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='repaircharm'}" @click="setCharm('repaircharm')" title="修复图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID51">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="repair">
                                                                <path transform="translate(0 0)" d="M16.021-15.174q.216.374.394.714a6.353,6.353,0,0,1,.311.689,4.2,4.2,0,0,1,.2.726,4.505,4.505,0,0,1,.071.826,4.69,4.69,0,0,1-.17,1.266,4.8,4.8,0,0,1-.481,1.141,4.8,4.8,0,0,1-.751.971,4.8,4.8,0,0,1-.971.751,4.8,4.8,0,0,1-1.141.481,4.69,4.69,0,0,1-1.266.17q-.191,0-.386-.017t-.386-.05L4.756-.813a2.727,2.727,0,0,1-.909.606A2.806,2.806,0,0,1,2.781,0,2.679,2.679,0,0,1,1.7-.22a2.834,2.834,0,0,1-.884-.6A2.834,2.834,0,0,1,.22-1.7,2.679,2.679,0,0,1,0-2.781,2.806,2.806,0,0,1,.208-3.847a2.727,2.727,0,0,1,.606-.909l6.69-6.69q-.033-.191-.05-.386t-.017-.386a4.69,4.69,0,0,1,.17-1.266,4.8,4.8,0,0,1,.481-1.141A4.8,4.8,0,0,1,8.84-15.6a4.8,4.8,0,0,1,.971-.751,4.8,4.8,0,0,1,1.141-.481A4.69,4.69,0,0,1,12.219-17a4.505,4.505,0,0,1,.826.071,4.2,4.2,0,0,1,.726.2,6.353,6.353,0,0,1,.689.311q.34.178.714.394L11.9-12.75l.847.847ZM12.219-8.5a3.587,3.587,0,0,0,1.448-.295,3.788,3.788,0,0,0,1.179-.8,3.788,3.788,0,0,0,.8-1.179,3.587,3.587,0,0,0,.295-1.448,3.491,3.491,0,0,0-.2-1.17l-2.988,2.98L10.409-12.75l2.98-2.988a3.491,3.491,0,0,0-1.17-.2,3.587,3.587,0,0,0-1.448.295,3.788,3.788,0,0,0-1.179.8,3.788,3.788,0,0,0-.8,1.179A3.587,3.587,0,0,0,8.5-12.219a3.15,3.15,0,0,0,.05.564q.05.274.116.548L1.569-4a1.726,1.726,0,0,0-.374.556,1.694,1.694,0,0,0-.133.664,1.65,1.65,0,0,0,.137.664,1.754,1.754,0,0,0,.369.548,1.754,1.754,0,0,0,.548.369,1.65,1.65,0,0,0,.664.137A1.694,1.694,0,0,0,3.445-1.2,1.726,1.726,0,0,0,4-1.569l7.105-7.1q.274.066.548.116A3.15,3.15,0,0,0,12.219-8.5Z" class="cls-2-135" data-name="Path 112" id="Path_112"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="sprintcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='sprintcharm'}" @click="setCharm('sprintcharm')" title="冲刺图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID53">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" data-name="fitness" id="fitness">
                                                                <path transform="translate(0 0)" d="M12.1-7c0.2,0,0.4-0.2,0.4-0.5S12.3-8,12-8h-0.3c0-0.2-0.1-0.3-0.1-0.5h0.1c0.3,0,0.5-0.2,0.5-0.5S12-9.5,11.7-9.5h-0.3 c0-0.2-0.1-0.3-0.1-0.5h0.1c0.3,0,0.5-0.2,0.5-0.5S11.6-11,11.4-11h-0.3c-0.1-0.8-0.3-1.3-0.8-1.5v-2c0-0.2-0.1-0.4-0.3-0.5 c-0.2,0-0.4,0-0.5,0.1l-2.1,2C6.6-13.2,6-13.8,6-14.8c0-0.2,0-1.1,0-1.1c0-0.1,0-0.4-0.1-0.5c0-0.1-0.1-0.2-0.2-0.3 c-0.1-0.1-0.2-0.2-0.3-0.2C5.3-17,5.1-17,5-17c-0.3,0-0.6,0.1-0.8,0.4l-3.8,3.7l0,0c-0.1,0.1-0.2,0.3-0.3,0.5S0-12,0-11.8 s0,0.4,0.1,0.6s0.2,0.4,0.3,0.5l1.8,1.8l3.3,3.3l2.3,2.3c0.4,0.4,0.7,0.7,1.1,0.9s0.8,0.5,1.3,0.7s1,0.4,1.5,0.5s1,0.2,1.5,0.2H15 c0.1,0,0.3,0,0.4-0.1c0.1-0.1,0.2-0.1,0.3-0.2c0.1-0.1,0.2-0.2,0.2-0.3C16-1.7,16-1.9,16-2v-0.5C16-4.4,13.1-4.8,12.1-7z M9.3-13.4 v0.6H8.7L9.3-13.4z M4.9-15.9C4.9-16,5-16,5-16L4.9-15.9C5-15.9,5-15.1,5-14.8c0,2,1.7,3.2,4.5,3.2c0.2,0,0.3,0,0.4,0 c0,0,0,0,0.1,0c0,0.1,0,0.3,0.1,0.6H9.2c-0.3,0-0.5,0.2-0.5,0.5S8.9-10,9.2-10h1.1l0,0c0,0.2,0.1,0.3,0.1,0.5H9.5 C9.2-9.5,9-9.3,9-9s0.2,0.5,0.5,0.5h1.1c0,0.2,0.1,0.4,0.1,0.5H9.8C9.5-8,9.3-7.8,9.3-7.5S9.5-7,9.8-7H11c0.5,1.5,1.7,2.3,2.7,3 c0.7,0.5,1.1,0.8,1.3,1.2c-2-0.1-3-0.7-3.7-1.3c-0.3-0.3-5.5-5.4-9.2-9L4.9-15.9z M10.7-2.5c-0.4-0.2-0.8-0.4-1.1-0.6 c-0.3-0.2-0.7-0.5-1-0.8L6.3-6.2L3-9.6l-1.9-1.9L1-11.6c0-0.1,0-0.1,0-0.2C1-11.9,1-12,1-12c0-0.1,0.1-0.1,0.1-0.2l0.1-0.1l0.1-0.1 c1.7,1.7,8.8,8.7,9.2,9.1c0.5,0.5,1.4,1,2.7,1.3c-0.4,0-0.9,0-1.3-0.1C11.6-2.2,11.2-2.4,10.7-2.5z" class="cls-2-136"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="todocharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='todocharm'}" @click="setCharm('todocharm')" title="待办事项图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID55">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="task">
                                                                <path transform="translate(0 0)" d="M13.1-13.7l1.6,1.6l-8,7.8L5.4-5.5l-1-1l-2-2l1.6-1.6l2,2l0.7,0.6l0.7-0.6L13.1-13.7 M13.1-15L6.6-8.7 l-2.7-2.6L1-8.5l2.7,2.6l1,1L6.6-3l9.4-9.1L13.1-15L13.1-15z" class="cls-2-137" id="Path_136"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="examcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='examcharm'}" @click="setCharm('examcharm')" title="考试图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID57">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" data-name="exam" id="exam">
                                                                <path transform="translate(0 0)" d="M1-1V-3H0V-4H1V-6H0V-7H1V-9H0v-1H1v-2H0v-1H1v-2H0v-1H1v-1H13v2.436a2.574,2.574,0,0,0-.371.3l-.629.63V-16H2V-2H12V-6.378l1-1V-1ZM7.734-7.945l5.6-5.61a1.491,1.491,0,0,1,.508-.332A1.638,1.638,0,0,1,14.438-14a1.6,1.6,0,0,1,.613.119,1.489,1.489,0,0,1,.5.328,1.548,1.548,0,0,1,.332.492,1.511,1.511,0,0,1,.122.608,1.58,1.58,0,0,1-.117.594,1.494,1.494,0,0,1-.337.509l-5.6,5.617L7-5Zm6.494-5.02a.463.463,0,0,0-.18.113L8.641-7.43,8.375-6.375,9.43-6.641l5.405-5.414a.542.542,0,0,0,.165-.4.524.524,0,0,0-.16-.4.563.563,0,0,0-.4-.151A.658.658,0,0,0,14.227-12.965ZM4-5V-6H6.012v1ZM4-9v-1H8L6.938-9Zm0-4v-1h6v1Z" class="cls-2-138" data-name="Union 1" id="Union_1"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" id="goalcharm" class="ms-Button ms-Button--icon oTdms pFfKB root-262" :class="{'active':formState.Charm=='goalcharm'}" @click="setCharm('goalcharm')" title="目标图标">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <div class="p3HCi Jm_UR" id="CharmControlID58">
                                                        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
                                                            <g transform="translate(0 17)" id="goal">
                                                                <path transform="translate(0 0)" d="M8.5-11.687a3.1,3.1,0,0,0-1.241.249,3.226,3.226,0,0,0-1.013.685,3.213,3.213,0,0,0-.685,1.017A3.106,3.106,0,0,0,5.313-8.5a3.1,3.1,0,0,0,.249,1.241,3.226,3.226,0,0,0,.685,1.013,3.226,3.226,0,0,0,1.013.685A3.1,3.1,0,0,0,8.5-5.312a3.106,3.106,0,0,0,1.237-.249,3.213,3.213,0,0,0,1.017-.685,3.226,3.226,0,0,0,.685-1.013A3.1,3.1,0,0,0,11.688-8.5,3.251,3.251,0,0,0,11.5-9.562h1.112a4.48,4.48,0,0,1,.1.531,4.279,4.279,0,0,1,.033.531,4.092,4.092,0,0,1-.336,1.652A4.336,4.336,0,0,1,11.5-5.5a4.336,4.336,0,0,1-1.349.913A4.092,4.092,0,0,1,8.5-4.25a4.092,4.092,0,0,1-1.652-.336A4.336,4.336,0,0,1,5.5-5.5,4.277,4.277,0,0,1,4.59-6.848,4.136,4.136,0,0,1,4.258-8.5a4.136,4.136,0,0,1,.332-1.652A4.277,4.277,0,0,1,5.5-11.5a4.336,4.336,0,0,1,1.349-.913A4.092,4.092,0,0,1,8.5-12.75a4.279,4.279,0,0,1,.531.033,4.48,4.48,0,0,1,.531.1V-11.5A3.251,3.251,0,0,0,8.5-11.687ZM15.688-10.4a7.378,7.378,0,0,1,.249,1.9,7.29,7.29,0,0,1-.266,1.971,7.438,7.438,0,0,1-.751,1.776,7.494,7.494,0,0,1-1.166,1.507,7.494,7.494,0,0,1-1.507,1.166,7.438,7.438,0,0,1-1.776.751A7.29,7.29,0,0,1,8.5-1.062a7.29,7.29,0,0,1-1.971-.266,7.438,7.438,0,0,1-1.776-.751A7.494,7.494,0,0,1,3.246-3.246,7.494,7.494,0,0,1,2.079-4.752a7.456,7.456,0,0,1-.751-1.772A7.276,7.276,0,0,1,1.063-8.5a7.29,7.29,0,0,1,.266-1.971,7.438,7.438,0,0,1,.751-1.776,7.494,7.494,0,0,1,1.166-1.507,7.494,7.494,0,0,1,1.507-1.166,7.456,7.456,0,0,1,1.772-.751A7.276,7.276,0,0,1,8.5-15.937a7.378,7.378,0,0,1,1.9.249l-.838.838v.066q-.266-.042-.531-.066T8.5-14.875a6.238,6.238,0,0,0-1.693.228A6.461,6.461,0,0,0,5.283-14a6.354,6.354,0,0,0-1.291,1,6.354,6.354,0,0,0-1,1.291,6.461,6.461,0,0,0-.643,1.523A6.238,6.238,0,0,0,2.125-8.5a6.238,6.238,0,0,0,.228,1.693A6.461,6.461,0,0,0,3-5.283a6.354,6.354,0,0,0,1,1.291A6.354,6.354,0,0,0,5.283-3a6.461,6.461,0,0,0,1.523.643A6.238,6.238,0,0,0,8.5-2.125a6.238,6.238,0,0,0,1.693-.228A6.461,6.461,0,0,0,11.717-3a6.354,6.354,0,0,0,1.291-1,6.354,6.354,0,0,0,1-1.291,6.461,6.461,0,0,0,.643-1.523A6.238,6.238,0,0,0,14.875-8.5q0-.266-.025-.531t-.066-.531h.066Zm-5.063-.979v-2.382l3.188-3.187v3.138H16.95l-3.187,3.188H11.38L9.529-8.774a1.062,1.062,0,0,1,.033.274,1.03,1.03,0,0,1-.083.415,1.08,1.08,0,0,1-.228.336,1.08,1.08,0,0,1-.336.228,1.03,1.03,0,0,1-.415.083,1.03,1.03,0,0,1-.415-.083,1.08,1.08,0,0,1-.336-.228,1.08,1.08,0,0,1-.228-.336A1.03,1.03,0,0,1,7.438-8.5a1.03,1.03,0,0,1,.083-.415,1.08,1.08,0,0,1,.228-.336,1.08,1.08,0,0,1,.336-.228A1.03,1.03,0,0,1,8.5-9.562a1.062,1.062,0,0,1,.274.033Zm1.063-.307h1.635l1.063-1.062H12.75v-1.635l-1.062,1.063Z" class="cls-2-139" data-name="Path 128" id="Path_128"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="calendarSet836" class="bmh7j">添加到</div>
                                <div class="daZG7">
                                    <div class="ms-Dropdown-container">
                                        <!-- <div id="Dropdown1016" class="ms-Dropdown dropdown-392">
                                            <span id="Dropdown1016-option" class="ms-Dropdown-title title-415">
                                                <span>我的日历</span>
                                            </span>
                                            <span class="ms-Dropdown-caretDownWrapper caretDownWrapper-394"><DownOutlined /></span>
                                        </div> -->
                                        <a-select v-model:value="formState.CalendarSet" class="CalendarSetDrop">
                                            <a-select-option v-for="(item,index) in CalendarSetList" :key="index" :value="item.value">{{item.name}}</a-select-option>
                                        </a-select>
                                    </div>
                                </div>
                                <div id="calendarSet836" class="bmh7j">是否公开</div>
                                <div class="daZG7">
                                    <div class="ms-Dropdown-container">
                                        <a-input type="checkbox" v-model:checked="formState.IsPublic" @change="IsPublicChange" class="CalendarCheckbox"></a-input>
                                    </div>
                                </div>
                                <div class="mR37V">
                                    <div class="aF86E">
                                        <!-- <div class="ms-TooltipHost root-167">
                                            <button type="button" class="ms-Button ms-Button--primary is-disabled ctr_q bkMy8 root-411" disabled="">
                                                <span class="ms-Button-flexContainer flexContainer-159">
                                                    <span class="ms-Button-textContainer textContainer-160">
                                                        <span class="ms-Button-label label-162" id="id__1018">保存</span>
                                                    </span>
                                                </span>
                                            </button>
                                            <div hidden="" id="tooltip1017" style="position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0px; border: 0px; overflow: hidden; white-space: nowrap;"></div>
                                        </div>
                                        <div>
                                            <div class="wHp2_">
                                                <div class="ms-TooltipHost root-167">
                                                    <button type="button" class="ms-Button ms-Button--default is-disabled cDrEJ root-414" disabled="">
                                                        <span class="ms-Button-flexContainer flexContainer-159">
                                                            <span class="ms-Button-textContainer textContainer-160">
                                                                <span class="ms-Button-label label-162" id="id__1022">放弃</span>
                                                            </span>
                                                        </span>
                                                    </button>
                                                    <div hidden="" id="tooltip1021" style="position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0px; border: 0px; overflow: hidden; white-space: nowrap;"></div>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
                </div>
            </template>
        </a-modal>
        <!-- <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user> -->
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
        toRaw, h,nextTick
    } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import {DownOutlined} from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import Icon from '@/components/icon/index.vue';
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        id: String,
        CalendarTypeCode:String
    });
    const emit = defineEmits(["cancel","select-val"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        title: "创建空白日历",
        height: document.documentElement.clientHeight - 300,
        CalendarSetList:[
            {
                value: "8",
                name: "我的日历"
            },
            {
                value: "4003",
                name: "其他日历"
            },
        ],
        CurrentUserId:''
    });
    const {
        title,
        height,
        CalendarSetList,
        CurrentUserId
    } = toRefs(data);
    const formState = reactive({
        Name:'',
        CalendarSet:'8',
        Color:'rgb(51, 153, 255)',
        IsPublic:false,
        Charm:'nocharmcharm'
    });
    
    const uniqu=(array, name)=>{
        var arr = []
        for (var j = 0; j < array.length; j++) {
            if (JSON.stringify(arr).indexOf(array[j][name]) == -1) {
                arr.push(array[j])
            }
        }
        return arr
    }
    const setColor=(color)=>{
        formState.Color=color||'';
    }
    const setCharm=(charm)=>{
        formState.Charm=charm||'';
    }
    const IsPublicChange=(e)=>{
        formState.IsPublic=e.target.checked
    }
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 500;
        });
        if(props.id){
            data.title='编辑日历';
            getDetail();
        }
        if(props.CalendarTypeCode){
            formState.CalendarSet=props.CalendarTypeCode
        }

        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            let userId=userInfo.userId;
            data.CurrentUserId=userId;
        }
    });

    const getDetail = () => {
    let d = {
        actions:[{
            id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordId: props.id,
                  apiName:'Calendar',
                  objTypeCode: '4003'
                }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.detail,obj).then(res=>{
        if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
            let fields=res.actions[0].returnValue.fields;
            formState.Name=fields.Name&&fields.Name.value?fields.Name.value:(fields.name&&fields.name.value?fields.name.value:'');
            formState.Color=fields.Color&&fields.Color.value?fields.Color.value:'rgb(51, 153, 255)';
            formState.IsPublic=fields.IsPublic&&fields.IsPublic.value?fields.IsPublic.value:false;
            formState.CalendarSet=fields.CalendarTypeCode&&fields.CalendarTypeCode.value?fields.CalendarTypeCode.value:'8';
        }
    })
    
  }
  
    const handleSubmit = () => {
        if(formState.Name){
            let url = Interface.create;
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        // recordId: props.id,
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: 'Calendar',
                            objTypeCode: '4003',
                            fields: {
                                Name: formState.Name,
                                Color:formState.Color,
                                IsPublic:formState.IsPublic,
                                CalendarTypeCode:formState.CalendarSet,
                                PrimaryUserId:data.CurrentUserId
                            }
                        }
                    }
                }]
            };
            if(props.id){
                url = Interface.edit;
                d.actions[0].params.recordId = props.id;
            }

            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then((res) => {
                message.success("保存成功！");
                emit("cancel", '');
                emit("select-val", '');
            });
            
        }
        else{
            message.error("日历名称不能为空");
        }
    };
    defineExpose({handleSubmit})
</script>
<style lang="less" scoped>
    @import url("@/style/modal.less");

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
        top: 14px;
    }

    .timeWrap {
        display: flex;
        align-items: center;

        .timeItem:last-child {
            margin-left: 10px;
        }
    }

    .menuRow {
        display: flex;
        align-items: center;

        .ant-btn {
            border-radius: 4px 0 0 4px;
        }

        .ant-select-show-search:where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-customize-input) .ant-select-selector {
            border-radius: 0 4px 4px 0 !important;
            margin-left: -1px !important;
        }
    }

    .selectFlex {
        width: 100%;
        position: relative;

        .suffixIcon {
            position: absolute;
            right: 5px;
        }
    }

    .tabPanel {
        padding: 0 4px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);

        .barContainer {
            display: flex;

        }
    }

    .groupContainer {
        display: flex;
        align-items: center;

        .groupBtn {
            height: 32px;
            line-height: 32px;
            text-align: center;
            margin: 4px 0;
            border: 1px solid transparent;
            padding-left: 9px;
            border-radius: 4px;

            .icon {
                font-size: 16px;
                position: relative;
                top: 5px;
            }

            .arrowIcon {
                height: 12px;
                line-height: 12px;
                width: 12px;
                fill: #242424;
                color: #242424;
                margin-left: 4px;
                margin-right: 2px;
                font-size: 12px;
                position: relative;
                top: -1px;
            }
            
            &:hover {
                background: #fafafa;
                color: #242424;
                border: 1px solid #e5e5e5;
                cursor: pointer;
            }

            &.show {
                background: #fafafa;
                color: #242424;
                border: 1px solid #e5e5e5;
                cursor: pointer;
            }

            .text {
                line-height: 16.41px;
                text-align: left;
                margin-left: 4px;
                margin-right: 2px;
                font-weight: 400;
                font-size: 14px;
            }
        }

        .ribbon {
            display: inline-flex;
            height: 32px;
            align-items: center;
            padding: 4px;

            .ribbon-bottom-bar-divider {
                width: 1px;
                height: 100%;
                background-color: #e0e0e0;
                border-radius: 0px;
            }
        }
    }

    .menu-row {
        display: flex;

        .icon {
            min-width: 30px;
        }
    }

    .formContent {
        height: calc(~"100% - 60px");
        // height: auto;
        margin-top: 12px;
        display: flex;

        .leftForm {
            flex: 1;
            border: 1px solid #f0f0f0;
            background: #fff;
            border-radius: 4px;
            overflow: auto;
            margin-right: 10px;

            .formWrap {
                padding: 0 16px 19px 8px;

                input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: 0;
                }

                input.title {
                    font-size: 21px;
                    font-weight: 600;
                    color: #424242;
                }

                .formRow {
                    display: flex;
                    min-height: 48px;
                    align-items: center;

                    .lIcon {
                        width: 32px;
                        height: 32px;
                        margin-right: 9px;
                        text-align: center;
                        padding-top: 5px;
                        :deep .ant-btn{
                            height: 30px !important;
                        }
                    }

                    .rVal {
                        flex: 1;
                        height: 32px;
                        border-bottom: 1px solid #e0e0e0;
                        height: auto;
                    }
                    .rVal2{
                        border-bottom: none;
                    }
                    .rVal3{
                        margin-top: 15px
                    }
                    .timeBox {
                        .rowTime {
                            display: flex;
                            align-items: center;
                            margin-bottom: 10px;

                            .date {
                                width: 142px;
                            }

                            .time {
                                width: 98px;
                                margin-left: 5px;
                                margin-right: 10px;
                            }

                            .switch {
                                display: flex;
                                align-items: center;

                                .text {
                                    padding-left: 5px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .rightCalendar {
            width: 371px;
            min-height: 250px;
            height: 100%;
            border: 1px solid #f0f0f0;
            border-radius: 4px;
        }
    }
    :deep .ant-select-show-search:where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-customize-input) .ant-select-selector{
        border: none !important;
        outline: 0 !important;
    }
    .AddScheduleModalContainer{
        .ant-select-selection-item-content .ant-avatar{
            display: none !important;
        }
    }
    .ant-select-item-option-content .ant-avatar{
            margin-right: 8px !important;
        }
        :deep .ant-dropdown-menu-item{
            padding: 0 1px !important;
        }
        .menu-row{
            width: 100%;
            cursor: pointer;
            height: 32px;
            padding: 5px 12px;
            .icon{
                position: relative;
                top: 1px;
            }
        }
        .selectOptionActive{
            font-weight: bolder !important;
            background-color: #F0F0F0;
            box-sizing: border-box;
            border: 1px solid #A6A6A6;
            border-radius: 4px;
        }
        .DisplayStatusIcon{
            .icon-520 {
                display: inline-block;
                vertical-align: middle;
                flex-shrink: 0;
                width: 20px;
                height: 20px;
                font-size: 20px;
                line-height: 20px;
                margin: 0px;
                padding: 0px 10px 0px 0px;
                fill: rgb(15, 108, 189);
                color: rgb(15, 108, 189);
                position: relative;
                top: -4px;
            }
            .MtAE4, .f7wT9, .iJ4J5, .r3Aus {
                --fbBackgroundColor: transparent;
                --fbHighlightColor: #FFFFFF;
            }
            .f7wT9 {
    background-image: linear-gradient(0deg, transparent 25%, #FFFFFF 25%, #FFFFFF 50%, transparent 50%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(90deg, transparent 25%, #FFFFFF 25%, #FFFFFF 50%, transparent 50%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(45deg, #FFFFFF 38%, transparent 38%), linear-gradient(45deg, #FFFFFF 38%, transparent 38%);
    background-position: 0 0, 1px 0, 0 0, 2px 2px;
    background-size: 4px 4px;
    border-style: solid;
    border-width: 1px;
}
.MtAE4 {
    background-image: linear-gradient(-45deg, #FFFFFF 19%, transparent 19%, transparent 50%, #FFFFFF 50%, #FFFFFF 69%, transparent 69%, transparent);
    border-image-source: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
            .iJ4J5 {
                background: #FFFFFF;
                border-width: 1px;
            }
            .Zn9Tu, .iJ4J5 {
                border-style: solid;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
            }
            .f7wT9, .wvzTD {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.MtAE4, .r3Aus {
    background-size: 6px 6px;
}
.Zn9Tu {
    border-width: 1px;
}
.wvzTD {
    background-position-x: -1px;
    background-size: 6px 6px;
}
            .nvdEP {
                display: inline-block;
                height: 100%;
                margin-left: 10px;
                margin-right: 10px;
                margin-top: -4px;
                vertical-align: middle;
                width: 6px;
            }
            .icon-507 {
                display: inline-block;
                vertical-align: middle;
                flex-shrink: 0;
                width: 20px;
                height: 20px;
                font-size: 20px;
                line-height: 20px;
                margin: 0px;
                padding: 0px 10px 0px 0px;
                fill: #242424;
                position: relative;
                top: -4px;
            }

        }
        .barContainer .arrowIcon {
                font-size: 8px !important;
                position: relative;
                top: -1px;
            }


            .mcrpC {
    -webkit-box-flex: 1;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
}
.jJjU6 {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 0 23px 0 20px;
    width: 100%;
}
.UmKjU {
    max-width: 800px;
    width: 100%;
}
.PZGsT {
    margin-top: 16px;
    padding-bottom: 8px;
}
.ux0Sa {
    margin-top: 24px;
    max-width: 400px;
}
.body-166 {
    color: #424242;
    background: #fff;
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    font-weight: 400;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
}
.root-371 {
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 400;
    box-shadow: none;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    position: relative;
    color: #424242;
}
.wrapper-372 {
    display: flex;
    border-bottom: 1px solid;
    width: 100%;
    // border-top-color: rgb(0, 153, 188);
    // border-right-color: rgb(0, 153, 188);
    // border-left-color: rgb(0, 153, 188);
}
.field-374 {
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 400;
    box-shadow: none;
    margin: 0px;
    padding: 0px 8px;
    box-sizing: border-box;
    border-radius: 0px;
    border: none;
    background: none transparent;
    //color: rgb(0, 138, 169);
    width: 100%;
    min-width: 0px;
    text-overflow: ellipsis;
    outline: 0px;
    text-align: left;
}
.dqxE8 {
    font-size: 20px;
    font-weight: 600;
    height: 45px;
    line-height: 28px;
    padding-bottom: 20px;
    padding-left: 0;
}
.content-317 input {
    font-family: inherit;
}
.ApQFv {
    margin-top: 24px;
}
.UI8UX {
    margin: 24px 0 12px;
}
.wia7f {
    -webkit-box-align: center;
    display: -webkit-box;
    overflow: auto;
}
.focusedContainer-385 {
    clear: both;
    display: block;
    min-width: 180px;
}
.root-386 {
    padding: 2px;
    outline: none;
    margin: 8px 0px;
    border-collapse: collapse;
}
.tableCell-384 {
    padding: 4px;
}
.colorCell-389 {
    outline: transparent;
    position: relative;
    font-family: "Microsoft Yahei UI", Verdana, Simsun, "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    border: none;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    padding: 0px;
    text-decoration: none;
    text-align: center;
    height: 20px;
    color: #424242;
    background-color: #fff;
    width: 20px;
    vertical-align: top;
    user-select: none;
    
}
.colorCell-389.active{
    border: 2px solid #000;
    border-radius: 50%;
    padding: 1px;
}
.content-317 button {
    font-family: inherit;
}
.flexContainer-308 {
    display: flex;
    height: 100%;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}
.svg-388 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.main-363 {
    box-shadow: rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px, rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px;
    border-radius: 2px;
    background-color: transparent;
    box-sizing: border-box;
    position: relative;
    text-align: left;
    outline: transparent solid 3px;
    max-height: calc(100% - 32px);
    max-width: calc(100% - 32px);
    min-height: 176px;
    min-width: 288px;
    overflow-y: auto;
}
.mvbDn {
    margin-left: 12px;
    position: relative;
    :deep .el-color-picker{
        position: absolute;
        left: 0;
        top: -6px;
        opacity: 0;
    }
    .customcolor{
        font-weight: bold;
    }
}
.root-367 {
    font-family: "Microsoft Yahei UI", Verdana, Simsun, "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: inherit;
    font-weight: inherit;
    color: #0F6CBD;
    outline: none;
    text-decoration: none;
    background: none transparent;
    border-top: none;
    border-right: none;
    border-left: none;
    border-image: initial;
    cursor: pointer;
    display: inline;
    margin: 0px;
    overflow: inherit;
    padding: 0px;
    text-align: left;
    text-overflow: inherit;
    border-bottom: 1px solid transparent;
    user-select: text;
}
.content-317 button {
    font-family: inherit;
}
.DgEy6 {
    margin: 20px 0 12px;
    font-weight: 600;
}
.zJ2w3 {
    -webkit-box-orient: horizontal !important;
    -webkit-box-direction: normal !important;
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -ms-flex-direction: row !important;
    flex-direction: row !important;
    -ms-flex-wrap: wrap !important;
    flex-wrap: wrap !important;
    max-width: 780px !important;
}
.bmh7j {
    font-weight: 600;
    margin: 29px 0 0;
}
.daZG7 {
    margin-top: 17px;
    max-width: 400px;
}
.dropdown-392 {
    box-shadow: none;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: "Microsoft Yahei UI", Verdana, Simsun, "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    color: #424242;
    border-color: #808080;
    position: relative;
    outline: 0px;
    background-color: #fff;
    user-select: none;
}
.title-415 {
    box-shadow: none;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    padding-top: 0px;
    padding-right: 28px;
    padding-bottom: 0px;
    padding-left: 8px;
    box-sizing: border-box;
    background-color: inherit;
    cursor: pointer;
    display: block;
    height: 32px;
    line-height: 30px;
    position: relative;
    text-overflow: ellipsis;
    border-width: 1px;
    border-style: solid;
    border-color: #808080;
    border-radius: 2px;
    overflow: hidden;
    white-space: nowrap;
}
.caretDownWrapper-394 {
    height: 32px;
    line-height: 30px;
    padding-top: 1px;
    position: absolute;
    right: 8px;
    top: 0px;
    cursor: pointer;
}
.caretDown-410 {
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: normal;
    font-family: controlIcons;
    color: var(--neutralSecondary);
    font-size: 12px;
    pointer-events: none;
}
.mR37V {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 24px 0;
    width: 100%;
}
.aF86E {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
}
.root-167 {
    display: inline;
}
.root-411 {
    position: relative;
    font-family: "Microsoft Yahei UI", Verdana, Simsun, "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    box-sizing: border-box;
    cursor: default;
    display: inline-block;
    padding-top: 0px;
    padding-right: 16px;
    padding-bottom: 0px;
    padding-left: 16px;
    text-align: center;
    min-width: 80px;
    height: 32px;
    user-select: none;
    background-color: #F5F5F5 !important;
    color: #D1D1D1 !important;
    outline: transparent;
    border-radius: 2px;
    text-decoration: none;
    border-color: #F5F5F5 !important;
}
.content-317 button {
    font-family: inherit;
}
.flexContainer-159 {
    display: flex;
    height: 100%;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
.textContainer-160 {
    flex-grow: 1;
    display: block;
}
.label-162 {
    margin: 0px 4px;
    line-height: 100%;
    display: block;
    font-weight: 600;
}
.RDJT_, .wHp2_ {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.root-167 {
    display: inline;
}
.cDrEJ {
    border-color: #D1D1D1;
    border-style: solid;
    border-width: 1px;
}
.content-317 button {
    font-family: inherit;
}
.flexContainer-159 {
    display: flex;
    height: 100%;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
.textContainer-160 {
    flex-grow: 1;
    display: block;
}
.label-162 {
    margin: 0px 4px;
    line-height: 100%;
    display: block;
    font-weight: 600;
}
.j6UPJ {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 2px;
    width: 450px
}

.p3HCi {
    height: 17px;
    width: 17px
}

.Sv6mO {
    margin-top: 4px
}

.oTdms {
    border-radius: 2px;
    height: 32px;
    margin: 2px;
    width: 32px;
    cursor: pointer;
}

.oTdms,.oTdms:active {
    color: #424242
}
.oTdms.active{
    background-color: #CFE4FA;
    border: 1px solid #616161;
}
.oTdms:hover {
    background-color: #CFE4FA;
    color: #115EA3;
}
.root-414 {
    position: relative;
    font-family: "Microsoft Yahei UI", Verdana, Simsun, "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    box-sizing: border-box;
    cursor: default;
    display: inline-block;
    padding-top: 0px;
    padding-right: 16px;
    padding-bottom: 0px;
    padding-left: 16px;
    text-align: center;
    min-width: 80px;
    height: 32px;
    user-select: none;
    background-color: #F5F5F5 !important;
    color: #D1D1D1 !important;
    outline: transparent;
    border-radius: 2px;
    text-decoration: none;
    border-color: #F5F5F5 !important;
}
.cDrEJ {
    border-color: #D1D1D1;
    border-style: solid;
    border-width: 1px;
}
.content-317 button {
    font-family: inherit;
}
.ctr_q {
    margin-right: 15px;
}
.CalendarSetDrop{
    width: 100%;
    :deep .ant-select-selector{
        border: 1px solid #808080 !important;
        border-radius: 4px !important;
    }
    :deep ant-select-arrow{
        color: #808080 !important;
    }
}
.CalendarCheckbox{
    width: 16px;
    margin-left: 3px;
    height: 16px;
    cursor: pointer;
}
</style>