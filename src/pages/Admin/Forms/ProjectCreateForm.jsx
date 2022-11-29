import React, { useEffect, useState } from 'react'

import { Input, Button, message } from 'antd'

import { ProjectService } from '../../../services/ProjectService'

export function ProjectCreateForm() {
	const [title, setTitle] = useState('')

	const onCreateClick = () => {
		ProjectService.createProject({ title: title })
			.then(res => {
				if (res.status === 200) {
					message.success('Проект создан')
				} else {
					message.error('Что-то пошло не так :(')
				}
			})
			.catch(err => {
				message.error('Что-то пошло не так :(')
			})
	}

	return (
		<div
			className=''
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: 10,
				alignItems: 'flex-start'
			}}
		>
			<Input
				placeholder='Название'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<Button
				size='small'
				onClick={onCreateClick}
				style={{ marginTop: 8 }}
				type='primary'
			>
				Создать
			</Button>
		</div>
	)
}
