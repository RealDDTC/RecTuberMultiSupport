* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #06111d;
  --card: rgba(11, 18, 30, 0.72);
  --line: rgba(255, 255, 255, 0.12);
  --text: #f4f7fb;
  --muted: rgba(244, 247, 251, 0.72);
  --accent: #63d7ff;
  --accent-2: #8b7bff;
  --shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
}

html,
body {
  min-height: 100%;
}

body {
  font-family: Inter, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text);
  background:
    linear-gradient(180deg, rgba(4, 8, 16, 0.45), rgba(4, 8, 16, 0.82)),
    url("https://img.rec.net/8u5vqwa7zejzu4lrgatmjoj55.jpg?width=1920") center/cover no-repeat fixed;
}

.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.support-card {
  width: min(1100px, 100%);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 30px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  position: relative;
  overflow: hidden;
  animation: rise 600ms ease both;
}

.accent-line {
  height: 4px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}

.support-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(99, 215, 255, 0.16), transparent 28%),
    radial-gradient(circle at bottom right, rgba(139, 123, 255, 0.14), transparent 30%);
  pointer-events: none;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.hero {
  padding: 34px 28px 22px;
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #eaf7ff;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.hero h1 {
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  line-height: 1.03;
  letter-spacing: -0.05em;
  margin-bottom: 14px;
}

.intro {
  color: var(--muted);
  line-height: 1.7;
  max-width: 64ch;
  font-size: 1.02rem;
}

.notice {
  margin-top: 18px;
  display: inline-block;
  padding: 15px 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(99, 215, 255, 0.14), rgba(139, 123, 255, 0.12));
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #eef8ff;
  line-height: 1.5;
}

#support-form {
  padding: 0 28px 28px;
  position: relative;
  z-index: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 0.92rem;
  font-weight: 600;
  color: #f8fbff;
  margin-bottom: 8px;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(7, 13, 24, 0.62);
  color: var(--text);
  padding: 14px 15px;
  border-radius: 16px;
  outline: none;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

textarea {
  resize: vertical;
  min-height: 170px;
}

input::placeholder,
textarea::placeholder {
  color: rgba(244, 247, 251, 0.45);
}

input:focus,
select:focus,
textarea:focus {
  border-color: rgba(99, 215, 255, 0.85);
  box-shadow: 0 0 0 4px rgba(99, 215, 255, 0.12);
  background: rgba(7, 13, 24, 0.82);
  transform: translateY(-1px);
}

.file-list {
  margin-top: 8px;
  display: grid;
  gap: 6px;
  color: rgba(244, 247, 251, 0.78);
  font-size: 0.88rem;
  word-break: break-word;
}

#submit-btn {
  width: 100%;
  border: 0;
  border-radius: 18px;
  padding: 15px 18px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #06101c;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 180ms ease, filter 180ms ease, box-shadow 180ms ease;
  box-shadow: 0 12px 28px rgba(99, 215, 255, 0.2);
}

#submit-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow: 0 16px 34px rgba(99, 215, 255, 0.28);
}

.status-wrap {
  padding-top: 12px;
  min-height: 34px;
}

.status {
  display: none;
  text-align: center;
  font-size: 0.95rem;
  color: var(--muted);
}

.status.success {
  color: #bfffd5;
}

.footer {
  padding: 18px 28px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(244, 247, 251, 0.55);
  position: relative;
  z-index: 1;
}

.closed-card {
  padding-bottom: 0;
}

.closed-badge {
  display: inline-block;
  margin: 28px 28px 18px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 95, 109, 0.14);
  color: #ffd6db;
  border: 1px solid rgba(255, 95, 109, 0.25);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.closed-card h1,
.closed-card p,
.closed-note,
.thanks {
  margin-left: 28px;
  margin-right: 28px;
}

.closed-card h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.06;
  margin-bottom: 14px;
  letter-spacing: -0.04em;
}

.closed-card p {
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 16px;
  max-width: 72ch;
}

.closed-note {
  margin-top: 18px;
  margin-bottom: 18px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(7, 13, 24, 0.45);
  color: #f8fbff;
  line-height: 1.6;
  max-width: 72ch;
}

.thanks {
  max-width: 72ch;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .page {
    padding: 14px;
  }

  .support-card {
    border-radius: 24px;
  }

  .hero,
  #support-form {
    padding-left: 18px;
    padding-right: 18px;
  }

  .footer {
    padding-left: 18px;
    padding-right: 18px;
  }

  .closed-badge,
  .closed-card h1,
  .closed-card p,
  .closed-note,
  .thanks {
    margin-left: 18px;
    margin-right: 18px;
  }
}
