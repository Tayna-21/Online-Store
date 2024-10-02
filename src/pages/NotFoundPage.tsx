import React from 'react';

const NotFoundPage: React.FC = () => {
    return (
      <div className='wrapper-error'>
          <div className='container-error'>
            <div className='content-error'>
                <div className='background-error'>
                    <h1>404</h1>
                    <p>Page not found</p>
                </div>
            </div>
          </div>
      </div>
    )
}

export default NotFoundPage
