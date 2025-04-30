  import {useState} from 'react'
  import { useAuthStore } from '../store/useAuthStore'
  
  import { Link  } from 'react-router-dom'
  import { toast } from 'react-hot-toast'
  import { Camera,Mail,User  } from 'lucide-react'
  

 

    



  const ProfilePage = () => {
    const { authUser, updateProfile , isUpdatingProfile, logout} = useAuthStore()
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    
    const profilePic = selectedImage||authUser?.profilePicture || '../../public/avatar.png'
    const fullName = authUser?.fullName 
    const email = authUser?.email
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload =async  () => {
        const base64String = reader.result as string  
        setSelectedImage(base64String);
        await updateProfile({profilePic: base64String})
      }
      
    }
    
    
    

    

    


    

    return (
      <>
      <div className="flex flex-row  justify-between bg-slate-800 p-4 text-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex flex-row gap-4">
          <button className="bg-slate-600 p-2 rounded-md hover:bg-slate-700" onClick={() =>  toast.success('Home')  }><Link to={'/'}>Home</Link></button>
          <button className="bg-slate-600 p-2 rounded-md hover:bg-slate-700" onClick={() => toast.success('profile')}><Link to={'/profile'}>profile</Link></button>
          <button className="bg-slate-600 p-2 rounded-md hover:bg-slate-700" onClick={() => logout()}>logout</button>
        </div>

      </div>
      <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gray-100  drop-shadow-2xl shadow-lg shadow-rose-900'>
        
        

        <div className='flex flex-col items-center justify-center w-6/12 rounded-xl p-12 pr-32 pl-32 bg-gray-200 drop-shadow-2xl  shadow-stone-500'>
          
          
          <div 
          className='rounded-full shadow-md object-cover w-32 h-32 flex items-center justify-center cursor-pointer relative opacity-70 hover:opacity-85 border-4 border-slate-800 p-3'>
            <Camera className='absolute text-slate-800 w-8 h-8' />
            <img src={profilePic} className=' rounded-full' alt="" />
            <input type="file" accept="image/*" className=' rounded-full absolute inset-0 opacity-0 cursor-pointer' disabled={isUpdatingProfile} onChange={handleImageChange}/>
          </div>

          <p className='text-l text-slate-600 mt-4 mb-11'>{isUpdatingProfile?'Updating': "click on camera to update the photo"}</p>
          
          <div className='flex flex-col items-center justify-center w-full'>
            <div className='flex flex-row items-center justify-start w-full gap-2'>
              <User className='text-slate-800' />
              <input type="text" value={fullName} className='w-full p-2 rounded-md border-2 border-slate-300' placeholder={fullName} readOnly/>
            </div>
            <div className='flex flex-row items-center justify-start w-full gap-2 mt-4'>
              <Mail className='text-slate-800' />
              <input type="text" value={email} className='w-full p-2 rounded-md border-2 border-slate-300' placeholder={email} readOnly/>
            </div>
          </div>  
          </div>

          

        </div>
        </>
      
      


    )
  }
  export default ProfilePage
  
