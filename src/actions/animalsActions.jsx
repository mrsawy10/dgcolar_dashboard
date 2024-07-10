import useAuthStore from 'src/store/authStore';
import { API_URL } from 'src/constants';
import axios from 'axios';

export const AddAnimal = async (categoryId, fd) => {
  try {
    const { user, token } = useAuthStore.getState();

    const animal = Object.fromEntries(fd.entries());
    console.log(`action`, { animal });

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
    // const response = await fetch(`${API_URL}/categories/animals/add`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     authorization: `Bearer ${token}`,
    //   },
    //   body: fd,
    // });

    // console.log(`from Action`, { fd, animal });
    const response = await axios.post(`${API_URL}/categories/animals/add`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    });

    // // Update state with response data
    // const { categories, error } = await response.json();
    // useAuthStore.setState({
    //   user: { ...user, categories },
    // });
    return;
  } catch (error) {
    console.log(` err adding animal ==>`, { error });
  }
};

export const deleteAnimal = async (categoryId, animalId) => {
  try {
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
    const response = await fetch(`${API_URL}/animals/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryId, animalId }),
    });

    // Update state with response data
    const { categories, error } = await response.json();
    useAuthStore.setState({
      user: { ...user, categories },
    });
    return;
  } catch (error) {
    console.log(` err deleting animal ==>`, { error });
  }
};

export const updateAnimal = async (categoryId, animalId, updatedAnimal) => {
  try {
    const { user, token } = useAuthStore.getState();

    // Update state locally
    useAuthStore.setState({
      user: {
        ...user,
        categories: user.categories.map((category) =>
          category._id === categoryId
            ? {
                ...category,
                animals: category.animals.map((animal) =>
                  animal._id === animalId ? { ...animal, ...updatedAnimal } : animal
                ),
              }
            : category
        ),
      },
    });

    // Make API call
    const response = await fetch(`${API_URL}/animals/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryId, animalId, ...updatedAnimal }),
    });

    // Update state with response data
    const { categories, error } = await response.json();
    useAuthStore.setState({
      user: { ...user, categories },
    });
    return;
  } catch (error) {
    console.log(` err updating animal ==>`, { error });
  }
};
