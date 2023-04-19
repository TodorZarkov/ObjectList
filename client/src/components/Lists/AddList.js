import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { updateList } from '../../services/factory';
import './AddList.css'

export default function AddList() {

    const navigate = useNavigate();
    const { listId } = useParams();
    const { user, toggleListUpdate } = useContext(AuthContext)

    async function onAddObjectsClick(e) {
        e.preventDefault();
        const formData = new FormData(e.target)
        const entries = Object.fromEntries(formData);

        await updateList(listId, {
            name: entries.name,
            privacyLevel: entries.privacyLevel,
            initialValue:{privacyLevel: "owner", initialPrice: entries.initialPrice},
            proposals: {
                activ: (entries.proposals && true),
                rotateOn: "login",
                length: 4,
                method: "rand"
            },
            whereIs: {
                privacyLevel: "owner",
                location: entries.whereIs
            }
        });
            toggleListUpdate.setListUpdate(state=>!state);
        
        
        navigate(`/lists/quick-add/${listId}`);
    }

   

    return (
        <div className="add-list-container">
            <form   className='add-list-form'
                    onSubmit={(e)=>onAddObjectsClick(e)}
            >
                <div>
                <input type="text" id="listName" name='name'/>
                <label htmlFor="listName"> List Name</label>
                </div>

                <div className='add-list-privacy'>
                <input type="radio" id="private" name="privacyLevel"  value="private"/>
                <label htmlFor="private">Private</label>

                <input type="radio" id="users" name="privacyLevel" value="users" defaultChecked />
                <label htmlFor="users">Users</label>

                <input type="radio" id="all" name="privacyLevel" value="all"/>
                <label htmlFor="all">All</label>
                </div>

                <div>
                <input type="checkbox" id="proposals" name="proposals" />
                <label htmlFor="proposals">To Appear In Proposals</label>
                </div>


                <div>
                <input type="text" id="whereIs" name="whereIs"  />
                <label htmlFor="whereIs"> Location</label>
                </div>

                <div>
                <input type="text" id="initialPrice" name="initialPrice" />
                <label htmlFor="initialPrice"> Initial Value</label>
                </div>

                <button  className='button'>Add Objects</button>

            </form>
        </div>
    );
};