function ErrorFallback({ error, resetErrorBoundary, title = "Something went wrong" }) {
  return (
    <div
      className="error-boundary-card"
      style={{
        padding: "2.5rem 1.5rem",
        margin: "2rem auto",
        maxWidth: "540px",
        textAlign: "center",
        borderRadius: "var(--radius-lg, 16px)",
        backgroundColor: "var(--bg-card, #ffffff)",
        border: "1px solid var(--border-color, #e2e8f0)",
        boxShadow: "var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "var(--color-red-light, #fef2f2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.25rem",
          color: "var(--color-red, #ef4444)",
          fontSize: "1.5rem",
        }}
      >
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "var(--text-main, #0f172a)",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "var(--text-muted, #475569)",
          fontSize: "0.95rem",
          lineHeight: "1.5",
          marginBottom: "1.5rem",
        }}
      >
        {error?.message || "An unexpected error occurred in this section."}
      </p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="btn-hero-primary"
        style={{
          padding: "0.65rem 1.5rem",
          fontSize: "0.92rem",
          borderRadius: "var(--radius-md, 10px)",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <i className="fa-solid fa-rotate-right"></i> Try Again
      </button>
    </div>
  );
}

export default ErrorFallback;
