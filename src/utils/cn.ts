export const cn = (...values: Array<string | undefined>) => {
  if (!values || values.length === 0) {
    return '';
  }
  return values.filter(x => !!x).join(' ');
};
