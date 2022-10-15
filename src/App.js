import './App.css';

function App() {
  return (
    <div className="calculator-grid">
      <div className='calculator_output'>
          <div className='previous_oprand'>
              123+
          </div>
          <div className='current_oprand'>
            123
          </div>
      </div>
          <button className='span2'>AC</button>
          <button>DEL</button>
          <button>÷</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>*</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>+</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>-</button>
          <button>.</button>
          <button>0</button>
          <button className='span2'>=</button>
    
    </div>
  );
}

export default App;
