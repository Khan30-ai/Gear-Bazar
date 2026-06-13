import api from "../services/api.js"

export const getMySellerProfile = async () => {
    const response = await api.get("/sellers/profile");
    return response.data.seller;
};