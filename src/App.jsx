import React, { useState } from 'react'

import './App.css'

import { LoginPage } from './pages/Login/LoginPage'
import { AdminPage } from './pages/Admin/AdminPage'
import { UserPage } from './pages/User/UserPage'

function App() {
	const [user, setUser] = useState(null)
	const [userData, setUserData] = useState(null)
	const authUser = authRes => {
		if (authRes.isAdmin) {
			setUser('admin')
		} else {
			setUser('user')
			setUserData(authRes.userData)
		}
	}

	if (user === 'admin') {
		return <AdminPage />
	}
	if (user === 'user') {
		return <UserPage userData={userData} />
	} else {
		return <LoginPage auth={authUser} />
	}
}

export default App
