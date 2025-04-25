import { Loader, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

 const SignUpPage = () => {
  
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    
  })
   
   const {signUp, isSignUp} = useAuthStore()

  const validateForm = () => {

  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() 
    signUp(formData);
  


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
        <form onSubmit={handleSubmit} className='w-full max-w-sm'>
          <input type="text" placeholder="Username" required className='border p-2 mb-4 w-full'onChange={(e)=>setFormData({...formData, fullName:e.target.value})} />
          <input type="email" placeholder="Email" required className='border p-2 mb-4 w-full' onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
          <input type={showPassword?"text":"password" } placeholder="Password" required className='border p-2 mb-4 w-full' onChange={(e)=>setFormData({...formData, password:e.target.value})} />
          
          <div className='flex items-center mb-4'>
            <input type="checkbox" id="showPassword" onChange={() => setShowPassword(!showPassword)} className='mr-2' />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button onSubmit={handleSubmit} type="submit" className='bg-blue-500 text-white p-2 rounded w-full'>Sign Up</button>
          {
            isSignUp ?(
              <>
              <Loader className='animate-spin text-blue-500 w-6 h-6 mt-4' />
              <p className='text-gray-500 mt-2'>Creating your account...</p>    

              </>
            ):<></>
          }
        </form>
        <p className='mt-4'>Already have an account? <Link to="/login" className='link text-blue-500'>login</Link></p>
      </div>
    </div>
  )
}
export default SignUpPage
