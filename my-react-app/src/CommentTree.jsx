import CommentNode from "./CommentNode";
import { useState, useEffect } from "react";

let ids = 1;
function getId() {
  return ids++;
}

const iniComments = [
  {
    id: getId(),
    commenter: "You",
    avatar: "https://i.pravatar.cc/40?u=u",
    text: "Here we go!",
    timestamp: new Date("2025-07-01T12:56:11"),
    likeCount: 0,
    children: [
      {
        id: getId(),
        commenter: "Ironman",
        avatar: "https://i.pravatar.cc/40?u=b",
        text: "Jervis, Bring up everything!",
        timestamp: new Date("2025-07-05T10:20:40"),
        likeCount: 0,
        children: [
          {
            id: getId(),
            commenter: "Cap",
            avatar: "https://i.pravatar.cc/40?u=c",
            text: "On your left!",
            timestamp: new Date("2025-07-09T11:00:00"),
            likeCount: 0,
            children: [],
          },
          {
            id: getId(),
            commenter: "Thor",
            avatar: "https://i.pravatar.cc/40?u=d",
            text: "Bring me Thanos!",
            timestamp: new Date("2025-07-08T10:04:00"),
            likeCount: 0,
            children: [
              {
                id: getId(),
                commenter: "Daredevil",
                avatar: "https://i.pravatar.cc/40?u=e",
                text: "FISK!!!",
                timestamp: new Date("2025-07-10T10:00:00"),
                likeCount: 0,
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
        timestamp: new Date("2025-07-04T02:00:00"),
        likeCount: 0,
        children: [],
      },
      {
        id: getId(),
        commenter: "Batman",
        avatar: "https://i.pravatar.cc/40?u=g",
        text: "I am Vengeance",
        timestamp: new Date("2025-07-03T09:08:00"),
        likeCount: 0,
        children: [
          {
            id: getId(),
            commenter: "Joker",
            avatar: "https://i.pravatar.cc/40?u=h",
            text: "Why so serious!",
            timestamp: new Date("2025-07-07T07:16:25"),
            likeCount: 0,
            children: [],
          },
          {
            id: getId(),
            commenter: "Homlender",
            avatar: "https://i.pravatar.cc/40?u=i",
            text: "I am Homlender! I can do the F I want!",
            timestamp: new Date("2025-07-06T01:01:01"),
            likeCount: 0,
            children: [
              {
                id: getId(),
                commenter: "Loki",
                avatar: "https://i.pravatar.cc/40?u=j",
                text: "For all of you!",
                timestamp: new Date("2025-07-08T11:03:00"),
                likeCount: 0,
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
        timestamp: new Date("2025-07-02T04:50:10"),
        likeCount: 0,
        children: [
          {
            id: getId(),
            commenter: "Flash",
            avatar: "https://i.pravatar.cc/40?u=l",
            text: "I'm the fastest man alive!",
            timestamp: new Date("2025-07-06T06:40:20"),
            likeCount: 0,
            children: [],
          },
        ],
      },
    ],
  },
];

function CommentTree() {
  const [comments, setComments] = useState(() => {
    const stored = localStorage.getItem("comments");
    return stored && stored !== "[]"
      ? JSON.parse(stored, (key, value) =>
          key === "timestamp" ? new Date(value) : value
        )
      : iniComments;
  });
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);
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
        return { ...comment, children: [reply, ...comment.children] };
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
      likeCount: 0,
      children: [],
    };
    let updateComments = replyTextById(id, reply, comments);
    setComments(updateComments);
  }
  function likeById(comments, id, likeNum) {
    return comments.map((comment) => {
      if (comment.id == id) {
        return { ...comment, likeCount: likeNum };
      } else {
        return {
          ...comment,
          children: likeById(comment.children, id, likeNum),
        };
      }
    });
  }
  function handleLike(id, likeNum) {
    let updateComments = likeById(comments, id, likeNum);
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
          onLike={handleLike}
        />
      ))}
    </>
  );
}

export default CommentTree;
