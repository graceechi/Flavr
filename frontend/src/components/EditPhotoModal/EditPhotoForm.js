import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateUserPhoto } from '../../store/photos';
// import { Modal } from '../../context/Modal';
import "./editphotomodal.css";

function EditPhotoContainer( { setShowModal } ) {
    // const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const {id} = useParams();

    const history = useHistory();
    const photo = useSelector(state => state.photos.entries[id])

    const [caption, setCaption] = useState(photo.caption || '');

    const handleSubmit = async e => {
        e.preventDefault();
        const updatePhoto = {
          caption, id
        }
        dispatch(updateUserPhoto(updatePhoto))
        setShowModal(false);
        history.push(`/photos/${photo.id}`)
    }

    return (
        <div className='edit-photo-modal'>
            {/* {showModal && ( */}
                {/* // <Modal onClose={() => setShowModal(false)}> */}
                    <div className='edit-form-container'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-header-title'>Edit Caption</div>
                            <textarea className='textarea-container' type='text' value={caption} placeholder='Caption' onChange={e => setCaption(e.target.value)} />
                            <button className='save-btn' type='submit'>Save</button>
                            <button className='cancel-btn' onClick={() => setShowModal(false)}>Cancel</button>
                        </form>
                    </div>
                {/* // </Modal> */}

            {/* // )} */}
        </div>
    );
}


export default EditPhotoContainer;
