import React, { useState, useRef, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import IPublication from '../../models/IPublication';
import { userAPI } from '../../services/UserService';
import { setProfilePublicationDialog } from '../../redux/slices/profilePublicationDialogSlice';
import { publicationAPI } from '../../services/PublicationService';

interface PublicationProps {
  publication: IPublication;
}

const Publication: React.FC<PublicationProps> = memo(({ publication }) => {

  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userInfo.value?.id);
  const { data: user } = userAPI.useFetchUserByIdQuery({userId: publication.user_id});
  const [toggleLikePublication, {}] = publicationAPI.useToggleLikePublicationMutation();
  const commentInput = useRef<HTMLTextAreaElement>(null);
  const likeButton = useRef<HTMLDivElement>(null);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    setLikes(publication.likes);
    if (publication.isLiked) {
      likeButton.current?.classList.add('liked');
    } else {
      likeButton.current?.classList.remove('liked');
    }
  }, [publication.likes]);

  // const dateString = info.date;
  // const [date, time, zone] = dateString.split(/T|\./);
  // let result = '';

  // const today = new Date();
  // const publicationDate = new Date(date);

  // if (
  //   today.getFullYear() === publicationDate.getFullYear() &&
  //   today.getMonth() === publicationDate.getMonth() &&
  //   today.getDay() === publicationDate.getDay()
  // ) {
  //   result = time;
  // } else {
  //   result = date;
  // }

  const showPublicationDialog = () => {
    dispatch(setProfilePublicationDialog({
      isDisplayed: true,
      publicationId: publication.id,
      creatorId: publication.user_id
    }));
  }

  const toggleLike = async () => {
    try {
      if (likeButton.current?.classList.contains('liked')) {
        await toggleLikePublication({publicationId: publication.id, userId: userId as string, like: false});
        setLikes(prev => prev - 1);
        likeButton.current?.classList.remove('liked');
        return;
      }
      await toggleLikePublication({publicationId: publication.id, userId: userId as string, like: true});
      setLikes(prev => prev + 1);
      likeButton.current?.classList.add('liked');
    }
    catch(e) {
      console.log(e);
    }
  }
  
  return (
    <div className="post">
      <div className="post__upper-bar">
        <img 
          className="post__upper-bar-avatar" 
          src={`http://localhost:5001/users/${user?.avatar}`} 
          alt=""
        />
        <div className="post__upper-bar-info">
          <div className="post__upper-bar-name">
            {user?.nickname}	&#128512;&#128151;
          </div>
        </div>
        <div className="post__upper-bar-settings"></div>
      </div>
      <div className="post__content">
        <div className="post__image" style={{
          backgroundImage: `url(http://localhost:5001/users/${publication.paths[0]})`
        }}></div>
      </div>
      <div className="post__lower-bar">
        <div className="post__lower-bar-actions">
          <div className="post__lower-bar-actions-icons">
            <div
              className={`post__lower-bar-actions-like`}
              onClick={toggleLike}
              ref={likeButton}
            ></div>
            <div className="post__lower-bar-actions-share"></div>
          </div>
          <div className="post__lower-bar-actions-info">
            <div className="post__lower-bar-actions-likes">
              {likes} likes
            </div>
            <div className="post__lower-bar-actions-date">
              {publication.date}
            </div>
          </div>
          <div className="post__lower-bar-actions-show-dialog" onClick={showPublicationDialog}>
            View all comments
          </div>
        </div>
        <div className="post__lower-bar-comment-bar">
          <div className="post__lower-bar-comment-bar-container">
            <div className="post__lower-bar-comment-bar-smiles"></div>
            <textarea
              placeholder="Write a comment..."
              className="post__lower-bar-comment-bar-input"
              ref={commentInput}
            />
            <div
              className="post__lower-bar-comment-bar-send"
              // onClick={postComment}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Publication;