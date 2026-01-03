"use client";

import { datetimeformat } from "@/lib/datetime";
import React from "react";
import { text } from "text";

type Props = {
  text: text;
};

export const Text = ({ text }: Props) => {
  return (
    <div className="space-y-1">
      <div className="text-sm">{text.content}</div>
      <div className="text-[0.6rem] text-red-400 dark:text-red-200">
        {datetimeformat(text.createdAt)}
      </div>
    </div>
  );
};
