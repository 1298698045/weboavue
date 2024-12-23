export const routesMapping = {
    // 门户
    Portal: {
        workspace: () => import("../views/home/home.vue"),
        OrgPortal: () => import("../views/NotFound.vue"),
        OrgBranchPortal: () => import("../views/NotFound.vue"),
        PortalAdmin: () => import("../views/NotFound.vue")
    },
    // 流程管理
    FlowManage: {
        WorkflowAdd: () => import("../views/flow/new/index.vue"),
        home: () => import("../views/NotFound.vue"),
        WorkflowDoinglist: () => import("../views/flow/todoList/index.vue"),
        WorkflowDonelist: () => import("../views/flow/completed/index.vue"),
        WorkflowFollowlist: () => import("../views/NotFound.vue"),
        WorkflowMine: () => import("../views/flow/myStart/index.vue"),
        WorkflowSuperviselist: () => import("../views/NotFound.vue"),
        ProcessInstanceHome: () => import("../views/NotFound.vue"),
        WfInstanceAttachFile: () => import("../views/NotFound.vue"),
        WFFormSearch: () => import("../views/flow/formSearch/index.vue"),
        InstaceDashboard: () => import("../views/NotFound.vue"),
        wftask: () => import("../views/NotFound.vue"),
        WFInstance: () => import("../views/flow/workAdmin/index.vue"),
        wfdefinition: () => import("../views/flow/seeting/index.vue"),
        WorkflowSuperviselist:() => import("../views/flow/Supervise/index.vue"),
    },
    // 日程管理
    Workplan: {
        eventhome: () => import("../views/scheduleAdmin/calendar/index.vue"),
        LeaderCalendar: () => import("../views/scheduleAdmin/leader/index.vue"),
        WorkPlanPeopleListView: () => import("../views/scheduleAdmin/schedule/index.vue"),
        CalendarSearch: () => import("../views/scheduleAdmin/search/index.vue")
    },
    // 会议管理
    MeetingManage: {
        ResApply: () => import("../views/meeting/meetingRoom/MeetingRoomUse.vue"),
        Meeting: () => import("../views/meeting/calendar/index.vue"),
        MyMeeting: () => import("../views/meeting/list/index.vue"),
        MeetingSearch: () => import("../views/meeting/search/index.vue"),
        MeetingReport: () => import("../views/meeting/reportForms/index.vue"),
        MeetingItem: () => import("../views/meeting/topics/index.vue"),
        Campaign: () => import("../views/meeting/activity/index.vue"),
        ResourceOrg: () => import("../views/meeting/mettingRoomMaintenance/index.vue")
    },
    // 公文管理
    OfficialDocument: {},
    // 通讯录
    addresslist: {
        OrganizationAddresslist: () => import("../views/oa/addressBook/index.vue"),
        Addresslist: () => import("../views/oa/addressBook/index.vue"),
        BusinessUnitAddresslist: () => import("../views/oa/deptAddressBook/index.vue"),
        PersonalContact: () => import("../views/oa/myAddressBook/index.vue"),
        CollaborationGroup:  () => import("../views/oa/group/index.vue"),
        CampaignSms: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        OASuggestion: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        SmsMessageLog: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        }
    },
    // 知识管理
    content: {
        info: () => import("../views/information/list/Content.vue"),
        KnowledgeHome: () => import("../views/knowledge/Home/index.vue"),
        Video: () => import("../views/knowledge/Video/List.vue"),
        album: () => import("../views/knowledge/Album/index.vue"),
        ContentFolder: () => import("../views/knowledge/Contentfolder/permission.vue"),
        QuestionAnswer: () => import("../views/knowledge/QuestionAnswer/index.vue"),
        DocumentReadLog: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        ContentViewTemplate: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        KbSubject: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        KbMap: () => import("../views/knowledge/KnowledgeMap/index.vue"),
        ContentChannel: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        KbArticleSearch: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        FileManager: () => import("../views/fileAdmin/index.vue"),
        videomanager: () => import("../views/knowledge/Video/Home.vue"),
        KnowledgeAddWizard: () => import("../views/knowledge/KnowledgeMap/NewKbArticle.vue"),
        Subject: () => import("../views/knowledge/Specialist/index.vue"),
        Notification: () => import("../views/information/list/Notice.vue"), 
    },
    // 制度文件
    DocumentRule: {
        RuleArticle: () => import("../views/knowledge/RuleArticle/myhome/index.vue"), // 我的制度
        RuleArticle: () => import("../views/knowledge/RuleArticle/home/index.vue"), // 制度台账
        KbArticleVersion: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        KbArticleAbolish: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
    },
    // 行政管理
    administration: {
        ReceptionMeal: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        VehicleReservation: () => import("../views/Vehicle/VehicleApply.vue"),
        VehicleUse: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        VehicleMaintain: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        SealUse: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        GoingAbroad: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        vehicle: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
    },
    // 值班管理
    dutyShift: {
        DutyshiftAdmin: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        DutyshiftTreat: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        DutyshiftNurse: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        DutyshiftLeaderAgent: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        DeptDutyShift: () => import("../views/Dutyshift/DutyshiftAdmin/index.vue"),
        WorkshiftDeptDutyshiftQuery: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        DutyShiftSearch: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        DuthshiftLog: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        DutyShiftReport: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
    },
    // 社区交流
    chatter: {
        Chatter: () => import("../views/knowledge/QuestionAnswer/index2.vue"),
        ChatterStatusManager: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
    },
    // 档案管理
    archivemanage: {
        ArchiveLendout: () => import("../views/NotFound.vue"),
        ArchiveDestroy: () => import("../views/NotFound.vue"),
        Archive: () => import("../views/NotFound.vue")
    },
    // 科研项目
    ResearchProject: {
        RsearchprojectHome: () => import("../views/Project/Home.vue"),
        ReasearchProject: () => import("../views/Project/ProjectManager.vue"),
        MyProject: () => import("../views/Project/MyProject.vue"),
        ProjectMember: () => import("../views/NotFound.vue"),
        Contract: () => import("../views/NotFound.vue"),
        Account: () => import("../views/NotFound.vue"),
        ProjectReport: () => import("../views/NotFound.vue")
    },
    // 系统报表
    // report: {
    //     CommonReportHome: () => import("../views/NotFound.vue"),
    //     report: () => import("../views/report/home/index.vue"),
    //     Dashboard: () => import("../views/NotFound.vue"),
    //     ReportIndicatorData: () => import("../views/NotFound.vue"),
    //     ReportIndicator: () => import("../views/NotFound.vue")
    // },
    // 科研成果
    ResearchResult: {
        ProjectPaper: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        ProjectBook: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        ProjectPatent: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        ProjectConference: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        ProjectJournal: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
    },
    // 科研经费
    ResearchFee: {
        ProjectBudget: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
        ProjectExpenditure: {
            component: () => import("../views/listView/index.vue"),
            isCommon: true
        },
    }
}