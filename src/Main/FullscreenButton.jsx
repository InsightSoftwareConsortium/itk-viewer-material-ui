import React from  'react'
import { Icon, IconButton, Tooltip } from '@material-ui/core'
import { fullscreenIconDataUri } from 'itk-viewer-icons'

function FullscreenButton(props) {
  const { context, send } = props

  const handleToggle = () => {
    send('TOGGLE_FULLSCREEN')
  }

  return(
    <Tooltip title='Fullscreen [f]'>
      <IconButton onClick={handleToggle}>
        <Icon>
          <img src={fullscreenIconDataUri} />
        </Icon>
      </IconButton>
    </Tooltip>
  )
}

export default FullscreenButton
