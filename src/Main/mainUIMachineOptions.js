import createMainInterface from './createMainInterface'
import toggleFullscreen from './toggleFullscreen'
import toggleRotate from './toggleRotate'

const mainUIMachineOptions = {
  actions: {
    createMainInterface,

    toggleFullscreen,

    toggleRotate,
  },
}

export default mainUIMachineOptions
