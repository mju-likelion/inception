import { Fragment } from 'react';
import { styled } from 'styled-components';
import { DotModal, LineModal, Check } from '@/component/@uikit';
interface ProgressBarModalProps {
  step: number;
  total: number;
}

export const ProgressBarModal = ({ step, total }: ProgressBarModalProps) => {
  const prgressStep = Array.from({ length: total }, (_, index) => (
    <Fragment key={index}>
      <LineModal isPass={step > index} />
      <DotModal isActive={step === index + 1} isPass={step > index} />
    </Fragment>
  ));

  return (
    <Container>
      {step <= 0 ? (
        <DotModal isActive={false} isPass={false} />
      ) : (
        <Check isActive={step === 1} />
      )}
      {prgressStep}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  width: 28px;
`;
