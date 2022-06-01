import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { getOnePhoto } from '../../store/photos';
import EditPhotoModal from '../EditPhotoModal';
import DeletePhotoModal from '../DeletePhotoModal';
import './singlephotopage.css';

const SinglePhotoPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const photo = useSelector(state => state.photos.entries[id]);
    // console.log(photo)

    useEffect(() => {
        dispatch(getOnePhoto(id));
        // dispatch(getComments(id));
        setIsLoaded(true);
    }, [dispatch, id])

    const navProfile = e => {
        e.preventDefault();
        history.push(`/users/${photo.User?.id}`)
    }

    if (!sessionUser) {
        return (
            <Redirect to='/login' />
        )
    }

    if (!sessionUser || !photo) {
        return null;
    }

    return (
        <>
        <div className='photo-page-container'>
            <div className='single-photo-container'>
                <img src={photo.imageUrl} alt={photo.caption} />
                {sessionUser.id === photo.User?.id ? (
                    <>
                        <EditPhotoModal photo={photo} />
                        <DeletePhotoModal photo={photo} />
                    </>
                ) : (
                    ""
                )}
                {/* <EditPhotoModal /> */}
            </div>
            {/* add edit and delete photo button for modals */}
        </div>
            <div className='details-comments'>
                <div className='photo-details'>
                    <div className='user-follow'>
                        <a id='photographer' href={`/users/${photo.User?.id}`} onClick={navProfile}>@{photo.User?.username}</a>
                    </div>
                    <div className='caption'>
                        <p id='photo-caption'>{photo.caption}</p>
                        <p id='faves-text'>109 people faved this</p>
                    </div>
                    <hr/>
                </div>
                {/* <div className='tags-container'>Tags Coming Soon</div> */}
                {/* <Comments /> */}
            </div>
        </>
    )

}

export default SinglePhotoPage;
