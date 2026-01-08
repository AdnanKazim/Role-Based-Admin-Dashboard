import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import ChartComponent from '@/components/ChartComponent';

const REVENUE_DATA = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 6000 },
    { name: 'Apr', value: 8000 },
    { name: 'May', value: 5000 },
    { name: 'Jun', value: 7500 },
    { name: 'Jul', value: 9000 },
];

const DEVICE_DATA = [
    { name: 'Mobile', value: 55 },
    { name: 'Desktop', value: 35 },
    { name: 'Tablet', value: 10 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value="1,234"
                    change="+12.5%"
                    changeType="positive"
                    icon={Users}
                />
                <StatsCard
                    title="Revenue"
                    value="$54,321"
                    change="+8.2%"
                    changeType="positive"
                    icon={DollarSign}
                />
                <StatsCard
                    title="Active Sessions"
                    value="573"
                    change="-1.4%"
                    changeType="negative"
                    icon={Activity}
                />
                <StatsCard
                    title="Conversion"
                    value="3.2%"
                    change="+2.4%"
                    changeType="positive"
                    icon={TrendingUp}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartComponent
                    title="Revenue Overview"
                    type="line"
                    data={REVENUE_DATA}
                    dataKey="value"
                    colors={['#3b82f6']}
                />
                <ChartComponent
                    title="Traffic by Device"
                    type="pie"
                    data={DEVICE_DATA}
                    dataKey="value"
                    colors={['#3b82f6', '#10b981', '#f59e0b']}
                />
            </div>
        </div>
    );
}
