import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import '../styles/Navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className='logo-container' to='/'>
                    POKEDEX
                </Link>
                <div className="navigation">
                    <div className="nav-links-container">
                        <Link className='nav-link' to='/'> HOME
                        </Link>
                        <Link className='nav-link' to='/pokemon/page/0'> POKEMONS
                        </Link>
                        <Link className='nav-link' to='/trainers'> TRAINERS
                        </Link>
                    </div>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;