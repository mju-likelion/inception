import { styled } from 'styled-components';

export const Input = () => {
  return <InputField placeholder="약속방 입장 코드" />;
};

const InputField = styled.input`
  width: 320px;
  height: 48px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 8px;
  background-color: none;
  color: ${({ theme }) => theme.colors.gray2};
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
`;
