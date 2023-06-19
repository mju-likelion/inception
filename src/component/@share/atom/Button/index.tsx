import {
  ButtonLargeProps,
  ButtonLarge,
} from '@/component/@share/atom/Button/ButtonLarge';
import {
  ButtonSmallProps,
  ButtonSmall,
} from '@/component/@share/atom/Button/ButtonSmall';

type ButtonProps =
  | ({ size: 'large' } & ButtonLargeProps)
  | ({ size: 'small' } & ButtonSmallProps);

export const Button = ({ size, ...props }: ButtonProps) => {
  switch (size) {
    case 'small': {
      const { text } = props as ButtonSmallProps;
      return <ButtonSmall text={text} />;
    }
    case 'large': {
      const { text, isDisabled } = props as ButtonLargeProps;
      return <ButtonLarge text={text} isDisabled={isDisabled} />;
    }
  }
};
