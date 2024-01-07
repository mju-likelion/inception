import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { css, styled } from 'styled-components';
import { theme } from '@/globalStyle';
import { ActiveStatus, ViewType } from '@/types';

interface Props {
  disabled?: boolean;
  dateOptions?: {
    $isDate: boolean;
    viewType: ViewType;
    date: string;
    activeStatus: ActiveStatus;
  };
  currentFocusItem?: HTMLElement;
  handleMouseEnter?: () => void;
  handleMouseDown?: (buttonEl?: HTMLElement | null) => void;
}

export const GridItem = ({
  children,
  disabled,
  dateOptions,
  currentFocusItem,
  handleMouseEnter,
  handleMouseDown,
}: PropsWithChildren<Props>) => {
  const [color, setColor] = useState(getGridColor(dateOptions?.activeStatus));
  const isTouchEvent = useRef(false);

  // 사파리 포커스 이벤트 호환성 이슈
  const buttonRef = useRef<HTMLButtonElement>(null);

  /*
    모바일에선 touchStart - mouseDown 순서로 이벤트 발생된다.
    touchStart 발생시 mouseDown 이벤트 호출을 막기 위해 mouseDown, touchStart 함수 분리
  */
  const onMouseDown = (e: React.MouseEvent) => {
    if (isTouchEvent.current) {
      e.preventDefault();
      isTouchEvent.current = false;
      return;
    }
    handleMouseDown && handleMouseDown(buttonRef.current);
  };

  // mouseDown !== touchStart
  const onTouchStart = () => {
    isTouchEvent.current = true;
    handleMouseDown && handleMouseDown(buttonRef.current);
  };

  const onFocus = () => {
    // result 모드에선 포커스 발생 조건 및 색상이 다르다.
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

  useEffect(() => {
    // 포커스, blur 판별. safari 및 안드로이드 focus 호환성 이슈.
    currentFocusItem === buttonRef.current ? onFocus() : onBlur();
  }, [currentFocusItem]);

  return (
    <Wrapper
      ref={buttonRef}
      disabled={disabled}
      color={color}
      $isDate={dateOptions?.$isDate}
      onMouseEnter={handleMouseEnter}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
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
