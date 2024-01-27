/** @Note jest에서 styled-component의 theme을 적용시키기 위한 코드 */
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { theme } from '@/globalStyle';

type WrapperProps = {
  children: JSX.Element | JSX.Element[];
};

const Wrapper = ({ children }: WrapperProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const renderWithStyledComponent = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: any
) => render(ui, { wrapper: Wrapper, ...options });

export { renderWithStyledComponent as render };
