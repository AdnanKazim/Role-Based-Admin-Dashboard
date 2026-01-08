import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StatsCard({ title, value, change, changeType = 'neutral', icon: Icon }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
            </div>
            {change && (
                <div className="mt-4 flex items-center text-sm">
                    <span
                        className={cn(
                            "font-medium",
                            changeType === 'positive' && "text-green-600 dark:text-green-400",
                            changeType === 'negative' && "text-red-600 dark:text-red-400",
                            changeType === 'neutral' && "text-gray-600 dark:text-gray-400"
                        )}
                    >
                        {change}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">from last month</span>
                </div>
            )}
        </div>
    );
}
