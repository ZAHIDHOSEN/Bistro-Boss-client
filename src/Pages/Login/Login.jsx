import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';


const Login = () => {
   
    const [disabled, setDisabled]= useState(true);
    const {login} = useContext(AuthContext);
    const navigate =useNavigate();
    const location = useLocation();

    const newLocation = location.state?.from?.pathname || "/";


    useEffect(() =>{
        loadCaptchaEnginge(6); 

    },[])

    const handleLogin = e =>{
        e.preventDefault();

        const from = e.target;
        const email = from.email.value;
        const password = from.password.value;

        console.log(email, password)

        login(email,password)
        .then(result =>{
            const newUser = result.user;
            console.log(newUser);
            Swal.fire("login successfully");

        })
        navigate(newLocation);

    }

    const handleValidateCaptcha = (e) =>{
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value);
        if(validateCaptcha(user_captcha_value)){
            setDisabled(false)

        }
        else{
            setDisabled(true)

        }

    }
    return (
      <>

           <Helmet>
              <title>Bistro Boss | Login</title>
            </Helmet>
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 md:w-1/2  w-full max-w-sm  shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input type="captcha" onBlur={handleValidateCaptcha}   name='captcha' placeholder="type of text above" className="input input-bordered" required />
                   <button className='btn btn-outline btn-xs mt-2'>Validate</button>
              </div>
              <div className="form-control mt-6">
                <button disabled={disabled}
                className="btn btn-primary">Login</button>
                
              </div>
              <p><small>New Here? <Link className='text-red-500' to='/signup'>SignUp</Link></small></p>
            </form>
            <button
                className="btn mt-3 bg-slate-400"><SocialLogin></SocialLogin></button>
           
            
          </div>
         
        </div>
      </div>
      </>
   
    );
};

export default Login;