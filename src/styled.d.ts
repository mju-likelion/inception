import 'styled-components';
import { Colors, Size } from './globalStyle';

declare module 'styled-components' {
  export interface DefaultTheme extends typeof theme {}
}
