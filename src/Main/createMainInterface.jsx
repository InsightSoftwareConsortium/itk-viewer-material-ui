import React from 'react'
import ScreenshotButton from './ScreenshotButton'
import FullscreenButton from './FullscreenButton'
import RotateButton from './RotateButton'

function createMainInterface(props) {
  const { context } = props
  return(
    <div>
      <div>
        <ScreenshotButton {...props}/>
        <FullscreenButton {...props}/>
        {(context && !context.use2D)
          && <RotateButton {...props}/>}
      </div>
    </div>
  )
}

export default createMainInterface
