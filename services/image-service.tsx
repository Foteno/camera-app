import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CameraCapturedPicture } from 'expo-camera';
import { getImageDot } from './dot-service';

export const djangoUrl = "http://192.168.0.196:8000/api"

let image: CameraCapturedPicture;

export const setImage = (picture: CameraCapturedPicture) => {
    image = picture;
};
export const getImage = () => {
  return image;
};

let masks: [string];

export const setMasks = (_masks: [string]) => {
    masks = _masks;
};
export const getMasks = () => {
  return masks;
};

export enum InpaintingAlgorithm {
    SAM = 'sam',
    GAN = 'gan',
    TELEA = 'telea',
    NS = 'ns',
}

async function postPicture(picture: CameraCapturedPicture): Promise<AxiosResponse<any, any>> {
    if (!picture.uri) return Promise.reject('No picture uri');

    let data = new FormData();
    data.append('image', {
        uri: picture.uri,
        type: 'image/jpeg',
        name: 'image.jpg',
    } as unknown as Blob);
    const dot = getImageDot();
    
    if (dot.x === 0 && dot.y === 0) {
        alert('No dot set');
        return Promise.reject('No dot set');
    }
    let config: AxiosRequestConfig = {
        headers: {
            'content-type': 'multipart/form-data',
        }, 
        params: {
            'coord_x': dot.x,
            'coord_y': dot.y
        }
    };
    return axios.post(djangoUrl + '/post-point-sam', data, config);
}

export { postPicture };
