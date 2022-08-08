import React from 'react';
import { Tournament } from '../features/tournaments-slice';
import {
  deleteTournament,
  updateTournament
} from '../features/tournaments-slice';
import { useAppDispatch } from '../app/hooks';

import styled from 'styled-components';
import theme from '../theme';
import H6 from './H6';
import Button from './Button';

interface TournamentProps {
  tournament: Tournament;
}

const TournamentBox = ({ tournament }: TournamentProps) => {
  const dispatch = useAppDispatch();

  const deleteHandle = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (window.confirm('Do you really want to delete this tournament?')) {
      dispatch(deleteTournament(tournament.id));
    }
  };

  const editHandle = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const tournamentName = prompt('New Tournament Name:', tournament.name);
    tournamentName &&
      dispatch(updateTournament({ id: tournament.id, name: tournamentName }));
  };

  const dateGB = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(Date.parse(tournament.startDate));

  return (
    <Wrapper>
      <H6>{tournament.name}</H6>
      <p>{`Organizer: ${tournament.organizer}`}</p>
      <p>{`Game: ${tournament.game}`}</p>
      <p>{`Participants: ${tournament.participants.current}/${tournament.participants.max}`}</p>
      <p>{`Start: ${dateGB}`}</p>
      <EditButton onClick={editHandle}>EDIT</EditButton>
      <DeleteButton onClick={deleteHandle}>DELETE</DeleteButton>
    </Wrapper>
  );
};

export default TournamentBox;

const Wrapper = styled.div`
  border-radius: ${theme.borderRadius};
  background-color: ${theme.palette.background.base};
  padding: ${theme.spacing(6)};
`;

const EditButton = styled(Button)`
  margin-top: ${theme.spacing(2)};
`;

const DeleteButton = styled(Button)`
  margin-left: ${theme.spacing(2)};
`;
