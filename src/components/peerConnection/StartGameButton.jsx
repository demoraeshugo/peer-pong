import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const StartGameButton = () => (
  <Link to="/game">
    <Button variant="primary">Start Game</Button>
  </Link>
);

export default StartGameButton;
