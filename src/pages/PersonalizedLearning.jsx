// src/pages/PersonalizedLearning.jsx
<h1>
  PERSONALIZED PATH TEST
</h1>

import { useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  Play,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";


// =========================================================
// LEARNING PATH ENGINE
// =========================================================

function getPriority(status, mastery) {
  if (status === "Weak" || mastery < 40) return "High";
  if (status === "Developing" || mastery < 75) return "Medium";
  return "Low";
}


function getAction(status, mastery) {
  if (status === "Weak" || mastery < 40) {
    return "Build fundamentals";
  }

  if (status === "Developing" || mastery < 75) {
    return "Strengthen understanding";
  }

  return "Practice & challenge";
}


function getEstimatedTime(status, mastery) {
  if (status === "Weak" || mastery < 40) return 25;
  if (status === "Developing" || mastery < 75) return 15;
  return 10;
}


// =========================================================
// BUILD ADAPTIVE PATH
// =========================================================

function buildLearningPath(results) {
  if (!results?.conceptResults?.length) {
    return [];
  }

  const conceptResults = results.conceptResults;

  const resultMap = {};

  conceptResults.forEach((item) => {
    resultMap[item.concept] = item;
  });


  // -------------------------------------------------------
  // Extract prerequisite information
  // -------------------------------------------------------

  const prerequisiteMap = {};

  (results.prerequisiteGaps || []).forEach((gap) => {
    prerequisiteMap[gap.concept] =
      gap.prerequisites || [];
  });


  // -------------------------------------------------------
  // Determine priority
  // -------------------------------------------------------

  const priorityValue = {
    High: 0,
    Medium: 1,
    Low: 2,
  };


  const sortedConcepts = [...conceptResults].sort(
    (a, b) => {
      const aPriority = getPriority(
        a.status,
        a.mastery
      );

      const bPriority = getPriority(
        b.status,
        b.mastery
      );

      if (
        priorityValue[aPriority] !==
        priorityValue[bPriority]
      ) {
        return (
          priorityValue[aPriority] -
          priorityValue[bPriority]
        );
      }

      return a.mastery - b.mastery;
    }
  );


  // -------------------------------------------------------
  // Dependency-aware ordering
  // -------------------------------------------------------

  const visited = new Set();
  const ordered = [];


  function addConcept(concept) {
    if (visited.has(concept)) return;

    visited.add(concept);

    const prerequisites =
      prerequisiteMap[concept] || [];


    prerequisites.forEach((prerequisite) => {
      if (resultMap[prerequisite]) {
        addConcept(prerequisite);
      }
    });


    if (resultMap[concept]) {
      ordered.push(resultMap[concept]);
    }
  }


  sortedConcepts.forEach((item) => {
    addConcept(item.concept);
  });


  // -------------------------------------------------------
  // Enrich path
  // -------------------------------------------------------

  return ordered.map((item, index) => {
    const priority = getPriority(
      item.status,
      item.mastery
    );

    return {
      ...item,

      step: index + 1,

      priority,

      action: getAction(
        item.status,
        item.mastery
      ),

      estimatedTime: getEstimatedTime(
        item.status,
        item.mastery
      ),

      isWeak:
        item.status === "Weak" ||
        item.mastery < 40,

      isDeveloping:
        item.status === "Developing" ||
        (item.mastery >= 40 &&
          item.mastery < 75),

      isStrong:
        item.status === "Strong" ||
        item.mastery >= 75,
    };
  });
}


// =========================================================
// COMPONENT
// =========================================================

export default function PersonalizedLearning({
  results,
  onBack,
  onStartLearning,
}) {

  const learningPath = useMemo(
    () => buildLearningPath(results),
    [results]
  );


  // -------------------------------------------------------
  // Statistics
  // -------------------------------------------------------

  const weakCount = learningPath.filter(
    (item) => item.isWeak
  ).length;

  const developingCount = learningPath.filter(
    (item) => item.isDeveloping
  ).length;

  const strongCount = learningPath.filter(
    (item) => item.isStrong
  ).length;

  const totalTime = learningPath.reduce(
    (total, item) =>
      total + item.estimatedTime,
    0
  );


  return (
    <div className="adaptive-learning-page">

      <style>{`

        /* =================================================
           ADAPTIVE LEARNING PAGE
        ================================================= */

        .adaptive-learning-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(124, 58, 237, 0.13),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 70%,
              rgba(6, 182, 212, 0.09),
              transparent 32%
            ),
            #070b14;

          color: #f8fafc;

          padding: 30px 6vw 70px;
        }


        .adaptive-learning-page::before {
          content: "";

          position: absolute;
          inset: 0;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(148,163,184,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(148,163,184,0.035) 1px,
              transparent 1px
            );

          background-size: 50px 50px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 90%
            );
        }


        .adaptive-learning-page
        .adaptive-learning-container {
          position: relative;

          z-index: 2;

          width: min(1080px, 100%);

          margin: 0 auto;
        }


        /* =================================================
           HEADER
        ================================================= */

        .adaptive-learning-page
        .adaptive-learning-header {

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 55px;
        }


        .adaptive-learning-page
        .adaptive-back {

          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding: 9px 14px;

          border-radius: 10px;

          border: 1px solid
            rgba(148,163,184,0.16);

          background:
            rgba(15,23,42,0.55);

          color: #94a3b8;

          font-size: 12px;

          transition:
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }


        .adaptive-learning-page
        .adaptive-back:hover {

          color: #fff;

          border-color:
            rgba(167,139,250,0.5);

          transform:
            translateX(-3px);
        }


        .adaptive-learning-page
        .adaptive-ai-label {

          display: inline-flex;

          align-items: center;

          gap: 7px;

          color: #a78bfa;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 1.6px;

          text-transform: uppercase;
        }


        /* =================================================
           HERO
        ================================================= */

        .adaptive-learning-page
        .adaptive-learning-hero {

          text-align: center;

          max-width: 780px;

          margin:
            0 auto 48px;
        }


        .adaptive-learning-page
        .adaptive-hero-icon {

          width: 65px;
          height: 65px;

          margin:
            0 auto 20px;

          display: grid;

          place-items: center;

          border-radius: 18px;

          background:
            linear-gradient(
              135deg,
              rgba(139,92,246,0.18),
              rgba(6,182,212,0.08)
            );

          border:
            1px solid
            rgba(167,139,250,0.32);

          color: #c4b5fd;

          box-shadow:
            0 0 45px
            rgba(139,92,246,0.14);
        }


        .adaptive-learning-page
        .adaptive-learning-hero h1 {

          margin:
            17px 0 18px;

          font-size:
            clamp(42px, 5.5vw, 68px);

          line-height: 0.98;

          letter-spacing: -3px;

          font-weight: 800;
        }


        .adaptive-learning-page
        .adaptive-learning-hero h1 span {

          background:
            linear-gradient(
              90deg,
              #a78bfa,
              #22d3ee
            );

          -webkit-background-clip: text;

          background-clip: text;

          color: transparent;
        }


        .adaptive-learning-page
        .adaptive-learning-hero p {

          max-width: 620px;

          margin: 0 auto;

          color: #94a3b8;

          font-size: 14px;

          line-height: 1.75;
        }


        /* =================================================
           AI STATUS
        ================================================= */

        .adaptive-learning-page
        .adaptive-engine-status {

          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding:
            8px 12px;

          border-radius: 999px;

          border:
            1px solid
            rgba(139,92,246,0.28);

          background:
            rgba(139,92,246,0.07);

          color: #c4b5fd;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 1.4px;

          text-transform: uppercase;
        }


        .adaptive-learning-page
        .adaptive-status-dot {

          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #22d3ee;

          box-shadow:
            0 0 10px
            rgba(34,211,238,0.8);
        }


        /* =================================================
           STAT CARDS
        ================================================= */

        .adaptive-learning-page
        .adaptive-stat-grid {

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 13px;

          margin-bottom: 45px;
        }


        .adaptive-learning-page
        .adaptive-stat-card {

          padding: 20px;

          border-radius: 17px;

          background:
            rgba(15,23,42,0.62);

          border:
            1px solid
            rgba(148,163,184,0.13);

          backdrop-filter:
            blur(16px);
        }


        .adaptive-learning-page
        .adaptive-stat-label {

          display: flex;

          align-items: center;

          gap: 7px;

          color: #64748b;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 1.2px;

          text-transform: uppercase;
        }


        .adaptive-learning-page
        .adaptive-stat-value {

          margin-top: 8px;

          font-size: 27px;

          font-weight: 800;

          letter-spacing: -1px;
        }


        .adaptive-learning-page
        .stat-purple {

          color: #c4b5fd;
        }


        .adaptive-learning-page
        .stat-orange {

          color: #fcd34d;
        }


        .adaptive-learning-page
        .stat-cyan {

          color: #67e8f9;
        }


        /* =================================================
           SECTION HEADER
        ================================================= */

        .adaptive-learning-page
        .adaptive-section-header {

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 20px;

          margin-bottom: 20px;
        }


        .adaptive-learning-page
        .adaptive-section-header h2 {

          margin: 0;

          font-size: 21px;

          letter-spacing: -0.5px;
        }


        .adaptive-learning-page
        .adaptive-section-header p {

          margin:
            6px 0 0;

          color: #64748b;

          font-size: 11px;
        }


        /* =================================================
           PATH
        ================================================= */

        .adaptive-learning-page
        .adaptive-path {

          position: relative;
        }


        .adaptive-learning-page
        .adaptive-path-line {

          position: absolute;

          left: 29px;

          top: 35px;

          bottom: 35px;

          width: 1px;

          background:
            linear-gradient(
              to bottom,
              rgba(139,92,246,0.55),
              rgba(34,211,238,0.15),
              transparent
            );
        }


        .adaptive-learning-page
        .adaptive-path-item {

          position: relative;

          display: grid;

          grid-template-columns:
            58px 1fr;

          gap: 18px;

          margin-bottom: 15px;
        }


        /* =================================================
           STEP NODE
        ================================================= */

        .adaptive-learning-page
        .adaptive-step-column {

          display: flex;

          justify-content: center;

          position: relative;

          z-index: 3;
        }


        .adaptive-learning-page
        .adaptive-step-node {

          width: 42px;
          height: 42px;

          display: grid;

          place-items: center;

          border-radius: 50%;

          background:
            #0b1120;

          border:
            1px solid
            rgba(167,139,250,0.4);

          color: #c4b5fd;

          font-size: 11px;

          font-weight: 800;

          box-shadow:
            0 0 25px
            rgba(139,92,246,0.12);
        }


        .adaptive-learning-page
        .adaptive-step-node.weak {

          color: #fca5a5;

          border-color:
            rgba(248,113,113,0.4);
        }


        .adaptive-learning-page
        .adaptive-step-node.developing {

          color: #fcd34d;

          border-color:
            rgba(251,191,36,0.4);
        }


        .adaptive-learning-page
        .adaptive-step-node.strong {

          color: #5eead4;

          border-color:
            rgba(45,212,191,0.4);
        }


        /* =================================================
           PATH CARD
        ================================================= */

        .adaptive-learning-page
        .adaptive-path-card {

          padding: 21px;

          border-radius: 18px;

          background:
            rgba(15,23,42,0.64);

          border:
            1px solid
            rgba(148,163,184,0.13);

          backdrop-filter:
            blur(18px);

          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }


        .adaptive-learning-page
        .adaptive-path-card:hover {

          transform:
            translateY(-3px);

          border-color:
            rgba(167,139,250,0.32);

          box-shadow:
            0 20px 50px
            rgba(0,0,0,0.22),
            0 0 30px
            rgba(139,92,246,0.06);
        }


        .adaptive-learning-page
        .adaptive-card-top {

          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 18px;
        }


        .adaptive-learning-page
        .adaptive-concept-title {

          display: flex;

          align-items: center;

          gap: 9px;
        }


        .adaptive-learning-page
        .adaptive-concept-title svg {

          color: #a78bfa;
        }


        .adaptive-learning-page
        .adaptive-concept-title h3 {

          margin: 0;

          font-size: 16px;

          font-weight: 700;
        }


        /* =================================================
           PRIORITY
        ================================================= */

        .adaptive-learning-page
        .adaptive-priority {

          padding:
            5px 9px;

          border-radius: 999px;

          font-size: 8px;

          font-weight: 800;

          letter-spacing: 0.8px;

          text-transform: uppercase;

          white-space: nowrap;
        }


        .adaptive-learning-page
        .priority-high {

          color: #fca5a5;

          background:
            rgba(239,68,68,0.08);

          border:
            1px solid
            rgba(239,68,68,0.18);
        }


        .adaptive-learning-page
        .priority-medium {

          color: #fcd34d;

          background:
            rgba(245,158,11,0.08);

          border:
            1px solid
            rgba(245,158,11,0.18);
        }


        .adaptive-learning-page
        .priority-low {

          color: #5eead4;

          background:
            rgba(20,184,166,0.08);

          border:
            1px solid
            rgba(20,184,166,0.18);
        }


        /* =================================================
           META
        ================================================= */

        .adaptive-learning-page
        .adaptive-concept-meta {

          display: flex;

          align-items: center;

          gap: 17px;

          margin-top: 10px;

          color: #64748b;

          font-size: 10px;
        }


        .adaptive-learning-page
        .adaptive-meta-item {

          display: flex;

          align-items: center;

          gap: 5px;
        }


        /* =================================================
           MASTERY
        ================================================= */

        .adaptive-learning-page
        .adaptive-mastery {

          margin-top: 17px;
        }


        .adaptive-learning-page
        .adaptive-mastery-label {

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 7px;

          color: #64748b;

          font-size: 10px;
        }


        .adaptive-learning-page
        .adaptive-mastery-label strong {

          color: #cbd5e1;

          font-size: 10px;
        }


        .adaptive-learning-page
        .adaptive-mastery-track {

          height: 5px;

          overflow: hidden;

          border-radius: 999px;

          background:
            rgba(51,65,85,0.55);
        }


        .adaptive-learning-page
        .adaptive-mastery-fill {

          height: 100%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              #8b5cf6,
              #22d3ee
            );
        }


        /* =================================================
           CARD FOOTER
        ================================================= */

        .adaptive-learning-page
        .adaptive-card-footer {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          margin-top: 14px;

          padding-top: 13px;

          border-top:
            1px solid
            rgba(148,163,184,0.07);
        }


        .adaptive-learning-page
        .adaptive-action {

          display: flex;

          align-items: center;

          gap: 7px;

          color: #a5b4fc;

          font-size: 10px;

          font-weight: 700;
        }


        .adaptive-learning-page
        .adaptive-step-count {

          color: #475569;

          font-size: 9px;
        }


        /* =================================================
           CTA
        ================================================= */

        .adaptive-learning-page
        .adaptive-start-button {

          width: 100%;

          margin-top: 25px;

          padding: 15px 20px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          border: none;

          border-radius: 12px;

          background:
            linear-gradient(
              90deg,
              #7c3aed,
              #06b6d4
            );

          color: white;

          font-size: 12px;

          font-weight: 800;

          box-shadow:
            0 12px 35px
            rgba(124,58,237,0.2);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }


        .adaptive-learning-page
        .adaptive-start-button:hover {

          transform:
            translateY(-2px);

          box-shadow:
            0 17px 42px
            rgba(124,58,237,0.3);
        }


        /* =================================================
           EMPTY STATE
        ================================================= */

        .adaptive-learning-page
        .adaptive-empty {

          padding: 55px 20px;

          text-align: center;

          border:
            1px solid
            rgba(148,163,184,0.13);

          border-radius: 18px;

          background:
            rgba(15,23,42,0.55);

          color: #64748b;
        }


        .adaptive-learning-page
        .adaptive-empty svg {

          color: #a78bfa;

          margin-bottom: 10px;
        }


        .adaptive-learning-page
        .adaptive-empty p {

          margin: 0;

          font-size: 12px;
        }


        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 700px) {

          .adaptive-learning-page {

            padding:
              24px 18px 50px;
          }


          .adaptive-learning-page
          .adaptive-learning-header {

            margin-bottom: 40px;
          }


          .adaptive-learning-page
          .adaptive-learning-hero h1 {

            font-size: 43px;

            letter-spacing: -2px;
          }


          .adaptive-learning-page
          .adaptive-stat-grid {

            grid-template-columns: 1fr;

            gap: 10px;
          }


          .adaptive-learning-page
          .adaptive-section-header {

            align-items: flex-start;

            flex-direction: column;
          }


          .adaptive-learning-page
          .adaptive-path-item {

            grid-template-columns:
              42px 1fr;

            gap: 11px;
          }


          .adaptive-learning-page
          .adaptive-path-line {

            left: 21px;
          }


          .adaptive-learning-page
          .adaptive-step-node {

            width: 38px;
            height: 38px;
          }


          .adaptive-learning-page
          .adaptive-card-top {

            flex-direction: column;

            gap: 10px;
          }


          .adaptive-learning-page
          .adaptive-card-footer {

            align-items: flex-start;

            flex-direction: column;
          }
        }

      `}</style>


      <div className="adaptive-learning-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="adaptive-learning-header">

          <button
            className="adaptive-back"
            onClick={onBack}
          >
            <ArrowLeft size={15} />

            Back to Analysis
          </button>


          <div className="adaptive-ai-label">

            <Sparkles size={13} />

            Adaptive Intelligence

          </div>

        </div>


        {/* =================================================
            HERO
        ================================================= */}

        <motion.div
          className="adaptive-learning-hero"

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <div className="adaptive-hero-icon">

            <Brain size={28} />

          </div>


          <div className="adaptive-engine-status">

            <span className="adaptive-status-dot" />

            Learning engine optimized

          </div>


          <h1>

            Your path is{" "}

            <span>
              ready.
            </span>

          </h1>


          <p>

            ADAPT.AI analyzed your diagnostic performance,
            identified knowledge gaps, and organized your
            concepts into a dependency-aware learning sequence.

          </p>

        </motion.div>


        {/* =================================================
            STATS
        ================================================= */}

        <div className="adaptive-stat-grid">

          <motion.div
            className="adaptive-stat-card"

            initial={{
              opacity: 0,
              y: 12,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.1,
            }}
          >

            <div className="adaptive-stat-label">

              <BookOpen size={13} />

              Learning steps

            </div>


            <div
              className="
                adaptive-stat-value
                stat-purple
              "
            >
              {learningPath.length}
            </div>

          </motion.div>


          <motion.div
            className="adaptive-stat-card"

            initial={{
              opacity: 0,
              y: 12,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.16,
            }}
          >

            <div className="adaptive-stat-label">

              <Target size={13} />

              Priority gaps

            </div>


            <div
              className="
                adaptive-stat-value
                stat-orange
              "
            >
              {weakCount}
            </div>

          </motion.div>


          <motion.div
            className="adaptive-stat-card"

            initial={{
              opacity: 0,
              y: 12,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.22,
            }}
          >

            <div className="adaptive-stat-label">

              <Clock3 size={13} />

              Estimated learning

            </div>


            <div
              className="
                adaptive-stat-value
                stat-cyan
              "
            >
              {totalTime} min
            </div>

          </motion.div>

        </div>


        {/* =================================================
            PATH HEADER
        ================================================= */}

        <div className="adaptive-section-header">

          <div>

            <h2>
              Adaptive Learning Sequence
            </h2>

            <p>
              Your concepts are ordered according to
              mastery and prerequisite relationships.
            </p>

          </div>


          <div className="adaptive-ai-label">

            <Zap size={13} />

            AI Optimized

          </div>

        </div>


        {/* =================================================
            LEARNING PATH
        ================================================= */}

        <div className="adaptive-path">

          {learningPath.length === 0 ? (

            <div className="adaptive-empty">

              <Lock size={28} />

              <p>
                No learning path could be generated
                from the current diagnostic results.
              </p>

            </div>

          ) : (

            <>

              <div className="adaptive-path-line" />


              {learningPath.map(
                (item, index) => (

                  <motion.div
                    className="adaptive-path-item"

                    key={item.concept}

                    initial={{
                      opacity: 0,
                      x: -18,
                    }}

                    animate={{
                      opacity: 1,
                      x: 0,
                    }}

                    transition={{
                      delay:
                        0.08 * index,
                    }}
                  >

                    {/* STEP */}

                    <div
                      className="
                        adaptive-step-column
                      "
                    >

                      <div
                        className={`
                          adaptive-step-node
                          ${
                            item.isWeak
                              ? "weak"
                              : item.isDeveloping
                              ? "developing"
                              : "strong"
                          }
                        `}
                      >

                        {item.isStrong ? (
                          <CheckCircle2
                            size={17}
                          />
                        ) : (
                          item.step
                        )}

                      </div>

                    </div>


                    {/* CARD */}

                    <div
                      className="
                        adaptive-path-card
                      "
                    >

                      <div
                        className="
                          adaptive-card-top
                        "
                      >

                        <div>

                          <div
                            className="
                              adaptive-concept-title
                            "
                          >

                            {item.isWeak ? (
                              <Target
                                size={18}
                              />
                            ) : (
                              <Brain
                                size={18}
                              />
                            )}

                            <h3>
                              {item.concept}
                            </h3>

                          </div>


                          <div
                            className="
                              adaptive-concept-meta
                            "
                          >

                            <div
                              className="
                                adaptive-meta-item
                              "
                            >

                              <Clock3
                                size={12}
                              />

                              {item.estimatedTime}
                              {" "}
                              min

                            </div>


                            <div
                              className="
                                adaptive-meta-item
                              "
                            >

                              <Play
                                size={12}
                              />

                              {item.action}

                            </div>

                          </div>

                        </div>


                        <div
                          className={`
                            adaptive-priority
                            ${
                              item.priority ===
                              "High"
                                ? "priority-high"
                                : item.priority ===
                                  "Medium"
                                ? "priority-medium"
                                : "priority-low"
                            }
                          `}
                        >
                          {item.priority}
                          {" "}
                          priority
                        </div>

                      </div>


                      {/* MASTERY */}

                      <div
                        className="
                          adaptive-mastery
                        "
                      >

                        <div
                          className="
                            adaptive-mastery-label
                          "
                        >

                          <span>
                            Current mastery
                          </span>

                          <strong>
                            {item.mastery}%
                          </strong>

                        </div>


                        <div
                          className="
                            adaptive-mastery-track
                          "
                        >

                          <motion.div
                            className="
                              adaptive-mastery-fill
                            "

                            initial={{
                              width: 0,
                            }}

                            animate={{
                              width:
                                `${item.mastery}%`,
                            }}

                            transition={{
                              duration: 0.8,

                              delay:
                                0.15 +
                                index * 0.06,
                            }}
                          />

                        </div>

                      </div>


                      {/* FOOTER */}

                      <div
                        className="
                          adaptive-card-footer
                        "
                      >

                        <div
                          className="
                            adaptive-action
                          "
                        >

                          <Sparkles
                            size={13}
                          />

                          {item.action}

                        </div>


                        <div
                          className="
                            adaptive-step-count
                          "
                        >

                          Step{" "}
                          {item.step}
                          {" "}
                          of{" "}
                          {learningPath.length}

                        </div>

                      </div>

                    </div>

                  </motion.div>

                )
              )}

            </>

          )}

        </div>


        {/* =================================================
            START BUTTON
        ================================================= */}

        {learningPath.length > 0 && (

          <motion.button
            className="
              adaptive-start-button
            "

            onClick={onStartLearning}

            initial={{
              opacity: 0,
              y: 15,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay:
                0.2 +
                learningPath.length * 0.06,
            }}
          >

            <Sparkles size={16} />

            Start Personalized Learning

            <ArrowRight size={17} />

          </motion.button>

        )}

      </div>

    </div>
  );
}