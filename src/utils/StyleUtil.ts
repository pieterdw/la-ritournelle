export class StyleUtil {
  public static stringToStyleObject = (style: string) => {
    if (!style) {
      return null;
    }
    return style
      .split(';')
      .filter(s => s.length)
      .reduce((a, b) => {
        const keyValue = b.split(':');
        a[StyleUtil.camelize(keyValue[0])] = keyValue[1];
        return a;
      }, {});
  };

  private static camelize = string => string.replace(/-([a-z])/gi, (s, group) => group.toUpperCase());
}
