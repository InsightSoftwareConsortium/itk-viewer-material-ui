import React from 'react'
import {
  AppBar, Drawer, Icon, IconButton, Toolbar, Typography
} from '@material-ui/core'
import './Panel.css'
import { useMachine } from '@xstate/react'
import toggleUICollapsed from './toggleUICollapsed'
import { toggleIconDataUri } from 'itk-viewer-icons'

function Panel(props) {
  const { children, context } = props
  const [state, send] = useMachine(context.service.machine)
  toggleUICollapsed(context)

  const handleToggle = () => {
    send('TOGGLE_UI_COLLAPSED')
  }

  return (
    <div className='root'>
      <AppBar className='appBar'>
        <Toolbar>
          <IconButton
            color='inherit'
            onClick={ handleToggle }
            edge='start'
          >
            <Icon>
              <img src={ toggleIconDataUri } alt='toggle'/>
            </Icon>
          </IconButton>
          <Typography variant='h5' noWrap>
            ITK Viewer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className='drawer'
        variant='persistent'
        anchor='left'
        open={ !context.uiCollapsed }
      >
        <div>
          {
            React.Children.map(children, (child) => {
              return React.cloneElement(child, { context, state, send })
            })
          }
        </div>
      </Drawer>
    </div>
  )
}

export default Panel
