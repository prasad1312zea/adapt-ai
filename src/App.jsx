// src/App.jsx

import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import ProfileSetup from "./pages/ProfileSetup";
import AcademicSetup from "./pages/AcademicSetup";
import SubjectSelection from "./pages/SubjectSelection";
import Diagnostic from "./pages/Diagnostic";
import KnowledgeAnalysis from "./pages/KnowledgeAnalysis";

function App() {
  const [page, setPage] = useState("landing");

  const [selectedBranch, setSelectedBranch] =
    useState(null);

  const [selectedYear, setSelectedYear] =
    useState(null);

  const [selectedSemester, setSelectedSemester] =
    useState(null);

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [diagnosticResults, setDiagnosticResults] =
    useState(null);

  return (
    <>
      {/* LANDING */}

      {page === "landing" && (
        <LandingPage
          onGetStarted={() =>
            setPage("auth")
          }
        />
      )}

      {/* AUTH */}

      {page === "auth" && (
        <Auth
          onContinue={() =>
            setPage("profile")
          }
        />
      )}

      {/* BRANCH */}

      {page === "profile" && (
        <ProfileSetup
          onContinue={(branch) => {
            setSelectedBranch(branch);
            setPage("academic");
          }}
        />
      )}

      {/* YEAR */}

      {page === "academic" && (
        <AcademicSetup
          branch={selectedBranch}
          onBack={() =>
            setPage("profile")
          }
          onContinue={(year) => {
            setSelectedYear(year);
            setPage("subjects");
          }}
        />
      )}

      {/* SUBJECT */}

      {page === "subjects" && (
        <SubjectSelection
          branch={selectedBranch}
          year={selectedYear}
          onBack={() =>
            setPage("academic")
          }
          onContinue={(selection) => {
            setSelectedSemester(
              selection.semester
            );

            setSelectedSubject(
              selection.subject
            );

            setPage("diagnostic");
          }}
        />
      )}

      {/* DIAGNOSTIC */}

      {page === "diagnostic" && (
        <Diagnostic
          branch={selectedBranch}
          year={selectedYear}
          semester={selectedSemester}
          subject={selectedSubject}
          onBack={() =>
            setPage("subjects")
          }
          onComplete={(results) => {
            setDiagnosticResults(
              results
            );

            setPage("analysis");
          }}
        />
      )}

      {/* KNOWLEDGE ANALYSIS */}

      {page === "analysis" && (
        <KnowledgeAnalysis
          results={diagnosticResults}
          onBack={() =>
            setPage("diagnostic")
          }
          onContinue={() =>
            console.log(
              "Personalized Learning Path comes next."
            )
          }
        />
      )}
    </>
  );
}

export default App;