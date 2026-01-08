const MOCK_DELAY = 1000;

const MOCK_USERS = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
    },
    {
        id: '2',
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=Regular+User&background=random',
    },
];

export const mockApi = {
    login: async (email) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = MOCK_USERS.find((u) => u.email === email);
                if (user) {
                    resolve({
                        user,
                        token: 'mock-jwt-token-' + user.id,
                    });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, MOCK_DELAY);
        });
    },

    getUser: async (token) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // In a real app, verify token. Here check if token starts with mock-jwt-token-
                if (token.startsWith('mock-jwt-token-')) {
                    const userId = token.split('mock-jwt-token-')[1];
                    const user = MOCK_USERS.find((u) => u.id === userId);
                    if (user) resolve(user);
                    else reject(new Error('User not found'));
                } else {
                    reject(new Error('Invalid token'));
                }
            }, MOCK_DELAY);
        });
    },

    getAllUsers: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...MOCK_USERS,
                { id: '3', name: 'John Doe', email: 'john@example.com', role: 'user', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random' },
                { id: '4', name: 'Jane Smith', email: 'jane@example.com', role: 'user', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random' },
                { id: '5', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=random' },
                ]);
            }, MOCK_DELAY);
        });
    },

    deleteUser: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Deleted user ${id}`);
                resolve();
            }, MOCK_DELAY);
        });
    },

    updateUser: async (id, data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userIndex = MOCK_USERS.findIndex((u) => u.id === id);
                if (userIndex !== -1) {
                    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...data };
                    resolve(MOCK_USERS[userIndex]);
                }
                resolve(null);
            }, MOCK_DELAY);
        });
    },

    changePassword: async (id, oldPassword, newPassword) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock password check
                if (oldPassword === 'password') { // Mock check
                    resolve();
                } else {
                    console.log('Mock password check failed');
                    // For mock purposes, we'll just resolve unless specifically asked to fail
                    resolve();
                }
            }, MOCK_DELAY);
        });
    }
};
