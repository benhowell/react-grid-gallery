import { CSSProperties } from "react";
import {
  ImageExtended,
  StyleFunction,
  StyleFunctionContext,
  StyleProp,
} from "./types";

export const getStyle = (
  styleProp: StyleProp | undefined,
  fallback: StyleFunction,
  context: StyleFunctionContext
): CSSProperties => {
  if (typeof styleProp === "function") {
    return styleProp(context);
  }
  if (typeof styleProp === "object") {
    return styleProp;
  }
  return fallback(context);
};

const rotationTransformMap: Record<number, string> = {
  3: "rotate(180deg)",
  2: "rotateY(180deg)",
  4: "rotate(180deg) rotateY(180deg)",
  5: "rotate(270deg) rotateY(180deg)",
  6: "rotate(90deg)",
  7: "rotate(90deg) rotateY(180deg)",
  8: "rotate(270deg)",
};

const SELECTION_MARGIN = 16;

export const gallery: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
};

export const thumbnail = ({ item }: { item: ImageExtended }): CSSProperties => {
  const rotationTransformValue = rotationTransformMap[item.orientation];

  const style = {
    cursor: "pointer",
    maxWidth: "none",
    width: item.scaledWidth,
    height: item.scaledHeight,
    marginLeft: item.marginLeft,
    marginTop: 0,
    transform: rotationTransformValue,
  };

  if (item.isSelected) {
    const ratio = item.scaledWidth / item.scaledHeight;
    const viewportHeight = item.scaledHeight - SELECTION_MARGIN * 2;
    const viewportWidth = item.viewportWidth - SELECTION_MARGIN * 2;

    let height, width;
    if (item.scaledWidth > item.scaledHeight) {
      width = item.scaledWidth - SELECTION_MARGIN * 2;
      height = Math.floor(width / ratio);
    } else {
      height = item.scaledHeight - SELECTION_MARGIN * 2;
      width = Math.floor(height * ratio);
    }

    const marginTop = Math.abs(Math.floor((viewportHeight - height) / 2));
    const marginLeft = Math.abs(Math.floor((viewportWidth - width) / 2));

    style.width = width;
    style.height = height;
    style.marginLeft = marginLeft === 0 ? 0 : -marginLeft;
    style.marginTop = marginTop === 0 ? 0 : -marginTop;
  }

  return style;
};

export const tileViewport = ({
  item,
}: {
  item: ImageExtended;
}): CSSProperties => {
  const styles: CSSProperties = {
    width: item.viewportWidth,
    height: item.scaledHeight,
    overflow: "hidden",
  };
  if (item.nano) {
    styles.background = `url(${item.nano})`;
    styles.backgroundSize = "cover";
    styles.backgroundPosition = "center center";
  }
  if (item.isSelected) {
    styles.width = item.viewportWidth - SELECTION_MARGIN * 2;
    styles.height = item.scaledHeight - SELECTION_MARGIN * 2;
    styles.margin = SELECTION_MARGIN;
  }
  return styles;
};

export const customOverlay = ({
  hover,
}: {
  hover: boolean;
}): CSSProperties => ({
  pointerEvents: "none",
  opacity: hover ? 1 : 0,
  position: "absolute",
  height: "100%",
  width: "100%",
});

export const galleryItem = ({ margin }: { margin: number }): CSSProperties => ({
  margin,
  WebkitUserSelect: "none",
  position: "relative",
  background: "#eee",
  padding: "0px",
});

export const tileOverlay = ({
  showOverlay,
}: {
  showOverlay: boolean;
}): CSSProperties => ({
  pointerEvents: "none",
  opacity: 1,
  position: "absolute",
  height: "100%",
  width: "100%",
  background: showOverlay
    ? "linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent)"
    : "none",
});

export const tileIconBar: CSSProperties = {
  pointerEvents: "none",
  opacity: 1,
  position: "absolute",
  height: "36px",
  width: "100%",
};

export const tileDescription: CSSProperties = {
  background: "white",
  width: "100%",
  margin: 0,
  userSelect: "text",
  WebkitUserSelect: "text",
  MozUserSelect: "text",
  overflow: "hidden",
};

export const bottomBar: CSSProperties = {
  padding: "2px",
  pointerEvents: "none",
  position: "absolute",
  minHeight: "0px",
  maxHeight: "160px",
  width: "100%",
  bottom: "0px",
  overflow: "hidden",
};

export const tagItemBlock: CSSProperties = {
  display: "inline-block",
  cursor: "pointer",
  pointerEvents: "visible",
  margin: "2px",
};

export const tagItem = (): CSSProperties => ({
  display: "inline",
  padding: ".2em .6em .3em",
  fontSize: "75%",
  fontWeight: "600",
  lineHeight: "1",
  color: "yellow",
  background: "rgba(0,0,0,0.65)",
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "baseline",
  borderRadius: ".25em",
});

export const checkButton = ({
  isVisible,
}: {
  isVisible: boolean;
}): CSSProperties => ({
  visibility: isVisible ? "visible" : "hidden",
  background: "none",
  float: "left",
  width: 36,
  height: 36,
  border: "none",
  padding: 6,
  cursor: "pointer",
  pointerEvents: "visible",
});
