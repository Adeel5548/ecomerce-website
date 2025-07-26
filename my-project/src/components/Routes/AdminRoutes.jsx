import React,{useState,useEffect} from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'

const AdminRoutes = () => {
    const [ok,setOK]=useState(false)
    const [auth,setAuth]=useAuth()

    useEffect(()=>{
        const authCheck=async()=>{
           const res =await axios.get('http://localhost:5000/api/v1/auth/admin-auth',
            {
                headers:{
                    'Authorization':auth?.token
                }
            }
           )
           if(res.data.ok){
            setOK(true)
           }else{
            setOK(false)
           }
        }

        if(auth?.token){
           authCheck()
        }
    
    },[auth?.token])
  return ok ?<Outlet/>:<Spinner/>
}

export default AdminRoutes
