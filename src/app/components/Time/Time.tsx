import React from "react";
import { format } from "date-fns/format";

type TimeProps = {
  time: string | Date;
  children?: string;
  className?: string;
  timeFormat?: string;
};

export default function Time({ time, className, timeFormat = "d MMM yyyy", children }: TimeProps) {
  const timeObject = time instanceof Date ? time : new Date(time);

  return (
    <time
      dateTime={timeObject.toLocaleDateString()}
      className={className}
    >
      {children ? children : null}
      <span>{format(timeObject, timeFormat)}</span>
    </time>
  );
}
