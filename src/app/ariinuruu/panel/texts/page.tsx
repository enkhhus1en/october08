"use client";

import React, { useState } from "react";

const TextAdmin = () => {
  const [text, setText] = useState<string>();

  const postText = async () => {
    if (text) {
      const result = await fetch("/api/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
        }),
      });
    }
  };

  return (
    <div>
      <form>
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default TextAdmin;
