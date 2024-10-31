import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Table, Image, Button, Spinner, Modal, Form } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListaPersonais = () => {
  const [personais, setPersonais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [senha, setSenha] = useState('');
  const [senhaCorreta, setSenhaCorreta] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    carregarPersonais();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar/${id}`);
  };

  const carregarPersonais = () => {
    setLoading(true);
    fetch("http://localhost:3001/personais")
      .then((response) => response.json())
      .then((data) => {
        setPersonais(data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao carregar personais:", error));
  };

  const deletarPersonal = (id) => {
    fetch(`http://localhost:3001/personais/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        carregarPersonais(); // Recarrega a lista após deletar
      })
      .catch((error) => console.error("Erro ao deletar personal:", error));
  };

  const handleIconClick = () => {
    setShowModal(true);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleSenhaSubmit = () => {
    if (senha === 'adm123') {
      setSenhaCorreta(true);
      setShowModal(false);
    } else {
      alert('Senha incorreta!');
    }
  };

  return (
    <Container fluid style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "20px", color: "#24B9CC" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px" }}>
        <h2>Lista de Personais</h2>

      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ maxHeight: "70vh", overflowY: "auto", width: "80%" }}>
            <Table variant="dark" striped bordered hover responsive>
              <thead>
                <tr>
                  <th>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      Personal
                      <FaPencilAlt onClick={handleIconClick} style={{ color: "#24B9CC", cursor: "pointer" }} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {personais.map((personal) => (
                  <tr key={personal.id}>
                    <td style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src={personal.foto}
                          roundedCircle
                          style={{ width: "50px", height: "50px", marginRight: "15px" }}
                        />
                        <div>
                          <div><strong>Nome:</strong> {personal.nome}</div>
                          <div><strong>Email:</strong> {personal.email}</div>
                          <div><strong>Telefone:</strong> {personal.telefone}</div>
                          <div><strong>Turno:</strong> {personal.turno}</div>
                        </div>
                      </div>
                      <div>
                        {senhaCorreta && (
                          <>
                            <Button variant="outline-info" style={{ color: "#24B9CC", borderColor: "#24B9CC", marginRight: "10px" }} onClick={() => handleEdit(personal.id)}>
                              Editar
                            </Button>
                            <Button variant="outline-danger" onClick={() => deletarPersonal(personal.id)}>
                              Deletar
                            </Button>
                          </>
                        )}

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {/* Modal de senha */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Digite a senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={handleSenhaChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSenhaSubmit}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListaPersonais;
