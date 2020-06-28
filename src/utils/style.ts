export function textFrom<Key extends string>(
  key: Key
): (props: { [key in Key]?: string | number }) => string | undefined {
  return (props) => {
    const value = props[key];

    return typeof value === "undefined" ? undefined : String(value);
  };
}

export function scalarFrom<Key extends string>(
  key: Key
): (props: { [key in Key]?: number | string }) => string | undefined {
  return (props) => {
    const value = props[key];
    // NOTE: I lament that the following isn't enough
    // return typeof value === "number" ? value + "px" : value;
    switch (typeof value) {
      case "number":
        return value + "px";
      case "string":
        return value;
      case "undefined":
      default:
        return undefined;
    }
  };
}

export const SIZE = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const DEVICE = {
  mobileS: `(min-width: ${SIZE.mobileS}px)`,
  mobileM: `(min-width: ${SIZE.mobileM}px)`,
  mobileL: `(min-width: ${SIZE.mobileL}px)`,
  tablet: `(min-width: ${SIZE.tablet}px)`,
  laptop: `(min-width: ${SIZE.laptop}px)`,
  laptopL: `(min-width: ${SIZE.laptopL}px)`,
  desktop: `(min-width: ${SIZE.desktop}px)`,
  desktopL: `(min-width: ${SIZE.desktop}px)`,
};

// @media ${DEVICE.mobileS} { ... }
