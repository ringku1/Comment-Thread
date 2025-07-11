import CommentTree from "./CommentTree";

function App() {
  return (
    <>
      <h1
        style={{
          backgroundColor: "lightcyan",
          borderRadius: 4,
          borderColor: "lightblue",
          padding: 5,
          width: 615,
          marginLeft: "20px",
          textAlign: "center",
        }}
      >
        Comment Thread
      </h1>
      <CommentTree />
    </>
  );
}
export default App;
