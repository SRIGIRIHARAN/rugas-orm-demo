
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Sidebar as SidebarComponent, 
  SidebarContent,
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  ShoppingBag, 
  PackageCheck,
  Settings,
  BarChartBig
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Customers",
      icon: Users,
      path: "/customers",
    },
    {
      title: "Products",
      icon: ShoppingBag,
      path: "/products",
    },
    {
      title: "Orders",
      icon: PackageCheck,
      path: "/orders",
    },
  ];

  return (
    <SidebarComponent>
      <div className="p-4">
        <h1 className="text-xl font-bold tracking-tighter">Rugas ORM Demo</h1>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        isActive 
                          ? "flex items-center gap-3 text-primary font-medium" 
                          : "flex items-center gap-3 text-muted-foreground hover:text-foreground"
                      }
                    >
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
