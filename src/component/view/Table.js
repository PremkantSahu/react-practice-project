import React from 'react';

const Table = ({ products, loading}) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <table className='list-group mb-4'>
          <tbody>
              <tr>
                  <th>Color</th>
                  <th>Size</th>
                  <th>City</th>
              </tr>
              {
              products.map(post => (
                      <tr key={post._id} className='list-group-item'>
                          <td>{post.color}</td>
                          <td>{post.size}</td>
                          <td>{post.city}</td>
                      </tr>
                  ))
              }

          </tbody>
      </table>
    </div>
  );
};

export default Table;