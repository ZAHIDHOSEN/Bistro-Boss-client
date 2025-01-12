import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://y-pi-six.vercel.app'

})
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;