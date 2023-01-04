import React, { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
	const [token, setToken] = useState(
		localStorage.getItem('linkrtoken')
			? JSON.parse(localStorage.getItem('linkrtoken'))
			: '09e94db4-65ac-4d04-aa98-11f9d51dbe9c'
	);
	const [userimage, setUserimage] = useState(
		localStorage.getItem('linkruserimage')
			? JSON.parse(localStorage.getItem('linkruserimage'))
			: 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'
	);

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				userimage,
				setUserimage
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => React.useContext(AuthContext);