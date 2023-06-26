import styled from 'styled-components';
import { DotModal, LineModal, Check } from '@/component/@share/atom';
import { Fragment } from 'react';
interface ProgressBarModalProps {
  step: number;
  total: number;
}

export const ProgressBarModal = ({ step, total }: ProgressBarModalProps) => {
  const onProgressRender = () => {
    const result = [];
    for (let i = 1; i < total; i++) {
      result.push(
        <Fragment key={i}>
          <LineModal isPass={step > i} />
          <DotModal isActive={step === i + 1} isPass={step > i} />
        </Fragment>
      );
    }

    return result;
  };

  return (
    <Container>
      {step === 0 ? (
        <DotModal isActive={false} isPass={false} />
      ) : (
        <Check isActive={step === 1} />
      )}
      {onProgressRender()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  flex-direction: column;
  width: 28px;
`;
