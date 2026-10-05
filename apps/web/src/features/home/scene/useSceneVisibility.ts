import { useEffect, useRef, useState } from "react";
export function useSceneVisibility() {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false),
    [visited, setVisited] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setVisited(true);
      },
      { rootMargin: "150px" },
    );
    observer.observe(element);
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return { host, visited, running: visible && tabVisible };
}
