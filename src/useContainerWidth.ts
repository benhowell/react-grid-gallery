import { useRef, useCallback, useState } from "react";

export function useContainerWidth(defaultContainerWidth: number) {
  const ref = useRef<HTMLElement | null>(null);
  const observerRef = useRef<ResizeObserver>();

  const [containerWidth, setContainerWidth] = useState(defaultContainerWidth);

  const containerRef = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = undefined;

    ref.current = node;

    const updateWidth = () => {
      if (!ref.current) {
        return;
      }
      let width = ref.current.clientWidth;
      try {
        width = ref.current.getBoundingClientRect().width;
      } catch (err) {}
      setContainerWidth(Math.floor(width));
    };

    updateWidth();

    if (node && typeof ResizeObserver !== "undefined") {
      observerRef.current = new ResizeObserver(updateWidth);
      observerRef.current.observe(node);
    }
  }, []);

  return { containerRef, containerWidth };
}
