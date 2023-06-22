import styled from 'styled-components';
import { Dot, Line } from '@/component/@share/atom';
import { Fragment } from 'react';
interface ProgressBarProps {
  total: number;
  step: number;
}

export const ProgressBar = ({ total, step }: ProgressBarProps) => {
  const render = () => {
    const result = [];
    for (let i = 1; i < total; i++) {
      result.push(
        <Fragment key={i}>
          <Line isActice={step > i} />
          <Dot isActice={step > i} />
        </Fragment>
      );
    }

    return result;
  };

  return (
    <Container>
      <Dot isActice={true} />
      {render()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
`;
