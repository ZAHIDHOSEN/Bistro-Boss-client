
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import UseCart from '../../Hooks/UseCart';

const FoodCard = ({item}) => {
    const {image, name, price, recipe, _id} = item;
    const{user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = UseAxiosSecure();
    const [,refetch] = UseCart();

    const handleAddToCart = () =>{
     if(user && user.email){
      console.log(user.email,)
      // send cart item to database

      const cartItem = {

        menuId: _id,
        email: user.email,
        name,
        image,
        price

      }
      axiosSecure.post('/carts', cartItem)
      .then(res =>{
        console.log(res.data);
        if(res.data.insertedId){
          Swal.fire(`${name} added successfully`);

        }
        // refetch cart to update the cart into items
        refetch();
      })


     }
     else{

      Swal.fire({
        title: "you are not login",
        text: "please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login"
      }).then((result) => {
        if (result.isConfirmed) {

          navigate('/login', {state: {from: location}})
      
        }
      });

     }
    }

    return (
        <div className="card bg-base-100  shadow-xl">
        <figure>
          <img
            src={image}
            alt="Shoes" />
        </figure>
        <p className='absolute right-0 mr-4 mt-4 px-4  bg-slate-900 text-white'>${price}</p>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">{name}</h2>
          <p>I{recipe}</p>
          <div className="card-actions justify-end">
            <button
            onClick={handleAddToCart}
             className="btn btn-outline hover:bg-slate-600 border-orange-400 border-0 border-b-4 mt-4">Add to cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;