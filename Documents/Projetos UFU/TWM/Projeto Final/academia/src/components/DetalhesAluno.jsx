import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form, Tabs, Tab, Breadcrumb, Table, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const DetalhesAluno = () => {
  const { id } = useParams(); // Recebe o ID do aluno pela URL
  const [aluno, setAluno] = useState(null);
  const [treinos, setTreinos] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch detalhes do aluno
    const fetchAluno = async () => {
      try {
        const response = await fetch(`http://localhost:3001/alunos/${id}`);
        const data = await response.json();
        setAluno(data); // Atualiza o estado do aluno
        if (data.treino != null) {
          fetchTreinos(data.treino); // Chama fetchTreinos apenas se houver um ID de treino válido
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do aluno:", error);
      }
    };
    
    // Fetch treinos do aluno
    const fetchTreinos = async (idTreino) => {
      try {
       const response = await fetch(`http://localhost:3001/treinos/${idTreino}`);
        const data = await response.json();
        setTreinos(data);
      } catch (error) {
        console.error("Erro ao buscar treinos:", error);
      }
    };
  
    fetchAluno(); // Chama o método para buscar o aluno
  }, [id]);
  
  const handleTreino = (id) => {
    navigate(`/treino/${id}`);
  }

  const handleEditClick = () => setShowModal(true);
  
  const handleModalClose = () => {
    setShowModal(false);
    setPassword('');
  };

  const handlePasswordSubmit = () => {
    if (password === 'adm123') {
      setIsAdmin(true);
    }
    handleModalClose();
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:3001/alunos/${id}`, { method: 'DELETE' }); // Substituir pela URL real
    // Redirecionar ou atualizar a lista de alunos após a exclusão
  };

  return (
    <Container fluid className="bg-dark text-white min-vh-100 p-5">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h3 style={{ color: '#24B9CC' }}>Detalhes do Aluno</h3>
          {!isAdmin ? (
            <Button variant="outline-info" onClick={handleEditClick}>
              <FaPencilAlt style={{ color: '#24B9CC' }} />
            </Button>
          ) : (
            <>
              <Button variant="outline-info" style={{ color: '#24B9CC', borderColor: '#24B9CC' }}>
                Editar
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Excluir
              </Button>
            </>
          )}
        </Col>
      </Row>
      
      {aluno && (
        <>
          <Row className="mb-3">
            <Col><strong>Nome:</strong> {aluno.nome}</Col>
            <Col><strong>Email:</strong> {aluno.email}</Col>
          </Row>
          <Row className="mb-3">
            <Col><strong>Telefone:</strong> {aluno.telefone}</Col>
            <Col><strong>Plano:</strong> {aluno.plano}</Col>
          </Row>

          <hr style={{ borderColor: '#24B9CC' }} />
          <h4 style={{ color: '#24B9CC' }}>Treino</h4>
          {treinos === null ? (
            <p>Nenhum treino cadastrado</p>
          ) : (
            <Tabs defaultActiveKey={treinos.id} className="mb-3" style={{backgroundColor: "24B9CC"}}>
              {treinos.treino?.map((treino) => (
                <Tab eventKey={treino.id} title={treino.nome} key={treino.id}  >
                  <Table responsive bordered hover variant="dark" className="bg-dark p-2">
                    <tbody>
                      {treino.exercicios?.map((exercicio, index) => (
                        <tr key={index}>
                          <td>
                            <Row className="align-items-center">
                              <Col md={2}>
                                <Image
                                  src={exercicio.fotoUrl || 'https://via.placeholder.com/100'}
                                  alt={exercicio.nome}
                                  rounded
                                  fluid
                                />
                              </Col>
                              <Col>
                                <strong>{exercicio.nome}</strong>
                              </Col>
                              <Col>
                                <p>Séries: {exercicio.series}</p>
                                <p>Repetições: {exercicio.repeticoes}</p>
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab>
              ))}
            </Tabs>
          )
          }

          {treinos === null && (
            <Button variant="outline-info" style={{ color: '#24B9CC', borderColor: '#24B9CC' }} onClick={() => handleTreino(aluno.id)}>
              Cadastrar Treino
            </Button>
          )} 

          {/* Modal para senha de administrador */}
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Autenticação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Digite a senha de administrador:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handlePasswordSubmit}>
                Confirmar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default DetalhesAluno;
