import  { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare,Loader } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import {useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string  
}

 const LoginPage = () => {
  
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoggingIn } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    await login(data)
  }

  return (
    <>
      <div className='min-h-screen grid lg:grid-cols-2'>
        <div className='hidden lg:flex flex-col justify-center items-center bg-gray-100'>
          <h1 className='text-4xl font-bold'>Welcome Back</h1>
          <p className='mt-4 text-lg'>We missed you! Please log in to continue.</p>
        </div>

        <div className='flex flex-col justify-center items-center p-6'>
          <MessageSquare className='text-lime-500 w-10 h-10 mb-4' />
          <h2 className='text-2xl font-bold mb-4'>Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              type='email'
              placeholder='Email'
              className={`border rounded-md p-2 w-full mb-4 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}

            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className={`border rounded-md p-2 w-full mb-4 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
            <input type='checkbox' id='showPassword' className='mr-2' onChange={() => setShowPassword(!showPassword)} />
            <label htmlFor='showPassword' className='text-sm text-gray-600'>Show Password</label>

            <button
              type='submit'
              disabled={isLoggingIn}
              className={`bg-lime-500 text-white rounded-md p-2 w-full ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoggingIn ? <Loader className='animate-spin' /> : 'Login'}
            </button>

          </form>
          <p className='mt-4 text-sm'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-lime-500 hover:underline'>
              Sign Up
            </Link>
          </p>
          </div>
         
        </div>

    
    </>
  )
}
export default LoginPage