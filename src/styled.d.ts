import 'styled-components';
import { Colors, Size, TypoGraphies } from './globalStyle';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    size: Size;
    typographies: TypoGraphies;
  }
}
