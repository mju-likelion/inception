import styled from 'styled-components';
import { theme } from '@/globalStyle';
import { ProgressBar } from './ProgressBar';

interface TitleBoxProps {
  title?: string;
  content: string;
  $isActive: boolean;
  $isPass: boolean;
  defaultColor?: keyof typeof theme.colors;
  total?: number;
  step?: number;
}

export const HelperTitleBox = ({
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
        <Title $color={$isActive ? 'mint1' : $isPass ? 'mint2' : defaultColor}>
          {title}
        </Title>
      )}
      <BodyBlock>
        <Body $color={$isActive ? 'gray1' : 'gray3'}>{content}</Body>
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

const Title = styled.h1<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  word-break: keep-all;
  letter-spacing: 0;
  ${({ theme }) => theme.typographies.title2};
  text-align: left;
`;

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  letter-spacing: 0;
  ${({ theme }) => theme.typographies.body3};
  text-align: left;
  word-break: keep-all;
`;

const BodyBlock = styled.div`
  width: 210px;
`;
