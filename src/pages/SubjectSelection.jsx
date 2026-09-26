import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Sparkles,
} from "lucide-react";

import { getSubjects } from "../data/curriculum";

/*
|--------------------------------------------------------------------------
| Convert ANY curriculum/profile value into a safe string
|--------------------------------------------------------------------------
|
| Your AcademicSetup/ProfileSetup values can look like:
|
| {
|   id: "...",
|   label: "Second Year",
|   short: "...",
|   description: "..."
| }
|
| React cannot render that object directly.
| This function ALWAYS returns a string.
|
*/

function toText(value, fallback = "") {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => toText(item))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof value === "object") {
    /*
     * Prefer human-readable fields.
     */
    const possibleValues = [
      value.label,
      value.name,
      value.title,
      value.value,
      value.short,
      value.id,
    ];

    for (const item of possibleValues) {
      if (
        typeof item === "string" &&
        item.trim() !== ""
      ) {
        return item;
      }

      if (
        typeof item === "number"
      ) {
        return String(item);
      }
    }

    return fallback;
  }

  return fallback;
}

/*
|--------------------------------------------------------------------------
| Convert academic selection objects into the exact curriculum key
|--------------------------------------------------------------------------
*/

function getAcademicKey(value, fallback = "") {
  if (
    typeof value === "string"
  ) {
    return value;
  }

  if (
    value &&
    typeof value === "object"
  ) {
    /*
     * For your profile/year objects,
     * label is the important curriculum key.
     */
    if (
      typeof value.label === "string"
    ) {
      return value.label;
    }

    if (
      typeof value.name === "string"
    ) {
      return value.name;
    }

    if (
      typeof value.value === "string"
    ) {
      return value.value;
    }

    if (
      typeof value.title === "string"
    ) {
      return value.title;
    }
  }

  return fallback;
}

function SubjectSelection({
  branch,
  year,
  onBack,
  onContinue,
}) {
  /*
  |--------------------------------------------------------------------------
  | Normalize branch and year
  |--------------------------------------------------------------------------
  */

  const branchKey = getAcademicKey(
    branch,
    toText(branch, "Computer Engineering")
  );

  const yearKey = getAcademicKey(
    year,
    toText(year, "First Year")
  );

  /*
  |--------------------------------------------------------------------------
  | Your curriculum uses Semester 1 / Semester 2
  | for EVERY academic year.
  |--------------------------------------------------------------------------
  */

  const semesters = [
    "Semester 1",
    "Semester 2",
  ];

  const [activeSemester, setActiveSemester] =
    useState("Semester 1");

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | Load subjects
  |--------------------------------------------------------------------------
  */

  const subjects = useMemo(() => {
    try {
      const result = getSubjects(
        branchKey,
        yearKey,
        activeSemester
      );

      console.log(
        "ADAPT.AI - Loading subjects:",
        {
          branch: branchKey,
          year: yearKey,
          semester: activeSemester,
          subjects: result,
        }
      );

      if (
        !Array.isArray(result)
      ) {
        return [];
      }

      return result;
    } catch (error) {
      console.error(
        "ADAPT.AI - Subject loading error:",
        error
      );

      return [];
    }
  }, [
    branchKey,
    yearKey,
    activeSemester,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Semester change
  |--------------------------------------------------------------------------
  */

  const handleSemesterChange = (
    semester
  ) => {
    setActiveSemester(semester);
    setSelectedSubject(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Subject selection
  |--------------------------------------------------------------------------
  */

  const handleSubjectSelect = (
    subject
  ) => {
    setSelectedSubject(subject);
  };

  /*
  |--------------------------------------------------------------------------
  | Continue
  |--------------------------------------------------------------------------
  */

  const handleContinue = () => {
    if (!selectedSubject) {
      return;
    }

    console.log(
      "ADAPT.AI - Selected subject:",
      selectedSubject
    );

    onContinue({
      semester: activeSemester,
      subject: selectedSubject,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="profile-header">

          <button
            type="button"
            className="profile-back"
            onClick={onBack}
          >
            <ArrowLeft size={18} />

            <span>
              Back
            </span>
          </button>

          <div className="profile-brand">

            <div className="brand-mark">
              <Sparkles size={18} />
            </div>

            <span>
              ADAPT.AI
            </span>

          </div>

          <div className="profile-step">

            <span>
              STEP 3 OF 4
            </span>

            <div className="profile-progress">
              <div className="profile-progress-fill" />
            </div>

          </div>

        </div>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        <div className="profile-content">

          {/* ICON */}

          <div className="profile-icon">
            <BookOpen size={28} />
          </div>

          {/* EYEBROW */}

          <div className="profile-eyebrow">
            ACADEMIC PROFILE
          </div>

          {/* TITLE */}

          <h1>
            Choose your subject
          </h1>

          {/* DESCRIPTION */}

          <p className="profile-description">
            Select the semester and subject you want
            ADAPT.AI to personalize your learning for.
          </p>

          {/* =======================================================
              SEMESTER SELECTOR
          ======================================================= */}

          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              margin:
                "30px auto 24px",
            }}
          >

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >

              {semesters.map(
                (semester) => {

                  const isActive =
                    activeSemester ===
                    semester;

                  return (
                    <button
                      key={semester}
                      type="button"
                      onClick={() =>
                        handleSemesterChange(
                          semester
                        )
                      }
                      style={{
                        padding:
                          "12px 22px",

                        borderRadius:
                          "12px",

                        border: isActive
                          ? "1px solid rgba(167,139,250,0.8)"
                          : "1px solid rgba(148,163,184,0.18)",

                        background: isActive
                          ? "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.18))"
                          : "rgba(255,255,255,0.035)",

                        color: isActive
                          ? "#ffffff"
                          : "#94a3b8",

                        fontWeight: 700,

                        cursor:
                          "pointer",

                        transition:
                          "all 0.2s ease",
                      }}
                    >
                      {semester}
                    </button>
                  );
                }
              )}

            </div>

          </div>

          {/* =======================================================
              SUBJECTS
          ======================================================= */}

          {subjects.length === 0 ? (

            <div
              style={{
                width: "100%",
                maxWidth: "900px",
                padding: "32px",
                borderRadius: "20px",
                border:
                  "1px solid rgba(148,163,184,0.15)",
                background:
                  "rgba(255,255,255,0.035)",
                textAlign: "center",
                color: "#94a3b8",
              }}
            >

              <BookOpen
                size={32}
                style={{
                  marginBottom:
                    "12px",
                }}
              />

              <h3
                style={{
                  margin:
                    "0 0 8px",
                  color:
                    "#f8fafc",
                }}
              >
                No subjects found
              </h3>

              {/* IMPORTANT:
                  Only safe strings are rendered here.
              */}

              <p
                style={{
                  margin: 0,
                }}
              >
                No subjects are available
                for this semester.
              </p>

            </div>

          ) : (

            <div
              className="profile-options"
              style={{
                width: "100%",
                maxWidth: "900px",
              }}
            >

              {subjects.map(
                (
                  subject,
                  index
                ) => {

                  /*
                  |--------------------------------------------------------------------------
                  | Extract subject information safely
                  |--------------------------------------------------------------------------
                  */

                  const subjectCode =
                    toText(
                      subject?.code,
                      `SUBJECT-${index + 1}`
                    );

                  const subjectName =
                    toText(
                      subject?.name,
                      "Subject"
                    );

                  const subjectCategory =
                    toText(
                      subject?.category,
                      "Academic Subject"
                    );

                  const conceptList =
                    Array.isArray(
                      subject?.concepts
                    )
                      ? subject.concepts
                      : [];

                  const conceptCount =
                    conceptList.length;

                  const isSelected =
                    selectedSubject?.code ===
                    subject?.code;

                  /*
                  |--------------------------------------------------------------------------
                  | SUBJECT CARD
                  |--------------------------------------------------------------------------
                  */

                  return (
                    <button
                      key={subjectCode}
                      type="button"
                      className={`profile-option ${
                        isSelected
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleSubjectSelect(
                          subject
                        )
                      }
                      style={{
                        textAlign:
                          "left",
                        width:
                          "100%",
                      }}
                    >

                      {/* ICON */}

                      <div className="option-icon">
                        <BookOpen
                          size={22}
                        />
                      </div>

                      {/* INFORMATION */}

                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >

                        {/* NAME + CODE */}

                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap:
                              "10px",
                            marginBottom:
                              "6px",
                            flexWrap:
                              "wrap",
                          }}
                        >

                          <strong
                            style={{
                              color:
                                "#f8fafc",
                              fontSize:
                                "16px",
                            }}
                          >
                            {subjectName}
                          </strong>

                          <span
                            style={{
                              fontSize:
                                "11px",

                              padding:
                                "4px 8px",

                              borderRadius:
                                "6px",

                              background:
                                "rgba(139,92,246,0.12)",

                              color:
                                "#c4b5fd",

                              fontWeight:
                                700,
                            }}
                          >
                            {subjectCode}
                          </span>

                        </div>

                        {/* CATEGORY */}

                        <div
                          style={{
                            color:
                              "#a78bfa",
                            fontSize:
                              "12px",
                            fontWeight:
                              600,
                            marginBottom:
                              "6px",
                          }}
                        >
                          {subjectCategory}
                        </div>

                        {/* CONCEPT COUNT */}

                        <span
                          style={{
                            display:
                              "block",
                            color:
                              "#94a3b8",
                            fontSize:
                              "13px",
                            lineHeight:
                              1.5,
                          }}
                        >
                          {conceptCount > 0
                            ? `${conceptCount} concepts available for adaptive assessment`
                            : "Adaptive assessment available"}
                        </span>

                      </div>

                      {/* CHECK CIRCLE */}

                      <div
                        style={{
                          width:
                            "24px",
                          height:
                            "24px",
                          minWidth:
                            "24px",
                          borderRadius:
                            "50%",

                          display:
                            "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          border:
                            isSelected
                              ? "1px solid #a78bfa"
                              : "1px solid rgba(148,163,184,0.3)",

                          background:
                            isSelected
                              ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
                              : "transparent",
                        }}
                      >

                        {isSelected && (
                          <Check
                            size={14}
                            color="#ffffff"
                          />
                        )}

                      </div>

                    </button>
                  );
                }
              )}

            </div>

          )}

          {/* =======================================================
              FOOTER
          ======================================================= */}

          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              marginTop: "28px",

              display:
                "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              gap:
                "20px",

              flexWrap:
                "wrap",
            }}
          >

            <div
              className="profile-footer-note"
            >

              <Sparkles size={15} />

              <span>
                Your diagnostic will
                adapt to this subject.
              </span>

            </div>

            <button
              type="button"
              className="academic-continue"
              onClick={
                handleContinue
              }
              disabled={
                !selectedSubject
              }
              style={{
                opacity:
                  selectedSubject
                    ? 1
                    : 0.45,

                cursor:
                  selectedSubject
                    ? "pointer"
                    : "not-allowed",
              }}
            >

              <span>
                Start Diagnostic
              </span>

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

      {/* BACKGROUND GLOWS */}

      <div className="profile-glow glow-one" />

      <div className="profile-glow glow-two" />

    </div>
  );
}

export default SubjectSelection;