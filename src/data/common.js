
import imgEnvFr from '../assets/images/back_FR.jpg';
import imgEnvBk from '../assets/images/back_BK.jpg';
import imgEnvUp from '../assets/images/back_UP.jpg';
import imgEnvDn from '../assets/images/back_DN.jpg';
import imgEnvLf from '../assets/images/back_LF.jpg';
import imgEnvRt from '../assets/images/back_RT.jpg';

// export const imgEnv0Arr = [imgEnvPX, imgEnvNX, imgEnvPY, imgEnvNY, imgEnvPZ, imgEnvNZ];
export const imgEnv0Arr = [imgEnvFr, imgEnvBk, imgEnvUp, imgEnvDn, imgEnvLf, imgEnvRt];

export function RGB2Int(str) {
	const realStr = str.substring(1);
	const realInt = Number("0x"+realStr);
	return realInt;
}

export function GetRoundNum(val, size = 4) {
	return Math.round(val * Math.pow(10, size)) / Math.pow(10, 4);
}