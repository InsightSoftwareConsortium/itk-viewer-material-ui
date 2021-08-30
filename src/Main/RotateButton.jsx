import React from 'react'
import { Icon, IconButton, Tooltip } from '@material-ui/core'
import { rotateIconDataUri } from 'itk-viewer-icons'
import toggleRotate from './toggleRotate'

function RotateButton(props) {
  const { context, send } = props

  const handleToggle = () => {
    send('TOGGLE_ROTATE')
    toggleRotate(context)
  }

  return(
    <Tooltip title='Spin in 3D [p]'>
      <IconButton onClick={handleToggle}>
        <Icon>
          <img src={rotateIconDataUri} />
        </Icon>
      </IconButton>
    </Tooltip>
  )
}

export default RotateButton
