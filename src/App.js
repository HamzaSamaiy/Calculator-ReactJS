import { useReducer } from 'react';
import './App.css';
import Digit from './components/Digit/Digit';
import Operation from './components/Operation/Operation';

export const Actions={
  Add_digit:'add_digit',
  Choose_operation:'choose-operation',
  Clear:'clear',
  Delete_digit:'delete-digit',
  Evaluate:'evaluate'
}

function reducer(state, {type, payload}){
  switch(type){

    //Case 1
    case Actions.Add_digit:
      if(state.overwrite){
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false
        }
      }
      if(payload.digit === '.' && state.currentOperand==null) {return state} 
      if(payload.digit === "0" && state.currentOperand === "0") {return state}
      if(payload.digit === '.' && state.currentOperand.includes('.')) {return state} 
      return{
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }

    //Case2
      case Actions.Clear:
        return {}

    //Case3
      case Actions.Choose_operation:
        if (state.currentOperand == null && state.previousOperand ==null)
        {
          return null
        }

        if(state.currentOperand==null){
          return{
            ...state,
            operation:payload.operation,
          }
        }

        if (state.previousOperand==null){
          return{
            ...state,
            operation:payload.operation,
            previousOperand:`${state.currentOperand}`,
            currentOperand:null
          }
        }

        return{
          ...state,
          previousOperand:evaluate(state),
          currentOperand:null,
        }

      //Case4 =
      case Actions.Evaluate:
        if(state.operation == null || state.currentOperand ==null || state.previousOperand ==null){return state}
        return {
          ...state,
          previousOperand:null,
          operation:null,
          currentOperand:evaluate(state),
          overwrite:true,
        }
      
      //Case 5 Delete
      case Actions.Delete_digit:
        if(state.overwrite==true){
          return {
            ...state,
            overwrite:false,
            currentOperand:null,
          }
        }

          if(state.currentOperand == null){return state}
          if(state.currentOperand.length===1){
            return {
              ...state,
              currentOperand:null,
            }
          }

          return {
            ...state,
            currentOperand:state.currentOperand.slice(0,-1)
          }
        

  }
}


function evaluate({operation, currentOperand, previousOperand}){
  const previous=parseFloat(previousOperand);
  const current=parseFloat(currentOperand);
  if(isNaN(previous) || isNaN(current)){return ''}

  let computation=''

  switch(operation){
    case '+':
      computation=previous+current
      break
    case '-':
      computation=previous-current
      break
    case '*':
      computation=previous*current
      break
    case '÷':
      if(current === 0){
        return computation='Can not make division on zero';
        break
      }
      else{
        computation=previous+current
        break
      }
      
  }

  return computation.toString()
}


const Integer_Formater=new Intl.NumberFormat('en-us',{
  maximumFractionDigits:0,

})
function format_operand(operand){
  if(operand==null)return 
  const[integer,decimal]=operand.split('.')
  if(decimal==null)return Integer_Formater.format(integer)
  return `${Integer_Formater.format(integer)}.${decimal}`
  
  
}
function App() {
  const [{currentOperand,previousOperand, operation}, dispatch] = useReducer(reducer,{})
  return (
    <>
    <div className="calculator-grid">
      <div className='calculator_output'>
          <div className='previous_oprand'>
              {format_operand(previousOperand)} {operation}
          </div>
          <div className='current_oprand'>
            {format_operand(currentOperand)}
          </div>
      </div>
          <button className='span2' onClick={()=>dispatch({type:Actions.Clear})}>AC</button>
          <button onClick={()=>dispatch({type:Actions.Delete_digit})}>DEL</button>
          <Operation dispatch={dispatch} operation="÷" />
          <Digit dispatch={dispatch} digit={'1'}/>
          <Digit dispatch={dispatch} digit={'2'} />
          <Digit dispatch={dispatch} digit={'3'} />
          <Operation dispatch={dispatch} operation="*" />
          <Digit dispatch={dispatch} digit={'4'}/>
          <Digit dispatch={dispatch} digit={'5'} />
          <Digit dispatch={dispatch} digit={'6'} />
          <Operation dispatch={dispatch} operation="+" />
          <Digit dispatch={dispatch} digit={'7'}/>
          <Digit dispatch={dispatch} digit={'8'} />
          <Digit dispatch={dispatch} digit="9" />
          <Operation dispatch={dispatch} operation="-" />
          <Digit dispatch={dispatch} digit="." />
          <Digit dispatch={dispatch} digit="0" />
          <button className='span2' onClick={()=>dispatch({type:Actions.Evaluate})}>=</button>
          
          
    </div>
    <div className='madeby'>
    <a href='https://www.linkedin.com/in/hamza-samaiy/' target='_blank'> Made by ---> Hamza Samaiy</a>
 </div>
 </>
  );
}

export default App;
