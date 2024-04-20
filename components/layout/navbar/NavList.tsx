import { Archive, Award, Bell, Camera, Code, DollarSign, Eclipse, FolderKanban, Headphones, Layers, LayoutDashboard, MapPin, Navigation, Navigation2, Package, PenTool, PieChart, Settings, User, Users } from "lucide-react"

export const NavList = (roleId: string) => {
    let navList = []
    if (roleId === '2') {
        navList = [
            {
                label: "Analyse",
                options: [{ title: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard size={18} className="mr-1" /> }]
            },
            {
                label: "Manage",
                options: [
                    { title: "Campaign Manager", path: "/campaign-manager", icon: <Settings size={18} className="mr-1" /> },
                    { title: "Creative Manager", path: "/creative-manager", icon: <Camera size={18} className="mr-1" /> },
                    { title: "Advertisers", path: "/advertisers", icon: <Award size={18} className="mr-1" /> },
                    { title: "Inventory", path: "/inventory", icon: <Archive size={18} className="mr-1" /> }
                ]
            },
            {
                label: "Reports",
                options: [
                    { title: "Traffic & Revenue", path: "/traffic-report", icon: <Navigation size={18} className="mr-1" /> },
                    { title: "Campaign Report", path: "/campaign-report", icon: <PieChart size={18} className="mr-1" /> },
                    { title: "Creative Report", path: "/creative-report", icon: <FolderKanban size={18} className="mr-1" /> },
                    { title: "SiteApp Report", path: "/siteapp-report", icon: <Package size={18} className="mr-1" /> },
                    { title: "Geo Report", path: "/geo-report", icon: <MapPin size={18} className="mr-1" /> },
                    { title: "AdSlot Report", path: "/adslot-report", icon: <Eclipse size={18} className="mr-1" /> }
                ]
            },
            {
                label: "Tools",
                options: [
                    { title: "Audiences", path: "/audiences", icon: <Users size={18} className="mr-1" /> },
                    { title: "Applists", path: "/applists", icon: <Layers size={18} className="mr-1" /> },
                    { title: "Bid Multiplier", path: "/bid-multiplier", icon: <DollarSign size={18} className="mr-1" /> }
                ]
            },
            {
                label: "Settings",
                options: [
                    { title: "Manage Users", path: "/manage-users", icon: <User size={18} className="mr-1" /> },
                    { title: "Admin Tools", path: "/admin-tools", icon: <PenTool size={18} className="mr-1" /> }
                ]
            }
        ]
    } else {
        navList = [
            {
                label: "Analyse",
                options: [{ title: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} className="mr-1" /> }]
            },
            {
                label: "Manage",
                options: [{ title: "Campaigns", path: "/campaigns", icon: <Bell size={18} className="mr-1" /> }]
            },
            {
                label: "Assets",
                options: [
                    { title: "Creatives", path: "/creatives", icon: <Camera size={18} className="mr-1" /> },
                    { title: "Audiences", path: "/audiences", icon: <Users size={18} className="mr-1" /> },
                    { title: "Applists", path: "/applists", icon: <Layers size={18} className="mr-1" /> }
                ]
            },
            {
                label: "Reports",
                options: [
                    { title: "Campaign Report", path: "/campaign-report", icon: <PieChart size={18} className="mr-1" /> },
                    { title: "Creative Report", path: "/creative-report", icon: <FolderKanban size={18} className="mr-1" /> },
                    { title: "SiteApp Report", path: "/siteapp-report", icon: <Package size={18} className="mr-1" /> }
                ]
            },
            {
                label: "Tools",
                options: [
                    { title: "Optimization", path: "/optimization", icon: <Navigation2 size={18} className="mr-1" /> },
                    { title: "Bid Multiplier", path: "/bid-multiplier", icon: <DollarSign size={18} className="mr-1" /> },
                    { title: "Macros", path: "/macros", icon: <Code size={18} className="mr-1" /> },
                    { title: "Support", path: "/support", icon: <Headphones size={18} className="mr-1" /> }
                ]
            }
        ]
    }

    return navList
}