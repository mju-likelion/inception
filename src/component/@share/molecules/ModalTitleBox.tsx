import styled from 'styled-components';

interface TitleBoxProps {
  title: string;
  content: string;
}

export const ModalTitleBox = ({ title, content }: TitleBoxProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <BodyBlock>
        <Body>{content}</Body>
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

const Title = styled.div`
  ${({ theme }) => theme.typographies.title2};
`;

const Body = styled.div`
  ${({ theme }) => theme.typographies.body3};
  color: ${({ theme }) => theme.colors.gray1};
  text-align: center;
`;
