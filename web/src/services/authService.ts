import { api } from '@/config/axios';

export async function loginUser(username: string, password: string) {
    const res = await api.post("/auth/login", { username, password });
    return res.data;
}

