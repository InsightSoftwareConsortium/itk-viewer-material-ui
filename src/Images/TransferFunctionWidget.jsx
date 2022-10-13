import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'

import '../style.css'
import { setup } from './transferFunctionWidgetUtils'
import { getSelectedImageContext } from './getSelectedImageContext'

const selectColorMap = (state) => {
  const { colorMaps, selectedComponent } = getSelectedImageContext(state)
  const colorTransferFunction =
    state.context.images.colorTransferFunctions?.get(selectedComponent)
  const colorMap = colorMaps?.get(selectedComponent)
  return [colorTransferFunction, colorMap]
}

const colorMapCompare = ([oldColorTF, oldName], [newColorTF, newName]) =>
  oldColorTF === newColorTF && oldName === newName

function TransferFunctionWidget({ service }) {
  const transferFunctionWidgetContainer = useRef(null)
  const transferFunctionWidget = useRef(null)

  useEffect(() => {
    if (transferFunctionWidgetContainer.current) {
      transferFunctionWidget.current = setup(
        service.machine.context,
        transferFunctionWidgetContainer.current
      )
    }
  }, [transferFunctionWidgetContainer, service.machine.context])

  const [colorTransferFunction, presetNameToTriggerUpdate] = useSelector(
    service,
    selectColorMap,
    colorMapCompare
  )
  useEffect(() => {
    if (transferFunctionWidget.current && colorTransferFunction) {
      transferFunctionWidget.current.setColorTransferFunction(
        colorTransferFunction
      )
    }
  }, [transferFunctionWidget, presetNameToTriggerUpdate, colorTransferFunction])

  return (
    <div className="uiRow" style={{ background: 'rgba(127, 127, 127, 0.5)' }}>
      <div className="piecewiseWidget" ref={transferFunctionWidgetContainer} />
    </div>
  )
}

export default TransferFunctionWidget
