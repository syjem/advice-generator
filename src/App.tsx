import React, { useEffect } from "react";
import dice from "./assets/icon-dice.svg";
import "./scss/_advice.scss";

function AdviceGenerator() {
  const [advice, setAdvice] = React.useState<null | string>(null);
  const [id, setId] = React.useState<null | number>(null);

  const generateAdvice = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");

      if (!response.ok) {
        throw new Error("Unable to fetch advice at the moment.");
      }
      const data = await response.json();
      setId(data.slip.id);
      setAdvice(data.slip.advice);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    generateAdvice();
  }, []);

  const handleButtonClick = () => {
    generateAdvice();
  };

  return (
    <>
      <p className="advice-id">ADVICE #{id}</p>
      <p className="advice">"{advice}"</p>
      <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
          <g transform="translate(138)" fill="#CEE3E9">
            <rect width="6" height="16" rx="3" />
            <rect x="14" width="6" height="16" rx="3" />
          </g>
        </g>
      </svg>
      <button type="button" onClick={handleButtonClick} title="Random Advice">
        <img src={dice} alt="Dice icon" />
      </button>
    </>
  );
}

export default AdviceGenerator;
