import api from "./api";

export const uploadImage = async (file) => {
    const data = new FormData();
    data.append("image", file);
    const response = await api.post("/upload", data);
    return response.data.url;
}