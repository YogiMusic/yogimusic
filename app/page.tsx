'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://hgbaxfjzfxoklvcfpnbh.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
)

export default function Home() {
  const [showAuth, setShowAuth] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<any>(null)

  const handleAuth = async () => {
    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else { setUser(data.user); setShowAuth(false); setMessage('') }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('נשלח אימייל אישור — בדקי את תיבת הדואר!')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;700;800&display=swap');
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
          border: none;
          cursor: pointer;
        }
        .btn-3d:hover {
          background: linear-gradient(145deg, #55aaff, #2980ff);
          box-shadow: 0 3px 0 #0d3a8a, 0 4px 6px rgba(0,0,0,0.4);
          transform: translateY(3px);
        }
        .btn-nav { background: transparent; border: 1px solid #4da6ff; color: #4da6ff; padding: 8px 20px; border-radius: 8px; cursor: pointer; font-family: "Nunito", sans-serif; font-size: 14px; font-weight: 700; transition: all 0.2s; }
        .btn-nav:hover { background: #4da6ff; color: #050d1a; }
        .btn-nav-filled { background: #4da6ff; border: 1px solid #4da6ff; color: #050d1a; padding: 8px 20px; border-radius: 8px; cursor: pointer; font-family: "Nunito", sans-serif; font-size: 14px; font-weight: 700; transition: all 0.2s; }
        .btn-nav-filled:hover { background: #55aaff; }
        input::placeholder { color: #7aaed4; }
      `}</style>
      <main style={{ fontFamily: '"Nunito", sans-serif', width: '100%', maxWidth: '100%', margin: '0', padding: '0', background: 'linear-gradient(270deg, #050d1a, #0a1f3d, #050d1a, #071528)', backgroundSize: '400% 400%', animation: 'gradientMove 12s ease infinite', minHeight: '100vh', color: 'white', direction: 'rtl' }}>
        
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 5%', borderBottom: '1px solid #1a3a5c' }}>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '24px', color: '#4da6ff', letterSpacing: '2px' }}>Yogi Guitar</span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {user ? (
              <>
                <span style={{ color: '#7aaed4', fontSize: '14px' }}>שלום, {user.email}</span>
                <button className="btn-nav" onClick={handleLogout}>התנתקות</button>
              </>
            ) : (
              <>
                <button className="btn-nav" onClick={() => { setIsLogin(true); setShowAuth(true) }}>התחברות</button>
                <button className="btn-nav-filled" onClick={() => { setIsLogin(false); setShowAuth(true) }}>הרשמה</button>
              </>
            )}
          </div>
        </nav>

        <div style={{ padding: '40px 5%' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <img src="/logo.JPG" alt="Yogi Guitar Logo" style={{ width: '220px', height: '220px', borderRadius: '50%', display: 'block', margin: '0 auto 20px auto' }}/>
            <h1 style={{ fontSize: '52px', fontFamily: '"Bebas Neue", sans-serif', fontWeight: '400', color: '#4da6ff', margin: '0 0 8px 0', letterSpacing: '3px' }}>Yogi Guitar</h1>
            <p style={{ color: '#7aaed4', fontSize: '18px', margin: 0 }}>תווים וחבילות לימוד לנגנים</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: 'rgba(13, 31, 53, 0.85)', borderRadius: '16px', padding: '28px', border: '1px solid #1a3a5c' }}>
              <h2 style={{ color: '#4da6ff', marginBottom: '8px', fontWeight: '700', fontSize: '20px' }}>עספור שיר הנושא</h2>
              <p style={{ color: '#7aaed4', marginBottom: '16px' }}>טאבים PDF</p>
              <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#4da6ff' }}>חינם</p>
              <a href="/asfur.pdf" download className="btn-3d">להורדה</a>
            </div>
          </div>
        </div>

        {showAuth && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowAuth(false)}>
            <div style={{ background: '#0d1f35', borderRadius: '16px', padding: '40px', width: '90%', maxWidth: '400px', border: '1px solid #1a3a5c' }} onClick={e => e.stopPropagation()}>
              <h2 style={{ color: '#4da6ff', textAlign: 'center', marginBottom: '24px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '32px', letterSpacing: '2px' }}>{isLogin ? 'כניסה לחשבון' : 'הרשמה'}</h2>
              <input type="email" placeholder="אימייל" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', marginBottom: '12px', boxSizing: 'border-box' as 'border-box', fontFamily: '"Nunito", sans-serif', fontSize: '16px' }}/>
              <input type="password" placeholder="סיסמא" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', marginBottom: '20px', boxSizing: 'border-box' as 'border-box', fontFamily: '"Nunito", sans-serif', fontSize: '16px' }}/>
              {message && <p style={{ color: message.includes('אימייל') ? '#4da6ff' : '#ff6b6b', textAlign: 'center', marginBottom: '12px', fontSize: '14px' }}>{message}</p>}
              <button className="btn-3d" onClick={handleAuth} style={{ marginBottom: '12px' }}>{isLogin ? 'התחברות' : 'הרשמה'}</button>
              <p style={{ textAlign: 'center', color: '#7aaed4', fontSize: '14px', margin: 0 }}>
                {isLogin ? 'עדיין אין לך חשבון?' : 'כבר יש לך חשבון?'}
                <span style={{ color: '#4da6ff', cursor: 'pointer', marginRight: '4px' }} onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'הרשמה' : 'התחברות'}</span>
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  )
}