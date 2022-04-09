import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Page from './views/Page';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Page connected={false} />} />
        <Route exact path="/game" element={<Page connected={true} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
