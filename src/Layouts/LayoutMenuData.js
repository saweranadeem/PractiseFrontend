import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  //Calender
  const [isCalender, setCalender] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  // Pages
  const [isLanding, setIsLanding] = useState(false);
  const [isCpt, setIsCpt] = useState(false);
  const [isAuthorization, setIsAuthorization] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
    if (iscurrentState !== "Cpt") {
      setIsCpt(false);
    }
    if (iscurrentState !== "Authorization") {
      setIsAuthorization(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
    isAuthorization,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },

    {
      id: "apps",
      label: "Calender",
      icon: "ri-apps-2-line",
      link: "/apps-calendar",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
    },
    {
      id: "apps",
      label: "Clinics",
      icon: "ri-hospital-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: "calendar",
          label: "List All Clinics",
          link: "/clinics-list",
          parentId: "apps",
          click: function (e) {
            e.preventDefault();
            setCalender(!isCalender);
          },
          stateVariables: isCalender,
        },
        {
          id: "chat",
          label: "Add Clinics",
          link: "/clinics-create",
          parentId: "apps",
        },
      ],
    },
    {
      id: "authentication",
      label: "Users",
      icon: "ri-account-circle-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsAuth(!isAuth);
        setIscurrentState("Auth");
        updateIconSidebar(e);
      },
      stateVariables: isAuth,
      subItems: [
        {
          id: "signIn",
          label: "Users List",
          link: "/users-list",
          click: function (e) {
            e.preventDefault();
            setIsSignIn(!isSignIn);
          },
          parentId: "authentication",
          stateVariables: isSignIn,
        },
        {
          id: "signUp",
          label: "Add User",
          link: "/users-create",
          click: function (e) {
            e.preventDefault();
            setIsSignUp(!isSignUp);
          },
          parentId: "authentication",
          stateVariables: isSignUp,
        },
      ],
    },
    {
      id: "pages",
      label: "Patients",
      icon: "ri-pages-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },
      stateVariables: isPages,
      subItems: [
        {
          id: "starter",
          label: "Patients List",
          link: "/patients-list",
          parentId: "pages",
        },
        {
          id: "create-patient",
          label: "Create Patient",
          link: "/patient-create",
          parentId: "pages",
        },
        // {
        //   id: "profile",
        //   label: "Profile",
        //   link: "/#",
        //   isChildItem: true,
        //   click: function (e) {
        //     e.preventDefault();
        //     setIsProfile(!isProfile);
        //   },
        //   parentId: "pages",
        //   stateVariables: isProfile,
        //   childItems: [
        //     {
        //       id: 1,
        //       label: "Simple Page",
        //       link: "/pages-profile",
        //       parentId: "pages",
        //     },
        //     {
        //       id: 2,
        //       label: "Settings",
        //       link: "/pages-profile-settings",
        //       parentId: "pages",
        //     },
        //   ],
        // },
        // { id: "team", label: "Team", link: "/pages-team", parentId: "pages" },
        // {
        //   id: "timeline",
        //   label: "Timeline",
        //   link: "/pages-timeline",
        //   parentId: "pages",
        // },
        // { id: "faqs", label: "FAQs", link: "/pages-faqs", parentId: "pages" },
        // {
        //   id: "pricing",
        //   label: "Pricing",
        //   link: "/pages-pricing",
        //   parentId: "pages",
        // },
        // {
        //   id: "gallery",
        //   label: "Gallery",
        //   link: "/pages-gallery",
        //   parentId: "pages",
        // },
        // {
        //   id: "maintenance",
        //   label: "Maintenance",
        //   link: "/pages-maintenance",
        //   parentId: "pages",
        // },
        // {
        //   id: "comingSoon",
        //   label: "Coming Soon",
        //   link: "/pages-coming-soon",
        //   parentId: "pages",
        // },
        // {
        //   id: "sitemap",
        //   label: "Sitemap",
        //   link: "/pages-sitemap",
        //   parentId: "pages",
        // },
        // {
        //   id: "searchResults",
        //   label: "Search Results",
        //   link: "/pages-search-results",
        //   parentId: "pages",
        // },
        // {
        //   id: "PrivecyPolicy",
        //   label: "Privacy Policy",
        //   link: "/pages-privacy-policy",
        //   parentId: "pages",
        // },
        // {
        //   id: "TermsCondition",
        //   label: "Terms Condition",
        //   link: "/pages-terms-condition",
        //   parentId: "pages",
        // },
        // {
        //   id: "blogs",
        //   label: "Blogs",
        //   link: "/#",
        //   isChildItem: true,
        //   badgeColor: "success", badgeName: "New",
        //   click: function (e) {
        //     e.preventDefault();
        //     setIsBlog(!isBlog);
        //   },
        //   parentId: "pages",
        //   stateVariables: isBlog,
        //   childItems: [
        //     { id: 1, label: "List View", link: "/pages-blog-list", parentId: "pages" },
        //     { id: 2, label: "Grid View", link: "/pages-blog-grid", parentId: "pages" },
        //     { id: 3, label: "Overview", link: "/pages-blog-overview", parentId: "pages" },
        //   ]
        // }
      ],
    },
    {
      id: "landing",
      label: "Doctors",
      icon: "ri-rocket-line",
      link: "/#",
      stateVariables: isLanding,
      click: function (e) {
        e.preventDefault();
        setIsLanding(!isLanding);
        setIscurrentState("Landing");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "onePage",
          label: "Add Doctors",
          link: "/doctor-create",
          parentId: "landing",
        },
        {
          id: "nftLanding",
          label: "Doctors Listing",
          link: "/doctors-list",
          parentId: "landing",
        },
      ],
    },
    {
      id: "cpt",
      label: "CPT Codes",
      icon: "ri-rocket-line",
      link: "/#",
      stateVariables: isCpt,
      click: function (e) {
        e.preventDefault();
        setIsCpt(!isCpt);
        setIscurrentState("Cpt");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "onePage",
          label: "Add CPT Codes",
          link: "/cpt-create",
          parentId: "cpt",
        },
        {
          id: "nftLanding",
          label: "CPT Listing",
          link: "/cpt-list",
          parentId: "cpt",
        },
      ],
    },

    {
      id: "authorization",
      label: "Authorization",
      icon: "ri-shield-user-line",
      link: "/#",
      stateVariables: isAuthorization,
      click: function (e) {
        e.preventDefault();
        setIsAuthorization(!isAuthorization);
        setIscurrentState("Authorization");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "addAuth",
          label: "Add Authorization",
          link: "/authorization-create",
          parentId: "authorization",
        },
        {
          id: "listAuth",
          label: "Authorization Listing",
          link: "/authorization-list",
          parentId: "authorization",
        },
      ],
    },

    {
      id: "settings",
      label: "Settings",
      icon: "ri-dashboard-2-line",
      link: "/settings",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
