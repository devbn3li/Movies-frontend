import { Home } from "lucide-react"
import { MdLiveTv } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { RiMovieLine } from "react-icons/ri";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Latest Movies",
    url: "#",
    icon: BiMoviePlay,
  },
  {
    title: "Latest TV Shows",
    url: "#",
    icon: MdLiveTv,
  },
]

const Categories = [
  {
    title: "Action",
    url: "#",
    icon: RiMovieLine,
  },
  {
    title: "Comedy",
    url: "#",
    icon: RiMovieLine,
  },
  {
    title: "Drama",
    url: "#",
    icon: RiMovieLine,
  },
  {
    title: "Horror",
    url: "#",
    icon: RiMovieLine,
  },
  {
    title: "Romance",
    url: "#",
    icon: RiMovieLine,
  },
];

export function AppSidebar() {
  return (
    <Sidebar  className="fixed top-[64px] left-0 z-40 h-[calc(100vh-64px)] w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Categories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}