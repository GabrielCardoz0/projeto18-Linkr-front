import React, { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
	const [token, setToken] = useState(
		localStorage.getItem('token')
			? JSON.parse(localStorage.getItem('token'))
			: ''
	);

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => React.useContext(AuthContext);