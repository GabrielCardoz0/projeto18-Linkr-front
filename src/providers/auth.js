import React, { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
	const [token, setToken] = useState(
		localStorage.getItem('token')
			? JSON.parse(localStorage.getItem('token'))
			: ''
	);
	const [userimage, setUserimage] = useState(
		localStorage.getItem('userimage')
			? JSON.parse(localStorage.getItem('userimage'))
			: 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'
	);
	
	const [shareUsernames, setShareUsernames] = useState([])

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				userimage,
				setUserimage,
				shareUsernames,
				setShareUsernames
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => React.useContext(AuthContext);