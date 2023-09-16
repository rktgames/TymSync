import React from 'react'

const Button = ({ status, handler }) => {
    return (
        <button className={`bg-${status.color}-500 enabled:hover:bg-${status.color}-600 enabled:active:bg-${status.color}-700 focus:outline-none px-1.5 py-1 rounded-xl w-32 font-bold disabled:opacity-80`} onClick={(e) => { handler(e) }} name={status.name} disabled={status.disable}>{status.text}</button>
    )
}

export default Button