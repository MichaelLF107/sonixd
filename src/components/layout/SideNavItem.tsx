import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface SideNavItemProps {
  children: React.ReactNode;
  path?: string;
  history?: any;
}

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  cursor: pointer;
  background-color: #181819;
  border-radius: 10px;
  margin: 5px 0;
  padding: 10px;
  padding-left: 15px;
  gap: 10px;
  font-size: 1.1rem;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #1e1e1e;
  }
`;

const SideNavItem = ({ history, path, children }: SideNavItemProps) => {
  const [currentPath, setCurrentPath] = useState(history.location.pathname);
  const accentColor = window.localStorage.getItem('accentColor') || null;

  useEffect(() => {
    const unlisten = history.listen((location: any) => {
      setCurrentPath(location.pathname);
    });
    return () => {
      unlisten();
    };
  }, [history, currentPath]);

  if (history.location.pathname === path && accentColor) {
    return (
      <Item
        style={{color: accentColor}}
        onClick={() => history.push(path)}
      >
        {children}
      </Item>
    );
  }
  return (
    <Item onClick={() => history.push(path)}>
      {children}
    </Item>
  );
};

export default SideNavItem;
