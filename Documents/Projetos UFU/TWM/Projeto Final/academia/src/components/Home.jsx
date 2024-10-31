import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Container, Modal, Table, Button } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();
  
  // Estados para controlar a exibição do modal
  const [showModal, setShowModal] = useState(false);

  // Funções para abrir e fechar o modal
  const handleAulasPage = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePersonaisPage = () => {
    navigate('/personais');
  };
  
  const handleAlunosPage = () => {
    navigate('/alunos');
  };

  return (
    <div style={{backgroundColor: "#24B9CC"}}>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={4} sm={6} xs={12} className="d-flex justify-content-center mb-4">
            <Card bg="dark" text="light" className="m-2" style={{ width: '18rem', height: '100%', cursor: 'pointer'  }} onClick={handlePersonaisPage}>
              <Card.Img variant="top" src="/assets/personal.jpg" alt="Personais" />
              <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Title>Conheça nossos Personais</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} xs={12} className="d-flex justify-content-center mb-4">
            <Card bg="dark" text="light" className="m-2" style={{ width: '18rem', height: '100%', cursor: 'pointer'  }} onClick={handleAlunosPage}>
              <Card.Img variant="top" src="/assets/treino.jpg" alt="Treino" />
              <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Title>Área do Aluno</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} xs={12} className="d-flex justify-content-center mb-4">
            <Card bg="dark" text="light" className="m-2" style={{ width: '18rem', height: '100%', cursor: 'pointer' }} onClick={handleAulasPage}>
              <Card.Img variant="top" src="/assets/aula.jpg" alt="Aula" />
              <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Title>Horário das Aulas</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal com tabela de horários */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Horário das Aulas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Horário</th>
                <th>Atividade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>08:00 - 09:00</td>
                <td>Spinning</td>
              </tr>
              <tr>
                <td>09:00 - 10:00</td>
                <td>Alongamento</td>
              </tr>
              <tr>
                <td>10:00 - 11:00</td>
                <td>Pilates</td>
              </tr>
              <tr>
                <td>18:00 - 19:00</td>
                <td>Zumba</td>
              </tr>
              <tr>
                <td>19:00 - 20:00</td>
                <td>Crossfit</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
