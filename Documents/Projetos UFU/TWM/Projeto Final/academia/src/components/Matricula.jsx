import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const cpfMask = value => {    
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

export const phoneMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

const Matricula = () => {
  const [nome, setNome] = useState();
  const [dataNascimento, setData] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [plano, setPlano] = useState();
  const [objetivo, setObjetivo] = useState();
  const navigate = useNavigate();

  function matricular(e) {
    e.preventDefault(); // Adiciona para evitar recarregamento da página

    let aluno = {
      "id": "",
      "nome": nome,
      "dataNascimento": dataNascimento,
      "cpf": cpf,
      "email": email,
      "telefone": telefone,
      "plano": plano,
      "objetivo": objetivo
    };
    
    fetch("http://localhost:3001/alunos", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(aluno)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:", data);
        navigate(`/detalhes/${data.id}`);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4" style={{ color: '#24B9CC' }}>Matrícula de Aluno</h2>
      <Form onSubmit={matricular} className="bg-dark text-light p-4 rounded">
        {/* Campos do formulário */}
        <Form.Group controlId="formNome" className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do aluno"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDataNascimento" className="mb-3">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={dataNascimento}
            onChange={e => setData(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCpf" className="mb-3">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={e => setCpf(cpfMask(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite o email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTelefone" className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Digite o telefone"
            value={telefone}
            onChange={e => setTelefone(phoneMask(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPlano" className="mb-3">
          <Form.Label>Plano da Academia</Form.Label>
          <Form.Select value={plano} onChange={e => setPlano(e.target.value)}>
            <option value="Plano Básico">Plano Básico</option>
            <option value="Plano Premium">Plano Premium</option>
            <option value="Plano Premium Plus">Plano Premium Plus</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formObjetivo" className="mb-3">
          <Form.Label>Objetivo</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Digite o objetivo do aluno"
            value={objetivo}
            onChange={e => setObjetivo(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" style={{ backgroundColor: '#24B9CC', borderColor: '#24B9CC' }}>
            Matricular
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Matricula;
