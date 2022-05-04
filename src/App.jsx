import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ControllerView from './views/ControllerView';
import GameView from './views/GameView';
import GameCanvas from './components/GameCanvas';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameView />} />
        <Route path="game/session/:id" element={<GameView />} />
        <Route path="controller/session/:id" element={<ControllerView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
