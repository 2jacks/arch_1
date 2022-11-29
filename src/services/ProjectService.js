import axios from 'axios'

import { apiUrl } from '../config'

export class ProjectService {
	static async getProjects() {
		return await axios.get(`${apiUrl}/projects`)
	}

	static async createProject(project) {
		return await axios.post(`${apiUrl}/projects`, {
			title: project.title
		})
	}

	static async deleteProject(project) {
		return await axios.post(`${apiUrl}/delete_project`, {
			id: project.id
		})
	}

	static async updateProject(project) {
		return await axios.put(`${apiUrl}/projects`, {
			id: project.id,
			title: project.title
		})
	}
}
