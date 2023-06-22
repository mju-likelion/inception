import styled from 'styled-components';
import { Dot, Line } from '@/component/@share/atom';
interface ProgressBarProps {
  total: number;
  step: number;
}

export const ProgressBar = ({ total, step }: ProgressBarProps) => {
  const rendering = () => {
    const result = [];
    for (let i = 1; i < total; i++) {
      result.push(
        <>
          <Line isActice={step > i && true} />
          <Dot isActice={step > i && true} />
        </>
      );
    }

    return result;
  };

  return (
    <Container>
      <Dot isActice={true} />
      {rendering()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
`;
