import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { storageURL } from '../../utils/baseData';

class FileUploader extends React.Component {

  state = {
    loading: false,
    initialized: false,
    fileList: []
  };

  componentDidMount() {
    if (this.props && this.props.value && !this.state.initialized) {
      const fullURL = `${storageURL}/${this.props.value}`;

      this.setState({
        fileList: [{
          uid: '1',
          name: this.getBaseNameFromUrl(this.props.value),
          status: 'done',
          url: fullURL,
          value: this.props.value,
          thumbUrl: fullURL,
        }],
        initialized: true,
      });
    }
  }

  getBaseNameFromUrl = (str, excludeExtension) => {
    let base = new String(str).substring(str.lastIndexOf('/') + 1);

    if (excludeExtension && base.lastIndexOf(".") != -1) {
      base = base.substring(0, base.lastIndexOf("."));
    }

    return base;
  }

  validateSizeLimit = (file) => {
    if(!this.props.sizeLimit) return true;

    const isLessThanLimit = (file.size / 1024 / 1024) < this.props.sizeLimit;

    if (!isLessThanLimit) {
      message.error(`El archivo debe pesar menos de ${this.props.sizeLimit}MB`);
    }

    return isLessThanLimit;
  };

  beforeUpload = (file) => {
    let valid = this.validateSizeLimit(file);
    return valid;
  };

  convertFinalValue = (fileList) => {
    if (this.props.multiple) {
      return this.props.valueType == 'url-string' ? fileList.map(file => {
          return file.value;
        }) : fileList;
    } else {
      const [firstFile] = fileList;
      return firstFile ? (this.props.valueType == 'url-string' ? firstFile.value : firstFile) : null;
    }
  };

  handleChange = (info) => {

    let fileList = [...info.fileList];
    let loading = false;

    // Limit the number of uploaded files
    if(this.props.quantityLimit || !this.props.multiple) {
      let quantity = this.props.quantityLimit ? this.props.quantityLimit : 1;
      fileList = fileList.slice(-Math.abs(quantity));
    }

    // Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response && file.response.data) {
        file.url = file.thumbUrl = file.response.data.full_url;
        file.value = file.response.data.relative_url;
      }
      return file;
    });

    switch (info.file.status) {
      case 'uploading':
        loading = true;
        break;
      case 'done':
      case 'removed':
        loading = false;
        this.props.onChange(this.convertFinalValue(fileList));
        break;
      case 'error':
        if(info.file.response.error || info.file.response.message) {
          message.error(info.file.response.error || info.file.response.message);
        }

        break;
      default:
        break;
    }

    if (info.file.status !== undefined) {
      this.setState({ loading, fileList });
    }

  };

  render() {

    return (
      <Upload
        { ...this.props }
        name="file_url"
        className="file-uploader"
        fileList={this.state.fileList}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        onRemove={this.handleRemove}
      >
        <Button>
          <UploadOutlined /> Seleccionar archivo
        </Button>
      </Upload>
    );
  }
}

export default FileUploader;
