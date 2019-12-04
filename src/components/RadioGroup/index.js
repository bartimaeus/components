import React from 'react'
import { Radio } from 'antd'

const RadioButton = ({
  input,
  radioType,
  option,
  options,
  radioOptionStyle,
}) => {
  if (radioType === 'radio') {
    return (
      <Radio
        key={`${input.name}-${option.value || option.id}`}
        style={{ ...radioOptionStyle, width: `${100 / options.length}%` }}
        value={option.value === 0 ? 0 : option.value || option.id}
      >
        {option.label || option.name}
      </Radio>
    )
  }
  return (
    <Radio.Button
      key={`${input.name}-${option.value || option.id}`}
      style={{
        ...radioOptionStyle,
        width: radioType === 'yes_no' ? 100 : `${100 / options.length}%`,
      }}
      value={option.value === 0 ? 0 : option.value || option.id}
    >
      {option.label || option.name}
    </Radio.Button>
  )
}

const RadioGroup = ({
  disabled,
  input,
  options,
  radioOptionStyle,
  radioType,
  style,
}) => {
  const yesNoStyle = {
    ...style,
    textAlign: 'center',
  }

  const ratingStyle = {
    minWidth: 650,
    width: '100%',
    textAlign: 'center',
    ...style,
  }

  const getRadioStyle = radioStyle => {
    if (radioStyle === 'rating') {
      return ratingStyle
    }
    if (radioStyle === 'yes_no') {
      return yesNoStyle
    }
    return style
  }

  if (radioType === 'yes_no') {
    options = [
      {
        label: 'Yes',
        value: 'yes',
      },
      {
        label: 'No',
        value: 'no',
      },
    ]
  }

  return (
    <Radio.Group
      {...input}
      buttonStyle="solid"
      disabled={disabled}
      style={getRadioStyle(radioType)}
    >
      {options.map(option => {
        return (
          <RadioButton
            input={input}
            option={option}
            options={options}
            radioType={radioType}
            radioOptionStyle={radioOptionStyle}
          />
        )
      })}
    </Radio.Group>
  )
}

export default RadioGroup
