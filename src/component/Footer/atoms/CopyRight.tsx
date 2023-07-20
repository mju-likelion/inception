import { Body } from '@/component/@share';

interface CopyRightProps {
  content: string;
}

export const CopyRight = ({ content }: CopyRightProps) => {
  return (
    <Body ag="Body5" color="gray3">
      {content}
    </Body>
  );
};
