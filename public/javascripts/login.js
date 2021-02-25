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

  fetch('/api/login', {
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
        return setErrorMessage('Incorrect username or password.')

      return res.json()
    })
    .then(({ redirectUrl }) =>
      window.location.href = redirectUrl
    )
    .catch(err => {
      setErrorMessage('Unknown error occurred.')
      console.log(err)
    })
})
