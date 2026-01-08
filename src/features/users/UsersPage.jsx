import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';
import { mockApi } from '@/services/mockApi';
import { Loader2 } from 'lucide-react';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await mockApi.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (user) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            try {
                await mockApi.deleteUser(user.id);
                // Optimistic update or reload
                setUsers(users.filter(u => u.id !== user.id));
            } catch (error) {
                console.error('Failed to delete user', error);
            }
        }
    };

    const columns = [
        {
            header: 'User',
            cell: (user) => (
                <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-gray-200" />
                    <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Role',
            accessorKey: 'role',
            cell: (user) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                    {user.role}
                </span>
            )
        },
        {
            header: 'ID',
            accessorKey: 'id',
            cell: (user) => <span className="text-gray-400 font-mono text-xs">#{user.id}</span>
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">User Management</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 text-sm font-medium">
                    Add User
                </button>
            </div>

            <DataTable
                columns={columns}
                data={users}
                onDelete={handleDelete}
                searchPlaceholder="Search users..."
            />
        </div>
    );
}
