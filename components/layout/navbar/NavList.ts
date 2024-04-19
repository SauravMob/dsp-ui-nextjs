export const NavList = (roleId: string) => {
    let navList = []
    if (roleId === '2') {
        navList = [
            {
                label: "Analyse",
                options: [{ title: "Dashboard", path: "/admin-dashboard   " }]
            },
            {
                label: "Manage",
                options: [
                    { title: "Campaign Manager", path: "/campaign-manager" },
                    { title: "Creative Manager", path: "/creative-manager" },
                    { title: "Advertisers", path: "/advertisers" },
                    { title: "Inventory", path: "/inventory" }
                ]
            },
            {
                label: "Reports",
                options: [
                    { title: "Traffic Report", path: "/traffic-report" },
                    { title: "Campaign Report", path: "/campaign-report" },
                    { title: "Creative Report", path: "/creative-report" },
                    { title: "SiteApp Report", path: "/siteapp-report" },
                    { title: "Geo Report", path: "/geo-report" },
                    { title: "AdSlot Report", path: "/adslot-report" }
                ]
            },
            {
                label: "Tools",
                options: [
                    { title: "Audiences", path: "/audiences" },
                    { title: "Applists", path: "/applists" },
                    { title: "Bid Multiplier", path: "/bid-multiplier" }
                ]
            },
            {
                label: "Settings",
                options: [
                    { title: "Manage Users", path: "/manage-users" },
                    { title: "Admin Tools", path: "/admin-tools" }
                ]
            }
        ]
    } else {
        navList = [
            {
                label: "Analyse",
                options: [{ title: "Dashboard", path: "/" }]
            },
            {
                label: "Manage",
                options: [{ title: "Campaigns", path: "/campaigns" }]
            },
            {
                label: "Assets",
                options: [
                    { title: "Creatives", path: "/creatives" },
                    { title: "Audiences", path: "/audiences" },
                    { title: "Applists", path: "/applists" }
                ]
            },
            {
                label: "Reports",
                options: [
                    { title: "Campaign Report", path: "/campaign-report" },
                    { title: "Creative Report", path: "/creative-report" },
                    { title: "SiteApp Report", path: "/siteapp-report" }
                ]
            },
            {
                label: "Tools",
                options: [
                    { title: "Optimization", path: "/optimization" },
                    { title: "Bid Multiplier", path: "/bid-multiplier" },
                    { title: "Macros", path: "/macros" },
                    { title: "Support", path: "/support" }
                ]
            }
        ]
    }

    return navList
}