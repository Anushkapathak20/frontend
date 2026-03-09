import UserSidebar from "@/components/UserSidebar"

export default function UserLayout({ children }) {

 return(

  <div className="flex">

   {/* Sidebar */}

   <UserSidebar/>

   {/* Page Content */}

   <main className="flex-1 p-6 bg-gray-100 min-h-screen">
     {children}
   </main>

  </div>

 )

}