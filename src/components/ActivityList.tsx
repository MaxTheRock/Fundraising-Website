interface Activity {
  name: string
  amount: number
  color: string
}

export default function ActivityList({ activities }: { activities: Activity[] }) {
  return (
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl font-black mb-6">ACTIVITIES</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-6 border-2 border-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            <span className="text-xl font-bold">{activity.name}</span>
            <span className="text-xl font-black">${activity.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

