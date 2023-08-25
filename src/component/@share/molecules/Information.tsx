import { css, styled } from 'styled-components';
import { ButtonSmall } from '@/component/@share/atom/ButtonSmall';
import { theme } from '@/globalStyle';
import { ToastStatus } from '@/types/Toast';

interface Props {
  icon?: string;
  title: string;
  content?: string;
  isNull?: boolean;
  isEnabled?: boolean;
  clickButton?: (copyResult: ToastStatus) => void;
}

export const Information = ({
  icon,
  title,
  content,
  isNull = false,
  isEnabled = false,
  clickButton,
}: Props) => {
  return (
    <InformationBlock $isEnabled={isEnabled} $isNull={isNull}>
      <ContentBlock>
        {isEnabled || <Icon src={icon} />}
        <TextBlock $isEnabled={isEnabled}>
          {isEnabled ? (
            <Body ag="Body1SemiBold" $color="gray1">
              {title}
            </Body>
          ) : (
            <Body ag="Body3" $color="gray2">
              {title}
            </Body>
          )}
          {isNull ||
            (isEnabled ? (
              <Body ag="Body3" $color="gray2">
                {content}
              </Body>
            ) : (
              <Body ag="Body1SemiBold" $color="gray1">
                {content}
              </Body>
            ))}
        </TextBlock>
        {isEnabled && (
          <ButtonSmall copyContent={content} onCopy={clickButton}>
            복사하기
          </ButtonSmall>
        )}
      </ContentBlock>
    </InformationBlock>
  );
};

const InformationBlock = styled.div<{ $isEnabled: boolean; $isNull: boolean }>`
  min-width: 320px;
  max-width: 500px;
  height: ${({ $isNull }) => $isNull && '70px'};
  flex-direction: column;
  align-items: flex-start;
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
  flex: 1 0 0;
  align-self: stretch;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const TextBlock = styled.div<{ $isEnabled: boolean }>`
  flex: ${({ $isEnabled }) => $isEnabled && 1};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  overflow: hidden;

  & > p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Body = styled.p<{
  ag: string;
  $color: keyof typeof theme.colors;
}>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  text-align: left;
  letter-spacing: 0;
  word-break: keep-all;

  ${(props) =>
    props.ag === 'Body1SemiBold' &&
    css`
      ${({ theme }) => theme.typographies.body1.semiBold};
    `}

  ${(props) =>
    props.ag === 'Body3' &&
    css`
      ${({ theme }) => theme.typographies.body3};
    `}
`;
