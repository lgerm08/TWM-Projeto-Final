const express = require('express');const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let alunos = [
    {
      id: '1',
      nome: 'João Silva',
      dataNascimento: '1995-05-12',
      cpf: '123.456.789-00',
      email: 'joao.silva@example.com',
      telefone: '11987654321',
      objetivo: 'Perder peso',
      plano: 'Plano Básico',
      treino: 't1'
    },
    {
      id: '2',
      nome: 'Maria Oliveira',
      dataNascimento: '1988-02-23',
      cpf: '987.654.321-00',
      email: 'maria.oliveira@example.com',
      telefone: '21987654321',
      objetivo: 'Ganhar massa muscular',
      plano: 'Plano Premium',
      treino: 't2'
    },
    {
      id: '3',
      nome: 'Carlos Pereira',
      dataNascimento: '2000-07-15',
      cpf: '321.654.987-00',
      email: 'carlos.pereira@example.com',
      telefone: '31987654321',
      objetivo: 'Melhorar resistência',
      plano: 'Plano Premium Plus',
      treino: 't3'
    }
  ];
  
let personais = [
    {
      id: '1',
      nome: 'Ana Souza',
      dataNascimento: '1985-03-15',
      cpf: '123.456.789-11',
      email: 'ana.souza@example.com',
      telefone: '11987651234',
      dataInicio: '2023-01-10',
      salario: 3500.00,
      turno: 'manhã',
      foto: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: '2',
      nome: 'Bruno Lima',
      dataNascimento: '1990-07-22',
      cpf: '987.654.321-22',
      email: 'bruno.lima@example.com',
      telefone: '21987654321',
      dataInicio: '2022-05-15',
      salario: 4200.00,
      turno: 'tarde',
      foto: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: '3',
      nome: 'Carla Mendes',
      dataNascimento: '1992-11-05',
      cpf: '321.654.987-33',
      email: 'carla.mendes@example.com',
      telefone: '31987659876',
      dataInicio: '2021-09-01',
      salario: 3900.00,
      turno: 'noite',
      foto: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

let treinos = [
    {
      id: 't1',
      alunoId: '1',
      treino: [
        {
          id: 't1a',
          nome: 'A',
          exercicios: [
            { id: 'e1', nome: 'Supino Reto', repeticoes: 10, series: 4 },
            { id: 'e2', nome: 'Agachamento Livre', repeticoes: 12, series: 3 },
            { id: 'e16', nome: 'Barra Fixa', repeticoes: 8, series: 4 }
          ]
        },
        {
          id: 't1b',
          nome: 'B',
          exercicios: [
            { id: 'e3', nome: 'Remada Curvada', repeticoes: 8, series: 4 },
            { id: 'e4', nome: 'Desenvolvimento de Ombros', repeticoes: 10, series: 3 },
            { id: 'e17', nome: 'Panturrilha em Pé', repeticoes: 15, series: 3 }
          ]
        },
        {
          id: 't1c',
          nome: 'C',
          exercicios: [
            { id: 'e5', nome: 'Rosca Direta', repeticoes: 15, series: 3 },
            { id: 'e18', nome: 'Crucifixo Inclinado', repeticoes: 12, series: 3 },
            { id: 'e19', nome: 'Leg Press', repeticoes: 10, series: 4 }
          ]
        }
      ]
    },
    {
      id: 't2',
      alunoId: '2',
      treino: [
        {
          id: 't2a',
          nome: 'A',
          exercicios: [
            { id: 'e6', nome: 'Cadeira Extensora', repeticoes: 12, series: 4 },
            { id: 'e7', nome: 'Leg Press', repeticoes: 10, series: 4 },
            { id: 'e20', nome: 'Elevação Lateral', repeticoes: 15, series: 3 }
          ]
        },
        {
          id: 't2b',
          nome: 'B',
          exercicios: [
            { id: 'e8', nome: 'Pull Up', repeticoes: 8, series: 3 },
            { id: 'e9', nome: 'Tríceps Testa', repeticoes: 10, series: 3 },
            { id: 'e21', nome: 'Stiff', repeticoes: 10, series: 4 }
          ]
        },
        {
          id: 't2c',
          nome: 'C',
          exercicios: [
            { id: 'e10', nome: 'Flexão de Braços', repeticoes: 15, series: 3 },
            { id: 'e22', nome: 'Desenvolvimento Arnold', repeticoes: 8, series: 4 },
            { id: 'e23', nome: 'Puxada Frontal', repeticoes: 10, series: 3 }
          ]
        }
      ]
    },
    {
      id: 't3',
      alunoId: '3',
      treino: [
        {
          id: 't3a',
          nome: 'A',
          exercicios: [
            { id: 'e11', nome: 'Stiff', repeticoes: 10, series: 4 },
            { id: 'e12', nome: 'Rosca Inversa', repeticoes: 12, series: 3 },
            { id: 'e24', nome: 'Agachamento Frontal', repeticoes: 10, series: 3 }
          ]
        },
        {
          id: 't3b',
          nome: 'B',
          exercicios: [
            { id: 'e13', nome: 'Desenvolvimento Arnold', repeticoes: 8, series: 4 },
            { id: 'e14', nome: 'Puxada Frente', repeticoes: 10, series: 3 },
            { id: 'e25', nome: 'Supino Inclinado', repeticoes: 12, series: 3 }
          ]
        },
        {
          id: 't3c',
          nome: 'C',
          exercicios: [
            { id: 'e15', nome: 'Elevação Lateral', repeticoes: 15, series: 3 },
            { id: 'e26', nome: 'Rosca Martelo', repeticoes: 12, series: 3 },
            { id: 'e27', nome: 'Abdominal Supra', repeticoes: 20, series: 3 }
          ]
        }
      ]
    }
  ];

// Vetor de Exercícios
let exercicios = [
    { id: 'e1', nome: 'Supino Reto' },
    { id: 'e2', nome: 'Agachamento Livre' },
    { id: 'e3', nome: 'Remada Curvada' },
    { id: 'e4', nome: 'Desenvolvimento de Ombros' },
    { id: 'e5', nome: 'Rosca Direta' },
    { id: 'e6', nome: 'Leg Press' },
    { id: 'e7', nome: 'Pull Up' },
    { id: 'e8', nome: 'Stiff' },
    { id: 'e9', nome: 'Puxada Frente' },
    { id: 'e10', nome: 'Elevação Lateral' },
];

// Método GET para Enviar Exercícios
app.get('/exercicios', (req, res) => {
    res.status(200).json(exercicios);
});

  
var alunosDeletados = 0;

// Rotas para Alunos

// GET - Listar todos os alunos
app.get('/alunos', (req, res) => {
    res.json(alunos);
});

// GET - Alunos por id
app.get('/alunos/:id', (req, res) => {
    const id = req.params.id; // Obter o ID da URL
    const aluno = alunos.find(a => a.id === id); // Encontrar o personal pelo ID
    if (aluno) {
        res.send(aluno); // Retornar o personal encontrado
    } else {
        res.status(404).json({ message: 'Personal não encontrado.' }); // Retornar erro 404 se não encontrado
    }
});

// POST - Matricular novo aluno
app.post('/alunos', (req, res) => {
    const novoAluno = req.body;
    novoAluno['id'] = (alunos.length + alunosDeletados + 1).toString(); // Gerar um ID simples
    alunos.push(novoAluno);
    //console.log(novoAluno);
    res.status(201).json({ message: 'Aluno matriculado com sucesso!', id: novoAluno['id'] });
});

// PUT - Atualizar informações de um aluno
app.put('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);

    if (alunoIndex !== -1) {
        alunos[alunoIndex] = { ...alunos[alunoIndex], ...req.body };
        res.json({ message: 'Aluno atualizado com sucesso!', aluno: alunos[alunoIndex] });
    } else {
        res.status(404).json({ message: 'Aluno não encontrado.' });
    }
});

// DELETE - Remover um aluno
app.delete('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    alunos = alunos.filter(aluno => aluno.id !== id);
    alunosDeletados += 1;
    res.json({ message: 'Aluno removido com sucesso!' });
});

// GET - Listar todos os personais
app.get('/personais', (req, res) => {
    res.send(personais);
});  

app.get('/personais/:id', (req, res) => {
    const id = req.params.id; // Obter o ID da URL
    const personal = personais.find(personal => personal.id === id); // Encontrar o personal pelo ID
    if (personal) {
        res.send(personal); // Retornar o personal encontrado
    } else {
        res.status(404).json({ message: 'Personal não encontrado.' }); // Retornar erro 404 se não encontrado
    }
});


// POST - Registrar novo personal
app.post('/personais', (req, res) => {
    const novoPersonal = req.body;
    novoPersonal.id = personais.length + 1; // Gerar um ID simples
    personais.push(novoPersonal);
    res.status(201).json({ message: 'Personal registrado com sucesso!', personal: novoPersonal });
});

// PUT - Atualizar informações de um personal
app.put('/personais/:id', (req, res) => {
    const id = req.params.id; // Mantém o id como string
    const personalIndex = personais.findIndex(personal => personal.id === id); // Compara como string
   
    if (personalIndex !== -1) {
        //console.log(personais[personalIndex]);
        personais[personalIndex] = { ...personais[personalIndex], ...req.body };
        //console.log(personais[personalIndex]);
        res.json({ message: 'Personal atualizado com sucesso!', personal: personais[personalIndex] });
    } else {
        res.status(404).json({ message: 'Personal não encontrado.' });
    }
});

// Método GET para buscar treino pelo ID
app.get('/treinos/:id', (req, res) => {
    const id = req.params.id; // Obter o ID da URL
    const treino = treinos.find(treino => treino.id === id); // Encontrar o treino pelo ID
    if (treino) {
      res.send(treino); // Retornar o treino encontrado
    } else {
      res.status(404).json({ message: 'Treino não encontrado.' }); // Retornar erro 404 se não encontrado
    }
  });

  app.post('/treinos', (req, res) => {
    const novoTreino = req.body;
    novoTreino['id'] = 't' + (treinos.length + 1).toString(); // Gerar um ID simples
    treinos.push(novoTreino);
    const aluno = alunos.find(a => a.id === novoTreino['alunoId']); // Encontrar o aluno pelo ID
    if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado.' }); // Retornar erro 404 se o aluno não for encontrado
    } else {
        aluno['treino'] = novoTreino['id'];
        const alunoIndex = alunos.findIndex(a => a.id === novoTreino['alunoId']);
        
        if (alunoIndex !== -1) {
            alunos[alunoIndex] = aluno;
        }
        console.log(alunos);
        
        res.status(201).json({ message: 'Treino cadastrado com sucesso!'});
    }
    
});


// DELETE - Remover um personal
app.delete('/personais/:id', (req, res) => {
    const id = parseInt(req.params.id);
    personais = personais.filter(personal => personal.id !== id);
    res.json({ message: 'Personal removido com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
