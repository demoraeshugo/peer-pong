// const ruleSet = [
//   `This is a multiplayer game involving two players represented by paddles, with a single
//     shared ball`,
//   `The goal is to get the ball past your opponent's paddle to the other side of the screen`,
//   `The ball moves at a constant speed, and bounces off the top and bottom of the screen`,
//   `The ball is reset after it hits the back of your oponent screen`,
//   `The player with the most points at the end of the game wins`
// ];

const ruleSet = [`lore ipsum`];

const mapRuleSetToListItems = () => {
  return ruleSet.map((rule, index) => {
    return <li key={index}>{rule}</li>;
  });
};

/**
 * Instruction's for playing the game
 * @returns {JSX}
 */
const HowTo = () => {
  return (
    <>
      <h2>How To Play</h2>
      <ol>{mapRuleSetToListItems()}</ol>
    </>
  );
};

export default HowTo;
