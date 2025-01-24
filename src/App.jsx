import React, { useState } from 'react';
import { Equal, X, Divide, Minus, Plus, RefreshCw } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

  const handleNumber = (num) => {
    if (evaluated) {
      setDisplay(num);
      setFormula(num);
      setEvaluated(false);
    } else {
      if (display === '0') {
        setDisplay(num);
        setFormula(num);
      } else {
        setDisplay(display + num);
        setFormula(formula + num);
      }
    }
  };

  const handleOperator = (op) => {
    setEvaluated(false);
    if (op === '-' && (formula === '' || isOperator(formula.slice(-1)))) {
      setDisplay(op);
      setFormula(formula + op);
    } else if (isOperator(formula.slice(-1)) && isOperator(formula.slice(-2, -1))) {
      setFormula(formula.slice(0, -2) + op);
    } else if (isOperator(formula.slice(-1))) {
      setFormula(formula.slice(0, -1) + op);
    } else {
      setFormula(formula + op);
    }
    setDisplay(op);
  };

  const handleDecimal = () => {
    if (evaluated) {
      setDisplay('0.');
      setFormula('0.');
      setEvaluated(false);
    } else {
      if (!display.includes('.')) {
        setDisplay(display + '.');
        setFormula(formula + '.');
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
    setEvaluated(false);
  };

  const handleEquals = () => {
    if (!formula) return;
    
    try {
      // Using Function constructor to safely evaluate the mathematical expression
      const result = Number(new Function('return ' + formula)());
      const formattedResult = Number.isInteger(result) 
        ? result.toString()
        : result.toFixed(4).replace(/\.?0+$/, '');
      
      setDisplay(formattedResult);
      setFormula(formattedResult);
      setEvaluated(true);
    } catch (error) {
      setDisplay('Error');
      setFormula('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-xs">
        <div className="bg-gray-700 p-4 rounded-xl mb-4 text-right">
          <div className="text-gray-400 text-sm h-6 mb-1">{formula || '0'}</div>
          <div id="display" className="text-white text-3xl font-bold truncate">{display}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <button
            id="clear"
            onClick={handleClear}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex items-center justify-center transition-colors"
          >
            <RefreshCw size={20} className="mr-2" />
            Clear
          </button>
          <button
            id="divide"
            onClick={() => handleOperator('/')}
            className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg flex items-center justify-center transition-colors"
          >
            <Divide size={20} />
          </button>
          <button
            id="multiply"
            onClick={() => handleOperator('*')}
            className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
          
          {[7, 8, 9].map((num) => (
            <button
              key={num}
              id={['seven', 'eight', 'nine'][num - 7]}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-lg transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            id="subtract"
            onClick={() => handleOperator('-')}
            className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg flex items-center justify-center transition-colors"
          >
            <Minus size={20} />
          </button>
          
          {[4, 5, 6].map((num) => (
            <button
              key={num}
              id={['four', 'five', 'six'][num - 4]}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-lg transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            id="add"
            onClick={() => handleOperator('+')}
            className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg flex items-center justify-center transition-colors"
          >
            <Plus size={20} />
          </button>
          
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              id={['one', 'two', 'three'][num - 1]}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-lg transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            id="equals"
            onClick={handleEquals}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg flex items-center justify-center transition-colors"
          >
            <Equal size={20} />
          </button>
          
          <button
            id="zero"
            onClick={() => handleNumber('0')}
            className="col-span-2 bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-lg transition-colors"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={handleDecimal}
            className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-lg transition-colors"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;