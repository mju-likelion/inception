import { Fragment } from 'react';
import { styled } from 'styled-components';
import { Dot, Line } from '@/component/@uikit';
interface ProgressBarProps {
  total: number;
  step: number;
}

export const ProgressBar = ({ total, step }: ProgressBarProps) => {
  const progressStep = Array.from({ length: total }, (_, index) => (
    <Fragment key={index}>
      <Line isActive={step > index} />
      <Dot isActive={step > index} />
    </Fragment>
  ));

  return (
    <Container>
      <Dot isActive={true} />
      {progressStep}
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
