import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'

const FormLayout = ({ children, colon, layout, ...restProps }) => (
  <Form colon={colon} layout={layout} {...restProps}>
    {children}
  </Form>
)

FormLayout.defaultProps = {
  colon: true,
  layout: 'horizontal',
}

FormLayout.propTypes = {
  /** Boolean flag to show colon in FormItem label */
  colon: PropTypes.bool,
  /** form layout (horizontal|vertical|inline) */
  layout: PropTypes.string,
}

export default FormLayout
