import Head from "next/head";
import { useState, useEffect, useRef } from "react";

const INSTALL_URL = "https://capsulix.vercel.app/api/auth/install?shop=";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

const PRODUCTS = [
  { name: "Whey Protein Blend", cat: "Protein", price: "$24.99", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80" },
  { name: "Omega-3 Fish Oil", cat: "Vitamins", price: "$14.99", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80" },
  { name: "Pre-Workout Formula", cat: "Performance", price: "$29.99", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
  { name: "Collagen Peptides", cat: "Wellness", price: "$22.99", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80" },
  { name: "Magnesium Complex", cat: "Minerals", price: "$16.99", img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80" },
  { name: "Greens Superfood", cat: "Wellness", price: "$27.99", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
];

const STEPS = [
  { n: "01", title: "Choose Your Supplements", desc: "Browse 20+ premium private label supplements — protein, vitamins, minerals, performance formulas. All lab-tested and certified.", img: "https://images.unsplash.com/photo-1559181567-c3190ca9d5db?w=600&q=85" },
  { n: "02", title: "Design Your Label", desc: "Upload your logo, pick your brand colors. Our automatic label rendering system applies your brand to every bottle — no design software needed.", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=85" },
  { n: "03", title: "Sell & We Fulfill", desc: "Publish to Shopify. When a customer orders, we print your label, fill the capsules or powder, and ship directly to them. You never touch a thing.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=85" },
];

const TESTIMONIALS = [
  { quote: "I launched my protein brand in one afternoon. The label looked professional immediately. Capsulix handles everything — I just market and earn.", name: "James Okafor", brand: "FitFuel by James", location: "London, UK", initials: "JO" },
  { quote: "The automatic labeling is insane. Uploaded my logo, chose my colors, and had 5 supplement products live on Shopify within an hour.", name: "Sarah Mitchell", brand: "PureForm Supplements", location: "Sydney, AU", initials: "SM" },
  { quote: "My wellness brand hit $4,800 in sales in the first 6 weeks. Zero inventory, zero manufacturing headaches. This is the real deal.", name: "Carlos Rivera", brand: "NutriCore", location: "Miami, US", initials: "CR" },
];

const PLANS = [
  { name: "Starter", price: "$17.99", period: "/mo", features: ["Up to 5 products", "Basic label customization", "Order fulfillment", "Email support"], highlight: false },
  { name: "Growth", price: "$44.99", period: "/mo", features: ["Unlimited products", "Full brand customization", "Priority fulfillment", "Custom packaging", "Analytics", "Priority support"], highlight: true },
  { name: "Enterprise", price: "Custom", period: "", features: ["Everything in Growth", "Dedicated account manager", "Custom formulations", "Bulk pricing", "White-glove onboarding"], highlight: false },
];

const CSS = `
  :root{--bg:#F4F8FB;--bg-d:#EBF3F8;--navy:#0D2137;--blue:#1B5E8A;--blue-l:#2E86AB;--blue-p:#E2EDF5;--orange:#E07B39;--orange-l:#F4A261;--orange-p:#FEF0E6;--text-s:#3A5A72;--text-m:#7A9AB0;--border:#D0E4EF;--shadow:0 2px 12px rgba(13,33,55,0.06);--shadow-md:0 8px 32px rgba(13,33,55,0.1);--shadow-lg:0 20px 60px rgba(13,33,55,0.14);--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans',sans-serif;}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;}
  body{font-family:var(--sans);background:var(--bg);color:var(--navy);overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}img{display:block;}
  button,input{font-family:var(--sans);}input:focus{outline:none;}

  .btn-blue{display:inline-flex;align-items:center;gap:8px;background:var(--blue);color:white;font-weight:600;font-size:15px;padding:13px 28px;border-radius:100px;border:none;cursor:pointer;transition:all 0.22s;box-shadow:0 4px 20px rgba(27,94,138,0.3);}
  .btn-blue:hover{background:var(--blue-l);transform:translateY(-2px);box-shadow:0 8px 32px rgba(27,94,138,0.38);}
  .btn-outline{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--blue);font-weight:600;font-size:15px;padding:12px 26px;border-radius:100px;border:2px solid var(--blue);cursor:pointer;transition:all 0.22s;}
  .btn-outline:hover{background:var(--blue);color:white;transform:translateY(-2px);}
  .btn-orange{display:inline-flex;align-items:center;gap:8px;background:var(--orange);color:white;font-weight:600;font-size:15px;padding:13px 28px;border-radius:100px;border:none;cursor:pointer;transition:all 0.22s;box-shadow:0 4px 20px rgba(224,123,57,0.3);}
  .btn-orange:hover{background:var(--orange-l);transform:translateY(-2px);}
  .btn-white{display:inline-flex;align-items:center;gap:8px;background:white;color:var(--navy);font-weight:600;font-size:15px;padding:13px 28px;border-radius:100px;border:none;cursor:pointer;transition:all 0.22s;box-shadow:0 4px 18px rgba(0,0,0,0.12);}
  .btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.2);}

  nav.main-nav{position:fixed;top:0;left:0;right:0;z-index:100;height:72px;display:flex;align-items:center;justify-content:space-between;padding:0 48px;transition:all 0.3s;}
  nav.main-nav.solid{background:rgba(244,248,251,0.96);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);box-shadow:var(--shadow);}
  .nav-logo{font-family:var(--serif);font-size:24px;font-weight:700;color:var(--navy);letter-spacing:-0.02em;}
  .nav-logo span{color:var(--blue);}
  .nav-links{display:flex;gap:36px;}
  .nav-link{font-size:14px;font-weight:500;color:var(--text-s);transition:color 0.2s;}
  .nav-link:hover{color:var(--navy);}

  .hero{min-height:100vh;padding:100px 48px 80px;background:linear-gradient(160deg,var(--bg) 40%,#E0EEF8 100%);display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;position:relative;overflow:hidden;}
  .hero::before{content:'';position:absolute;top:-200px;right:-200px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(27,94,138,0.06) 0%,transparent 65%);pointer-events:none;}
  .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(27,94,138,0.08);border:1px solid rgba(27,94,138,0.18);color:var(--blue);font-size:12px;font-weight:600;padding:6px 14px;border-radius:100px;letter-spacing:0.02em;}
  .hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--blue);box-shadow:0 0 8px rgba(27,94,138,0.6);}
  .hero-h1{font-family:var(--serif);font-size:clamp(42px,5.5vw,72px);font-weight:700;line-height:1.06;color:var(--navy);margin:24px 0 20px;}
  .hero-h1 .accent{color:var(--blue);}
  .hero-sub{font-size:17px;color:var(--text-s);line-height:1.7;max-width:480px;margin-bottom:32px;font-weight:300;}
  .hero-bullets{display:flex;flex-direction:column;gap:10px;margin-bottom:36px;}
  .hero-bullet{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:500;color:var(--text-s);}
  .hero-check{width:20px;height:20px;border-radius:50%;background:var(--blue);color:white;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;}
  .install-form{display:flex;gap:0;max-width:480px;border-radius:100px;overflow:hidden;box-shadow:var(--shadow-md);border:1px solid var(--border);background:white;}
  .install-input{flex:1;padding:14px 22px;border:none;font-size:14px;color:var(--navy);background:transparent;}
  .trust-line{font-size:12px;color:var(--text-m);margin-top:14px;}

  .hero-visual{position:relative;height:520px;}
  .hero-img-a{position:absolute;top:0;right:20px;width:58%;height:68%;border-radius:20px;overflow:hidden;box-shadow:var(--shadow-lg);}
  .hero-img-b{position:absolute;bottom:10px;left:0;width:48%;height:55%;border-radius:16px;overflow:hidden;box-shadow:var(--shadow-md);}
  .hero-img-c{position:absolute;bottom:40px;right:0;width:36%;height:38%;border-radius:14px;overflow:hidden;box-shadow:var(--shadow);}
  .hero-img-a img,.hero-img-b img,.hero-img-c img{width:100%;height:100%;object-fit:cover;}
  .hero-float{position:absolute;top:40%;left:42%;transform:translate(-50%,-50%);background:white;border-radius:14px;padding:12px 18px;box-shadow:var(--shadow-md);border:1px solid var(--border);display:flex;align-items:center;gap:12px;white-space:nowrap;z-index:10;}
  .hero-float-icon{width:36px;height:36px;border-radius:10px;background:var(--blue-p);display:flex;align-items:center;justify-content:center;font-size:18px;}

  .ticker-wrap{background:var(--navy);padding:14px 0;overflow:hidden;}
  .ticker{display:flex;gap:48px;animation:ticker 25s linear infinite;white-space:nowrap;}
  @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  @keyframes ldticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}

  .proof-bar{background:var(--blue);padding:52px 48px;}
  .proof-grid{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;}
  .proof-item{text-align:center;padding:0 24px;border-right:1px solid rgba(255,255,255,0.15);}
  .proof-item:last-child{border-right:none;}
  .proof-num{font-family:var(--serif);font-size:42px;font-weight:700;color:white;line-height:1;margin-bottom:6px;}
  .proof-lbl{font-size:13px;color:rgba(255,255,255,0.65);font-weight:400;}

  .section{padding:100px 48px;}
  .section-lbl{font-size:11px;font-weight:700;color:var(--blue);letter-spacing:0.18em;text-transform:uppercase;margin-bottom:14px;}
  .section-title{font-family:var(--serif);font-size:clamp(32px,4vw,52px);font-weight:700;line-height:1.1;color:var(--navy);}
  .section-title em{font-style:italic;color:var(--blue);}

  .steps-wrap{max-width:960px;margin:0 auto;}
  .step-row{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;padding:60px 0;border-top:1px solid var(--border);}
  .step-row:last-child{border-bottom:1px solid var(--border);}
  .step-num{font-family:var(--serif);font-size:72px;font-weight:700;color:rgba(27,94,138,0.1);line-height:1;display:block;margin-bottom:-16px;}
  .step-badge{width:32px;height:32px;border-radius:50%;background:var(--blue);color:white;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
  .step-title{font-family:var(--serif);font-size:28px;font-weight:700;color:var(--navy);margin-bottom:14px;}
  .step-desc{font-size:15px;line-height:1.75;color:var(--text-s);}
  .step-img{border-radius:20px;overflow:hidden;box-shadow:var(--shadow-lg);aspect-ratio:4/3;}
  .step-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s;}
  .step-img:hover img{transform:scale(1.03);}

  .pgrid-6{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:960px;margin:0 auto;}
  .pcard{background:white;border-radius:16px;overflow:hidden;border:1px solid var(--border);box-shadow:var(--shadow);transition:transform 0.25s,box-shadow 0.25s;}
  .pcard:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);}
  .pcard-img{aspect-ratio:1;overflow:hidden;background:var(--bg-d);}
  .pcard-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s;}
  .pcard:hover .pcard-img img{transform:scale(1.06);}
  .pcard-info{padding:16px 18px;}
  .pcard-cat{font-size:10px;font-weight:700;color:var(--blue);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:5px;}
  .pcard-name{font-family:var(--serif);font-size:19px;font-weight:600;color:var(--navy);margin-bottom:6px;}
  .pcard-price{font-size:14px;font-weight:600;color:var(--text-s);}

  .values-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:1000px;margin:0 auto;}
  .value-card{background:white;border-radius:18px;padding:32px 26px;border:1px solid var(--border);box-shadow:var(--shadow);transition:transform 0.25s;}
  .value-card:hover{transform:translateY(-4px);}
  .value-icon{width:50px;height:50px;border-radius:14px;background:var(--blue-p);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:18px;}
  .value-title{font-family:var(--serif);font-size:20px;font-weight:600;color:var(--navy);margin-bottom:10px;}
  .value-desc{font-size:14px;line-height:1.7;color:var(--text-s);}

  .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1000px;margin:0 auto;}
  .testi-card{background:white;border-radius:20px;padding:32px 28px;box-shadow:var(--shadow-md);border:1px solid var(--border);}
  .testi-stars{color:var(--orange);font-size:14px;letter-spacing:2px;margin-bottom:16px;}
  .testi-quote{font-size:15px;line-height:1.75;color:var(--text-s);margin-bottom:22px;font-style:italic;}
  .testi-name{font-size:14px;font-weight:700;color:var(--navy);}
  .testi-brand{font-size:12px;color:var(--text-m);margin-top:2px;}

  .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:960px;margin:0 auto;}
  .plan-card{background:white;border-radius:22px;padding:36px 30px;border:2px solid var(--border);box-shadow:var(--shadow);transition:transform 0.25s,box-shadow 0.25s;position:relative;}
  .plan-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);}
  .plan-card.hl{background:var(--blue);border-color:var(--blue);}
  .plan-pop{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--orange);color:white;font-size:10px;font-weight:700;padding:5px 18px;border-radius:100px;white-space:nowrap;letter-spacing:0.08em;}
  .plan-name{font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;}
  .plan-price{font-family:var(--serif);font-size:46px;font-weight:700;line-height:1;margin-bottom:8px;}
  .plan-features{display:flex;flex-direction:column;gap:11px;margin-bottom:30px;}
  .plan-feat{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:500;}
  .plan-check{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;flex-shrink:0;}

  .cta-section{background:var(--blue);padding:100px 48px;text-align:center;position:relative;overflow:hidden;}
  .cta-section::before{content:'';position:absolute;top:-150px;left:50%;transform:translateX(-50%);width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 65%);pointer-events:none;}

  footer{background:#0A1628;padding:64px 48px 36px;}
  .footer-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px;}
  .footer-logo{font-family:var(--serif);font-size:26px;font-weight:700;color:white;margin-bottom:14px;}
  .footer-logo span{color:var(--orange-l);}
  .footer-desc{font-size:13px;color:rgba(255,255,255,0.45);line-height:1.7;}
  .footer-col-title{font-size:10px;font-weight:700;color:rgba(255,255,255,0.35);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:18px;}
  .footer-links{display:flex;flex-direction:column;gap:11px;}
  .footer-link{font-size:13px;color:rgba(255,255,255,0.5);transition:color 0.2s;}
  .footer-link:hover{color:rgba(255,255,255,0.85);}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);}
  .footer-copy{font-size:12px;color:rgba(255,255,255,0.3);}

  @media(max-width:1024px){.hero{grid-template-columns:1fr;padding:100px 36px 60px;}.hero-visual{display:none;}.pgrid-6{grid-template-columns:repeat(2,1fr);}.values-grid{grid-template-columns:1fr 1fr;}.footer-grid{grid-template-columns:1fr 1fr;}.step-row{grid-template-columns:1fr;gap:32px;padding:48px 0;}}
  @media(max-width:768px){nav.main-nav{padding:0 20px;}.nav-links{display:none;}.hero{padding:90px 20px 60px;}.section{padding:64px 20px;}.proof-bar{padding:36px 20px;}.proof-grid{grid-template-columns:1fr 1fr;}.testi-grid{grid-template-columns:1fr;max-width:480px;}.pricing-grid{grid-template-columns:1fr;max-width:400px;}.cta-section{padding:64px 20px;}footer{padding:48px 20px 28px;}.footer-grid{grid-template-columns:1fr 1fr;gap:32px;}}
  @media(max-width:480px){.install-form{flex-direction:column;border-radius:16px;}.install-input{width:100%;}.pgrid-6{grid-template-columns:1fr;}.values-grid{grid-template-columns:1fr;}.footer-grid{grid-template-columns:1fr;}}
`;

export default function Home() {
  const [shopInput, setShopInput] = useState("");
  const [navSolid, setNavSolid] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroIn(true), 80);
    const fn = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function install(e) {
    e.preventDefault();
    let s = shopInput.trim();
    if (!s) return;
    if (!s.includes(".myshopify.com")) s += ".myshopify.com";
    window.location.href = INSTALL_URL + s;
  }

  const a = (delay = 0) => ({ opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(28px)", transition: `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms` });

  return (
    <>
      <Head>
        <title>Capsulix® — Launch Your Private Label Supplement Brand on Shopify</title>
        <meta name="description" content="Launch your private label supplement brand on Shopify in minutes. Automatic label rendering, automated fulfillment, zero inventory. Built for health entrepreneurs & influencers." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>

      {/* NAV */}
      <nav className={`main-nav${navSolid?" solid":""}`}>
        <a href="/" className="nav-logo">Capsulix<span>®</span></a>
        <div className="nav-links">
          {[["How It Works","#how"],["Products","#products"],["Pricing","#pricing"]].map(([l,h]) => <a key={l} href={h} className="nav-link">{l}</a>)}
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <a href="/dashboard" className="nav-link" style={{ fontSize:14 }}>Login</a>
          <a href="#install" className="btn-blue" style={{ fontSize:13, padding:"9px 22px" }}>Get Started</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div>
          <div style={{ ...a(0), display:"inline-flex", alignItems:"center", gap:8, marginBottom:32 }}>
            <span className="hero-badge"><span className="hero-badge-dot"></span>Private Label Supplements · Built for Shopify</span>
          </div>
          <h1 className="hero-h1" style={a(120)}>
            Launch Your<br />
            <span className="accent">Supplement</span><br />
            Brand Today
          </h1>
          <p className="hero-sub" style={a(220)}>Automatic label rendering — no Photoshop needed. We fill, pack, and ship premium supplements directly to your customers. Zero inventory. Launch in minutes.</p>
          <div className="hero-bullets" style={a(300)}>
            {[
              "Automatic label rendering — no design software needed",
              "Automated fulfillment — we fill, pack & ship every order",
              "Zero inventory — launch your supplement brand in minutes",
            ].map(b => <div key={b} className="hero-bullet"><span className="hero-check">✓</span>{b}</div>)}
          </div>
          <form onSubmit={install} className="install-form" id="install" style={a(380)}>
            <input className="install-input" value={shopInput} onChange={e => setShopInput(e.target.value)} placeholder="yourstore.myshopify.com" />
            <button type="submit" className="btn-blue" style={{ borderRadius:100 }}>Install App →</button>
          </form>
          <p className="trust-line" style={a(440)}>No credit card required · Cancel anytime · $0 upfront inventory</p>
        </div>
        <div className="hero-visual" style={a(200)}>
          <div className="hero-img-a"><img src="https://images.unsplash.com/photo-1559181567-c3190ca9d5db?w=600&q=85" alt="Supplements" /></div>
          <div className="hero-img-b"><img src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&q=85" alt="Protein" /></div>
          <div className="hero-img-c"><img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=85" alt="Vitamins" /></div>
          <div className="hero-float">
            <div className="hero-float-icon">💊</div>
            <div><div style={{ fontWeight:700, fontSize:14, color:"#0D2137" }}>$6,400+ earned</div><div style={{ fontSize:11, color:"#7A9AB0", marginTop:2 }}>by sellers this month</div></div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div style={{ overflow:"hidden" }}>
          <div className="ticker">
            {["Health Coaches ✦","Fitness Influencers ✦","DTC Sellers ✦","Nutritionists ✦","Gym Owners ✦","MLM Escapees ✦","Health Coaches ✦","Fitness Influencers ✦","DTC Sellers ✦","Nutritionists ✦","Gym Owners ✦","MLM Escapees ✦"].map((p,i) => (
              <span key={i} style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.35)" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* PROOF */}
      <div className="proof-bar">
        <Reveal>
          <div className="proof-grid">
            {[["1,800+","Brands Launched"],["120,000+","Orders Fulfilled"],["4.9 ★","Average Rating"],["$890K+","Earned by Sellers"]].map(([num,lbl]) => (
              <div key={lbl} className="proof-item"><div className="proof-num">{num}</div><div className="proof-lbl">{lbl}</div></div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how" style={{ background:"var(--bg)" }}>
        <Reveal><div style={{ marginBottom:60 }}><div className="section-lbl">Simple Process</div><h2 className="section-title">From Zero to <em>Brand Owner</em><br />in 3 Steps</h2></div></Reveal>
        <div className="steps-wrap">
          {STEPS.map((step, i) => (
            <Reveal key={i} delay={i*60}>
              <div className="step-row" style={i%2===1?{direction:"rtl"}:{}}>
                <div style={{ direction:"ltr" }}>
                  <span className="step-num">{step.n}</span>
                  <div className="step-badge">{i+1}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
                <div className="step-img" style={{ direction:"ltr" }}><img src={step.img} alt={step.title} loading="lazy" /></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" id="products" style={{ background:"var(--bg-d)" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:44, flexWrap:"wrap", gap:16 }}>
            <div><div className="section-lbl">20+ Products</div><h2 className="section-title">Premium Supplements,<br /><em>Your Brand</em></h2></div>
            <a href="#install" className="btn-outline" style={{ fontSize:14 }}>Browse All →</a>
          </div>
        </Reveal>
        <div className="pgrid-6">
          {PRODUCTS.map((p,i) => (
            <Reveal key={i} delay={i*60}>
              <div className="pcard">
                <div className="pcard-img"><img src={p.img} alt={p.name} loading="lazy" /></div>
                <div className="pcard-info">
                  <div className="pcard-cat">{p.cat}</div>
                  <div className="pcard-name">{p.name}</div>
                  <div className="pcard-price">{p.price} / unit</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="section" style={{ background:"white" }}>
        <Reveal><div style={{ textAlign:"center", marginBottom:56 }}><div className="section-lbl">Why Capsulix</div><h2 className="section-title">Complete Supplement Brand<br /><em>for Real Entrepreneurs</em></h2></div></Reveal>
        <div className="values-grid">
          {[
            { icon:"🏷️", title:"Automatic Label Rendering", desc:"No Photoshop needed. Upload your logo, choose colors, and our system renders your custom label on every bottle automatically." },
            { icon:"📦", title:"Automated Fulfillment", desc:"We fill, pack, and ship premium supplements directly to your customers. You never touch a single bottle." },
            { icon:"🚀", title:"Zero Inventory Required", desc:"Launch your private label supplement brand with $0 upfront. Products are created only when a customer orders." },
            { icon:"💪", title:"Built for Health Entrepreneurs", desc:"Perfect for fitness coaches, nutritionists, influencers, DTC sellers, and anyone ready to build a real supplement brand." },
          ].map((v,i) => (
            <Reveal key={i} delay={i*80}>
              <div className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background:"linear-gradient(160deg,var(--bg) 0%,#E0EEF8 100%)" }}>
        <Reveal><div style={{ textAlign:"center", marginBottom:52 }}><div className="section-lbl">Real Sellers</div><h2 className="section-title">Join Hundreds Making<br /><em>Real Profits</em></h2></div></Reveal>
        <div className="testi-grid">
          {TESTIMONIALS.map((t,i) => (
            <Reveal key={i} delay={i*80}>
              <div className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"{t.quote}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg,#1B5E8A,#2E86AB)`, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:700, fontSize:14, flexShrink:0 }}>{t.initials}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-brand">{t.brand} · {t.location}</div></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing" style={{ background:"var(--bg)" }}>
        <Reveal><div style={{ textAlign:"center", marginBottom:52 }}><div className="section-lbl">Pricing</div><h2 className="section-title">Start Free,<br /><em>Scale Fast</em></h2></div></Reveal>
        <div className="pricing-grid">
          {PLANS.map((plan,i) => (
            <Reveal key={i} delay={i*80}>
              <div className={`plan-card${plan.highlight?" hl":""}`}>
                {plan.highlight && <div className="plan-pop">MOST POPULAR</div>}
                <div className="plan-name" style={{ color:plan.highlight?"rgba(255,255,255,0.65)":"#7A9AB0" }}>{plan.name}</div>
                <div className="plan-price" style={{ color:plan.highlight?"white":"#0D2137" }}>{plan.price}<span style={{ fontSize:16, fontWeight:400, color:plan.highlight?"rgba(255,255,255,0.55)":"#7A9AB0" }}>{plan.period}</span></div>
                <div className="plan-features">
                  {plan.features.map(f => (
                    <div key={f} className="plan-feat" style={{ color:plan.highlight?"rgba(255,255,255,0.85)":"#3A5A72" }}>
                      <div className="plan-check" style={{ background:plan.highlight?"rgba(255,255,255,0.2)":"rgba(27,94,138,0.1)" }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={plan.highlight?"white":"#1B5E8A"} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <a href="#install" className={plan.highlight?"btn-white":"btn-blue"} style={{ width:"100%", justifyContent:"center", fontSize:14 }}>
                  {plan.price==="Custom"?"Contact Us →":"Start Free Trial →"}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <Reveal>
          <div className="section-lbl" style={{ color:"rgba(255,255,255,0.6)" }}>Get Started Today</div>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(36px,5vw,60px)", fontWeight:700, color:"white", margin:"16px 0 20px", lineHeight:1.1 }}>Ready to Launch Your<br /><em style={{ color:"var(--orange-l)" }}>Supplement Brand?</em></h2>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.7)", maxWidth:500, margin:"0 auto 40px", lineHeight:1.7 }}>Join hundreds of health entrepreneurs building real supplement brands with zero inventory and automated fulfillment.</p>
          <form onSubmit={install} style={{ display:"flex", gap:0, maxWidth:460, margin:"0 auto", borderRadius:100, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.25)", border:"1px solid rgba(255,255,255,0.2)" }}>
            <input value={shopInput} onChange={e => setShopInput(e.target.value)} placeholder="yourstore.myshopify.com" style={{ flex:1, padding:"14px 22px", border:"none", fontSize:14, color:"#0D2137", background:"white" }} />
            <button type="submit" className="btn-orange" style={{ borderRadius:0, flexShrink:0 }}>Install Free →</button>
          </form>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Capsulix<span>®</span></div>
            <p className="footer-desc">The private label supplement platform for Shopify merchants. Automatic label rendering, automated fulfillment, zero inventory.</p>
          </div>
          {[
            { title:"Platform", links:[["Products","#products"],["How It Works","#how"],["Pricing","#pricing"]] },
            { title:"Resources", links:[["Getting Started","#install"],["Help Center","/help"],["Blog","#"]] },
            { title:"Legal", links:[["Terms of Service","/terms"],["Privacy Policy","/privacy"],["Shipping Policy","/terms"]] },
          ].map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <div className="footer-links">{col.links.map(([l,href]) => <a key={l} href={href} className="footer-link">{l}</a>)}</div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Capsulix®. All Rights Reserved.</span>
          <span className="footer-copy">support@capsulix.com</span>
        </div>
      </footer>
    </>
  );
}