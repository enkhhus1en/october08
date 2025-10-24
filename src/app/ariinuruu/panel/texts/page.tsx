"use client";

import React, { useEffect, useState, useTransition } from "react";
import { datetimeformat } from "@/lib/datetime";
import { text } from "text";
import { Text } from "@/components/text";

const TextAdmin = () => {
  const [text, setText] = useState<string>();
  const [textList, setTextList] = useState<text[]>([]);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const res = await fetch("/api/texts");
      if (!res.ok) throw new Error("failed to fetch");

      const list = await res.json();
      list.length && setTextList(list);
    } catch (error) {
      console.log("error occurred while fetching texts: ", error);
    }
  };

  const postText = async () => {
    if (!text) return;

    setStatus("idle");

    startTransition(async () => {
      try {
        const res = await fetch("/api/texts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text.trim() }),
        });

        if (!res.ok) throw new Error("failed");

        setStatus("success");
        setText("");
        fetchTexts();
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    });
  };

  const deleteText = async (id: number) => {
    setStatus("idle");

    startTransition(async () => {
      try {
        const res = await fetch(`/api/texts?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("failed");

        setStatus("success");
        fetchTexts();
      } catch (error) {
        console.log("error");
        setStatus("error");
      }
    });
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <h2 className="text-base/7 font-semibold">texts</h2>
          <div className="mt-2">
            <textarea
              id="content"
              name="content"
              rows={3}
              value={text}
              onChange={(event) => setText(event.currentTarget.value)}
              className="block w-full rounded-md dark:bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
          <div className="flex justify-end items-center mt-4">
            <button
              disabled={isPending}
              onClick={postText}
              className="px-3 outline-1 rounded-sm"
            >
              post
            </button>
          </div>
          {status === "success" && (
            <p className="text-green-500 mt-2 text-right">success!</p>
          )}
          {status === "error" && (
            <p className="text-red-500 mt-2 text-right">error!</p>
          )}
        </div>
        <div className="space-y-2">
          {textList &&
            textList.map((text, index) => (
              <div key={`text_${text.id}_${index}`}>
                <Text text={text} />
                <button
                  className="underline text-red-500 text-xs"
                  onClick={() => {
                    if (confirm("wanna delete this shit?")) {
                      text.id && deleteText(Number(text.id));
                    }
                  }}
                >
                  delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TextAdmin;
