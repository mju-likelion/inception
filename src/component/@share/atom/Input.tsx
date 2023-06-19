import { styled } from 'styled-components';

export const Input = () => {
  return <InputField />;
};

const InputField = styled.input`
  width: 320px;
  height: 48px;
  padding: 12px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 8px;
  background-color: none;
`;
