import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryList.css';

export default function CategoryList ({ list }) {
  if (!list)
    return (<p>No categories</p>);

  return (
    <nav className='category-list'>
        <ul id="nav-menu">
          <li key="Home">
            <Link to='/'>All</Link>
          </li>
        {list.map((item) => (
            <li key={item.name}>
              <Link to={"/"+item.path}>{item.name}</Link>
            </li>
        ))}
        </ul>
    </nav>
  )
}
