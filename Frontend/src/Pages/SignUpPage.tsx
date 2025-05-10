import { Loader, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast  from 'react-hot-toast'

type FormData = {
  fullName: string;
  email: string;
  password: string;
}
 const SignUpPage = () => {
  const{
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  
  
  const [showPassword, setShowPassword] = useState(false)

   
   const {signUp, isSigningUp} = useAuthStore()

 
  const onSubmit = async (data: FormData) => {

   await signUp(data);
    
  }


  return (

    <div className=' min-h-screen grid lg:grid-cols-2'>

      <div className='hidden lg:flex flex-col justify-center items-center bg-gray-100'>
        <h1 className='text-4xl font-bold'>Welcome to Our App</h1>
        <p className='mt-4 text-lg'>Join us and explore the amazing features.</p>
      </div>
      
      <div className='flex flex-col justify-center items-center p-6'>
        <MessageSquare className='text-blue-500 w-10 h-10  mb-4' />
        <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>

          <input
            {
              ...register("fullName", 
                { required: "Username is required",
                  minLength: { value: 5, message: "Username must be at least 5 characters" },
                  maxLength: { value: 20, message: "Username must be at most 20 characters" },
                  pattern: { value: /^[a-zA-Z0-9_\.]+$/, message: "Username can only contain letters, numbers, underscores and dots " }
                 })
            }
            type="text"
            placeholder="Username" 
            className='border p-2 mb-4 w-full'
            />
          {errors.fullName && <p className='text-red-500'>{errors.fullName.message}</p>}

          <input 
          type="email" 
          placeholder="Email" 
          className='border p-2 mb-4 w-full' 
          {
            ...register("email", 
              { required: "Email is required",
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address" }

              })
          }
          />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

          <input 
          type={showPassword?"text":"password" } 
          placeholder="Password" 
          className='border p-2 mb-4 w-full'
          {
            ...register("password", 
              {  required: 'Password is required', 
                minLength: {value: 8, message: 'Password must be at least 8 characters long'}, 
                maxLength: {value: 20, message: 'Password must be at most 20 characters long'},
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[a-zA-Z\d!@#$%^&*_]{8,20}$/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                }
              })
          }
          />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
           
          <div className='flex items-center mb-4'>
            <input type="checkbox" id="showPassword" onChange={() => setShowPassword(!showPassword)} className='mr-2' />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <button disabled={isSigningUp} type="submit" className='bg-lime-500 text-white p-2 rounded w-full'>Sign Up</button>
          {
            isSigningUp ?(
              <>
              <Loader className='animate-spin text-blue-500 w-6 h-6 mt-4' />
              <p className='text-gray-500 mt-2'>Creating your account...</p>    
              </>
            ):<></>
          }

        </form>

        <p className='mt-4'>Already have an account? <Link to="/login" className='link text-lime-500'>login</Link></p>
      </div>
    </div>
  )
}
export default SignUpPage
