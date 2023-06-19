import { styled } from 'styled-components';
import { ButtonSmall } from './ButtonSmall';

interface Props {
  icon: string;
  title: string;
  content: string;
  isNull: boolean;
  isEnabled: boolean;
}

export const Information = ({
  icon,
  title,
  content,
  isNull,
  isEnabled,
}: Props) => {
  return (
    <InformationBlock isEnabled={isEnabled}>
      <ContentBlock>
        {isEnabled || <Icon src={icon} />}
        <TextBlock isEnabled={isEnabled}>
          <Title isEnabled={isEnabled}>{title}</Title>
          {isNull || <Content isEnabled={isEnabled}>{content}</Content>}
        </TextBlock>
        {isEnabled && <ButtonSmall text="복사하기" />}
      </ContentBlock>
    </InformationBlock>
  );
};

const InformationBlock = styled.div<{ isEnabled: boolean }>`
  box-sizing: border-box;
  width: 320px;
  padding: 12px;
  background-color: ${({ isEnabled }) =>
    isEnabled
      ? ({ theme }) => theme.colors.white
      : ({ theme }) => theme.colors.gray5};
  border-radius: 8px;
`;

const ContentBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
`;

const TextBlock = styled.div<{ isEnabled: boolean }>`
  width: ${({ isEnabled }) => isEnabled && '192px'};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Title = styled.div<{ isEnabled: boolean }>`
  //font-family: 'Pretendard';
  font-weight: ${({ isEnabled }) => (isEnabled ? 600 : 400)};
  font-size: ${({ isEnabled }) => (isEnabled ? '16px' : '14px')};
  line-height: 18px;
  ${({ isEnabled }) =>
    isEnabled
      ? ({ theme }) => theme.colors.gray1
      : ({ theme }) => theme.colors.gray2};
`;

const Content = styled.div<{ isEnabled: boolean }>`
  //font-family: 'Pretendard';
  font-weight: ${({ isEnabled }) => (isEnabled ? 400 : 600)};
  font-size: ${({ isEnabled }) => (isEnabled ? '14px' : '16px')};
  line-height: 20px;
  ${({ isEnabled }) =>
    isEnabled
      ? ({ theme }) => theme.colors.gray2
      : ({ theme }) => theme.colors.gray1};
`;
