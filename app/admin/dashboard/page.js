import Card from "@/components/Card"
import Chart from "@/components/Chart"
import data from "@/data/dashboardData.json"

export default function Dashboard(){

 return(

  <div className="p-6 bg-gray-100 min-h-screen">

   <h1 className="text-3xl font-bold mb-8">
    Society Admin Dashboard
   </h1>

   <div className="grid grid-cols-3 gap-6 mb-10">

    <Card
     title="Total Flats"
     value={data.totalFlats}
     color="bg-blue-500"
    />

    <Card
     title="Total Collection"
     value={`₹${data.totalCollected}`}
     color="bg-green-500"
    />

    <Card
     title="Pending Payments"
     value={data.pendingPayments}
     color="bg-red-500"
    />

   </div>

   <div className="bg-white p-6 rounded-xl shadow">

    <h2 className="text-xl font-semibold mb-4">
      Monthly Subscription Collection
    </h2>

    <Chart data={data.monthlyCollection}/>

   </div>

  </div>

 )
}