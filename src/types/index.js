export type { LucideIcon } from 'lucide-react';
// Re-export other types if needed or just use this file for global types only
export type Role = 'admin' | 'user';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
