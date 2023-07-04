import styled from 'styled-components';
import { Body, Title } from '../atom';
import { theme } from '@/globalStyle';

interface TitleBoxProps {
  title: string;
  content: string;
  $isActive: boolean;
  $isPass: boolean;
  defaultColor?: keyof typeof theme.colors;
}

export const TitleBox = ({
  title,
  content,
  $isActive,
  $isPass,
  defaultColor = 'black',
}: TitleBoxProps) => {
  return (
    <Container>
      <Title
        ag="Title2"
        color={$isActive ? 'mint1' : $isPass ? 'mint2' : defaultColor}
      >
        {title}
      </Title>
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
`;

const BodyBlock = styled.div`
  width: 210px;
`;
