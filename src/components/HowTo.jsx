const GameRules = [
  'This a single player game of keep up',
  "Enter a name, and scan the QR code with your phone's camera",
  'The game will start when your phone is connected',
  'This game requires an iPhone or iPad running iOS 13 or later'
];

const ControllerRules = [
  'This game requires an iPhone or iPad running iOS 13 or later',
  'Once connected, click join session to join the game',
  "Your devices motion will be mapped to the paddle's movement"
];

const mapRuleSetToListItems = (isController) => {
  return (isController ? ControllerRules : GameRules).map((rule, index) => {
    return <li key={index}>{rule}</li>;
  });
};

/**
 * Instruction's for playing the game
 * @returns {JSX}
 */
const HowTo = ({ isController }) => {
  return (
    <>
      <h2>How To Play</h2>
      <ol>{mapRuleSetToListItems(isController)}</ol>
    </>
  );
};

export default HowTo;
