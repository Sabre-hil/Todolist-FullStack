import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createFullTodosThunk } from '../../redux/Thunks/taskThunks/createFullTodosThunk';
import styles from './TaskInfo.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

interface valueType {
  text: string
}

const TaskInfo: React.FC = () => {
  const { fullTaskState } = useSelector((state: RootState) => state.task)
  const [value, setValue] = useState<valueType>({text: ''});
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    dispatch(createFullTodosThunk(id));
  }, [])

   const changeText = (data: string) => {
    setIsEdit(true)
    setValue({text: data});
    alert('Вы можете изменять размер поля потянун правый нижний угол')
   }

   const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
     setValue((prev) => ({
       ...prev,
       [(e.target as HTMLTextAreaElement).name]: (e.target as HTMLTextAreaElement).value
     }))
   }

  const submitHabdler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const responce = await fetch(`http://localhost:3005/change/:${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    })
    if (responce.ok) {
      const data = await responce.json();
      setValue(data);
      navigate('/')
    }
  }

  return (
    <div className={styles.mainBlock}>
      <div className={styles.subMainBlock}>
        <div className={styles.whatCreateTaskBlock}>
          <span className={styles.whatCreateTask}>создано: {fullTaskState?.createdAt.replace(/-/gim, '.').replace(/[a-z]/gim, '  ').replace(/:\d\d.\d\d\d/gim, '')}</span>
        </div>
        <form onSubmit={submitHabdler}>
        <div className={styles.textBlock}>
          {isEdit? ( 
            <textarea name="text" cols={30} rows={10} className={styles.editInput} value={value.text}
            onChange={onChangeHandler}
            ></textarea>
            

           ) : (<span onClick={() => changeText(fullTaskState?.title)} className={styles.text}>{fullTaskState?.title}</span>)
          }
        </div>
        <div className={styles.changeTaskBlock}>
          <button type='submit' className={styles.changeTaskButton}>Редактировать</button>
          <button className={styles.changeTaskButton}><Link className={styles.homeLink} to="/">Вернуться назад</Link></button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default TaskInfo;