import React, { lazy } from 'react'
import PropTypes from 'prop-types'
import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
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
  .rte {
    border: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .rdw-editor-toolbar {
    padding: 6px 5px;
    margin-bottom: 0;
  }
  .demo-editor.rdw-editor-main {
    border: 1px solid #efefef;
    margin-top: -1px;
    max-height: 225px;
    overflow-y: auto;
    padding: 4px 12px;
  }
`

const { Option } = Select
const FormField = ({
  addonAfter,
  addonBefore,
  allowSearch,
  ajaxSelect,
  autosize,
  checkboxType,
  className,
  disabled,
  formatter,
  info,
  input,
  inputType,
  label,
  max,
  maxLength,
  meta: { error, touched },
  min,
  multiSelect,
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
  ...restProps
}) => {
  const onChange = restProps.onChange || input.onChange
  const { value } = input
  const fieldType = checkboxType || input.type || type

  switch (fieldType) {
    case 'checkbox':
      return (
        <Checkbox
          {...input}
          disabled={disabled}
          onChange={onChange}
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
            onChange={onChange}
            size={size}
            style={style}
          />
          {info}
        </>
      )
    case 'editor':
      return (
        <EditorWrapper>
          <Editor
            {...input}
            onChange={onChange}
            resetTrigger={resetTrigger}
            value={value}
          />
        </EditorWrapper>
      )
    case 'month':
      const { MonthPicker } = DatePicker
      return (
        <>
          <MonthPicker
            disabled={disabled}
            format="MM/YYYY"
            onChange={onChange}
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

      if (ajaxSelect) {
        return (
          <>
            <AjaxSelect
              {...input}
              disabled={disabled}
              onSearch={onSearch}
              placeholder={placeholder}
              renderOption={restProps.renderOption}
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
            disabled={disabled}
            placeholder={placeholder}
            showSearch={allowSearch}
            size={size}
            style={style}
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
            autosize={autosize}
            className={className}
            disabled={disabled}
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
            onChange={onChange}
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
  autosize: false,
  checkboxType: undefined,
  className: undefined,
  disabled: false,
  formatter: undefined,
  help: undefined,
  info: undefined,
  inputType: 'text',
  label: null,
  max: undefined,
  maxLength: undefined,
  min: undefined,
  multiSelect: false,
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
  autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
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
  maxLength: PropTypes.number,
  /** */
  meta: PropTypes.object,
  /** */
  min: PropTypes.number,
  /** */
  multiSelect: PropTypes.bool,
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
