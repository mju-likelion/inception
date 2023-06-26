import { styled } from 'styled-components';
import { ButtonSmall } from '@/component/@share/atom/ButtonSmall';
import { Body } from '@/component/@share/atom/Body';

interface Props {
  icon: string;
  title: string;
  content: string;
  isNull?: boolean;
  isEnabled?: boolean;
}

export const Information = ({
  icon,
  title,
  content,
  isNull = false,
  isEnabled = false,
}: Props) => {
  return (
    <InformationBlock $isEnabled={isEnabled} $isNull={isNull}>
      <ContentBlock>
        {isEnabled || <Icon src={icon} />}
        <TextBlock $isEnabled={isEnabled}>
          {isEnabled ? (
            <Body ag="Body1" color="gray1">
              {title}
            </Body>
          ) : (
            <Body ag="Body3" color="gray2">
              {title}
            </Body>
          )}
          {isNull ||
            (isEnabled ? (
              <Body ag="Body3" color="gray2">
                {content}
              </Body>
            ) : (
              <Body ag="Body1" color="gray1">
                {content}
              </Body>
            ))}
        </TextBlock>
        {isEnabled && <ButtonSmall>복사하기</ButtonSmall>}
      </ContentBlock>
    </InformationBlock>
  );
};

const InformationBlock = styled.div<{ $isEnabled: boolean; $isNull: boolean }>`
  width: 320px;
  height: ${({ $isNull }) => $isNull && '70px'};
  align-items: center;
  display: flex;
  padding: 12px;
  background-color: ${({ $isEnabled }) =>
    $isEnabled
      ? ({ theme }) => theme.colors.white
      : ({ theme }) => theme.colors.gray5};
  border-radius: 8px;
`;

const ContentBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
`;

const TextBlock = styled.div<{ $isEnabled: boolean }>`
  flex: ${({ $isEnabled }) => $isEnabled && 1};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
