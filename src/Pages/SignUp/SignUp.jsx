import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";




const SignUp = () => {
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const{createUser, updateUserProfile} = useContext(AuthContext)
    const { register,handleSubmit,reset,formState: { errors }} = useForm()
  


    
  const onSubmit = (data) => {
    
    console.log(data)
    createUser(data.email, data.password)
    .then(result =>{
      const loggedUser = result.user;
      console.log(loggedUser)
      updateUserProfile(data.name, data.photoURL)
      .then(()=>{
        // create user entry in the database
        const userInfo = {
          name: data.name,
          email: data.email

        }
        axiosPublic.post('/users', userInfo)
       .then(res =>{
        if(res.data.insertedId){
          console.log('user added to the database')

          reset();
          Swal.fire({
            title: "User created successfully",
            icon: "success",
            draggable: true
          });
          navigate('/');

        }

       })

     



      })
      .catch(error =>console.log(error))

     

    })

  }

    return (
      <>
      <Helmet>
        <title>Bistro Boss | sign up</title>
      </Helmet>
              <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name'  {...register("name", { required: true})} placeholder="name" className="input input-bordered" />
          {errors.name && <span className="text-red-500">Name field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="text" name='name'  {...register("photoURL", { required: true})} placeholder="Photo" className="input input-bordered" />
          {errors.photoURL && <span className="text-red-500">Name field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' {...register("email",{ required: true })} placeholder="email" className="input input-bordered"  />
          {errors.email && <span className="text-red-600">email field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' {...register("password",
          { required: true, minLength: 6, maxLength: 20 ,pattern:/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/})}
           placeholder="password" className="input input-bordered" />
          {errors.password?.type === 'required' &&  <p className="text-red-500">password  field is required</p>}
          {errors.password?.type === 'minLength' &&  <p className="text-red-500">password  must be 6 charector</p>}
          {errors.password?.type === 'maxLength' &&  <p className="text-red-500">password less than 20 charector</p>}
          {errors.password?.type === 'pattern' &&  <p className="text-red-500">give one uppercase one lower case and not less than six</p>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
          <button className="btn mt-3 bg-gray-400"><SocialLogin></SocialLogin></button>
         
        </div>

        <p>Already have account <Link to='/login' className="text-red-500">Login</Link></p>
      </form>
      
     
    </div>
  </div>
</div>
      </>
      

    );
};

export default SignUp;