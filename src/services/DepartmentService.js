import axios from 'axios'

import { apiUrl } from '../config'

export class DepartmentService {
	static async getDepartments() {
		return await axios.get(`${apiUrl}/departments`)
	}

	static async createDepartment(department) {
		return await axios.post(`${apiUrl}/departments`, {
			name: department.name
		})
	}

	static async deleteDepartment(id) {
		return await axios.post(`${apiUrl}/delete_department`, {
			id: id
		})
	}

	static async updateDepartment(department) {
		return await axios.put(`${apiUrl}/departments`, {
			id: department.id,
			name: department.name
		})
	}
}
