import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import "./Toast.css";

function Toast() {
  const { toast } = useContext(ProductContext);

  if (!toast) return null;

  const getIcon = () => {
    if (toast.type === "favorite") return "fa-solid fa-heart";
    if (toast.type === "info") return "fa-solid fa-circle-info";
    return "fa-solid fa-circle-check";
  };

  return (
    <div className="toast-container" role="status" aria-live="polite" aria-atomic="true">
      <div className={`toast-message ${toast.type || "success"}`}>
        <i className={`${getIcon()} toast-icon`} aria-hidden="true"></i>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

export default Toast;
