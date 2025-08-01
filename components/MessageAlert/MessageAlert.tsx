import { MessageAlertProps } from "@/app/common/types/types";
import React from "react";

const MessageAlert: React.FC<MessageAlertProps> = ({ message }) => {
  if (!message.text) return null;

  return (
    <div
      className={`border-l-4 p-4 ${
        message.type === "success"
          ? "border-green-500 bg-green-50 text-green-800"
          : "border-red-500 bg-red-50 text-red-800"
      }`}
    >
      <div className="flex items-center">
        {message.type === "success" ? (
          <svg
            className="h-4 w-4 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        )}
        <span className="font-medium">{message.text}</span>
      </div>
    </div>
  );
};

export default MessageAlert;
