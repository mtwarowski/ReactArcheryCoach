import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'

export default class ImagePicker extends Component{

    constructor(props) {
        super(props);
        this.state = {
            imageName: this.props.label || 'Choose an Image',  
        };
        this.handleOnImageSelected = this.handleOnImageSelected.bind(this);
    }

    handleOnImageSelected(e) {

        let reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            reader.onloadend = () => this.setState({ file: file, image: reader.result, imageName: file.name }, () => this.props.handleImageDataSelected(this.state));
            reader.readAsDataURL(file);
        }
    }

    render(){    
        const styles = {
            uploadButton: {
                verticalAlign: 'middle',
            },
            uploadInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
            },
        };
        return (
            <FlatButton fullWidth={true}
                label={this.state.imageName}// "Choose an Image"
                labelPosition="before"
                style={styles.uploadButton}
                containerElement="label">
                <input type="file" style={styles.uploadInput} onChange={this.handleOnImageSelected} />
            </FlatButton>
        );
    }
}

export class ImagePickerGraphical extends Component{

    constructor(props) {
        super(props);
        this.state = {
            imageName: this.props.label || 'Choose an Image',  
        };
        this.handleOnImageSelected = this.handleOnImageSelected.bind(this);
    }

    handleOnImageSelected(e) {

        let reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            reader.onloadend = () => this.setState({ file: file, image: reader.result, imageName: file.name }, () => this.props.handleImageDataSelected(this.state));
            reader.readAsDataURL(file);
        }
    }

    render(){    
        const icon = AddAPhoto;
        const styles = {
            uploadInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                width: '100%',      
                background: 'url(../../add_photo_alternate.svg) no-repeat center center fixed', 
                backgroundSize: '50%'             
            },
        };
        return (
            <input type="file" style={styles.uploadInput} onChange={this.handleOnImageSelected} />
        );
    }
}

