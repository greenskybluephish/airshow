import { Button, SimpleGrid } from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import { initialWordArray } from "../pages/Wordle";
import { InputSquare } from "./Square";

interface RowProps {
  answerWord: string[];
  active: boolean;
  onComplete: (solved: boolean) => void;
  rowNumber: number;
  inputClassName: string;
  // children: ReactNode;
}

export const Row = (props: RowProps) => {
  const { answerWord } = props;
  const [userGuess, setUserGuess] = useState<string[]>(
    initialWordArray(answerWord.length)
  );
  const [activeInput, setActiveInput] = useState<number>(0);
  const buttonsRefs = useRef<Array<HTMLInputElement | null>>([]);
  const tabIndex = userGuess.findIndex((val) => val === "");
  const tabCheck = tabIndex < 0 ? answerWord.length - 1 : tabIndex;
  const tab = props.active ? tabCheck : -1;
  const showHints = !!userGuess.filter(Boolean).length && !props.active;

  const validGuess = userGuess.filter(Boolean).length === userGuess.length;

  useEffect(() => {
    setUserGuess(initialWordArray(answerWord.length));
  }, [answerWord]);

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
        if (newUserGuess[index] !== "") {
          newUserGuess[index] = "";
          setUserGuess(newUserGuess);
        } else {
          newUserGuess[index - 1] = "";
          setUserGuess(newUserGuess);
          if (activeInput > 0) {
            setActiveInput(activeInput - 1);
          }
        }

        break;
      case "Enter":
        if (userGuess.filter(Boolean).length === userGuess.length) {
          props.onComplete(userGuess.join("") === props.answerWord.join(""));
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
    let val = event.currentTarget.value;
    if (val.length > 1) {
      val = val[val.length - 1];
    }
    const newUserGuess = [...userGuess];
    if (val.match(/^[A-Za-z]+$/)) {
      newUserGuess[index] = val;
      setUserGuess(newUserGuess);
      if (activeInput < answerWord.length - 1) {
        setActiveInput(activeInput + 1);
      }
    }
  };

  const setInputRef = (node: HTMLInputElement, key: number) => {
    buttonsRefs.current[key] = node;
  };

  const checkRow = () => {
    props.onComplete(userGuess.join("") === props.answerWord.join(""));
  };

  const state = (index: number) => {
    if (userGuess[index] === props.answerWord[index]) {
      return "green";
    }

    if (props.answerWord.includes(userGuess[index])) {
      return "yellow";
    }
    return "grey";
  };

  return (
    <>
      <SimpleGrid
        breakpoints={[
          { maxWidth: "md", cols: 5, spacing: 12 },
          { maxWidth: "sm", cols: 5, spacing: 8 },
          { maxWidth: "xs", cols: 5, spacing: 4 },
        ]}
        spacing={16}
        cols={5}
      >
        {answerWord.map((letter, i) => (
          <InputSquare
            className={props.inputClassName}
            readOnly={i !== activeInput}
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
            disabled={!props.active || i > tabCheck}
          />
        ))}
      </SimpleGrid>
      {props.active && validGuess && (
        <Button fullWidth onClick={checkRow}>
          Check answer
        </Button>
      )}
    </>
  );
};
