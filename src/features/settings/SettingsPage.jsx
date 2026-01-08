import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { mockApi } from '@/services/mockApi';
import { Loader2, User, Lock, Bell, Moon, Sun, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
    const { user, login } = useAuth(); // Re-using login to update local user state if needed, or we'd add update local user func
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Form States
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: false,
    });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            await mockApi.updateUser(user.id, profileData);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
            // In a real app, we would update the global auth context here
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            await mockApi.changePassword(user.id, passwordData.currentPassword, passwordData.newPassword);
            setMessage({ type: 'success', text: 'Password changed successfully' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to change password' });
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'preferences', label: 'Preferences', icon: Bell },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h2>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Tabs Sidebar */}
                <div className="w-full md:w-64 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setMessage({ type: '', text: '' });
                            }}
                            className={cn(
                                "w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                activeTab === tab.id
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    {message.text && (
                        <div className={cn(
                            "mb-6 p-4 rounded-md text-sm",
                            message.type === 'success' ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        )}>
                            {message.text}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Update your account's profile information and email address.</p>
                            </div>
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'security' && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Ensure your account is using a long, random password to stay secure.</p>
                            </div>
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="current_password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                                    <input
                                        id="current_password"
                                        type="password"
                                        required
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="new_password" className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                    <input
                                        id="new_password"
                                        type="password"
                                        required
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="confirm_password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                                    <input
                                        id="confirm_password"
                                        type="password"
                                        required
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Update Password
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appearance</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Customize how the theme looks on your device.</p>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={cn(
                                            "p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all",
                                            theme === 'light' ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700"
                                        )}
                                    >
                                        <Sun className="h-6 w-6" />
                                        <span className="text-sm font-medium">Light</span>
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={cn(
                                            "p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all",
                                            theme === 'dark' ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700"
                                        )}
                                    >
                                        <Moon className="h-6 w-6" />
                                        <span className="text-sm font-medium">Dark</span>
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications</h3>
                                <div className="space-y-4">
                                    {['email', 'push', 'marketing'].map((type) => (
                                        <div key={type} className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{type} Notifications</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">Receive notifications via {type}.</span>
                                            </div>
                                            <button
                                                onClick={() => setNotifications(prev => ({ ...prev, [type]: !prev[type] }))}
                                                className={cn(
                                                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                                    notifications[type] ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                                        notifications[type] ? 'translate-x-5' : 'translate-x-0'
                                                    )}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
