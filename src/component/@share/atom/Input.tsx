import { styled } from 'styled-components';

interface Props {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  maxLength?: number;
}

export const Input = ({
  type,
  placeholder,
  onChange,
  onKeyUp,
  value,
  maxLength,
}: Props) => {
  return (
    <InputField
      type={type}
      placeholder={placeholder}
      onInput={onKeyUp}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
    />
  );
};

const InputField = styled.input`
  width: 100%;
  min-width: 320px;
  max-width: 500px;
  height: 48px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 8px;
  background-color: none;
  color: ${({ theme }) => theme.colors.gray1};
  font-size: ${({ theme }) => theme.typographies.body1.regular};

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
