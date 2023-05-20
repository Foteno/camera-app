import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CameraCapturedPicture } from 'expo-camera';
import { getImageDot } from './dot-service';

export const djangoUrl = "http://192.168.0.196:8000/api"

export enum InpaintingAlgorithm {
    LAMA = 'lama',
    GAN = 'gan',
    TELEA = 'telea',
    NS = 'ns',
}

let image: CameraCapturedPicture;
let masks: [string];
let inpaintingAlgorithm: InpaintingAlgorithm = InpaintingAlgorithm.TELEA;

export const setImage = (picture: CameraCapturedPicture) => {
    image = picture;
};
export const getImage = () => {
  return image;
};
export const setMasks = (_masks: [string]) => {
    masks = _masks;
};
export const getMasks = () => {
  return masks;
};
export const setInpaintingAlgorithm = (_inpainting: InpaintingAlgorithm) => {
    inpaintingAlgorithm = _inpainting;
};
export const getInpaintingAlgorithm = () => {
  return inpaintingAlgorithm;
};

async function postPicture(picture: CameraCapturedPicture, inpaintingAlgorithm: InpaintingAlgorithm): Promise<AxiosResponse<any, any>> {
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
            'coord_y': dot.y,
            'algorithm': inpaintingAlgorithm,
        }
    };
    return axios.post(djangoUrl + '/post-point-sam', data, config);
}

export { postPicture };

