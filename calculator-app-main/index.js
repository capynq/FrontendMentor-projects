const themeSelector = document.getElementById('themeSelector')
const calcBut = document.getElementsByClassName('num')
const output = document.querySelector('h1')
const operationsList = document.querySelector('h2')
let currentInput = '0'
let previousInput = null
let operator = null
let waitingForNewInput = false
let expression = ''

function updateDisplay() {
  output.innerHTML = currentInput
  operationsList.innerHTML = expression
}

function enteringNumber() {
  for (let i = 0; i < calcBut.length; i++) {
    calcBut[i].addEventListener('click', function () {
      let val = calcBut[i].innerText

      if (val === '.') {
        if (currentInput.includes('.')) return
        if (waitingForNewInput) {
          currentInput = '0.'
          waitingForNewInput = false
        } else {
          currentInput += '.'
        }
      } else {
        if (waitingForNewInput || currentInput === '0') {
          currentInput = val
          waitingForNewInput = false
        } else {
          currentInput += val
        }
      }

      updateDisplay()
    })
  }
}

function deleteNum() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1)
  } else {
    currentInput = '0'
  }
  updateDisplay()
}

function reset() {
  currentInput = '0'
  previousInput = null
  operator = null
  waitingForNewInput = false
  expression = ''
  updateDisplay()
}

function operation(op) {
  const current = parseFloat(currentInput)

  if (previousInput === null) {
    previousInput = current
    expression = currentInput + ' ' + op
  } else if (operator && !waitingForNewInput) {
    const result = calculate(previousInput, current, operator)
    if (result === null) {
      reset()
      return
    }
    currentInput = formatResult(result)
    previousInput = result
    expression = currentInput + ' ' + op
  } else {
    expression = currentInput + ' ' + op
    previousInput = current
  }

  operator = op
  waitingForNewInput = true
  updateDisplay()
}

function result() {
  if (operator && previousInput !== null && !waitingForNewInput) {
    const current = parseFloat(currentInput)
    const result = calculate(previousInput, current, operator)

    if (result === null) {
      reset()
      return
    }

    expression = previousInput + ' ' + operator + ' ' + currentInput + ' ='
    currentInput = formatResult(result)
    previousInput = null
    operator = null
    waitingForNewInput = true
    updateDisplay()
  }
}

function calculate(prev, current, op) {
  switch (op) {
    case '+':
      return prev + current
    case '-':
      return prev - current
    case '*':
      return prev * current
    case '/':
      if (current === 0) return null
      return prev / current
    default:
      return null
  }
}

function formatResult(result) {
  if (!isFinite(result)) return 'Error'
  if (Number.isInteger(result)) return result.toString()
  return parseFloat(result.toFixed(10)).toString()
}

function toggleTheme(themeValue) {
  const root = document.documentElement
  if (themeValue === '1') root.setAttribute('data-theme', 'default')
  else if (themeValue === '2') root.setAttribute('data-theme', 'dark')
  else if (themeValue === '3') root.setAttribute('data-theme', 'light')
}

themeSelector.addEventListener('input', function () {
  toggleTheme(themeSelector.value)
})

document.addEventListener('DOMContentLoaded', function () {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
    themeSelector.value = 2
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  )
    themeSelector.value = 3
  updateDisplay()
})

enteringNumber()
