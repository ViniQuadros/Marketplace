import '../css/navbar.css'

import { NavLink } from 'react-router-dom'

function Navbar({ links }) {
    return (
        <nav id='navbar'>
            {links.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => {
                        const classes = []
                        if (isActive) classes.push('active')
                        if (link.label === 'Login') classes.push('push-right')
                        return classes.join(' ')
                    }}
                >
                    {link.label}
                </NavLink>
            ))}
            
            <input
                type="text"
                id="searchInput"
                placeholder="Search..."
            />
        </nav>
    )
}

export default Navbar