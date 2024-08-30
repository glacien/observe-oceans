// @ts-expect-error: Unreachable code error
const handleClick = function (fileType) {
  if (fileType !== 'image' && fileType !== 'grid') return;
  fetch(`https://observe-oceans-test.onrender.com/${fileType}`)
    .then((res) => res.blob())
    .then((res) => {
      const url = URL.createObjectURL(res);
      const a = document.createElement('a');

      a.href = url;
      a.download = `${fileType === 'image' ? 'image.png' : 'sst.grid.zip'}`;
      a.click();
    });
};

// @ts-expect-error: Unreachable code error
function DownloadDiv({ btnStyle }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20rem',
      }}
    >
      <button style={btnStyle} onClick={() => handleClick('image')}>
        download image
      </button>
      <button style={btnStyle} onClick={() => handleClick('grid')}>
        download grid
      </button>
    </div>
  );
}

export default DownloadDiv;
