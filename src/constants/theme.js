const colors = {
  primary: '#214177',
  secondary: '#3667A6',
  tertiary: '#BDD8F1',
  white: '#FFFFFF',
  gray: '#7B7B7B',
  black: '#202429',
  danger: '#D43838',
};

const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 18,
  padding: 25,

  // font sizes
  h1: 42,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
};

const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  h3: {
    fontSize: sizes.h3,
  },
  header: {
    fontSize: sizes.header,
  },
  title: {
    fontSize: sizes.title,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
};

const lightColors = {
  background: colors.white,
  primary: colors.primary,
  text: colors.black,
};

const darkColors = {
  background: colors.black,
  primary: colors.primary,
  text: colors.white,
};

export { colors, sizes, fonts, lightColors, darkColors };
