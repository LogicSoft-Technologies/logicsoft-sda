"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mascotHideout";
const EVENT_NAME = "mascot-hideout-change";

function pickRoute(routes, exclude) {
  const pool = routes.length > 1 ? routes.filter((r) => r !== exclude) : routes;
  return pool[Math.floor(Math.random() * pool.length)];
}

function readState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: state }));
}

/**
 * Shared "where is the mascot hiding" state.
 * Persists across pages/tabs via localStorage and rotates every `intervalMs`.
 */
export function useMascotHideout(routes, intervalMs = 60000) {
  const [hideoutRoute, setHideoutRoute] = useState(routes[0]);

  const ensureFresh = useCallback(() => {
    const now = Date.now();
    let state = readState();

    if (!state || !routes.includes(state.route) || now >= state.changeAt) {
      const nextRoute = pickRoute(routes, state?.route);
      state = { route: nextRoute, changeAt: now + intervalMs };
      writeState(state);
    }
    setHideoutRoute(state.route);
    return state;
  }, [routes, intervalMs]);

  const relocate = useCallback(() => {
    const now = Date.now();
    const current = readState();
    const nextRoute = pickRoute(routes, current?.route);
    const state = { route: nextRoute, changeAt: now + intervalMs };
    writeState(state);
    setHideoutRoute(state.route);
  }, [routes, intervalMs]);

  useEffect(() => {
    const state = ensureFresh();
    const msUntilChange = Math.max(state.changeAt - Date.now(), 1000);
    const timer = setTimeout(ensureFresh, msUntilChange);

    const onChange = (e) => setHideoutRoute(e.detail.route);
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) ensureFresh();
    };
    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener("storage", onStorage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [ensureFresh]);

  return { hideoutRoute, relocate };
}