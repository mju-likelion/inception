import styled from 'styled-components';
import { Body, Title } from '../atom';

interface TitleBoxProps {
  title: string;
  content: string;
  isActive: boolean;
  isPass: boolean;
}

export const TitleBox = ({
  title,
  content,
  isActive,
  isPass,
}: TitleBoxProps) => {
  return (
    <Container>
      <Title
        ag={'Title2'}
        color={isActive ? 'mint1' : isPass ? 'mint2' : 'gray3'}
      >
        {title}
      </Title>
      <BodyBlock>
        <Body ag={'Body3'} color={isActive ? 'gray1' : 'gray3'}>
          {content}
        </Body>
      </BodyBlock>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const BodyBlock = styled.div`
  width: 210px;
`;
