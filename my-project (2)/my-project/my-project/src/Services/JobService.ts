import axios from "axios";

const API_URL = "https://jobhook-46y3.onrender.com";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

// Interceptor to include token
apiClient.interceptors.request.use((config) => {
    const user = localStorage.getItem("user");
    if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.jwt) {
            config.headers.Authorization = `Bearer ${parsedUser.jwt}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const postJob = async (jobData: any) => {
    try {
        const response = await apiClient.post(`/jobs/post`, jobData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const getAllJobs = async () => {
    try {
        const response = await apiClient.get(`/jobs/getAll`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const getExternalJobs = async (keyword: string, location: string) => {
    try {
        const response = await apiClient.get(`/api/external-jobs`, {
            params: { keyword, location }
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const getJobById = async (id: string | number) => {
    try {
        const response = await apiClient.get(`/jobs/get/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const getJobByPostedBy = async (id: number) => {
    try {
        const response = await apiClient.get(`/jobs/postedBy/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const getAppliedJobs = async (id: number) => {
    try {
        const response = await apiClient.get(`/jobs/applied/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const applyToJob = async (jobId: string | number, applicantData: any) => {
    try {
        const response = await apiClient.post(`/jobs/apply/${jobId}`, applicantData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const getSuitableJobs = async (profileId: number) => {
    try {
        const response = await apiClient.get(
            `/jobs/suitable/${profileId}`
        );
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};


