import styled from 'styled-components';

export const LoadingIcon = () => {
  return (
    <>
      <Spin />
    </>
  );
};

const Spin = styled.div`
  width: 40px;
  height: 40px;
  border: 6px solid #e5e5ea;
  border-bottom-color: #50e3c0;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
