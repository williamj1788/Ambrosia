import React from 'react';

const Content = ({ style , children }) => {
    return(
        <div className='content' style={style || {}}>
            {children}
        </div>
    )
}

export default Content;