import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { addToDo } from 'src/actions/toDoActions';
import AddIcon from '@mui/icons-material/Add';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import Autocomplete from '@mui/material/Autocomplete';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import * as yup from 'yup';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { AddAnimal } from 'src/actions/animalsActions';
import useAuthStore from 'src/store/authStore';
import { AddAnimalSchema } from 'src/validation/schema';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// import { AddCategory } from 'src/actions/categoryActions';

export default function NewAnimalModal() {
  const { user } = useAuthStore();

  const { categories } = user;
  // __________
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  // _________________
  const [gallery, setGallery] = useState([]);
  const handleUpdateGallery = (fileItems) => {
    setGallery(fileItems.map((fileItem) => fileItem.file));
  };
  return (
    <div className="card flex justify-content-center">
      <Button
        onClick={() => {
          setVisible(true);
        }}
        variant="contained"
        startIcon={<LibraryAddIcon />}
        sx={{ backgroundColor: `#000` }}
        // className="p-9"
      >
        Add New Animal
      </Button>
      <Dialog
        header="New Animal"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              const fd = new FormData(e.target);
              fd.delete('filelpond');
              gallery.forEach((image, index) => {
                fd.append(`gallery[${index}]`, image);
              });
              fd.append('categoryId', categoryId);
              fd.append('birth_date', date);
              fd.delete(`filepond`);
              const formData = Object.fromEntries(fd.entries());
              // ______________________________
              AddAnimalSchema.validateSync({ ...formData, gallery }, { abortEarly: false });

              if (formData.animal_name) {
                fd.append('name', formData.animal_name);
                await AddAnimal(categoryId, fd);
              } else {
                return toast.warning('Animal Name is required');
              }
              setVisible(false);
              toast.success('Animal Added Successfully ✔️');
            } catch (error) {
              if (error instanceof yup.ValidationError) {
                toast.error(error.errors[0]);
              } else {
                toast.error(error.message);
              }
            }
          }}
          className="flex flex-col w-11/12 items-end mx-auto gap-6 mt-2"
        >
          <TextField
            className="w-full mb-3"
            name="animal_name"
            label="Animal Name (ID / Ear Tag)"
          />

          {/* <div className=" w-full card flex justify-content-center"> */}
          <FloatLabel className="w-full ">
            <Calendar
              className="border border-zinc-200 w-full rounded-md  h-14 hover:border-zinc-800 pl-2"
              inputId="birth_date"
              value={date}
              onChange={(e) => setDate(e.value)}
            />
            <label>Birth Date</label>
          </FloatLabel>
          <TextField className="w-full mb-3" name="healthStatus" label="Health Status" />

          <TextField className="w-full mb-3" name="collarId" label="Collar ID (optional)" />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categories.map((c) => ({ ...c, label: c.name }))}
            onChange={(_, newValue) => {
              setCategoryId(newValue?._id);
            }}
            renderInput={(params) => <TextField {...params} label="Category" />}
            className="w-full "
          />
          <div className="w-full">
            <FilePond
              files={gallery}
              onupdatefiles={handleUpdateGallery}
              allowMultiple
              maxFiles={5}
              acceptedFileTypes={['image/*']}
              labelIdle="Drag & Drop  Animal Images (Max 5) or <span class='filepond--label-action'>Browse</span>"
            />
          </div>
          {/* </d</Dialog>iv> */}
          <Button type="submit" variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </form>
      </Dialog>
    </div>
  );
}
