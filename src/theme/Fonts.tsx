import { Platform, StyleProp, TextStyle  } from 'react-native'

const FontWeights: {
  [index: string]: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
} = {
  THIN: '100',
  HAIRLINE: '100',

  EXTRA_LIGHT: '200',
  ULTRA_LIGHT: '200',

  LIGHT: '300',

  NORMAL: '400',
  REGULAR: '400',

  MEDIUM: '500',

  SEMI_BOLD: '600',
  DEMI_BOLD: '600',

  BOLD: '700',

  EXTRA_BOLD: '800',
  ULTRA_BOLD: '800',

  BLACK: '900',
  HEAVY: '900'
}

export const NunitoSansLight: StyleProp<TextStyle> = {
  fontFamily: 'NunitoSans-Light',
  fontWeight: FontWeights.LIGHT
}

export const NunitoSans: StyleProp<TextStyle> = {
  fontFamily: 'NunitoSans-Regular',
  fontWeight: FontWeights.REGULAR
}

export const NunitoSansBold: StyleProp<TextStyle> = {
  fontFamily: 'NunitoSans-Bold',
  fontWeight: Platform.OS === 'ios' ? FontWeights.BOLD : FontWeights.REGULAR
}

export const NunitoSansSemiBold: StyleProp<TextStyle> = {
  fontFamily: 'NunitoSans-SemiBold',
  fontWeight: Platform.OS === 'ios' ? FontWeights.SEMI_BOLD : FontWeights.REGULAR
}

export const OpenSansLight: StyleProp<TextStyle> = {
  fontFamily: 'OpenSans-Light',
  fontWeight: FontWeights.LIGHT
}

export const OpenSansSemiBold: StyleProp<TextStyle> = {
  fontFamily: 'OpenSans-SemiBold',
  fontWeight: Platform.OS === 'ios' ? FontWeights.SEMI_BOLD : FontWeights.REGULAR
}

export const OpenSansBold: StyleProp<TextStyle> = {
  fontFamily: 'OpenSans-Bold',
  fontWeight: Platform.OS === 'ios' ? FontWeights.BOLD : FontWeights.REGULAR
}

const Fonts = {
  NunitoSansLight,
  NunitoSans,
  NunitoSansBold,
  NunitoSansSemiBold,
  OpenSansLight,
  OpenSansBold,
  OpenSansSemiBold,
}

export default Fonts
