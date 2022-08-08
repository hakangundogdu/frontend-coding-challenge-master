import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchTournaments } from '../features/tournaments-slice';

import styled from 'styled-components';
import theme from '../theme';
import Button from './Button';

const Message = () => {
  const tournaments = useAppSelector(state => state.tournaments);
  const dispatch = useAppDispatch();

  const retryHandle = (event: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(fetchTournaments());
  };

  return (
    <>
      {tournaments.loading && (
        <CenteredText>Loading tournaments...</CenteredText>
      )}
      {tournaments.error && (
        <CenteredText>
          <p>{tournaments.error}</p>

          <Button onClick={retryHandle}>Retry</Button>
        </CenteredText>
      )}
      {!tournaments.error &&
        !tournaments.loading &&
        tournaments.tournaments.length === 0 && (
          <CenteredText>No tournaments found.</CenteredText>
        )}
    </>
  );
};

export default Message;

const CenteredText = styled.div`
  text-align: center;
  margin-top: ${theme.spacing(6)};
`;
