import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-300",
            )}>
                <Navbar setMobileOpen={setMobileOpen} />

                <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
