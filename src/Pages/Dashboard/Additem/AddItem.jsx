import React from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';

import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItem = () => {
  
  const { register, handleSubmit, reset } = useForm()
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();

    const onSubmit = async(data) => {
      console.log(data)
        // image upload to imagebb and then get an url
        const imageFile = {image: data.image[0]}

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }

        });
        if(res.data.success){
          // now send the menu item data to the server with the image url
          const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
          }

          // 
          const menuRes = await axiosSecure.post('/menu', menuItem )
          console.log(menuRes.data)
          if(menuRes.data.insertedId){
            reset();
            
            // show success popup
            Swal.fire("MenuItem added to database");

          }




        }
        console.log('with image url', res.data);



    }
    return (
        <div>
            <SectionTitle heading="add an item" subHeading="what's new"></SectionTitle>

            <div >
            <form onSubmit={handleSubmit(onSubmit)}>
           

           <label className="form-control w-full my-6">
             <div className="label">
             <span className="label-text">What is your name?</span>
            
           </div>
            <input type="text"
             placeholder="Recipe Name" 
             {...register("name",{required: true})}
             className="input input-bordered w-full " />
        
        </label>

        <div className='flex gap-6'>
            {/* category */}
            <label className="form-control w-full my-6">
             <div className="label">
             <span className="label-text">Category</span>
            
           </div>
           <select defaultValue="default"  {...register('category',{required: true})}
            className="select select-bordered w-full">
           <option disabled value="default">please select an item</option>
           <option value="salad">Salad</option>
           <option value="pizza">Pizza</option>
           <option value="soup">Soup</option>
           <option value="desert">Desert</option>
           <option value="drink">Drink</option>
            
          </select>
          
        
        </label>
            

            {/* price */}
            <label className="form-control w-full my-6">
             <div className="label">
             <span className="label-text">price</span>
            
           </div>
            <input type="number"
             placeholder="price" 
             {...register("price",{required: true})}
             className="input input-bordered w-full " />
        
        </label>
        </div>

        {/* details */}
        <label className="form-control">
           <div className="label">
           <span className="label-text">Recipe</span>
         
            </div>
           <textarea 
           {...register("recipe",{required: true})}
            className="textarea textarea-bordered h-24" placeholder="Recipe details"></textarea>
        
        </label>
        {/* file input */}
        <div className='form-control w-full my-4' >
        <input type="file" {...register('image',{required: true})} className="file-input w-full max-w-xs" />

        </div>
      
       
          <button className='btn'>Add Item <FaUtensils className='ml-4 bg-orange-400'></FaUtensils></button>
          </form>
            </div>
        </div>
    );
};

export default AddItem;