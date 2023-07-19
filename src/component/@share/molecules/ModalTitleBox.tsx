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
        <Body ag="Body3">{content}</Body>
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
