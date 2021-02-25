const navLoginButton = document.querySelector('button.login')
const logoutButton = document.querySelector('button.logout')
const signUpButton = document.querySelector('button.signup')

if (navLoginButton)
  navLoginButton.addEventListener('click', () => {
    window.location.href = '/login'
  })

if (logoutButton)
  logoutButton.addEventListener('click', () => {
    window.location.href = '/logout'
  })

if (signUpButton)
  signUpButton.addEventListener('click', () => {
    console.log('hello from signup button')
  })
