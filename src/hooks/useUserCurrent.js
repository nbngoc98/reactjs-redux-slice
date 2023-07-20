import { useSelector } from "react-redux";
export const useUserCurrent = () => {
    const currentUser = useSelector((state) => state.auth?.currentUser);
    return currentUser || null;
};

export const useAccessToken = () => {
    const userCurrent = useSelector((state) => state.auth?.currentUser);
    const token = userCurrent?.access_token;
    return token || null;
}