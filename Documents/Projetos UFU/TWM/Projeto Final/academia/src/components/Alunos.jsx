import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const navigate = useNavigate();

  // Simulação de requisição GET para buscar alunos
  useEffect(() => {
    // Exemplo de dados recebidos de um serviço GET
    const fetchAlunos = async () => {
      const response = await fetch('http://localhost:3001/alunos'); // Substituir pela URL real
      const data = await response.json();
      setAlunos(data);
      setFilteredAlunos(data);
    };
    fetchAlunos();
  }, []);

  // Filtra alunos conforme o termo de pesquisa
  useEffect(() => {
    const filtered = alunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlunos(filtered);
  }, [searchTerm, alunos]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDetails = (id) => {
    navigate(`/detalhes/${id}`);
  }

  return (
    <Container fluid className="bg-dark text-white min-vh-100 p-5">
      <Row className="mb-4">
        <Col>
          <h3 className="text-center" style={{ color: '#24B9CC' }}>Lista de Alunos</h3>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Control
            type="text"
            placeholder="Pesquisar alunos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-dark text-white border border-light"
          />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Table responsive bordered hover variant="dark" className="text-white">
            <tbody>
              {filteredAlunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{aluno.nome}</span>
                      <Button
                        variant="outline-info"
                        style={{ color: '#24B9CC', borderColor: '#24B9CC' }}
                        onClick={() => handleDetails(aluno.id)}
                      >
                        Detalhes
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Alunos;