const zh = {
  badge: "AI是你的CTO,CMO和CFO",
  heroTitle: "一人公司的AI合伙人",
  heroSub: "专为新时代个体创业者打造。ClawFirm 作为你的 AI 合伙人，深度嵌入商业全链路，让一个人也能拥有一座工厂的战斗力，完成从创意到现金流的完整商业闭环。",
  heroCta: "立即开始",
  heroLearn: "了解更多",
  featuresLabel: "核心能力",
  featuresTitle: "AI合伙人帮你赚钱",
  featuresSub: "四大变现路径，AI 全程出力",
  f1Title: "全栈软件出海",
  f1Desc: "从深度用户调研、功能构建到自动化营销，AI 帮你像一支完整团队一样打造并分发软件产品，通过真实付费反馈快速迭代。",
  f2Title: "自动化套利交易",
  f2Desc: "利用 AI 敏锐捕捉市场信号，通过算法实现高效率的交易获利，让资产在自动化流程中稳健增值。",
  f3Title: "自媒体矩阵分发",
  f3Desc: "针对不同平台特征，AI 自动生成高转化内容并精准投喂流量，让你的个人品牌和产品实现全网裂变。",
  f4Title: "跨境电商搬运套利",
  f4Desc: "从 1688 选品到 Amazon/独立站上架，AI 自动计算利润、监控竞品价格、批量处理商品信息，实现选品-上架-定价全链路自动化。",
  deployTitle: "专业用户？自己动手",
  deploySub: "5 分钟内从零到运行，无需付费",
  s1Title: "安装 ClawFirm",
  s1Desc: "全局安装 ClawFirm 并自动配置全部工具链，需要 Node 18+",
  s2Title: "运行工作流",
  s2Desc: "使用 .whip DSL 编排多 AI Agent 协作，一条命令执行完整业务流程",
  s3Title: "用自然语言创建模块",
  s3Desc: "描述你的业务需求，AI 自动生成完整的 whip 工作流模块",
  s4Title: "同步 Skills 到 Claude Code",
  s4Desc: "将 AI Skills 同步到 Claude Code，在任何会话中随时调用",
  deployCta: "查看完整文档 →",
  pricingBadge: "一次付费 · 终身受益",
  pricingTitle: "专业部署服务",
  pricingPrice: "¥999",
  pricingUnit: "一次性",
  pricingDesc: "完整安装部署 + 配置指导",
  pf1: "远程一对一环境配置",
  pf2: "全部核心模块安装部署",
  pf3: "个性化工作流配置",
  pf4: "30 天技术支持保障",
  pricingCta: "立即购买部署服务",
  contactTitle: "加入社区",
  contactSub: "与我们一起探索 AI 赚钱的无限可能",
  contactWechat: "微信号: PpCiting",
  ctaHeadline: "准备好让AI合伙人为你赚钱了吗？",
  ctaSub: "无需技术背景，一次付费，专属配置，永久使用",
  ctaBtn: "立即开始",
  ctaNote: "30 天技术支持 · 无隐藏费用",
  footer: "消除技术壁垒，释放个体潜能。",
};

const en = {
  badge: "Your AI Business Partner",
  heroTitle: "The AI Partner for One Person Companies",
  heroSub: "ClawFirm acts as your AI partner, deeply integrated into every aspect of your business — empowering one person to have the firepower of an entire factory, from idea to cash flow.",
  heroCta: "Get Started",
  heroLearn: "Learn More",
  featuresLabel: "Core Capabilities",
  featuresTitle: "Your AI Partner Makes You Money",
  featuresSub: "Four profit paths, AI does the heavy lifting",
  f1Title: "Full-Stack Software for Global Markets",
  f1Desc: "From deep user research and feature development to automated marketing, AI helps you build and distribute software products like a full team — iterating rapidly with real paid user feedback.",
  f2Title: "Automated Arbitrage and Trading",
  f2Desc: "Leveraging AI to capture market signals with precision, executing efficient algorithmic trades to steadily grow your assets through automated workflows.",
  f3Title: "Creator Economy",
  f3Desc: "Tailored to each platform's characteristics, AI auto-generates high-conversion content and precisely distributes traffic, enabling the content for your personal brand or ad to go viral across social media platforms.",
  f4Title: "Cross-Border E-Commerce",
  f4Desc: "From sourcing on 1688 to listing on Amazon or your own store — AI auto-calculates margins, monitors competitor pricing, and batch-processes product info, automating the entire pipeline from sourcing to listing to pricing.",
  deployTitle: "Power User? DIY",
  deploySub: "From zero to running in under 5 minutes, free",
  s1Title: "Install ClawFirm",
  s1Desc: "Install ClawFirm globally and auto-configure the full toolchain. Requires Node 18+",
  s2Title: "Run a Workflow",
  s2Desc: "Orchestrate multi-agent AI workflows with .whip DSL — one command runs the full pipeline",
  s3Title: "Create Modules with Natural Language",
  s3Desc: "Describe your business needs, AI auto-generates a complete whip workflow module",
  s4Title: "Sync Skills to Claude Code",
  s4Desc: "Sync AI skills to Claude Code, making them available in any session",
  deployCta: "View Full Docs →",
  pricingBadge: "One-Time Payment · Lifetime Value",
  pricingTitle: "Professional Deployment",
  pricingPrice: "$145",
  pricingUnit: "one-time",
  pricingDesc: "Complete Installation & Configuration Guidance",
  pf1: "Remote 1-on-1 Environment Setup",
  pf2: "All Core Modules Deployment",
  pf3: "Personalized Workflow Configuration",
  pf4: "30-Day Technical Support",
  pricingCta: "Purchase Deployment Service",
  contactTitle: "Join Our Community",
  contactSub: "Explore the endless possibilities of making money with AI",
  contactWechat: "WeChat: PpCiting",
  ctaHeadline: "Ready to Let Your AI Partner Make You Money?",
  ctaSub: "No technical background needed. One-time payment, custom setup, lifetime access.",
  ctaBtn: "Get Started Now",
  ctaNote: "30-day support · No hidden fees",
  footer: "Breaking down technical barriers, unleashing individual potential.",
};

// Client-side i18n — no React state, works with static HTML
const i18nScript = `
(function(){
  function apply(lang) {
    document.querySelectorAll('[data-zh]').forEach(function(el){
      el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
    });
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      var active = btn.getAttribute('data-lang') === lang;
      btn.style.border = active ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent';
      btn.style.background = active ? 'rgba(255,255,255,0.1)' : 'transparent';
      btn.style.backdropFilter = active ? 'blur(12px)' : 'none';
      btn.style.color = active ? 'rgb(240,237,229)' : 'rgba(255,255,255,0.5)';
    });
    localStorage.setItem('cf_lang', lang);
  }
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.lang-btn');
    if (btn) apply(btn.getAttribute('data-lang'));
  });
  function init() {
    apply(localStorage.getItem('cf_lang') || 'en');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
`;

import NavAuth from "./components/NavAuth";

function T({ zh: z, en: e }: { zh: string; en: string }) {
  return <span data-zh={z} data-en={e} suppressHydrationWarning>{e}</span>;
}

export default function Home() {
  const t = zh;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <script dangerouslySetInnerHTML={{ __html: i18nScript }} />

      {/* ── Decorative blobs ── */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(38,136,249,0.18) 0%, transparent 70%)", filter: "blur(60px)", top: "-200px", left: "-200px" }} />
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,60,200,0.14) 0%, transparent 70%)", filter: "blur(80px)", top: "30%", right: "-150px" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(38,136,249,0.10) 0%, transparent 70%)", filter: "blur(100px)", bottom: "0px", left: "30%" }} />
      </div>

      {/* ── Floating Nav ── */}
      <nav className="cf-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          <svg className="cf-nav-icon" viewBox="0 0 512 512" width="36" height="36" aria-label="ClawFirm"><defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF6B5A"/><stop offset="30%" stopColor="#FF5A45"/><stop offset="100%" stopColor="#E13030"/></linearGradient><g id="sr"><line x1="256" y1="46" x2="256" y2="92" stroke="url(#sg)" strokeWidth="15" strokeLinecap="round"/><line x1="256" y1="164" x2="256" y2="206" stroke="url(#sg)" strokeWidth="15" strokeLinecap="round"/></g></defs>{[0,36,72,108,144,180,216,252,288,324].map(r=><use key={r} href="#sr" transform={`rotate(${r} 256 256)`}/>)}<path d="M 164 164 A 130 130 0 1 1 128 234" fill="none" stroke="url(#sg)" strokeWidth="52" strokeLinecap="round"/><g stroke="url(#sg)" strokeWidth="14" strokeLinecap="round"><line x1="164" y1="164" x2="120" y2="150"/><line x1="164" y1="164" x2="150" y2="120"/></g><path d="M 100 234 C 60 220, 50 160, 90 90" fill="none" stroke="url(#sg)" strokeWidth="5" strokeLinecap="round"/><path d="M 100 234 C 75 200, 100 130, 126 76" fill="none" stroke="url(#sg)" strokeWidth="3" strokeLinecap="round"/><g stroke="#8B2010" strokeWidth="6" strokeLinecap="round" opacity="0.4"><line x1="256" y1="106" x2="256" y2="148"/><line x1="333" y1="179" x2="363" y2="149"/><line x1="365" y1="256" x2="407" y2="256"/><line x1="333" y1="333" x2="363" y2="363"/><line x1="256" y1="408" x2="256" y2="366"/><line x1="149" y1="363" x2="179" y2="333"/></g><circle cx="146" cy="223" r="8" fill="#FFFFFF"/><circle cx="144" cy="221" r="3" fill="#1C1C1C"/></svg>
          <span className="cf-nav-title">ClawFirm</span>
        </div>
        <div className="cf-nav-links" style={{ display: "flex", alignItems: "center", gap: "24px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", fontWeight: 500 }}>
          <a href="#features" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}><T zh="核心能力" en="Features" /></a>
          <a href="/social-media.html" style={{ color: "var(--accent)", textDecoration: "none", transition: "color 0.2s" }}><T zh="自媒体" en="Creator" /></a>
          <a href="https://github.com/npc-live/clawfirm" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}>GitHub</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          {(["zh", "en"] as const).map((l) => (
            <button
              key={l}
              data-lang={l}
              className="lang-btn"
              suppressHydrationWarning
              style={{ padding: "6px 16px", borderRadius: "100px", border: "1px solid transparent", background: "transparent", color: "var(--text-muted)", fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.04em" }}
            >
              {l === "zh" ? "中文" : "EN"}
            </button>
          ))}
          <NavAuth />
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", width: "100vw", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 1 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(34,34,34,0.3) 0%, rgba(34,34,34,0.1) 50%, rgba(34,34,34,0.6) 100%)" }} />
        <div className="cf-hero-content" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "80px 24px 0", maxWidth: "900px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 18px", background: "rgba(38,136,249,0.15)", border: "1px solid rgba(38,136,249,0.3)", borderRadius: "100px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", fontWeight: 500, color: "#2688f9", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "40px", backdropFilter: "blur(12px)" }}>
            ✦ <T zh={t.badge} en={en.badge} />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.03em", lineHeight: 1.05, color: "rgba(255,255,255,0.95)", marginBottom: "32px" }}>
            <T zh={t.heroTitle} en={en.heroTitle} />
          </h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: "640px", margin: "0 auto 48px" }}>
            <T zh={t.heroSub} en={en.heroSub} />
          </p>
          <div className="cf-hero-cta" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" data-auth="register" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 36px", background: "#2688f9", color: "white", borderRadius: "12px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", fontWeight: 600, textDecoration: "none", cursor: "pointer", boxShadow: "0 4px 24px rgba(38,136,249,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
              <T zh={t.heroCta} en={en.heroCta} /> →
            </a>
            <a href="#features" style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.15)", color: "var(--text-primary)", borderRadius: "12px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>
              <T zh={t.heroLearn} en={en.heroLearn} />
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", animation: "bounce 2s ease-in-out infinite" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          scroll
        </div>
      </section>

      {/* ══ VIDEO ══ */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 16px 64px rgba(0,0,0,0.4)" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/_zSJTg3AVlY"
              title="ClawFirm Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" style={{ position: "relative", zIndex: 1, padding: "120px 24px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2688f9", marginBottom: "16px" }}>
            <T zh={t.featuresLabel} en={en.featuresLabel} />
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--text-primary)", marginBottom: "16px" }}>
            <T zh={t.featuresTitle} en={en.featuresTitle} />
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "18px", lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto" }}>
            <T zh={t.featuresSub} en={en.featuresSub} />
          </p>
        </div>
        <div className="cf-features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2px", maxWidth: "1100px", margin: "0 auto", border: "1px solid var(--border-default)", borderRadius: "24px", overflow: "hidden" }}>
          {([
            { icon: "🚀", zh: t.f1Title, en: en.f1Title, descZh: t.f1Desc, descEn: en.f1Desc, accent: "rgba(38,136,249,0.15)", href: undefined },
            { icon: "📈", zh: t.f2Title, en: en.f2Title, descZh: t.f2Desc, descEn: en.f2Desc, accent: "rgba(120,60,200,0.15)", href: undefined },
            { icon: "🌐", zh: t.f3Title, en: en.f3Title, descZh: t.f3Desc, descEn: en.f3Desc, accent: "rgba(38,136,249,0.10)", href: "/social-media.html" },
            { icon: "🛒", zh: t.f4Title, en: en.f4Title, descZh: t.f4Desc, descEn: en.f4Desc, accent: "rgba(255,160,40,0.15)", href: undefined },
          ] as const).map((f) => (
            <div key={f.icon} style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", padding: "44px 36px", display: "flex", flexDirection: "column", gap: "16px", borderRight: "1px solid var(--border-subtle)" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: f.accent, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)" }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.25 }}>
                <T zh={f.zh} en={f.en} />
              </h3>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "15px", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                <T zh={f.descZh} en={f.descEn} />
              </p>
              {f.href && (
                <a href={f.href} style={{ marginTop: "auto", fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", transition: "gap 0.2s" }} className="cf-card-link">
                  <T zh="了解更多" en="Learn More" /> <span style={{ transition: "transform 0.2s" }}>&rarr;</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ DEPLOY STEPS ══ */}
      <section id="deploy" style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--text-primary)", marginBottom: "12px" }}>
            <T zh={t.deployTitle} en={en.deployTitle} />
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "17px", color: "var(--text-secondary)" }}>
            <T zh={t.deploySub} en={en.deploySub} />
          </p>
        </div>
        <div className="cf-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", maxWidth: "1100px", margin: "0 auto 40px" }}>
          {([
            { n: "01", zh: t.s1Title, en: en.s1Title, descZh: t.s1Desc, descEn: en.s1Desc, code: "npm install -g clawfirm && clawfirm install" },
            { n: "02", zh: t.s2Title, en: en.s2Title, descZh: t.s2Desc, descEn: en.s2Desc, code: "whipflow run whips/saas/setup.whip" },
            { n: "03", zh: t.s3Title, en: en.s3Title, descZh: t.s3Desc, descEn: en.s3Desc, code: "whipflow run whips/creator/create.whip" },
            { n: "04", zh: t.s4Title, en: en.s4Title, descZh: t.s4Desc, descEn: en.s4Desc, code: "whipflow install-skills" },
          ] as const).map((s) => (
            <div key={s.n} style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "32px 28px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "36px", fontWeight: 900, fontStyle: "italic", color: "#2688f9", opacity: 0.7, marginBottom: "12px", letterSpacing: "-0.02em" }}>{s.n}</div>
              <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                <T zh={s.zh} en={s.en} />
              </h4>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "16px" }}>
                <T zh={s.descZh} en={s.descEn} />
              </p>
              <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", fontFamily: "'Monaco', 'Menlo', monospace", fontSize: "12px", color: "#2688f9", overflowX: "auto" }}>{s.code}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <a href="https://github.com/npc-live/clawfirm" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", padding: "12px 28px", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none" }}>
            <T zh={t.deployCta} en={en.deployCta} />
          </a>
        </div>
      </section>

      {/* ══ PRICING + CONTACT ══ */}
      <section id="pricing" style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px" }}>
        <div className="cf-pricing-grid" style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", alignItems: "start" }}>
          {/* Pricing */}
          <div style={{ background: "rgba(38,136,249,0.08)", backdropFilter: "blur(40px) saturate(200%)", WebkitBackdropFilter: "blur(40px) saturate(200%)", border: "1px solid rgba(38,136,249,0.2)", borderRadius: "28px", padding: "48px 44px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 32px 80px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(38,136,249,0.6), transparent)" }} />
            <div style={{ display: "inline-block", padding: "6px 20px", background: "rgba(38,136,249,0.2)", border: "1px solid rgba(38,136,249,0.3)", borderRadius: "100px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", fontWeight: 600, color: "#2688f9", letterSpacing: "0.04em", marginBottom: "24px" }}>
              <T zh={t.pricingBadge} en={en.pricingBadge} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "30px", fontWeight: 700, fontStyle: "italic", color: "var(--text-primary)", marginBottom: "12px" }}>
              <T zh={t.pricingTitle} en={en.pricingTitle} />
            </h3>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "52px", fontWeight: 900, color: "var(--text-primary)", marginBottom: "4px", letterSpacing: "-0.03em" }}>
              <T zh={t.pricingPrice} en={en.pricingPrice} />
              <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "18px", fontWeight: 400, color: "var(--text-muted)", marginLeft: "8px" }}>
                <T zh={t.pricingUnit} en={en.pricingUnit} />
              </span>
            </div>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "15px", color: "var(--text-secondary)", marginBottom: "28px" }}>
              <T zh={t.pricingDesc} en={en.pricingDesc} />
            </p>
            <ul style={{ listStyle: "none", marginBottom: "36px" }}>
              {([
                [t.pf1, en.pf1], [t.pf2, en.pf2], [t.pf3, en.pf3], [t.pf4, en.pf4],
              ] as [string, string][]).map(([z, e]) => (
                <li key={z} style={{ display: "flex", alignItems: "baseline", gap: "12px", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Lora', Georgia, serif", fontSize: "15px", color: "var(--text-primary)" }}>
                  <span style={{ width: "20px", height: "20px", flexShrink: 0, background: "rgba(38,136,249,0.2)", border: "1px solid rgba(38,136,249,0.3)", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#2688f9", fontWeight: 700 }}>✓</span>
                  <T zh={z} en={e} />
                </li>
              ))}
            </ul>
            <button data-auth="payment" style={{ width: "100%", padding: "16px 24px", background: "#2688f9", color: "white", border: "none", borderRadius: "14px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "16px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 24px rgba(38,136,249,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
              <T zh={t.pricingCta} en={en.pricingCta} />
            </button>
          </div>

          {/* Contact — Community */}
          <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "28px", padding: "44px 36px", textAlign: "center", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 700, fontStyle: "italic", color: "var(--text-primary)", marginBottom: "8px" }}>
              <T zh={t.contactTitle} en={en.contactTitle} />
            </h3>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
              <T zh={t.contactSub} en={en.contactSub} />
            </p>
            {/* WeChat */}
            <div style={{ background: "white", padding: "12px", borderRadius: "16px", display: "inline-block", marginBottom: "20px", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wechat.jpg"
                alt="WeChat QR Code — PpCiting"
                style={{ width: "180px", height: "auto", objectFit: "contain", borderRadius: "8px", display: "block" }}
              />
            </div>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", color: "var(--text-secondary)", letterSpacing: "0.02em", marginBottom: "20px" }}>
              <T zh={t.contactWechat} en={en.contactWechat} />
            </p>
            {/* Social links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href="https://discord.gg/JNXz2utFW8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(88,101,242,0.15)", border: "1px solid rgba(88,101,242,0.3)", borderRadius: "12px", padding: "12px 0", color: "#7289da", fontSize: "14px", fontFamily: "Inter, system-ui, sans-serif", fontWeight: 600, textDecoration: "none", transition: "background 0.2s", flex: "1" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                  Discord
                </a>
                <a
                  href="https://x.com/0xOliviaPp"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", padding: "12px 0", color: "var(--text-primary)", fontSize: "14px", fontFamily: "Inter, system-ui, sans-serif", fontWeight: 600, textDecoration: "none", transition: "background 0.2s", flex: "1" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X
                </a>
              </div>
              <a
                href="https://github.com/npc-live/clawfirm"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", padding: "12px 0", color: "var(--text-primary)", fontSize: "14px", fontFamily: "Inter, system-ui, sans-serif", fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 24px 120px", textAlign: "center" }}>
        <div className="cf-cta-card" style={{ maxWidth: "760px", margin: "0 auto", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(40px) saturate(200%)", WebkitBackdropFilter: "blur(40px) saturate(200%)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "32px", padding: "80px 64px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 40px 100px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.03em", lineHeight: 1.1, color: "rgba(255,255,255,0.95)", marginBottom: "20px" }}>
            <T zh={t.ctaHeadline} en={en.ctaHeadline} />
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "17px", lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto 40px" }}>
            <T zh={t.ctaSub} en={en.ctaSub} />
          </p>
          <a href="#" data-auth="register" style={{ display: "block", padding: "16px 44px", background: "#2688f9", color: "white", borderRadius: "14px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "16px", fontWeight: 600, textDecoration: "none", textAlign: "center", boxShadow: "0 4px 32px rgba(38,136,249,0.5), inset 0 1px 0 rgba(255,255,255,0.25)", maxWidth: "240px", margin: "0 auto 16px", cursor: "pointer" }}>
            <T zh={t.ctaBtn} en={en.ctaBtn} />
          </a>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", color: "var(--text-ghost)", letterSpacing: "0.04em" }}>
            <T zh={t.ctaNote} en={en.ctaNote} />
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ position: "relative", zIndex: 1, padding: "40px 48px", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", fontWeight: 600, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
          <svg viewBox="0 0 512 512" width="24" height="24" aria-label="ClawFirm"><use href="#sg"/><use href="#sr"/>{[0,36,72,108,144,180,216,252,288,324].map(r=><use key={r} href="#sr" transform={`rotate(${r} 256 256)`}/>)}<path d="M 164 164 A 130 130 0 1 1 128 234" fill="none" stroke="url(#sg)" strokeWidth="52" strokeLinecap="round"/><g stroke="url(#sg)" strokeWidth="14" strokeLinecap="round"><line x1="164" y1="164" x2="120" y2="150"/><line x1="164" y1="164" x2="150" y2="120"/></g><path d="M 100 234 C 60 220, 50 160, 90 90" fill="none" stroke="url(#sg)" strokeWidth="5" strokeLinecap="round"/><path d="M 100 234 C 75 200, 100 130, 126 76" fill="none" stroke="url(#sg)" strokeWidth="3" strokeLinecap="round"/><g stroke="#8B2010" strokeWidth="6" strokeLinecap="round" opacity="0.4"><line x1="256" y1="106" x2="256" y2="148"/><line x1="333" y1="179" x2="363" y2="149"/><line x1="365" y1="256" x2="407" y2="256"/><line x1="333" y1="333" x2="363" y2="363"/><line x1="256" y1="408" x2="256" y2="366"/><line x1="149" y1="363" x2="179" y2="333"/></g><circle cx="146" cy="223" r="8" fill="#FFFFFF"/><circle cx="144" cy="221" r="3" fill="#1C1C1C"/></svg> ClawFirm
        </div>
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "var(--text-ghost)", letterSpacing: "0.02em" }}>
          © 2025 ClawFirm · <T zh={t.footer} en={en.footer} />
        </p>
      </footer>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        .lang-btn:hover { opacity: 0.85; }
        .cf-nav-links a:hover { color: var(--text-primary) !important; }
        .cf-nav-links a[href="/social-media.html"]:hover { color: var(--accent) !important; opacity: 0.85; }
        .cf-card-link:hover span { transform: translateX(3px); }

        /* ── Tablet (≤ 900px) ── */
        @media (max-width: 900px) {
          .cf-pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── Mobile (≤ 680px) ── */
        @media (max-width: 680px) {
          .cf-nav {
            padding: 12px 16px !important;
            gap: 8px !important;
          }
          .cf-nav-icon {
            width: 28px !important;
            height: 28px !important;
          }
          .cf-nav-title {
            font-size: 18px !important;
          }
          .cf-nav-links {
            gap: 16px !important;
            font-size: 13px !important;
          }
          .cf-nav .lang-btn {
            padding: 4px 10px !important;
            font-size: 12px !important;
          }
          .cf-auth-btn {
            padding: 5px 12px !important;
            font-size: 12px !important;
          }
          .cf-hero-content {
            padding: 100px 20px 0 !important;
          }
          .cf-hero-cta {
            flex-direction: column !important;
            align-items: center !important;
          }
          .cf-hero-cta a {
            width: 100% !important;
            max-width: 320px !important;
            justify-content: center !important;
          }
          .cf-features-grid {
            grid-template-columns: 1fr !important;
            border-radius: 16px !important;
          }
          .cf-steps-grid {
            grid-template-columns: 1fr !important;
          }
          .cf-pricing-grid {
            grid-template-columns: 1fr !important;
          }
          .cf-cta-card {
            padding: 48px 28px !important;
            border-radius: 24px !important;
          }
          #features {
            padding: 80px 16px 60px !important;
          }
          #deploy {
            padding: 60px 16px 60px !important;
          }
          #pricing {
            padding: 60px 16px 60px !important;
          }
          footer {
            padding: 32px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }

        /* ── Small mobile (≤ 400px) ── */
        @media (max-width: 400px) {
          .cf-nav {
            padding: 10px 12px !important;
            gap: 6px !important;
          }
          .cf-nav-icon {
            width: 24px !important;
            height: 24px !important;
          }
          .cf-nav-title {
            display: none !important;
          }
          .cf-nav-links {
            display: none !important;
          }
          .cf-nav .lang-btn {
            padding: 3px 8px !important;
            font-size: 11px !important;
          }
          .cf-auth-btn {
            padding: 4px 10px !important;
            font-size: 11px !important;
          }
          .cf-cta-card {
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
