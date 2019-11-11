import React from 'react'
import PropTypes from 'prop-types'
import { notification, Select } from 'antd'
import debounce from 'lodash/debounce'

class AjaxSelect extends React.PureComponent {
  static defaultProps = {
    options: [],
    page: 1,
    per: 20,
    style: {},
    renderOption: undefined,
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    options: PropTypes.array,
    renderOption: PropTypes.func,
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
  }

  state = {
    loading: false,
    mounted: false,
    options: [],
  }

  componentDidMount() {
    this.setState({ mounted: true }, () => this.handleSearch(''))
  }

  componentWillUnmount() {
    this.setState({ mounted: false })
  }

  // TODO: Add handleScroll

  handleSearch = async value => {
    const { onSearch } = this.props
    const { mounted, page, per } = this.state

    this.setState({ loading: true })
    const response = await onSearch({ s: value, page, per }).catch(error => {
      notification.error({
        message: `Oops! There was an error loading options`,
        details: error.toString(),
      })
    })

    if (mounted && response && response.status === 200) {
      this.setState({ loading: false, options: response.data })
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    const {
      onChange,
      // options: initialOptions,
      placeholder,
      renderOption,
      style,
      value,
    } = this.props
    const { loading, options } = this.state

    return (
      <Select
        allowClear
        loading={loading}
        filterOption={false}
        onDropdownVisibleChange={() => {}}
        onChange={onChange}
        // onPopupScroll={this.handleScroll}
        onSearch={debounce(this.handleSearch, 500)}
        placeholder={placeholder}
        showSearch
        style={style}
        value={value}
      >
        {options.map(option => renderOption(option))}
      </Select>
    )
  }
}

export default AjaxSelect
