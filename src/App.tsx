import { useEffect, useState, useCallback } from "react"
import words from './wordList.json'
import {HangmanDrawing} from './HangmanDrawing'
import {HangmanWord} from './HangmanWord'
import {Keyboard} from './Keyboard'

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  // For the initial value of the wordToGuess, pick a random word from the list
  // The function in useState is only called once when the component is first rendered
  const [wordToGuess, setWordToGuess] =  useState<string>(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split('').every(letter =>  guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  // Hook when using actual keyboard, not virtual keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  // Hook to allow hitting Enter to restart the game with a new word
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== 'Enter') return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  console.log(wordToGuess)
  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}
    >
      <div style={{fontSize:"2rem", textAlign:"center"}}>
        {isWinner && 'Winner! - Refresh to try another word'}
        {isLoser && 'Nice Try - Refresh to try again'}
      </div>
      <HangmanDrawing failedGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
      <div style={{alignSelf: "stretch"}} >
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
