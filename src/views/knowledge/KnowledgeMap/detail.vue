<template>
  <div class="KnowledgeMapDetail">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-bd">
        <section id="conceptual-content" class="padding-block-lg">
          <div class="uhf-container anchor-headings">
            <div class="columns has-large-gaps is-gapless-mobile" v-cloak>
              <div id="left-containers"
                class="left-container is-hidden-mobile column is-one-third-tablet is-one-quarter-desktop">
                <nav id="affixed-left-containers"
                  class="margin-top-sm-tablet position-sticky display-flex flex-direction-column" role="navigation"
                  aria-label="主要" data-bi-name="left toc" style="top: 24px; max-height: calc(100vh - 48px);">
                  <div class="margin-bottom-xxs">
                    <div class="autocomplete display-block" data-bi-name="autocomplete">
                      <div class="field-body control has-icons-left">
                        <a-input autocapitalize="off" autocomplete="off" id="ax-0" class="autocomplete-input input input-sm
                            control has-icons-left width-full" type="text" placeholder="按主题筛选" v-model="filterText"
                          @change="onSearch"></a-input>
                        <span aria-hidden="true" class="icon is-small is-left">
                          <span class="has-text-primary docon docon-filter-settings iconfont"></span>
                        </span>
                        <span aria-hidden="true" class="autocomplete-loader loader has-text-primary " hidden=""></span>
                      </div>
                    </div>
                  </div>
                  <div id="LeftTree" class="tree table-of-contents is-vertically-scrollable flex-grow-1 flex-shrink-1"
                    role="tree" aria-label="目录" data-bi-name="tree" data-is-collapsible="true">
                    <el-tree :data="treeData" node-key="id" :default-expand-all="false"
                      :default-expanded-keys="treeExpandData" @node-click="handleNodeClick" :highlight-current="true"
                      :current-node-key="id" :filter-node-method="filterNode" ref="tree" :props="propsTree">
                    </el-tree>
                  </div>
                </nav>
              </div>
              <section class="primary-holder column is-two-thirds-tablet is-three-quarters-desktop">
                <div class="columns is-gapless-mobile has-large-gaps ">
                  <div id="main-column" class="column  is-full is-8-desktop">

                    <main id="main" class="" role="main" data-bi-name="content" lang="zh-cn" dir="ltr">
                      <!-- article-header -->
                      <div id="article-header"
                        class="background-color-body margin-top-sm-tablet margin-bottom-xs display-none-print">
                        <div class="display-flex align-items-center ">
                          <details id="article-header-breadcrumbs-overflow-popover" class="popover"
                            data-for="article-header-breadcrumbs" hidden="">
                            <summary class="button button-clear button-primary button-sm inner-focus" aria-label="所有痕迹">
                              <span class="icon">
                                <span class="docon docon-more"></span>
                              </span>
                            </summary>
                            <div id="article-header-breadcrumbs-overflow" class="popover-content padding-none"><!---->
                              <nav>
                                <ol class="list-style-none">
                                  <!---->
                                  <li class="line-clamp-1">
                                    <a class="display-block has-inner-focus padding-inline-xs padding-block-xxs border-radius font-size-sm"
                                      href="https://learn.microsoft.com/zh-cn/">
                                      Learn
                                    </a>
                                  </li>
                                  <!----><!---->
                                  <li class="line-clamp-1">
                                    <a class="display-block has-inner-focus padding-inline-xs padding-block-xxs border-radius font-size-sm"
                                      href="https://learn.microsoft.com/zh-cn/java/">
                                      Java
                                    </a>
                                  </li>
                                  <!----><!---->
                                  <li class="line-clamp-1">
                                    <a class="display-block has-inner-focus padding-inline-xs padding-block-xxs border-radius font-size-sm"
                                      href="https://learn.microsoft.com/zh-cn/java/openjdk/">
                                      OpenJDK
                                    </a>
                                  </li>
                                  <!---->
                                </ol>
                              </nav>

                              <!---->
                            </div>
                          </details>

                          <div id="article-header-breadcrumbs" data-test-id="article-header-breadcrumbs"
                            class="overflow-hidden flex-grow-1 margin-right-sm margin-right-md-tablet margin-right-lg-desktop margin-left-negative-xxs padding-left-xxs"
                            style="display: block; white-space: nowrap; overflow: hidden;"><!---->
                            <nav>
                              <ol class="breadcrumbs">
                                <!---->
                                <li class="breadcrumbs-item" data-bread-crumbs-collapse-target="">
                                  <a href="/#/lightning/o/KbMap/home"><!---->主页<!----></a>
                                </li>
                                <!----><!---->
                                <li class="breadcrumbs-item" data-bread-crumbs-collapse-target="">
                                  <a
                                    :href="'/#/lightning/page/KnowledgeMap?id=' + data.pid"><!---->{{ ParentSubjectName || '' }}<!----></a>
                                </li>
                                <!----><!---->
                                <li class="breadcrumbs-item" data-bread-crumbs-collapse-target="" style="">
                                  <a :href="'/#/lightning/page/KnowledgeMapDetail?id=' + data.id + '&SubjectId=' + data.pid"
                                    style=""><!---->{{ SubjectName || '' }}<!----></a>
                                </li>
                                <!---->
                              </ol>
                            </nav>
                            <!---->
                          </div>
                          <div id="article-header-page-actions"
                            class="margin-left-auto display-flex flex-wrap-no-wrap align-items-stretch"><a
                              id="lang-link-tablet"
                              class="button button-primary button-clear button-sm display-none display-inline-flex-tablet"
                              title="使用英语阅读" data-bi-name="language-toggle" data-read-in-link=""
                              href="https://learn.microsoft.com/en-us/java/openjdk/overview"
                              data-bi="{&quot;cN&quot;:&quot;language-toggle&quot;,&quot;value&quot;:&quot;off&quot;}">
                              <span class="icon margin-none" aria-hidden="true" data-read-in-link-icon="">
                                <span class="docon docon-locale-globe"></span>
                              </span>
                              <span class="is-visually-hidden" data-read-in-link-text="">使用英语阅读</span>
                            </a>
                            <details class="popover popover-right add-item-popover">
                              <summary
                                class="button button-clear button-sm button-primary display-none display-inline-flex-tablet"
                                data-list-type="collection"
                                data-list-item-title="关于 OpenJDK 的 Microsoft Build | Microsoft Learn"
                                data-list-item-url="/java/openjdk/overview" data-list-source="module"
                                data-resource-type="" data-bi-name="add-to-list" aria-describedby="popover-content"
                                aria-expanded="false">

                                <span class="icon margin-none" aria-hidden="true">
                                  <span class="docon docon-circle-addition"></span>
                                </span>
                                <span class="collection-status is-visually-hidden">保存</span>

                              </summary>
                              <div class="popover-content has-z-index-one">
                                <ul class="list-style-none margin-inline-none">
                                  <li>
                                    <button class="button button-clear button-sm button-primary"
                                      data-list-type="collection"
                                      data-list-item-title="关于 OpenJDK 的 Microsoft Build | Microsoft Learn"
                                      data-list-item-url="/java/openjdk/overview" data-bi-name="add-to-collections"
                                      data-pressed="false"
                                      title="将 关于 OpenJDK 的 Microsoft Build | Microsoft Learn 添加到集合">
                                      <span class="icon" aria-hidden="true">
                                        <span class="docon docon-circle-addition"></span>
                                      </span>
                                      <span class="collection-status">添加到集合</span>
                                    </button>
                                  </li>
                                  <li>
                                    <button class="button button-clear button-sm button-primary" data-list-type="plan"
                                      data-list-item-title="关于 OpenJDK 的 Microsoft Build | Microsoft Learn"
                                      data-list-item-url="/java/openjdk/overview" data-bi-name="add-to-plans"
                                      data-pressed="false"
                                      title="将 关于 OpenJDK 的 Microsoft Build | Microsoft Learn 添加到计划">
                                      <span class="icon" aria-hidden="true">
                                        <span class="docon docon-circle-addition"></span>
                                      </span>
                                      <span class="plan-status">添加到计划</span>
                                    </button>
                                  </li>

                                </ul>
                              </div>
                            </details>
                            <details class="popover popover-right" id="article-header-page-actions-overflow">
                              <summary class="justify-content-flex-start button button-clear button-sm button-primary"
                                aria-label="更多操作" title="更多操作">
                                <span class="icon" aria-hidden="true">
                                  <span class="docon docon-more-vertical"></span>
                                </span>
                              </summary>
                              <div class="popover-content padding-xs"><button data-page-action-item="overflow-mobile"
                                  type="button"
                                  class="justify-content-flex-start button-block button-sm has-inner-focus button button-clear display-none-tablet"
                                  data-bi-name="contents-expand" data-contents-button="" data-popover-close="">
                                  <span class="icon">
                                    <span class="docon docon-editor-list-bullet" aria-hidden="true"></span>
                                  </span><span class="contents-expand-title">目录</span></button><a
                                  id="lang-link-overflow"
                                  class="justify-content-flex-start button-sm has-inner-focus button button-clear button-block display-none-tablet"
                                  title="使用英语阅读" data-bi-name="language-toggle" data-page-action-item="overflow-mobile"
                                  data-check-hidden="true" data-read-in-link=""
                                  href="https://learn.microsoft.com/en-us/java/openjdk/overview"
                                  data-bi="{&quot;cN&quot;:&quot;language-toggle&quot;,&quot;value&quot;:&quot;off&quot;}">
                                  <span class="icon" aria-hidden="true" data-read-in-link-icon="">
                                    <span class="docon docon-locale-globe"></span>
                                  </span>
                                  <span data-read-in-link-text="">使用英语阅读</span>
                                </a><button type="button"
                                  class="collection justify-content-flex-start button button-clear button-sm has-inner-focus button-block display-none-tablet"
                                  data-list-type="collection" data-bi-name="collection"
                                  title="将 关于 OpenJDK 的 Microsoft Build | Microsoft Learn 添加到集合"
                                  data-page-action-item="overflow-mobile" data-check-hidden="true" data-popover-close=""
                                  data-pressed="false">
                                  <span class="icon" aria-hidden="true">
                                    <span class="docon docon-circle-addition"></span>
                                  </span>
                                  <span class="collection-status">添加到集合</span>
                                </button>


                                <button type="button"
                                  class="collection justify-content-flex-start button button-clear button-sm has-inner-focus button-block display-none-tablet"
                                  data-list-type="plan" data-bi-name="plan"
                                  title="将 关于 OpenJDK 的 Microsoft Build | Microsoft Learn 添加到计划"
                                  data-page-action-item="overflow-mobile" data-check-hidden="true" data-popover-close=""
                                  data-pressed="false">
                                  <span class="icon" aria-hidden="true">
                                    <span class="docon docon-circle-addition"></span>
                                  </span>
                                  <span class="plan-status">添加到计划</span>
                                </button>
                                <div aria-hidden="true" class="margin-none" data-page-action-item="overflow-all"></div>
                                <hr class="display-none-tablet margin-bottom-xxs margin-top-xxs">
                                <h4 class="font-size-sm padding-left-xxs">通过</h4>

                                <a class="button button-clear button-sm button-block has-inner-focus text-decoration-none justify-content-flex-start share-facebook"
                                  data-bi-name="facebook" data-page-action-item="overflow-all"
                                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flearn.microsoft.com%2Fzh-cn%2Fjava%2Fopenjdk%2Foverview%3FWT.mc_id%3Dfacebook">
                                  <span class="icon" aria-hidden="true">
                                    <span class="docon docon-facebook-share font-size-md color-primary"></span>
                                  </span>
                                  <span class="margin-left-xxs">Facebook</span>
                                </a>
                                <a class="button button-clear button-sm has-inner-focus button-block text-decoration-none justify-content-flex-start share-twitter"
                                  data-bi-name="twitter" data-page-action-item="overflow-all"
                                  href="https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Flearn.microsoft.com%2Fzh-cn%2Fjava%2Fopenjdk%2Foverview%3FWT.mc_id%3Dtwitter&amp;text=%E4%BB%8A%E5%A4%A9%E6%88%91%E5%AE%8C%E6%88%90%E4%BA%86%20%22%E5%85%B3%E4%BA%8E%20OpenJDK%20%E7%9A%84%20Microsoft%20Build%20%7C%20Microsoft%20Learn%22%EF%BC%81%20%E6%88%91%E5%BE%88%E8%87%AA%E8%B1%AA%E8%83%BD%E5%A4%9F%E5%BA%86%E7%A5%9D%E8%BF%99%E4%B8%80%E6%88%90%E5%B0%B1%EF%BC%8C%E5%B9%B6%E5%B8%8C%E6%9C%9B%E8%BF%99%E8%83%BD%E6%BF%80%E5%8A%B1%E4%BD%A0%E5%BC%80%E5%A7%8B%E8%87%AA%E5%B7%B1%E7%9A%84%20%40MicrosoftLearn%20%E6%97%85%E7%A8%8B%EF%BC%81&amp;tw_p=tweetbutton&amp;url=https%3A%2F%2Flearn.microsoft.com%2Fzh-cn%2Fjava%2Fopenjdk%2Foverview%3FWT.mc_id%3Dtwitter">
                                  <span class="icon" aria-hidden="true">
                                    <span class="docon docon-xlogo-share font-size-xxs"></span>
                                  </span>
                                  <span class="margin-left-xxs">x.com 共享</span>
                                </a>
                                <a class="button button-clear button-sm has-inner-focus button-block text-decoration-none justify-content-flex-start share-linkedin"
                                  data-bi-name="linkedin" data-page-action-item="overflow-all"
                                  href="https://www.linkedin.com/feed/?shareActive=true&amp;text=%E4%BB%8A%E5%A4%A9%E6%88%91%E5%AE%8C%E6%88%90%E4%BA%86%20%22%E5%85%B3%E4%BA%8E%20OpenJDK%20%E7%9A%84%20Microsoft%20Build%20%7C%20Microsoft%20Learn%22%EF%BC%81%20%E6%88%91%E5%BE%88%E8%87%AA%E8%B1%AA%E8%83%BD%E5%A4%9F%E5%BA%86%E7%A5%9D%E8%BF%99%E4%B8%80%E6%88%90%E5%B0%B1%EF%BC%8C%E5%B9%B6%E5%B8%8C%E6%9C%9B%E8%BF%99%E8%83%BD%E6%BF%80%E5%8A%B1%E4%BD%A0%E5%BC%80%E5%A7%8B%E8%87%AA%E5%B7%B1%E7%9A%84%20%40MicrosoftLearn%20%E6%97%85%E7%A8%8B%EF%BC%81%0A%0D%0Ahttps%3A%2F%2Flearn.microsoft.com%2Fzh-cn%2Fjava%2Fopenjdk%2Foverview%3FWT.mc_id%3Dlinkedin">
                                  <span class="icon" aria-hidden="true">
                                    <span class="docon docon-linked-in-logo font-size-sm color-primary"></span>
                                  </span>
                                  <span class="margin-left-xxs">LinkedIn</span>
                                </a>
                                <a class="button button-clear button-sm button-block has-inner-focus text-decoration-none justify-content-flex-start margin-bottom-xxs share-email"
                                  data-bi-name="email" data-page-action-item="overflow-all"
                                  href="mailto:?subject=%5B%E5%85%B1%E4%BA%AB%E6%96%87%E7%AB%A0%5D%20%E5%85%B3%E4%BA%8E%20OpenJDK%20%E7%9A%84%20Microsoft%20Build%20%7C%20Microsoft%20Learn&amp;body=%E4%BB%8A%E5%A4%A9%E6%88%91%E5%AE%8C%E6%88%90%E4%BA%86%20%22%E5%85%B3%E4%BA%8E%20OpenJDK%20%E7%9A%84%20Microsoft%20Build%20%7C%20Microsoft%20Learn%22%EF%BC%81%20%E6%88%91%E5%BE%88%E8%87%AA%E8%B1%AA%E8%83%BD%E5%A4%9F%E5%BA%86%E7%A5%9D%E8%BF%99%E4%B8%80%E6%88%90%E5%B0%B1%EF%BC%8C%E5%B9%B6%E5%B8%8C%E6%9C%9B%E8%BF%99%E8%83%BD%E6%BF%80%E5%8A%B1%E4%BD%A0%E5%BC%80%E5%A7%8B%E8%87%AA%E5%B7%B1%E7%9A%84%20%40MicrosoftLearn%20%E6%97%85%E7%A8%8B%EF%BC%81%0A%0D%0Ahttps%3A%2F%2Flearn.microsoft.com%2Fzh-cn%2Fjava%2Fopenjdk%2Foverview%3FWT.mc_id%3Demail">
                                  <span class="icon" aria-hidden="true">
                                    <span class="docon docon-mail-message font-size-sm color-primary"></span>
                                  </span>
                                  <span class="margin-left-xxs">电子邮件</span>
                                </a>
                                <hr>
                                <button
                                  class="button button-block button-clear button-sm justify-content-flex-start has-inner-focus margin-top-xxs"
                                  title="打印" type="button" aria-label="打印" data-bi-name="print"
                                  data-page-action-item="overflow-all" data-popover-close="" data-print-page=""
                                  data-check-hidden="true">
                                  <span class="icon" aria-hidden="true">
                                    <span class="docon docon-print font-size-sm color-primary"></span>
                                  </span>
                                  <span class="margin-left-xxs">打印</span>
                                </button>
                              </div>
                            </details>

                          </div>
                        </div>
                      </div>
                      <!-- end article-header -->
                      <div>
                        <button type="button"
                          class="border contents-button button button-clear button-sm is-hidden-tablet has-inner-focus"
                          data-bi-name="contents-expand" data-contents-button="" hidden="">
                          <span class="icon">
                            <span class="docon docon-editor-list-bullet" aria-hidden="true"></span>
                          </span><span class="contents-expand-title">目录</span></button>
                      </div><!-- end mobile-contents button  -->

                      <div class="content ">
                        <h1 id="about-the-microsoft-build-of-openjdk">{{ ContentData.Title || '' }}</h1>
                        <div
                          class="display-flex justify-content-space-between align-items-center flex-wrap-wrap page-metadata-container">
                          <div class="margin-right-xxs">
                            <ul class="metadata page-metadata" data-bi-name="page info" lang="zh-cn" dir="ltr">
                              <li class="visibility-hidden-visual-diff">
                                <time class="">
                                  发布时间：{{ (ContentData.ApprovedOn && ContentData.ApprovedOn != 'InvalidDate'?ContentData.ApprovedOn:'')||(ContentData.CreatedOn&&ContentData.CreatedOn!='InvalidDate'?ContentData.CreatedOn:'')}}
                                </time>
                              </li>
                              <li class="contributors-holder display-none-print">
                                发布部门：{{ ContentData.BusinessUnitId || '暂无' }}
                                <!-- <button aria-label="查看所有参与者" class="contributors-button link-button" data-bi-name="contributors" title="查看所有参与者">4 个参与者 </button> -->
                              </li>
                              <li class="contributors-holder display-none-print">
                                点赞数：{{ ContentData.LikeCount || '暂无' }}
                              </li>
                              <li class="contributors-holder display-none-print">
                                阅读数：{{ ContentData.ReadCount || '0' }}
                              </li>
                            </ul>
                          </div>
                          <div id="user-feedback" class="margin-block-xxs display-none-print" data-hide-on-archived="">
                            <button id="user-feedback-button" data-test-id="conceptual-feedback-button"
                              class="button button-sm button-clear button-primary" type="button"
                              data-bi-name="user-feedback-button" data-user-feedback-button="">
                              <span class="icon" aria-hidden="true">
                                <span class="docon docon-like"></span>
                              </span>
                              <span>反馈</span>
                            </button>
                          </div>
                        </div>
                        <nav id="center-doc-outline"
                          class="doc-outline is-hidden-desktop display-none-print margin-bottom-sm"
                          data-bi-name="intopic toc" aria-label="本文内容" hidden="">
                          <h2 id="ms--in-this-article" class="title is-6 margin-block-xs">本文内容</h2>
                        </nav>
                        <!-- <content> -->
                        <div class="ContentMain">
                          <div v-html="ContentData.ContentBody || ''"></div>
                          <!-- <p>Microsoft Build of OpenJDK 是 OpenJDK 的一种免费分发版，它是开放源代码，任何人都可将其免费部署到任意位置。 它包括适用于 macOS、Linux 和 Windows 上 x64 服务器和桌面环境中的 Java 11 和 Java 17 的长期支持 (LTS) 二进制文件、适用于 Linux 和 Windows 上的 AArch64/ARM64 的长期支持二进制文件、适用于 Apple Silicon (AArch64/M1) 上 macOS 的二进制文件，以及适用于 x64 上 Alpine Linux 的 musl libc 编译二进制文件。</p>
<p>有关下载包和安装程序的信息，请参阅<a href="download" data-linktype="relative-path">下载 Microsoft Build of OpenJDK</a>。</p>
<p>Microsoft Build of OpenJDK 二进制文件基于 OpenJDK 源代码，遵循 Eclipse Adoptium 项目使用的相同生成脚本，并根据 Eclipse Adoptium 质量保证套件（包括 OpenJDK 项目测试）进行了测试。 我们正式发布的二进制文件已通过 Java 技术兼容性工具包 (TCK) 的测试，该工具包用于验证与 Java 规范的兼容性。 Microsoft Build of OpenJDK 是 Java 生态系统中可用的任何其他 OpenJDK 分发版的普适性替代产品。</p>
<p>如果你是 Microsoft Azure 客户，可立即试用。 只需在浏览器或 Windows 终端中访问 Azure Cloud Shell 即可。</p>
<p>
  <span class="mx-imgBorder">
  <img src="https://learn.microsoft.com/zh-cn/java/openjdk/media/overview/ms-openjdk-azure-cloud-shell.gif" alt="显示在 Windows 终端的 Azure Cloud Shell 中使用 OpenJDK 的动画 GIF" data-linktype="relative-path">
  
  </span>

</p>
<p>Microsoft Build of OpenJDK 二进制文件可能包含我们认为对客户和内部用户很重要的向后移植修补程序和增强功能。 其中一些可能尚未在上游正式向后移植，已在发行说明中明确标出。 这使我们能够加快改进和修复，同时继续并行实现这些更改的上游化。 更新是免费的，可供每个 Java 开发人员在任意位置部署。</p>
<div class="heading-wrapper" data-heading-level="h2">
  <h2 id="provide-feedback-on-the-microsoft-build-of-openjdk" class="heading-anchor">提供有关 Microsoft Build of OpenJDK 的反馈</h2></div>
<p>向我们发送你的评论、想法和意见，帮助我们改进 Microsoft Build of OpenJDK。 请访问 <a href="https://github.com/microsoft/openjdk/discussions" data-linktype="external">GitHub 上的 OpenJDK 讨论页面</a>，向我们发送反馈。</p>
<p>
  <em>Java 和 OpenJDK 是 Oracle 和/或其附属机构的商标或注册商标。</em></p> -->
                        </div>
                      </div>
                      <div id="ms--inline-notifications" class="margin-block-xs" data-bi-name="inline-notification">
                      </div>
                      <div id="assertive-live-region" role="alert" aria-live="assertive" class="visually-hidden"
                        aria-relevant="additions" aria-atomic="true"></div>
                      <div id="polite-live-region" role="status" aria-live="polite" class="visually-hidden"
                        aria-relevant="additions" aria-atomic="true"></div>

                      <!-- </content> -->

                    </main><!-- recommendations section --><!-- end recommendations section -->

                    <!-- feedback section --><!-- end feedback section -->

                    <!-- feedback report section --><!-- end feedback report section -->
                    <aside id="ms--additional-resources-mobile"
                      class="display-none-desktop display-none-print">
                      <hr class="hr">
                      <h2 id="ms--additional-resources-mobile-heading" class="title is-3">其他地图</h2>
                      <section id="right-rail-recommendations-mobile" data-bi-name="recommendations"><!---->
                        <hr class="hr display-none display-block-desktop">
                        <article class="margin-top-md margin-top-sm-desktop">

                          <p class="font-weight-semibold font-size-md display-flex align-items-center">
                            <span class="icon margin-right-xxs" aria-hidden="true">
                              <span class="docon docon-book-art64"></span>
                            </span>
                            文档
                          </p>

                          <div class="margin-top-xs ">

                            <ul aria-live="polite" aria-relevant="additions" id="right-rail-recommendations-list-0">
                              <!---->
                              <li class="padding-none margin-top-xs margin-bottom-none position-relative ">

                                <p class="line-clamp-3">
                                  <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                    href="/zh-cn/java/openjdk/java-jlink-runtimes?source=recommendations"
                                    data-bi-name="right-rail-recommendation-item-0">
                                    使用 jlink 的 Java 运行时
                                  </a>
                                </p>


                                <p
                                  class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                  介绍如何使用 jlink 生成自定义 Java 运行时。
                                </p>

                              </li>
                              <!---->
                              <li class="padding-none margin-top-sm margin-bottom-none position-relative ">

                                <p class="line-clamp-3">
                                  <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                    href="/zh-cn/java/openjdk/download-major-urls?source=recommendations"
                                    data-bi-name="right-rail-recommendation-item-1">
                                    Microsoft Build of OpenJDK 主版本的 URL
                                  </a>
                                </p>


                                <p
                                  class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                  介绍从何处下载 Microsoft Build of OpenJDK 的主版本。
                                </p>

                              </li>
                              <!---->
                              <li class="padding-none margin-top-sm margin-bottom-none position-relative ">

                                <p class="line-clamp-3">
                                  <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                    href="/zh-cn/java/openjdk/?source=recommendations"
                                    data-bi-name="right-rail-recommendation-item-2">
                                    Microsoft Build of OpenJDK
                                  </a>
                                </p>


                                <p
                                  class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                  Microsoft Build of OpenJDK 入门。
                                </p>

                              </li>
                              <!---->
                              <li class="padding-none margin-top-sm margin-bottom-none position-relative expandable">

                                <p class="line-clamp-3">
                                  <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                    href="/zh-cn/java/openjdk/reasons-to-move-to-java-11?source=recommendations"
                                    data-bi-name="right-rail-recommendation-item-3">
                                    迁移到 Java 11 的原因 - Azure
                                  </a>
                                </p>


                                <p
                                  class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                  本文为摘要级别的文档，适用于那些正权衡从 Java 8 迁移到 Java 11 的优势的决策者。
                                </p>

                              </li>
                              <!---->
                              <li class="padding-none margin-top-sm margin-bottom-none position-relative expandable">

                                <p class="line-clamp-3">
                                  <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                    href="/zh-cn/java/openjdk/release-notes?source=recommendations"
                                    data-bi-name="right-rail-recommendation-item-4">
                                    Microsoft Build of OpenJDK 的发行说明
                                  </a>
                                </p>


                                <p
                                  class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                  介绍 Microsoft Build of OpenJDK 中更改的内容。
                                </p>

                              </li>
                              <!---->
                              <li class="padding-none margin-top-sm margin-bottom-none position-relative expandable">

                                <p class="line-clamp-3">
                                  <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                    href="/zh-cn/java/openjdk/transition-from-java-7-to-java-8?source=recommendations"
                                    data-bi-name="right-rail-recommendation-item-5">
                                    从 Java 7 转换到 Java 8 - Azure
                                  </a>
                                </p>


                                <p
                                  class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                  从 Java 7 到 Java 8 的迁移管理指南。
                                </p>

                              </li>
                              <!---->
                              <li class="padding-none margin-top-sm margin-bottom-none position-relative expandable">

                                <p class="line-clamp-3">
                                  <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                    href="/zh-cn/java/openjdk/transition-from-java-8-to-java-11?source=recommendations"
                                    data-bi-name="right-rail-recommendation-item-6">
                                    从 Java 8 转换到 Java 11 - Azure
                                  </a>
                                </p>


                                <p
                                  class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                  从 Java 8 到 Java 11 的迁移管理指南。
                                </p>

                              </li>
                              <!---->
                              <li class="padding-none margin-top-sm margin-bottom-none position-relative expandable">

                                <p class="line-clamp-3">
                                  <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                    href="/zh-cn/java/openjdk/faq?source=recommendations"
                                    data-bi-name="right-rail-recommendation-item-7">
                                    有关 Microsoft Build of OpenJDK 的常见问题解答
                                  </a>
                                </p>


                                <p
                                  class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                  回答有关 Microsoft Build of OpenJDK 的常见问题。
                                </p>

                              </li>
                              <!---->
                            </ul>

                          </div>
                          <!---->

                          <button type="button" aria-expanded="false" data-show-more=""
                            class="link-button font-weight-semibold font-size-sm margin-top-sm"
                            aria-controls="right-rail-recommendations-list-0" data-title="显示另外 5 个"
                            data-bi-name="show-more-btn">
                            <span class="show-more-text "><!---->显示另外 5 个<!----></span>

                          </button>

                          <!---->
                        </article>
                        <!---->
                      </section>
                      <section id="right-rail-training-mobile" data-bi-name="learning-resources-card"><!---->
                        <hr class="hr display-none display-block-desktop">
                        <article class="margin-top-md margin-top-sm-desktop">

                          <p class="font-weight-semibold font-size-md display-flex align-items-center">
                            <span class="icon margin-right-xxs" aria-hidden="true">
                              <span class="docon docon-cube-cone-ball-shapes"></span>
                            </span>
                            培训
                          </p>

                          <div class="margin-top-xs position-relative">
                            <!---->
                            <div class="position-relative margin-top-xs">

                              <p class="has-line-height-reset color-text-subtle font-size-xs font-weight-semibold">
                                学习路径
                              </p>

                              <p class="line-clamp-3">
                                <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                  href="/zh-cn/training/paths/get-started-java-azure/?source=recommendations">
                                  Azure 上的 Java 入门 - Training
                                </a>
                              </p>


                              <p
                                class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                从此处开始，了解如何使用 Azure 服务在 Azure 上构建、迁移和缩放 Java 应用程序。 使用你熟悉且喜爱的工具和框架 -
                                Spring、Tomcat、WildFly、JBoss、WebLogic、WebSphere、Maven、Gradle、IntelliJ、Eclipse、Jenkins、Terraform
                                等。
                              </p>

                            </div>
                            <!---->
                            <div class="position-relative margin-top-sm">

                              <p class="has-line-height-reset color-text-subtle font-size-xs font-weight-semibold">
                                认证
                              </p>

                              <p class="line-clamp-3">
                                <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                  href="/zh-cn/credentials/certifications/azure-developer/?source=recommendations">
                                  Microsoft Certified: Azure Developer Associate - Certifications
                                </a>
                              </p>


                              <p
                                class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                在 Microsoft Azure 中构建端到端解决方案，以创建 Azure Functions、实现和管理 Web 应用、开发使用 Azure 存储的解决方案等。
                              </p>

                            </div>
                            <!---->
                          </div>

                        </article>
                        <!---->
                      </section>
                      <section id="right-rail-events-mobile" data-bi-name="events-card" hidden=""></section>
                      <section id="right-rail-qna-mobile" data-bi-name="qna-link-card" hidden=""></section>
                    </aside>
                    <div class="border-top is-visible-interactive has-default-focus margin-top-sm ">
                      <footer id="footer-interactive" data-bi-name="footer" class="footer-layout">
                        <div class="display-flex gap-xs flex-wrap-wrap is-full-height padding-right-lg-desktop"><a
                            data-mscc-ic="false"
                            class="locale-selector-link button button-sm button-clear flex-shrink-0"
                            href="/zh-cn/locale?target=https%3A%2F%2Flearn.microsoft.com%2Fzh-cn%2Fjava%2Fopenjdk%2Foverview"
                            data-bi-name="select-locale" aria-label="内容语言选择器。 当前设置为 中文 (简体)。">
                            <span class="icon" aria-hidden="true">
                              <span class="docon docon-world"></span>
                            </span>
                            <span class="local-selector-link-text">中文 (简体)</span></a>
                          <div class="ccpa-privacy-link" data-ccpa-privacy-link="">
                            <a href="https://aka.ms/yourcaliforniaprivacychoices"
                              class="button button-sm button-clear flex-shrink-0" data-mscc-ic="false"
                              data-bi-name="your-privacy-choices">
                              <svg role="img" aria-label="加州消费者隐私法案 (CCPA) 禁用图标" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 14" xml:space="preserve" height="16" width="43" focusable="false">
                                <title>加州消费者隐私法案 (CCPA) 禁用图标</title>
                                <path d="M7.4 12.8h6.8l3.1-11.6H7.4C4.2 1.2 1.6 3.8 1.6 7s2.6 5.8 5.8 5.8z"
                                  style="fill-rule:evenodd;clip-rule:evenodd;fill:#fff"></path>
                                <path
                                  d="M22.6 0H7.4c-3.9 0-7 3.1-7 7s3.1 7 7 7h15.2c3.9 0 7-3.1 7-7s-3.2-7-7-7zm-21 7c0-3.2 2.6-5.8 5.8-5.8h9.9l-3.1 11.6H7.4c-3.2 0-5.8-2.6-5.8-5.8z"
                                  style="fill-rule:evenodd;clip-rule:evenodd;fill:#06f"></path>
                                <path
                                  d="M24.6 4c.2.2.2.6 0 .8L22.5 7l2.2 2.2c.2.2.2.6 0 .8-.2.2-.6.2-.8 0l-2.2-2.2-2.2 2.2c-.2.2-.6.2-.8 0-.2-.2-.2-.6 0-.8L20.8 7l-2.2-2.2c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0l2.2 2.2L23.8 4c.2-.2.6-.2.8 0z"
                                  style="fill:#fff"></path>
                                <path
                                  d="M12.7 4.1c.2.2.3.6.1.8L8.6 9.8c-.1.1-.2.2-.3.2-.2.1-.5.1-.7-.1L5.4 7.7c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0L8 8.6l3.8-4.5c.2-.2.6-.2.9 0z"
                                  style="fill:#06f"></path>
                              </svg>
                              <span>你的隐私选择</span>
                            </a>

                          </div>
                          <div class="flex-shrink-0">
                            <div class="dropdown has-caret-up">
                              <button
                                class="dropdown-trigger button button-clear button-sm has-inner-focus theme-dropdown-trigger"
                                aria-controls="theme-menu-interactive" aria-expanded="false" title="主题"
                                data-bi-name="theme">
                                <span class="icon">
                                  <span class="docon docon-sun" aria-hidden="true"></span>
                                </span>
                                <span>主题</span>
                                <span class="icon expanded-indicator" aria-hidden="true">
                                  <span class="docon docon-chevron-down-light"></span>
                                </span>
                              </button>
                              <div class="dropdown-menu" id="theme-menu-interactive" role="menu">
                                <ul class="theme-selector padding-xxs" role="none">
                                  <li class="theme display-block" role="menuitem">
                                    <button
                                      class="button button-clear button-sm theme-control button-block justify-content-flex-start is-selected"
                                      data-theme-to="light" aria-pressed="true">
                                      <span class="theme-light margin-right-xxs">
                                        <span
                                          class="theme-selector-icon border display-inline-block has-body-background"
                                          aria-hidden="true">
                                          <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 14">
                                            <rect width="22" height="14" class="has-fill-body-background"></rect>
                                            <rect x="5" y="5" width="12" height="4" class="has-fill-secondary"></rect>
                                            <rect x="5" y="2" width="2" height="1" class="has-fill-secondary"></rect>
                                            <rect x="8" y="2" width="2" height="1" class="has-fill-secondary"></rect>
                                            <rect x="11" y="2" width="3" height="1" class="has-fill-secondary"></rect>
                                            <rect x="1" y="1" width="2" height="2" class="has-fill-secondary"></rect>
                                            <rect x="5" y="10" width="7" height="2" rx="0.3" class="has-fill-primary">
                                            </rect>
                                            <rect x="19" y="1" width="2" height="2" rx="1" class="has-fill-secondary">
                                            </rect>
                                          </svg>
                                        </span>
                                      </span>
                                      <span>亮</span>
                                    </button>
                                  </li>
                                  <li class="theme display-block" role="menuitem">
                                    <button
                                      class="button button-clear button-sm theme-control button-block justify-content-flex-start"
                                      data-theme-to="dark" aria-pressed="false">
                                      <span class="theme-dark margin-right-xxs">
                                        <span
                                          class="border theme-selector-icon display-inline-block has-body-background"
                                          aria-hidden="true">
                                          <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 14">
                                            <rect width="22" height="14" class="has-fill-body-background"></rect>
                                            <rect x="5" y="5" width="12" height="4" class="has-fill-secondary"></rect>
                                            <rect x="5" y="2" width="2" height="1" class="has-fill-secondary"></rect>
                                            <rect x="8" y="2" width="2" height="1" class="has-fill-secondary"></rect>
                                            <rect x="11" y="2" width="3" height="1" class="has-fill-secondary"></rect>
                                            <rect x="1" y="1" width="2" height="2" class="has-fill-secondary"></rect>
                                            <rect x="5" y="10" width="7" height="2" rx="0.3" class="has-fill-primary">
                                            </rect>
                                            <rect x="19" y="1" width="2" height="2" rx="1" class="has-fill-secondary">
                                            </rect>
                                          </svg>
                                        </span>
                                      </span>
                                      <span>暗</span>
                                    </button>
                                  </li>
                                  <li class="theme display-block" role="menuitem">
                                    <button
                                      class="button button-clear button-sm theme-control button-block justify-content-flex-start"
                                      data-theme-to="high-contrast" aria-pressed="false">
                                      <span class="theme-high-contrast margin-right-xxs">
                                        <span
                                          class="border theme-selector-icon display-inline-block has-body-background"
                                          aria-hidden="true">
                                          <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 14">
                                            <rect width="22" height="14" class="has-fill-body-background"></rect>
                                            <rect x="5" y="5" width="12" height="4" class="has-fill-secondary"></rect>
                                            <rect x="5" y="2" width="2" height="1" class="has-fill-secondary"></rect>
                                            <rect x="8" y="2" width="2" height="1" class="has-fill-secondary"></rect>
                                            <rect x="11" y="2" width="3" height="1" class="has-fill-secondary"></rect>
                                            <rect x="1" y="1" width="2" height="2" class="has-fill-secondary"></rect>
                                            <rect x="5" y="10" width="7" height="2" rx="0.3" class="has-fill-primary">
                                            </rect>
                                            <rect x="19" y="1" width="2" height="2" rx="1" class="has-fill-secondary">
                                            </rect>
                                          </svg>
                                        </span>
                                      </span>
                                      <span>高对比度</span>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>

                          </div>
                        </div>
                        <ul class="links" data-bi-name="footerlinks">
                          <li class="manage-cookies-holder"><button data-bi-name="manageCookies">管理 Cookie</button></li>
                          <li><a class="external-link-indicator" data-mscc-ic="false" href="/zh-cn/previous-versions/"
                              data-bi-name="archivelink">早期版本</a></li>
                          <li><a class="external-link-indicator" data-mscc-ic="false"
                              href="https://techcommunity.microsoft.com/t5/microsoft-learn-blog/bg-p/MicrosoftLearnBlog"
                              data-bi-name="bloglink">博客</a></li>
                          <li><a class="external-link-indicator" data-mscc-ic="false" href="/zh-cn/contribute/"
                              data-bi-name="contributorGuide">参与</a></li>
                          <li><a class="external-link-indicator" data-mscc-ic="false"
                              href="https://go.microsoft.com/fwlink/?LinkId=521839" data-bi-name="privacy">隐私</a></li>
                          <li><a class="external-link-indicator" data-mscc-ic="false" href="/zh-cn/legal/termsofuse"
                              data-bi-name="termsofuse">使用条款</a></li>
                          <li><a class="external-link-indicator" data-mscc-ic="false"
                              href="https://www.microsoft.com/legal/intellectualproperty/Trademarks/"
                              data-bi-name="trademarks">商标</a></li>
                          <li>© Microsoft 2024</li>
                        </ul>
                      </footer>
                    </div>
                  </div>
                  <div id="ms--additional-resources"
                    class="right-container column is-4-desktop display-none display-block-desktop"
                    data-bi-name="pageactions" role="complementary">
                    <div id="affixed-right-container" class="margin-top-sm-tablet position-sticky"
                      data-bi-name="right-column" style="top: -18px; bottom: 36px;">
                      <h2 id="ms--additional-resources-heading" class="title is-6 margin-top-md">其他地图</h2>
                      <!-- <section id="right-rail-events" data-bi-name="events-card" hidden=""></section>
                      <section id="right-rail-training" data-bi-name="learning-resources-card">
                        <hr class="hr display-none display-block-desktop">
                        <article class="margin-top-md margin-top-sm-desktop">

                          <p class="font-weight-semibold font-size-md display-flex align-items-center">
                            <span class="icon margin-right-xxs" aria-hidden="true">
                              <span class="docon docon-cube-cone-ball-shapes"></span>
                            </span>
                            培训
                          </p>

                          <div class="margin-top-xs position-relative">
                            <div class="position-relative margin-top-xs">

                              <p class="has-line-height-reset color-text-subtle font-size-xs font-weight-semibold">
                                学习路径
                              </p>

                              <p class="line-clamp-3">
                                <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                  href="/zh-cn/training/paths/get-started-java-azure/?source=recommendations">
                                  Azure 上的 Java 入门 - Training
                                </a>
                              </p>


                              <p
                                class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                从此处开始，了解如何使用 Azure 服务在 Azure 上构建、迁移和缩放 Java 应用程序。 使用你熟悉且喜爱的工具和框架 -
                                Spring、Tomcat、WildFly、JBoss、WebLogic、WebSphere、Maven、Gradle、IntelliJ、Eclipse、Jenkins、Terraform
                                等。
                              </p>

                            </div>
                            <div class="position-relative margin-top-sm">

                              <p class="has-line-height-reset color-text-subtle font-size-xs font-weight-semibold">
                                认证
                              </p>

                              <p class="line-clamp-3">
                                <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link"
                                  href="/zh-cn/credentials/certifications/azure-developer/?source=recommendations">
                                  Microsoft Certified: Azure Developer Associate - Certifications
                                </a>
                              </p>


                              <p
                                class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                在 Microsoft Azure 中构建端到端解决方案，以创建 Azure Functions、实现和管理 Web 应用、开发使用 Azure 存储的解决方案等。
                              </p>

                            </div>
                          </div>

                        </article>
                      </section> -->
                      <section id="right-rail-recommendations" data-bi-name="recommendations"><!---->
                        <hr class="hr display-none display-block-desktop">
                        <article class="margin-top-md margin-top-sm-desktop">

                          <p class="font-weight-semibold font-size-md display-flex align-items-center">
                            <span class="icon margin-right-xxs" aria-hidden="true">
                              <span class="docon docon-book-art64"></span>
                            </span>
                            文档
                          </p>

                          <div class="margin-top-xs ">

                            <ul>
                              <!---->
                              <li class="padding-none margin-top-xs margin-bottom-none position-relative" v-for="(item,index) in listData" :key="index" @click.stop="goToOther(item.id)">

                                <p class="line-clamp-3">
                                  <a class="display-block inner-focus font-weight-semibold font-size-sm has-line-height-reset stretched-link" href="javascript:void(0)">{{item.Name}}</a>
                                </p>


                                <p
                                  class="font-size-sm has-line-height-reset color-text-subtle margin-top-xxs line-clamp-3">
                                  {{item.Description}}
                                </p>

                              </li>
                              
                              
                            </ul>

                          </div>
                          

                          <!-- <button type="button" aria-expanded="false" data-show-more=""
                            class="link-button font-weight-semibold font-size-sm margin-top-sm"
                            aria-controls="right-rail-recommendations-list-1" data-title="显示另外 5 个"
                            data-bi-name="show-more-btn">
                            <span class="show-more-text ">显示另外 5 个</span>

                          </button> -->

                          
                        </article>
                        
                      </section>
                      <nav id="side-doc-outline" class="doc-outline" data-bi-name="intopic toc" aria-label="本文内容"
                        hidden="">
                        <h3>本文内容</h3>
                      </nav>
                      <section id="right-rail-qna" class="margin-top-xxs" data-bi-name="qna-link-card" hidden="">
                      </section>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import "@/style/common.less";
import "@/style/icon/iconfont.css";
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
  height: 100,
  treeData: [],
  treeDataAll: [],
  filterText: '',
  treeExpandData: [route.query.id || ''],
  propsTree: {
    children: 'children',
    label: 'name'
  },
  id: route.query.id || '1',
  pid: route.query.SubjectId || '',
  Title: '',
  Description: '',
  ContentData: { ContentBody: null, ApprovedOn: '', Title: '' },
  ParentSubjectName: '',
  SubjectName: ''
});
const { ParentSubjectName, SubjectName, height, listData, loading, treeData, treeDataAll, filterText, treeExpandData, propsTree, id, pid, Title, Description, ContentData } = toRefs(data);

const getOtherData = () => {
  data.listData = [];
  proxy.$post(Interface.list2, {
    filterId: '',
    objectTypeCode: '100310',
    entityName: 'KbSubject',
    filterQuery: '\nParentSubject\tnull',
    search: '',
    page: 1,
    rows: 10,
    sort: 'DisplayOrder',
    order: 'ASC',
    displayColumns: 'Name,Description'
  }).then(res => {
    var list = [];
    if (res && res.nodes && res.nodes.length) {
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != 'id' && cell != 'nameField') {
            item[cell] = girdFormatterValue(cell, item);
          }
        }
        if(list.length<10){
          list.push(item)
        }
      }
    }
    data.listData = list;
  })
};
const onSearch = (e) => {
  data.filterText = e.target.value;
  if (data.filterText) {
    data.treeData = data.treeDataAll[0].children.filter(item => {
      return item.name.indexOf(data.filterText) !== -1;
    })
  }
  else {
    data.treeData = data.treeDataAll;
  }
};
const onClear = (e) => {
  data.searchVal = '';
};
const getContent = (id) => {
  //data.ContentData={};
  let d = {
    actions: [{
      id: "4270;a",
      descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: id,
        apiName: 'Content',
        objTypeCode: '100201',
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.detail, obj).then(res => {
    if (res && res.actions && res.actions[0]) {
      let record = res.actions[0].returnValue.fields;
      data.ContentData.ContentBody = record.ContentBody ? record.ContentBody.value : '';
      data.ContentData.ApprovedOn = record.ApprovedOn&&record.ApprovedOn.value ? dayjs(record.ApprovedOn.value.split('.')[0]).format("YYYY-MM-DD HH:mm") : '';
      data.ContentData.CreatedOn = record.CreatedOn&&record.CreatedOn.value ? dayjs(record.CreatedOn.value.split('.')[0]).format("YYYY-MM-DD HH:mm") : '';
      data.ContentData.CreatedBy = record.CreatedBy ? record.CreatedBy.displayValue : '';
      data.ContentData.BusinessUnitId=record.BusinessUnitId ? record.BusinessUnitId.displayValue : '';
      data.ContentData.LikeCount = record.LikeCount ? record.LikeCount.value : '';
      data.ContentData.ReadCount = record.ReadCount ? record.ReadCount.value : '';
      //data.ContentData.Title=record.Title?record.Title.value:'';
      //console.log(data.ContentData)
    }
  })
}
const handleNodeClick = (e) => {
  data.id = e.id;
  if (e.ContentIdValue) {
    data.SubjectName = e.SubjectId || e.Name;
    data.ContentData.Title = e.Name;
    window.location.href = '/#/lightning/page/KnowledgeMapDetail?id=' + (e.id || '') + '&SubjectId=' + data.pid;
    getContent(e.ContentIdValue);
  }
}
const getArticle = (id, index) => {
  data.treeData[0].children[index].children = [];
  data.treeDataAll[0].children[index].children = [];
  let filterQuery = '\nSubjectId\teq\t' + id;
  proxy.$post(Interface.list2, {
    filterId: '',
    objectTypeCode: '100311',
    entityName: 'KbSubjectContent',
    filterQuery: filterQuery,
    search: '',
    page: 1,
    rows: 100,
    sort: 'DisplayOrder',
    order: 'asc',
    displayColumns: 'Name,ContentId,SubjectId'
  }).then(res => {
    if (res && res.nodes && res.nodes.length) {
      var list = [];
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != 'id' && cell != 'nameField' && cell != 'ContentId' && cell != 'SubjectId') {
            item[cell] = girdFormatterValue(cell, item);
          }
          if (cell == 'ContentId' || cell == 'SubjectId') {
            item[cell + 'Value'] = item[cell].lookupValue.value;
            item[cell] = girdFormatterValue(cell, item);
          }
          // if(cell=='CreatedOn'||cell=='ModifiedOn'){
          //     item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
          // }
        }
        if (data.id && data.id == item.id) {
          handleNodeClick(item);
        }
        item.name = item.Name;
        list.push(item);
      }
      data.treeData[0].children[index].children = list;
      data.treeDataAll[0].children[index].children = list;
    }
  })
}
const getTree = () => {
  data.treeData = [
    { id: '1', name: '概述', children: [] },
    {
      id: '2', name: '获取软件', children: [
        { id: '21', name: '下载JDK', parent: null, children: [] },
        { id: '22', name: '安装JDK', parent: null, children: [] },
        { id: '23', name: '容器映像', parent: null, children: [] },
        { id: '24', name: '主版本的虚 URL', parent: null, children: [] },
      ]
    },
    {
      id: '3', name: '了解详细信息', children: [
        { id: '31', name: '使用 jlink 的 Java 运行时', parent: null, children: [] },
        { id: '32', name: '迁移到 Java 11 的原因', parent: null, children: [] },
        { id: '33', name: '从 Java 8 转换到 Java 11', parent: null, children: [] },
        { id: '34', name: '从 Java 7 转换到 Java 8', parent: null, children: [] },
      ]
    },
    { id: '4', name: '支持', children: [] },
    { id: '5', name: '发行说明', children: [] },
    { id: '6', name: '常见问题', children: [] },
  ]
  data.treeDataAll = [
    { id: '1', name: '概述', children: [] },
    {
      id: '2', name: '获取软件', children: [
        { id: '21', name: '下载JDK', parent: null, children: [] },
        { id: '22', name: '安装JDK', parent: null, children: [] },
        { id: '23', name: '容器映像', parent: null, children: [] },
        { id: '24', name: '主版本的虚 URL', parent: null, children: [] },
      ]
    },
    {
      id: '3', name: '了解详细信息', children: [
        { id: '31', name: '使用 jlink 的 Java 运行时', parent: null, children: [] },
        { id: '32', name: '迁移到 Java 11 的原因', parent: null, children: [] },
        { id: '33', name: '从 Java 8 转换到 Java 11', parent: null, children: [] },
        { id: '34', name: '从 Java 7 转换到 Java 8', parent: null, children: [] },
      ]
    },
    { id: '4', name: '支持', children: [] },
    { id: '5', name: '发行说明', children: [] },
    { id: '6', name: '常见问题', children: [] },
  ];
  data.treeData = [];
  data.treeDataAll = [];

  let filterQuery = '\nParentSubject\teq\t' + data.pid;
  proxy.$post(Interface.list2, {
    filterId: '',
    objectTypeCode: '100310',
    entityName: 'KbSubject',
    filterQuery: filterQuery,
    search: '',
    page: 1,
    rows: 100,
    sort: 'DisplayOrder',
    order: 'ASC',
    displayColumns: 'Name,ParentSubject'
  }).then(res => {
    var list = [];
    data.ParentSubjectName = '';
    data.treeData = [{
      id: data.pid,
      name: '',
      parent: null,
      children: []
    }];
    data.treeDataAll = [{
      id: data.pid,
      name: '',
      parent: null,
      children: []
    }];
    if (res && res.nodes && res.nodes.length) {
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != 'id' && cell != 'nameField') {
            item[cell] = girdFormatterValue(cell, item);
          }
          if (cell == 'ParentSubject') {
            data.ParentSubjectName = item[cell];
          }
        }
        item.name = item.Name;
        data.treeData[0].children.push(item);
        data.treeDataAll[0].children.push(item);
        getArticle(item.id, i);
      }
    }
    data.treeData[0].name = data.ParentSubjectName;
    data.treeDataAll[0].name = data.ParentSubjectName;
  })

}
const filterNode = () => {

}
const goToOther=(id)=>{
  let reUrl = router.resolve({
        path:"/lightning/page/KnowledgeMap",
        query: {
          id: id
        }
    })
  window.open(reUrl.href); 
  return false
}
onMounted(() => {
  let h = document.documentElement.clientHeight;
  //data.height=h-75;
  //if(route.query.type=='page'){
  data.height = h;
  //}
  window.addEventListener("resize", (e) => {
    let h = document.documentElement.clientHeight;
    //data.height=h-75;
    //if(route.query.type=='page'){
    data.height = h;
    //}
  });
  getTree();
  getOtherData();
  if (data.pid) {
    getTree();
    data.treeExpandData.push(data.pid)
  }
  if (data.id) {
    data.treeExpandData.push(data.id)
  }
  else {
    if (data.pid) {
      data.id = data.pid
    }
  }
})
</script>
<style lang="less">
.KnowledgeMapDetail {
  width: 100%;

  .panel {
    //padding: 12px 8px;
    padding: 0;
    border-radius: 0;
    margin-bottom: 0;
    background: #e8edf4;
    overflow-x: hidden;

    .panel-bd {
      background: #fff;
      height: calc(~'100% - 0px') !important;
      overflow-y: auto;

      a {
        color: #1055BC;
      }

      .uhf-container {
        width: 100%;
        max-width: 100%;
        height: 100%;

        .padding-block-xl {
          padding: 50px 75px !important;

          .supertitle {
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

          .title,
          .subtitle {
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

          .has-three-text-columns {
            -moz-columns: 3;
            columns: 3;

            .has-three-text-columns-list-items {
              -moz-column-break-inside: avoid;
              break-inside: avoid;

              .barLink,
              .bar-link {
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

            .has-three-text-columns-list-items:hover {

              .barLink,
              .bar-link {
                border-left: 6px solid #1055BC;
              }
            }
          }
        }
      }

      .padding-block-lg {
        padding: 50px 75px !important;

        .heading-wrapper {
          position: relative;

          h2 {
            margin-top: 32px;
            font-size: 34px;
            margin-inline-start: -1.875rem;
            padding-inline-start: 1.875rem;
          }
        }

        .docon {
          font-family: "iconfont" !important;
          font-size: inherit;
          font-variant: normal;
          text-transform: none;
          text-align: center;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-style: normal;
          font-weight: 400;
          line-height: 32px;
          display: inline-block;
          width: 32px;
        }

        .margin-top-none {
          margin-block-start: 0 !important;
        }

        .margin-bottom-sm {
          margin-block-end: 1.5rem !important;
        }

        .columns {
          margin-top: -.75rem;
          margin-left: -.75rem;
          margin-right: -.75rem;
        }

        .columns.is-multiline {
          display: flex;
          flex-wrap: wrap;
        }

        .columns>.column:not(.has-uhf-padding) {
          padding: .75rem;
        }

        .column.is-3-desktop {
          width: 25%;
          flex: none;
        }

        .card {
          max-width: 100%;
          border: 1px solid #fff0;
          outline-color: #161616;
          background-color: #fff;
          color: #161616;
          box-shadow: 0 1.6px 3.6px 0 #00000021, 0 .3px .9px 0 #0000001c;
          border-radius: .125rem;
          flex-direction: column;
          justify-content: flex-start;
          padding: 1rem 0 0;
          display: flex;
          position: relative;

          .card-title {
            -webkit-box-orient: vertical;
            display: -webkit-box;
            overflow: hidden;
            color: #0078d4;
            text-align: start;
            -webkit-appearance: none;
            appearance: none;
            border: none;
            flex-grow: 1;
            grid-area: title;
            margin: 0;
            padding: 0;
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.25;
            text-decoration: none;
          }

          .card-content {
            flex-grow: 1;
            margin-block-end: 1.125rem;
            padding-inline: 1rem;

            p {
              word-wrap: break-word;
            }
          }

          .color-text {
            color: #161616 !important;
          }

          .font-size-lg {
            font-size: 1.125rem !important;
          }
        }

        .margin-top-xs {
          margin-block-start: 1rem !important;
        }

        .margin-bottom-none {
          margin-block-end: 0 !important;
        }

        .margin-left-none {
          margin-inline-start: 0 !important;
        }

        .has-line-height-reset {
          line-height: 1.5 !important;
        }

        ul {
          margin: 16px 0 16px 38px;
        }

        .margin-bottom-xxs {
          margin-block-end: .5rem !important;
        }

        .font-size-sm {
          font-size: .875rem !important;
        }

        .is-unstyled {
          list-style-type: none !important;
        }

        .display-flex {
          display: flex !important;
        }

        .justify-content-flex-start {
          justify-content: flex-start !important;
        }

        .has-text-wrap {
          word-wrap: break-word !important;
          white-space: normal !important;
          word-break: break-word !important;
          height: auto !important;
        }

        .font-size-md {
          font-size: 1rem !important;
        }

        // .icon {
        //     justify-content: center;
        //     align-items: center;
        //     display: inline-flex;
        //     width: 1em;
        //     height: 1em;
        //     margin-right: 8px;
        //     position: relative;
        //     top: 2px;
        // }
        //.has-text-primary {
        //color: #333 !important;
        //}
        .is-full-height {
          height: 100%;
        }
      }

      .el-tree-node__expand-icon {
        transform: rotate(0deg) !important;
      }

      .el-tree-node__expand-icon.expanded {
        transform: rotate(90deg) !important;
      }

      .docon {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
      }

      .docon-search:before {
        content: "\e762";
      }

      .docon-filter-settings:before {
        content: "\e762";
      }

      .docon-chevron-right-light:before {
        content: "\e743";
      }

      .tree-expander {
        padding-left: 22px;
      }

      .tree-expander-indicator {
        transform: rotate(-90deg) !important;
      }

      .tree-expander-indicator.is-expanded {
        transform: rotate(0deg) !important;
      }

      #LeftTree [class*=" el-icon-"],
      #LeftTree [class^=el-icon-] {
        font-family: "iconfont" !important;
        font-size: 14px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
      }

      .el-icon-caret-right:before {
        content: "\e743" !important;
      }

      .el-tree-node__expand-icon {
        font-weight: bold;
        color: #161616;
      }

      .el-tree-node__content {
        color: #161616;
        line-height: 1;
      }

      .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        color: #171717;
        font-weight: bold;
        background-color: #f2f2f2;
      }

      .el-tree--highlight-current .el-tree-node {
        padding-top: 2px;
        padding-bottom: 2px;
        display: block;
      }

      .el-tree {
        background: transparent !important;
      }

      .el-tree-node:hover>.el-tree-node__content {
        background-color: #f2f2f2;
      }

      .theme-dark .el-tree-node .el-tree-node__content {
        color: #fff !important;
      }

      .theme-dark .el-tree-node.is-current>.el-tree-node__content {
        background-color: #2f2f2f;
      }

      .theme-dark .el-tree-node:hover>.el-tree-node__content {
        background-color: #2f2f2f;
      }

      .theme-dark .el-tree-node__expand-icon {
        color: #fff !important;
      }

      .theme-high-contrast .el-tree-node .el-tree-node__content {
        color: #fff !important;
      }

      .theme-high-contrast .el-tree-node.is-current>.el-tree-node__content {
        background-color: #2f2f2f;
      }

      .theme-high-contrast .el-tree-node:hover>.el-tree-node__content {
        background-color: #2f2f2f;
        color: #ff0 !important;
      }

      .theme-high-contrast .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        color: #ff0 !important;
      }

      .theme-high-contrast .el-tree-node__expand-icon {
        color: #fff !important;
      }

      .el-tree-node__expand-icon.is-leaf:before {
        content: "" !important;
      }

      .el-tree-node .el-tree-node__children {
        padding-left: 15px !important;
      }

      .el-pagination {
        margin: 0 auto;
      }

      .nav-bar-logo {
        width: 165px;
        height: 23px;
        display: flex;
        align-items: center;
      }

      html body a,
      html body a:hover,
      .nav-bar-profile .docs-sign-in {
        text-decoration: none !important;
      }

      .nav-bar-button:active.has-hover-underline:not([aria-expanded=true])> :first-child:after,
      .nav-bar-button.is-active.has-hover-underline:not([aria-expanded=true])> :first-child:after,
      .nav-bar-button:hover.has-hover-underline:not([aria-expanded=true])> :first-child:after,
      .nav-bar-button:focus-visible.has-hover-underline:not([aria-expanded=true])> :first-child:after {
        border: none;
      }

      .nav-bar-item .nav-bar-button span {
        padding: 5px 10px;
        font-size: 15px;
      }

      .nav-bar-item.is-category>.is-title span {
        font-size: 1.125rem;
      }

      .nav-bar-item .nav-bar-button span:hover {
        background: #f2f2f2;
      }

      .nav-bar-item.active .nav-bar-button span {
        background: #f2f2f2;
      }

      .nav-bar-item.is-category:before {
        margin-right: 0.5rem;
      }

      .docon-topic-get-started:before {
        content: "\e72a";
      }

      .keyword {
        color: red !important;
      }

      .theme-high-contrast .keyword {
        color: #ff0 !important;
      }

      .columns.is-gapless {
        margin-top: 15px;
      }

      [v-cloak] {
        display: none;
      }

      .el-tree-node__expand-icon.is-leaf {
        padding-left: 20px;
      }

      .theme-dark .nav-bar-item.active .nav-bar-button span,
      .theme-dark .nav-bar-item .nav-bar-button span:hover {
        background-color: #2f2f2f;
        color: #fff !important;
      }

      .theme-high-contrast .nav-bar-item.active .nav-bar-button span,
      .theme-high-contrast .nav-bar-item .nav-bar-button span:hover {
        background-color: #2f2f2f;
        color: #ff0 !important;
      }

      .nav-bar-logo {
        width: 150px;
      }

      body {
        background: transparent !important;
      }

      .columns.is-masonry {
        height: auto !important;
      }

      .columns.has-large-gaps {
        margin-top: -1.5rem;
        margin-left: -1.5rem;
        margin-right: -1.5rem;
        display: flex;
      }

      .column.is-one-quarter-desktop {
        width: 25%;
        flex: none;
      }

      .columns.has-large-gaps>.column {
        padding: 1.5rem;
      }

      .display-flex {
        display: flex !important;
      }

      .flex-direction-column {
        flex-direction: column !important;
      }

      .position-sticky {
        position: sticky !important;
      }

      .margin-top-sm-tablet {
        margin-block-start: 1.5rem !important;
      }

      .margin-bottom-xxs {
        margin-block-end: .5rem !important;
      }

      .display-block {
        display: block !important;
      }

      .autocomplete {
        display: inline-block;
        position: relative;
      }

      .control {
        text-align: left;
        font-size: 1rem;
        position: relative;
      }

      .input {
        min-height: 2.25em;
        -webkit-appearance: none;
        appearance: none;
        box-shadow: none;
        vertical-align: top;
        border: 1px solid #0000;
        border-radius: .125rem;
        justify-content: flex-start;
        align-items: center;
        padding-block: calc(.375em - 1px);
        padding-inline: calc(.625em - 1px);
        font-size: 1rem;
        line-height: 1.5;
        display: inline-flex;
        position: relative;
        width: 100%;
        max-width: 100%;
        border-color: #757575;
        background-color: #fff;
        color: #161616;
      }

      .input.input-sm {
        font-size: .875rem;
      }

      .input.input-sm:active,
      .input.input-sm:focus-visible,
      .input.input-sm:focus {
        border: 2px solid #1055BC !important;
        outline: none !important;
      }

      .control.has-icons-left .input,
      .control.has-icons-left .select select {
        padding-inline-start: 2.25em;
      }

      .control.has-icons-left .icon,
      .control.has-icons-right .icon {
        color: var(--theme-secondary-background);
        width: 2.25em;
        height: 2.25em;
        pointer-events: none;
        z-index: 4;
        position: absolute;
        top: 0;
      }

      .control.has-icons-left .icon.is-left {
        inset-inline-start: 0;
      }

      .control.has-icons-left .input.input-sm~.icon {
        font-size: .875rem;
      }

      .autocomplete-loader {
        position: absolute;
        inset-block-start: 8px;
        inset-inline-end: 10px;
      }

      .el-tree-node__expand-icon {
        font-size: 16px;
      }

      .column.is-three-quarters-desktop {
        width: 75%;
        flex: none;
      }

      .column.is-11-desktop {
        width: 91.6667%;
        flex: none;
      }

      .font-size-h2 {
        font-size: 2.125rem !important;
      }

      .content p {
        word-wrap: break-word;
        margin-top: 1rem;
        margin-bottom: 0;
      }

      .has-line-height-reset {
        line-height: 1.3 !important;
      }

      #affixed-right-container .docon:before {
        content: "\e72a" !important;
        position: relative;
        top: 0px;
      }

      .docon-filter-settings:before {
        content: "\e762" !important;
      }

      #article-header-page-actions,
      #user-feedback {
        display: none !important;
      }

      .breadcrumbs-item:after {
        content: '/';
        margin: 0 8px;
      }

      .metadata.page-metadata li:after {
        //content: '·';
        content: '';
      }

      .metadata.page-metadata li:last-child:after {
        content: '';
      }

      .el-tree-node__expand-icon.is-leaf {
        padding-left: 6px;
      }

      .padding-block-lg .columns>.column:not(.has-uhf-padding) {
        padding: 23px;
      }

      .padding-block-lg {
        padding: 30px 60px !important;
      }

      .padding-block-lg ul {
        margin: 16px 0;
      }

      .ContentMain {
        padding-top: 0px;
      }

      .content h1:first-of-type {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
