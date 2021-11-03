import { Container, Row } from 'react-bootstrap';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Bitcoin from './Component/Bitcoin';
import Ethereum from './Component/Ethereum';

function App() {
  return (
    <Container className="App">
      <Row className="App-header">
        <h1 className="mt-3">Chainalysis SWE (NG) take home assignment</h1>
        <p>by Yen-Ming (Ellee) Chen</p>
      </Row>
      <Row>
        <Bitcoin />
        <Ethereum />
      </Row>
    </Container>
  );
}

library.add(fab)

export default App;
