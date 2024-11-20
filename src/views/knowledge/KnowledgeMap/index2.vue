<template>
  <div class="KnowledgeMapSecond">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-bd">
        <section id="hero" class="hero  has-background-docs has-text-docs-invert hero-xs background-image-pattern background-size-200">
          <div class="hero-content">
            <h1 id="hero-title" class="title">{{ParentSubjectName||'暂无标题'}}</h1>
              <p id="hero-summary" class="margin-none padding-top-xs">{{Description||'暂无说明'}}</p>
          </div>
        </section>
          <section id="conceptual-content" class="padding-block-lg">
            <div class="uhf-container anchor-headings">
              <div class="heading-wrapper">
                <h2 class="margin-top-none margin-bottom-sm heading-anchor">目录</h2>
              </div>
              <div class="columns is-multiline">
                <div class="column is-6-tablet is-3-desktop" v-for="(item,index) in listData" :key="index">
                    <article class="card is-full-height">
                      <div class="card-content">
                        <p class="card-title color-text font-size-lg">{{item.Name||''}}</p>
                        <ul class="has-line-height-reset margin-left-none margin-bottom-none margin-top-xs">
                            <li class="is-unstyled margin-bottom-xxs font-size-sm" v-for="(item2,index2) in listDataDetail[item.id]" :key="index2">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a :href="'/#/lightning/page/KnowledgeMapDetail?id='+item2.id+'&SubjectId='+data.id" target="_blank" class="has-external-link-indicator" data-linktype="relative-path">{{ item2.Name||'' }}</a>
                              </div>
                            </li>
                        </ul>
                      </div>
                    </article>
                  </div>
                  <!-- <div class="column is-6-tablet is-3-desktop">
                    <article class="card is-full-height">
                      <div class="card-content">
                        <p class="card-title color-text font-size-lg">Microsoft Build of OpenJDK</p>
                        <ul class="has-line-height-reset margin-left-none margin-bottom-none margin-top-xs">
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/#/lightning/page/KnowledgeMapDetail?id=1" target="_blank" class="has-external-link-indicator" data-linktype="relative-path">概述</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-download"></span>
                                </span>
                                <a href="/#/lightning/page/KnowledgeMapDetail?id=11" target="_blank" class="has-external-link-indicator" data-linktype="relative-path">下载 JDK</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-get-started"></span>
                                </span>
                                <a href="/#/lightning/page/KnowledgeMapDetail?id=12" target="_blank" class="has-external-link-indicator" data-linktype="relative-path">安装 JDK</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-reference"></span>
                                </span>
                                <a href="/#/lightning/page/KnowledgeMapDetail?id=13" target="_blank" class="has-external-link-indicator" data-linktype="relative-path">容器映像</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-reference"></span>
                                </span>
                                <a href="/#/lightning/page/KnowledgeMapDetail?id=4" target="_blank" class="has-external-link-indicator" data-linktype="relative-path">支持</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/#/lightning/page/KnowledgeMapDetail?id=3" target="_blank" class="has-external-link-indicator" data-linktype="relative-path">了解详细信息</a>
                              </div>
                            </li>
                        </ul>
                      </div>
                    </article>
                  </div>
                  <div class="column is-6-tablet is-3-desktop">
                    <article class="card is-full-height">
                      <div class="card-content">
                        <p class="card-title color-text font-size-lg">Visual Studio Code for Java</p>
                        <ul class="has-line-height-reset margin-left-none margin-bottom-none margin-top-xs">
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-get-started"></span>
                                </span>
                                <a href="https://code.visualstudio.com/docs/java/java-tutorial#_coding-pack-for-java" class="has-external-link-indicator" data-linktype="external">安装 Java 编码包</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-how-to-guide"></span>
                                </span>
                                <a href="https://code.visualstudio.com/docs/java/java-debugging" class="has-external-link-indicator" data-linktype="external">运行和调试 Java 代码</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-quickstart"></span>
                                </span>
                                <a href="https://code.visualstudio.com/docs/java/java-testing" class="has-external-link-indicator" data-linktype="external">Java 测试框架</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-how-to-guide"></span>
                                </span>
                                <a href="https://code.visualstudio.com/docs/java/java-project" class="has-external-link-indicator" data-linktype="external">如何管理 Java 项目</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://code.visualstudio.com/docs/java/java-build" class="has-external-link-indicator" data-linktype="external">Apache Maven 和 Gradle 支持</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://code.visualstudio.com/docs/java" class="has-external-link-indicator" data-linktype="external">了解详细信息</a>
                              </div>
                            </li>
                        </ul>
                      </div>
                    </article>
                  </div>
                  <div class="column is-6-tablet is-3-desktop">
                    <article class="card is-full-height">
                      <div class="card-content">
                        <p class="card-title color-text font-size-lg">面向 Java 开发人员的 GitHub</p>
                        <ul class="has-line-height-reset margin-left-none margin-bottom-none margin-top-xs">
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot" class="has-external-link-indicator" data-linktype="external">适用于 IntelliJ 的 GitHub Copilot</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot?tool=vscode" class="has-external-link-indicator" data-linktype="external">适用于 Visual Studio Code 的 GitHub Copilot</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://github.com/marketplace/actions/setup-java-jdk" class="has-external-link-indicator" data-linktype="external">在 GitHub Actions 中使用 Java</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-how-to-guide"></span>
                                </span>
                                <a href="https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry" class="has-external-link-indicator" data-linktype="external">将项目发布到包注册表</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://github.com/Microsoft/vscode-remote-try-java" class="has-external-link-indicator" data-linktype="external">GitHub Codespaces for Java</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://docs.github.com/en/get-started/learning-about-github/github-language-support#core-languages-supported-by-github-features" class="has-external-link-indicator" data-linktype="external">Java 存储库支持的功能</a>
                              </div>
                            </li>
                        </ul>
                      </div>
                    </article>
                  </div>
                  <div class="column is-6-tablet is-3-desktop">
                    <article class="card is-full-height">
                      <div class="card-content">
                        <p class="card-title color-text font-size-lg">Microsoft Graph SDK for Office 365</p>
                        <ul class="has-line-height-reset margin-left-none margin-bottom-none margin-top-xs">
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-get-started"></span>
                                </span>
                                <a href="/zh-cn/graph/sdks/sdk-installation#install-the-microsoft-graph-java-sdk" class="has-external-link-indicator" data-linktype="absolute-path">安装 Java SDK for Microsoft Graph</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-tutorial"></span>
                                </span>
                                <a href="/zh-cn/graph/tutorials/java" class="has-external-link-indicator" data-linktype="absolute-path">将应用与 Microsoft Office 365 集成</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-how-to-guide"></span>
                                </span>
                                <a href="/zh-cn/graph/sdks/create-client?tabs=Java" class="has-external-link-indicator" data-linktype="absolute-path">如何创建 Java 客户端实例</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-how-to-guide"></span>
                                </span>
                                <a href="/zh-cn/graph/sdks/create-requests?tabs=java" class="has-external-link-indicator" data-linktype="absolute-path">如何进行 API 调用</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/zh-cn/graph/sdks/sdks-overview" class="has-external-link-indicator" data-linktype="absolute-path">了解详细信息</a>
                              </div>
                            </li>
                        </ul>
                      </div>
                    </article>
                  </div>
                  <div class="column is-6-tablet is-3-desktop">
                    <article class="card is-full-height">
                      <div class="card-content">
                        <p class="card-title color-text font-size-lg">Azure 上的 Java</p>
                        <ul class="has-line-height-reset margin-left-none margin-bottom-none margin-top-xs">
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-quickstart"></span>
                                </span>
                                <a href="/zh-cn/azure/app-service/app-service-web-get-started-java" class="has-external-link-indicator" data-linktype="absolute-path">在 Azure 应用服务中创建 Java 应用</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-quickstart"></span>
                                </span>
                                <a href="/zh-cn/azure/spring-cloud/spring-cloud-quickstart-launch-app-portal" class="has-external-link-indicator" data-linktype="absolute-path">部署 Spring Boot 应用程序</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/zh-cn/azure/developer/java/sdk/" class="has-external-link-indicator" data-linktype="absolute-path">用于 Java 的 Azure SDK</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/zh-cn/azure/developer/java/spring-framework/" class="has-external-link-indicator" data-linktype="absolute-path">Azure 上的 Spring 集成</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/zh-cn/azure/developer/java/ee/" class="has-external-link-indicator" data-linktype="absolute-path">Java EE、Jakarta EE 和 MicroProfile</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/zh-cn/azure/developer/java/" class="has-external-link-indicator" data-linktype="absolute-path">了解详细信息</a>
                              </div>
                            </li>
                        </ul>
                      </div>
                    </article>
                  </div>
                  <div class="column is-6-tablet is-3-desktop">
                    <article class="card is-full-height">
                      <div class="card-content">
                        <p class="card-title color-text font-size-lg">Azure 上的 Java 工具</p>
                        <ul class="has-line-height-reset margin-left-none margin-bottom-none margin-top-xs">
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-get-started"></span>
                                </span>
                                <a href="/zh-cn/azure/developer/java/toolkit-for-intellij/" class="has-external-link-indicator" data-linktype="absolute-path">Azure Toolkit for IntelliJ</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-get-started"></span>
                                </span>
                                <a href="/zh-cn/azure/developer/java/toolkit-for-eclipse/" class="has-external-link-indicator" data-linktype="absolute-path">用于 Eclipse 的 Azure 工具包</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://github.com/Microsoft/azure-maven-plugins#readme" class="has-external-link-indicator" data-linktype="external">适用于 Azure 的 Apache Maven 插件</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://github.com/microsoft/azure-maven-archetypes" class="has-external-link-indicator" data-linktype="external">适用于 Azure 的 Apache Maven 原型</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://github.com/Microsoft/azure-gradle-plugins#readme" class="has-external-link-indicator" data-linktype="external">适用于 Azure 的 Gradle 插件</a>
                              </div>
                            </li>
                        </ul>
                      </div>
                    </article>
                  </div>
                  <div class="column is-6-tablet is-3-desktop">
                    <article class="card is-full-height">
                      <div class="card-content">
                        <p class="card-title color-text font-size-lg">Microsoft JDBC Driver for SQL Server</p>
                        <ul class="has-line-height-reset margin-left-none margin-bottom-none margin-top-xs">
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-get-started"></span>
                                </span>
                                <a href="/zh-cn/sql/connect/jdbc/getting-started-with-the-jdbc-driver" class="has-external-link-indicator" data-linktype="absolute-path">入门</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/zh-cn/sql/connect/jdbc/securing-jdbc-driver-applications" class="has-external-link-indicator" data-linktype="absolute-path">保护与数据库连接的 Java 应用</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/zh-cn/sql/connect/jdbc/improving-performance-and-reliability-with-the-jdbc-driver" class="has-external-link-indicator" data-linktype="absolute-path">提高性能和可靠性</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/zh-cn/sql/connect/jdbc/diagnosing-problems-with-the-jdbc-driver" class="has-external-link-indicator" data-linktype="absolute-path">诊断 JDBC 驱动程序的问题</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="/zh-cn/sql/connect/jdbc/programming-guide-for-jdbc-sql-driver" class="has-external-link-indicator" data-linktype="absolute-path">了解详细信息</a>
                              </div>
                            </li>
                        </ul>
                      </div>
                    </article>
                  </div>
                  <div class="column is-6-tablet is-3-desktop">
                    <article class="card is-full-height">
                      <div class="card-content">
                        <p class="card-title color-text font-size-lg">其他资源</p>
                        <ul class="has-line-height-reset margin-left-none margin-bottom-none margin-top-xs">
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-reference"></span>
                                </span>
                                <a href="/zh-cn/java/api" class="has-external-link-indicator" data-linktype="absolute-path">从 Microsoft 浏览 Java API</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-sample"></span>
                                </span>
                                <a href="/zh-cn/samples/browse/?languages=java" class="has-external-link-indicator" data-linktype="absolute-path">浏览适用于 Java 的代码示例</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-training"></span>
                                </span>
                                <a href="/zh-cn/dual-screen/android/get-duo-sdk" class="has-external-link-indicator" data-linktype="absolute-path">Java SDK for Surface Duo</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-quickstart"></span>
                                </span>
                                <a href="/zh-cn/appcenter/build/android/" class="has-external-link-indicator" data-linktype="absolute-path">使用 App Center 生成适用于 Android 的应用</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-get-started"></span>
                                </span>
                                <a href="https://playwright.dev/java/docs/intro" class="has-external-link-indicator" data-linktype="external">用于浏览器端到端测试的 Playwright</a>
                              </div>
                            </li>
                            <li class="is-unstyled margin-bottom-xxs font-size-sm">
                              <div class="justify-content-flex-start display-flex is-fullwidth font-size-sm has-text-wrap">
                                <span class="icon font-size-md has-text-primary margin-right-xxs" aria-hidden="true">
                                  <span class="docon docon-topic-overview"></span>
                                </span>
                                <a href="https://github.com/microsoft/botbuilder-java#readme" class="has-external-link-indicator" data-linktype="external">Microsoft Bot Framework for Java</a>
                              </div>
                            </li>
                        </ul>
                      </div>
                    </article>
                  </div> -->
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
//import "@/style/knowledge/site-ltr.less";
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
  Description:''
});
const { id,height,listData,loading,listDataDetail,ParentSubjectName,Description} = toRefs(data);
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
onMounted(() => {
  let h = document.documentElement.clientHeight;
      data.height=h;
      window.addEventListener("resize", (e) => {
        let h = document.documentElement.clientHeight;
        data.height=h;
      });
      getQuery();
      getDetail();
})
</script>
<style lang="less">
.KnowledgeMapSecond {
  width: 100%;
  .panel{
    //padding: 12px 8px;
    padding:0;
    margin-bottom: 0;
    background: #e8edf4;
    overflow-x: hidden;
    border-radius: 0;
      .panel-bd{
        background: #fff;
        height: calc(~'100% - 0px') !important;
        overflow-y: auto;
        .padding-block-lg .margin-bottom-xxs.font-size-sm{
          margin-block-end: 12px !important;
        }
        #hero{
          padding-inline: 70px;
          background-size: 200px;
          flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    display: flex;
    position: relative;
    color: #fff !important;
    background-color: #243a5e !important;
    outline-color: #fff !important;
    .hero-content{
        min-height: 200px;
        padding-block: 3rem;
    }
#hero-title{
  font-weight: 600;
  word-wrap: break-word;
    word-break: break-word;
    font-size: 40px;
    line-height: 1.3;
    margin-top: -10px;
    margin-bottom: 0;
}
#hero-summary{
  margin: 0 !important;
  padding-block-start: 1.5rem !important;
  word-wrap: break-word;
    margin-top: 1rem;
    margin-bottom: 0;
}
        }
        a{
          color: #1055BC;
        }
        .uhf-container{
          width: 100%;
          max-width: 100%;
          height: 100%;
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
                line-height: 16px;
                display: inline-block;
            }
            .docon:before {
                content: "\e72a";
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
                .card-title{
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
                    p{
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
            ul{
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
            .icon {
                justify-content: center;
                align-items: center;
                display: inline-flex;
                width: 1em;
                height: 1em;
                margin-right: 8px;
                position: relative;
                top: 2px;
            }
            .has-text-primary {
                color: #0065b3 !important;
            }
            .is-full-height {
                height: 100%;
            }
        }
        
      }
    }
}
</style>
