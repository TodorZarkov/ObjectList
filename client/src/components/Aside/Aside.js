import { useContext} from "react";
import { AuthContext} from "../../contexts/AuthContext";
import GuestAsideNav from "./GuestAsideNav";
import UserAsideNav from "./UserAsideNav";

export default function Aside({ }) {

    const {user, toggleListUpdate} = useContext(AuthContext);

    return (
        <aside>
            {user &&
                <UserAsideNav user={user} toggleListUpdate={toggleListUpdate}/>
            }

            <GuestAsideNav user={user} toggleListUpdate={toggleListUpdate}/>

        </aside>
    );
};