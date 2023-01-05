import type { ReactNode } from 'react';

import type { Comment as CommentType } from 'types';

import { useState } from 'react';
import classnames from 'classnames';

import UserAvatar from 'components/Comments/CommentsList/Comment/UserAvatar/UserAvatar';
import CommentBody from './CommentBody/CommentBody';
import EditComment from './EditComment';
import Toggleable from 'components/Toggleable/Toggleable';
import ReplyComment from 'components/Comments/PostComment';

import { replaceComment, addReply } from 'services/comments.service';

// import useToggle from 'hooks/useToggle';

type Props = {
  childComment?: boolean;
  isLogged: boolean;
  userId: null | number;
  comment: CommentType;
  updateComments(
    commentsUpdater: (comments: CommentType[]) => CommentType[]
  ): void;
  children?: ReactNode;
};

const Comment = ({ isLogged, children, childComment, ...props }: Props) => {
  return (
    <div
      className={classnames('d-flex comment', {
        'child-comment': childComment,
      })}
    >
      <UserAvatar
        userAvatar={props.comment.user.medium_avatar_url}
        userPermalink={props.comment.user.permalink}
      />
      (
      <Toggleable
        render={(show, toggle) => {
          return !show ? (
            <CommentBody
              showEditComment={toggle}
              isLogged={isLogged}
              children={children}
              {...props}
            />
          ) : (
            <EditComment
              parentId={props.comment.parent_id}
              commentsUpdater={replaceComment}
              showEditComment={toggle}
              updateComments={props.updateComments}
              userId={props.userId!}
              commentId={props.comment.id}
              commentText={props.comment.text}
            />
          );
        }}
      />
    </div>
  );
};

export default Comment;
