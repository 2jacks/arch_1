import React, { useEffect, useState } from 'react'

import { Input, Button, message, Select } from 'antd'

import { EmployeeService } from '../../../services/EmployeeService'
import { DepartmentService } from '../../../services/DepartmentService'
import { ProjectService } from '../../../services/ProjectService'

export function EmployeeCreateForm() {
	const [projects, setProjects] = useState(null)
	const [departments, setDepartments] = useState(null)

	useEffect(() => {
		DepartmentService.getDepartments().then(res => {
			let deps = res.data.map(dep => ({ value: dep.id, label: dep.name }))
			console.log(deps)
			setDepartments(deps)
		})
		ProjectService.getProjects().then(res => {
			let projs = res.data.map(proj => ({ value: proj.id, label: proj.title }))
			console.log(projs)
			setProjects(projs)
		})
	}, [])

	const [firstName, setFirstName] = useState('')
	const [secondName, setSecondName] = useState('')
	const [projectId, setProjectId] = useState('')
	const [departmentId, setDepartmentId] = useState('')

	const onCreateClick = () => {
		console.log(firstName, secondName, projectId, departmentId)
		EmployeeService.createEmployee({
			firstName: firstName,
			secondName: secondName,
			projectId: projectId,
			departmentId: departmentId
		})
			.then(res => {
				if (res.status === 200) {
					message.success('Пользователь создан')
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
				padding: 10
			}}
		>
			<Input
				placeholder='Имя'
				value={firstName}
				onChange={e => setFirstName(e.target.value)}
				style={{ marginBottom: 8 }}
			/>
			<Input
				placeholder='Фамилия'
				value={secondName}
				onChange={e => setSecondName(e.target.value)}
				style={{ marginBottom: 8 }}
			/>
			<Select
				placeholder='Отдел'
				options={departments}
				onChange={value => {
					console.log(value)
					setDepartmentId(value)
				}}
				style={{ marginBottom: 8 }}
			/>
			<Select
				placeholder='Проект'
				options={projects}
				onChange={setProjectId}
				style={{ marginBottom: 8 }}
			/>
			<Button
				size='small'
				onClick={onCreateClick}
				type='primary'
				style={{ alignSelf: 'flex-start' }}
			>
				Создать
			</Button>
		</div>
	)
}
