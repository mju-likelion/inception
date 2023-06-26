import { Body } from '@/component/@share';

type CopyRightProps = {
  content: string;
};

export const CopyRight = ({ content }: CopyRightProps) => {
  return (
    <Body ag="Body5" color="gray2">
      {content}
    </Body>
  );
};
