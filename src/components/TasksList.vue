<template>
    <div v-for="task in tasks">
        <TaskCard :task="task" :key="task.uuid" />
    </div>
</template>

<script setup lang="ts">
import { Task } from '@/types';
import TaskCard from './TaskCard.vue';

defineProps<{ tasks: Task[] }>()
</script>