import useAuthStore from 'src/store/authStore';
import { API_URL } from 'src/constants';

export const AddCategory = async (categoryName) => {
  try {
    const { user, token } = useAuthStore.getState();

    useAuthStore.setState({
      user: {
        ...user,
        categories: [...(user?.categories ?? []), { name: categoryName, animals: [] }],
      },
    });

    const response = await fetch(`${API_URL}/categories/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: categoryName }),
    });
    const { categories, error } = await response.json();
    useAuthStore.setState({
      user: { ...user, categories },
    });
    return;
  } catch (error) {
    console.log(` err adding category ==>`, { error });
  }
};

// ____________________________________________________

export const DeleteCategory = async (categoryId) => {
  try {
    const { user, token } = useAuthStore.getState();

    useAuthStore.setState({
      user: {
        ...user,
        categories: (user?.categories ?? []).filter((category) => category._id !== categoryId),
      },
    });

    const response = await fetch(`${API_URL}/categories/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryId }),
    });
    const { categories, error } = await response.json();
    useAuthStore.setState({
      user: { ...user, categories },
    });
    return;
  } catch (error) {
    console.log(` err deleting category ==>`, { error });
  }
};

// export const fetchCategories = async () => {
//   try {
//     const { user } = useAuthStore.getState();

//     console.log({ user });

//     const response = await fetch(`${API_URL}/categories/${user._id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const { categories, message } = await response.json();
//     useAuthStore.setState({
//       user: { ...user, categories },
//     });
//     return;
//   } catch (error) {
//     console.log(` err fetching categories ==>`, { error });
//   }
// };
