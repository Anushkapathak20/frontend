import Card from "@/components/Card"
import Chart from "@/components/Chart"
import data from "@/data/dashboardData.json"

export default function Dashboard() {
  return (
    <div className="w-full h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Society Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">Overview of your society management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card
          title="Total Flats"
          value={data.totalFlats}
          color="bg-teal-600"
        />
        <Card
          title="Total Collection"
          value={`₹${data.totalCollected}`}
          color="bg-emerald-600"
        />
        <Card
          title="Pending Payments"
          value={data.pendingPayments}
          color="bg-rose-600"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full h-[70%]">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Monthly Subscription Collection
        </h2>
        <div className="max-h-full w-full">
          <Chart data={data.monthlyCollection} />
        </div>
      </div>
    </div>
  )
}