import {
  ImageExtended,
  Image,
  BuildLayoutOptions,
  ImageExtendedRow,
} from "./types";

const calculateCutOff = <T extends ImageExtended = ImageExtended>(
  items: T[],
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

const getRow = <T extends Image = Image>(
  images: T[],
  { containerWidth, rowHeight, margin }: BuildLayoutOptions
): [ImageExtendedRow<T>, T[]] => {
  const row: ImageExtendedRow<T> = [];
  const imgMargin = 2 * margin;
  const items = [...images];

  let totalRowWidth = 0;
  while (items.length > 0 && totalRowWidth < containerWidth) {
    const item = items.shift();
    const scaledWidth = Math.floor(rowHeight * (item.width / item.height));
    const extendedItem: ImageExtended<T> = {
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

const getRows = <T extends Image = Image>(
  images: T[],
  options: BuildLayoutOptions,
  rows: ImageExtendedRow<T>[] = []
): ImageExtendedRow<T>[] => {
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

export const buildLayout = <T extends Image = Image>(
  images: T[],
  { containerWidth, maxRows, rowHeight, margin }: BuildLayoutOptions
): ImageExtendedRow<T>[] => {
  rowHeight = typeof rowHeight === "undefined" ? 180 : rowHeight;
  margin = typeof margin === "undefined" ? 2 : margin;

  if (!images) return [];
  if (!containerWidth) return [];

  const options = { containerWidth, maxRows, rowHeight, margin };
  return getRows(images, options);
};

export const buildLayoutFlat = <T extends Image = Image>(
  images: T[],
  options: BuildLayoutOptions
): ImageExtendedRow<T> => {
  const rows = buildLayout(images, options);
  return [].concat.apply([], rows);
};
