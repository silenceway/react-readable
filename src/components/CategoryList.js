import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryList ({ list }) {
  if (!list)
    return (<p>No categories</p>);

  return (
    <div className='category-list'>
        <ul>
          <li key="Home">
            <Link to='/'>All</Link>
          </li>
        {list.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>{item.name}</Link>
            </li>
        ))}
        </ul>
    </div>
  )
}
