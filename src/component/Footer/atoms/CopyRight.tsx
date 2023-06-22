import styled from 'styled-components';
import { Body } from '@/component/@share';

type CopyRightProps = {
  content: string;
};

export const CopyRight = ({ content }: CopyRightProps) => {
  return (
    <Container>
      <Body ag="Body5" color="gray2">
        {content}
      </Body>
    </Container>
  );
};

const Container = styled.div`
  width: 186px;
`;
