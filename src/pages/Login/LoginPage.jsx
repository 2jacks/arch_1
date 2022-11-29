import React, { useEffect, useState } from 'react'
import styles from './LoginPage.module.css'

import axios from 'axios'

import { Input, Button, message } from 'antd'
import { UserOutlined, ApiOutlined } from '@ant-design/icons'

export function LoginPage({ auth }) {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const [errorMessage, setErrorMessage] = useState(null)

	const onLoginChange = e => {
		setLogin(e.target.value)
	}
	const onPasswordChange = e => {
		setPassword(e.target.value)
	}

	const checkUser = () => {
		if (login === 'admin' && password === '12345') {
			auth({ isAdmin: true })
		}

		if (password === '12345678') {
			axios
				.post('http://localhost:3001/auth', {
					username: login
				})
				.then(res => {
					if (res.status === 200) {
						auth({ isAdmin: false, userData: res.data })
						// axios.get('')
					} else {
						setErrorMessage('Неправильные данные')
					}
				})
		} else {
			setErrorMessage('Неправильные данные')
		}
	}

	useEffect(() => {
		if (errorMessage) {
			message.error(errorMessage)
		}
		setTimeout(() => {
			setErrorMessage(null)
		}, 3000)
	}, [errorMessage])

	return (
		<div className={styles.login}>
			<Input
				placeholder='Логин:'
				prefix={<UserOutlined />}
				value={login}
				onChange={onLoginChange}
				style={{ marginBottom: 20 }}
			/>
			<Input
				placeholder='Пароль:'
				prefix={<ApiOutlined />}
				value={password}
				onChange={onPasswordChange}
				style={{ marginBottom: 20 }}
			/>
			<Button onClick={checkUser} type={'primary'}>
				Войти
			</Button>
		</div>
	)
}
