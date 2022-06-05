export default function ResumeButton(props) {
  const { title, isDrag = false, isUsed = true, onDelete, onAdd } = props;
  return (
    <>
      <div
        style={{
          padding: "15px 20px",
          backgroundColor: "#f8f8f8",
          textAlign: "left",
          border: "none",
          color: "#505565",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <div>
          {isDrag && (
            <div
              style={{
                display: "flex",
              }}
            >
              <div onClick={onDelete}>Delete</div>
            </div>
          )}
          {!isUsed && (
            <div>
              <div onClick={onAdd}>Add</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
