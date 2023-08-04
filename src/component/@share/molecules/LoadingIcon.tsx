import { LoadingPage } from '../atom/LoadingPage';
import { LoadingLargeButton } from '../atom/LoadingLargeButton';
import styled from 'styled-components';

interface Props {
  type?: 'LargeButton' | 'Page';
}

export const LoadingIcon = ({ type }: Props) => {
  return (
    <>
      <Loading>
        {type === 'LargeButton' ? <LoadingLargeButton /> : <LoadingPage />}
      </Loading>
    </>
  );
};

const Loading = styled.div``;
