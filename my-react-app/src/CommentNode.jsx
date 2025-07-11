import { useEffect, useRef, useState } from "react";
import reply from "./assets/reply.png";
import bin from "./assets/bin.png";
import cancel from "./assets/cancel.png";
import send from "./assets/send-symbol.png";

function CommentNode({ comment, onDelete, onSend }) {
  let [showHideRep, setShowHide] = useState(false);
  let [replyButt, setReplyButt] = useState(false);
  let [replyText, setReplyText] = useState("");
  let ref = useRef();
  useEffect(() => {
    if (replyButt) ref.current.focus();
  }, [replyButt]);

  function handleSubmit(e) {
    e.preventDefault();
    if (replyText.trim() === "") return;
    onSend(comment.id, replyText.trim());
    setReplyText("");
    setReplyButt(false);
    setShowHide(true);
  }

  function formatTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  return (
    <div
      style={{
        marginLeft: "20px",
        marginTop: "16px",
        padding: "12px",
        borderLeft: "2px solid #ccc",
        backgroundColor: "#f9f9f9",
        borderRadius: "6px",
        maxWidth: "600px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ marginBottom: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img
            src={comment.avatar}
            alt={comment.commenter}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ fontWeight: "bold", color: "#333" }}>
            {comment.commenter}
          </span>
          <span style={{ fontSize: "12px", color: "#666" }}>
            • {formatTimeAgo(comment.timestamp)}
          </span>
        </div>
        <p style={{ margin: "4px 0", color: "#444" }}>{comment.text}</p>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          title={replyButt ? "Cancel" : "Add Reply"}
          onClick={() => setReplyButt(!replyButt)}
          style={{
            marginTop: "6px",
            marginBottom: "8px",
            padding: "4px 10px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #888",
            backgroundColor: "#fff",
            cursor: "pointer",
            height: 26.8,
          }}
        >
          <img
            src={replyButt ? cancel : reply}
            alt="Reply"
            style={{
              width: "15px",
              height: "15px",
              verticalAlign: "middle",
            }}
          />
        </button>

        <button
          title="Delete Comment"
          onClick={() => onDelete(comment.id)}
          style={{
            marginTop: "6px",
            marginBottom: "8px",
            padding: "4px 10px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #888",
            backgroundColor: "#fff",
            cursor: "pointer",
            height: 26.8,
          }}
        >
          <img
            src={bin}
            alt="Delete"
            style={{
              width: "15px",
              height: "15px",
              verticalAlign: "middle",
            }}
          />
        </button>
        {comment.children.length > 0 && (
          <button
            title={showHideRep ? "Hide Replies" : "Show Replies"}
            onClick={() => setShowHide(!showHideRep)}
            style={{
              marginTop: "6px",
              marginBottom: "8px",
              padding: "4px 10px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #888",
              backgroundColor: "#fff",
              cursor: "pointer",
              width: 35,
              height: 26.8,
              textAlign: "center",
            }}
          >
            {showHideRep ? "▴" : "▾"}
          </button>
        )}
        {comment.children.length > 0 && (
          <h5 style={{ margin: 0 }}>
            {comment.children.length}{" "}
            {comment.children.length === 1 ? "reply" : "replies"}
          </h5>
        )}
      </div>
      {replyButt ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={ref}
            style={{ height: 25, marginRight: 6 }}
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button
            title="Reply"
            style={{
              marginTop: "6px",
              marginBottom: "8px",
              padding: "4px 10px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #888",
              backgroundColor: "#fff",
              cursor: replyText.trim() === "" ? "not-allowed" : "pointer",
              opacity: replyText.trim() === "" ? 0.2 : 1,
            }}
          >
            <img
              src={send}
              alt="Reply"
              style={{
                width: "15px",
                height: "15px",
                verticalAlign: "middle",
              }}
            />
          </button>
        </form>
      ) : null}

      {showHideRep &&
        comment.children.map((child) => (
          <CommentNode
            key={child.id}
            comment={child}
            onDelete={onDelete}
            onSend={onSend}
          />
        ))}
    </div>
  );
}

export default CommentNode;
