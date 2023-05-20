import { Dot } from "../components/camera/PointChooser";

let imageDot: Dot;

export const setImageDot = (dot: Dot) => {
  imageDot = dot;
};

export const getImageDot = () => {
  return imageDot;
};

let chosenMask: string;

export const setChosenMask = (mask: string) => {
  chosenMask = mask;
};

export const getChosenMask = () => {
  return chosenMask;
};