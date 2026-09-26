// src/pages/KnowledgeAnalysis.jsx

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  GitBranch,
  Lightbulb,
  Network,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

function KnowledgeAnalysis({
  results,
  onContinue,
  onBack,
}) {
  if (!results) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#070b14",
          color: "white",
          display: "grid",
          placeItems: "center",
        }}
      >
        No analysis data available.
      </div>
    );
  }

  const concepts = Object.entries(
    results.conceptResults || {}
  );

  const strong = concepts.filter(
    ([, value]) => value?.status === "Strong"
  );

  const developing = concepts.filter(
    ([, value]) => value?.status === "Developing"
  );

  const weak = concepts.filter(
    ([, value]) => value?.status === "Weak"
  );

  const getStatusColor = (status) => {
    if (status === "Strong") return "#4ade80";
    if (status === "Developing") return "#facc15";
    return "#fb7185";
  };

  /*
   * IMPORTANT:
   * Diagnostic results may contain prerequisite information
   * in slightly different shapes. Always normalize it into
   * an array before using .join(), .map(), or spreading it.
   */
  const prerequisiteGaps = Array.isArray(
    results.prerequisiteGaps
  )
    ? results.prerequisiteGaps
    : [];

  const getPrerequisites = (item) => {
    if (Array.isArray(item?.prerequisites)) {
      return item.prerequisites;
    }

    if (Array.isArray(item?.prerequisite)) {
      return item.prerequisite;
    }

    if (typeof item?.prerequisites === "string") {
      return [item.prerequisites];
    }

    if (typeof item?.prerequisite === "string") {
      return [item.prerequisite];
    }

    return [];
  };

  const recommendedPath =
    prerequisiteGaps.length > 0
      ? prerequisiteGaps.flatMap((item) => {
          const prerequisites =
            getPrerequisites(item);

          return [
            ...prerequisites,
            item?.concept,
          ].filter(Boolean);
        })
      : weak
          .slice(0, 4)
          .map(([concept]) => concept);

  const uniqueRecommendedPath =
    recommendedPath
      .filter(Boolean)
      .filter(
        (value, index, array) =>
          array.indexOf(value) === index
      )
      .slice(0, 5);

  return (
    <div className="analysis-page">

      <style>{`

        .analysis-page {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at 10% 10%,
              rgba(124,58,237,0.17),
              transparent 28%
            ),
            radial-gradient(
              circle at 90% 70%,
              rgba(6,182,212,0.10),
              transparent 30%
            ),
            #070b14;

          color: #f8fafc;
          padding: 35px 24px 60px;
        }

        .analysis-shell {
          width: min(1180px, 100%);
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 55px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;

          color: #cbd5e1;
          background: rgba(255,255,255,0.04);

          border: 1px solid rgba(255,255,255,0.08);

          border-radius: 12px;
          padding: 10px 15px;

          cursor: pointer;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 9px;

          font-weight: 800;
          letter-spacing: 1px;
        }

        .brand-icon {
          width: 35px;
          height: 35px;

          display: grid;
          place-items: center;

          border-radius: 11px;

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #06b6d4
            );

          box-shadow:
            0 0 25px rgba(124,58,237,0.25);
        }

        .eyebrow {
          color: #a78bfa;

          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 800;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 25px;
          align-items: center;
          margin-bottom: 30px;
        }

        .hero h1 {
          font-size: clamp(38px, 5vw, 62px);

          line-height: 1.02;

          letter-spacing: -3px;

          margin: 10px 0 18px;
        }

        .gradient-text {
          background:
            linear-gradient(
              90deg,
              #c4b5fd,
              #67e8f9
            );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          max-width: 650px;

          color: #94a3b8;

          line-height: 1.75;

          font-size: 15px;
        }

        .subject-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-top: 18px;

          padding: 9px 13px;

          border-radius: 999px;

          color: #c4b5fd;

          background:
            rgba(139,92,246,0.08);

          border:
            1px solid rgba(139,92,246,0.18);

          font-size: 12px;
        }

        .mastery-card {
          position: relative;

          min-height: 280px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          border-radius: 28px;

          border:
            1px solid rgba(255,255,255,0.09);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.06),
              rgba(255,255,255,0.025)
            );

          overflow: hidden;
        }

        .mastery-card::before {
          content: "";

          position: absolute;

          width: 260px;
          height: 260px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(139,92,246,0.18),
              transparent 65%
            );

          filter: blur(5px);
        }

        .mastery-ring {
          width: 175px;
          height: 175px;

          border-radius: 50%;

          display: grid;
          place-items: center;

          position: relative;

          background:
            radial-gradient(
              circle,
              #0b1020 60%,
              transparent 61%
            ),
            conic-gradient(
              #8b5cf6 ${Math.max(
                0,
                Math.min(100, Number(results.overallMastery) || 0)
              )}%,
              rgba(255,255,255,0.06) 0
            );

          box-shadow:
            0 0 55px rgba(139,92,246,0.22);
        }

        .mastery-value {
          font-size: 39px;
          font-weight: 800;
        }

        .mastery-caption {
          color: #94a3b8;
          font-size: 11px;
          margin-top: 3px;
        }

        .mastery-label {
          margin-top: 17px;

          color: #cbd5e1;

          font-size: 13px;

          z-index: 2;
        }

        .glass {
          border-radius: 22px;

          border:
            1px solid rgba(255,255,255,0.08);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.025)
            );

          padding: 25px;

          margin-top: 20px;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 10px;

          margin-bottom: 20px;
        }

        .section-heading h2 {
          margin: 0;

          font-size: 20px;
        }

        .section-heading p {
          margin: 3px 0 0;

          color: #64748b;

          font-size: 12px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 12px;
        }

        .stat {
          padding: 18px;

          border-radius: 15px;

          background:
            rgba(255,255,255,0.035);

          border:
            1px solid rgba(255,255,255,0.06);
        }

        .stat-number {
          font-size: 27px;
          font-weight: 800;
        }

        .stat-label {
          margin-top: 5px;

          color: #64748b;

          font-size: 11px;
        }

        .concept-grid {
          display: grid;

          grid-template-columns:
            repeat(2,minmax(0,1fr));

          gap: 12px;
        }

        .concept-card {
          padding: 17px;

          border-radius: 16px;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid rgba(255,255,255,0.07);
        }

        .concept-header {
          display: flex;
          justify-content: space-between;

          margin-bottom: 11px;
        }

        .concept-name {
          font-weight: 700;
        }

        .concept-score {
          font-weight: 800;
        }

        .progress {
          height: 7px;

          background:
            rgba(255,255,255,0.07);

          border-radius: 999px;

          overflow: hidden;
        }

        .progress-fill {
          height: 100%;

          border-radius: inherit;
        }

        .concept-status {
          margin-top: 9px;

          font-size: 11px;
          font-weight: 700;
        }

        .analysis-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 20px;
        }

        .insight-card {
          padding: 22px;

          border-radius: 20px;

          border:
            1px solid rgba(255,255,255,0.08);

          background:
            rgba(255,255,255,0.035);
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 11px;

          margin-bottom: 14px;
        }

        .insight-icon {
          width: 38px;
          height: 38px;

          display: grid;
          place-items: center;

          border-radius: 11px;

          background:
            rgba(139,92,246,0.10);

          color: #c4b5fd;
        }

        .insight-header h3 {
          margin: 0;

          font-size: 15px;
        }

        .insight-header p {
          margin: 3px 0 0;

          color: #64748b;

          font-size: 11px;
        }

        .insight-text {
          color: #94a3b8;

          font-size: 13px;

          line-height: 1.7;
        }

        .weak-list {
          display: flex;
          flex-wrap: wrap;

          gap: 8px;

          margin-top: 15px;
        }

        .weak-pill {
          padding: 8px 11px;

          border-radius: 999px;

          color: #fecdd3;

          background:
            rgba(244,63,94,0.07);

          border:
            1px solid rgba(251,113,133,0.16);

          font-size: 11px;
        }

        .bottleneck {
          margin-top: 12px;

          padding: 13px;

          border-radius: 13px;

          background:
            rgba(139,92,246,0.07);

          border:
            1px solid rgba(139,92,246,0.13);

          color: #cbd5e1;

          font-size: 12px;

          line-height: 1.6;
        }

        .bottleneck strong {
          color: #c4b5fd;
        }

        .galaxy {
          position: relative;

          min-height: 390px;

          overflow: hidden;

          border-radius: 24px;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(124,58,237,0.12),
              transparent 42%
            ),
            rgba(255,255,255,0.025);

          border:
            1px solid rgba(255,255,255,0.07);
        }

        .galaxy-grid {
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );

          background-size: 42px 42px;
        }

        .galaxy-center {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%,-50%);

          width: 110px;
          height: 110px;

          border-radius: 50%;

          display: grid;
          place-items: center;

          text-align: center;

          background:
            radial-gradient(
              circle,
              rgba(124,58,237,0.28),
              rgba(124,58,237,0.08)
            );

          border:
            1px solid rgba(167,139,250,0.35);

          box-shadow:
            0 0 50px rgba(124,58,237,0.22);

          z-index: 3;
        }

        .center-icon {
          color: #c4b5fd;
        }

        .center-label {
          font-size: 10px;
          color: #ddd6fe;
          margin-top: 4px;
        }

        .node {
          position: absolute;

          width: 115px;
          min-height: 62px;

          padding: 10px;

          border-radius: 14px;

          display: flex;
          flex-direction: column;
          justify-content: center;

          text-align: center;

          background:
            rgba(7,11,20,0.85);

          backdrop-filter: blur(12px);

          border:
            1px solid rgba(255,255,255,0.10);

          z-index: 4;
        }

        .node-name {
          font-size: 11px;
          font-weight: 700;
        }

        .node-score {
          font-size: 10px;
          margin-top: 4px;
        }

        .node-1 {
          left: 8%;
          top: 23%;
        }

        .node-2 {
          left: 30%;
          top: 8%;
        }

        .node-3 {
          right: 28%;
          top: 8%;
        }

        .node-4 {
          right: 7%;
          top: 28%;
        }

        .node-5 {
          right: 12%;
          bottom: 13%;
        }

        .node-6 {
          left: 35%;
          bottom: 8%;
        }

        .node-7 {
          left: 8%;
          bottom: 18%;
        }

        .connection {
          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              rgba(139,92,246,0.05),
              rgba(139,92,246,0.4),
              rgba(6,182,212,0.05)
            );

          transform-origin: left center;

          z-index: 1;
        }

        .connection-1 {
          width: 180px;
          left: 18%;
          top: 35%;
          transform: rotate(10deg);
        }

        .connection-2 {
          width: 150px;
          left: 38%;
          top: 25%;
          transform: rotate(25deg);
        }

        .connection-3 {
          width: 150px;
          left: 51%;
          top: 27%;
          transform: rotate(-23deg);
        }

        .connection-4 {
          width: 180px;
          left: 57%;
          top: 37%;
          transform: rotate(-10deg);
        }

        .connection-5 {
          width: 180px;
          left: 55%;
          top: 58%;
          transform: rotate(20deg);
        }

        .connection-6 {
          width: 160px;
          left: 40%;
          top: 62%;
          transform: rotate(155deg);
        }

        .connection-7 {
          width: 190px;
          left: 17%;
          top: 60%;
          transform: rotate(-8deg);
        }

        .path-card {
          margin-top: 20px;

          padding: 22px;

          border-radius: 20px;

          border:
            1px solid rgba(103,232,249,0.12);

          background:
            linear-gradient(
              135deg,
              rgba(139,92,246,0.08),
              rgba(6,182,212,0.05)
            );
        }

        .path-title {
          display: flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 18px;
        }

        .path-title h3 {
          margin: 0;

          font-size: 17px;
        }

        .path {
          display: flex;
          align-items: center;

          gap: 7px;

          overflow-x: auto;

          padding-bottom: 5px;
        }

        .path-node {
          min-width: 125px;

          padding: 13px;

          border-radius: 13px;

          background:
            rgba(7,11,20,0.6);

          border:
            1px solid rgba(255,255,255,0.08);

          text-align: center;
        }

        .path-node span {
          display: block;

          color: #64748b;

          font-size: 9px;

          margin-bottom: 5px;
        }

        .path-node strong {
          font-size: 11px;
        }

        .path-arrow {
          color: #64748b;

          flex-shrink: 0;
        }

        .continue-area {
          display: flex;

          justify-content: flex-end;

          margin-top: 25px;
        }

        .continue-btn {
          display: flex;
          align-items: center;
          gap: 9px;

          border: 0;

          border-radius: 14px;

          padding: 14px 22px;

          color: white;

          font-weight: 800;

          cursor: pointer;

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #0891b2
            );

          box-shadow:
            0 10px 35px rgba(124,58,237,0.22);

          transition: 0.2s ease;
        }

        .continue-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 850px) {

          .hero {
            grid-template-columns: 1fr;
          }

          .analysis-grid {
            grid-template-columns: 1fr;
          }

          .concept-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .analysis-page {
            padding: 25px 15px 45px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .galaxy {
            min-height: 450px;
          }

        }

      `}</style>


      {/* TOP BAR */}

      <div className="analysis-shell">

        <div className="topbar">

          <button
            className="back-button"
            onClick={onBack}
          >
            <ChevronRight
              size={16}
              style={{
                transform: "rotate(180deg)",
              }}
            />

            Back
          </button>


          <div className="brand">

            <div className="brand-icon">
              <Sparkles size={17} />
            </div>

            ADAPT.AI

          </div>

        </div>


        {/* HERO */}

        <div className="hero">

          <div>

            <div className="eyebrow">
              KNOWLEDGE INTELLIGENCE
            </div>

            <h1>
              We found your{" "}
              <span className="gradient-text">
                learning pattern.
              </span>
            </h1>

            <p className="hero-description">
              Your diagnostic wasn't just scored.
              ADAPT.AI analyzed your performance
              concept by concept, identified learning
              gaps, and mapped the prerequisite
              relationships that influence your progress.
            </p>

            <div className="subject-pill">

              <Target size={14} />

              {typeof results.subject === "object"
                ? results.subject?.name ||
                  results.subject?.label ||
                  results.subject?.short ||
                  "Selected Subject"
                : results.subject ||
                  "Selected Subject"}

              {" • "}

              {results.semester || "Semester"}

            </div>

          </div>


          {/* MASTERY */}

          <div className="mastery-card">

            <div className="mastery-ring">

              <div>

                <div className="mastery-value">
                  {Number(results.overallMastery) || 0}%
                </div>

                <div className="mastery-caption">
                  overall mastery
                </div>

              </div>

            </div>

            <div className="mastery-label">
              Current Knowledge Level
            </div>

          </div>

        </div>


        {/* SUMMARY */}

        <div className="glass">

          <div className="section-heading">

            <BrainCircuit
              size={20}
              color="#a78bfa"
            />

            <div>

              <h2>
                Knowledge Summary
              </h2>

              <p>
                Your performance across the assessment
              </p>

            </div>

          </div>


          <div className="stats">

            <div className="stat">

              <div className="stat-number">
                {strong.length}
              </div>

              <div className="stat-label">
                Strong Concepts
              </div>

            </div>


            <div className="stat">

              <div className="stat-number">
                {developing.length}
              </div>

              <div className="stat-label">
                Developing Concepts
              </div>

            </div>


            <div className="stat">

              <div className="stat-number">
                {weak.length}
              </div>

              <div className="stat-label">
                Knowledge Gaps
              </div>

            </div>

          </div>

        </div>


        {/* CONCEPT MASTERY */}

        <div className="glass">

          <div className="section-heading">

            <TrendingUp
              size={20}
              color="#67e8f9"
            />

            <div>

              <h2>
                Concept Mastery
              </h2>

              <p>
                Topic-level understanding detected from
                your diagnostic
              </p>

            </div>

          </div>


          <div className="concept-grid">

            {concepts.map(
              ([concept, data]) => {

                const safeData = data || {};

                const mastery =
                  Number(safeData.mastery) || 0;

                const color =
                  getStatusColor(
                    safeData.status
                  );

                return (
                  <div
                    className="concept-card"
                    key={concept}
                  >

                    <div className="concept-header">

                      <div className="concept-name">
                        {concept}
                      </div>

                      <div
                        className="concept-score"
                        style={{
                          color,
                        }}
                      >
                        {mastery}%
                      </div>

                    </div>


                    <div className="progress">

                      <div
                        className="progress-fill"
                        style={{
                          width:
                            `${Math.max(
                              0,
                              Math.min(100, mastery)
                            )}%`,
                          background:
                            color,
                        }}
                      />

                    </div>


                    <div
                      className="concept-status"
                      style={{
                        color,
                      }}
                    >
                      {safeData.status || "Unknown"}

                      {" • "}

                      {safeData.correct || 0}/
                      {safeData.attempted || 0}
                      {" correct"}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>


        {/* AI INSIGHTS */}

        <div className="analysis-grid">

          {/* KNOWLEDGE GAPS */}

          <div className="glass">

            <div className="insight-header">

              <div className="insight-icon">
                <CircleAlert size={19} />
              </div>

              <div>

                <h3>
                  Knowledge Gaps
                </h3>

                <p>
                  Concepts requiring attention
                </p>

              </div>

            </div>


            {weak.length > 0 ? (

              <>

                <div className="insight-text">

                  These concepts currently have the
                  lowest demonstrated mastery and
                  should receive additional practice.

                </div>


                <div className="weak-list">

                  {weak.map(
                    ([concept]) => (

                      <div
                        className="weak-pill"
                        key={concept}
                      >
                        {concept}
                      </div>

                    )
                  )}

                </div>

              </>

            ) : (

              <div
                className="insight-text"
                style={{
                  color: "#4ade80",
                }}
              >

                <CheckCircle2
                  size={15}
                  style={{
                    verticalAlign:
                      "middle",
                    marginRight: 6,
                  }}
                />

                No major knowledge gaps were
                detected.

              </div>

            )}

          </div>


          {/* PREREQUISITE ANALYSIS */}

          <div className="glass">

            <div className="insight-header">

              <div className="insight-icon">
                <GitBranch size={19} />
              </div>

              <div>

                <h3>
                  Prerequisite Analysis
                </h3>

                <p>
                  Dependency bottlenecks
                </p>

              </div>

            </div>


            {prerequisiteGaps.length > 0 ? (

              prerequisiteGaps.map(
                (item, index) => {

                  const prerequisites =
                    getPrerequisites(item);

                  const concept =
                    item?.concept ||
                    `Concept ${index + 1}`;

                  return (

                    <div
                      className="bottleneck"
                      key={`${concept}-${index}`}
                    >

                      <strong>
                        {concept}
                      </strong>

                      {prerequisites.length > 0 ? (
                        <>
                          {" depends on "}

                          {prerequisites.join(
                            " + "
                          )}

                          .
                        </>
                      ) : (
                        <>
                          {" has a prerequisite relationship "}
                          detected from the diagnostic.
                        </>
                      )}

                      <br />

                      Strengthen the prerequisite
                      concepts before advancing.

                    </div>

                  );
                }
              )

            ) : (

              <div className="insight-text">

                The current results do not indicate
                a major prerequisite bottleneck.

              </div>

            )}

          </div>

        </div>


        {/* KNOWLEDGE GALAXY */}

        <div className="glass">

          <div className="section-heading">

            <Network
              size={20}
              color="#a78bfa"
            />

            <div>

              <h2>
                Knowledge Galaxy
              </h2>

              <p>
                Visual map of your current concept
                mastery
              </p>

            </div>

          </div>


          <div className="galaxy">

            <div className="galaxy-grid" />


            {/* CONNECTIONS */}

            <div className="connection connection-1" />
            <div className="connection connection-2" />
            <div className="connection connection-3" />
            <div className="connection connection-4" />
            <div className="connection connection-5" />
            <div className="connection connection-6" />
            <div className="connection connection-7" />


            {/* CENTER */}

            <div className="galaxy-center">

              <div>

                <BrainCircuit
                  className="center-icon"
                  size={25}
                />

                <div className="center-label">
                  YOUR KNOWLEDGE
                </div>

              </div>

            </div>


            {/* NODES */}

            {concepts
              .slice(0, 7)
              .map(
                ([concept, data], index) => {

                  const safeData = data || {};

                  const mastery =
                    Number(safeData.mastery) || 0;

                  const color =
                    getStatusColor(
                      safeData.status
                    );

                  return (
                    <div
                      key={concept}
                      className={`node node-${index + 1}`}
                      style={{
                        borderColor:
                          `${color}55`,
                        boxShadow:
                          `0 0 25px ${color}12`,
                      }}
                    >

                      <div className="node-name">
                        {concept}
                      </div>

                      <div
                        className="node-score"
                        style={{
                          color,
                        }}
                      >
                        {mastery}% •{" "}
                        {safeData.status ||
                          "Unknown"}

                      </div>

                    </div>
                  );

                }
              )}

          </div>

        </div>


        {/* RECOMMENDED PATH */}

        <div className="path-card">

          <div className="path-title">

            <Zap
              size={19}
              color="#67e8f9"
            />

            <h3>
              Recommended Learning Sequence
            </h3>

          </div>


          <div className="path">

            {uniqueRecommendedPath.length > 0 ? (

              uniqueRecommendedPath.map(
                (concept, index, array) => (

                  <div
                    key={concept}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >

                    <div className="path-node">

                      <span>
                        STEP {index + 1}
                      </span>

                      <strong>
                        {concept}
                      </strong>

                    </div>

                    {index <
                      array.length - 1 && (

                      <ArrowRight
                        className="path-arrow"
                        size={16}
                      />

                    )}

                  </div>

                )
              )

            ) : (

              <div className="insight-text">
                Your current results do not indicate
                a specific learning sequence yet.
                Continue to build your personalized
                path.
              </div>

            )}

          </div>

        </div>


        {/* CONTINUE */}

        <div className="continue-area">

          <button
            className="continue-btn"
            onClick={onContinue}
          >

            <Lightbulb size={17} />

            Build My Personalized Path

            <ArrowRight size={17} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default KnowledgeAnalysis;