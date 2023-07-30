import { theme } from '@/globalStyle';
import { ActiveStatus, ViewType } from '@/types';
import { PropsWithChildren, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';

interface Props {
  disabled?: boolean;
  dateOptions?: {
    $isDate: boolean;
    viewType: ViewType;
    date: string;
    activeStatus: ActiveStatus;
  };
  handleMouseEnter?: () => void;
  handleMouseDown?: () => void;
}

export const GridItem = ({
  children,
  disabled,
  dateOptions,
  // handleClickDate,
  handleMouseEnter,
  handleMouseDown,
}: PropsWithChildren<Props>) => {
  const [color, setColor] = useState(getGridColor(dateOptions?.activeStatus));
  const onMouseDown = () => {
    handleMouseDown && handleMouseDown();
  };

  const onFocus = () => {
    if (dateOptions?.viewType === 'result') {
      setColor(() => {
        if (dateOptions?.activeStatus === 'active') {
          return 'mint2';
        } else if (dateOptions?.activeStatus === 'default') {
          return 'gray3';
        }
        return getGridColor(dateOptions?.activeStatus);
      });
    }
  };

  const onBlur = () => {
    setColor(getGridColor(dateOptions?.activeStatus));
  };

  useEffect(() => {
    setColor(getGridColor(dateOptions?.activeStatus));
  }, [dateOptions?.activeStatus]);

  return (
    <Wrapper
      disabled={disabled}
      $isDate={dateOptions?.$isDate}
      color={color}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={handleMouseEnter}
      onMouseDown={onMouseDown}
    >
      {children}
    </Wrapper>
  );
};

const getGridColor = (
  activeStatus: ActiveStatus = 'default'
): keyof typeof theme.colors => {
  switch (activeStatus) {
    case 'active':
      return 'mint1';
    case 'default':
      return 'gray1';
    case 'disabled':
      return 'gray4';
    default:
      return 'gray1';
  }
};

const Wrapper = styled.button<{
  $isDate?: boolean;
  color?: keyof typeof theme.colors;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    display: flex;
    align-items: center;
  }

  ${({ $isDate }) =>
    $isDate &&
    css`
      div {
        position: relative;
        width: 100%;
        height: 100%;
        align-items: start;
        p {
          ${({ theme }) => theme.typographies.body3}
          margin-top: 2px;
          margin-left: 4px;
        }
        @media ${({ theme }) => theme.size.web} {
          p {
            ${({ theme }) => theme.typographies.body1.regular}
            margin-top: 2px;
            margin-left: 4px;
          }
        }
      }
      border-top: 2px solid ${({ theme }) => theme.colors.gray1};
    `}

  ${({ color = 'gray1' }) => {
    return css`
      color: ${({ theme }) => theme.colors[color]};
      border-color: ${({ theme }) => theme.colors[color]};

      h1 {
        background-color: ${({ theme }) => theme.colors[color]};
      }
    `;
  }}
`;
