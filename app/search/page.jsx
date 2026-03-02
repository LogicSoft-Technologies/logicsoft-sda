"use client";

import { Suspense } from "react";
import SearchPageInner from "./SearchPageInner";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  );
}