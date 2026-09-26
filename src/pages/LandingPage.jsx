import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

function Landing({ onStart }) {
  return (
    <div className="landing-page">

      {/* NAVBAR */}
      <nav className="landing-nav">

        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={18} />
          </div>

          <span>
            ADAPT<span>.AI</span>
          </span>
        </div>

        <button
          className="nav-login"
          onClick={onStart}
        >
          Login
        </button>

      </nav>


      {/* HERO */}
      <main className="hero">

        {/* LEFT */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <div className="hero-badge">
            <Sparkles size={14} />
            AI-POWERED ENGINEERING LEARNING
          </div>

          <h1>
            Your syllabus is the same.
            <br />
            <span>Your learning path isn't.</span>
          </h1>

          <p>
            ADAPT.AI understands what you know, finds what
            you're missing, and builds a learning path
            specifically for you.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={onStart}
            >
              Start Your Learning Journey
              <ArrowRight size={18} />
            </button>

            <button className="secondary-button">
              Explore how it works
            </button>

          </div>


          {/* STATS */}
          <div className="hero-stats">

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

          </div>

        </motion.div>


        {/* RIGHT VISUAL */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >

          <div className="neural-orb">

            <div className="orb-ring ring-one"></div>
            <div className="orb-ring ring-two"></div>
            <div className="orb-ring ring-three"></div>

            <div className="orb-core">
              <Brain size={46} />
              <span>ADAPT</span>
            </div>


            <div className="floating-node node-one">
              <Target size={14} />
              <span>KNOWLEDGE</span>
            </div>

            <div className="floating-node node-two">
              <Zap size={14} />
              <span>PRECISION</span>
            </div>

            <div className="floating-node node-three">
              <Sparkles size={14} />
              <span>ADAPTIVE</span>
            </div>

          </div>

        </motion.div>

      </main>

    </div>
  );
}

export default Landing;