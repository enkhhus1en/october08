"use client";

import { datetimeformat } from "@/lib/datetime";
import { pageview } from "pageview";
import React, { useEffect, useState } from "react";

const Views = () => {
  const [views, setViews] = useState<pageview[]>([]);

  useEffect(() => {
    const fetchViews = async () => {
      const result = await fetch("/api/views");
      const data = await result.json();
      setViews(data);
    };

    fetchViews();
  }, []);

  console.log("views::: ", views);

  return (
    <div>
      {views.map((view, index) => (
        <div key={`view_${view.id}_${index}`} className="text-xs py-3">
          <div>#{view.id}</div>
          <div>{view.path}</div>
          <div>{view.userAgent}</div>
          <div>{view.ip}</div>
          <div>{datetimeformat(view.createdAt)}</div>
        </div>
      ))}
    </div>
  );
};

export default Views;
