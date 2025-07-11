import { useState } from "react";
import reply from "./assets/reply.png";
import bin from "./assets/bin.png";

function CommentNode({ comment, onDelete }) {
  let [showHideRep, setShowHide] = useState(false);

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
        <span style={{ fontWeight: "bold", color: "#333" }}>
          {comment.commenter}
        </span>
        <p style={{ margin: "4px 0", color: "#444" }}>{comment.text}</p>
      </div>
      <button
        title="Add Reply"
        onClick={() => {}}
        style={{
          marginTop: "6px",
          marginBottom: "8px",
          padding: "4px 10px",
          fontSize: "14px",
          borderRadius: "4px",
          border: "1px solid #888",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        <img
          src={reply}
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

      {showHideRep &&
        comment.children.map((child) => (
          <CommentNode key={child.id} comment={child} onDelete={onDelete} />
        ))}
    </div>
  );
}

export default CommentNode;
