import React, { useState } from 'react'
import { useData } from '../context/userContex'
import { useNavigate, Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'

function Signup() {
  const [userdetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { localdata } = useData()

  const handleChange = (e) => {
    setUserDetails({ ...userdetails, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('https://dream-car-backend.vercel.app/user-signup', userdetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Successful signup ke baad navigate karna (yaha login page pe navigate kar raha hu)
      navigate('/login')
      setMessage('Signup successful! Please log in.')
    } catch (error) {
      console.log('Error in signup', error)
      setMessage('Signup failed! Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='w-[500px] lg:w-[1280px] mx-auto translate-y-[20%] py-6 text-[#fff]'>
        <div className='LoginDetails mx-auto w-[450px] '>
          <div className='mb-8'>
            <h3 className='text-[36px] font-[500] tracking-wider'>Create an account</h3>
            <p>Enter your details below</p>
          </div>
          <div className='mb-10'>
            <label htmlFor="username">Username</label>
            <input 
              className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' 
              id='username' 
              type="text" 
              name="username" 
              placeholder='Enter your username' 
              value={userdetails.username} 
              onChange={handleChange} 
            />

            <label htmlFor="email">Email</label>
            <input 
              className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' 
              id='email' 
              type="email" 
              name="email" 
              placeholder='Enter your email' 
              value={userdetails.email} 
              onChange={handleChange} 
            />
            
            <label htmlFor="password">Password</label>
            <input 
              className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded' 
              id='password' 
              type="password" 
              name="password" 
              placeholder='Enter your password' 
              value={userdetails.password} 
              onChange={handleChange} 
            />
          </div>
          <div className='flex justify-between'>
            <button 
              className='px-8 py-2 mb-4 font-[500] text-[#fff] rounded-[4px] bg-[#007cc7]' 
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <p className='border-2 border-[#007cc7] rounded-[4px] px-8 py-2 mb-4 '>
              <span className='inline-block mr-4'><FcGoogle /></span>
              Sign up with Google
            </p>
          </div>
          <p className='text-center'>Already have an account? <Link to={'/login'}><span className='font-[500]'>Log in</span></Link></p>
          {message && <p className='text-center py-2 bg-[#007cc7] rounded'>{message}</p>}
        </div>
      </div>
    </>
  )
}

export default Signup
