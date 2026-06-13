import { useAuth } from "../../context/AuthContext"
import SellerProfile from "../../components/Profile/SellerProfile"
import BuyerProfile from "../../components/Profile/BuyerProfile"
import AdminProfile from "../../components/Profile/AdminProfile"



export default function Profile() {
    const { user } = useAuth();

    if (user?.roles?.includes("admin")) {
        return <AdminProfile />;
    }
    if (user?.roles?.includes("seller")) {
        return <SellerProfile />;
    }
    return <BuyerProfile />;

}