import { evaluate } from "mathjs";
import React, { useState } from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => (
  <button
    className="bg-blue-500 p-4 text-xl rounded-md w-full hover:bg-red-600 transition duration-300 border-2 border-black"
    onClick={onClick}
  >
    {label}
  </button>
);

function Calculator() {
  const [results, setResults] = useState<number>(0);
  const [input, setInput] = useState<string>("");

  const handleNumberClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleOperatorClick = (operator: string) => {
    if (isLastCharsRepeatOperator(operator, 1)) {
      setInput("Nan");
      return;
    }

    if(input.endsWith("+") || input.endsWith("-") || input.endsWith("*") || input.endsWith("/") ) return  setInput("Nan")

    if (input !== "") {
      setInput((prevInput) => prevInput + operator);
    }
  };

  const isLastCharsRepeatOperator = (operator: string, n: number) => {
    const repeatOperator = operator.repeat(n);
    const lastChars = input.slice(-n);
    return lastChars === repeatOperator;
  };

  const handleClearClick = () => {
    setInput("");
    setResults(0);
  };

  const handleResultClick = () => {
    if (input !== "") {
      const calculatedResult = evaluate(input);
      setResults(calculatedResult);
      setInput(calculatedResult.toLocaleString());
    } else {
      setResults(0);
      setInput("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Calculadora</h1>
        <input
          className="border-2 border-gray-400 rounded-md px-2 py-1 w-full text-lg mb-4"
          type="text"
          placeholder="2 + 2"
          value={input}
          onChange={handleChange}
        />
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Button label="7" onClick={() => handleNumberClick("7")} />
          <Button label="8" onClick={() => handleNumberClick("8")} />
          <Button label="9" onClick={() => handleNumberClick("9")} />
          <Button label="del" onClick={handleClearClick} />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Button label="4" onClick={() => handleNumberClick("4")} />
          <Button label="5" onClick={() => handleNumberClick("5")} />
          <Button label="6" onClick={() => handleNumberClick("6")} />
          <Button label="+" onClick={() => handleOperatorClick("+")} />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Button label="1" onClick={() => handleNumberClick("1")} />
          <Button label="2" onClick={() => handleNumberClick("2")} />
          <Button label="3" onClick={() => handleNumberClick("3")} />
          <Button label="-" onClick={() => handleOperatorClick("-")} />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Button label="." onClick={() => handleOperatorClick(".")} />
          <Button label="0" onClick={() => handleNumberClick("0")} />
          <Button label="/" onClick={() => handleOperatorClick("/")} />
          <Button label="*" onClick={() => handleOperatorClick("*")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button label="Reset" onClick={handleClearClick} />
          <Button label="=" onClick={handleResultClick} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
