import React from 'react';
import Recoil from 'recoil';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@mantine/core';
import userState from '../../../recoil/atoms/userState';
import { AvatarIcon, SubMenu } from '..';
import { MY_FAV_POSTS_PATH, MY_POSTS_PATH, MY_PROFILE_PATH, SIGNIN_PATH } from '../../../constants/routes';
import { authSignOut } from '../../../services/auth';

const AvatarWrapper = styled.div`
  background: none;
  :hover {
    color: var(--hover-font-color);
  }
`;

const LoginLink = styled(Link)`
  color: var(--font-color);
  background: none !important;
  :hover {
    color: var(--hover-font-color);
  }
`;

const UserMenu = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = Recoil.useRecoilState(userState);

  const handleLogout = async () => {
    try {
      await authSignOut();
      setLoginUser(null);
    } catch (e) {
      console.error(e);
    } finally {
      navigate(SIGNIN_PATH);
    }
  };

  return !loginUser ? (
    <LoginLink to={SIGNIN_PATH}>로그인</LoginLink>
  ) : (
    <Menu trigger="hover">
      <Menu.Target>
        <AvatarWrapper>
          <AvatarIcon avatarId={loginUser.avatarId} activeHoverStyle={true} />
        </AvatarWrapper>
      </Menu.Target>
      <SubMenu
        menuItems={[
          { size: 'lg', content: '프로필', path: MY_PROFILE_PATH },
          { size: 'lg', content: '나의 질문', path: MY_POSTS_PATH },
          { size: 'lg', content: '좋아요', path: MY_FAV_POSTS_PATH },
          { size: 'sm', content: '로그아웃', onClick: handleLogout },
        ]}
      />
    </Menu>
  );
};

export default UserMenu;
