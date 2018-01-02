import React from 'react';

export default function CategoryList ({ list }) {
  if (!list)
    return (<p>No categories</p>);

  return (
    <div className='category-list'>
        <ul>
        {list.map((item) => (
            <li key={item.name}>
            {item.name}
            </li>
        ))}
        </ul>
    </div>
  )
}
