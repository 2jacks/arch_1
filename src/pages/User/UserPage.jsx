import React, { useEffect, useState } from 'react'
import styles from './UserPage.module.css'

import { Input, Button, message } from 'antd'
import { DepartmentService } from '../../services/DepartmentService'
import { ProjectService } from '../../services/ProjectService'
import { EmployeeService } from '../../services/EmployeeService'

export function UserPage({ userData }) {
	const [name, setName] = useState(userData.firstName)
	const [secondName, setSecondName] = useState(userData.secondName)
	const [project, setProject] = useState(userData.ProjectId)
	const [department, setDepartment] = useState(userData.DepartmentId)

	const [departments, setDepartments] = useState(null)
	const [projects, setProjects] = useState(null)

	useEffect(() => {
		DepartmentService.getDepartments().then(res => {
			setDepartments(res.data)
			let userDep = res.data.find(dep => dep.id === userData.DepartmentId)
			console.log(userDep)
			setDepartment(userDep.name)
		})
		ProjectService.getProjects().then(res => {
			setProjects(res.data)
			let userProj = res.data.find(proj => proj.id === userData.ProjectId)
			console.log(userProj)
			setProject(userProj.title)
		})
	}, [])

	const updateUser = () => {
		EmployeeService.updateEmployee({
			id: userData.id,
			firstName: name,
			secondName: secondName,
			ProjectId: userData.ProjectId,
			DepartmentId: userData.DepartmentId
		}).then(() => {
			message.success('Изменено')
		})
	}

	return (
		<div className={styles.card}>
			<div className={styles.row}>
				<Input
					placeholder='Имя'
					value={name}
					onChange={e => setName(e.target.value)}
					className={styles.input}
				/>
				<Button type='primary' onClick={updateUser}>
					Изменить
				</Button>
			</div>
			<div className={styles.row}>
				<Input
					placeholder='Фамилия'
					value={secondName}
					onChange={e => setSecondName(e.target.value)}
					className={styles.input}
				/>
				<Button type='primary' onClick={updateUser}>
					Изменить
				</Button>
			</div>
			<div className={styles.row}>
				<Input
					placeholder='Имя'
					value={project}
					onChange={e => setName(e.target.value)}
					className={styles.input}
					disabled
				/>
			</div>
			<div className={styles.row}>
				<Input
					placeholder='Имя'
					value={department}
					onChange={e => setName(e.target.value)}
					className={styles.input}
					disabled
				/>
			</div>
		</div>
	)
}
