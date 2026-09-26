import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Network,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

function LandingPage({ onGetStarted }) {
  return (
    <div className="adapt-landing">
      <div className="adapt-background-grid" />
      <div className="adapt-glow adapt-glow-one" />
      <div className="adapt-glow adapt-glow-two" />

      {/* NAVBAR */}
      <nav className="adapt-nav">
        <div className="adapt-logo">
          <div className="adapt-logo-icon">
            <Brain size={21} />
          </div>

          <span>
            ADAPT<span>.AI</span>
          </span>
        </div>

        <button
          type="button"
          className="adapt-login-button"
          onClick={onGetStarted}
        >
          Login
        </button>
      </nav>

      {/* HERO */}
      <main className="adapt-hero">
        <section className="adapt-hero-content">
          <motion.div
            className="adapt-badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={15} />
            AI-POWERED ENGINEERING LEARNING
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your syllabus is the same.
            <br />
            <span>Your learning path isn't.</span>
          </motion.h1>

          <motion.p
            className="adapt-hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            ADAPT.AI understands what you know, finds what you're missing,
            and builds a learning path specifically for you.
          </motion.p>

          <motion.div
            className="adapt-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              type="button"
              className="adapt-primary-button"
              onClick={onGetStarted}
            >
              Start Your Learning Journey
              <ArrowRight size={19} />
            </button>

            <button
              type="button"
              className="adapt-secondary-button"
              onClick={() => {
                document
                  .getElementById("adapt-how")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore how it works
            </button>
          </motion.div>

          <motion.div
            className="adapt-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div>
              <strong>15+</strong>
              <span>Engineering Branches</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Adaptive Paths</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Personalized Support</span>
            </div>
          </motion.div>
        </section>

        {/* VISUAL */}
        <motion.section
          className="adapt-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="adapt-orb">
            <div className="adapt-orbit adapt-orbit-one" />
            <div className="adapt-orbit adapt-orbit-two" />
            <div className="adapt-orbit adapt-orbit-three" />

            <div className="adapt-orb-core">
              <Brain size={58} />
              <span>ADAPT</span>
              <small>INTELLIGENCE ENGINE</small>
            </div>

            <div className="adapt-node adapt-node-one">
              <Target size={18} />
              <span>KNOWLEDGE</span>
            </div>

            <div className="adapt-node adapt-node-two">
              <Network size={18} />
              <span>PRECISION</span>
            </div>

            <div className="adapt-node adapt-node-three">
              <Zap size={18} />
              <span>ADAPTIVE</span>
            </div>
          </div>
        </motion.section>
      </main>

      {/* HOW IT WORKS */}
      <section id="adapt-how" className="adapt-how">
        <div className="adapt-section-heading">
          <div className="adapt-section-label">
            <Sparkles size={15} />
            HOW ADAPT.AI WORKS
          </div>

          <h2>
            Learn based on <span>what you actually know.</span>
          </h2>

          <p>
            Your learning journey continuously adapts as your understanding
            changes.
          </p>
        </div>

        <div className="adapt-flow">
          <div className="adapt-flow-card">
            <div className="adapt-flow-number">01</div>
            <Brain />
            <h3>Diagnostic Assessment</h3>
            <p>
              Discover your current knowledge level across individual
              concepts.
            </p>
          </div>

          <div className="adapt-flow-line" />

          <div className="adapt-flow-card">
            <div className="adapt-flow-number">02</div>
            <Network />
            <h3>Knowledge Analysis</h3>
            <p>
              Identify knowledge gaps, weak concepts and prerequisite
              dependencies.
            </p>
          </div>

          <div className="adapt-flow-line" />

          <div className="adapt-flow-card">
            <div className="adapt-flow-number">03</div>
            <Target />
            <h3>Personalized Path</h3>
            <p>
              Build a learning sequence based on your individual mastery.
            </p>
          </div>

          <div className="adapt-flow-line" />

          <div className="adapt-flow-card">
            <div className="adapt-flow-number">04</div>
            <Zap />
            <h3>Adaptive Practice</h3>
            <p>
              Questions and explanations change difficulty as you improve.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="adapt-footer">
        <div className="adapt-logo">
          <div className="adapt-logo-icon">
            <Brain size={18} />
          </div>

          <span>
            ADAPT<span>.AI</span>
          </span>
        </div>

        <div className="adapt-footer-text">
          <CheckCircle2 size={16} />
          Personalized learning. Powered by intelligence.
        </div>
      </footer>

      {/* PAGE-SPECIFIC CSS */}
      <style>{`
        .adapt-landing {
          min-height: 100vh;
          background:
            radial-gradient(circle at 75% 35%, rgba(124, 58, 237, 0.16), transparent 30%),
            radial-gradient(circle at 15% 70%, rgba(6, 182, 212, 0.08), transparent 28%),
            #070b14;
          color: #f8fafc;
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .adapt-background-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.2;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
          background-size: 45px 45px;
          mask-image: linear-gradient(to bottom, black, transparent 90%);
        }

        .adapt-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.12;
          pointer-events: none;
        }

        .adapt-glow-one {
          top: 100px;
          right: -200px;
          background: #8b5cf6;
        }

        .adapt-glow-two {
          bottom: 100px;
          left: -250px;
          background: #06b6d4;
        }

        .adapt-nav {
          width: min(1240px, calc(100% - 48px));
          height: 82px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 100;
        }

        .adapt-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          letter-spacing: -0.5px;
          font-size: 18px;
        }

        .adapt-logo > span span {
          color: #a78bfa;
        }

        .adapt-logo-icon {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          color: #d8b4fe;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.28),
            rgba(6, 182, 212, 0.18)
          );
          border: 1px solid rgba(167, 139, 250, 0.35);
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.2);
        }

        .adapt-login-button {
          appearance: none;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: rgba(15, 23, 42, 0.65);
          color: #e2e8f0;
          border-radius: 10px;
          padding: 10px 20px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          z-index: 200;
          transition: 0.2s ease;
        }

        .adapt-login-button:hover {
          border-color: rgba(167, 139, 250, 0.65);
          background: rgba(139, 92, 246, 0.12);
          transform: translateY(-1px);
        }

        .adapt-hero {
          width: min(1240px, calc(100% - 48px));
          min-height: calc(100vh - 82px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: 40px;
          position: relative;
          z-index: 10;
        }

        .adapt-hero-content {
          position: relative;
          z-index: 50;
          padding: 50px 0 100px;
        }

        .adapt-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border-radius: 999px;
          border: 1px solid rgba(167, 139, 250, 0.3);
          background: rgba(139, 92, 246, 0.08);
          color: #c4b5fd;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          margin-bottom: 24px;
        }

        .adapt-hero h1 {
          margin: 0;
          font-size: clamp(42px, 5vw, 72px);
          line-height: 1.03;
          letter-spacing: -3px;
          font-weight: 800;
          max-width: 800px;
        }

        .adapt-hero h1 span {
          background: linear-gradient(90deg, #c4b5fd, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .adapt-hero-description {
          max-width: 650px;
          margin: 28px 0 30px;
          color: #94a3b8;
          font-size: 17px;
          line-height: 1.7;
        }

        .adapt-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          position: relative;
          z-index: 200;
        }

        .adapt-primary-button,
        .adapt-secondary-button {
          appearance: none;
          font: inherit;
          border-radius: 11px;
          padding: 13px 18px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          cursor: pointer !important;
          position: relative;
          z-index: 300;
          transition: 0.2s ease;
        }

        .adapt-primary-button {
          color: white;
          border: 1px solid rgba(167, 139, 250, 0.5);
          background: linear-gradient(
            135deg,
            #7c3aed,
            #6366f1
          );
          box-shadow: 0 12px 35px rgba(124, 58, 237, 0.25);
        }

        .adapt-primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(124, 58, 237, 0.38);
        }

        .adapt-secondary-button {
          color: #cbd5e1;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.22);
        }

        .adapt-secondary-button:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(148, 163, 184, 0.4);
        }

        .adapt-stats {
          display: flex;
          gap: 42px;
          margin-top: 46px;
          flex-wrap: wrap;
        }

        .adapt-stats div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .adapt-stats strong {
          font-size: 21px;
          color: #f8fafc;
        }

        .adapt-stats span {
          font-size: 11px;
          color: #64748b;
        }

        .adapt-visual {
          min-height: 560px;
          display: grid;
          place-items: center;
          position: relative;
          z-index: 20;
          pointer-events: none;
        }

        .adapt-orb {
          width: 460px;
          height: 460px;
          border-radius: 50%;
          position: relative;
          display: grid;
          place-items: center;
        }

        .adapt-orbit {
          position: absolute;
          border: 1px solid rgba(139, 92, 246, 0.24);
          border-radius: 50%;
        }

        .adapt-orbit-one {
          width: 310px;
          height: 310px;
          animation: adaptRotate 18s linear infinite;
        }

        .adapt-orbit-two {
          width: 390px;
          height: 390px;
          border-color: rgba(6, 182, 212, 0.2);
          animation: adaptRotateReverse 25s linear infinite;
        }

        .adapt-orbit-three {
          width: 460px;
          height: 460px;
          border-color: rgba(167, 139, 250, 0.12);
          animation: adaptRotate 32s linear infinite;
        }

        .adapt-orb-core {
          width: 190px;
          height: 190px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #c4b5fd;
          background:
            radial-gradient(
              circle at 35% 30%,
              rgba(167, 139, 250, 0.3),
              rgba(15, 23, 42, 0.9) 65%
            );
          border: 1px solid rgba(167, 139, 250, 0.38);
          box-shadow:
            0 0 70px rgba(124, 58, 237, 0.25),
            inset 0 0 45px rgba(139, 92, 246, 0.1);
          z-index: 5;
        }

        .adapt-orb-core span {
          font-size: 17px;
          font-weight: 800;
          color: white;
          letter-spacing: 1px;
        }

        .adapt-orb-core small {
          font-size: 8px;
          color: #64748b;
          letter-spacing: 1px;
        }

        .adapt-node {
          position: absolute;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 12px;
          border-radius: 10px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.7px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
        }

        .adapt-node-one {
          top: 60px;
          right: 5px;
          color: #c4b5fd;
        }

        .adapt-node-two {
          bottom: 65px;
          left: 0;
          color: #67e8f9;
        }

        .adapt-node-three {
          bottom: 5px;
          right: 35px;
          color: #a7f3d0;
        }

        .adapt-how {
          width: min(1240px, calc(100% - 48px));
          margin: 0 auto;
          padding: 110px 0;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(148, 163, 184, 0.08);
        }

        .adapt-section-heading {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 60px;
        }

        .adapt-section-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #a78bfa;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 16px;
        }

        .adapt-section-heading h2 {
          margin: 0;
          font-size: clamp(30px, 4vw, 46px);
          letter-spacing: -1.8px;
        }

        .adapt-section-heading h2 span {
          color: #a78bfa;
        }

        .adapt-section-heading p {
          color: #64748b;
          line-height: 1.7;
          margin-top: 15px;
        }

        .adapt-flow {
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .adapt-flow-card {
          flex: 1;
          max-width: 260px;
          padding: 25px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: 18px;
          background: rgba(15, 23, 42, 0.45);
          position: relative;
        }

        .adapt-flow-card svg {
          color: #a78bfa;
          margin: 15px 0;
        }

        .adapt-flow-card h3 {
          font-size: 16px;
          margin: 0 0 9px;
        }

        .adapt-flow-card p {
          color: #64748b;
          font-size: 12px;
          line-height: 1.6;
          margin: 0;
        }

        .adapt-flow-number {
          color: #475569;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .adapt-flow-line {
          width: 35px;
          align-self: center;
          height: 1px;
          background: rgba(167, 139, 250, 0.25);
        }

        .adapt-footer {
          width: min(1240px, calc(100% - 48px));
          margin: 0 auto;
          padding: 25px 0 35px;
          border-top: 1px solid rgba(148, 163, 184, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          position: relative;
          z-index: 10;
        }

        .adapt-footer-text {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #475569;
          font-size: 11px;
        }

        .adapt-footer-text svg {
          color: #34d399;
        }

        @keyframes adaptRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes adaptRotateReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @media (max-width: 900px) {
          .adapt-hero {
            grid-template-columns: 1fr;
            padding-top: 30px;
          }

          .adapt-hero-content {
            padding-bottom: 30px;
          }

          .adapt-visual {
            min-height: 430px;
          }

          .adapt-orb {
            transform: scale(0.8);
          }

          .adapt-flow {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .adapt-flow-card {
            max-width: 600px;
            width: 100%;
          }

          .adapt-flow-line {
            width: 1px;
            height: 25px;
          }
        }

        @media (max-width: 600px) {
          .adapt-nav,
          .adapt-hero,
          .adapt-how,
          .adapt-footer {
            width: min(100% - 28px, 1240px);
          }

          .adapt-hero h1 {
            letter-spacing: -1.8px;
          }

          .adapt-stats {
            gap: 22px;
          }

          .adapt-orb {
            transform: scale(0.65);
          }

          .adapt-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;