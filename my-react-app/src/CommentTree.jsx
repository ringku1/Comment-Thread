import CommentNode from "./CommentNode";
import { useState } from "react";

let ids = 1;
function getId() {
  return ids++;
}

const iniComments = [
  {
    id: getId(),
    commenter: "Dr. Strange",
    text: "Here we go!",
    children: [
      {
        id: getId(),
        commenter: "Ironman",
        text: "Jervis, Bring up everything!",
        children: [
          {
            id: getId(),
            commenter: "Cap",
            text: "On your left!",
            children: [],
          },
          {
            id: getId(),
            commenter: "Thor",
            text: "Bring me Thanos!",
            children: [
              {
                id: getId(),
                commenter: "Daredevil",
                text: "FISK!!!",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: getId(),
        commenter: "Spiderman",
        text: "Hats off cap!",
        children: [],
      },
      {
        id: getId(),
        commenter: "Batman",
        text: "I'm vengence!",
        children: [
          {
            id: getId(),
            commenter: "Joker",
            text: "Why so serious!",
            children: [],
          },
          {
            id: getId(),
            commenter: "Homlender",
            text: "I am Homlender!",
            children: [
              {
                id: getId(),
                commenter: "Loki",
                text: "For all of you!",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: getId(),
        commenter: "Ben 10",
        text: "It's hero time!",
        children: [
          {
            id: getId(),
            commenter: "Flash",
            text: "I'm the fastest man alive!",
            children: [],
          },
        ],
      },
    ],
  },
];

function CommentTree() {
  let [comments, setComments] = useState(iniComments);
  function deleteById(comments, id) {
    return comments
      .filter((node) => node.id !== id)
      .map((node) => ({
        ...node,
        children: deleteById(node.children, id),
      }));
  }
  function handleDelete(id) {
    let updateComments = deleteById(comments, id);
    setComments(updateComments);
  }
  function replyTextById(id, reply, comments) {
    return comments.map((comment) => {
      if (comment.id == id) {
        return { ...comment, children: [...comment.children, reply] };
      } else {
        return {
          ...comment,
          children: replyTextById(id, reply, comment.children),
        };
      }
    });
  }
  function handleSend(id, replyText) {
    let reply = {
      id: getId(),
      commenter: "You",
      text: replyText,
      children: [],
    };
    let updateComments = replyTextById(id, reply, comments);
    setComments(updateComments);
  }
  return (
    <>
      {comments.map((comment) => (
        <CommentNode
          key={comment.id}
          comment={comment}
          onDelete={handleDelete}
          onSend={handleSend}
        />
      ))}
    </>
  );
}

export default CommentTree;
