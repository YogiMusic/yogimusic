export default function Home() {
  return (
    <main style={{
      fontFamily: '"Nunito", "Helvetica Neue", Arial, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      backgroundColor: '#050d1a',
      minHeight: '100vh',
      color: 'white',
      direction: 'rtl'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;700;800&display=swap" rel="stylesheet"/>

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <img
          src="/logo.JPG"
          alt="Yogi Guitar Logo"
          style={{
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            display: 'block',
            margin: '0 auto 20px auto'
          }}
        />
        <h1 style={{
          fontSize: '52px',
          fontFamily: '"Bebas Neue", sans-serif',
          fontWeight: '400',
          color: '#4da6ff',
          margin: '0 0 8px 0',
          letterSpacing: '3px'
        }}>Yogi Guitar</h1>
        <p style={{ color: '#7aaed4', fontSize: '18px', margin: 0, fontFamily: '"Nunito", sans-serif' }}>
          תווים וחבילות לימוד לנגנים
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px'
      }}>
        <div style={{
          backgroundColor: '#0d1f35',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #1a3a5c'
        }}>
          <h2 style={{ color: '#4da6ff', marginBottom: '8px', fontFamily: '"Nunito", sans-serif' }}>
            🎸 Bohemian Rhapsody
          </h2>
          <p style={{ color: '#7aaed4', marginBottom: '16px' }}>תווים מלאים — PDF</p>
          <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#4da6ff', fontFamily: '"Nunito", sans-serif' }}>
            חינם
          </p>
          <button style={{
            backgroundColor: '#1a6abf',
            color: 'white',
            border: 'none',
            padding: '14px 24px',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px',
            fontFamily: '"Nunito", sans-serif'
          }}>
            הורדה חינמית
          </button>
        </div>
      </div>
    </main>
  )
}
