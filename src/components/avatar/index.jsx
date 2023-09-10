import React, { memo } from "react";

const Avatar = ({
  online = false,
  msg = 0,
  src,
  showStatus = true,
  className,
}) => {
  return (
    <div className={`avatar justify-start indicator ${className}`}>
      <div className="w-12 rounded-full border ">
        <img src={src} />
      </div>
      {msg ? (
        <span className="indicator-item badge badge-secondary badge-xs translate-y-[-2px] py-1.5">
          {msg > 99 ? "99+" : msg}
        </span>
      ) : null}
      {showStatus && (
        <span
          className={`animate-spin-slow indicator-item indicator-bottom badge ${
            online ? "badge-success" : "bg-offline"
          } badge-xs translate-x-0 translate-y-0`}
        >
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
              online ? "bg-success" : "bg-offline"
            } opacity-75`}
          ></span>
        </span>
      )}
    </div>
  );
};

export default memo(Avatar);
