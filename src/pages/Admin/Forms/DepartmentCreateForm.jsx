import React, { useEffect, useState } from 'react'

import { Input, Button, message } from 'antd'

import { DepartmentService } from '../../../services/DepartmentService'

export function DepartmentCreateForm() {
	const [name, setName] = useState('')

	const onCreateClick = () => {
		DepartmentService.createDepartment({ name: name })
			.then(res => {
				if (res.status === 200) {
					message.success('Отдел создан')
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
				value={name}
				onChange={e => setName(e.target.value)}
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
