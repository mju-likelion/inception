import { css, styled } from 'styled-components';
import { ButtonSmall } from '@/component/uikit/atom/ButtonSmall';
import { theme } from '@/globalStyle';
import { LoadingIcon } from '../atom';
import { ToastStatus } from '@/types/Toast';

interface Props {
  icon?: string;
  title: string;
  content?: string;
  isOnlyTitle?: boolean;
  enableCopy?: boolean;
  isLoading?: boolean;
  onSectionClick?: () => void;
  clickButton?: (copyResult: ToastStatus) => void;
}

export const Information = (props: Props) => {
  return (
    <InformationBlock
      $enableCopy={props.enableCopy || false}
      $isOnlyTitle={props.isOnlyTitle || false}
      onClick={props.onSectionClick}
    >
      {props.isLoading ? <LoadingContent /> : <Content {...props} />}
    </InformationBlock>
  );
};

const LoadingContent = () => {
  return (
    <LoadingBlock>
      <LoadingIcon spinnerType="graySpinner" />
    </LoadingBlock>
  );
};

const Content = ({
  icon,
  title,
  content,
  isOnlyTitle = false,
  enableCopy = false,
  clickButton,
}: Props) => {
  return (
    <ContentBlock>
      {enableCopy || <Icon src={icon} />}
      <TextBlock $enableCopy={enableCopy}>
        {enableCopy ? (
          <Body ag="Body1SemiBold" $color="gray1">
            {title}
          </Body>
        ) : (
          <Body ag="Body3" $color="gray2">
            {title}
          </Body>
        )}
        {isOnlyTitle ||
          (enableCopy ? (
            <Body ag="Body3" $color="gray2">
              {content}
            </Body>
          ) : (
            <Body ag="Body1SemiBold" $color="gray1">
              {content}
            </Body>
          ))}
      </TextBlock>
      {enableCopy && (
        <ButtonSmall copyContent={content} onCopy={clickButton}>
          복사하기
        </ButtonSmall>
      )}
    </ContentBlock>
  );
};

const InformationBlock = styled.div<{
  $enableCopy: boolean;
  $isOnlyTitle: boolean;
}>`
  min-width: 320px;
  max-width: 500px;
  height: ${({ $isOnlyTitle }) => $isOnlyTitle && '70px'};
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  padding: 12px;
  background-color: ${({ $enableCopy }) =>
    $enableCopy
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

const LoadingBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const TextBlock = styled.div<{ $enableCopy: boolean }>`
  flex: ${({ $enableCopy }) => $enableCopy && 1};
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
