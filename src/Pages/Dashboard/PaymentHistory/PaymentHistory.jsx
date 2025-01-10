import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = UseAxiosSecure();

    const {data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-3xl">Total payments: {payments.length}</h2>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Email</th>
        <th>Transaction ID</th>
        <th>Price</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
      {payments.map((payment, index)=> <tr>
        <th>{index + 1}</th>
        <td>{payment.email}</td>
        <td>{payment.transactionId}</td>
        
        <td>{payment.price}</td>
        <td>{payment.status}</td>
      </tr>

      )}
     
  
    </tbody>
  </table>
</div>

        </div>
    );
};

export default PaymentHistory;