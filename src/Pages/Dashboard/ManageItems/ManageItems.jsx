import React from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import useMenu from '../../../Hooks/useMenu';
import { FaEdit, FaTrashAlt, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu,loading,refetch] = useMenu();
    const axiosSecure = UseAxiosSecure();

    const handleDeleteItem = (item) =>{
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

                axiosSecure.delete(`/menu/${item._id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
                        // refetch to update the ui
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
            <SectionTitle heading="Manage All Items" subHeading="Hurry Up">

            </SectionTitle>

            <div className="overflow-x-auto">
    <table className="table w-full">
    {/* head */}
      <thead>
        <tr>
         <th>
            #
        
        </th>
        <th>Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

      {
        menu.map((item, index) =>  <tr key={item._id}>
        <td>
            {index +1}

        </td>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
         
          </div>
        </td>
        <td>
            {item.name}
        
       
        </td>
        <td className='text-right'>$ {item.price}</td>
        <td>
            <Link to={`/dashboard/updateItem/${item._id}`}>
            <button  className="btn btn-ghost btn-lg bg-orange-400"><FaEdit className=' text-white'></FaEdit></button>
            </Link>

        </td>
         <th>
             <button onClick={()=> handleDeleteItem(item)} className="btn btn-ghost btn-lg"><FaTrashAlt></FaTrashAlt></button>
          </th>
      </tr>)
      }
    
    
     
       </tbody>
   
       </table>
    </div>
            
        </div>
    );
};

export default ManageItems;