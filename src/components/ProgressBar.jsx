export default function ProgressBar({ current, total }) {
  const segments = Array.from({ length: total }, (_, i) => i)
  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {segments.map(i => (
        <div
          key={i}
          style={{
            width: '40px',
            height: '3px',
            background:
              i < current ? '#0a0a0a' :
              i === current ? '#888888' :
              '#e0ddd8',
          }}
        />
      ))}
    </div>
  )
}
