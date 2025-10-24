"use client";

import React, { useEffect, useState, useTransition } from "react";
import { text } from "text";
import { Text } from "@/components/text";
import { Dots } from "@/components/dots";

type Props = {};

const Texts = (props: Props) => {
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
            <Text key={`text_${text.id}_${index}`} text={text} />
          ))}
        {isPending && <Dots />}
      </div>
    </div>
  );
};

export default Texts;
