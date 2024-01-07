import { styled } from 'styled-components';

interface Props {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  maxLength?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export const Input = ({
  type,
  placeholder,
  onChange,
  onClick,
  onKeyUp,
  value,
  maxLength,
  onKeyDown,
}: Props) => {
  return (
    <InputField
      type={type}
      placeholder={placeholder}
      onKeyUp={onKeyUp}
      onChange={onChange}
      onClick={onClick}
      value={value}
      maxLength={maxLength}
      onKeyDown={onKeyDown}
    />
  );
};

const InputField = styled.input`
  ${({ theme }) => theme.typographies.body1.regular};

  width: 100%;
  min-width: 320px;
  max-width: 500px;
  height: 48px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray1};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray3};
  }

  &:focus {
    color: ${({ theme }) => theme.colors.gray2};
    outline: ${({ theme }) => theme.colors.gray2};
    border: 1px solid ${({ theme }) => theme.colors.gray2};
  }

  &:focus::placeholder {
    visibility: hidden;
  }
`;
