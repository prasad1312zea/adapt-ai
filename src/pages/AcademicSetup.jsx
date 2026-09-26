import { useState } from "react";

function AcademicSetup({ branch, onBack, onContinue }) {
  const [selectedYear, setSelectedYear] = useState(null);

  const years = [
    {
      id: "First Year",
      label: "First Year",
      description: "Build your engineering foundations",
    },
    {
      id: "Second Year",
      label: "Second Year",
      description: "Develop core engineering concepts",
    },
    {
      id: "Third Year",
      label: "Third Year",
      description: "Explore advanced technologies",
    },
    {
      id: "Final Year",
      label: "Final Year",
      description: "Specialize and prepare for industry",
    },
  ];

  function handleContinue() {
    if (!selectedYear) return;
    onContinue(selectedYear);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b14",
        color: "white",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 18px",
            marginBottom: "50px",
            borderRadius: "10px",
            border: "1px solid #334155",
            background: "#111827",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <p
          style={{
            color: "#a78bfa",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          STEP 02 • ACADEMIC PROFILE
        </p>

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "15px",
          }}
        >
          What{" "}
          <span style={{ color: "#67e8f9" }}>
            year
          </span>{" "}
          are you in?
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "16px",
            marginBottom: "40px",
          }}
        >
          {branch?.name || "Engineering"} — select your current
          academic year.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "20px",
          }}
        >
          {years.map((year) => {
            const selected =
              selectedYear?.id === year.id;

            return (
              <button
                key={year.id}
                onClick={() => setSelectedYear(year)}
                style={{
                  minHeight: "190px",
                  padding: "25px",
                  textAlign: "left",
                  borderRadius: "20px",
                  border: selected
                    ? "2px solid #67e8f9"
                    : "1px solid #334155",
                  background: selected
                    ? "#172554"
                    : "#111827",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontSize: "34px",
                    fontWeight: "bold",
                    color: "#a78bfa",
                  }}
                >
                  0{years.indexOf(year) + 1}
                </div>

                <h2>{year.label}</h2>

                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {year.description}
                </p>

                {selected && (
                  <strong
                    style={{
                      color: "#67e8f9",
                    }}
                  >
                    ✓ Selected
                  </strong>
                )}
              </button>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "35px",
            padding: "20px",
            borderRadius: "15px",
            background: "#111827",
            border: "1px solid #334155",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ color: "#94a3b8" }}>
            {selectedYear
              ? `Selected: ${selectedYear.label}`
              : "Select your academic year"}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedYear}
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #7c3aed, #0891b2)",
              color: "white",
              fontWeight: "bold",
              cursor: selectedYear
                ? "pointer"
                : "not-allowed",
              opacity: selectedYear ? 1 : 0.4,
            }}
          >
            Choose Subjects →
          </button>
        </div>
      </div>
    </div>
  );
}

export default AcademicSetup;
