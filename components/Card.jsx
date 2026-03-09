export default function Card({ title, value, color }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-sm text-white ${color} transition-shadow hover:shadow-md`}
    >
      <h2 className="text-sm font-medium opacity-90 tracking-wide">
        {title}
      </h2>
      <p className="text-2xl sm:text-3xl font-bold mt-2 tracking-tight">
        {value}
      </p>
    </div>
  )
}