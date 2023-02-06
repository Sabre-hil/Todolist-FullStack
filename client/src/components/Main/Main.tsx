import React, { FormEvent, ChangeEvent ,useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from '../Task/Task';
import { createTodosThunk } from '../../redux/Thunks/taskThunks/createTodosThunk';
import styles from './Main.module.sass';
import { RootState, AppDispatch } from '../../redux/store';
import clear from '../../assets/clear.svg';


const Main: React.FC = () => {
  const { regAndAuthState } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [taskInputState, setTaskInputState] = useState({});
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (e: ChangeEvent) => {
    setTaskInputState((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    }));
  };

  const deleteTask = () => {
    setTaskInputState('');
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current?.focus()
    };
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (taskInputState) {
      dispatch(createTodosThunk(taskInputState)).then(() => {
        window.scrollTo(0, document.body.scrollHeight)
        setTaskInputState('');
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current?.focus();
        };
      });
    } else { alert('Напишите что-нибудь') }
  };

  return (
    <div>
      {regAndAuthState
        ? (
        <div>
          <form className={styles.formBlock} onSubmit={submitHandler}>
            <div className={styles.inputBlock}>
              <input ref={inputRef} className={styles.input} onChange={changeHandler} type="text" placeholder="Enter your task" name="title" />
              {taskInputState? (<img onClick={deleteTask} className={styles.remove} src={clear} alt="remove"/>) : (<></>)}
            </div>
            <div>
              <button className={styles.button} type="submit">Записать</button>
            </div>
          </form>
          <div>
            <Task />
          </div>
        </div>
          )
        : (
        <div className={styles.blockGreetings}>
          <div className={styles.greetings}>Сохраняй свои мечты вместе с нами</div>
        </div>
          )}

    </div>
  )
}

export default Main
