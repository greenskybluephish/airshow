import { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from "react";
import {
  colors,
  fontSizes,
  Heading,
  Text,
  typestyles,
} from "./components/Text";
import type { Colors, FontSizes } from "./components/Text";
import "./App.css";
import { useLocalStorage } from "./useStorage";

const wordArray = [
  "hello",
  "world",
  "break",
  "taken",
  "oozes",
  "quite",
  "sport",
];

interface Record {
  wins: number;
  losses: number;
  total: number;
}

function Wordle() {
  const [record, setRecord] = useLocalStorage<Record>("wordle", {
    total: 0,
    wins: 0,
    losses: 0,
  });
  const [word, setWord] = useState<string>();
  const [activeRow, setActiveRow] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showFailure, setShowFailure] = useState<boolean>(false);

  const setNewWord = () => {
    setRecord({ ...record, total: record.total + 1 });
    const num = Math.floor(Math.random() * wordArray.length);
    setWord(wordArray[num]);
  };

  const onComplete = (solved: boolean) => {
    if (solved) {
      setRecord({ ...record, wins: record.wins + 1 });
      setShowSuccess(true);
      setActiveRow(10);
    } else if (word && word.length - 1 > activeRow) {
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
    setWord('');
  };

  useEffect(() => {
    if(!word) {
      setNewWord();
    }
  },[word])

  return (
    <div className="App">
      <div className="container">
      <h1>Birdle</h1>
        {showSuccess && "Success"}
        {showFailure && "Failure"}
        <div className="grid">
          {!word ? (
            <div>
              <button className="reset" onClick={setNewWord}>Start</button>
            </div>
          ) : (
            [...Array(6).keys()].map((num) => (
              <Row
                key={num}
                active={activeRow === num}
                answerWord={word}
                onComplete={onComplete}
                rowNumber={num}
              />
            ))
          )}
        </div>

       {word &&  
        <div className='buttonBox'>
        <button className="reset" onClick={reset}>Reset</button>
      </div>}
        <div className="topBox">
        <p className="stats">Total Games Started: {record.total} </p>
        <p className="stats">Wins: {record.wins} </p>
        <p className="stats">Losses: {record.losses} </p>
      </div>

      </div>

    </div>
  );
}

export default Wordle;

export interface InputProps {
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  setInputRef: (node: HTMLInputElement, key: number) => void;
  setFocused: () => void;
  index: number;
  state?: "green" | "yellow" | "default";
  show?: boolean;
  tabIndex?: number;
  // correctValue: string;
}

export const InputSquare = (props: InputProps): JSX.Element => {
  const { index, setInputRef, state = "default" } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setInputRef(inputRef.current, index);
    }
  }, [index]);

  return (
    <div style={props.style} className={`${props.state} square`}>
      <input
        type={"text"}
        className={`${props.className} input`}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        onBlur={props.onBlur}
        ref={inputRef}
        max={1}
        onFocus={props.setFocused}
        tabIndex={props.tabIndex}
      />
    </div>
  );
};

interface RowProps {
  answerWord: string;
  active: boolean;
  onComplete: (solved: boolean) => void;
  rowNumber: number;
  // children: ReactNode;
}

export const Row = (props: RowProps) => {
  const { answerWord } = props;
  const [userGuess, setUserGuess] = useState<Array<string>>(
    [...Array(answerWord.length)].map((num) => "")
  );
  const [activeInput, setActiveInput] = useState<number>(0);
  const buttonsRefs = useRef<Array<HTMLInputElement | null>>([]);
  const tabIndex = userGuess.findIndex((val) => val === "");
  const tabCheck = tabIndex < 0 ? answerWord.length - 1 : tabIndex;
  const tab = props.active ? tabCheck : -1;
  const showHints = !!userGuess.filter(Boolean).length && !props.active;

  useEffect(() => {
    if (props.active) {
      // Focus menu item when navigating with keyboard
      buttonsRefs.current[activeInput]?.focus();
    }
  }, [activeInput, props.active]);

  const setFocused = (i: number) => {
    setActiveInput(i);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    // event.preventDefault();
    const key = event.key;

    const newUserGuess = [...userGuess];

    switch (key) {
      case "Backspace":
        newUserGuess[index] = "";
        setUserGuess(newUserGuess);
        if (activeInput > 0) {
          setActiveInput(activeInput - 1);
        }
        break;
      case "Enter":
        if (userGuess.filter(Boolean).length === userGuess.length) {
          props.onComplete(userGuess.join("") === props.answerWord);
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    event.preventDefault();
    const val = event.currentTarget.value;
    if (val.length !== 1) {
      return;
    }
    const newUserGuess = [...userGuess];
    if (val.match(/^[A-Za-z]+$/)) {
      newUserGuess[index] = val;
      setUserGuess(newUserGuess);
      if (activeInput < props.answerWord.length - 1) {
        setActiveInput(activeInput + 1);
      }
    }
  };

  const setInputRef = (node: HTMLInputElement, key: number) => {
    buttonsRefs.current[key] = node;
  };

  const state = (index: number) => {
    if (userGuess[index] === props.answerWord[index]) {
      return "green";
    }

    if (Array.from(props.answerWord).some((letter) => letter === userGuess[index])) {
      return "yellow";
    }
    return "default";
  };

  return (
    <>
      <div className="divider"></div>
      <div className="letterGrid">
        {Array.from(props.answerWord).map((letter, i) => (
          <InputSquare
            readOnly={!props.active || i !== activeInput}
            setInputRef={setInputRef}
            key={i}
            value={userGuess[i]}
            index={i}
            state={showHints ? state(i) : "default"}
            show={showHints}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onChange={(e) => handleChange(e, i)}
            setFocused={() => setFocused(i)}
            tabIndex={i === tab ? 0 : -1}
          />
        ))}
      </div>
    </>
  );
};
