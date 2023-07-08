import { styled } from 'styled-components';

interface Props {
  placeholder?: string;
  onChange: () => void;
  value: string;
}

export const Input = ({ placeholder, onChange, value }: Props) => {
  return (
    <InputField placeholder={placeholder} onChange={onChange} value={value} />
  );
};

const InputField = styled.input`
  width: 320px;
  height: 48px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 8px;
  background-color: none;
  color: ${({ theme }) => theme.colors.gray1};
  font-size: 16px;

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
