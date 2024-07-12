import useAuthStore from 'src/store/authStore';
import { API_URL } from 'src/constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGeneralStore from '../store/generalStore';

export const UpdateAnimal = async (categoryId, fd) => {
  const { user, token } = useAuthStore.getState();
  const { setGeneralIsLoading } = useGeneralStore.getState();
  // ______________
  setGeneralIsLoading(true);
  const animal = Object.fromEntries(fd.entries());
  // Update state locally
    // useAuthStore.setState({
    //   user: {
    //     ...user,
    //     categories: user.categories.map((category) =>
    //       category._id === categoryId
    //         ? { ...category, animals: [...category.animals, animal] }
    //         : category
    //     ),
    //   },
    // });
  // Make API call
  const response = await fetch(`${API_URL}/categories/animals/update`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: fd,
  });
  const result = await response.json();
  setGeneralIsLoading(false);
  if (!response.ok) {
    throw new Error(result.message);
  }
  useAuthStore.setState({
    user: { ...user, categories: result.categories },
  });
  return;
};
export const AddAnimal = async (categoryId, fd) => {
  const { user, token } = useAuthStore.getState();
  const { setGeneralIsLoading } = useGeneralStore.getState();
  // ______________
  setGeneralIsLoading(true);
  const animal = Object.fromEntries(fd.entries());
  // Update state locally
  useAuthStore.setState({
    user: {
      ...user,
      categories: user.categories.map((category) =>
        category._id === categoryId
          ? { ...category, animals: [...category.animals, animal] }
          : category
      ),
    },
  });
  // Make API call
  const response = await fetch(`${API_URL}/categories/animals/add`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: fd,
  });
  const result = await response.json();
  setGeneralIsLoading(false);
  if (!response.ok) {
    throw new Error(result.message);
  }
  useAuthStore.setState({
    user: { ...user, categories: result.categories },
  });
  return;
};

export const deleteAnimal = async (categoryId, animalId) => {
  try {
    console.log({ categoryId, animalId });

    const { user, token } = useAuthStore.getState();

    // Update state locally
    useAuthStore.setState({
      user: {
        ...user,
        categories: user.categories.map((category) =>
          category._id === categoryId
            ? { ...category, animals: category.animals.filter((animal) => animal._id !== animalId) }
            : category
        ),
      },
    });

    // Make API call
    const response = await fetch(`${API_URL}/categories/animals/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryId, animalId }),
    });

    // Update state with response data
    const result = await response.json();

    const { categories, error } = result;

    if (!response.ok) {
      throw new Error(result.error);
    }

    useAuthStore.setState({
      user: { ...user, categories },
    });

    return;
  } catch (error) {
    toast.error(error.message);
    console.log(` err deleting animal ==>`, { error }, error);
  }
};

// export const updateAnimal = async (categoryId, animalId, updatedAnimal) => {
//   try {
//     const { user, token } = useAuthStore.getState();

//     // Update state locally
//     useAuthStore.setState({
//       user: {
//         ...user,
//         categories: user.categories.map((category) =>
//           category._id === categoryId
//             ? {
//                 ...category,
//                 animals: category.animals.map((animal) =>
//                   animal._id === animalId ? { ...animal, ...updatedAnimal } : animal
//                 ),
//               }
//             : category
//         ),
//       },
//     });

//     // Make API call
//     const response = await fetch(`${API_URL}/animals/update`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ categoryId, animalId, ...updatedAnimal }),
//     });

//     // Update state with response data
//     const { categories, error } = await response.json();
//     useAuthStore.setState({
//       user: { ...user, categories },
//     });
//     return;
//   } catch (error) {
//     console.log(` err updating animal ==>`, { error });
//   }
// };
