import useAuthStore from 'src/store/authStore';
import { API_URL } from 'src/constants';

export const addToDo = async (task) => {
  try {
    const { user } = useAuthStore.getState();

    console.log({ user, task });

    useAuthStore.setState({
      user: { ...user, toDoList: [...(user?.toDoList ?? []), { task, isCompleted: false }] },
    });

    const response = await fetch(`${API_URL}/todo/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task, userId: user._id }),
    });
    const { toDoList, message } = await response.json();
    useAuthStore.setState({
      user: { ...user, toDoList },
    });
    return;
  } catch (error) {
    console.log(` err adding task ==>`, { error });
  }
};

export const deleteToDo = async (taskId) => {
  try {
    const { user } = useAuthStore.getState();

    console.log({ user, taskId });

    useAuthStore.setState({
      user: { ...user, toDoList: (user?.toDoList ?? []).filter((todo) => todo._id !== taskId) },
    });

    const response = await fetch(`${API_URL}/todo`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId, userId: user._id }),
    });
    const { toDoList, message } = await response.json();
    useAuthStore.setState({
      user: { ...user, toDoList },
    });
    return;
  } catch (error) {
    console.log(` err deleting task ==>`, { error });
  }
};

export const toggleToDoIsCompleted = async (task) => {
  try {
    const { user, token } = useAuthStore.getState();

    // console.log({ user, taskId });

    useAuthStore.setState({
      user: {
        ...user,
        toDoList: (user?.toDoList ?? []).map((todo) => {
          if (todo._id === task.id) {
            return { ...todo, isCompleted: !todo.isCompleted };
          }
          return todo;
        }),
      },
    });

    const response = await fetch(`${API_URL}/todo`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskId: task.id, task: task.task, isCompleted: task.isCompleted }),
    });
    const { toDoList, message } = await response.json();
    useAuthStore.setState({
      user: { ...user, toDoList },
    });
    return;
  } catch (error) {
    console.log(` err toggling task ==>`, { error });
  }
};
