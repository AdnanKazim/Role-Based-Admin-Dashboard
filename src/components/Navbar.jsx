import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Menu, Moon, Sun, Bell } from 'lucide-react';

export default function Navbar({ setMobileOpen }) {
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();

    return (
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 flex items-center justify-between">
            <div className="flex items-center">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
                >
                    <Menu size={24} />
                </button>
                {/* Breadcrumb or Title placeholder */}
                <h1 className="text-lg font-semibold text-gray-800 dark:text-white hidden sm:block">
                    Dashboard
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notifications */}
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-3 border-l pl-4 border-gray-200 dark:border-gray-700">
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full bg-gray-200"
                    />
                    <div className="hidden md:block text-sm">
                        <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
