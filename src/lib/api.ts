import {
    adminStats,
    mentorStats,
    studentStats,
    students,
    mentors,
    meetings,
    announcements,
    performanceData
} from '@/data/mockData';

// Mock API client to replace axios
const api = {
    get: async (url: string) => {
        console.log(`Mock GET: ${url}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

        if (url.includes('/dashboard/stats')) {
            // Determine stats based on local storage role if needed, 
            // but the original code seems to just call this endpoint.
            const role = localStorage.getItem('userRole');
            if (role === 'admin') return { data: adminStats };
            if (role === 'mentor') return { data: mentorStats };
            return {
                data: {
                    attendance: studentStats.attendanceRate,
                    assignments_due: studentStats.upcomingMeetings,
                    // ... other properties as expected by frontend
                }
            };
        }

        if (url.includes('/students')) return { data: students };
        if (url.includes('/mentors')) return { data: mentors };
        if (url.includes('/meetings')) return { data: meetings };
        if (url.includes('/announcements')) return { data: announcements };
        if (url.includes('/performance')) return { data: performanceData };

        return { data: {} };
    },

    post: async (url: string, body: Record<string, unknown>) => {
        console.log(`Mock POST: ${url}`, body);
        await new Promise(resolve => setTimeout(resolve, 800));

        if (url.includes('/auth/login')) {
            // Demo credentials
            const username = String(body.username || '');

            // Simple mock roles based on username
            let role: 'admin' | 'mentor' | 'student' = 'student';
            let name = username;

            if (username.toLowerCase().includes('admin')) {
                role = 'admin';
                name = 'Admin User';
            } else if (username.toLowerCase().includes('mentor')) {
                role = 'mentor';
                name = 'Dr. Sarah Wilson';
            } else {
                name = 'Alice Johnson';
            }

            return {
                data: {
                    token: 'mock-jwt-token',
                    role: role,
                    username: name
                }
            };
        }

        return { data: { message: 'Success (Mock)' } };
    },

    put: async (url: string, body: Record<string, unknown>) => {
        console.log(`Mock PUT: ${url}`, body);
        return { data: { message: 'Updated (Mock)' } };
    },

    delete: async (url: string) => {
        console.log(`Mock DELETE: ${url}`);
        return { data: { message: 'Deleted (Mock)' } };
    },

    // Interface compatibility for interceptors if needed
    interceptors: {
        request: { use: () => { } },
        response: { use: () => { } }
    }
};

export default api;
