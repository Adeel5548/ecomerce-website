import React,{useState} from "react";
import Layout from "../../components/Layout";
import SigupBg from "../../assets/sigupbg.jpg"; // Correct import
import { NavLink } from "react-router-dom";
 import { toast } from 'react-toastify';
 import axios from 'axios';
 import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [address,setAddress]=useState("")
  const [phone,setPhone]=useState("")
  const navigate=useNavigate()
  const HandleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res= await axios.post('http://localhost:5000/api/v1/auth/register',{name,email,password,address,phone});
      if(res.data.success){
        toast.success(res.data.message);
      setTimeout(() => {
      navigate('/login');
  }, 1500);  //
      }else{
          toast.error(res.data.message)
      }
    }
    catch(error){
    console.log(error)
    toast.error("something went wrong")
    }

    

  }

  return (
    <Layout title={'User Registration'}>
      {/* Outer div with background */}
<div
  className="min-h-screen w-full bg-cover bg-center bg-no-repeat  flex items-center justify-center "
  style={{ backgroundImage: `url(${SigupBg})` }}
  
>

        {/* Inner form container */}
        <div className="bg-white/70 hover:bg-white/80 backdrop-blur-md px-6 py-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 max-w-sm w-full mx-4 my-4">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Sign up</h1>
         <form onSubmit={HandleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e)=>{
              setName(e.target.value)
            }}
            className="block border border-gray-300 w-full p-3 rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
            name="fullname"
            placeholder="Full Name"
          />

          <input
            type="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            className="block border border-gray-300 w-full p-3 rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            
            className="block border border-gray-300 w-full p-3 rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
            name="password"
            placeholder="Password"
          />

          <input
            type="text"
            value={address}
            onChange={(e)=>{
              setAddress(e.target.value)
            }}            
            className="block border border-gray-300 w-full p-3 rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
            name="address"
            placeholder="Address"
          />
          <input
            type="Number"
            value={phone}
            onChange={(e)=>{
              setPhone(e.target.value)
            }}
            className="block border border-gray-300 w-full p-3 rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
            name="phone"
            placeholder="Phone No"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            By signing up, you agree to the{" "}
            <a className="underline text-blue-600" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="underline text-blue-600" href="#">
              Privacy Policy
            </a>
            .
          </div>

          <div className="text-gray-800 mt-6 text-center">
            Already have an account?{" "}
            <NavLink to="/login"
              className="underline text-blue-600 hover:text-blue-800"
              href="../login/"
            >
              Log in
            </NavLink>
            .
          </div>
          </form>
        </div> 
      </div>
    </Layout>
  );
};

export default SignUp;
