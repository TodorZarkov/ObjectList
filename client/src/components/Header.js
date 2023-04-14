import Navigation from './Navigation'


export default function Header({
    user,
    onLoginClick,
    onLogoutClick,
}) {



    return (
        <header>
            {/* <img src="\logo-100x100-3.png" alt='Label' /> */}
            <div className='title-container'>
                <h1>Object List</h1>
                <p>Disturb the chaos</p>
            </div>

            <Navigation user={user} />

            {user
                ?
                <>
                    <button className="button" >
                        <i className="fas fa-user-edit"></i>
                        <p>Edit</p>
                    </button>

                    <button className="button" onClick={onLogoutClick}>
                        <i className="fas fa-sign-out-alt"></i>
                        <p>Logout</p>
                    </button>
                </>


                :
                <>
                    <button className="button" onClick={onLoginClick}>
                        <i className="fas fa-user"></i>
                        <p>Login with Google</p>
                    </button>

                    
                </>
            }



        </header>
    )
}