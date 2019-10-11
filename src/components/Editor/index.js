/* eslint react/require-default-props: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const getEditorStateFromHtml = html => {
  if (!html) {
    const editorState = EditorState.createEmpty()
    return editorState
  }
  const contentBlock = htmlToDraft(html)
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    )
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }
}

class RichTextEditor extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const stateChanges = {}
    const { value: html } = nextProps
    if (nextProps.resetTrigger !== prevState.resetTrigger) {
      stateChanges.editorState = getEditorStateFromHtml(html)
      stateChanges.resetTrigger = nextProps.resetTrigger
    }
    return stateChanges
  }

  constructor(props) {
    super(props)
    const { value: html } = props
    this.state = {
      editorState: getEditorStateFromHtml(html),
      resetTrigger: props.resetTrigger,
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    })
    if (this.props.onChange) {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      this.props.onChange(html)
    }
  }

  render() {
    const { editorState } = this.state
    return (
      <div
        className="rte"
        style={{ border: '1px solid #d9d9d9', padding: 5, borderRadius: 4 }}
      >
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.props.onImageUpload,
              alt: { present: true },
              previewImage: true,
              defaultSize: {
                height: 'auto',
                width: '600',
              },
            },
          }}
        />
      </div>
    )
  }
}
// using default props causes a warning with ant design forms.
// RichTextEditor.defaultProps = {
//   value: '',
// };

RichTextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onImageUpload: PropTypes.func,
  resetTrigger: PropTypes.any,
}

export default RichTextEditor
