import React, { memo } from "react";
import Avatar from "../avatar";

const ContactOverview = ({
  onClick,
  src,
  msg,
  name,
  time,
  online,
  subtitle,
  isSelect = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full flex px-4 py-2 space-x-2 cursor-pointer hover:bg-grey-hover overflow-hidden items-center transition-all ${
        isSelect && " bg-grey-select"
      }`}
    >
      <Avatar src={src} online={online} msg={msg} />
      <div className="flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <p className="max-w-[150px] text-ellipsis text-sm font-medium whitespace-nowrap overflow-hidden ... ">
            {name}
          </p>
          {time ? <span className="text-xs text-grey-text">1 hour</span> : null}
        </div>

        <div className="w-[180px]">
          <p className="text-ellipsis text-xs whitespace-nowrap overflow-hidden ... text-grey-text">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactOverview;
