import {
  ImageExtended,
  Image,
  BuildLayoutOptions,
  ImageExtendedRow,
} from "./types";

const calculateCutOff = (
  items: ImageExtended[],
  totalRowWidth: number,
  protrudingWidth: number
) => {
  const cutOff: number[] = [];
  let cutSum = 0;
  for (let i in items) {
    const item = items[i];
    const fractionOfWidth = item.scaledWidth / totalRowWidth;
    cutOff[i] = Math.floor(fractionOfWidth * protrudingWidth);
    cutSum += cutOff[i];
  }

  let stillToCutOff = protrudingWidth - cutSum;
  while (stillToCutOff > 0) {
    for (let i in cutOff) {
      cutOff[i]++;
      stillToCutOff--;
      if (stillToCutOff < 0) break;
    }
  }
  return cutOff;
};

const getRow = (
  images: Image[],
  { containerWidth, rowHeight, margin }: BuildLayoutOptions
): [ImageExtendedRow, Image[]] => {
  const row: ImageExtendedRow = [];
  const imgMargin = 2 * margin;
  const items = [...images];

  let totalRowWidth = 0;
  while (items.length > 0 && totalRowWidth < containerWidth) {
    const item = items.shift();
    const scaledWidth = Math.floor(
      rowHeight * (item.thumbnailWidth / item.thumbnailHeight)
    );
    const extendedItem: ImageExtended = {
      ...item,
      scaledHeight: rowHeight,
      scaledWidth,
      viewportWidth: scaledWidth,
      marginLeft: 0,
    };
    row.push(extendedItem);
    totalRowWidth += extendedItem.scaledWidth + imgMargin;
  }

  const protrudingWidth = totalRowWidth - containerWidth;
  if (row.length > 0 && protrudingWidth > 0) {
    const cutoff = calculateCutOff(row, totalRowWidth, protrudingWidth);
    for (const i in row) {
      const pixelsToRemove = cutoff[i];
      const item = row[i];
      item.marginLeft = -Math.abs(Math.floor(pixelsToRemove / 2));
      item.viewportWidth = item.scaledWidth - pixelsToRemove;
    }
  }

  return [row, items];
};

const getRows = (
  images: Image[],
  options: BuildLayoutOptions,
  rows: ImageExtendedRow[] = []
): ImageExtendedRow[] => {
  const [row, imagesLeft] = getRow(images, options);
  const nextRows = [...rows, row];

  if (options.maxRows && nextRows.length >= options.maxRows) {
    return nextRows;
  }
  if (imagesLeft.length) {
    return getRows(imagesLeft, options, nextRows);
  }
  return nextRows;
};

export const buildLayout = (
  images: Image[],
  { containerWidth, maxRows, rowHeight, margin }: BuildLayoutOptions
): ImageExtendedRow[] => {
  rowHeight = typeof rowHeight === "undefined" ? 180 : rowHeight;
  margin = typeof margin === "undefined" ? 2 : margin;

  if (!images) return [];
  if (!containerWidth) return [];

  const options = { containerWidth, maxRows, rowHeight, margin };
  return getRows(images, options);
};

export const buildLayoutFlat = (
  images: Image[],
  options: BuildLayoutOptions
): ImageExtendedRow => {
  const rows = buildLayout(images, options);
  return [].concat.apply([], rows);
};
