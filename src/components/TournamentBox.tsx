import React from 'react';
import { Tournament } from '../features/tournaments-slice';

import styled from 'styled-components';
import theme from '../theme';
import H6 from './H6';
import Button from './Button';

interface TournamentProps {
  tournament: Tournament;
  deleteHandle: (id: string) => void;
  editHandle: (id: string, name: string) => void;
}

const TournamentBox = ({
  tournament,
  deleteHandle,
  editHandle
}: TournamentProps) => {
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
      <ButtonContainer>
        <Button onClick={() => editHandle(tournament.id, tournament.name)}>
          EDIT
        </Button>
        <Button onClick={() => deleteHandle(tournament.id)}>DELETE</Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default TournamentBox;

const Wrapper = styled.div`
  border-radius: ${theme.borderRadius};
  background-color: ${theme.palette.background.base};
  padding: ${theme.spacing(6)};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing(2)};
  margin-top: ${theme.spacing(2)};
`;
