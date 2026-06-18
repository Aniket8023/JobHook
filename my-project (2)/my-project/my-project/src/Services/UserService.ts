import axios from "axios";

const API_URL = "http://localhost:8080";

// Create an axios instance with default config
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

// Add an interceptor to include token if it exists in localStorage
apiClient.interceptors.request.use((config) => {
    const user = localStorage.getItem("user");
    if (user) {
        const parsedUser = JSON.parse(user);
        // If the backend uses JWT and provides a 'jwt' field
        if (parsedUser.jwt) {
            config.headers.Authorization = `Bearer ${parsedUser.jwt}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const registerUser = async (userData: any) => {
    try {
        const response = await apiClient.post(`/users/register`, userData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (loginData: any) => {
    try {
        const response = await apiClient.post(`/auth/login`, loginData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const uploadResume = async (
  profileId: number,
  formData: FormData
) => {
  try {
    const response = await apiClient.put(
      `/profiles/uploadResume/${profileId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const getResume = async (profileId: number) => {
    try {
        const response = await apiClient.get(`/profiles/get/${profileId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const updateProfile = async (profileData: any) => {
    try {
        const response = await apiClient.put(`/profiles/update`, profileData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const getProfile = async (id: number) => {
    try {
        const response = await apiClient.get(`/profiles/get/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const getAllProfiles = async () => {
    try {
        const response = await apiClient.get(`/profiles/getAll`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const sendOtp = async (email: string) => {
    try {
        const response = await apiClient.post(`/users/sendOtp/${email}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const verifyOtp = async (email: string, otp: string) => {
    try {
        const response = await apiClient.get(`/users/verifyOtp/${email}/${otp}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export const changePassword = async (email: string, password: string) => {
    try {
        const response = await apiClient.post(`/users/changePass`, { email, password });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

