<template>
	<h1>Users</h1>
	<form @submit.prevent="addUser">
		<input type="text" v-model="newUser" placeholder="Enter a user name">
		<button type="submit">Add User</button>
	</form>
	<ul>
		<li v-for="(user, index) in users" :key="index">
			{{ user }}
			<router-link :to="{ name: 'UserPage', params: { userId: index.toString() } }">View</router-link>
			<button @click="deleteUser(index)">Delete</button>
		</li>
	</ul>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			users: [],
			newUser: "",
		};
	},
	async mounted() {
		await this.getUsers();
	},
	methods: {
		async getUsers() {
			const {data} = await axios.get("/.netlify/functions/crud");
			this.users = JSON.parse(data);
		},
		async addUser() {
			if (this.newUser.trim()) {
				this.users.push(this.newUser.trim());
				await this.updateUsers();
				this.newUser = "";
			}
		},
		async deleteUser(index) {
			this.users.splice(index, 1);
			await this.updateUsers();
		},
		async updateUsers() {
			await axios.post("/.netlify/functions/crud", JSON.stringify(this.users));
			await this.getUsers();
		},
	},
};
</script>
