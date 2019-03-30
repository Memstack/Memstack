import React from "react";
import { Link } from 'react-router-dom';

interface MenuItemProps {
  icon: string;
  to?: string;
}

const MenuItem: React.SFC<MenuItemProps> = ({ icon, to }) => (
  <Link to={to || '#'}>
    <div className="item">
      <i className={icon} />
    </div>
  </Link>
);

export default MenuItem;
