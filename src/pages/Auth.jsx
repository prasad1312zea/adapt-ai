import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Brain,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

function Auth({ onSuccess, onBack }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">

      {/* LEFT VISUAL SECTION */}
      <motion.div
        className="auth-visual"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button className="auth-brand" onClick={onBack}>
          <div className="brand-mark">
            <Sparkles size={19} />
          </div>

          <span>
            ADAPT<span>.AI</span>
          </span>
        </button>

        <div className="auth-visual-content">

          <div className="mini-badge">
            <Sparkles size={13} />
            ENGINEERING LEARNING INTELLIGENCE
          </div>

          <h1>
            Don't learn
            <br />
            <span>everything.</span>
            <br />
            Learn what
            <br />
            <span>you need.</span>
          </h1>

          <p>
            Your learning path adapts to your knowledge,
            your gaps and your progress.
          </p>

          {/* ORBIT */}
          <div className="auth-orbit">

            <div className="auth-core">
              <Brain size={32} />
              <span>ADAPT</span>
            </div>

            <div className="auth-node node-a">
              KNOWLEDGE
            </div>

            <div className="auth-node node-b">
              GAPS
            </div>

            <div className="auth-node node-c">
              PROGRESS
            </div>

          </div>
        </div>
      </motion.div>


      {/* RIGHT FORM SECTION */}
      <motion.div
        className="auth-form-container"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >

        <div className="auth-card">

          <div className="auth-heading">

            <p className="eyebrow">
              {mode === "login"
                ? "WELCOME BACK"
                : "CREATE YOUR PROFILE"}
            </p>

            <h2>
              {mode === "login"
                ? "Welcome back, Engineer."
                : "Let's build your learning profile."}
            </h2>

            <p>
              {mode === "login"
                ? "Continue your personalized learning journey."
                : "Your learning path starts with understanding you."}
            </p>

          </div>


          {/* NAME - SIGN UP ONLY */}
          {mode === "signup" && (
            <div className="input-group">

              <label>Full Name</label>

              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter your name"
                />
              </div>

            </div>
          )}


          {/* EMAIL */}
          <div className="input-group">

            <label>Email</label>

            <div className="input-wrapper">

              <Mail size={17} />

              <input
                type="email"
                placeholder="you@example.com"
              />

            </div>

          </div>


          {/* PASSWORD */}
          <div className="input-group">

            <label>Password</label>

            <div className="input-wrapper">

              <Lock size={17} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />

              <button
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
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


          {/* FORGOT PASSWORD */}
          {mode === "login" && (
            <div className="forgot">
              Forgot password?
            </div>
          )}


          {/* SUBMIT */}
          <button
            className="auth-submit"
            onClick={onSuccess}
          >
            {mode === "login"
              ? "Enter ADAPT"
              : "Create My Learning Profile"}

            <ArrowRight size={17} />
          </button>


          {/* DIVIDER */}
          <div className="auth-divider">
            <span>OR</span>
          </div>


          {/* GOOGLE */}
          <button className="google-button">
            <span>G</span>
            Continue with Google
          </button>


          {/* SWITCH LOGIN / SIGNUP */}
          <p className="auth-switch">

            {mode === "login"
              ? "New to ADAPT?"
              : "Already have an account?"}

            <button
              onClick={() =>
                setMode(
                  mode === "login"
                    ? "signup"
                    : "login"
                )
              }
            >
              {mode === "login"
                ? "Create an account"
                : "Login"}
            </button>

          </p>

        </div>

      </motion.div>

    </div>
  );
}

export default Auth;