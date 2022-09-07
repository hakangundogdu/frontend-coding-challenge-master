import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  deleteTournament,
  updateTournament
} from '../features/tournaments-slice';
import styled from 'styled-components';
import theme from '../theme';
import TournamentBox from './TournamentBox';
import Message from './Message';

const Tournaments: React.FC = () => {
  const tournaments = useAppSelector(state => state.tournaments);
  const dispatch = useAppDispatch();

  const deleteHandle = (id: string) => {
    if (window.confirm('Do you really want to delete this tournament?')) {
      dispatch(deleteTournament(id));
    }
  };

  const editHandle = (id: string, name: string) => {
    const tournamentName = prompt('New Tournament Name:', name);
    tournamentName &&
      dispatch(updateTournament({ id: id, name: tournamentName }));
  };

  return (
    <>
      <Message />
      <GridContainer>
        {tournaments.tournaments.map(tournament => (
          <TournamentBox
            key={tournament.id}
            editHandle={editHandle}
            deleteHandle={deleteHandle}
            tournament={tournament}
          />
        ))}
      </GridContainer>
    </>
  );
};

export default Tournaments;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${theme.spacing(6)};
`;
