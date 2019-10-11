import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { get, isEmpty } from 'lodash'
import classNames from 'classnames'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'
import './style.css'

// Components
import Field from '../Field'

const LabelWrapper = styled.div`
  display: ${props => get(props, 'style.display', 'block')};
  line-height: normal;
  label {
    font-weight: ${props => get(props, 'style.fontWeight', 'bold')};
    margin-top: ${props => get(props, 'style.marginTop', '15px')};
    margin-bottom: ${props => get(props, 'style.marginBottom', '4px')};
  }
`
const Label = ({ children, ...restProps }) => (
  <LabelWrapper {...restProps}>
    <label>{children}</label>
  </LabelWrapper>
)

// Ant Design's FormItem
const FormItem = ({
  allowSearch,
  className,
  disabled,
  help,
  info,
  input,
  inputType,
  itemLayout,
  label,
  labelTop,
  labelStyle,
  max,
  meta,
  meta: { error, touched },
  min,
  multiSelect,
  noLabel,
  onChange,
  options,
  placeholder,
  prefix,
  required,
  size,
  style,
  type,
  validateStatus,
  warning,
  ...restProps
}) => {
  const klassName = classNames(className, {
    'is-checkbox': input.type === 'checkbox' || type === 'checkbox',
  })
  // Set defaults that can be overridden
  const formItemLayout = (() => {
    const defaultLayout = {
      label,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }

    if (itemLayout) {
      return { ...defaultLayout, ...itemLayout }
    }

    if (noLabel || labelTop) {
      return { label: null }
    }

    if (input.type === 'checkbox' || type === 'checkbox') {
      return {}
    }

    return defaultLayout
  })()

  // Add conditionl validation props
  const validationProps = (() => {
    if (
      required &&
      (!input.value && input.value !== 0 && isEmpty(input.value))
    ) {
      return {
        hasFeedback: true,
        validateStatus: 'warning',
      }
    }

    if (validateStatus) {
      return { hasFeedback: true, validateStatus }
    }

    return {}
  })()

  return (
    <Form.Item
      className={klassName}
      {...formItemLayout}
      help={help}
      {...restProps}
      {...validationProps}
    >
      {!noLabel && labelTop && <Label style={labelStyle}>{label}</Label>}
      <Field
        allowSearch={allowSearch}
        className={klassName}
        disabled={disabled}
        info={info}
        input={input}
        inputType={inputType}
        label={label}
        max={max}
        meta={meta}
        min={min}
        multiSelect={multiSelect}
        onChange={onChange}
        options={options}
        placeholder={placeholder || label}
        prefix={prefix}
        size={size}
        style={style}
        required={required}
        type={type}
        {...restProps}
      />
    </Form.Item>
  )
}

FormItem.defaultProps = {
  allowSearch: false,
  className: undefined,
  disabled: undefined,
  help: undefined,
  info: undefined,
  inputType: 'text',
  itemLayout: undefined,
  label: null,
  labelTop: false,
  labelStyle: {},
  max: 1000,
  meta: {},
  min: 0,
  multiSelect: false,
  noLabel: false,
  onChange: () => {},
  options: null,
  placeholder: null,
  prefix: null,
  required: undefined,
  size: undefined,
  style: {},
  type: 'text',
  validateStatus: undefined,
  warning: undefined,
}

FormItem.propTypes = {
  allowSearch: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  info: PropTypes.node,
  help: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  input: PropTypes.object.isRequired,
  inputType: PropTypes.string,
  itemLayout: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  labelTop: PropTypes.bool,
  max: PropTypes.number,
  meta: PropTypes.object,
  min: PropTypes.number,
  multiSelect: PropTypes.bool,
  noLabel: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.any,
  placeholder: PropTypes.string,
  prefix: PropTypes.node,
  required: PropTypes.bool,
  size: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  validateStatus: PropTypes.string,
  warning: PropTypes.object,
}

export default FormItem
