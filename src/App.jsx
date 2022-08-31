import { useState } from 'react';
import { useReducer } from 'react';
import './App.css'

const initialFormState={
  name: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
}
const initialValue ={
  message: '',
  messageClassName: '',
  isLoading: false,
}

function reducer(state, action){
  switch (action.type) {
    case 'LOADING':
      return{
        ...state,
        isLoading: true,
        message: "Carregando, por favor aguarde!"
      }
      case 'SUCCESS':
        return{
          ...state,
          isLoading: false,
          message: "Mensagem enviada com sucesso!",
          messageClassName: "message--success",
        }
        
      
      default:
        return state;
  }
}

function App() {
  const[state, dispatch] = useReducer(reducer, initialValue);
  const [form, setForm] = useState(initialFormState);
  const {message, messageClassName, isLoading} = state

  function onChange(newValue){
    setForm(form =>({...form, ...newValue}))
  }
  function onSubmit(event){
    event.preventDefault();
    dispatch({type: 'LOADING'});
    setTimeout(() => {
      dispatch({type: 'SUCCESS'});
      console.log(form);
    },500)
  }
  
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        {message && <p className={`message ${messageClassName}` }>{message}</p>}
        <label>Nome</label>
        <input 
        type="text" 
        id="firstName"
         name="firstName"
         onChange={e => onChange({name: e.target.value})}/>
        <label>Sobrenome</label>
        <input 
        type="text" 
        id="lastName"
         name="lastName"
         onChange={e => onChange({lastName: e.target.value})}/>
        <label>Email</label>
        <input 
        type="email" 
        id="email" 
        name="email"
        onChange={e => onChange({email: e.target.value})}/>
        <label>Assunto</label>
        <input 
        type="text" 
        id="subject" 
        name="subject"
        onChange={e => onChange({subject: e.target.value})}/>
        <label>Mensagem</label>
        <textarea 
        type="text" 
        id="message" 
        name="messge"
        onChange={e => onChange({message: e.target.value})}/>
        <button type="submit" disabled={isLoading}>Enviar</button>
      </form>
    </div>
  )
}

export default App
