import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Page from './views/Page';
import Landing from './views/Landing';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/game" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
