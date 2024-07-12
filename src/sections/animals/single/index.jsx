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
import { useNavigate, useParams } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'yet-another-react-lightbox/styles.css';

import { AddAnimal, UpdateAnimal } from 'src/actions/animalsActions';
import useAuthStore from 'src/store/authStore';
import { AddAnimalSchema } from 'src/validation/schema';

import { S3_URL } from 'src/constants/index';
import CollarData from './CollarData';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function SingleAnimal({ animal, category }) {
  //   console.log({ animal, category });
  const [showCategoryDropdown, setShowCategoryDropdown, setDate] = useState(false);
  const [categoryId, setCategoryId] = useState(category._id);
  const [gallery, setGallery] = useState([]);
  const [imgsState, setImgState] = useState(animal.gallery);

  const { user } = useAuthStore();
  //
  const navigate = useNavigate();
  const [mainIndex, setMainIndex] = useState(-1);
  //
  const { categories } = user;
  // __________
  // _________________
  const handleUpdateGallery = (fileItems) => {
    setGallery(fileItems.map((fileItem) => fileItem.file));
  };

  const [formInputs, setFormInputs] = useState({
    animal_name: animal.name,
    healthStatus: animal.healthStatus,
    categoryId: category._id,
    categoryName: category.name,
    birth_date: new Date(animal.birth_date),
    collarId: animal.collarId,
  });
  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (i, item) => {
    setMainIndex(i);
  };

  //   const handleUpdateMainImage = (fileItems) => {
  //     setMainImage(fileItems.map((fileItem) => fileItem.file));
  //   };
  return (
    <div className="container p-5 m-auto">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const fd = new FormData(e.target);
            fd.delete('filelpond');
            gallery.forEach((image, index) => {
              fd.append(`gallery[${index}]`, image);
            });
            fd.append('newCategoryId', categoryId);
            fd.append('categoryId', category._id);
            fd.append('birth_date', formInputs.birth_date);
            fd.append('animalId', animal._id);
            fd.append('name', formInputs.animal_name);

            fd.delete(`filepond`);
            const formData = Object.fromEntries(fd.entries());
            console.log({ formData });
            // ______________________________
            AddAnimalSchema.validateSync({ ...formData, gallery }, { abortEarly: false });
            await UpdateAnimal(categoryId, fd);
            navigate(`/animals/${categoryId}/${animal._id}`);

            toast.success('Animal Updated Successfully ✔️');
          } catch (error) {
            if (error instanceof yup.ValidationError) {
              toast.error(error.errors[0]);
            } else {
              toast.error(error.message);
            }
          }
        }}
        className="flex flex-col w-11/12 items-end mx-auto gap-6 mt-2 border border-teal-200 rounded-lg p-3 pt-9"
      >
        <TextField
          value={formInputs.animal_name}
          onChange={handleChange}
          className="w-full mb-3"
          name="animal_name"
          label="Animal Name (ID / Ear Tag)"
        />

        {/* <div className=" w-full card flex justify-content-center"> */}
        <FloatLabel className="w-full ">
          <Calendar
            className="border border-zinc-200 w-full rounded-md  h-14 hover:border-zinc-800 pl-2"
            inputId="birth_date"
            // value={date}
            // onChange={(e) => setDate(e.value)}
            value={formInputs.birth_date}
            onChange={handleChange}
          />
          <label>Birth Date</label>
        </FloatLabel>
        <TextField
          value={formInputs.healthStatus}
          onChange={handleChange}
          className="w-full mb-3"
          name="healthStatus"
          label="Health Status"
        />

        <TextField
          value={formInputs.collarId}
          onChange={handleChange}
          className="w-full mb-3"
          name="collarId"
          label="Collar ID (optional)"
        />

        {!showCategoryDropdown && (
          <div className="w-full gap-24 flex">
            <div>
              Category :<strong className="mx-5">{category.name}</strong>
            </div>{' '}
            <Button variant="contained" onClick={() => setShowCategoryDropdown(true)}>
              Edit
            </Button>{' '}
          </div>
        )}

        {showCategoryDropdown && (
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
        )}
        <div className="w-full">
          {Array.isArray(imgsState) && imgsState.length > 0 && (
            <div className="flex flex-row w-full mb-4 flex-wrap gap-y-4 ">
              <Lightbox
                slides={imgsState.map((e) => ({ src: `${S3_URL}${e}`, width: 1000, height: 1000 }))}
                open={mainIndex >= 0}
                index={mainIndex}
                on={{
                  view: ({ index: i }) => {
                    setMainIndex(i);
                  },
                }}
                close={() => {
                  setMainIndex(-1);
                }}
              />
              {imgsState.map((image, i) => (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleClick(i)}
                  onKeyDown={(event) => {
                    console.log(`clicked`);
                  }}
                  className="h-[200px] w-[200px] cursor-pointer relative  m-auto rounded-sm border border-teal-500 hover:scale-105 transition-all"
                  id={image}
                  key={image}
                >
                  <img
                    alt="account"
                    className="h-full w-full object-cover"
                    src={`${S3_URL}${image}`}
                  />
                </div>
              ))}
            </div>
          )}

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
        <Button className="w-full" type="submit" variant="contained" startIcon={<AddIcon />}>
          Update Animal Data
        </Button>
      </form>
      
      {animal?.collarId && <CollarData collarId={animal?.collarId} />}
    </div>
  );
}

export default SingleAnimal;
