import axios from 'axios'

import { apiUrl } from '../config'

export class EmployeeService {
	static async getEmployees() {
		return await axios.get(`${apiUrl}/employees`)
	}

	static async createEmployee(employee) {
		return await axios.post(`${apiUrl}/employees`, {
			firstName: employee.firstName,
			secondName: employee.secondName,
			DepartmentId: employee.departmentId,
			ProjectId: employee.projectId
		})
	}

	static async deleteEmployee(id) {
		return await axios.post(`${apiUrl}/delete_employee`, {
			id: id
		})
	}

	static async updateEmployee(employee) {
		return await axios.put(`${apiUrl}/employees`, {
			id: employee.id,
			firstName: employee.firstName,
			secondName: employee.secondName,
			DepartmentId: employee.departmentId,
			ProjectId: employee.projectId
		})
	}
}
