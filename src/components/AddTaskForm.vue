<template>
    <div>
        <v-btn @click="dialog = true">Add Task</v-btn>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title>Add new task.</v-card-title>
                <v-card-text>
                    <v-text-field variant="outlined" label="Task Name" 
                        v-model="formData.name"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="dialog = false" color="error">Close</v-btn>
                    <v-btn @click="handleSubmit" color="primary">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>  
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const NEW_TASK_EMIT = "newTask"

const emit = defineEmits([NEW_TASK_EMIT])

type FormData = {
    name: string
}

const dialog = ref(false)

const formData = reactive<FormData>({
    name: ""
})

const handleSubmit = (): void => {
    if (formData.name.trim() === "") {
        return alert("Task name cannot be empty.")
    }
    const newTask = {
        ...formData,
        uuid: generateUUID(),
        isCompleted: false
    }

    emit(NEW_TASK_EMIT, newTask)
    formData.name = ""
    dialog.value = false
}

function generateUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

</script>