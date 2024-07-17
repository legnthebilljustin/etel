<template>
    <v-card v-if="task" class="mt-3 px-3 py-2">
        <v-checkbox :label="task.name" hide-details
            v-model="task.isCompleted"
            @click="toggleCompleted(task.uuid)"
        ></v-checkbox>
        <v-btn @click="handleDelete(task.uuid)" size="x-small" color="error">DELETE</v-btn>
    </v-card>
</template>

<script setup lang="ts">
import { EMIT_DELETE_TASK, EMIT_TOGGLE_IS_COMPLETED } from '@/constants/labels';
import eventBus from '@/eventBus';
import { Task } from '@/types';

defineProps<{ task: Task }>()

const handleDelete = (taskUuid: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
        eventBus.emit(EMIT_DELETE_TASK, taskUuid)
    }
}

const toggleCompleted = (taskUuid: string) => {
    eventBus.emit(EMIT_TOGGLE_IS_COMPLETED, taskUuid)
}

</script>