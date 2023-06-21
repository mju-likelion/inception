import { theme } from '@/globalStyle';
import { css, styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
  isDate?: boolean;
  dateColor?: keyof typeof theme.colors;
}

export const GridItem = ({ children, isDate, dateColor }: Props) => {
  return (
    <Wrapper isDate={isDate} dateColor={dateColor}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  isDate?: boolean;
  dateColor?: keyof typeof theme.colors;
}>`
  /* border: 1px solid black; */

  display: flex;
  align-items: center;
  justify-content: center;
  p {
    display: flex;
    align-items: center;
  }

  ${({ isDate }) =>
    isDate &&
    css`
      div {
        width: 40px;
        height: 40px;
        align-items: start;

        p {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          margin-left: 4px;
          /* background-color: red; */
        }
      }
      border-top: 2px solid ${({ theme }) => theme.colors.gray1};
    `}

  ${({ dateColor = 'gray1' }) => {
    return css`
      color: ${({ theme }) => theme.colors[dateColor]};
      border-color: ${({ theme }) => theme.colors[dateColor]};
    `;
  }}
`;
