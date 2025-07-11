import CommentNode from "./CommentNode";
import { useState } from "react";

const iniComments = [
  {
    id: 0,
    commenter: "Dr. Strange",
    text: "Here we go!",
    children: [
      {
        id: 1,
        commenter: "Ironman",
        text: "Jervis, Bring up everything!",
        children: [
          {
            id: 2,
            commenter: "Cap",
            text: "On your left!",
            children: [],
          },
          {
            id: 3,
            commenter: "Thor",
            text: "Bring me Thanos!",
            children: [
              {
                id: 4,
                commenter: "Daredevil",
                text: "FISK!!!",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        commenter: "Spiderman",
        text: "Hats off cap!",
        children: [],
      },
      {
        id: 6,
        commenter: "Batman",
        text: "I'm vengence!",
        children: [
          {
            id: 7,
            commenter: "Joker",
            text: "Why so serious!",
            children: [],
          },
          {
            id: 8,
            commenter: "Homlender",
            text: "I am Homlender!",
            children: [
              {
                id: 9,
                commenter: "Loki",
                text: "For all of you!",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 10,
        commenter: "Ben 10",
        text: "It's hero time!",
        children: [
          {
            id: 11,
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
  return (
    <>
      {comments.map((comment) => (
        <CommentNode
          key={comment.id}
          comment={comment}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}

export default CommentTree;
