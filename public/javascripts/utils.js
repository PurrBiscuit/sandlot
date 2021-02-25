/* eslint-disable no-unused-vars */
const createLoadingGif = () => {
  const loadingGif = document.createElement('img')
  loadingGif.setAttribute('src', '/images/loading.gif')
  loadingGif.setAttribute('id', 'loading')

  return loadingGif
}
