import React from 'react';
import styled from '@emotion/styled';

interface SideNavItemProps {
  onClick: () => void;
  children: React.ReactNode;
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

const SideNavItem = ({ onClick, children }: SideNavItemProps) => {
  return (
    <Item onClick={onClick}>
      {children}
    </Item>
  );
};

export default SideNavItem;
