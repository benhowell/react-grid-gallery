import { useRef, useCallback, useEffect, CSSProperties } from "react";

const objectStyles: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  pointerEvents: "none",
  zIndex: -1,
  opacity: 0,
};

// based on https://stackblitz.com/edit/react-element-resize-listener?file=ElementResizeListener.tsx
export const ResizeListener = ({
  onResize,
}: {
  onResize: () => void;
}): JSX.Element => {
  const objectRef = useRef(null);
  const onResizeRef = useRef(onResize);

  onResizeRef.current = onResize;

  const _onResize = useCallback(() => {
    onResizeRef.current();
  }, []);

  const handleLoad = useCallback(() => {
    const obj = objectRef.current;
    if (obj && obj.contentDocument && obj.contentDocument.defaultView) {
      obj.contentDocument.defaultView.addEventListener("resize", _onResize);
    }
  }, []);

  useEffect(() => {
    return () => {
      const obj = objectRef.current;
      if (obj && obj.contentDocument && obj.contentDocument.defaultView) {
        obj.contentDocument.defaultView.removeEventListener(
          "resize",
          _onResize
        );
      }
    };
  }, []);

  return (
    <object
      onLoad={handleLoad}
      ref={objectRef}
      tabIndex={-1}
      type="text/html"
      data="about:blank"
      title=""
      style={objectStyles}
    />
  );
};
