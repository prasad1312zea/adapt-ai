// src/pages/Diagnostic.jsx

import { useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Circle,
  Clock3,
  Sparkles,
  Target,
} from "lucide-react";

import {
  getQuestions,
  getPrerequisites,
} from "../data/curriculum";

/*
|--------------------------------------------------------------------------
| SAFE VALUE HELPERS
|--------------------------------------------------------------------------
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

  if (typeof value === "object") {
    return (
      value.label ??
      value.name ??
      value.title ??
      value.value ??
      value.short ??
      value.id ??
      fallback
    );
  }

  return fallback;
}


function getAcademicKey(value, fallback = "") {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    return (
      value.label ??
      value.name ??
      value.value ??
      value.title ??
      fallback
    );
  }

  return fallback;
}


/*
|--------------------------------------------------------------------------
| RANDOM SHUFFLE
|--------------------------------------------------------------------------
|
| Fisher-Yates shuffle.
|
| Returns a NEW array so the original curriculum
| data is never modified.
|--------------------------------------------------------------------------
*/

function shuffleArray(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [result[i], result[j]] = [
      result[j],
      result[i],
    ];
  }

  return result;
}


/*
|--------------------------------------------------------------------------
| SHUFFLE ANSWER OPTIONS
|--------------------------------------------------------------------------
|
| The question's original answer index is preserved
| while the visible option order changes.
|--------------------------------------------------------------------------
*/

function shuffleQuestionOptions(question) {
  if (
    !question ||
    !Array.isArray(question.options)
  ) {
    return question;
  }

  const options = question.options.map(
    (text, index) => ({
      text,
      isCorrect:
        Number(index) ===
        Number(question.answer),
    })
  );

  const shuffledOptions =
    shuffleArray(options);

  return {
    ...question,

    options:
      shuffledOptions.map(
        (option) => option.text
      ),

    answer:
      shuffledOptions.findIndex(
        (option) =>
          option.isCorrect
      ),
  };
}


/*
|--------------------------------------------------------------------------
| BUILD DIAGNOSTIC
|--------------------------------------------------------------------------
|
| Important:
|
| Instead of simply taking the first 12 questions,
| we distribute questions across ALL concepts.
|
| Example:
|
| Data Structures
|
| Arrays          → 2 questions
| Linked Lists    → 2 questions
| Stacks          → 2 questions
| Queues          → 2 questions
| Trees           → 2 questions
| BST             → 2 questions
| Graphs          → 2 questions
| Algorithms      → 2 questions
|
| = 16 questions
|
| This gives ADAPT.AI enough evidence to judge
| every concept instead of accidentally ignoring
| half the syllabus.
|--------------------------------------------------------------------------
*/

function buildDiagnosticQuestions(
  allQuestions
) {
  if (
    !Array.isArray(allQuestions) ||
    allQuestions.length === 0
  ) {
    return [];
  }

  /*
   * Group questions by concept.
   */

  const conceptGroups = {};

  allQuestions.forEach(
    (question) => {
      const concept = toText(
        question?.concept,
        "General"
      );

      if (!conceptGroups[concept]) {
        conceptGroups[concept] = [];
      }

      conceptGroups[concept].push(
        question
      );
    }
  );

  /*
   * Randomize the concepts themselves.
   */

  const concepts = shuffleArray(
    Object.keys(conceptGroups)
  );

  const selectedQuestions = [];

  /*
   * Take up to TWO questions per concept.
   *
   * This makes the diagnostic balanced.
   */

  concepts.forEach(
    (concept) => {
      const conceptQuestions =
        shuffleArray(
          conceptGroups[concept]
        );

      const selected =
        conceptQuestions.slice(
          0,
          Math.min(
            2,
            conceptQuestions.length
          )
        );

      selectedQuestions.push(
        ...selected
      );
    }
  );

  /*
   * Randomize the FINAL question order.
   */

  const randomizedQuestions =
    shuffleArray(
      selectedQuestions
    );

  /*
   * Finally shuffle the options
   * independently for every question.
   */

  return randomizedQuestions.map(
    (question) =>
      shuffleQuestionOptions(
        question
      )
  );
}


/*
|--------------------------------------------------------------------------
| DIAGNOSTIC COMPONENT
|--------------------------------------------------------------------------
*/

function Diagnostic({
  branch,
  year,
  semester,
  subject,
  onBack,
  onComplete,
}) {
  /*
  |--------------------------------------------------------------------------
  | NORMALIZE ACADEMIC INFORMATION
  |--------------------------------------------------------------------------
  */

  const branchKey = getAcademicKey(
    branch,
    "Computer Engineering"
  );

  const yearKey = getAcademicKey(
    year,
    "First Year"
  );

  const semesterKey = getAcademicKey(
    semester,
    "Semester 1"
  );


  /*
  |--------------------------------------------------------------------------
  | SUBJECT
  |--------------------------------------------------------------------------
  */

  const subjectCode = toText(
    subject?.code ??
      subject?.id ??
      subject?.value ??
      subject,
    ""
  );

  const subjectName = toText(
    subject?.name ??
      subject?.label ??
      subject?.title,
    subjectCode ||
      "Selected Subject"
  );


  /*
  |--------------------------------------------------------------------------
  | LOAD QUESTIONS
  |--------------------------------------------------------------------------
  */

  const allQuestions = useMemo(() => {
    try {
      const result = getQuestions(
        branchKey,
        yearKey,
        semesterKey,
        subjectCode
      );

      return Array.isArray(result)
        ? result
        : [];
    } catch (error) {
      console.error(
        "ADAPT.AI - Diagnostic question error:",
        error
      );

      return [];
    }
  }, [
    branchKey,
    yearKey,
    semesterKey,
    subjectCode,
  ]);


  /*
  |--------------------------------------------------------------------------
  | RANDOMIZED DIAGNOSTIC
  |--------------------------------------------------------------------------
  |
  | This is intentionally generated once when
  | the diagnostic page is mounted.
  |
  | Every time the student starts the diagnostic
  | again, a new random set/order is generated.
  |--------------------------------------------------------------------------
  */

  const questions = useMemo(() => {
    return buildDiagnosticQuestions(
      allQuestions
    );
  }, [allQuestions]);


  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [showResult, setShowResult] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | CURRENT QUESTION
  |--------------------------------------------------------------------------
  */

  const currentQuestion =
    questions[currentIndex];


  /*
  |--------------------------------------------------------------------------
  | PROGRESS
  |--------------------------------------------------------------------------
  */

  const progress =
    questions.length > 0
      ? ((currentIndex + 1) /
          questions.length) *
        100
      : 0;


  /*
  |--------------------------------------------------------------------------
  | SELECT ANSWER
  |--------------------------------------------------------------------------
  */

  const handleAnswer = (
    answerIndex
  ) => {
    if (showResult) {
      return;
    }

    setSelectedAnswer(
      answerIndex
    );
  };


  /*
  |--------------------------------------------------------------------------
  | CALCULATE RESULTS
  |--------------------------------------------------------------------------
  */

  const calculateResults = (
    finalAnswers
  ) => {
    const conceptStats = {};


    /*
     * Build statistics for every concept.
     */

    questions.forEach(
      (question) => {
        const concept = toText(
          question?.concept,
          "General"
        );

        if (
          !conceptStats[concept]
        ) {
          conceptStats[concept] = {
            concept,
            attempted: 0,
            correct: 0,
            total: 0,
          };
        }

        conceptStats[concept]
          .total += 1;


        const answer =
          finalAnswers[
            question.id
          ];


        if (
          answer !== undefined &&
          answer !== null
        ) {
          conceptStats[
            concept
          ].attempted += 1;


          /*
           * IMPORTANT:
           *
           * question.answer is the
           * SHUFFLED option index.
           *
           * Therefore this comparison
           * remains correct even after
           * options are randomized.
           */

          if (
            Number(answer) ===
            Number(
              question.answer
            )
          ) {
            conceptStats[
              concept
            ].correct += 1;
          }
        }
      }
    );


    /*
     * Convert statistics into
     * concept mastery.
     */

    const conceptResults =
      Object.values(
        conceptStats
      ).map((item) => {
        const mastery =
          item.attempted > 0
            ? Math.round(
                (item.correct /
                  item.attempted) *
                  100
              )
            : 0;


        let status = "Weak";


        if (
          mastery >= 75
        ) {
          status = "Strong";
        } else if (
          mastery >= 50
        ) {
          status = "Developing";
        }


        return {
          concept:
            item.concept,

          attempted:
            item.attempted,

          correct:
            item.correct,

          total:
            item.total,

          mastery,

          status,
        };
      });


    /*
     * Overall mastery
     *
     * Average of concept mastery,
     * giving every concept equal
     * importance.
     */

    const overallMastery =
      conceptResults.length > 0
        ? Math.round(
            conceptResults.reduce(
              (
                sum,
                item
              ) =>
                sum +
                item.mastery,
              0
            ) /
              conceptResults.length
          )
        : 0;


    /*
     * STRONG CONCEPTS
     */

    const strongConcepts =
      conceptResults
        .filter(
          (item) =>
            item.mastery >= 75
        )
        .map(
          (item) =>
            item.concept
        );


    /*
     * DEVELOPING CONCEPTS
     */

    const developingConcepts =
      conceptResults
        .filter(
          (item) =>
            item.mastery >= 50 &&
            item.mastery < 75
        )
        .map(
          (item) =>
            item.concept
        );


    /*
     * WEAK CONCEPTS
     */

    const weakConcepts =
      conceptResults
        .filter(
          (item) =>
            item.mastery < 50
        )
        .map(
          (item) =>
            item.concept
        );


    /*
     |--------------------------------------------------------------------------
     | PREREQUISITE ANALYSIS
     |--------------------------------------------------------------------------
     */

    const prerequisiteGaps = [];


    weakConcepts.forEach(
      (concept) => {
        try {
          const prerequisites =
            getPrerequisites(
              branchKey,
              yearKey,
              semesterKey,
              subjectCode,
              concept
            );


          if (
            Array.isArray(
              prerequisites
            )
          ) {
            prerequisites.forEach(
              (prerequisite) => {
                const existing =
                  conceptResults.find(
                    (item) =>
                      item.concept ===
                      prerequisite
                  );


                if (
                  !existing ||
                  existing.mastery < 75
                ) {
                  prerequisiteGaps.push({
                    concept,
                    prerequisite,
                    mastery:
                      existing?.mastery ??
                      0,
                  });
                }
              }
            );
          }
        } catch (error) {
          console.error(
            "Prerequisite analysis error:",
            error
          );
        }
      }
    );


    /*
     * Remove duplicate prerequisite gaps.
     */

    const uniquePrerequisiteGaps =
      prerequisiteGaps.filter(
        (
          item,
          index,
          array
        ) =>
          index ===
          array.findIndex(
            (other) =>
              other.concept ===
                item.concept &&
              other.prerequisite ===
                item.prerequisite
          )
      );


    /*
     |--------------------------------------------------------------------------
     | FINAL RESULT OBJECT
     |--------------------------------------------------------------------------
     */

    return {
      subject: {
        code:
          subjectCode,

        name:
          subjectName,
      },

      branch:
        branchKey,

      year:
        yearKey,

      semester:
        semesterKey,

      totalQuestions:
        questions.length,

      answeredQuestions:
        Object.keys(
          finalAnswers
        ).length,

      overallMastery,

      conceptResults,

      strongConcepts,

      developingConcepts,

      weakConcepts,

      prerequisiteGaps:
        uniquePrerequisiteGaps,

      /*
       * Keep complete answer history.
       */

      answers:
        questions.map(
          (question) => ({
            questionId:
              question.id,

            concept:
              toText(
                question.concept,
                "General"
              ),

            selectedAnswer:
              finalAnswers[
                question.id
              ] ?? null,

            correct:
              finalAnswers[
                question.id
              ] !== undefined
                ? Number(
                    finalAnswers[
                      question.id
                    ]
                  ) ===
                  Number(
                    question.answer
                  )
                : false,

            difficulty:
              toText(
                question.difficulty,
                "medium"
              ),
          })
        ),
    };
  };


  /*
  |--------------------------------------------------------------------------
  | NEXT QUESTION
  |--------------------------------------------------------------------------
  */

  const handleNext = () => {
    if (
      selectedAnswer ===
        null ||
      selectedAnswer ===
        undefined
    ) {
      return;
    }


    const updatedAnswers = {
      ...answers,

      [currentQuestion.id]:
        selectedAnswer,
    };


    setAnswers(
      updatedAnswers
    );


    /*
     * LAST QUESTION
     */

    if (
      currentIndex ===
      questions.length - 1
    ) {
      const results =
        calculateResults(
          updatedAnswers
        );


      setShowResult(true);


      /*
       * Give the completion
       * state a short moment.
       */

      setTimeout(() => {
        onComplete(
          results
        );
      }, 700);


      return;
    }


    /*
     * NEXT QUESTION
     */

    setCurrentIndex(
      currentIndex + 1
    );

    setSelectedAnswer(
      null
    );
  };


  /*
  |--------------------------------------------------------------------------
  | BACK / PREVIOUS
  |--------------------------------------------------------------------------
  */

  const handleBack = () => {
    if (
      currentIndex > 0
    ) {
      const previousQuestion =
        questions[
          currentIndex - 1
        ];


      setCurrentIndex(
        currentIndex - 1
      );


      setSelectedAnswer(
        answers[
          previousQuestion.id
        ] ?? null
      );


      return;
    }


    onBack();
  };


  /*
  |--------------------------------------------------------------------------
  | NO QUESTIONS FALLBACK
  |--------------------------------------------------------------------------
  */

  if (
    !questions.length
  ) {
    return (
      <div className="profile-page">

        <div className="profile-container">

          <div className="profile-header">

            <button
              type="button"
              className="profile-back"
              onClick={onBack}
            >
              <ArrowLeft
                size={18}
              />

              <span>
                Back
              </span>
            </button>


            <div className="profile-brand">

              <div className="brand-mark">

                <Sparkles
                  size={18}
                />

              </div>

              <span>
                ADAPT.AI
              </span>

            </div>

          </div>


          <div
            className="profile-content"
            style={{
              maxWidth:
                "800px",
            }}
          >

            <div className="profile-icon">

              <Brain
                size={28}
              />

            </div>


            <div className="profile-eyebrow">

              DIAGNOSTIC ASSESSMENT

            </div>


            <h1>
              No diagnostic
              questions found
            </h1>


            <p
              className="profile-description"
            >
              We couldn't load
              questions for{" "}
              {subjectName}.
              Please go back and
              select the subject
              again.
            </p>


            <button
              type="button"
              className="academic-continue"
              onClick={onBack}
              style={{
                marginTop:
                  "30px",
              }}
            >

              <ArrowLeft
                size={18}
              />

              <span>
                Back to Subjects
              </span>

            </button>

          </div>

        </div>

      </div>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | MAIN DIAGNOSTIC UI
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
            onClick={
              handleBack
            }
          >

            <ArrowLeft
              size={18}
            />

            <span>

              {currentIndex ===
              0
                ? "Back"
                : "Previous"}

            </span>

          </button>


          <div className="profile-brand">

            <div className="brand-mark">

              <Sparkles
                size={18}
              />

            </div>

            <span>
              ADAPT.AI
            </span>

          </div>


          <div className="profile-step">

            <span>
              DIAGNOSTIC
            </span>


            <div className="profile-progress">

              <div
                className="profile-progress-fill"
                style={{
                  width:
                    `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* =========================================================
            DIAGNOSTIC CONTENT
        ========================================================= */}

        <div
          style={{
            width:
              "100%",

            maxWidth:
              "900px",

            margin:
              "0 auto",

            padding:
              "40px 20px 70px",
          }}
        >

          {/* TOP INFO */}

          <div
            style={{
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

              marginBottom:
                "30px",
            }}
          >

            <div>

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "10px",

                  marginBottom:
                    "8px",
                }}
              >

                <Brain
                  size={20}
                  color="#a78bfa"
                />

                <span
                  style={{
                    color:
                      "#a78bfa",

                    fontSize:
                      "13px",

                    fontWeight:
                      700,

                    letterSpacing:
                      "0.08em",
                  }}
                >
                  KNOWLEDGE DIAGNOSTIC
                </span>

              </div>


              <h1
                style={{
                  margin:
                    "0 0 8px",

                  color:
                    "#f8fafc",

                  fontSize:
                    "clamp(28px, 4vw, 42px)",

                  lineHeight:
                    1.1,
                }}
              >
                Let's map your
                knowledge.
              </h1>


              <p
                style={{
                  margin:
                    0,

                  color:
                    "#94a3b8",

                  fontSize:
                    "15px",
                }}
              >
                {subjectName}
              </p>

            </div>


            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "8px",

                padding:
                  "10px 14px",

                borderRadius:
                  "12px",

                border:
                  "1px solid rgba(148,163,184,0.15)",

                background:
                  "rgba(255,255,255,0.035)",

                color:
                  "#94a3b8",

                fontSize:
                  "13px",
              }}
            >

              <Clock3
                size={16}
              />

              <span>
                Question{" "}
                {currentIndex + 1}
                {" "}
                of{" "}
                {questions.length}
              </span>

            </div>

          </div>


          {/* PROGRESS BAR */}

          <div
            style={{
              height:
                "5px",

              width:
                "100%",

              background:
                "rgba(148,163,184,0.12)",

              borderRadius:
                "999px",

              overflow:
                "hidden",

              marginBottom:
                "30px",
            }}
          >

            <div
              style={{
                height:
                  "100%",

                width:
                  `${progress}%`,

                background:
                  "linear-gradient(90deg, #7c3aed, #06b6d4)",

                borderRadius:
                  "999px",

                transition:
                  "width 0.3s ease",
              }}
            />

          </div>


          {/* QUESTION CARD */}

          <div
            style={{
              padding:
                "30px",

              borderRadius:
                "24px",

              border:
                "1px solid rgba(148,163,184,0.16)",

              background:
                "rgba(255,255,255,0.035)",

              boxShadow:
                "0 20px 70px rgba(0,0,0,0.25)",
            }}
          >

            {/* QUESTION META */}

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "10px",

                marginBottom:
                  "20px",

                flexWrap:
                  "wrap",
              }}
            >

              <span
                style={{
                  padding:
                    "6px 10px",

                  borderRadius:
                    "8px",

                  background:
                    "rgba(124,58,237,0.12)",

                  color:
                    "#c4b5fd",

                  fontSize:
                    "12px",

                  fontWeight:
                    700,
                }}
              >
                {toText(
                  currentQuestion?.concept,
                  "General"
                )}
              </span>


              <span
                style={{
                  padding:
                    "6px 10px",

                  borderRadius:
                    "8px",

                  background:
                    "rgba(6,182,212,0.08)",

                  color:
                    "#67e8f9",

                  fontSize:
                    "12px",

                  fontWeight:
                    700,
                }}
              >
                {toText(
                  currentQuestion?.difficulty,
                  "medium"
                ).toUpperCase()}
              </span>

            </div>


            {/* QUESTION */}

            <h2
              style={{
                margin:
                  "0 0 28px",

                color:
                  "#f8fafc",

                fontSize:
                  "clamp(20px, 3vw, 28px)",

                lineHeight:
                  1.4,
              }}
            >
              {toText(
                currentQuestion?.question,
                "Question"
              )}
            </h2>


            {/* OPTIONS */}

            <div
              style={{
                display:
                  "flex",

                flexDirection:
                  "column",

                gap:
                  "12px",
              }}
            >

              {(
                Array.isArray(
                  currentQuestion?.options
                )
                  ? currentQuestion.options
                  : []
              ).map(
                (
                  option,
                  index
                ) => {

                  const optionText =
                    toText(
                      option,
                      `Option ${
                        index + 1
                      }`
                    );


                  const isSelected =
                    selectedAnswer ===
                    index;


                  return (
                    <button
                      key={`${currentQuestion.id}-${index}`}
                      type="button"

                      onClick={() =>
                        handleAnswer(
                          index
                        )
                      }

                      style={{
                        width:
                          "100%",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        gap:
                          "15px",

                        padding:
                          "17px 18px",

                        borderRadius:
                          "14px",

                        border:
                          isSelected
                            ? "1px solid rgba(167,139,250,0.85)"
                            : "1px solid rgba(148,163,184,0.15)",

                        background:
                          isSelected
                            ? "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.08))"
                            : "rgba(255,255,255,0.025)",

                        color:
                          "#e2e8f0",

                        textAlign:
                          "left",

                        cursor:
                          "pointer",

                        transition:
                          "all 0.2s ease",
                      }}
                    >

                      {/* OPTION INDICATOR */}

                      <div
                        style={{
                          width:
                            "28px",

                          height:
                            "28px",

                          minWidth:
                            "28px",

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
                              ? "rgba(124,58,237,0.25)"
                              : "transparent",
                        }}
                      >

                        {isSelected ? (
                          <CheckCircle2
                            size={17}
                            color="#a78bfa"
                          />
                        ) : (
                          <Circle
                            size={17}
                            color="#64748b"
                          />
                        )}

                      </div>


                      {/* OPTION TEXT */}

                      <span
                        style={{
                          fontSize:
                            "14px",

                          lineHeight:
                            1.5,
                        }}
                      >
                        {optionText}
                      </span>

                    </button>
                  );
                }
              )}

            </div>


            {/* FOOTER */}

            <div
              style={{
                display:
                  "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "center",

                gap:
                  "20px",

                marginTop:
                  "28px",

                paddingTop:
                  "22px",

                borderTop:
                  "1px solid rgba(148,163,184,0.1)",
              }}
            >

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "8px",

                  color:
                    "#64748b",

                  fontSize:
                    "12px",
                }}
              >

                <Target
                  size={15}
                />

                <span>
                  Your answers build
                  your learning profile.
                </span>

              </div>


              <button
                type="button"

                className="academic-continue"

                onClick={
                  handleNext
                }

                disabled={
                  selectedAnswer ===
                  null
                }

                style={{
                  opacity:
                    selectedAnswer !==
                    null
                      ? 1
                      : 0.45,

                  cursor:
                    selectedAnswer !==
                    null
                      ? "pointer"
                      : "not-allowed",
                }}
              >

                <span>
                  {currentIndex ===
                  questions.length - 1
                    ? "Finish Diagnostic"
                    : "Next Question"}
                </span>

                <ArrowRight
                  size={18}
                />

              </button>

            </div>

          </div>

        </div>

      </div>


      {/* BACKGROUND GLOWS */}

      <div className="profile-glow glow-one" />

      <div className="profile-glow glow-two" />

    </div>
  );
}


export default Diagnostic;