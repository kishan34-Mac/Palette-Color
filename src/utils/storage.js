const RESULT_KEY = 'palette_result'
const ANSWERS_KEY = 'palette_answers'

export function saveResult(result, answers) {
  try {
    localStorage.setItem(RESULT_KEY, JSON.stringify(result))
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers))
  } catch (e) {
    // localStorage may be unavailable
  }
}

export function loadResult() {
  try {
    const saved = localStorage.getItem(RESULT_KEY)
    const savedAnswers = localStorage.getItem(ANSWERS_KEY)
    if (saved && savedAnswers) {
      return { result: JSON.parse(saved), answers: JSON.parse(savedAnswers) }
    }
  } catch (e) {
    // localStorage may be unavailable
  }
  return null
}

export function clearResult() {
  try {
    localStorage.removeItem(RESULT_KEY)
    localStorage.removeItem(ANSWERS_KEY)
  } catch (e) {
    // localStorage may be unavailable
  }
}
