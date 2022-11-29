import React, { useState, useEffect } from 'react'
import styles from './AdminPage.module.css'

import { Tabs, Button, Popover, Input, message } from 'antd'
import { AgGridReact } from 'ag-grid-react'

import { DepartmentService } from '../../services/DepartmentService'
import { ProjectService } from '../../services/ProjectService'
import { EmployeeService } from '../../services/EmployeeService'

import { DepartmentCreateForm } from './Forms/DepartmentCreateForm'
import { EmployeeCreateForm } from './Forms/EmployeeCreateForm'
import { ProjectCreateForm } from './Forms/ProjectCreateForm'

const departmentsColumns = [
	{ headerName: 'ID', field: 'id' },
	{ headerName: 'Название', field: 'name', editable: true }
]
const projectsColumns = [
	{ headerName: 'ID', field: 'id' },
	{ headerName: 'Название', field: 'title', editable: true }
]
const employeesColumns = [
	{ headerName: 'ID', field: 'id' },
	{
		headerName: 'Имя',
		field: 'firstName',
		editable: true
	},
	{
		headerName: 'Фамилия',
		field: 'secondName',
		editable: true
	},
	{
		headerName: 'Отдел',
		field: 'Department',
		editable: true
	},
	{
		headerName: 'Текущий проект',
		field: 'Project',
		editable: true
	}
]

export function AdminPage() {
	const [departments, setDepartments] = useState(null)
	const [projects, setProjects] = useState(null)
	const [employees, setEmployees] = useState(null)

	const [projectToDelete, setProjectToDelete] = useState(null)
	const [departmentToDelete, setDepartmentToDelete] = useState(null)
	const [employeeToDelete, setEmployeeToDelete] = useState(null)

	useEffect(() => {
		DepartmentService.getDepartments().then(res => setDepartments(res.data))
		ProjectService.getProjects().then(res => setProjects(res.data))
		EmployeeService.getEmployees().then(res => {
			let data = res.data.map(emp => {
				return {
					...emp,
					Project: emp.Project.title,
					Department: emp.Department.name
				}
			})

			setEmployees(data)
		})
	}, [])

	const onEmployeeCellEditComplete = data => {
		EmployeeService.updateEmployee(data).then(res => {
			console.log(res)
		})
	}
	const onProjectCellEditComplete = data => {
		ProjectService.updateProject(data).then(res => {
			console.log(res)
		})
	}
	const onDepartmentCellEditComplete = data => {
		DepartmentService.updateDepartment(data).then(res => {
			console.log(res)
		})
	}

	return (
		<div>
			<h1>Панель администратора</h1>
			<div className={styles['tabs']}>
				<Tabs
					defaultActiveKey='employees'
					items={[
						{
							label: `Проекты`,
							key: 'projects',
							children: (
								<div className={styles['table-wrapper']}>
									<h2>Проекты</h2>
									<div className={styles.header}>
										<Popover
											trigger='click'
											content={<ProjectCreateForm />}
											placement='right'
										>
											<Button type='primary'>Создать</Button>
										</Popover>
										<Popover
											trigger='click'
											content={
												<div>
													<Input
														placeholder={'ID проекта'}
														onChange={e => setProjectToDelete(e.target.value)}
													/>
													<Button
														danger
														type='primary'
														size='small'
														onClick={() => {
															console.log('btn proj', projectToDelete)
															ProjectService.deleteProject({
																id: projectToDelete
															})
																.then(() => {
																	message.success('Проект удален')
																})
																.catch(() => {
																	message.error('Что-то пошло не так :(')
																})
														}}
													>
														Удалить
													</Button>
												</div>
											}
											placement='right'
										>
											<Button type='dashed' danger>
												Удалить
											</Button>
										</Popover>
									</div>

									<div className={styles['table'] + ' ag-theme-alpine'}>
										<AgGridReact
											rowData={projects}
											columnDefs={projectsColumns}
											onCellEditingStopped={e =>
												onProjectCellEditComplete(e.data)
											}
										></AgGridReact>
									</div>
								</div>
							)
						},
						{
							label: `Отделы`,
							key: 'departments',
							children: (
								<div className={styles['table-wrapper']}>
									<h2>Отделы</h2>
									<div className={styles['header']}>
										<Popover
											trigger='click'
											content={<DepartmentCreateForm />}
											placement='right'
										>
											<Button type='primary'>Создать</Button>
										</Popover>

										<Popover
											trigger='click'
											content={
												<div>
													<Input
														placeholder={'ID отдела'}
														onChange={e =>
															setDepartmentToDelete(e.target.value)
														}
													/>
													<Button
														danger
														type='primary'
														size='small'
														onClick={() => {
															console.log('btn proj', departmentToDelete)
															DepartmentService.deleteDepartment(
																departmentToDelete
															)
																.then(() => {
																	message.success('Отдел удален')
																})
																.catch(() => {
																	message.error('Что-то пошло не так :(')
																})
														}}
													>
														Удалить
													</Button>
												</div>
											}
											placement='right'
										>
											<Button type='dashed' danger>
												Удалить
											</Button>
										</Popover>
									</div>

									<div className={styles['table'] + ' ag-theme-alpine'}>
										<AgGridReact
											rowData={departments}
											columnDefs={departmentsColumns}
											onCellEditingStopped={e =>
												onDepartmentCellEditComplete(e.data)
											}
										></AgGridReact>
									</div>
								</div>
							)
						},
						{
							label: `Сотрудники`,
							key: 'employees',
							children: (
								<div className={styles['table-wrapper']}>
									<h2>Сотрудники</h2>
									<div className={styles.header}>
										<Popover
											trigger='click'
											content={<EmployeeCreateForm />}
											placement='right'
										>
											<Button type='primary'>Создать</Button>
										</Popover>

										<Popover
											trigger='click'
											content={
												<div>
													<Input
														placeholder={'ID сотрудника'}
														onChange={e => setEmployeeToDelete(e.target.value)}
													/>
													<Button
														danger
														type='primary'
														size='small'
														onClick={() => {
															console.log('btn proj', employeeToDelete)
															EmployeeService.deleteEmployee(employeeToDelete)
																.then(() => {
																	message.success('Сотрудник удален')
																})
																.catch(() => {
																	message.error('Что-то пошло не так :(')
																})
														}}
													>
														Удалить
													</Button>
												</div>
											}
											placement='right'
										>
											<Button type='dashed' danger>
												Удалить
											</Button>
										</Popover>
									</div>

									<div className={styles['table'] + ' ag-theme-alpine'}>
										<AgGridReact
											rowData={employees}
											columnDefs={employeesColumns}
											editType='fullRow'
											onRowEditingStopped={e =>
												onEmployeeCellEditComplete(e.data)
											}
										></AgGridReact>
									</div>
								</div>
							)
						}
					]}
				/>
			</div>
		</div>
	)
}
