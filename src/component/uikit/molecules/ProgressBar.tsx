import styled from 'styled-components';
import { Dot, Line } from '@/component/uikit';
import { Fragment } from 'react';
interface ProgressBarProps {
  total: number;
  step: number;
}

export const ProgressBar = ({ total, step }: ProgressBarProps) => {
  const onProgressRender = () => {
    const result = [];
    for (let i = 1; i < total; i++) {
      result.push(
        <Fragment key={i}>
          <Line $isActive={step > i} />
          <Dot $isActive={step > i} />
        </Fragment>
      );
    }

    return result;
  };

  return (
    <Container>
      <Dot $isActive={true} />
      {onProgressRender()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 250px;
  height: 28px;
  gap: 2px;
`;
