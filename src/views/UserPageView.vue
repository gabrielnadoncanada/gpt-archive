<template>
	<div>
		<router-link to="/">Back to Homepage</router-link>

		<h1>User: {{ userId }}</h1>
		<table>
			<thead>
			<tr>
				<th>Date</th>
				<th>Question Number</th>
				<th>Answer</th>
				<th>Retained Point</th>
				<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(question, index) in questions" :key="index">
				<td>{{ question.date }}</td>
				<td>{{ question.question }}</td>
				<td>{{ question.answer }}</td>
				<td>{{ question.retainedPoint }}</td>
				<td>
					<button @click="editQuestion(index)">Edit</button>
					<button @click="deleteQuestion(index)">Delete</button>
				</td>
			</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="5">
						<button @click="addQuestion()">Add question</button>
					</td>
				</tr>
			</tfoot>
		</table>
  </div>
	<div v-if="editedQuestion" class="modal">
		<div class="modal-content">
			<h2>Edit Question</h2>
			<form @submit.prevent="updateQuestion">
				<label>Date:</label>
				<input type="date" v-model="editedQuestion.date" />
				<label>Question:</label>
				<textarea type="text" v-model="editedQuestion.question" />
				<label>Answer:</label>
				<textarea type="text" v-model="editedQuestion.answer" />
				<label>Retained Point:</label>
				<textarea type="number" v-model="editedQuestion.retainedPoint" />
				<button type="submit">Save</button>
				<button @click="cancelEdit">Cancel</button>
			</form>
		</div>
</div>
</template>

<script>
export default {
	props: {
		userId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			questions: [], // Load the questions from the server for this specific user
			editedQuestion: null,
		};
	},
	methods: {
		addQuestion() {
			this.editedQuestion = {
				date: "",
				question: "",
				answer: "",
				retainedPoint: "",
				index: -1,
			};
		},
		editQuestion(index) {
			this.editedQuestion = { ...this.questions[index], index };
		},
		deleteQuestion(index) {
			this.questions.splice(index, 1);
			// Implement server-side deletion if necessary
		},
		updateQuestion() {
			if (this.editedQuestion.index === -1) {
				this.questions.push({
					date: this.editedQuestion.date,
					question: this.editedQuestion.question,
					answer: this.editedQuestion.answer,
					retainedPoint: this.editedQuestion.retainedPoint,
				});
			} else {
				this.questions[this.editedQuestion.index] = {
					date: this.editedQuestion.date,
					question: this.editedQuestion.question,
					answer: this.editedQuestion.answer,
					retainedPoint: this.editedQuestion.retainedPoint,
				};
			}
			// Implement server-side update or create if necessary
			this.editedQuestion = null;
		},

		cancelEdit() {
			this.editedQuestion = null;
		},
	},
};
</script>

<style scoped>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background-color: white;
		padding: 20px;
		border-radius: 5px;
		width: 80%;
		max-width: 500px;
	}
</style>
