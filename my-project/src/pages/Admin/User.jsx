import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout'

const User = () => {
  return (
    <Layout>
    <div className='grid grid-cols-4'>
        <div className='grid-cols-1'>
             <AdminMenu/>
        </div>
        <div>
           
           user
        </div>
    </div>
    </Layout>
  )
}

export default User
