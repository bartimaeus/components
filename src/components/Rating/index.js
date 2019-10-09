import React from 'react'
import { Radio } from 'antd'

const Rating = ({ input, options, style }) => (
  <Radio.Group
    {...input}
    buttonStyle="solid"
    style={{
      ...style,
      minWidth: style.minWidth ? style.minWidth : 650,
      width: '100%',
      textAlign: 'center',
    }}
  >
    {options.map(option => (
      <Radio.Button
        key={option.value}
        style={{ width: `${100 / options.length}%` }}
        value={option.value}
      >
        {option.label}
      </Radio.Button>
    ))}
  </Radio.Group>
)

export default Rating
