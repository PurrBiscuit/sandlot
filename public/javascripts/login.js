const loginButton = document.querySelector('button#login')
const usernameInput = document.querySelector('input#username')
const passwordInput = document.querySelector('input#password')
const errorMessage = document.querySelector('p#error')

const clearErrorMessage = () => {
  if (errorMessage.firstChild) {
    errorMessage.removeChild(errorMessage.firstChild)
  }
}

const setErrorMessage = msg => {
  if (!errorMessage.firstChild) {
    const errorText = document.createTextNode(msg)
    errorMessage.appendChild(errorText)
  }
}

passwordInput.addEventListener('input', () =>
  clearErrorMessage()
)

usernameInput.addEventListener('input', () =>
  clearErrorMessage()
)

loginButton.addEventListener('click', e => {
  e.preventDefault()

  fetch('/login', {
    body: JSON.stringify({
      password: passwordInput.value,
      username: usernameInput.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    redirect: 'manual'
  })
  .then(res => {
    if (res.status === 401)
      throw res

    return res.json()
  })
  .then(({ redirectUrl }) => {
    if (redirectUrl)
      return window.location.href = redirectUrl
  })
  .catch(err => {
    const errMsg = err.status === 401 ? "Incorrect username or password." : "Unknown error occurred."
    setErrorMessage(errMsg)
  })
})
