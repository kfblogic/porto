import { ROWS, encodeChar } from '../lib/hollerith'

// Kartu punch (default 80 kolom): tiap kolom = karakter interpretasi + 12 posisi lubang.
// `punched` membatasi berapa kolom yang sudah dipunch (dipakai loading screen).
export default function PunchGrid({ text = '', cols = 80, punched = cols, className = '' }) {
  const chars = text.toUpperCase().padEnd(cols, ' ').slice(0, cols)

  return (
    <div className={`punch-grid ${className}`.trim()} style={{ '--cols': cols }} aria-hidden="true">
      {[...chars].map((ch, col) => {
        const holes = col < punched ? encodeChar(ch) : []
        return (
          <div
            key={col}
            className="punch-col"
            style={{ '--i': col }}
            data-code={holes.length ? `${col + 1} · ${holes.join('-')}` : undefined}
          >
            <span className="punch-interp">{col < punched ? ch : ' '}</span>
            {ROWS.map((row) => (
              <span key={row} className={holes.includes(row) ? 'punch-cell is-hole' : 'punch-cell'}>
                {row.length === 1 ? row : ''}
              </span>
            ))}
          </div>
        )
      })}
    </div>
  )
}
