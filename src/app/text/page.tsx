"use client";

import React, { useEffect, useState, useTransition } from "react";
import { text } from "text";
import { datetimeformat } from "@/lib/datetime";
import { Dots } from "@/components/dots";

type Props = {};

const Text = (props: Props) => {
  const [textList, setTextLists] = useState<text[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/texts");
        if (!res.ok) throw new Error("failed to fetch");

        const list = await res.json();
        list.length && setTextLists(list);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div>
      <div className="space-y-4">
        {textList &&
          textList.map((text, index) => (
            <div key={`text_${text.id}_${index}`}>
              <div className="text-xs">{text.content}</div>
              <div className="text-[0.6rem] text-red-400 dark:text-red-200">
                {datetimeformat(text.createdAt)}
              </div>
            </div>
          ))}
        {isPending && <Dots />}
      </div>
    </div>
  );
};

export default Text;
