import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import useAuth from "./useAuth";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const UseCart = () => {
//    tan stack query data load
const axiosSecure = UseAxiosSecure();
const {user} = useAuth();

const {data: cart=[], refetch} = useQuery({
   
    queryKey: ['cart', user?.email],
    queryFn: async () =>{
       const res = await axiosSecure.get(`/carts?email=${user.email}`)
       return res.data;
    }


}) 
return [cart, refetch]

};

export default UseCart;