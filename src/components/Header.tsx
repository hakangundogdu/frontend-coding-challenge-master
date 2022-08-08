import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import {
  createTournament,
  fetchTournaments
} from '../features/tournaments-slice';
import styled from 'styled-components';
import theme from '../theme';

import Button from '../components/Button';
import Input from '../components/Input';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = React.useState<string>('');
  const [initial, setInitial] = React.useState<boolean>(true);

  const searchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (initial) {
      dispatch(fetchTournaments());
      setInitial(false);
    } else {
      const handler = setTimeout(() => {
        dispatch(fetchTournaments(query));
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [query, dispatch]);

  const createHandle = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const tournamentName = prompt('Tournament Name:');

    if (tournamentName) {
      dispatch(createTournament(tournamentName));
    }
  };

  return (
    <Wrapper>
      <Input
        placeholder="Search tournament ..."
        value={query}
        onChange={searchHandle}
      />
      <Button onClick={createHandle}>CREATE TOURNAMENT</Button>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${theme.spacing(6)} auto;
`;
