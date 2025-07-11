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
    avatar: "https://i.pravatar.cc/40?u=a",
    text: "Here we go!",
    timestamp: new Date("2025-07-10T12:56:11"),

    children: [
      {
        id: getId(),
        commenter: "Ironman",
        avatar: "https://i.pravatar.cc/40?u=b",
        text: "Jervis, Bring up everything!",
        timestamp: new Date("2025-07-09T10:20:40"),

        children: [
          {
            id: getId(),
            commenter: "Cap",
            avatar: "https://i.pravatar.cc/40?u=c",
            text: "On your left!",
            timestamp: new Date("2025-07-11T11:00:00"),

            children: [],
          },
          {
            id: getId(),
            commenter: "Thor",
            avatar: "https://i.pravatar.cc/40?u=d",
            text: "Bring me Thanos!",
            timestamp: new Date("2025-07-10T10:04:00"),

            children: [
              {
                id: getId(),
                commenter: "Daredevil",
                avatar: "https://i.pravatar.cc/40?u=e",
                text: "FISK!!!",
                timestamp: new Date("2025-07-01T10:00:00"),

                children: [],
              },
            ],
          },
        ],
      },
      {
        id: getId(),
        commenter: "Spiderman",
        avatar: "https://i.pravatar.cc/40?u=f",
        text: "Hats off cap!",
        timestamp: new Date("2025-07-11T02:00:00"),

        children: [],
      },
      {
        id: getId(),
        commenter: "Batman",
        avatar: "https://i.pravatar.cc/40?u=g",
        text: "I'm vengence!",
        timestamp: new Date("2025-07-06T09:08:00"),

        children: [
          {
            id: getId(),
            commenter: "Joker",
            avatar: "https://i.pravatar.cc/40?u=h",
            text: "Why so serious!",
            timestamp: new Date("2025-07-01T07:16:25"),

            children: [],
          },
          {
            id: getId(),
            commenter: "Homlender",
            avatar: "https://i.pravatar.cc/40?u=i",
            text: "I am Homlender! I can do the F I want!",
            timestamp: new Date("2025-07-10T01:01:01"),

            children: [
              {
                id: getId(),
                commenter: "Loki",
                avatar: "https://i.pravatar.cc/40?u=j",
                text: "For all of you!",
                timestamp: new Date("2025-07-02T11:03:00"),

                children: [],
              },
            ],
          },
        ],
      },
      {
        id: getId(),
        commenter: "Ben 10",
        avatar: "https://i.pravatar.cc/40?u=k",
        text: "It's hero time!",
        timestamp: new Date("2025-07-03T04:50:10"),

        children: [
          {
            id: getId(),
            commenter: "Flash",
            avatar: "https://i.pravatar.cc/40?u=l",
            text: "I'm the fastest man alive!",
            timestamp: new Date("2025-06-05T06:40:20"),

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
      avatar: "https://i.pravatar.cc/40?u=u",
      text: replyText,
      timestamp: new Date(),
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
