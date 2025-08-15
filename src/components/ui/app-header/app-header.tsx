import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  isConstructorActive,
  isFeedActive,
  isProfileActive,
  isAuthenticated,
  userName
}) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link to='/' className={styles.link}>
          <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />
          <p
            className={`text text_type_main-default ml-2 mr-10 ${isConstructorActive ? styles.active : ''}`}
          >
            Конструктор
          </p>
        </Link>
        <Link to='/feed' className={styles.link}>
          <ListIcon type={isFeedActive ? 'primary' : 'secondary'} />
          <p
            className={`text text_type_main-default ml-2 ${isFeedActive ? styles.active : ''}`}
          >
            Лента заказов
          </p>
        </Link>
      </div>
      <Link to='/' className={styles.logo}>
        <Logo className='' />
      </Link>
      <Link
        to={isAuthenticated ? '/profile' : '/login'}
        className={styles.link}
      >
        <div className={styles.link_position_last}>
          <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
          <p
            className={`text text_type_main-default ml-2 ${isProfileActive ? styles.active : ''}`}
          >
            {userName || 'Личный кабинет'}
          </p>
        </div>
      </Link>
    </nav>
  </header>
);
