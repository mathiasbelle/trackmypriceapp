import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

interface ProfileLayoutProps {
    children: React.ReactNode;
}
export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div>
            <SidebarProvider className="w-auto">
                <AppSidebar />
                <SidebarTrigger />
                {children}
            </SidebarProvider>
        </div>
    );
}
