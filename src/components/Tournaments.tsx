import React from 'react';
import { useAppSelector } from '../app/hooks';
import styled from 'styled-components';
import theme from '../theme';
import TournamentBox from './TournamentBox';
import Message from './Message';

const Tournaments: React.FC = () => {
  const tournaments = useAppSelector(state => state.tournaments);

  return (
    <>
      <Message />
      <GridContainer>
        {tournaments.tournaments.map(tournament => (
          <TournamentBox key={tournament.id} tournament={tournament} />
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
