import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CameraCapturedPicture } from 'expo-camera';

async function postPicture(picture: CameraCapturedPicture): Promise<AxiosResponse<any, any>> {
    if (!picture.uri) return Promise.reject('No picture uri');

    let data = new FormData();
    data.append('image', {
        uri: picture.uri,
        type: 'image/jpeg',
        name: 'image.jpg',  
    } as unknown as Blob);
    let config: AxiosRequestConfig = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    };
    return axios.post('http://192.168.0.196:8000/api/post-picture', data, config);
}

export { postPicture };
