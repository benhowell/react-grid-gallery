import { ImageExtended, Image } from "./types";

const calculateCutOff = (
  len: number,
  delta: number,
  items: ImageExtended[]
) => {
  const cutoff: number[] = [];
  let cutsum = 0;
  for (var i in items) {
    const item = items[i];
    const fractOfLen = item.scaletwidth / len;
    cutoff[i] = Math.floor(fractOfLen * delta);
    cutsum += cutoff[i];
  }

  let stillToCutOff = delta - cutsum;
  while (stillToCutOff > 0) {
    for (i in cutoff) {
      cutoff[i]++;
      stillToCutOff--;
      if (stillToCutOff < 0) break;
    }
  }
  return cutoff;
};

const buildImageRow = (
  data: { items: ImageExtended[] },
  { containerWidth, margin }: { containerWidth: number; margin: number }
) => {
  const row: ImageExtended[] = [];
  let len = 0;
  const imgMargin = 2 * margin;
  while (data.items.length > 0 && len < containerWidth) {
    var item = data.items.shift() as ImageExtended;
    row.push(item);
    len += item.scaletwidth + imgMargin;
  }

  const delta = len - containerWidth;
  if (row.length > 0 && delta > 0) {
    const cutoff = calculateCutOff(len, delta, row);
    for (const i in row) {
      const pixelsToRemove = cutoff[i];
      item = row[i];
      item.marginLeft = -Math.abs(Math.floor(pixelsToRemove / 2));
      item.vwidth = item.scaletwidth - pixelsToRemove;
    }
  } else {
    for (const j in row) {
      item = row[j];
      item.marginLeft = 0;
      item.vwidth = item.scaletwidth;
    }
  }
  return row;
};

export interface RenderThumbsParams {
  containerWidth: number;
  maxRows?: number;
  rowHeight?: number;
  margin?: number;
}

const renderThumbs = (
  images: Image[],
  { containerWidth, maxRows, rowHeight, margin }: RenderThumbsParams
) => {
  rowHeight = typeof rowHeight === "undefined" ? 180 : rowHeight;
  margin = typeof margin === "undefined" ? 2 : margin;

  if (!images) return [];
  if (!containerWidth) return [];

  let items = images.slice();
  items = items.map((item) => ({
    ...item,
    scaletwidth: Math.floor(
      rowHeight * (item.thumbnailWidth / item.thumbnailHeight)
    ),
  }));
  const data = { items };

  const thumbs = [];
  const rows = [];
  while (data.items.length > 0) {
    rows.push(buildImageRow(data, { containerWidth, margin }));
  }

  for (const r in rows) {
    for (const i in rows[r]) {
      const item = { ...rows[r][i], rowIndex: parseInt(r) };
      if (maxRows) {
        if (parseInt(r) < maxRows) {
          thumbs.push(item);
        }
      } else {
        thumbs.push(item);
      }
    }
  }
  return thumbs;
};

export default renderThumbs;
