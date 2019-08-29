import {
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
const { height, width } = Dimensions.get('window');


export default {
  container: {
    flex: 1,
  } as StyleProp<ViewStyle>,
  heightRatio: (ratio = 1) => height * ratio,
  widthRatio: (ratio = 1) => width * ratio,
  spaceBetween: {
    justifyContent: 'space-between',
  } as StyleProp<ViewStyle>,
  spaceAround: {
    justifyContent: 'space-around',
  } as StyleProp<ViewStyle>,
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  } as StyleProp<ViewStyle>,
  alignStartCenter: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  } as StyleProp<ViewStyle>,
  alignEndCenter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  } as StyleProp<ViewStyle>,
  alignCenterStart: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  } as StyleProp<ViewStyle>,
  alignCenterEnd: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  } as StyleProp<ViewStyle>,
  alignStartStart: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  } as StyleProp<ViewStyle>,
  row: {
    flexDirection: 'row',
  } as StyleProp<ViewStyle>,
  column: {
    flexDirection: 'column',
  } as StyleProp<ViewStyle>,
  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
  } as StyleProp<ViewStyle>,
  absoluteTop: {
    position: 'absolute',
    top: 0,
  } as StyleProp<ViewStyle>,
}
