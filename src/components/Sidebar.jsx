import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ShieldAlert
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
    const { user, logout } = useAuth();

    const links = [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Users', href: '/users', icon: Users, roles: ['admin'] },
        { label: 'Settings', href: '/settings', icon: Settings },
    ];

    const filteredLinks = links.filter(link => {
        if (!link.roles) return true;
        return user && link.roles.includes(user.role);
    });

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed md:static inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col",
                    collapsed ? "w-16" : "w-64",
                    mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                    {!collapsed && (
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent truncate">
                            AdminPanel
                        </span>
                    )}
                    {collapsed && <ShieldAlert className="w-8 h-8 text-primary mx-auto" />}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden md:block p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                    {filteredLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            to={link.href}
                            className={({ isActive }) => cn(
                                "flex items-center px-3 py-2 rounded-md transition-colors group",
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                                collapsed && "justify-center"
                            )}
                        >
                            <link.icon size={20} className={cn(collapsed ? "" : "mr-3")} />
                            {!collapsed && <span>{link.label}</span>}
                            {collapsed && (
                                <div className="absolute left-14 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                                    {link.label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={logout}
                        className={cn(
                            "flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors",
                            collapsed && "justify-center"
                        )}
                    >
                        <LogOut size={20} className={cn(collapsed ? "" : "mr-3")} />
                        {!collapsed && "Logout"}
                    </button>
                </div>
            </aside>
        </>
    );
}
