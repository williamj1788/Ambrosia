import React from 'react';

const Title = ({style, children}) => {
    return(
        <h1 className='title' style={style} >{children}</h1>
    )
}

export default Title;