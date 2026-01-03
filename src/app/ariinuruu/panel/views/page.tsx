"use client";

import { datetimeformat } from "@/lib/datetime";
import { pageview } from "pageview";
import React, { useEffect, useState } from "react";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const Views = () => {
  const [views, setViews] = useState<pageview[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchViews = async (page: number = 1) => {
    const result = await fetch(`/api/views?page=${page}&limit=50`);
    const data = await result.json();
    setViews(data.data);
    setPagination(data.pagination);
  };

  useEffect(() => {
    fetchViews(currentPage);
  }, [currentPage]);

  console.log("views::: ", views);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm">
          total: {pagination.total} | page: {pagination.page}/
          {pagination.totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs rounded-sm outline-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(pagination.totalPages, prev + 1),
              )
            }
            disabled={currentPage === pagination.totalPages}
            className="px-3 py-1 text-xs rounded-sm outline-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            next
          </button>
        </div>
      </div>
      {views.map((view, index) => (
        <div key={`view_${view.id}_${index}`} className="text-xs py-3">
          <div>#{view.id}</div>
          <div>{view.path}</div>
          <div>{view.userAgent}</div>
          <div>{view.ip}</div>
          <div>{datetimeformat(view.createdAt)}</div>
        </div>
      ))}
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs rounded-sm outline-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            previous
          </button>
          <span className="px-3 py-1 text-xs">
            {currentPage} / {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(pagination.totalPages, prev + 1),
              )
            }
            disabled={currentPage === pagination.totalPages}
            className="px-3 py-1 text-xs rounded-sm outline-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            next
          </button>
        </div>
      )}
    </div>
  );
};

export default Views;
