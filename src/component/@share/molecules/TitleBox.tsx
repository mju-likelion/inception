import styled from 'styled-components';
import { Body, Title } from '../atom';
import { theme } from '@/globalStyle';
import { ProgressBar } from './ProgressBar';

interface TitleBoxProps {
  title?: string;
  content: string;
  defaultColor?: keyof typeof theme.colors;
  total?: number;
  step?: number;
}

export const TitleBox = ({
  title,
  content,
  defaultColor = 'black',
  total = 3,
  step,
}: TitleBoxProps) => {
  return (
    <Container>
      {step ? (
        <ProgressBar total={total} step={step} />
      ) : (
        <Title ag="Title1" color={defaultColor}>
          {title}
        </Title>
      )}
      <BodyBlock>
        <Body ag="Body2Regular" color="gray1">
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
  @media ${({ theme }) => theme.size.tablet} {
    width: 500px;
    h1 {
      ${({ theme }) => theme.typographies.title3};
    }
  }
`;

const BodyBlock = styled.div`
  width: 210px;
  @media ${({ theme }) => theme.size.tablet} {
    width: 500px;
  }
`;
