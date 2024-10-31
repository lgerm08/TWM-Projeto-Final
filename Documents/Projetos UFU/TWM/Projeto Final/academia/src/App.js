import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Home from './components/Home'
import {Routes, Route} from 'react-router-dom';
import Matricula from './components/Matricula';
import Cadastro from './components/Cadastro';
import ListaPersonais from './components/ListaPersonais';
import Alunos from './components/Alunos';
import DetalhesAluno from './components/DetalhesAluno';
import CadastroTreino from './components/Treino';
function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/matricula' element={<Matricula />}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/personais' element={<ListaPersonais/>}/>
        <Route path="/editar/:id" element={<Cadastro />} /> 
        <Route path="/alunos" element={<Alunos/>}/>
        <Route path='/detalhes/:id' element={<DetalhesAluno />}/>
        <Route path='/treino/:id' element={<CadastroTreino />}/>
      </Routes>
    </>
  );
}

export default App;
