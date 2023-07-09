import styled from 'styled-components';
import { Body, Title } from '../atom';
import { theme } from '@/globalStyle';
import { ProgressBar } from './ProgressBar';

interface TitleBoxProps {
  title: string;
  content: string;
  $isActive: boolean;
  $isPass: boolean;
  defaultColor?: keyof typeof theme.colors;
  total?: number;
  step?: number;
}

export const TitleBox = ({
  title,
  content,
  $isActive,
  $isPass,
  defaultColor = 'black',
  total = 3,
  step,
}: TitleBoxProps) => {
  return (
    <Container>
      {step ? (
        <ProgressBar total={total} step={step} />
      ) : (
        <Title
          ag="Title2"
          color={$isActive ? 'mint1' : $isPass ? 'mint2' : defaultColor}
        >
          {title}
        </Title>
      )}
      <BodyBlock>
        <Body ag="Body3" color={$isActive ? 'gray1' : 'gray3'}>
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
  @media ${({ theme }) => theme.size.web} {
    width: 500px;
  }
`;

const BodyBlock = styled.div`
  width: 210px;
`;
