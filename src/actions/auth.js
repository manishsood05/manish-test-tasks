import { LOGGED_IN, LOGGED_OUT } from '../constants/auth'

export const onLogin = (response) => {
	return { type: LOGGED_IN, data : response };
}


export const onLogout = () => {
	return { type: LOGGED_OUT };
}