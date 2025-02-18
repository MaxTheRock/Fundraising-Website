"use client"

export default function FloatingElements() {
  const elements = [
    { size: 100, x: 100, y: 100, color: "#f5f5f5" },
    { size: 150, x: 500, y: 200, color: "#f0f0f0" },
    { size: 120, x: 200, y: 500, color: "#f2f2f2" },
    { size: 180, x: 800, y: 300, color: "#f7f7f7" },
    { size: 140, x: 700, y: 600, color: "#f3f3f3" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: element.size,
            height: element.size,
            backgroundColor: element.color,
            left: element.x,
            top: element.y,
          }}
        />
      ))}
    </div>
  )
}

