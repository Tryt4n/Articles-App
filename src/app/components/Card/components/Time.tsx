import React from "react";
import { format } from "date-fns/format";

export default function Time({ time }: { time: string | Date }) {
  const postPublishedDate = time instanceof Date ? time : new Date(time);

  return (
    <time
      dateTime={postPublishedDate.toLocaleDateString()}
      className="post-card-details-time"
    >
      {format(postPublishedDate, "d MMM yyyy")}
    </time>
  );
}
