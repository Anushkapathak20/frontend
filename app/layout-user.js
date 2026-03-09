import UserSidebar from "@/components/UserSidebar"

export default function UserLayout({ children }) {

 return(

  <div className="flex min-h-screen bg-slate-50">
   <UserSidebar/>
   <main className="flex-1 p-6">
     {children}
   </main>
  </div>

 )

}