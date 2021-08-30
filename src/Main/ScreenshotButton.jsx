import React from 'react';
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import { screenshotIconDataUri } from 'itk-viewer-icons'

function ScreenshotButton(props) {
  const { send } = props

  const handleClick = () => {
    send('TAKE_SCREENSHOT');
  }

  return(
    <Tooltip title='Screenshot' placement='top'>
      <IconButton onClick={handleClick}>
        <Icon><img src={screenshotIconDataUri}/></Icon>
      </IconButton>
    </Tooltip>
  );
}

export default ScreenshotButton