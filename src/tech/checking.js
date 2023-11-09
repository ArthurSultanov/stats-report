import { useNavigate } from "react-router-dom";
import { url_api } from "./config";
import { G_user_info } from "./global_vars";

export const CheckAuth = async(sessionStorageAuthKey) => {
    const navigate = useNavigate();
    console.log(`userId: ${G_user_info.user_id}`)
    const response = await fetch(url_api+`/api/getUserInfo/${G_user_info.user_id}`, {
        method: 'GET'
    });

    if (sessionStorageAuthKey !== response.authkey){
        navigate("/login");
    }

};