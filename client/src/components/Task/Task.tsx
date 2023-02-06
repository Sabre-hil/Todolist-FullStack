import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './Task.module.sass';
import doneImg from '../../assets/done.png';
import deleteImg from '../../assets/delete.png';
import { fetchTodos } from '../../redux/Thunks/taskThunks/getTodosThunk';
import { AppDispatch, RootState } from '../../redux/store';
import { taskDoneThunk } from '../../redux/Thunks/taskThunks/taskDoneThunk';
import { taskDeleteThunk } from '../../redux/Thunks/taskThunks/taskDeleteThunk';

interface Task {
  id: number,
  title: string,
  user_id: number,
  updatedAt: string,
  createdAt: string,
  isDone: boolean | null,
};

const Task: React.FC = () => {
  const { taskState } = useSelector((state: RootState) => state.task);
  const { sort } = useSelector((state: RootState) => state.sort);
  const dispatch = useDispatch<AppDispatch>();

  const userJson = localStorage.getItem('auth');
  const parse = userJson !== null ? JSON.parse(userJson): '{}';
  const sortBy = sort.sortProperty;

  useEffect(() => {
    dispatch(fetchTodos({parse, sortBy}));
  }, [sort]);


  const clickIsDone = async (id: number, isDone: boolean | null) => {
    dispatch(taskDoneThunk({id, isDone})).then( async () => { await dispatch(fetchTodos({parse, sortBy})) });
  };

  const clickDelete = async (id: number, isDone: boolean | null) => {
    dispatch(taskDeleteThunk({id, isDone})).then( async () => {
      await dispatch(fetchTodos({parse, sortBy}));
    });
  };

  return (
    <div className={styles.container}>
    <div className={styles.mainBlock}>
      {taskState?.map((el) => (
        <div key={el.id} className={el.isDone !== true? styles.parentBlock : styles.parentBlockUndone}>
          
      <div className={styles.block} key={el.id}>
        <div>
          <span className={styles.blockText}>{el.title}
          </span>
          </div>
      </div>
      <div className={styles.blockDone}>
      {el.isDone !== true? (<>
      <img onClick={() => clickIsDone(el.id, el.isDone)} className={styles.doneImg} src={doneImg} alt="сделано изображение" />
      <button className={styles.buttonTaskInfo}><Link className={styles.linkTaskInfo} to={`task/${el.id}`}>Посмотреть</Link></button>
      </>) : (<></>)}
      <img onClick={() => clickDelete(el.id, el.isDone)} className={styles.deleteImg} src={deleteImg} alt="удалить изображение" />
      </div>
      </div>
    ))}
    </div>
    </div>
  )
}

export default Task
