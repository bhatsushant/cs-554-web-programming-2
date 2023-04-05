import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import '../styles/Navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className='logo-container' to='/'>
                    BINTEREST
                </Link>
                <div className="navigation">
                    <div className="nav-links-container">
                        <Link className='nav-link' to='/my-bin'> MY BIN
                        </Link>
                        <Link className='nav-link' to='/'> IMAGES
                        </Link>
                        <Link className='nav-link' to='/my-posts'> MY POSTS
                        </Link>
                    </div>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;