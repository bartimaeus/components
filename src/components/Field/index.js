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
import 'antd/es/checkbox/style/index.css'
import 'antd/es/date-picker/style/index.css'
import 'antd/es/input/style/index.css'
import 'antd/es/input-number/style/index.css'
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
const Field = ({
  addonAfter,
  addonBefore,
  allowSearch,
  ajaxSelect,
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
  required,
  size,
  style,
  type,
  ...restProps
}) => {
  const { onChange, value } = input

  switch (input.type || type) {
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
        <EditorWrapper>
          <Editor value={value} onChange={onChange} />
        </EditorWrapper>
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

Field.defaultProps = {
  addonAfter: undefined,
  addonBefore: undefined,
  allowSearch: false,
  ajaxSelect: false,
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
  required: undefined,
  size: undefined,
  style: {},
  type: 'text',
}

Field.propTypes = {
  addonAfter: PropTypes.node,
  addonBefore: PropTypes.node,
  allowSearch: PropTypes.bool,
  ajaxSelect: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  help: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  info: PropTypes.node,
  input: PropTypes.object.isRequired,
  inputType: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  max: PropTypes.number,
  maxLength: PropTypes.number,
  meta: PropTypes.object.isRequired,
  min: PropTypes.number,
  multiSelect: PropTypes.bool,
  onPressEnter: PropTypes.func,
  onSearch: PropTypes.func,
  options: PropTypes.any,
  parser: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  prefix: PropTypes.node,
  required: PropTypes.bool,
  size: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
}

export default Field
