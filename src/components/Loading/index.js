import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Spin } from 'antd'

const Loading = ({ style, text }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    }}
  >
    <Spin
      indicator={
        <Icon
          type="loading"
          style={{ fontSize: 24, width: 24, ...style }}
          spin
        />
      }
    />
    {text && <span style={{ marginLeft: 6 }}>{text}</span>}
  </div>
)

Loading.defaultProps = {
  style: {},
  text: null,
}

Loading.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
}

export default Loading
