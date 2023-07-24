import styled from 'styled-components';

export const ModalDimmed = () => {
  return (
    <>
      <Container></Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(126, 128, 153, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(8px);
`;
