import styled from 'styled-components';

interface ModalDimmedProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const ModalDimmed = ({ onClick, children }: ModalDimmedProps) => {
  return <Container onClick={onClick}>{children}</Container>;
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(42, 43, 49, 0.4);
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
