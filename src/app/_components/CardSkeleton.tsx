import React from "react";

export default function CardSkeleton() {
  return (
    <li className="card-container">
      <div className="card-image-wrapper card-image-placeholder" />

      <div className="card-content-wrapper">
        <h2 className="card-header">Loading...</h2>
        <p className="card-subheader">Loading...</p>

        <div className="card-content-inner-wrapper">
          <div className="card-details">
            <div className="card-avatar-image card-image-placeholder " />
            <div className="card-details-inner">
              <span
                title="Author"
                itemProp="author"
              >
                Loading...
              </span>
              <span className="card-details-time">Loading...</span>
            </div>
          </div>

          <p
            title="Category"
            className="card-category-badge"
          >
            Loading...
          </p>
        </div>
      </div>
    </li>
  );
}
