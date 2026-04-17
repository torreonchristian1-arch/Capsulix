import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import SideNav from "../components/SideNav";
import { PageHeader, Toast } from "../components/Layout";
import { useTheme } from "./_app";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// ── 5 Hero Supplement Products ─────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Vitality Capsules",
    type: "Daily Capsule",
    tagline: "Your daily foundation for whole-body wellness",
    desc: "A premium encapsulated formula designed for daily use. Each variant is precisely dosed for maximum bioavailability and effectiveness.",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
    wholesale: 14.99,
    suggestedRetail: 39.99,
    servings: "60 capsules · 30 servings",
    icon: "💊",
    goals: ["energy", "immunity", "hairskinnails"],
    customOptions: {
      energy: { active: "B-Complex + CoQ10 + Ashwagandha", benefit: "Sustained energy without the crash", dosage: "2 capsules daily with breakfast" },
      immunity: { active: "Vitamin C 1000mg + Zinc + Elderberry", benefit: "Strengthens immune defence year-round", dosage: "2 capsules daily" },
      hairskinnails: { active: "Biotin 10,000mcg + Collagen + Silica", benefit: "Strengthens hair, skin and nails from within", dosage: "2 capsules daily with food" },
    }
  },
  {
    id: 2,
    name: "Performance Powder",
    type: "Powder Formula",
    tagline: "Mix, shake, and reach your peak",
    desc: "A versatile powder formula that blends easily into water, smoothies or shakes. Engineered for performance with no fillers and no artificial sweeteners.",
    img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80",
    wholesale: 24.99,
    suggestedRetail: 59.99,
    servings: "300g · 30 servings",
    icon: "🥤",
    goals: ["fitness", "energy", "weightsupport"],
    customOptions: {
      fitness: { active: "Whey Isolate + Creatine + BCAAs", benefit: "Builds lean muscle and speeds recovery", dosage: "1 scoop post-workout in 250ml water" },
      energy: { active: "Caffeine 150mg + L-Theanine + B12", benefit: "Clean focus and energy without jitters", dosage: "1 scoop 20 mins before activity" },
      weightsupport: { active: "Plant Protein + Fibre + CLA", benefit: "Keeps you full and supports healthy weight", dosage: "1 scoop as a meal replacement or snack" },
    }
  },
  {
    id: 3,
    name: "Core Gummies",
    type: "Gummy Supplement",
    tagline: "The supplement people actually remember to take",
    desc: "Delicious, chewy gummies with clinical-grade actives. No horse pills, no bad taste — just real ingredients in a format your customers will love.",
    img: "https://images.unsplash.com/photo-1559181567-c3190ca9d5db?w=400&q=80",
    wholesale: 12.99,
    suggestedRetail: 32.99,
    servings: "60 gummies · 30 servings",
    icon: "🍬",
    goals: ["immunity", "hairskinnails", "energy"],
    customOptions: {
      immunity: { active: "Vitamin C + D3 + Zinc Gummies", benefit: "Tasty immune support the whole family can take", dosage: "2 gummies daily" },
      hairskinnails: { active: "Biotin + Folic Acid + Vitamin E Gummies", benefit: "Delicious way to nourish hair, skin and nails", dosage: "2 gummies daily with food" },
      energy: { active: "B12 + Iron + Vitamin D3 Gummies", benefit: "Fight fatigue with great-tasting daily vitamins", dosage: "2 gummies every morning" },
    }
  },
  {
    id: 4,
    name: "Slim & Balance",
    type: "Weight Management",
    tagline: "Support healthy weight the smart way",
    desc: "A scientifically formulated weight management supplement. Works best alongside a balanced diet and active lifestyle — no extreme claims, just real support.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    wholesale: 19.99,
    suggestedRetail: 49.99,
    servings: "90 capsules · 30 servings",
    icon: "⚖️",
    goals: ["weightsupport", "fitness", "energy"],
    customOptions: {
      weightsupport: { active: "Green Tea Extract + Glucomannan + L-Carnitine", benefit: "Supports healthy metabolism and appetite control", dosage: "3 capsules before main meals" },
      fitness: { active: "CLA 1000mg + Green Coffee + Chromium", benefit: "Supports fat metabolism during exercise", dosage: "3 capsules daily with meals" },
      energy: { active: "Guarana + B-Complex + MCT Oil", benefit: "Boosts metabolism and sustains energy levels", dosage: "3 capsules with breakfast" },
    }
  },
  {
    id: 5,
    name: "Radiance Complex",
    type: "Beauty Supplement",
    tagline: "Beauty nutrition from the inside out",
    desc: "A premium ingestible beauty supplement combining collagen, antioxidants and hair-skin-nail nutrients in one powerful daily formula.",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    wholesale: 22.99,
    suggestedRetail: 54.99,
    servings: "60 capsules · 30 servings",
    icon: "✨",
    goals: ["hairskinnails", "immunity", "weightsupport"],
    customOptions: {
      hairskinnails: { active: "Marine Collagen + Biotin + Astaxanthin", benefit: "Reduces hair loss, strengthens nails, improves skin elasticity", dosage: "2 capsules daily on an empty stomach" },
      immunity: { active: "Vitamin C + E + Selenium + Zinc", benefit: "Antioxidant defence with beauty benefits", dosage: "2 capsules daily with water" },
      weightsupport: { active: "Collagen Peptides + CLA + Green Tea", benefit: "Supports skin firmness during weight management", dosage: "2 capsules daily with breakfast" },
    }
  },
];

const GOALS = [
  { id: "all", label: "All Products", icon: "✦", desc: "Browse all 5 hero supplements" },
  { id: "energy", label: "Energy", icon: "⚡", desc: "Fight fatigue & boost vitality" },
  { id: "weightsupport", label: "Weight Support", icon: "⚖️", desc: "Healthy metabolism & balance" },
  { id: "fitness", label: "Fitness", icon: "💪", desc: "Performance & muscle recovery" },
  { id: "immunity", label: "Immunity", icon: "🛡️", desc: "Immune defence & protection" },
  { id: "hairskinnails", label: "Hair Skin & Nails", icon: "✨", desc: "Beauty from the inside out" },
];

export default function Catalogue() {
  const router = useRouter();
  const { shop } = router.query;
  const { theme: T } = useTheme();
  const [open, setOpen] = useState(true);
  const [goal, setGoal] = useState("all");
  const [selected, setSelected] = useState(null);
  const [published, setPublished] = useState({});
  const [publishing, setPublishing] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!shop) return;
    supabase.from("published_products").select("cucuma_product_id, shopify_product_id").eq("shop_domain", shop)
      .then(({ data }) => {
        if (data) {
          const map = {};
          data.forEach(p => { map[p.cucuma_product_id] = `https://${shop}/admin/products/${p.shopify_product_id}`; });
          setPublished(map);
        }
      });
  }, [shop]);

  const filtered = goal === "all" ? PRODUCTS : PRODUCTS.filter(p => p.goals.includes(goal));

  function getCustom(product) {
    const g = product.goals.includes(goal) ? goal : product.goals[0];
    return { goal: g, data: product.customOptions[g] };
  }

  function profitCalc(p) {
    const margin = Math.round(((p.suggestedRetail - p.wholesale) / p.suggestedRetail) * 100);
    return { margin, profit: (p.suggestedRetail - p.wholesale).toFixed(2) };
  }

  async function handlePublish(product) {
    if (!shop) { setToast({ msg: "No store connected.", type: "error" }); return; }
    if (published[product.id] || publishing === product.id) return;
    const { goal: activeGoal, data: custom } = getCustom(product);
    const goalLabel = GOALS.find(g => g.id === activeGoal)?.label || activeGoal;
    setPublishing(product.id);
    try {
      const res = await fetch("/api/products/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shop,
          product: {
            id: product.id,
            name: product.name,
            desc: `${product.desc}\n\nFormulated for ${goalLabel}: ${custom?.benefit || product.tagline}.\nKey Active: ${custom?.active || "Premium formula"}.\nDosage: ${custom?.dosage || "As directed"}.\nServings: ${product.servings}.`,
            price: String(product.wholesale),
            category: product.type,
            moq: 25,
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setPublished(prev => ({ ...prev, [product.id]: data.shopifyProductUrl || "#" }));
        setToast({ msg: `${product.name} published to your store!`, type: "success" });
        setSelected(null);
      } else setToast({ msg: data.error || "Failed to publish.", type: "error" });
    } catch { setToast({ msg: "Network error. Please try again.", type: "error" }); }
    setPublishing(null);
  }

  return (
    <div style={{ display:"flex", height:"100vh", background:T.bgBase, overflow:"hidden" }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes toastIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        .goal-btn{cursor:pointer;border-radius:12px;padding:12px 10px;transition:all 0.2s;border:1px solid;font-family:'DM Sans',sans-serif;background:none;text-align:center;width:100%;}
        .goal-btn:hover{transform:translateY(-2px);}
        .pcard{transition:all 0.22s;border-radius:16px;overflow:hidden;cursor:pointer;}
        .pcard:hover{transform:translateY(-4px);box-shadow:${T.shadowMd};}
        .pcard:hover .pimg img{transform:scale(1.05);}
        .pimg img{transition:transform 0.4s;}
        .pub-btn{width:100%;padding:13px;font-size:14px;font-weight:700;border-radius:10px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:'DM Sans',sans-serif;border:none;}
        .pub-btn:hover:not(:disabled){filter:brightness(1.08);transform:translateY(-1px);}
        .pub-btn:disabled{opacity:0.7;cursor:default;}
        .modal-bg{position:fixed;inset:0;background:rgba(10,22,40,0.6);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;}
        .modal{background:${T.bgCard};border-radius:20px;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,0.3);animation:slideUp 0.25s ease;}
        @media(max-width:1100px){.pgrid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:768px){.mpad{padding:16px!important;}.goals-row{grid-template-columns:repeat(3,1fr)!important;}.pgrid{grid-template-columns:1fr 1fr!important;}.hide-mobile{display:none!important;}}
        @media(max-width:480px){.goals-row{grid-template-columns:repeat(2,1fr)!important;}.pgrid{grid-template-columns:1fr!important;}}
      `}</style>

      {toast && <div style={{ position:"fixed", bottom:20, right:20, zIndex:1000, background:T.bgCard, border:`1px solid ${toast.type==="success"?T.oliveBorder:T.orangeBorder}`, borderRadius:10, padding:"13px 16px", maxWidth:320, boxShadow:T.shadowMd, display:"flex", alignItems:"center", gap:10, animation:"toastIn 0.25s ease" }}><div style={{ width:7, height:7, borderRadius:"50%", background:toast.type==="success"?T.olive:T.orange, flexShrink:0 }}></div><span style={{ fontSize:13, color:T.textPrimary, fontWeight:500 }}>{toast.msg}</span><button onClick={()=>setToast(null)} style={{ background:"none", border:"none", cursor:"pointer", color:T.textTertiary, fontSize:18, marginLeft:"auto" }}>×</button></div>}

      {/* Product Modal */}
      {selected && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setSelected(null);}}>
          <div className="modal">
            <div style={{ height:220, overflow:"hidden", position:"relative", background:T.bgElevated }}>
              <img src={selected.img} alt={selected.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <button onClick={()=>setSelected(null)} style={{ position:"absolute", top:14, right:14, background:"rgba(0,0,0,0.45)", backdropFilter:"blur(8px)", border:"none", borderRadius:"50%", width:34, height:34, cursor:"pointer", color:"white", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              {published[selected.id] && <div style={{ position:"absolute", top:14, left:14, background:"rgba(27,94,138,0.92)", color:"white", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:100 }}>✓ Live in Your Store</div>}
            </div>

            <div style={{ padding:"24px 26px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                <div>
                  <div style={{ fontSize:10, fontWeight:700, color:T.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:4 }}>{selected.type} · {selected.servings}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:T.textPrimary }}>{selected.name}</div>
                  <div style={{ fontSize:13, color:T.textSecondary, marginTop:3 }}>{selected.tagline}</div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:12 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:T.textPrimary }}>${selected.wholesale}</div>
                  <div style={{ fontSize:10, color:T.textTertiary }}>wholesale / unit</div>
                </div>
              </div>

              {/* Goal selector */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.textTertiary, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Customer Health Goal</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {selected.goals.map(g => {
                    const gd = GOALS.find(x => x.id === g);
                    const isSel = goal === g || (goal === "all" && g === selected.goals[0]);
                    return (
                      <button key={g} onClick={() => setGoal(g)}
                        style={{ padding:"6px 14px", borderRadius:100, fontSize:12, fontWeight:600, cursor:"pointer", border:`1px solid ${isSel?T.oliveBorder:T.borderSubtle}`, background:isSel?T.oliveSubtle:"transparent", color:isSel?T.olive:T.textSecondary, fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s" }}>
                        {gd?.icon} {gd?.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Formula for selected goal */}
              {(() => {
                const ag = selected.goals.includes(goal) ? goal : selected.goals[0];
                const custom = selected.customOptions[ag];
                const gd = GOALS.find(x => x.id === ag);
                return custom ? (
                  <div style={{ background:T.oliveSubtle, border:`1px solid ${T.oliveBorder}`, borderRadius:10, padding:"14px", marginBottom:16 }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:9, background:T.bgCard, border:`1px solid ${T.oliveBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{gd?.icon}</div>
                      <div>
                        <div style={{ fontSize:11, fontWeight:700, color:T.olive, marginBottom:2 }}>Formula for {gd?.label}</div>
                        <div style={{ fontSize:13, color:T.textPrimary, fontWeight:600, marginBottom:2 }}>{custom.active}</div>
                        <div style={{ fontSize:12, color:T.textSecondary, marginBottom:4 }}>{custom.benefit}</div>
                        <div style={{ fontSize:11, color:T.textTertiary, background:T.bgCard, borderRadius:6, padding:"4px 8px", display:"inline-block" }}>📋 {custom.dosage}</div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}

              <p style={{ fontSize:13, color:T.textSecondary, lineHeight:1.75, marginBottom:18 }}>{selected.desc}</p>

              {/* Profit */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:18 }}>
                {[
                  { l:"Your Cost", v:`$${selected.wholesale}`, s:"per unit", c:T.textSecondary },
                  { l:"Suggested Retail", v:`$${selected.suggestedRetail}`, s:"you set the price", c:T.textPrimary },
                  { l:"Est. Profit", v:`$${profitCalc(selected).profit}`, s:`${profitCalc(selected).margin}% margin`, c:T.olive },
                ].map(i => (
                  <div key={i.l} style={{ background:T.bgBase, border:`1px solid ${T.borderSubtle}`, borderRadius:10, padding:"11px", textAlign:"center" }}>
                    <div style={{ fontSize:9, fontWeight:700, color:T.textTertiary, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{i.l}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:700, color:i.c }}>{i.v}</div>
                    <div style={{ fontSize:10, color:T.textTertiary, marginTop:1 }}>{i.s}</div>
                  </div>
                ))}
              </div>

              {published[selected.id] ? (
                <div style={{ display:"flex", gap:8 }}>
                  <div style={{ flex:1, background:T.oliveSubtle, border:`1px solid ${T.oliveBorder}`, borderRadius:10, padding:"12px", textAlign:"center", fontSize:14, fontWeight:700, color:T.olive }}>✓ Published to Store</div>
                  <a href={published[selected.id] !== "#" ? published[selected.id] : undefined} target="_blank" rel="noreferrer" style={{ background:T.bgSurface, border:`1px solid ${T.borderDefault}`, borderRadius:10, padding:"12px 16px", fontSize:13, fontWeight:600, color:T.textSecondary, cursor:"pointer" }}>View →</a>
                </div>
              ) : (
                <button className="pub-btn" onClick={() => handlePublish(selected)} disabled={publishing === selected.id}
                  style={{ background:T.olive, color:"white" }}>
                  {publishing === selected.id
                    ? <><span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"white", borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite" }}></span>Publishing to Shopify...</>
                    : `Publish ${selected.name} to Your Store →`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <SideNav active="catalogue" shop={shop} open={open} />
      <main style={{ flex:1, overflow:"auto" }}>
        <PageHeader
          title="Product Catalogue"
          subtitle="5 hero supplements · customised for your customers' health goals"
          onMenuToggle={() => setOpen(!open)}
          actions={
            <div style={{ display:"flex", alignItems:"center", gap:8, background:T.oliveSubtle, border:`1px solid ${T.oliveBorder}`, borderRadius:8, padding:"6px 14px" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:T.olive }}></div>
              <span style={{ fontSize:12, fontWeight:700, color:T.olive }}>{Object.keys(published).length} / {PRODUCTS.length} Published</span>
            </div>
          }
        />

        <div className="mpad" style={{ padding:"20px 24px" }}>
          {/* Goal filters */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textTertiary, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>Filter by Customer Health Goal</div>
            <div className="goals-row" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8 }}>
              {GOALS.map(g => (
                <button key={g.id} className="goal-btn" onClick={() => setGoal(g.id)}
                  style={{ background:goal===g.id?T.oliveSubtle:T.bgCard, borderColor:goal===g.id?T.oliveBorder:T.borderSubtle, boxShadow:goal===g.id?`0 4px 16px ${T.olive}20`:T.shadow }}>
                  <div style={{ fontSize:22, marginBottom:5 }}>{g.icon}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:goal===g.id?T.olive:T.textPrimary, marginBottom:2 }}>{g.label}</div>
                  <div style={{ fontSize:10, color:T.textTertiary, lineHeight:1.4 }}>{g.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:600, color:T.textPrimary }}>
              {goal === "all" ? "All Supplements" : `${GOALS.find(g => g.id === goal)?.label} Supplements`}
              <span style={{ fontSize:12, color:T.textTertiary, fontWeight:400, marginLeft:6 }}>({filtered.length} products)</span>
            </div>
            {goal !== "all" && (
              <div style={{ fontSize:12, color:T.textSecondary, background:T.bgCard, border:`1px solid ${T.borderSubtle}`, borderRadius:8, padding:"5px 12px" }}>
                Showing formulas optimised for <strong style={{ color:T.olive }}>{GOALS.find(g => g.id === goal)?.label}</strong>
              </div>
            )}
          </div>

          {/* Products */}
          <div className="pgrid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14 }}>
            {filtered.map(product => {
              const isPub = published[product.id];
              const { goal: ag, data: custom } = getCustom(product);
              const { margin } = profitCalc(product);
              const gd = GOALS.find(g => g.id === ag);

              return (
                <div key={product.id} className="pcard" onClick={() => setSelected(product)}
                  style={{ background:T.bgCard, border:`1px solid ${isPub?T.oliveBorder:T.borderSubtle}`, boxShadow:T.shadow }}>

                  <div className="pimg" style={{ aspectRatio:"1", overflow:"hidden", position:"relative", background:T.bgElevated }}>
                    <img src={product.img} alt={product.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <div style={{ position:"absolute", top:8, left:8, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)", color:"white", fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:100 }}>{product.type.toUpperCase()}</div>
                    {isPub && (
                      <div style={{ position:"absolute", inset:0, background:"rgba(27,94,138,0.88)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
                        <div style={{ width:34, height:34, borderRadius:"50%", background:"white", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.olive} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span style={{ fontSize:10, fontWeight:700, color:"white" }}>Live in Store</span>
                      </div>
                    )}
                    {goal !== "all" && (
                      <div style={{ position:"absolute", bottom:8, right:8, background:T.oliveSubtle, border:`1px solid ${T.oliveBorder}`, borderRadius:100, padding:"2px 7px", fontSize:9, fontWeight:700, color:T.olive }}>{gd?.icon}</div>
                    )}
                  </div>

                  <div style={{ padding:"12px 14px" }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:700, color:T.textPrimary, marginBottom:1 }}>{product.name}</div>
                    <div style={{ fontSize:10, color:T.textTertiary, marginBottom:8 }}>{product.servings}</div>

                    {goal !== "all" && custom && (
                      <div style={{ background:T.oliveSubtle, border:`1px solid ${T.oliveBorder}`, borderRadius:6, padding:"6px 8px", marginBottom:8 }}>
                        <div style={{ fontSize:9, fontWeight:700, color:T.olive, marginBottom:1 }}>Formula</div>
                        <div style={{ fontSize:10, color:T.textPrimary, fontWeight:500, lineHeight:1.4 }}>{custom.active.split(" + ")[0]}</div>
                        <div style={{ fontSize:9, color:T.textSecondary, marginTop:1 }}>{custom.benefit.slice(0, 40)}...</div>
                      </div>
                    )}

                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:700, color:T.textPrimary }}>${product.wholesale}</div>
                        <div style={{ fontSize:9, color:T.textTertiary }}>wholesale</div>
                      </div>
                      <div style={{ background:T.oliveSubtle, border:`1px solid ${T.oliveBorder}`, borderRadius:100, padding:"2px 8px", fontSize:10, fontWeight:700, color:T.olive }}>{margin}% margin</div>
                    </div>

                    <div style={{ width:"100%", padding:"8px", fontSize:11, fontWeight:600, borderRadius:7, textAlign:"center", background:isPub?T.oliveSubtle:"transparent", border:`1px solid ${isPub?T.oliveBorder:T.borderDefault}`, color:isPub?T.olive:T.textSecondary }}>
                      {isPub ? "Published ✓" : "Customise & Publish →"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 24px", background:T.bgCard, border:`1px solid ${T.borderSubtle}`, borderRadius:14, marginTop:8 }}>
              <div style={{ fontSize:32, marginBottom:12 }}>💊</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:T.textPrimary, marginBottom:8 }}>No supplements for this goal</div>
              <p style={{ fontSize:13, color:T.textTertiary }}>Try a different goal or browse all products.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}