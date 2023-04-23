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
        console.log(entries);

        // await updateList(listId, {
        //     name: entries.name,
        //     privacyLevel: entries.privacyLevel,
        //     initialValue:{privacyLevel: "owner", initialPrice: entries.initialPrice},
        //     proposals: {
        //         activ: (entries.proposals && true),
        //         rotateOn: "login",
        //         length: 4,
        //         method: "rand"
        //     },
        //     whereIs: {
        //         privacyLevel: "owner",
        //         location: entries.whereIs
        //     }
        // });
        //    toggleListUpdate.setListUpdate(state=>!state);


        //navigate(`/lists/quick-add/${listId}`);
    }



    return (
        <div className="add-list-container">
            <form className='add-list-form'
                onSubmit={(e) => onAddObjectsClick(e)}
            >
                <div>
                    <input type="text" id="listName" name='name' />
                    <label htmlFor="listName"> List Name</label>
                </div>

                <div className='add-list-privacy'>
                    <input type="radio" id="private" name="privacyLevel" value="private" />
                    <label htmlFor="private">Private</label>

                    <input type="radio" id="users" name="privacyLevel" value="users" defaultChecked />
                    <label htmlFor="users">Users</label>

                    <input type="radio" id="all" name="privacyLevel" value="all" />
                    <label htmlFor="all">All</label>
                </div>

                <div>
                    <input type="checkbox" id="proposals" name="proposals" />
                    <label htmlFor="proposals">To Appear In Proposals</label>
                </div>


                <div>
                    <input type="text" id="whereIs" name="whereIs" />
                    <label htmlFor="whereIs"> Location</label>
                </div>

                <div>
                    <input type="text" id="initialPrice" name="initialPrice" />
                    <label htmlFor="initialPrice"> Initial Value</label>
                </div>

                <div className='add-list-description'>
                    <label htmlFor="text">Description</label>
                    <textarea name="text" id="text" cols="30" rows="10" />
                </div>

                <div className='add-list-obj-btns'>
                    <button className='button'>Add Objects</button>
                    <button className='button' ><i class="fas fa-cog"></i></button>
                </div>

            </form>

            <form className="add-list-objects-settings-form" action="POST">
                <fieldset className='add-list-objects-settings-fieldset'>
                    <legend>What to Ask When Crating Object?</legend>

                    <div>
                        <input type="checkbox" id="askForName" name="askForName" checked />
                        <label htmlFor="askForName">Name</label>
                        <input className='field' type="text" id="defaultName" placeholder='Default Name' />
                    </div>

                    <div>
                        <input type="checkbox" id="askForQuantity" name="askForQuantity" />
                        <label htmlFor="askForQuantity">Quantity</label>
                        <input className='field' type="number" min='0' placeholder='Default Quantity' />
                    </div>

                    <div>
                        <input type="checkbox" id="askForDeskription" name="askForDeskription" />
                        <label htmlFor="askForDeskription">Description</label>
                    </div>

                    <div>
                        <input type="checkbox" id="acquireDate" name="acquireDate" />
                        <label htmlFor="acquireDate">Aquire Date</label>
                        <input className='field' type="date" id="defaultDate" />
                    </div>

                    <div>
                        <input type="checkbox" id="askForProposalsIncluded" name="askForProposalsIncluded" />
                        <label htmlFor="askForProposalsIncluded">To Include For Proposals</label>
                        <input className='field' type="checkbox" name="defaultProposals" id="defaultProposals" />
                    </div>

                    <div>
                        <input type="checkbox" id="askForCurrentPosition" name="askForCurrentPosition" />
                        <label htmlFor="askForCurrentPosition">Current Position</label>
                        <input className='field' type="text" id="defaultPosition" placeholder="Default Position" />
                    </div>

                    <div>
                        <input type="checkbox" id="askForInitialValue" name="askForInitialValue" />
                        <label htmlFor="askForInitialValue">Initial Value</label>
                        <input className='field' type="text" id="defaultInitialValue" placeholder="Default Initial Value" />
                    </div>

                    <div>
                        <input type="checkbox" id="askForPropertyDocuments" name="askForPropertyDocuments" />
                        <label htmlFor="askForPropertyDocuments">Property Documents</label>
                    </div>



                </fieldset>
            </form>

        </div>
    );
};