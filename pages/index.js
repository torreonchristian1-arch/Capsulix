import Head from "next/head";
import { useState, useEffect, useRef } from "react";

const INSTALL_URL = "https://manexlux.vercel.app/api/auth/install?shop=";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)", transition: `opacity 0.9s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.9s cubic-bezier(0.23,1,0.32,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

const PRODUCTS = [
  { name: "Body Wave", meta: "14″ – 30″ · Raw virgin", tag: "Bestseller", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=85" },
  { name: "Silky Straight", meta: "12″ – 40″ · Double drawn", tag: "Raw", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=85" },
  { name: "Kinky Curly", meta: "10″ – 28″ · 4A–4C match", tag: "New", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=85" },
  { name: "HD Lace Frontal", meta: "13x4 · Pre-plucked", tag: "Frontal", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=85" },
];

const FAQS = [
  { q: "How is this really free to start?", a: "We only make money when you make a sale. No subscription, no signup fee, no stocking fee. You pay wholesale cost per order — funded by your customer's payment — keep the margin, and we handle the rest." },
  { q: "Where does the hair come from?", a: "All Manexlux hair is ethically sourced Remy, virgin, and raw human hair from verified suppliers. Every bundle passes a double-drawn QC inspection before shipping." },
  { q: "Will my customers know it's not my own product?", a: "They won't. Every order ships in your branded packaging with your logo and your insert card. Our name appears nowhere. To your customer, you are the brand." },
  { q: "How do I take orders and payments?", a: "Through your Shopify store. Install Manexlux, publish your products, set your prices. Orders come in automatically and we handle fulfillment under your brand." },
  { q: "Which countries do you ship to?", a: "Worldwide. Tested delivery to US, UK, EU, UAE, South Africa, and West Africa. 3–7 working days standard, 1–3 express." },
];

const TESTIMONIALS = [
  { quote: "I'd been selling hair out of my bedroom for two years. Manexlux let me scale overnight — no more bundles in my wardrobe. First month I hit £4,800.", name: "Tolu A.", title: "Founder, Vowen Hair · London", initials: "TA" },
  { quote: "My salon clients kept asking where I got my bundles. Now I have my own line — same customers, triple the margin. The packaging looks unreal.", name: "Amara O.", title: "Owner, Knot Atlanta", initials: "AO" },
  { quote: "I had 38k followers and no product. Two months after launch I was doing £11k a month without touching a single bundle. Ridiculous.", name: "Keisha M.", title: "Creator, Maison Mane", initials: "KM" },
];

const CSS = `
  :root{--cream:#f7f1ea;--sand:#efe6da;--blush:#e8d5c4;--nude:#d4b8a0;--cocoa:#5c4033;--ink:#2a1d16;--charcoal:#3d2e24;--mute:#8a7a6d;--accent:#9a6b4a;--gold:#c9a84c;--line:rgba(42,29,22,0.1);}
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;}
  body{background:var(--cream);color:var(--ink);font-family:'Geist',-apple-system,sans-serif;font-size:15px;line-height:1.6;letter-spacing:-0.003em;overflow-x:hidden;}
  .serif{font-family:'Fraunces',serif;font-weight:300;}
  .micro{font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;}
  a{text-decoration:none;color:inherit;}
  img{display:block;width:100%;height:100%;object-fit:cover;}

  nav{position:fixed;top:0;left:0;right:0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:20px 48px;z-index:100;background:rgba(247,241,234,0.88);backdrop-filter:blur(16px);border-bottom:1px solid var(--line);transition:all 0.3s;}
  .nav-left,.nav-right{display:flex;gap:28px;align-items:center;}
  .nav-right{justify-content:flex-end;}
  nav a{color:var(--charcoal);font-size:13px;transition:opacity 0.3s;}
  nav a:hover{opacity:0.6;}
  .logo{font-family:'Fraunces',serif;font-size:22px;font-weight:400;letter-spacing:-0.01em;text-align:center;}
  .logo em{font-style:italic;color:var(--gold);}
  .nav-cta{padding:10px 22px;background:var(--ink);color:var(--cream)!important;border-radius:100px;font-size:12px;letter-spacing:0.02em;transition:all 0.3s!important;opacity:1!important;}
  .nav-cta:hover{background:var(--accent)!important;opacity:1!important;}

  .hero{min-height:100vh;padding:140px 48px 80px;display:grid;grid-template-columns:1.1fr 1fr;gap:80px;align-items:center;position:relative;overflow:hidden;}
  .hero::before{content:"";position:absolute;top:30%;right:10%;width:500px;height:500px;background:radial-gradient(circle,rgba(212,184,160,0.3),transparent 60%);filter:blur(60px);pointer-events:none;}
  .eyebrow{display:inline-flex;align-items:center;gap:10px;padding:6px 14px;background:rgba(154,107,74,0.1);border:1px solid rgba(154,107,74,0.25);border-radius:100px;color:var(--accent);margin-bottom:32px;}
  .eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s infinite;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
  .hero h1{font-family:'Fraunces',serif;font-size:clamp(52px,7vw,104px);font-weight:300;line-height:0.98;letter-spacing:-0.03em;margin-bottom:32px;}
  .hero h1 em{font-style:italic;color:var(--accent);}
  .hero-desc{font-size:18px;color:var(--charcoal);max-width:480px;margin-bottom:44px;line-height:1.6;}
  .hero-desc strong{color:var(--ink);font-weight:500;}
  .hero-ctas{display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:48px;}
  .btn{display:inline-flex;align-items:center;gap:10px;padding:16px 28px;border-radius:100px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.3s;cursor:pointer;border:none;font-family:'Geist',sans-serif;}
  .btn-primary{background:var(--ink);color:var(--cream);}
  .btn-primary:hover{background:var(--accent);transform:translateY(-1px);}
  .btn-ghost{color:var(--ink);border-bottom:1px solid var(--ink);border-radius:0;padding:4px 0;gap:6px;background:transparent;}
  .btn-ghost:hover{color:var(--accent);border-color:var(--accent);}
  .hero-trust{display:flex;align-items:center;gap:14px;}
  .trust-avatars{display:flex;}
  .trust-avatars div{width:32px;height:32px;border-radius:50%;border:2px solid var(--cream);background-size:cover;background-position:center;margin-left:-8px;}
  .trust-avatars div:first-child{margin-left:0;}
  .trust-text{font-size:13px;color:var(--charcoal);line-height:1.3;}
  .trust-text strong{color:var(--ink);}

  .hero-right{position:relative;aspect-ratio:4/5;}
  .hero-img-main{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(42,29,22,0.2) 100%),url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&q=85') center/cover;border-radius:200px 200px 20px 20px;box-shadow:0 40px 80px rgba(92,64,51,0.2);}
  .hero-tag{position:absolute;bottom:28px;left:28px;right:28px;display:flex;justify-content:space-between;align-items:flex-end;color:var(--cream);z-index:2;}
  .hero-tag-label{font-family:'Fraunces',serif;font-style:italic;font-size:22px;}
  .float-card{position:absolute;background:var(--cream);padding:18px 22px;border-radius:20px;box-shadow:0 20px 50px rgba(92,64,51,0.15);z-index:3;border:1px solid var(--line);}
  .float-card.one{top:12%;left:-10%;animation:floatA 6s ease-in-out infinite;}
  .float-card.two{bottom:18%;right:-8%;animation:floatB 7s ease-in-out infinite;}
  @keyframes floatA{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  @keyframes floatB{0%,100%{transform:translateY(0);}50%{transform:translateY(10px);}}
  .fc-label{font-size:10px;color:var(--mute);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:4px;}
  .fc-value{font-family:'Fraunces',serif;font-size:26px;font-weight:400;color:var(--ink);line-height:1;}
  .fc-value em{font-style:italic;color:var(--accent);}
  .fc-note{font-size:11px;color:var(--accent);margin-top:4px;}

  .ticker-wrap{background:var(--ink);padding:14px 0;overflow:hidden;}
  .ticker{display:flex;gap:48px;animation:ticker 25s linear infinite;white-space:nowrap;}
  @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}

  .section{padding:120px 48px;}
  .section-head{text-align:center;max-width:720px;margin:0 auto 80px;}
  .section-head .micro{color:var(--accent);margin-bottom:20px;display:inline-block;}
  .section-head h2{font-family:'Fraunces',serif;font-size:clamp(40px,5.5vw,76px);font-weight:300;line-height:1;letter-spacing:-0.025em;margin-bottom:20px;}
  .section-head h2 em{font-style:italic;color:var(--accent);}
  .section-head p{color:var(--charcoal);font-size:17px;line-height:1.6;}

  .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1200px;margin:0 auto;}
  .step{background:var(--sand);padding:36px;border-radius:24px;position:relative;overflow:hidden;transition:transform 0.4s;}
  .step:hover{transform:translateY(-4px);}
  .step-number{font-family:'Fraunces',serif;font-style:italic;font-size:72px;font-weight:300;color:var(--accent);line-height:1;opacity:0.3;position:absolute;top:24px;right:28px;}
  .step-icon{width:48px;height:48px;border-radius:12px;background:var(--cream);display:flex;align-items:center;justify-content:center;margin-bottom:28px;color:var(--accent);}
  .step h3{font-family:'Fraunces',serif;font-size:26px;font-weight:400;letter-spacing:-0.01em;margin-bottom:12px;}
  .step h3 em{font-style:italic;color:var(--accent);}
  .step p{color:var(--charcoal);font-size:14px;line-height:1.6;}

  .value{padding:120px 48px;background:var(--ink);color:var(--cream);border-radius:40px;margin:40px 20px;position:relative;overflow:hidden;}
  .value::before{content:"";position:absolute;bottom:-200px;right:-100px;width:500px;height:500px;background:radial-gradient(circle,rgba(201,168,76,0.2),transparent 60%);filter:blur(60px);pointer-events:none;}
  .value-content{max-width:900px;margin:0 auto;position:relative;z-index:1;}
  .value .micro{color:var(--nude);margin-bottom:32px;display:block;}
  .value h2{font-family:'Fraunces',serif;font-size:clamp(40px,5vw,68px);font-weight:300;line-height:1.05;letter-spacing:-0.02em;margin-bottom:60px;}
  .value h2 em{font-style:italic;color:var(--blush);}
  .value-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:40px 60px;padding-top:40px;border-top:1px solid rgba(247,241,234,0.15);}
  .v-num{font-family:'Fraunces',serif;font-style:italic;font-size:42px;font-weight:400;color:var(--gold);margin-bottom:12px;line-height:1;}
  .value-item h4{font-family:'Fraunces',serif;font-size:22px;font-weight:400;margin-bottom:8px;color:var(--cream);}
  .value-item p{color:rgba(247,241,234,0.65);font-size:14px;line-height:1.6;}

  .gallery{padding:120px 48px;}
  .product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;max-width:1300px;margin:0 auto;}
  .product{position:relative;cursor:pointer;}
  .product-img{aspect-ratio:3/4;border-radius:20px;overflow:hidden;background:var(--sand);margin-bottom:14px;position:relative;}
  .product-img img{transition:transform 0.8s cubic-bezier(0.23,1,0.32,1);}
  .product:hover .product-img img{transform:scale(1.06);}
  .product-tag{position:absolute;top:14px;left:14px;padding:5px 12px;background:rgba(247,241,234,0.95);backdrop-filter:blur(8px);border-radius:100px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;font-weight:500;color:var(--ink);}
  .product-name{font-family:'Fraunces',serif;font-size:20px;font-weight:400;margin-bottom:4px;}
  .product-name em{font-style:italic;color:var(--accent);}
  .product-meta{color:var(--mute);font-size:13px;}

  .testi-section{padding:120px 48px;background:var(--sand);}
  .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1200px;margin:0 auto;}
  .testi{background:var(--cream);padding:32px;border-radius:20px;}
  .testi-quote{font-family:'Fraunces',serif;font-size:19px;font-weight:300;line-height:1.45;letter-spacing:-0.01em;margin-bottom:28px;color:var(--ink);}
  .testi-quote em{font-style:italic;color:var(--accent);}
  .testi-author{display:flex;align-items:center;gap:12px;padding-top:20px;border-top:1px solid var(--line);}
  .t-avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:16px;font-weight:400;color:white;flex-shrink:0;}
  .t-name{font-weight:500;font-size:14px;}
  .t-title{color:var(--mute);font-size:12px;}

  .faq-section{padding:120px 48px;}
  .faq-list{max-width:760px;margin:0 auto;}
  .faq{border-top:1px solid var(--line);padding:28px 0;cursor:pointer;}
  .faq:last-child{border-bottom:1px solid var(--line);}
  .faq-q{display:flex;justify-content:space-between;align-items:center;gap:32px;}
  .faq-q h4{font-family:'Fraunces',serif;font-size:22px;font-weight:400;letter-spacing:-0.01em;color:var(--ink);}
  .faq-plus{font-family:'Fraunces',serif;font-size:24px;color:var(--accent);transition:transform 0.3s;flex-shrink:0;}
  .faq.open .faq-plus{transform:rotate(45deg);}
  .faq-a{max-height:0;overflow:hidden;color:var(--charcoal);line-height:1.7;transition:max-height 0.4s ease,padding 0.4s ease;font-size:15px;}
  .faq.open .faq-a{max-height:240px;padding-top:18px;}

  .final{padding:160px 48px 120px;text-align:center;position:relative;overflow:hidden;}
  .final::before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:500px;background:radial-gradient(ellipse,rgba(212,184,160,0.35),transparent 60%);filter:blur(60px);}
  .final-content{position:relative;z-index:1;max-width:800px;margin:0 auto;}
  .final h2{font-family:'Fraunces',serif;font-size:clamp(48px,7vw,104px);font-weight:300;line-height:0.98;letter-spacing:-0.03em;margin-bottom:28px;}
  .final h2 em{font-style:italic;color:var(--accent);}
  .final p{color:var(--charcoal);font-size:18px;margin-bottom:40px;max-width:520px;margin-left:auto;margin-right:auto;}

  .install-form{display:flex;gap:0;max-width:480px;margin:0 auto;border-radius:100px;overflow:hidden;box-shadow:0 8px 40px rgba(42,29,22,0.15);border:1px solid var(--line);background:white;}
  .install-input{flex:1;padding:14px 22px;border:none;font-size:14px;color:var(--ink);background:transparent;font-family:'Geist',sans-serif;}
  .install-input:focus{outline:none;}
  .install-input::placeholder{color:var(--mute);}

  footer{padding:60px 48px 32px;border-top:1px solid var(--line);background:var(--sand);}
  .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:60px;max-width:1300px;margin:0 auto 60px;}
  .footer-logo{font-family:'Fraunces',serif;font-size:36px;font-weight:400;line-height:1;margin-bottom:16px;}
  .footer-logo em{font-style:italic;color:var(--gold);}
  .footer-brand p{color:var(--mute);font-size:13px;max-width:280px;line-height:1.6;}
  .footer-col h4{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:20px;color:var(--mute);font-weight:500;}
  .footer-col ul{list-style:none;}
  .footer-col li{margin-bottom:10px;}
  .footer-col a{color:var(--ink);font-size:13px;transition:color 0.2s;}
  .footer-col a:hover{color:var(--accent);}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:32px;border-top:1px solid var(--line);color:var(--mute);font-size:12px;max-width:1300px;margin:0 auto;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeScale{from{opacity:0;transform:scale(0.96);}to{opacity:1;transform:scale(1);}}
  .hero-left > *{animation:fadeUp 1s cubic-bezier(0.23,1,0.32,1) both;}
  .eyebrow{animation-delay:0.1s!important;}
  .hero h1{animation-delay:0.25s!important;}
  .hero-desc{animation-delay:0.4s!important;}
  .hero-ctas{animation-delay:0.55s!important;}
  .hero-trust{animation-delay:0.7s!important;}
  .hero-right{animation:fadeScale 1.4s 0.3s cubic-bezier(0.23,1,0.32,1) both;}

  @media(max-width:1024px){.product-grid{grid-template-columns:repeat(2,1fr);}.value-grid{grid-template-columns:1fr;gap:32px;}}
  @media(max-width:900px){nav{padding:16px 20px;}.nav-left,.nav-right a:not(.nav-cta){display:none;}.logo{text-align:left;font-size:18px;}.hero{grid-template-columns:1fr;padding:110px 20px 60px;gap:40px;}.float-card{display:none!important;}.section,.gallery,.testi-section,.faq-section,.final{padding:80px 20px;}.value{padding:80px 24px;margin:20px 10px;border-radius:28px;}.steps,.testi-grid{grid-template-columns:1fr;}.footer-top{grid-template-columns:1fr 1fr;gap:32px;}.footer-bottom{flex-direction:column;gap:12px;text-align:center;}}
`;

export default function Home() {
  const [shopInput, setShopInput] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
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

  return (
    <>
      <Head>
        <title>Manexlux® — Your Hair Line. Zero Inventory.</title>
        <meta name="description" content="Launch your own private label hair extensions brand on Shopify. No inventory, no upfront cost. We manufacture, brand, and ship worldwide on your behalf." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Geist:wght@300;400;500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>

      {/* NAV */}
      <nav style={{ background: navSolid ? "rgba(247,241,234,0.96)" : "rgba(247,241,234,0.5)" }}>
        <div className="nav-left">
          <a href="#how">How it works</a>
          <a href="#collection">Collection</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="logo">Manexlux<em>®</em></div>
        <div className="nav-right">
          <a href="/dashboard">Sign in</a>
          <a href="#start" className="nav-cta">Start free →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="eyebrow micro">
            <span className="eyebrow-dot"></span>
            <span>Zero inventory · Zero upfront cost</span>
          </div>
          <h1>Your hair line.<br />Without the <em>warehouse</em>.</h1>
          <p className="hero-desc">Launch your own private label hair extensions brand — <strong>without buying a single bundle upfront.</strong> Sell under your name; we source, brand, and ship worldwide on your behalf.</p>
          <div className="hero-ctas">
            <a href="#start" className="btn btn-primary">Start your line — free →</a>
            <a href="#how" className="btn btn-ghost">See how it works →</a>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              {["#C9A84C","#8B6914","#5c4033","#3d2e24"].map(c => <div key={c} style={{ background:c }}></div>)}
            </div>
            <div className="trust-text">
              <strong>340+ founders</strong> launched this month<br />
              <span style={{ color:"var(--mute)" }}>Average first sale: 9 days</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-main">
            <div className="hero-tag">
              <span className="hero-tag-label">Raw virgin · 22″</span>
              <span className="micro" style={{ fontWeight:400 }}>Lookbook / 01</span>
            </div>
          </div>
          <div className="float-card one">
            <div className="fc-label">Order placed</div>
            <div className="fc-value">£ <em>480</em></div>
            <div className="fc-note">Your brand · shipped to London</div>
          </div>
          <div className="float-card two">
            <div className="fc-label">Your profit</div>
            <div className="fc-value"><em>62%</em> margin</div>
            <div className="fc-note">Paid on delivery</div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div style={{ overflow:"hidden" }}>
          <div className="ticker">
            {["Hair Influencers ✦","Salon Owners ✦","Beauty Entrepreneurs ✦","DTC Sellers ✦","MLM Escapees ✦","Brand Builders ✦","Hair Influencers ✦","Salon Owners ✦","Beauty Entrepreneurs ✦","DTC Sellers ✦","MLM Escapees ✦","Brand Builders ✦"].map((p,i) => (
              <span key={i} style={{ fontSize:13, fontWeight:500, color:"rgba(247,241,234,0.4)", letterSpacing:"0.05em" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-head">
          <div className="micro">The Process</div>
          <h2>Three steps.<br /><em>No stock. No guesswork.</em></h2>
          <p>From brand name to first shipment — built for founders who want to skip the capital barrier and start selling.</p>
        </div>
        <div className="steps">
          {[
            { n:"01", title:"Brand your", em:" line.", desc:"Choose your name, logo, and hair textures. We set up your private label Shopify store in minutes — completely free.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
            { n:"02", title:"Sell to your", em:" audience.", desc:"Market however you like — Instagram, TikTok, salon, referrals. Orders come in under your brand. You keep 100% of the margin.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
            { n:"03", title:"We ship", em:" worldwide.", desc:"Forward the order. We pack with your branding and ship to your customer anywhere in the world. 3–7 days delivery.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
          ].map((s,i) => (
            <Reveal key={i} delay={i*100}>
              <div className="step">
                <div className="step-number">{s.n}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}<em>{s.em}</em></h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUE */}
      <div className="value">
        <div className="value-content">
          <div className="micro">Why Manexlux</div>
          <h2>Most hair businesses fail because of <em>inventory risk</em>. We removed it.</h2>
          <div className="value-grid">
            {[
              { num:"£0", title:"Zero upfront cost", desc:"No bundles to buy. No warehouse to rent. No dead stock when trends change. You pay only when your customer pays you." },
              { num:"100%", title:"Your brand, front and centre", desc:"Packaging, thank-you cards, tissue wrap — all in your brand. Customers never see our name." },
              { num:"72h", title:"From order to door", desc:"Orders placed by 2pm ship same day. International delivery in 3–7 working days." },
              { num:"60%+", title:"Margins that actually matter", desc:"Manufacturer-direct pricing. You set retail. Typical founders keep 55–70% margin on every bundle sold." },
            ].map((v,i) => (
              <Reveal key={i} delay={i*80}>
                <div className="value-item">
                  <div className="v-num">{v.num}</div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* COLLECTION */}
      <section className="gallery" id="collection">
        <div className="section-head">
          <div className="micro">The Catalogue</div>
          <h2>Every texture.<br /><em>Every length.</em></h2>
          <p>Raw, virgin, and Remy human hair across five textures and lengths from 10″ to 40″.</p>
        </div>
        <div className="product-grid">
          {PRODUCTS.map((p,i) => (
            <Reveal key={i} delay={i*80}>
              <div className="product">
                <div className="product-img">
                  <span className="product-tag">{p.tag}</span>
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="product-name">{p.name.split(" ").map((w,j) => j===0?<em key={j}>{w} </em>:w+" ")}</div>
                <div className="product-meta">{p.meta}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section">
        <div className="section-head">
          <div className="micro">Founders</div>
          <h2>From audience to <em>empire</em>.</h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t,i) => (
            <Reveal key={i} delay={i*80}>
              <div className="testi">
                <div className="testi-quote">"{t.quote.replace(/\b(no more bundles|own line|Ridiculous)\b/gi, m => `<em>${m}</em>`)}"</div>
                <div className="testi-author">
                  <div className="t-avatar" style={{ background:`linear-gradient(135deg,#C9A84C,#8B6914)` }}>{t.initials}</div>
                  <div><div className="t-name">{t.name}</div><div className="t-title">{t.title}</div></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="section-head">
          <div className="micro">Questions</div>
          <h2>The <em>honest</em> answers.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f,i) => (
            <div key={i} className={`faq${openFaq===i?" open":""}`} onClick={() => setOpenFaq(openFaq===i?null:i)}>
              <div className="faq-q"><h4>{f.q}</h4><span className="faq-plus">+</span></div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="start">
        <div className="final-content">
          <Reveal>
            <h2>Your brand is <em>ready</em>.<br />Are you?</h2>
            <p>Launch your private label hair line in minutes. No inventory, no risk, no excuses. Just your name on beautiful hair.</p>
            <form onSubmit={install} className="install-form">
              <input className="install-input" value={shopInput} onChange={e => setShopInput(e.target.value)} placeholder="yourstore.myshopify.com" />
              <button type="submit" className="btn btn-primary" style={{ borderRadius:100 }}>Install Free →</button>
            </form>
            <p style={{ fontSize:12, color:"var(--mute)", marginTop:14, textAlign:"center" }}>No credit card required · Cancel anytime · $0 upfront inventory</p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">Manexlux<em>®</em></div>
            <p>Private label hair extensions, built for founders. Launch with zero capital. Ship anywhere.</p>
          </div>
          {[
            { title:"Platform", links:[["How it works","#how"],["Collection","#collection"],["Pricing","#start"]] },
            { title:"Support", links:[["FAQ","#faq"],["Help Center","/help"],["Contact","mailto:support@manexlux.com"]] },
            { title:"Legal", links:[["Terms","/terms"],["Privacy","/privacy"]] },
          ].map(col => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              <ul>{col.links.map(([l,h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Manexlux®. All Rights Reserved.</span>
          <span>Zero inventory · Ships worldwide</span>
        </div>
      </footer>
    </>
  );
}