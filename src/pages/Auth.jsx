import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";

function Auth({ onContinue }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // For the hackathon prototype, authentication is simulated.
    // Once the user submits the form, continue to profile setup.
    if (typeof onContinue === "function") {
      onContinue();
    }
  };

  return (
    <div className="adapt-auth">
      {/* BACKGROUND */}
      <div className="adapt-auth-grid" />
      <div className="adapt-auth-glow adapt-auth-glow-one" />
      <div className="adapt-auth-glow adapt-auth-glow-two" />

      {/* LEFT VISUAL */}
      <section className="adapt-auth-visual">
        <div className="adapt-auth-brand">
          <div className="adapt-auth-brand-icon">
            <Brain size={21} />
          </div>

          <span>
            ADAPT<span>.AI</span>
          </span>
        </div>

        <div className="adapt-auth-message">
          <div className="adapt-auth-mini-badge">
            <Sparkles size={14} />
            PERSONALIZED LEARNING
          </div>

          <h1>
            Learn smarter.
            <br />
            <span>Not harder.</span>
          </h1>

          <p>
            ADAPT.AI analyzes your knowledge, identifies your gaps, and
            continuously builds a learning experience around you.
          </p>
        </div>

        {/* NEURAL VISUAL */}
        <div className="adapt-auth-orbit">
          <div className="adapt-auth-ring ring-a" />
          <div className="adapt-auth-ring ring-b" />
          <div className="adapt-auth-ring ring-c" />

          <div className="adapt-auth-core">
            <Brain size={45} />
            <span>AI</span>
          </div>

          <div className="adapt-auth-node auth-node-a">
            <span>KNOWLEDGE</span>
          </div>

          <div className="adapt-auth-node auth-node-b">
            <span>ADAPTIVE</span>
          </div>

          <div className="adapt-auth-node auth-node-c">
            <span>PRECISION</span>
          </div>
        </div>
      </section>

      {/* AUTH FORM */}
      <section className="adapt-auth-form-section">
        <motion.div
          className="adapt-auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="adapt-auth-card-header">
            <div className="adapt-auth-card-icon">
              <Brain size={23} />
            </div>

            <div>
              <h2>
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h2>

              <p>
                {mode === "login"
                  ? "Continue your personalized learning journey."
                  : "Start building your personalized learning path."}
              </p>
            </div>
          </div>

          {/* MODE SWITCH */}
          <div className="adapt-auth-switch">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => setMode("login")}
            >
              Login
            </button>

            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => setMode("signup")}
            >
              Sign up
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="adapt-input-group">
                <label htmlFor="name">Full name</label>

                <div className="adapt-input-wrapper">
                  <User size={17} />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="adapt-input-group">
              <label htmlFor="email">Email address</label>

              <div className="adapt-input-wrapper">
                <Mail size={17} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="adapt-input-group">
              <label htmlFor="password">Password</label>

              <div className="adapt-input-wrapper">
                <Lock size={17} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="adapt-password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="adapt-forgot">
                <button type="button">Forgot password?</button>
              </div>
            )}

            {/* IMPORTANT: THIS BUTTON SUBMITS THE FORM */}
            <button
              type="submit"
              className="adapt-auth-submit"
            >
              <span>
                {mode === "login"
                  ? "Continue Learning"
                  : "Create Account"}
              </span>

              <ArrowRight size={18} />
            </button>
          </form>

          <div className="adapt-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="adapt-google-button"
            onClick={onContinue}
          >
            <span className="adapt-google-icon">G</span>
            Continue with Google
          </button>

          <p className="adapt-auth-bottom">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() =>
                setMode((previous) =>
                  previous === "login" ? "signup" : "login"
                )
              }
            >
              {mode === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </motion.div>
      </section>

      {/* PAGE-SPECIFIC CSS */}
      <style>{`
        .adapt-auth {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          background:
            radial-gradient(circle at 20% 40%, rgba(124, 58, 237, 0.15), transparent 32%),
            radial-gradient(circle at 85% 70%, rgba(6, 182, 212, 0.08), transparent 30%),
            #070b14;
          color: #f8fafc;
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .adapt-auth-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
          background-size: 45px 45px;
        }

        .adapt-auth-glow {
          position: absolute;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          filter: blur(110px);
          opacity: 0.12;
          pointer-events: none;
        }

        .adapt-auth-glow-one {
          left: -220px;
          top: 30%;
          background: #8b5cf6;
        }

        .adapt-auth-glow-two {
          right: -220px;
          bottom: 5%;
          background: #06b6d4;
        }

        .adapt-auth-visual {
          position: relative;
          z-index: 10;
          padding: 42px 7vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100vh;
        }

        .adapt-auth-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 19px;
          font-weight: 800;
        }

        .adapt-auth-brand > span span {
          color: #a78bfa;
        }

        .adapt-auth-brand-icon {
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          color: #c4b5fd;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(167, 139, 250, 0.35);
        }

        .adapt-auth-message {
          max-width: 600px;
          margin-top: 40px;
        }

        .adapt-auth-mini-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #a78bfa;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.3px;
          margin-bottom: 20px;
        }

        .adapt-auth-message h1 {
          font-size: clamp(42px, 5vw, 68px);
          line-height: 1.03;
          letter-spacing: -3px;
          margin: 0;
        }

        .adapt-auth-message h1 span {
          background: linear-gradient(90deg, #c4b5fd, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .adapt-auth-message p {
          color: #64748b;
          line-height: 1.7;
          font-size: 15px;
          max-width: 540px;
          margin-top: 24px;
        }

        .adapt-auth-orbit {
          width: 380px;
          height: 260px;
          position: relative;
          align-self: center;
          pointer-events: none;
        }

        .adapt-auth-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(139, 92, 246, 0.22);
          border-radius: 50%;
        }

        .ring-a {
          width: 170px;
          height: 170px;
          animation: authRotate 15s linear infinite;
        }

        .ring-b {
          width: 270px;
          height: 180px;
          border-color: rgba(6, 182, 212, 0.18);
          animation: authRotateReverse 20s linear infinite;
        }

        .ring-c {
          width: 360px;
          height: 230px;
          border-color: rgba(167, 139, 250, 0.1);
        }

        .adapt-auth-core {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 115px;
          height: 115px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #c4b5fd;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(167, 139, 250, 0.35);
          box-shadow: 0 0 60px rgba(124, 58, 237, 0.25);
        }

        .adapt-auth-core span {
          font-size: 13px;
          font-weight: 800;
          color: white;
          margin-top: 3px;
        }

        .adapt-auth-node {
          position: absolute;
          padding: 8px 11px;
          border-radius: 8px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.18);
          color: #94a3b8;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.8px;
        }

        .auth-node-a {
          top: 10px;
          right: 5px;
        }

        .auth-node-b {
          bottom: 0;
          left: 5px;
        }

        .auth-node-c {
          bottom: 15px;
          right: 20px;
        }

        .adapt-auth-form-section {
          position: relative;
          z-index: 100;
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 40px 7vw;
        }

        .adapt-auth-card {
          width: min(450px, 100%);
          padding: 34px;
          border-radius: 22px;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(148, 163, 184, 0.16);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.35),
            inset 0 1px rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 200;
        }

        .adapt-auth-card-header {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 25px;
        }

        .adapt-auth-card-icon {
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 13px;
          color: #c4b5fd;
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(167, 139, 250, 0.25);
        }

        .adapt-auth-card h2 {
          margin: 0;
          font-size: 23px;
        }

        .adapt-auth-card-header p {
          margin: 5px 0 0;
          color: #64748b;
          font-size: 11px;
          line-height: 1.5;
        }

        .adapt-auth-switch {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 4px;
          background: rgba(2, 6, 23, 0.55);
          border-radius: 10px;
          margin-bottom: 25px;
        }

        .adapt-auth-switch button {
          border: 0;
          background: transparent;
          color: #64748b;
          padding: 9px;
          border-radius: 7px;
          cursor: pointer;
          font-weight: 600;
          position: relative;
          z-index: 300;
        }

        .adapt-auth-switch button.active {
          color: #f8fafc;
          background: rgba(139, 92, 246, 0.17);
        }

        .adapt-input-group {
          margin-bottom: 17px;
        }

        .adapt-input-group label {
          display: block;
          color: #cbd5e1;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 7px;
        }

        .adapt-input-wrapper {
          height: 47px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 13px;
          border-radius: 10px;
          background: rgba(2, 6, 23, 0.55);
          border: 1px solid rgba(148, 163, 184, 0.14);
          position: relative;
          z-index: 250;
        }

        .adapt-input-wrapper > svg {
          color: #64748b;
          flex-shrink: 0;
        }

        .adapt-input-wrapper:focus-within {
          border-color: rgba(167, 139, 250, 0.55);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
        }

        .adapt-input-wrapper input {
          width: 100%;
          height: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #f8fafc;
          font-size: 13px;
        }

        .adapt-input-wrapper input::placeholder {
          color: #475569;
        }

        .adapt-password-toggle {
          border: 0;
          background: transparent;
          color: #64748b;
          padding: 4px;
          display: grid;
          place-items: center;
          cursor: pointer;
          position: relative;
          z-index: 400;
        }

        .adapt-forgot {
          text-align: right;
          margin: -5px 0 18px;
        }

        .adapt-forgot button {
          border: 0;
          background: transparent;
          color: #a78bfa;
          font-size: 10px;
          cursor: pointer;
        }

        .adapt-auth-submit {
          width: 100%;
          height: 48px;
          border: 1px solid rgba(167, 139, 250, 0.4);
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #6366f1);
          color: white;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          cursor: pointer !important;
          position: relative;
          z-index: 500 !important;
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.2);
        }

        .adapt-auth-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 13px 35px rgba(124, 58, 237, 0.32);
        }

        .adapt-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0;
          color: #475569;
          font-size: 10px;
        }

        .adapt-divider::before,
        .adapt-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(148, 163, 184, 0.1);
        }

        .adapt-google-button {
          width: 100%;
          height: 46px;
          border-radius: 10px;
          border: 1px solid rgba(148, 163, 184, 0.15);
          background: rgba(15, 23, 42, 0.65);
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          cursor: pointer;
          position: relative;
          z-index: 500;
          font-weight: 600;
          font-size: 12px;
        }

        .adapt-google-icon {
          font-size: 16px;
          font-weight: 800;
          color: #f8fafc;
        }

        .adapt-auth-bottom {
          text-align: center;
          color: #64748b;
          font-size: 11px;
          margin: 22px 0 0;
        }

        .adapt-auth-bottom button {
          border: 0;
          background: transparent;
          color: #a78bfa;
          font-weight: 700;
          cursor: pointer;
          margin-left: 5px;
          position: relative;
          z-index: 500;
        }

        @keyframes authRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes authRotateReverse {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        @media (max-width: 900px) {
          .adapt-auth {
            grid-template-columns: 1fr;
          }

          .adapt-auth-visual {
            min-height: auto;
            padding: 30px 24px 10px;
          }

          .adapt-auth-message {
            margin-top: 50px;
          }

          .adapt-auth-orbit {
            display: none;
          }

          .adapt-auth-form-section {
            min-height: auto;
            padding: 25px 24px 50px;
          }
        }

        @media (max-width: 500px) {
          .adapt-auth-card {
            padding: 25px 20px;
          }

          .adapt-auth-message h1 {
            letter-spacing: -2px;
          }
        }
      `}</style>
    </div>
  );
}

export default Auth;