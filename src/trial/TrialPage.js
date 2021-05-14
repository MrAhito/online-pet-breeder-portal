
import React, { Component } from 'react'
import Axios from 'axios'

 class TrialPage extends Component {

    state = {
        filetoUp : null
    }

    onChanges = event => {
        this.setState({
            filetoUp : event.target.files[0]
        })
    }

    UploadImage = () => {
        const formData = new FormData()
            formData.append('file', this.state.filetoUp, this.state.filetoUp.name);
            formData.append('upload_preset', 'r5byh8yh')
        Axios.post("https://api.cloudinary.com/v1_1/pet-breeding/image/upload", formData, {
            onUploadProgress : progressEvent => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        })
        .then((res) => {
                    console.log(res);
                    console.log(res.data.url);
                });
    }
    
    render() {
        return (
            <div>
                <input style={{display: 'none'}} type='file' onChange={this.onChanges} ref={
                    fileInput => this.fileInput = fileInput
                }/>
                <button onClick={() => this.fileInput.click()}>Pick Image</button>
                <button onClick={this.UploadImage}>Upload Image</button>
            </div>
        )
    }
}

export default TrialPage
