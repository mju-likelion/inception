import { theme } from '@/globalStyle';
import { css, styled } from 'styled-components';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  dateOptions?: {
    $isDate: boolean;
    dateColor: keyof typeof theme.colors;
    date: string;
  };
  handleClickDate?: (date?: string) => void;
}

export const GridItem = ({
  children,
  disabled,
  dateOptions,
  handleClickDate,
}: Props) => {
  const onClick = () => {
    handleClickDate?.(dateOptions?.date);
  };

  return (
    <Wrapper
      disabled={disabled}
      $isDate={dateOptions?.$isDate}
      color={dateOptions?.dateColor}
      onClick={onClick}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button<{
  $isDate?: boolean;
  color?: keyof typeof theme.colors;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => disabled && 'default'};

  p {
    display: flex;
    align-items: center;
  }

  ${({ $isDate }) =>
    $isDate &&
    css`
      div {
        position: relative;
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

  ${({ color = 'gray1' }) => {
    return css`
      color: ${({ theme }) => theme.colors[color]};
      border-color: ${({ theme }) => theme.colors[color]};
    `;
  }}
`;
