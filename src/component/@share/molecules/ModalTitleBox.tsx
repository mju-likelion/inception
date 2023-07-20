import styled from 'styled-components';
import { Body, Title } from '../atom';
import { theme } from '@/globalStyle';

interface TitleBoxProps {
  title: string;
  content: string;
}

export const ModalTitleBox = ({ title, content }: TitleBoxProps) => {
  return (
    <Container>
      <Title ag="Title2">{title}</Title>{' '}
      <BodyBlock>
        <Body ag="Body3" color="gray1" align="center">
          {content}
        </Body>
      </BodyBlock>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const BodyBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
