import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { addToDo } from 'src/actions/toDoActions';
import AddIcon from '@mui/icons-material/Add';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { toast } from 'react-toastify';

export default function ToDoModal() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="card flex justify-content-center">
      <Button
        onClick={() => {
          // console.log('clicked');
          // addToDo();
          setVisible(true);
        }}
        variant="contained"
        startIcon={<LibraryAddIcon />}
      >
        Add New Task
      </Button>
      <Dialog
        header="New Task"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const formData = Object.fromEntries(fd.entries());
            // _______________________________________________
            if (formData.task) {
              await addToDo(formData.task);
            } else {
              return toast.warning('Task name is required');
            }
            setVisible(false);
          }}
          className="flex flex-col w-11/12 items-end mx-auto gap-6 mt-2"
        >
          <TextField className="w-full mb-3" name="task" label="Task Name" />

          <Button type="submit" variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </form>
      </Dialog>
    </div>
  );
}
