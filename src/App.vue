<template>
	<v-app>
		<v-main>
			<div class="app-container">
				<AddTaskForm @newTask="handleNewTask" />
				<TasksList :tasks="tasks" />
			</div>
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import "./assets/app.css"
import { Task } from "./types";
import { AddTaskForm, TasksList } from "./components"
import eventBus from "./eventBus";
import { EMIT_DELETE_TASK, EMIT_TOGGLE_IS_COMPLETED } from "./constants/labels";

const STORAGE_KEY = "tasks"

const tasks = reactive<Task[]>([])

onMounted(() => {
	const storage = localStorage.getItem(STORAGE_KEY)

	const storageTasks = storage ? JSON.parse(storage) : []
	tasks.push(...storageTasks)

	eventBus.on(EMIT_DELETE_TASK, handleDeleteTask)
	eventBus.on(EMIT_TOGGLE_IS_COMPLETED, handleTaskToggleIsCompleted)
})

const handleNewTask = (newTask: Task) => {
	tasks.push(newTask)
}

const handleDeleteTask = (taskUuid: string) => {
	const index = tasks.findIndex(task => task.uuid === taskUuid)
	if (index !== -1) {
		tasks.splice(index, 1)
	}
}

const handleTaskToggleIsCompleted = (taskUuid: string) => {
	const index = tasks.findIndex(task => task.uuid === taskUuid)
	if (index !== -1) {
		tasks[index].isCompleted = !tasks[index].isCompleted
	}
}

watch(tasks, (newTasks) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
})


</script>
