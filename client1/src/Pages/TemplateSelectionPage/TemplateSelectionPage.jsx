import React, { useMemo, useState } from "react";
import { BookOpen, Eye, Plus, Check, X, ArrowBigLeft, ArrowLeft } from "lucide-react";
import PreDefinedQuestions from "../../CustomData/QuestionsData/PreDefinedQuestions";
import "./TemplateSelectionPage.css";

/**
 * Page version of Template Selection (no modal)
 *
 * Props:
 * - onBack?: Function                     // go back to parent view
 * - onPreview?: (template) => void        // open SubcategoryPage in the same route
 * - onSelectQuestions?: (questions) => void  // apply selected questions to parent (e.g., Step2)
 * - selectedQuestions?: array             // (controlled) selected questions list
 * - setSelectedQuestions?: (fn|array) => void  // (controlled) setter
 * - initialSelected?: array               // (uncontrolled) prefill if not using controlled props
 */
const TemplateSelectionPage = ({
  onBack,
  onPreview,
  onSelectQuestions,
  selectedQuestions: controlledSelected,
  setSelectedQuestions: controlledSetSelected,
  initialSelected = [],
}) => {
  const templates = PreDefinedQuestions();

  // Controlled/uncontrolled handling
  // Controlled/uncontrolled handling
  const isControlled = Array.isArray(controlledSelected) && typeof controlledSetSelected === "function";

  // Ensure safe initial state
  const [internalSelected, setInternalSelected] = useState(
    Array.isArray(initialSelected) ? initialSelected : []
  );

  // Always ensure selectedQuestions is an array
  const selectedQuestions = Array.isArray(
    isControlled ? controlledSelected : internalSelected
  )
    ? (isControlled ? controlledSelected : internalSelected)
    : [];

  // Ensure setter
  const setSelectedQuestions = isControlled
    ? controlledSetSelected
    : setInternalSelected;


  // Toggle single question selection
  const toggleQuestionSelection = (question) => {
    setSelectedQuestions((prev) => {
      const list = typeof prev === "function" ? prev : prev ?? [];
      const exists = list.some((q) => q.id === question.id);
      return exists ? list.filter((q) => q.id !== question.id) : [...list, question];
    });
  };

  // Select/Deselect all questions in a category (template)
  const handleSelectAllInCategory = (categoryQuestions) => {
    const allSelected = categoryQuestions.every((q) =>
      selectedQuestions.some((sq) => sq.id === q.id)
    );

    setSelectedQuestions((prev) => {
      const base = typeof prev === "function" ? prev : prev ?? [];
      if (allSelected) {
        return base.filter((q) => !categoryQuestions.some((cq) => cq.id === q.id));
      } else {
        const newOnes = categoryQuestions.filter((q) => !base.some((sq) => sq.id === q.id));
        return [...base, ...newOnes];
      }
    });
  };

  const totalSelected = selectedQuestions.length;

  // Build breakdown by template
  const breakdown = useMemo(() => {
    return templates
      .map((t) => {
        const count = selectedQuestions.filter((q) => t.questions.some((tq) => tq.id === q.id)).length;
        return count > 0 ? { key: t.category, title: t.title, count } : null;
      })
      .filter(Boolean);
  }, [templates, selectedQuestions]);

  const handleApply = () => {
    if (typeof onSelectQuestions === "function") {
      onSelectQuestions(selectedQuestions);
    }
  };

  return (
    <div className="tpl-container">
      {/* Header */}
      <header className="tpl-header">
        <div className="tpl-header-left">
          <div className="tpl-header-icon">
            <BookOpen size={22} />
          </div>
          <div className="tpl-header-text">
            <h1>Our ready Templates</h1>
            <p>Choose from professionally curated Templates</p>
          </div>
        </div>

        <div className="tpl-header-actions">
          {typeof onBack === "function" && (
            <button className="tpl-btn ghost" onClick={onBack} aria-label="Back">
              <ArrowLeft size={16} />
              Back
            </button>
          )}
          <button
            className="tpl-btn primary"
            onClick={handleApply}
            disabled={totalSelected === 0}
          >
            Add Selected ({totalSelected})
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="tpl-content">
        <div className="tpl-templates-grid">
          {templates.map((template) => {
            // Only questions belonging to this template
            const templateQuestionIds = template.questions.map(q => q.id);

            // Count selected for this template only
            const selectedCount = selectedQuestions.filter(q =>
              templateQuestionIds.includes(q.id)
            ).length;

            const allSelected = selectedCount === template.questions.length && template.questions.length > 0;
            const someSelected = selectedCount > 0 && selectedCount < template.questions.length;

            const pct = template.questions.length > 0 ? (selectedCount / template.questions.length) * 100 : 0;

            return (
              <div key={template.category} className="tpl-card">
                <div className="tpl-card-head">
                  <div className="tpl-card-icon">{template.icon}</div>
                  <span className="tpl-card-badge">
                    {template.questions.length} questions
                  </span>
                </div>

                <div className="tpl-card-body">
                  <h3 className="tpl-card-title">{template.title}</h3>
                  <p className="tpl-card-desc">{template.description}</p>
                </div>

                <div className="tpl-card-actions">
                  <button
                    className="tpl-btn outline"
                    onClick={() => onPreview && onPreview(template)}
                  >
                    <Eye size={16} />
                    Preview
                  </button>

                  <button
                    className={`tpl-btn ${allSelected ? "danger" : "primary"} ${someSelected && !allSelected ? "partial" : ""
                      }`}
                    onClick={() => handleSelectAllInCategory(template.questions)}
                  >
                    {allSelected ? (
                      <>
                        <X size={16} />
                        Remove All
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        {someSelected ? "Select Remaining" : "Select All"}
                      </>
                    )}
                  </button>
                </div>

                {someSelected && (
                  <div className="tpl-selection-indicator">
                    <div className="tpl-selection-bar" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer (sticky summary) */}
      <footer className="tpl-footer">
        <div className="tpl-selection-summary">
          <div className="tpl-selection-count">
            <Check size={16} />
            {totalSelected} selected
          </div>

          {breakdown.length > 0 && (
            <div className="tpl-selection-breakdown">
              {breakdown.map((b) => (
                <span key={b.key} className="tpl-breakdown-item">
                  {b.title}: {b.count}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="tpl-footer-actions">
          {typeof onBack === "function" && (
            <button className="tpl-btn ghost" onClick={onBack}>
              <ArrowLeft size={16} />
            </button>
          )}
          <button
            className="tpl-btn primary"
            onClick={handleApply}
            disabled={totalSelected === 0}
          >
            Add Selected ({totalSelected})
          </button>
        </div>
      </footer>
    </div>
  );
};

export default TemplateSelectionPage;
