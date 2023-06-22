import styled from 'styled-components';
import { Dot, Line } from '@/component/@share/atom';
interface ProgressBarModalProps {
  step: number;
}

export const PrgoressBarModal = ({ step }: ProgressBarModalProps) => {
  return (
    <Container>
      <Dot />
      <Line />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
`;
