import React from 'react';
import { Editor } from '@tinymce/tinymce-react'; //Requires insert cdn script in html head to not require an API Key
import _ from 'lodash';

class HtmlEditor extends React.Component {
  state = {
    content: '',
    initialized: false,
  };

  componentDidMount() {
    if (this.props && this.props.value && !this.state.initialized) {
      this.setState({
        content: this.props.value,
        initialized: true,
      });
    }
  }

  handleEditorChange = (content, editor) => {
    this.setState({ content });
    this.props.onChange(content);
  };

  render() {
    return (
      <Editor
        init={{
          height: this.props.height ? this.props.height : 300,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar: this.props.toolbarOptions
            ? this.props.toolbarOptions
            : `undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify ${
            !this.props.onlyTextStyles
              ? '| bullist numlist outdent indent | removeformat | help'
              : ''
          }`,
        }}
        {..._.omit(this.props, 'value', 'onChange')}
        onEditorChange={this.handleEditorChange}
        value={this.state.content}
      />
    );
  }
}

export default HtmlEditor;
