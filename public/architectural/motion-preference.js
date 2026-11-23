try {
  document.documentElement.dataset.motionPaused = String(
    sessionStorage.getItem("wiele-motion-paused") === "true",
  );
} catch {
  // The default presentation remains static when storage is unavailable.
}
