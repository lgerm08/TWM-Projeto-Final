import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';


export const cpfMask = value => {    
  console.log('Dentro do CPF');
  return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export const phoneMask = value => {
  return value
    .replace(/\D/g, '') // Remove qualquer caractere que não seja número
    .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses ao DDD
    .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona um traço após os cinco primeiros dígitos do número
    .replace(/(-\d{4})\d+?$/, '$1'); // Limita o número a quatro dígitos após o traço
};

export const moneyMask = (value) => {    
  return "R$ " +
    value
      .replace(/\D/g, '') // Remove qualquer caractere que não seja número
      .replace(/(\d)(\d{2})$/, '$1,$2') // Adiciona uma vírgula antes dos últimos 2 dígitos
      .replace(/(?=(\d{3})+(\D))\B/g, '.') // Adiciona um ponto a cada grupo de 3 dígitos
}


const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setData] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [salario, setSalario] = useState('');
  const [turno, setTurno] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL

  useEffect(() => {
    console.log(id);
    if (id) {
      // Se um ID for passado, buscar os dados do personal para edição
      fetch(`http://localhost:3001/personais/${id}`)
        .then(response => response.json())
        .then(data => {
          setNome(data.nome);
          setData(data.dataNascimento);
          setCpf(data.cpf);
          setEmail(data.email);
          setTelefone(data.telefone);
          setDataInicio(data.dataInicio);
          setSalario(data.salario);
          setTurno(data.turno);
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let personal = {
      id: id || '', // Se não houver ID, um novo será gerado no backend
      nome,
      dataNascimento,
      cpf,
      email,
      telefone,
      dataInicio,
      salario,
      turno,
    };

    const method = id ? 'PUT' : 'POST'; // Define o método como PUT ou POST
    const url = id ? `http://localhost:3001/personais/${id}` : 'http://localhost:3001/personais';

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: method,
      body: JSON.stringify(personal),
    })
      .then(response => response.json())
      .then(data => {
        console.log("DATA", data);
        navigate('/personais'); // Navega para a lista de personais após salvar
      })
      .catch(error => console.log(error));
  };

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4" style={{ color: '#24B9CC' }}>
        {id ? 'Editar Personal' : 'Registrar Personal'}
      </h2>
      <Form onSubmit={handleSubmit} className="bg-dark text-light p-4 rounded">
        {/* Formulários de entrada */}
        <Form.Group controlId="formNome" className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do personal"
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
            onChange={e=>setCpf(cpfMask(e.target.value))}
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

        <Form.Group controlId="formDataInicio" className="mb-3">
          <Form.Label>Data de Início</Form.Label>
          <Form.Control
            type="date"
            value={dataInicio}
            onChange={e => setDataInicio(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSalario" className="mb-3">
          <Form.Label>Salário (R$)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o salário"
            value={salario}
            onChange={e => setSalario(moneyMask(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTurno" className="mb-3">
          <Form.Label>Turno</Form.Label>
          <Form.Select value={turno} onChange={e => setTurno(e.target.value)}>
            <option value="matutino">Matutino</option>
            <option value="vespertino">Vespertino</option>
            <option value="noturno">Noturno</option>
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button type="submit" style={{ backgroundColor: '#24B9CC', borderColor: '#24B9CC' }}>
            {id ? 'Salvar Alterações' : 'Registrar'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Cadastro;
