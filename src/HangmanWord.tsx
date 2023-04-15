type HangmanWordProps = {
  wordToGuess: string,
  guessedLetters: string[],
  reveal?: boolean
}
export function HangmanWord({wordToGuess, guessedLetters, reveal = false}: HangmanWordProps) {
  return (
    <div style={{
      display: "flex",
      gap: ".25em",
      fontSize:"6rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontFamily: "Arial",
    }}>
      {wordToGuess.split('').map((letter, index) => (
          <span style={{display: "flex", justifyContent: "center", borderBottom: ".1em solid black", width: "70px"}} key={index}>
            <span style={{
              visibility: guessedLetters.includes(letter) || reveal
                ? "visible"
                : "hidden",
              color: !guessedLetters.includes(letter)  && reveal
                ? 'red'
                : 'black'
            }}>
              {letter}
            </span>
          </span>
      ))}
    </div>
  )
}