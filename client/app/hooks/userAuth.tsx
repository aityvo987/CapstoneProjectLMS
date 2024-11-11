import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";

export default function userAuth(){
    const {user} = useSelector((state:any) => state.auth);
    // const {data:userData,isLoading,refetch} = useLoadUserQuery(undefined,{})
    if(user){
        return true;
    }else{
        return false;
    }
}