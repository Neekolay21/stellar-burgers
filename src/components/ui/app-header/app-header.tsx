import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

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
        <NavLink
          to='/'
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />
          <p
            className={`text text_type_main-default ml-2 mr-10 ${isConstructorActive ? styles.active : ''}`}
          >
            Конструктор
          </p>
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          <ListIcon type={isFeedActive ? 'primary' : 'secondary'} />
          <p
            className={`text text_type_main-default ml-2 ${isFeedActive ? styles.active : ''}`}
          >
            Лента заказов
          </p>
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <NavLink
        to={isAuthenticated ? '/profile' : '/login'}
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
      >
        <div className={styles.link_position_last}>
          <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
          <p className={`text text_type_main-default ml-2`}>
            {userName || 'Личный кабинет'}
          </p>
        </div>
      </NavLink>
    </nav>
  </header>
);
