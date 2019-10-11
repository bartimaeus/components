import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SketchPicker } from 'react-color'
import { Input, Popover } from 'antd'
import styled from '@emotion/styled'
import 'antd/es/input/style/index.css'
import 'antd/es/popover/style/index.css'

const ColorPreview = styled(Input)`
  background-color: ${({ color }) => (color === 'ffffff' ? 'ccccc' : color)};
  border-color: ${({ color }) => (color === 'ffffff' ? 'ccccc' : color)};
  margin-right: -1px;
  width: 33px !important;
`

const ColorPicker = ({ disabled, input, style }) => {
  const [showPopover, setShowPopover] = useState(false)
  const { onChange, value } = input

  const handleClick = () => {
    setShowPopover(!showPopover)
  }

  const handleChange = color => {
    if (color && color.hex) {
      onChange(color.hex.replace('#', ''))
    } else {
      onChange({ ...color }, color.target.value)
    }
  }

  return (
    <div style={style}>
      <Input.Group>
        <ColorPreview
          color={value}
          disabled
          onClick={handleClick}
          style={{ backgroundColor: `#${value}` }}
        />
        <Input
          disabled={disabled}
          {...input}
          style={{ width: 100 }}
          onClick={handleClick}
          onChange={handleChange}
        />
        {showPopover ? (
          <Popover
            onVisibleChange={() => setShowPopover(!showPopover)}
            visible={showPopover}
            content={
              <SketchPicker {...input} color={value} onChange={handleChange} />
            }
          />
        ) : null}
      </Input.Group>
    </div>
  )
}

ColorPicker.defaultProps = {
  disabled: false,
  style: {},
}

ColorPicker.propTypes = {
  /** Allows color picker to be view-only */
  disabled: PropTypes.bool,
  /** object includes value (string) and onChange (function). input prop is automatically passed with react-final-form's <Field> component */
  input: PropTypes.object.isRequired,
  /** Style object allows the container of the color picker to be styled */
  style: PropTypes.object,
}

export default ColorPicker
