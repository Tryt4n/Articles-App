import React from "react";
import "./loading.css";

export default function LoadingSpinner() {
  return (
    <div role="presentation">
      <span className="visually-hidden">Loading</span>
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
