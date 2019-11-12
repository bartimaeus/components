import React, { useState } from 'react'
import PropTypes from 'prop-types'
//import real AjaxSelect as example in order for example code to display AjaxSelect
import AjaxSelectExample from './index'

const AjaxSelect = ({ renderOption, style, onSearch, placeholder }) => {
  const [value, onChange] = useState('')
  return (
    <AjaxSelectExample
      onChange={onChange}
      onSearch={onSearch}
      placeholder={placeholder}
      renderOption={renderOption}
      style={style}
      value={value}
    />
  )
}
AjaxSelect.defaultProps = {
  options: [],
  page: 1,
  per: 20,
  style: {},
  renderOption: undefined,
}

AjaxSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.array,
  renderOption: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
}

export default AjaxSelect
