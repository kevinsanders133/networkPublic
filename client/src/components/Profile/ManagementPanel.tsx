import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { publicationAPI } from '../../services/PublicationService';
import { userAPI } from '../../services/UserService';
import { commentAPI } from '../../services/CommentService';
import IComment from '../../models/IComment';
import Comment from './Comment';
import IPublication from '../../models/IPublication';

interface ManagementPanelProps {
  publication: IPublication;
}

const ManagementPanel: React.FC<ManagementPanelProps> = ({ publication }) => {

  console.log(publication);

  const userId = useAppSelector(state => state.userInfo.value?.id);
  const commentInput = useRef<HTMLTextAreaElement>(null);
  const likeButton = useRef<HTMLDivElement>(null);
  const [likes, setLikes] = useState<number>(0);
  const [toggleLikePublication, {}] = publicationAPI.useToggleLikePublicationMutation();
  const [addComment, {}] = commentAPI.useAddNewCommentMutation();

  const { data: user } = userAPI.useFetchUserByIdQuery({userId: publication.user_id});
  const { data: comments } = commentAPI.useGetAllCommentsByPublicationIdQuery({
    publication_id: publication?.id as string
  });

  useEffect(() => {
    setLikes(publication.likes);
    if (publication.isLiked) {
      likeButton.current?.classList.add('liked');
    }
  }, [publication.likes]);

  const postComment = async () => {
    const message = commentInput.current?.value;
    try {
      if (publication) {
        const payload: IComment = {
          user_id: userId as string,
          publication_id: publication.id,
          message: message as string
        };
        await addComment(payload);
      }
    } catch(e) {
      console.log(e);
    }
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
    <div className="profile-publication-dialog__management-panel">
      <div className="profile-publication-dialog__management-panel-header">
        <div
          className="profile-publication-dialog__management-panel-header-avatar"
          style={{backgroundImage: `url(http://localhost:5001/users/${user?.avatar})`}}
        ></div>
        <div className="profile-publication-dialog__management-panel-header-main">
          <div className="profile-publication-dialog__management-panel-header-top">
            <b>{user?.nickname}</b>
          </div>
          <div className="profile-publication-dialog__management-panel-header-bottom">
            {publication?.message}
          </div>
        </div>
      </div>
      <div className="profile-publication-dialog__management-panel-main">
        {
          comments && comments.map(comment => <Comment key={comment.id} payload={comment} />)
        }
      </div>
      <div className="profile-publication-dialog__management-panel-actions">
        <div className="profile-publication-dialog__management-panel-actions-icons">
          <div
            className="profile-publication-dialog__management-panel-actions-like"
            onClick={toggleLike}
            ref={likeButton}
          ></div>
          <div className="profile-publication-dialog__management-panel-actions-share"></div>
        </div>
        <div className="profile-publication-dialog__management-panel-actions-info">
          <div className="profile-publication-dialog__management-panel-actions-likes">
            {likes} likes
          </div>
          <div className="profile-publication-dialog__management-panel-actions-date">
            {publication?.date}
          </div>
        </div>
      </div>
      <div className="profile-publication-dialog__management-panel-comment-bar">
        <div className="profile-publication-dialog__management-panel-comment-bar-container">
          <div className="profile-publication-dialog__management-panel-comment-bar-smiles"></div>
          <textarea
            placeholder="Write a comment..."
            className="profile-publication-dialog__management-panel-comment-bar-input"
            ref={commentInput}
          />
          <div
            className="profile-publication-dialog__management-panel-comment-bar-send"
            onClick={postComment}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ManagementPanel;