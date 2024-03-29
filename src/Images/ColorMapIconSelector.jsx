import React, { useEffect, useRef, useState } from 'react'
import { useActor } from '@xstate/react'
import { FormControl, Icon, MenuItem, Select, Tooltip } from '@mui/material'
import { ColorMapIcons } from 'itk-viewer-color-maps'
import '../style.css'

function ColorMapIconSelector(props) {
  const { service } = props
  const iconSelector = useRef(null)
  const [state, send] = useActor(service)
  const [menuOpen, toggleMenuOpen] = useState(false)
  let colorMapIcons = []
  ColorMapIcons.forEach((value, key) => {
    colorMapIcons.push({
      name: key,
      icon: value,
      ref: useRef(null)
    })
  })

  useEffect(() => {
    state.context.images.iconSelector = iconSelector.current
  }, [])

  const currentColorMap = () => {
    const name = state.context.images.selectedName
    if (state.context.images.actorContext) {
      const actorContext = state.context.images.actorContext.get(name)
      const component = actorContext.selectedComponent
      return actorContext.colorMaps.get(component)
    }
    return ''
  }

  const handleChange = (colorMap) => {
    const name = state.context.images.selectedName
    const actorContext = state.context.images.actorContext.get(name)
    const componentIndex = actorContext.selectedComponent
    send({
      type: 'IMAGE_COLOR_MAP_CHANGED',
      data: { name, component: componentIndex, colorMap }
    })
  }

  return (
    <FormControl
      variant="outlined"
      size="small"
      ref={iconSelector}
      style={{ width: 'auto', margin: '0 5px' }}
    >
      <Select
        value={currentColorMap()}
        style={{ height: '40px' }}
        onChange={(e) => {
          handleChange(e.target.value)
        }}
        onOpen={() => {toggleMenuOpen(true)}}
        onClose={() => {toggleMenuOpen(false)}}
        MenuProps={{
          anchorEl: iconSelector.current,
          disablePortal: true,
          keepMounted: true,
          classes: { list: 'cmapMenu' }
        }}
      >
        {colorMapIcons.map((preset, idx) => (
          <MenuItem key={idx} value={preset.name}>
            <Tooltip
              ref={preset.ref}
              title={preset.name}
              placement="bottom"
              PopperProps={{
                anchorEl: menuOpen ? preset.ref.current : iconSelector.current,
                disablePortal: true,
                keepMounted: true
              }}
            >
              <Icon style={{ width: 'inherit' }}>
                <img className="colorMapIcon" src={preset.icon} />
              </Icon>
            </Tooltip>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ColorMapIconSelector
