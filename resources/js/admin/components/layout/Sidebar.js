import React from 'react';
import { matchPath } from 'react-router';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import {
  GlobalOutlined,
  UserOutlined,
  FileImageOutlined,
  FileOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  ClusterOutlined,
  PushpinOutlined,
  CommentOutlined,
} from '@ant-design/icons';

import { ROUTES } from '../../utils/routes';
import { withSite } from '../hocs/withSite';

const Sidebar = ({ location, match }) => {
  const matchedRoute = matchPath(location.pathname, ROUTES.SITE_ADMIN.path);
  const params = matchedRoute ? matchedRoute.params : {};

  const matchedKeys = location => {
    const matchedRoute = Object.values(ROUTES).find(route => {
      return matchPath(location.pathname, route);
    });
    return matchedRoute ? matchedRoute.path : [];
  };

  return (
    <Menu
      defaultSelectedKeys={matchedKeys(location)}
      mode="vertical"
      theme="light"
    >
      <Menu.Item key={ROUTES.SLIDES.key} icon={<FileImageOutlined />}>
        <NavLink
          to={ROUTES.SLIDES.path.replace(':currentSite', params.currentSite)}
        >
          Banners
        </NavLink>
      </Menu.Item>
      <Menu.Item key={ROUTES.SECTIONS.key} icon={<AppstoreAddOutlined />}>
        <NavLink
          to={ROUTES.SECTIONS.path.replace(':currentSite', params.currentSite)}
        >
          Secciones del Home
        </NavLink>
      </Menu.Item>
      <Menu.Item key={ROUTES.MODULES.key} icon={<ClusterOutlined />}>
        <NavLink
          to={ROUTES.MODULES.path.replace(':currentSite', params.currentSite)}
        >
          Módulos
        </NavLink>
      </Menu.Item>
      <Menu.Item key={ROUTES.TESTIMONIALS.key} icon={<CommentOutlined />}>
        <NavLink
          to={ROUTES.TESTIMONIALS.path.replace(
            ':currentSite',
            params.currentSite
          )}
        >
          Testimonios
        </NavLink>
      </Menu.Item>
      <Menu.Item key={ROUTES.POSTS.key} icon={<PushpinOutlined />}>
        <NavLink
          to={ROUTES.POSTS.path.replace(':currentSite', params.currentSite)}
        >
          Entradas del Blog
        </NavLink>
      </Menu.Item>
      <Menu.Item key={ROUTES.PAGES.key} icon={<FileOutlined />}>
        <NavLink
          to={ROUTES.PAGES.path.replace(':currentSite', params.currentSite)}
        >
          Páginas
        </NavLink>
      </Menu.Item>
      <Menu.Item key={ROUTES.SITE_SHOW.key} icon={<SettingOutlined />}>
        <NavLink
          to={ROUTES.SITE_SHOW.path.replace(':currentSite', params.currentSite)}
        >
          Configuración
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default withSite(withRouter(Sidebar), false);
