import React, { lazy, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  TimePicker,
} from 'antd'
import moment from 'moment'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// Helpers
import normalizePhone from '../../lib/normalize-phone'

// AjaxSelect Component
const AjaxSelect = lazy(() => import('../AjaxSelect'))

// ColorPicker Component
const ColorPicker = lazy(() => import('../ColorPicker'))

// TextEditor Component
const Editor = lazy(() => import('../Editor'))
const EditorWrapper = styled.div`
  .bartimaeus-editor.rdw-editor-main {
    max-height: ${props => `${props.maxHeight || 225}px`};
  }
`

const { Option } = Select
const FormField = ({
  addonAfter,
  addonBefore,
  allowSearch,
  ajaxSelect,
  autoSize,
  checkboxType,
  className,
  disabled,
  formatter,
  info,
  input,
  inputType,
  label,
  max,
  maxHeight,
  maxLength,
  meta: { error, touched },
  min,
  multiSelect,
  onChange,
  onPressEnter,
  onSearch,
  options,
  parser,
  placeholder,
  prefix,
  renderOption,
  required,
  resetTrigger,
  size,
  style,
  type,
}) => {
  const handleChange = onChange || input.onChange
  const { value } = input
  const fieldType = checkboxType || input.type || type
  const [selectValue, setSelectValue] = useState()

  switch (fieldType) {
    case 'checkbox':
      return (
        <Checkbox
          {...input}
          disabled={disabled}
          onChange={handleChange}
          style={style}
        >
          {label}
        </Checkbox>
      )
    case 'color-picker':
      return (
        <>
          <ColorPicker disabled={disabled} input={input} style={style} />
        </>
      )
    case 'date':
      return (
        <>
          <DatePicker
            disabled={disabled}
            value={value ? moment(value) : null}
            format="MM/DD/YYYY"
            onChange={handleChange}
            size={size}
            style={style}
          />
          {info}
        </>
      )
    case 'editor':
      return (
        <EditorWrapper maxHeight={maxHeight}>
          <Editor onChange={handleChange} value={value} />
        </EditorWrapper>
      )
    case 'month':
      const { MonthPicker } = DatePicker
      return (
        <>
          <MonthPicker
            disabled={disabled}
            format="MM/YYYY"
            onChange={handleChange}
            placeholder="Select month"
            size={size}
            style={style}
            value={value ? moment(value) : null}
          />
          {info}
        </>
      )
    case 'number':
      return (
        <>
          <InputNumber
            {...input}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            className={className}
            disabled={disabled}
            formatter={formatter}
            max={max}
            min={min}
            parser={parser}
            placeholder={placeholder || label}
            prefix={prefix || null}
            required={required}
            size={size}
            style={style}
          />
          {info}
        </>
      )
    case 'phone':
      return (
        <>
          <Input
            {...input}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            className={className}
            disabled={disabled}
            onChange={ev => input.onChange(normalizePhone(ev.target.value))}
            placeholder={placeholder || label}
            prefix={prefix || null}
            required={required}
            size={size}
            style={style}
            type={type}
          />
          {info}
        </>
      )
    case 'password':
      return (
        <>
          <Input.Password
            {...input}
            visibilityToggle={false}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            className={className}
            disabled={disabled}
            maxLength={maxLength}
            onPressEnter={onPressEnter}
            placeholder="********"
            prefix={prefix || null}
            size={size}
            style={
              touched && error
                ? { ...style, border: '1px solid red', borderRadius: 5 }
                : style
            }
            type={type}
          />
          {info}
        </>
      )
    case 'radio':
      return (
        <>
          <Radio.Group {...input} disabled={disabled} style={style}>
            {options.map(option => {
              return (
                <Radio
                  key={option.value || option.id}
                  value={option.value || option.id}
                >
                  {option.label || option.name}
                </Radio>
              )
            })}
          </Radio.Group>
        </>
      )
    case 'rating':
      return (
        <Radio.Group
          {...input}
          buttonStyle="solid"
          disabled={disabled}
          style={{
            minWidth: 650,
            width: '100%',
            textAlign: 'center',
            ...style,
          }}
        >
          {options.map(option => (
            <Radio.Button
              key={`${input.name}-${option.value || option.id}`}
              style={{ width: `${100 / options.length}%` }}
              value={option.value || option.id}
            >
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      )
    case 'select':
      const mode = multiSelect ? { mode: 'multiple' } : {}

      // handle ant design error when value of a multiselect is a string
      if (multiSelect && typeof value === 'string') return null
      const handleSelectChange = async val => {
        let response

        try {
          input.onChange(val)
          response = await setSelectValue(val)
        } catch (err) {
          notification.error({
            message: `Oops! There was an error loading additional options`,
            details: error.toString(),
          })
          console.error(err)
        }
        return response
      }

      if (ajaxSelect) {
        return (
          <>
            <AjaxSelect
              {...input}
              disabled={disabled}
              onSearch={onSearch}
              placeholder={placeholder}
              renderOption={renderOption}
              showSearch={allowSearch}
              size={size}
              style={style}
              {...mode}
            />
            {info}
          </>
        )
      }

      return (
        <>
          <Select
            {...input}
            onChange={handleSelectChange}
            disabled={disabled}
            placeholder={placeholder}
            showSearch={allowSearch}
            size={size}
            style={style}
            value={input.value === '' ? selectValue : input.value}
            {...mode}
          >
            {options.map(option => (
              <Option
                key={option.value || option.id}
                value={option.value || option.id}
              >
                {option.label || option.name}
              </Option>
            ))}
          </Select>
          {info}
        </>
      )
    case 'textarea':
      return (
        <>
          <Input.TextArea
            {...input}
            autoSize={autoSize}
            className={className}
            disabled={disabled}
            onChange={handleChange}
            onPressEnter={onPressEnter}
            placeholder={placeholder || label}
            prefix={prefix || null}
            required={required}
            size={size}
            style={style}
          />
        </>
      )
    case 'time':
      return (
        <>
          <TimePicker
            disabled={disabled}
            format="h:mm a"
            onChange={handleChange}
            size={size}
            style={style}
            value={value ? moment(value) : null}
            use12Hours
          />
          {info}
        </>
      )
    case 'yes_no':
      return (
        <Radio.Group
          {...input}
          buttonStyle="solid"
          disabled={disabled}
          style={{ ...style, textAlign: 'center' }}
        >
          <Radio.Button style={{ width: 100 }} value="yes">
            Yes
          </Radio.Button>
          <Radio.Button style={{ width: 100 }} value="no">
            No
          </Radio.Button>
        </Radio.Group>
      )
    default:
      return (
        <>
          <Input
            {...input}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            className={className}
            disabled={disabled}
            maxLength={maxLength}
            onPressEnter={onPressEnter}
            placeholder={placeholder || label}
            prefix={prefix || null}
            required={required}
            size={size}
            style={style}
            type={inputType}
          />
          {info}
        </>
      )
  }
}

FormField.defaultProps = {
  addonAfter: undefined,
  addonBefore: undefined,
  allowSearch: false,
  ajaxSelect: false,
  autoSize: false,
  checkboxType: undefined,
  className: undefined,
  disabled: false,
  formatter: undefined,
  help: undefined,
  info: undefined,
  inputType: 'text',
  label: null,
  max: undefined,
  maxHeight: undefined,
  maxLength: undefined,
  min: undefined,
  multiSelect: false,
  onChange: undefined,
  onPressEnter: e => e.preventDefault(),
  onSearch: e => e.preventDefault(),
  options: null,
  parser: undefined,
  placeholder: null,
  prefix: null,
  renderOption: undefined,
  required: undefined,
  resetTrigger: undefined,
  size: undefined,
  style: {},
  type: 'text',
}

FormField.propTypes = {
  /** The label text displayed after (on the right side of) the input field. */
  addonAfter: PropTypes.node,
  /** The label text displayed before (on the left side of) the input field. */
  addonBefore: PropTypes.node,
  /** Show clear button when type is 'select'. */
  allowSearch: PropTypes.bool,
  /** Allow Select to fetch options dynamically through onSearch function. */
  ajaxSelect: PropTypes.bool,
  /** */
  autoSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  /** */
  checkboxType: PropTypes.string,
  /** */
  className: PropTypes.string,
  /** */
  disabled: PropTypes.bool,
  /** */
  help: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** */
  info: PropTypes.node,
  /** */
  input: PropTypes.object.isRequired,
  /** */
  inputType: PropTypes.string,
  /** */
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** */
  max: PropTypes.number,
  /** */
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** */
  maxLength: PropTypes.number,
  /** */
  meta: PropTypes.object,
  /** */
  min: PropTypes.number,
  /** */
  multiSelect: PropTypes.bool,
  /** Allow a custom onChange function to be defined. Helpfule for side-effects not relating to the form state */
  onChange: PropTypes.func,
  /** */
  onPressEnter: PropTypes.func,
  /** */
  onSearch: PropTypes.func,
  /** */
  options: PropTypes.any,
  /** */
  parser: PropTypes.func,
  /** */
  placeholder: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** */
  prefix: PropTypes.node,
  /** */
  renderOption: PropTypes.func,
  /** */
  required: PropTypes.bool,
  /** */
  resetTrigger: PropTypes.any,
  /** */
  size: PropTypes.string,
  /** */
  style: PropTypes.object,
  /** */
  type: PropTypes.string,
}

export default FormField
