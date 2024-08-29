import React, { useState } from 'react'
import { useData } from '../context/userContex'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  })
  const { localdata } = useData()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('https://dream-car-backend.vercel.app/user-login', loginDetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      localdata(response.data.token, response.data.role)
      if (response.data.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error) {
      setMessage('Invalid credentials, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='w-[500px] lg:w-[1280px] mx-auto translate-y-[20%] py-6 text-[#fff]'>
        <div className='LoginDetails mx-auto w-[450px]'>
          <div className='mb-8'>
            <h3 className='text-[36px] font-[500] tracking-wider'>Sign in to your account</h3>
            <p>Enter your details below</p>
          </div>
          <div className='mb-10'>
            <label htmlFor="email">Email</label>
            <input
              className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded'
              id='email'
              type="email"
              name="email"
              placeholder='Enter your email'
              value={loginDetails.email}
              onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              className='block w-[100%] bg-[#34495e] text-[#fff] placeholder:text-[#a9a9a9] py-2 px-3 mb-4 rounded'
              id='password'
              type="password"
              name="password"
              placeholder='Enter your password'
              value={loginDetails.password}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-between'>
            <button
              className='px-8 py-2 mb-4 font-[500] text-[#fff] rounded-[4px] bg-[#007cc7]'
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <Link to={'/account/forget/password'}>
              <p className='text-center py-2 text-[14px]'>Forgot password?</p>
            </Link>
          </div>
          <p className='text-center py-2'>
            Don't have an account? <Link to={'/signup'}><span className='font-[500]'>Sign up</span></Link>
          </p>
          {message && <p className='text-center py-2 bg-[#d9534f] text-white rounded'>{message}</p>}
        </div>
      </div>
    </>
  )
}

export default Login
