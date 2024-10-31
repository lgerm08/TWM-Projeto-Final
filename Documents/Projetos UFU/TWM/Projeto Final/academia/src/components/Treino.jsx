import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const CadastroTreino = () => {
  const { id } = useParams(); 
  const [quantidadeTreinos, setQuantidadeTreinos] = useState(1);
  const [exercicios, setExercicios] = useState([]);
  const [treinos, setTreinos] = useState(Array.from({ length: 5 }, (_, i) => ({ id: String.fromCharCode(65 + i), exercicios: [] })));
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch de exercícios (exemplo de URL, substitua pelo seu serviço)
    const fetchExercicios = async () => {
      const response = await fetch('http://localhost:3001/exercicios');
      const data = await response.json();
      setExercicios(data);
    };

    fetchExercicios();
    console.log(id);
  }, []);

  const handleAdicionarLinha = (id) => {
    const updatedTreinos = [...treinos];
    const treinoIndex = updatedTreinos.findIndex((treino) => treino.id === id);
    updatedTreinos[treinoIndex].exercicios.push({ nome: '', series: '', repeticoes: '' });
    setTreinos(updatedTreinos);
  };

  const handleRemoverLinha = (id, index) => {
    if (index === 0) return; // Proíbe a exclusão da primeira linha
    const updatedTreinos = [...treinos];
    const treinoIndex = updatedTreinos.findIndex((treino) => treino.id === id);
    updatedTreinos[treinoIndex].exercicios.splice(index, 1);
    setTreinos(updatedTreinos);
  };

  const handleInputChange = (id, index, field, value) => {
    const updatedTreinos = [...treinos];
    const treinoIndex = updatedTreinos.findIndex((treino) => treino.id === id);
    updatedTreinos[treinoIndex].exercicios[index][field] = value;
    setTreinos(updatedTreinos);
  };

  const handleSalvar = async () => {
    const payload = {
        alunoId: id,
        treino: treinos
            .filter(treino => treino.exercicios && treino.exercicios.length > 0) // Inclui apenas treinos com exercícios
            .map((treino, index) => ({
                id: treino.id,
                nome: getTreinoName(index + 1), // Ajuste o index se necessário
                exercicios: treino.exercicios.map((exercicio, index) => ({
                    id: `e${index + 1}`, // Ajuste a lógica de ID conforme necessário
                    nome: exercicio.nome,
                    repeticoes: exercicio.repeticoes,
                    series: exercicio.series,
                })),
            })),
    };
    console.log(payload);
    const response = await fetch('http://localhost:3001/treinos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert('Treino cadastrado com sucesso!');
      navigate(`/detalhes/${id}`)
    } else {
      alert('Erro ao cadastrar treino.');
    }
  };

  const getTreinoName = (index) => {
    const names = ['A', 'B', 'C', 'D', 'E'];
    return names[index - 1] || ''; // Retorna a letra correspondente ou uma string vazia se o índice estiver fora do intervalo
  };

  return (
    <Container fluid className="bg-dark text-white p-4">
      <h2>Cadastrar Treino</h2>
      <Form.Group controlId="formQuantidadeTreinos">
        <Form.Label>Quantidade de Treinos:</Form.Label>
        <Form.Control
          as="select"
          value={quantidadeTreinos}
          onChange={(e) => setQuantidadeTreinos(e.target.value)}
        >
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <br/>
      <br/>
      {treinos.slice(0, quantidadeTreinos).map((treino) => (
        <div key={treino.id}>
          <h4 style={{ display: 'inline-block' }}>Treino {treino.id}</h4>
          <Button
            variant="outline-info"
            onClick={() => handleAdicionarLinha(treino.id)}
            style={{ float: 'right', marginLeft: '10px' }}
          >
            <FaPlus />
          </Button>
          <Table variant="dark" className="mt-2">
            <thead>
              <tr>
                <th>Exercício</th>
                <th>Séries</th>
                <th>Repetições</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {treino.exercicios.map((exercicio, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      as="select"
                      value={exercicio.nome}
                      onChange={(e) => handleInputChange(treino.id, index, 'nome', e.target.value)}
                    >
                      <option value="">Selecione um exercício</option>
                      {exercicios.map((ex, i) => (
                        <option key={i} value={ex.nome}>{ex.nome}</option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={exercicio.series}
                      onChange={(e) => handleInputChange(treino.id, index, 'series', e.target.value)}
                      min="1"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={exercicio.repeticoes}
                      onChange={(e) => handleInputChange(treino.id, index, 'repeticoes', e.target.value)}
                      min="1"
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoverLinha(treino.id, index)}
                      disabled={index === 0} // Desabilita a exclusão da primeira linha
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <Button variant="success" onClick={handleSalvar} className="mt-3">
        Salvar
      </Button>
    </Container>
  );
};

export default CadastroTreino;
