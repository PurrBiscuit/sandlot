const sessionButton = document.querySelector('button.session')
const sessionContainer = document.querySelector('div.session-container')
let hideSession = false

const clearErrorMessage = () => {
  const errorMessage = document.querySelector('p.error')
  if (errorMessage) errorMessage.remove()
}

const clearSessionInfo = () => {
  const sessionInfoDiv = document.querySelector('div.session-info')
  sessionInfoDiv.remove()
}

const createSessionInfoDisplay = res => {
  const sessionInfo = document.createElement('pre')
  sessionInfo.classList.add('session-info')
  const sessionTextNode = document.createTextNode(JSON.stringify(res, null, 2))
  sessionInfo.appendChild(sessionTextNode)

  return sessionInfo
}

const createSessionInfoHeader = () => {
  const sessionHeader = document.createElement('h2')
  sessionHeader.classList.add('session-header')
  const sessionTextNode = document.createTextNode('Current Session Information')
  sessionHeader.appendChild(sessionTextNode)

  return sessionHeader
}

const displaySessionInfo = () => {
  const sessionInfoDiv = document.createElement('div')
  sessionContainer.insertBefore(sessionInfoDiv, sessionButton)
  sessionButton.classList.add('hide')

  /* eslint-disable no-undef */
  const loadingGif = createLoadingGif()

  sessionInfoDiv.appendChild(loadingGif)

  return fetchUserSessionInfo()
    .then(res => {
      loadingGif.remove()
      sessionInfoDiv.classList.add('session-info')

      sessionInfoDiv.appendChild(createSessionInfoHeader())
      sessionInfoDiv.appendChild(createSessionInfoDisplay(res))
    })
    .catch(err => {
      loadingGif.remove()
      throw err
    })
}

const fetchUserSessionInfo = () => {
  return fetch('/api/users/me?throttle=5000', {
    method: 'GET'
  })
    .then(res => {
      if (res.status != 200)
        throw res

      return res.json()
    })
}

const setSessionButtonText = text => {
  const newTextNode = document.createTextNode(text)
  sessionButton.replaceChild(newTextNode, sessionButton.firstChild)
}

const createErrorMessage = err => {
  const pTag = document.createElement('p')
  pTag.classList.add('error')

  const errorText = document.createTextNode(`Session retrieval failed with status code ${err.status} - ${err.statusText}`)
  pTag.appendChild(errorText)

  return pTag
}

if (sessionButton)
  sessionButton.addEventListener('click', () => {
    if (hideSession) {
      clearSessionInfo()
      setSessionButtonText('Display Session')
      hideSession = false
    } else {
      clearErrorMessage()
      displaySessionInfo()
        .then(() => {
          setSessionButtonText('Hide Session')
          sessionButton.classList.remove('hide')
          hideSession = true
        })
        .catch(err => {
          sessionContainer.appendChild(createErrorMessage(err))
          sessionButton.classList.remove('hide')
        })
    }
  })
