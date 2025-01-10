import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure =  UseAxiosSecure();
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users')
            
            return res.data
            

        }
       
    })
    // console.log(users)

    const handleMakeAdmin = user =>{
      axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res =>{
        console.log(res.data);
        if(res.data.modifiedCount > 0){
          refetch();
          Swal.fire(`${user.name} is an admin Now !`);

        }
      })

    }

    const handleDeleteUser = user =>{

          Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
             
      
                axiosSecure.delete(`/users/${user._id}`)
                .then(res =>{
                  if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });
      
                  }
      
                })
      
              }
            });
      

    }
    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h3 className="text-3xl font-bold">All Users</h3>
                <h3 className="text-3xl font-bold">Total Users: {users.length}</h3>
            </div>
            <div className="overflow-x-auto w-full">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

      {
        users.map((user,index) => <tr key={user._id}>
            <th>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>

                
             {
              user.role === 'admin' ? 'Admin' : <button onClick={()=> handleMakeAdmin(user)} className="btn bg-yellow-300 btn-lg">
              <FaUser className="text-2xl text-white"></FaUser></button> 
             }
                 

                
            </td>
            <td>
                 <th>
                     <button onClick={()=> handleDeleteUser(user)} className="btn btn-ghost btn-lg"><FaTrashAlt></FaTrashAlt></button>
                 </th>
            </td>
          </tr>)
      }
   
   
    
       </tbody>
       </table>
     </div>
        </div>
    );
};

export default AllUsers;