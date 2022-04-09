import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const StartPeerConnection = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Form.Group className="mb-3" controlId="userName">
      <Form.Label>User Name</Form.Label>
      <Form.Control type="text" placeholder="Enter User Name" name="name" required />
    </Form.Group>
    <Button variant="primary" type="submit">
      Start Session
    </Button>
  </Form>
);

export default StartPeerConnection;
