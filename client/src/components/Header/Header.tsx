import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import styles from './Header.module.sass';
import Sort from '../Sort/Sort';
import { RootState, AppDispatch } from '../../redux/store';
import { logoutUserThunk } from '../../redux/Thunks/authThunks/logoutUserThunk';

const Header: React.FC = () => {
  const { regAndAuthState } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const isMounted = React.useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(regAndAuthState);
      localStorage.setItem('auth', json);
    }
    isMounted.current = true;
  }, [regAndAuthState]);

  const logout = () => {
    if (window.confirm('Ты и вправду хочешь выйти?')) {
      dispatch(logoutUserThunk());
    }
  };
  return (
    <div className={styles.header}>
      {!regAndAuthState ? (
        <div className={styles.headerBlock}>
          <div className={styles.headerBlock}>
            <div className={styles.item}><Link to="/"><img className={styles.logo} src={logo} alt="logo" /></Link></div>
            <div className={styles.item}><Link className={styles.link} to="/regestration">Зарегестрироваться</Link></div>
            <div className={styles.item}><Link className={styles.link} to="/login">Авторизироваться</Link></div>
            <div className={styles.item}><Link className={styles.link} to="/">На главную страницу</Link></div>
          </div>
        </div>
      ) : (
        <div className={styles.headerBlock}>
          <div className={styles.item}><Link to="/"><img className={styles.logo} src={logo} alt="logo" /></Link></div>
          <div><h2 className={styles.greetingsUser}>{`Привет ${regAndAuthState.name}`}</h2></div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'baseline'}}>
            <button className={styles.button} onClick={logout} type="button">Выйти</button>
            <Sort />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
