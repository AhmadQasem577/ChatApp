import {useState, useEffect} from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile,logout } = useAuthStore()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if authUser data is available
    if (authUser) {
      setIsLoading(false)
    }
  }, [authUser])

  const profilePic = selectedImage || authUser?.profilePicture || '../../public/avatar.png'
  const fullName = authUser?.fullName 
  const email = authUser?.email

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64String = reader.result as string  
      setSelectedImage(base64String);
      await updateProfile({profilePic: base64String})
    }
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 drop-shadow-2xl shadow-lg shadow-rose-900 '>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center'>
            <Loader className='animate-spin text-slate-800 w-8 h-8' />
            <p className='text-slate-600 mt-2'>Loading profile...</p>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center w-6/12 rounded-xl p-12 px-32 max-sm:w-11/12 max-sm:px-6 bg-gray-200 drop-shadow-2xl shadow-stone-500'>
            <div className='rounded-full shadow-md   w-32 h-32 flex items-center justify-center cursor-pointer relative opacity-70 hover:opacity-85 border-4 border-slate-800 p-3 overflow-hidden max-sm:w-20 max-sm:h-20' >
              <Camera className='absolute text-slate-800 w-8 h-8' />
              <img src={profilePic} className='object-cover  max-w-36 min-h-36 max-sm:w-24 max-sm:h-24' alt={fullName || 'Profile'} />
              <input 
                type="file" 
                accept="image/*" 
                className='rounded-full absolute inset-0 opacity-0 cursor-pointer' 
                disabled={isUpdatingProfile} 
                onChange={handleImageChange}
              />
            </div>

            <p className='text-l text-slate-600 mt-4 mb-11 max-sm:text-sm '>
              {isUpdatingProfile ? 'Updating' : "Click on camera to update the photo"}
            </p>

            <div className='flex flex-col items-center justify-center w-full'>
              <div className='flex flex-row items-center justify-start w-full gap-2'>
                <User className='text-slate-800' />
                <input 
                  type="text" 
                  value={fullName || ''} 
                  className='w-full p-2 rounded-md border-2 border-slate-300' 
                  placeholder="Your name"
                  readOnly
                />
              </div>
              <div className='flex flex-row items-center justify-start w-full gap-2 mt-4'>
                <Mail className='text-slate-800' />
                <input 
                  type="text" 
                  value={email || ''} 
                  className='w-full p-2 rounded-md border-2 border-slate-300' 
                  placeholder="Your email"
                  readOnly
                />
              </div>

               <button  onClick={()=>logout()} className='bg-red-600 rounded-lg my-6 p-4 text-white font-bold'> logout</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilePage

