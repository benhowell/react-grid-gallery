import PropTypes from "prop-types";
import React, { useRef, useCallback, useEffect } from "react";

const objectStyles = {
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
const ResizeListener = ({ onResize }) => {
  const objectRef = useRef(null);
  const onResizeRef = useRef(onResize);

  onResizeRef.current = onResize;

  const _onResize = useCallback((e) => {
    onResizeRef.current(e);
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

ResizeListener.propTypes = {
  onResize: PropTypes.func,
};

export default ResizeListener;
