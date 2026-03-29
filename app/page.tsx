export default function Home() {
  return (
    <>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .btn-3d {
          background: linear-gradient(145deg, #2980ff, #1a5abf);
          box-shadow: 0 6px 0 #0d3a8a, 0 8px 10px rgba(0,0,0,0.4);
          transition: all 0.15s ease;
          display: block;
          text-align: center;
          text-decoration: none;
          color: white;
          padding: 14px 24px;
          border-radius: 10px;
          font-weight: bold;
          font-size: 16px;
          font-family: "Nunito", sans-serif;
          width: 100%;
          box-sizing: border-box;
        }
        .btn-3d:hover {
          box-shadow: 0 3px 0 #0d3a8a, 0 4px 6px rgba(0,0,0,0.4);
          transform: translateY(3px);
        }
        .btn-3d:active {
          box-shadow: 0 1px 0 #0d3a8a;
          transform: translateY(5px);
        }
      `}</style>
      <main style={{
        fontFamily: '"Nunito", "Helvetica Neue", Arial, sans-serif',
        width: '100%',
        maxWidth: '100%',
        margin: '0',
        padding: '40px 5%',
        boxSizing: 'border-box' as 'border-box',
        background: 'linear-gradient(270deg, #050d1a, #0a1f3d, #050d1a, #071528)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 12s ease infinite',
        minHeight: '100vh',
        color: 'white',
        direction: 'rtl'
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;700;800&display=swap" rel="stylesheet"/>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <img src="/logo.JPG" alt="Yogi Guitar Logo" style={{ width: '220px', height: '220px', borderRadius: '50%', display: 'block', margin: '0 auto 20px auto' }}/>
          <h1 style={{ fontSize: '52px', fontFamily: '"Bebas Neue", sans-serif', fontWeight: '400', color: '#4da6ff', margin: '0 0 8px 0', letterSpacing: '3px' }}>Yogi Guitar</h1>
          <p style={{ color: '#7aaed4', fontSize: '18px', margin: 0, fontFamily: '"Nunito", sans-serif' }}>תווים וחבילות לימוד לנגנים</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: 'rgba(13, 31, 53, 0.85)', borderRadius: '16px', padding: '28px', border: '1px solid #1a3a5c' }}>
            <h2 style={{ color: '#4da6ff', marginBottom: '8px', fontFamily: '"Nunito", sans-serif', fontWeight: '700', fontSize: '20px' }}>עספור שיר הנושא</h2>
            <p style={{ color: '#7aaed4', marginBottom: '16px' }}>טאבים PDF</p>
            <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#4da6ff', fontFamily: '"Nunito", sans-serif' }}>חינם</p>
            <a href="/asfur.pdf" download className="btn-3d">להורדה</a>
          </div>
        </div>
      </main>
    </>
  )
}