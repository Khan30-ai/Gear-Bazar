import api from "../services/api.js"

export const getMySellerProfile = async () => {
    const response = await api.get("/sellers/profile");
    return response.data.seller;
};
export const updateMySellerProfile = async (data) => {
    const response = await api.put("/sellers/profile", data)
    return response.data.seller;
}