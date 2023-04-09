import Navigation from './Navigation'


export default function Header({
    user,
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
                    <button className="button">
                        <i class="fas fa-user-edit"></i>
                        <p>You, {user.username}</p>
                    </button>
                    <button className="button">
                        <i class="fas fa-sign-out-alt"></i>
                        <p>Logout</p>
                    </button>
                </>


                :
                <>
                    <button className="button">
                        <i className="fas fa-user"></i>
                        <p>Login</p>
                    </button>

                    <button className="button">
                        <i className="fas fa-user-plus"></i>
                        <p>SignUp</p>
                    </button>
                </>
            }



        </header>
    )
}