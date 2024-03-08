import React from "react";
import type { CardAppearance } from "../types";
import "../style.css";

export default function CardSkeleton({
  appearance = "with-author-info",
}: {
  appearance?: CardAppearance;
}) {
  return (
    <li className="post-card">
      <div className="post-card-image-wrapper card-image-placeholder" />

      <div className="post-card-content-wrapper">
        <h3 className="card-header">Loading...</h3>
        <p className="card-subheader">Loading...</p>

        <div className="post-card-inner-content-wrapper">
          {appearance === "with-author-info" ? (
            <div className="post-card-details">
              <div className="post-card-avatar-image card-image-placeholder" />

              <div className="post-card-details-inner-wrapper">
                <span title="Author">Loading...</span>
                <span className="post-card-details-time">Loading...</span>
              </div>
            </div>
          ) : (
            <span className="post-card-details-time">Loading...</span>
          )}

          <p
            className="post-card-category-badge"
            title="Category"
          >
            Loading...
          </p>
        </div>
      </div>
    </li>
  );
}
