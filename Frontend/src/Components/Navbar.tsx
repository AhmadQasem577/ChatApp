import { Link } from "react-router-dom"
import { MessageSquare } from "lucide-react"
import { toast } from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect, useState } from "react"

  const Navbar = () => {
  const { authUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const profilePic = authUser?.profilePicture || '../../public/avatar.png'
  const fullName = authUser?.fullName || 'User'

    useEffect(() => {
      if (authUser) {
        setIsLoading(false)
      }
  }, [authUser])


  
  return (
    <>
    <div className=" fixed top-0 left-0 right-0 z-50">
    <div className=" flex flex-row justify-between  bg-lime-400 p-4  ">
      
        <Link className="flex flex-row  items-center gap-4  font-semibold text-lg hover:cursor-pointer" onClick={()=>toast.success("home")} to={'/'}>
          <MessageSquare/>
          <h1 className="text-2xl font-bold mb-2 max-sm:hidden">chat app</h1>
        </Link>
     
      
      <Link className="flex flex-row items-center gap-4 font-semibold text-lg hover:cursor-pointer" onClick={()=>toast.success("profile")} to={'/profile'}>
      
        {!isLoading ? (
          <>
          
            <h2 className="text-lg font-semibold max-sm:hidden">{fullName}</h2>
            <div className="overflow-hidden rounded-full w-10 h-10 flex items-center justify-center" >
            <img src={profilePic} alt={fullName} className="max-w-11 min-h-11   object-cover " />
            </div>
          </>
          
        ): <h2> Loading...</h2>}
        
      </Link>

     
    </div>
        </div>


    </>
  )
}

export default Navbar

