import DownloadDiv from './DownloadDiv';
import ImageContainer from './ImageContainer';

const btnStyle = {
  backgroundColor: 'transparent',
  padding: '1.2rem 2.4rem',
  borderRadius: '4px',
  border: '#5b3758 solid 2px',
  fontFamily: 'inherit',
  color: '#5b3758',
  fontSize: '2.4rem',
  cursor: 'pointer',
};

function App() {
  return (
    <main>
      <h1>--Observe Oceans--</h1>
      <div style={{ width: '120rem', maxWidth: '120rem', margin: '0 auto' }}>
        <ImageContainer btnStyle={btnStyle} />
        <DownloadDiv btnStyle={btnStyle} />
      </div>
    </main>
  );
}

export default App;
