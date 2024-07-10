import { Button, Grid } from '@mui/material';
import AppTasks from 'src/sections/overview/app-tasks';
import React from 'react';
import useAuthStore from 'src/store/authStore';
import ToDoModal from './Modal';

function ToDo() {
  const { user } = useAuthStore();
  return (
    <div className="mx-2  md:mx-40">
      <div className="w-full border-red-600 flex justify-end mt-4 mb-10">
        <ToDoModal />
      </div>
      {!!user?.toDoList?.length && (
        <Grid>
          <AppTasks
            title="Tasks"
            list={user.toDoList.map((todo) => ({
              id: todo._id,
              name: todo.task,
              isCompleted: todo.isCompleted,
            }))}
          />
        </Grid>
      )}
    </div>
  );
}

export default ToDo;
