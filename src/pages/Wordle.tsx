import { useEffect, useState } from "react";
import "../App.css";
import { useLocalStorage } from "../useStorage";
import { fiveLetters } from "../data";
import { Row } from "../components/Row";
import { Button, Space, Text } from "@mantine/core";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface Record {
  wins: number;
  losses: number;
  total: number;
}

const fontSize = ["inputText", "smallText", "smallestText"];

export const defaultWordLength = 5;
export const numberOfRows = 6;

export const initialWordArray = (wordLength: number) =>
  [...Array(wordLength).keys()].map((num) => "");

export function Wordle() {
  const [record, setRecord] = useLocalStorage<Record>("wordle", {
    total: 0,
    wins: 0,
    losses: 0,
  });
  const [word, setWord] = useState<string[]>(
    initialWordArray(defaultWordLength)
  );
  const [activeRow, setActiveRow] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showFailure, setShowFailure] = useState<boolean>(false);
  const [inputText, setInputText] = useState(0);

  const setNewWord = () => {
    setRecord({ ...record, total: record.total + 1 });
    const num = Math.floor(Math.random() * fiveLetters.length);
    setWord(Array.from(fiveLetters[num]));
    console.log(fiveLetters[num]);
  };

  const onRowComplete = (solved: boolean) => {
    if (solved) {
      setRecord({ ...record, wins: record.wins + 1 });
      setShowSuccess(true);
      setActiveRow(10);
    } else if (numberOfRows - 1 > activeRow) {
      setActiveRow(activeRow + 1);
    } else {
      setRecord({ ...record, losses: record.losses + 1 });
      setShowFailure(true);
    }
  };

  const reset = () => {
    setShowFailure(false);
    setShowSuccess(false);
    setActiveRow(0);
    setNewWord();
  };

  useEffect(() => {
    setNewWord();
  }, []);

  return (
    <>
      {showSuccess && "Success"}
      {showFailure && "Failure"}
      {word && (
        <div className="grid">
          {[...Array(numberOfRows).keys()].map((letter, num) => (
            <Row
              key={num}
              active={activeRow === num}
              answerWord={word}
              onComplete={onRowComplete}
              rowNumber={num}
            />
          ))}
        </div>
      )}
      <Space h="lg"></Space>
      <div className="buttonBox">
        <Button size="xl" color="indigo" onClick={reset}>
          Reset
        </Button>
        <div className="pad"></div>
        {/* <Keyboard
        onChange={()=>{}}
        onKeyPress={()=>{}}
      /> */}
      </div>
    </>
  );
}
