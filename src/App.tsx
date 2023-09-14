import { useState, useEffect } from "react";
import dice from "./assets/icon-dice.svg";
import "./scss/_advice.scss";

const API_URL = "https://api.adviceslip.com/advice";

function AdviceGenerator() {
  const [advice, setAdvice] = useState<string>("");
  const [id, setId] = useState<string | number>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const generateAdvice = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Unable to fetch data.`);
      }

      const data = await response.json();
      const dataAdvice = `"${data.slip.advice}"`;
      setId(data.slip.id);
      setAdvice(dataAdvice);
      setError(null);
    } catch (error) {
      setError(`${error}`);
    } finally {
      setLoading(false);
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
      <p className="advice-id">
        {loading ? "LOADING..." : error ? "404" : `ADVICE #${id}`}
      </p>
      <p className="advice">{error ? error : advice}</p>
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
