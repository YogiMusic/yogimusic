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
  const [isForgot, setIsForgot] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [displayName, setDisplayName] = useState('')
  const [showContact, setShowContact] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [showCourses, setShowCourses] = useState(false)
  const [showPersonal, setShowPersonal] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactSent, setContactSent] = useState(false)
  const [videoName, setVideoName] = useState('')
  const [videoPhone, setVideoPhone] = useState('')
  const [videoSent, setVideoSent] = useState(false)
  const [downloads, setDownloads] = useState<string[]>([])

  const closeAuth = () => {
    setShowAuth(false)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setFullName('')
    setMessage('')
    setShowPassword(false)
    setShowConfirmPassword(false)
    setIsForgot(false)
  }

  const handleAuth = async () => {
    if (isForgot) {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) setMessage(error.message)
      else setMessage('נשלח אימייל לאיפוס סיסמא!')
      return
    }
    if (!isLogin && password !== confirmPassword) {
      setMessage('הסיסמאות אינן תואמות')
      return
    }
    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else {
        const name = data.user?.user_metadata?.full_name || data.user?.email || ''
        setUser(data.user)
        setDisplayName(name)
        closeAuth()
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      })
      if (error) {
        setMessage(error.message)
      } else {
        const name = fullName || data.user?.email || ''
        setUser(data.user)
        setDisplayName(name)
        closeAuth()
      }
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setDisplayName('')
    setDownloads([])
  }

  const handleDownload = () => {
    if (!user) {
      setIsLogin(false)
      setShowAuth(true)
      return
    }
    if (!downloads.includes('asfur')) {
      setDownloads([...downloads, 'asfur'])
    }
    const link = document.createElement('a')
    link.href = '/asfur.pdf'
    link.download = 'asfur.pdf'
    link.click()
  }

  const handleContact = async () => {
    const res = await fetch('https://formspree.io/f/maqleqrq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'קביעת שיעור', name: contactName, phone: contactPhone })
    })
    if (res.ok) { setContactSent(true); setContactName(''); setContactPhone('') }
  }

  const handleVideo = async () => {
    const res = await fetch('https://formspree.io/f/maqleqrq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'סרטון הדרכה אישי', name: videoName, phone: videoPhone })
    })
    if (res.ok) { setVideoSent(true); setVideoName(''); setVideoPhone('') }
  }

  const EyeIcon = ({ open }: { open: boolean }) => open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  )

  const CloseBtn = ({ onClose }: { onClose: () => void }) => (
    <button onClick={onClose} style={{ position: 'absolute', top: '16px', left: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#7aaed4', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;700;800&family=Playfair+Display:wght@600;700&display=swap');
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
        .btn-3d:active { box-shadow: 0 1px 0 #0d3a8a; transform: translateY(5px); }
        .btn-nav {
          background: transparent;
          border: 1px solid #4da6ff;
          color: #4da6ff;
          padding: 8px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-family: "Nunito", sans-serif;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.15s ease;
          box-shadow: 0 4px 0 #0d3a8a;
        }
        .btn-nav:hover { background: #1a5abf; color: white; transform: translateY(2px); box-shadow: 0 2px 0 #0d3a8a; }
        .btn-nav:active { transform: translateY(4px); box-shadow: 0 0px 0 #0d3a8a; }
        .btn-nav-filled {
          background: linear-gradient(145deg, #2980ff, #1a5abf);
          border: 1px solid #4da6ff;
          color: white;
          padding: 8px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-family: "Nunito", sans-serif;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.15s ease;
          box-shadow: 0 4px 0 #0d3a8a;
        }
        .btn-nav-filled:hover { background: linear-gradient(145deg, #55aaff, #2980ff); transform: translateY(2px); box-shadow: 0 2px 0 #0d3a8a; }
        .btn-nav-filled:active { transform: translateY(4px); box-shadow: 0 0px 0 #0d3a8a; }
        input { font-family: Arial, sans-serif !important; font-size: 15px !important; text-align: right !important; }
        input::placeholder { color: #7aaed4; font-family: "Nunito", sans-serif !important; text-align: right; }
        .eye-btn { background: none; border: none; cursor: pointer; color: #7aaed4; padding: 0 10px; display: flex; align-items: center; }
        .eye-btn:hover { color: #4da6ff; }
        .input-wrap { position: relative; display: flex; align-items: center; margin-bottom: 12px; }
        .input-wrap input { margin-bottom: 0 !important; flex: 1; padding-left: 40px !important; }
        .input-wrap .eye-btn { position: absolute; left: 8px; }
        .product-title { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700; color: #4da6ff; margin-bottom: 8px; letter-spacing: 0.5px; }
        .menu-item { padding: 14px 20px; color: #a8d4ff; font-family: "Nunito", sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; border-bottom: 1px solid #1a3a5c; transition: all 0.2s; display: flex; align-items: center; gap: 10px; white-space: nowrap; }
        .menu-item:hover { background: linear-gradient(145deg, #2980ff22, #1a5abf22); color: white; padding-right: 28px; }
        .menu-item:last-child { border-bottom: none; }
        .hamburger-wrap { position: relative; }
        .hamburger-wrap:hover .menu-dropdown { display: block; }
        .menu-dropdown { display: none; position: absolute; top: 0; right: 0; padding-top: 40px; z-index: 100; }
        .menu-dropdown-inner { background: #0d1f35; border: 1px solid #1a3a5c; border-radius: 12px; overflow: hidden; min-width: 220px; }
        .hamburger { background: none; border: none; cursor: pointer; padding: 8px; display: flex; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #4da6ff; border-radius: 2px; }
        .social-icon { transition: all 0.2s; opacity: 0.8; }
        .social-icon:hover { opacity: 1; transform: scale(1.1); }
        .course-card { background: rgba(13,31,53,0.85); border-radius: 16px; border: 1px solid #1a3a5c; overflow: hidden; transition: all 0.2s; cursor: pointer; }
        .course-card:hover { border-color: #4da6ff; transform: translateY(-4px); }
        .link-text { color: #4da6ff; cursor: pointer; font-size: 13px; }
        .link-text:hover { text-decoration: underline; }
        .modal-inner { position: relative; }
        .check-circle { width: 22px; height: 22px; border-radius: 50%; background: #1a5fd4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @media (max-width: 600px) { .desktop-auth { display: none !important; } }
      `}</style>

      <main style={{ fontFamily: '"Nunito", sans-serif', width: '100%', maxWidth: '100%', margin: '0', padding: '0', background: 'linear-gradient(270deg, #020a14, #0a1f3d, #0d2b52, #0e2244, #0b1929, #050d1a)', backgroundSize: '600% 600%', animation: 'gradientMove 16s ease infinite', minHeight: '100vh', color: 'white', direction: 'rtl' }}>

        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 5%', borderBottom: '1px solid #1a3a5c', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="hamburger-wrap">
              <button className="hamburger">
                <span/><span/><span/>
              </button>
              <div className="menu-dropdown">
                <div className="menu-dropdown-inner">
                  <div className="menu-item" onClick={() => { if (user) setShowPersonal(true); else { setIsLogin(true); setShowAuth(true) } }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    אזור אישי
                  </div>
                  <div className="menu-item" onClick={() => setShowCourses(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    קורסים דיגיטליים
                  </div>
                  <div className="menu-item" onClick={() => setShowVideo(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><polygon points="10,8 16,12 10,16"/></svg>
                    סרטוני הדרכה אישיים
                  </div>
                  <div className="menu-item" onClick={() => setShowContact(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    קביעת שיעור
                  </div>
                  <a href="https://chat.whatsapp.com/GB56wvy74ghG6kTQuylRsi?mode=gi_t" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <div className="menu-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                      קהילת WhatsApp
                    </div>
                  </a>
                  <div style={{ display: 'flex', gap: '16px', padding: '14px 20px', borderTop: '1px solid #1a3a5c' }}>
                    <a href="https://www.instagram.com/yogiguitar?igsh=MWI0MGNyNnJta2t3bg==" target="_blank" rel="noreferrer" className="social-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a8d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a href="https://www.facebook.com/share/1Fj7LTp4u8/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="social-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#a8d4ff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  </div>
                  {!user ? (
                    <>
                      <div className="menu-item" onClick={() => { setIsLogin(true); setShowAuth(true) }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                        התחברות
                      </div>
                      <div className="menu-item" onClick={() => { setIsLogin(false); setShowAuth(true) }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                        הרשמה
                      </div>
                    </>
                  ) : (
                    <div className="menu-item" onClick={handleLogout} style={{ color: '#ff6b6b' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      התנתקות
                    </div>
                  )}
                </div>
              </div>
            </div>
            <img src="/logo.JPG" alt="logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }}/>
            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '24px', color: '#4da6ff', letterSpacing: '2px' }}>Yogi Guitar</span>
          </div>
          <div className="desktop-auth" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {user ? (
              <span style={{ color: '#a8d4ff', fontSize: '15px', fontWeight: '700' }}>שלום, {displayName}</span>
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
              <h2 className="product-title">עספור — שיר הנושא</h2>
              <p style={{ color: '#7aaed4', marginBottom: '16px' }}>טאבים PDF</p>
              <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#4da6ff' }}>חינם</p>
              <button className="btn-3d" onClick={handleDownload}>להורדה</button>
            </div>
          </div>
        </div>

        {showPersonal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowPersonal(false)}>
            <div className="modal-inner" style={{ background: '#0d1f35', borderRadius: '16px', padding: '40px', width: '90%', maxWidth: '500px', border: '1px solid #1a3a5c' }} onClick={e => e.stopPropagation()}>
              <CloseBtn onClose={() => setShowPersonal(false)} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <img src="/logo.JPG" alt="logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }}/>
                <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '20px', color: '#4da6ff', letterSpacing: '2px' }}>Yogi Guitar</span>
              </div>
              <h2 style={{ color: '#4da6ff', marginBottom: '6px', fontFamily: '"Nunito", sans-serif', fontSize: '24px', fontWeight: '800' }}>האזור האישי שלי</h2>
              <p style={{ color: '#7aaed4', fontSize: '13px', marginBottom: '24px' }}>כל התכנים שהורדת</p>
              {downloads.length === 0 ? (
                <p style={{ color: '#7aaed4', textAlign: 'center', fontSize: '15px' }}>עדיין לא הורדת תכנים</p>
              ) : (
                downloads.map((item) => (
                  <div key={item} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid #1a3a5c', padding: '16px 20px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="check-circle">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
                      </div>
                      <div>
                        <p style={{ color: 'white', margin: 0, fontSize: '15px', fontWeight: '700' }}>עספור — שיר הנושא</p>
                        <p style={{ color: '#7aaed4', margin: 0, fontSize: '12px' }}>טאבים PDF · חינם</p>
                      </div>
                    </div>
                    <a href="/asfur.pdf" download className="btn-3d" style={{ width: 'auto', padding: '10px 18px', fontSize: '14px' }}>הורדה חוזרת</a>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {showCourses && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowCourses(false)}>
            <div className="modal-inner" style={{ background: '#0d1f35', borderRadius: '16px', padding: '40px', width: '90%', maxWidth: '500px', border: '1px solid #1a3a5c' }} onClick={e => e.stopPropagation()}>
              <CloseBtn onClose={() => setShowCourses(false)} />
              <h2 style={{ color: '#4da6ff', textAlign: 'center', marginBottom: '24px', fontFamily: '"Nunito", sans-serif', fontSize: '28px', fontWeight: '800' }}>קורסים דיגיטליים</h2>
              <a href="https://www.udemy.com/course/guitarfreedom/?referralCode=629B52EC17454E1CD2DD" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div className="course-card" style={{ padding: '24px' }}>
                  <img src="/course.jpg" alt="קורס גיטרה" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px', display: 'block' }} onError={(e: any) => e.target.style.display='none'}/>
                  <h3 style={{ color: '#4da6ff', fontFamily: '"Playfair Display", serif', fontSize: '20px', marginBottom: '8px' }}>לדעת לאלתר על כל שיר</h3>
                  <p style={{ color: '#7aaed4', fontSize: '14px', margin: 0 }}>לחצו למעבר לקורס ב-Udemy</p>
                </div>
              </a>
            </div>
          </div>
        )}

        {showVideo && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => { setShowVideo(false); setVideoSent(false) }}>
            <div className="modal-inner" style={{ background: '#0d1f35', borderRadius: '16px', padding: '40px', width: '90%', maxWidth: '420px', border: '1px solid #1a3a5c' }} onClick={e => e.stopPropagation()}>
              <CloseBtn onClose={() => { setShowVideo(false); setVideoSent(false) }} />
              <h2 style={{ color: '#4da6ff', textAlign: 'center', marginBottom: '16px', fontFamily: '"Nunito", sans-serif', fontSize: '24px', fontWeight: '800' }}>סרטוני הדרכה אישיים</h2>
              {videoSent ? (
                <p style={{ color: '#4da6ff', textAlign: 'center', fontSize: '18px' }}>✓ הפנייה נשלחה בהצלחה! נחזור אליך בקרוב</p>
              ) : (
                <>
                  <p style={{ color: '#7aaed4', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', textAlign: 'right' }}>תוכלו לקבל סרטון הדרכה אישי, שבו אני מסביר ומדגים איך לנגן שירים ספציפיים לפי בקשתכם, כדי שתוכלו להתקדם בגיטרה בקלות ובכיף</p>
                  <input type="text" placeholder="שם מלא" value={videoName} onChange={e => setVideoName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', marginBottom: '12px', boxSizing: 'border-box' as 'border-box' }}/>
                  <input type="tel" placeholder="טלפון" value={videoPhone} onChange={e => setVideoPhone(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', marginBottom: '20px', boxSizing: 'border-box' as 'border-box' }}/>
                  <button className="btn-3d" onClick={handleVideo}>שלח פנייה</button>
                </>
              )}
            </div>
          </div>
        )}

        {showContact && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => { setShowContact(false); setContactSent(false) }}>
            <div className="modal-inner" style={{ background: '#0d1f35', borderRadius: '16px', padding: '40px', width: '90%', maxWidth: '400px', border: '1px solid #1a3a5c' }} onClick={e => e.stopPropagation()}>
              <CloseBtn onClose={() => { setShowContact(false); setContactSent(false) }} />
              <h2 style={{ color: '#4da6ff', textAlign: 'center', marginBottom: '24px', fontFamily: '"Nunito", sans-serif', fontSize: '28px', fontWeight: '800' }}>קביעת שיעור</h2>
              {contactSent ? (
                <p style={{ color: '#4da6ff', textAlign: 'center', fontSize: '18px' }}>✓ הפנייה נשלחה בהצלחה! נחזור אליך בקרוב</p>
              ) : (
                <>
                  <input type="text" placeholder="שם מלא" value={contactName} onChange={e => setContactName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', marginBottom: '12px', boxSizing: 'border-box' as 'border-box' }}/>
                  <input type="tel" placeholder="טלפון" value={contactPhone} onChange={e => setContactPhone(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', marginBottom: '20px', boxSizing: 'border-box' as 'border-box' }}/>
                  <button className="btn-3d" onClick={handleContact}>שלח פנייה</button>
                </>
              )}
            </div>
          </div>
        )}

        {showAuth && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={closeAuth}>
            <div className="modal-inner" style={{ background: '#0d1f35', borderRadius: '16px', padding: '40px', width: '90%', maxWidth: '400px', border: '1px solid #1a3a5c' }} onClick={e => e.stopPropagation()}>
              <CloseBtn onClose={closeAuth} />
              <h2 style={{ color: '#4da6ff', textAlign: 'center', marginBottom: '24px', fontFamily: '"Nunito", sans-serif', fontSize: '28px', fontWeight: '800' }}>
                {isForgot ? 'איפוס סיסמא' : isLogin ? 'כניסה לחשבון' : 'יצירת חשבון'}
              </h2>
              {!isLogin && !isForgot && (
                <input type="text" placeholder="שם מלא" value={fullName} onChange={e => setFullName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', marginBottom: '12px', boxSizing: 'border-box' as 'border-box' }}/>
              )}
              <input type="email" placeholder="אימייל" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', marginBottom: '12px', boxSizing: 'border-box' as 'border-box' }}/>
              {!isForgot && (
                <>
                  <div className="input-wrap">
                    <input type={showPassword ? 'text' : 'password'} placeholder="סיסמא" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', boxSizing: 'border-box' as 'border-box' }}/>
                    <button className="eye-btn" onClick={() => setShowPassword(!showPassword)}><EyeIcon open={showPassword} /></button>
                  </div>
                  {!isLogin && (
                    <div className="input-wrap" style={{ marginBottom: '8px' }}>
                      <input type={showConfirmPassword ? 'text' : 'password'} placeholder="אימות סיסמא" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #1a3a5c', background: '#050d1a', color: 'white', boxSizing: 'border-box' as 'border-box' }}/>
                      <button className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}><EyeIcon open={showConfirmPassword} /></button>
                    </div>
                  )}
                </>
              )}
              {message && <p style={{ color: message.includes('הצליח') || message.includes('נשלח') ? '#4da6ff' : '#ff6b6b', textAlign: 'center', marginBottom: '12px', fontSize: '14px' }}>{message}</p>}
              <button className="btn-3d" onClick={handleAuth} style={{ marginBottom: '12px' }}>
                {isForgot ? 'שלח קישור איפוס' : isLogin ? 'כניסה' : 'יצירת חשבון'}
              </button>
              <div style={{ textAlign: 'center', fontSize: '13px', color: '#7aaed4', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {isLogin && !isForgot && (
                  <span className="link-text" onClick={() => { setIsForgot(true); setMessage('') }}>שכחת סיסמא?</span>
                )}
                {isForgot && (
                  <span className="link-text" onClick={() => { setIsForgot(false); setMessage('') }}>חזרה להתחברות</span>
                )}
                {!isForgot && isLogin && (
                  <span>עדיין אין לך חשבון? <span className="link-text" onClick={() => { setIsLogin(false); setMessage('') }}>הרשמה</span></span>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  )
}
