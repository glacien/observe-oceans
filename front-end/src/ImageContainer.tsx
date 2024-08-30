import { useState } from 'react';

import { MoonLoader } from 'react-spinners';

// @ts-expect-error: Unreachable code error
function ImageContainer({ btnStyle }) {
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoadDisplay, setBtnLoadDisplay] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const clickHandle = async function () {
    try {
      setIsLoading(true);
      setBtnLoadDisplay(false);
      const img = document.querySelector('.img')! as HTMLImageElement;

      const data = await fetch(
        'https://observe-oceans-test.onrender.com/image'
      );

      const res = await data.blob();
      setIsLoading(false);

      img.src = URL.createObjectURL(res);
      img.style.width = '100%';
    } catch (err) {
      setIsLoading(false);
      setBtnLoadDisplay(false);
      console.error(err);
      // @ts-expect-error: Unreachable code error
      setErrorMessage(err.message);
    }
  };

  return (
    <figure
      className="imageContainer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2.4rem',
        marginBottom: '4.8rem',
      }}
    >
      <img className="img" style={{ width: '0' }} />
      {isLoading && <MoonLoader color="#5b3758" />}
      {isLoading && (
        <p style={{ fontSize: '1.8rem', fontFamily: 'sans-serif' }}>
          Fetching image from api. Please wait. Consider that my server needs to
          'wake up' if it wasn't used for 15 minutes. it might take up to 1
          minute
        </p>
      )}

      {btnLoadDisplay && (
        <button style={btnStyle} onClick={clickHandle}>
          load image
        </button>
      )}
      {errorMessage && (
        <p style={{ fontSize: '1.8rem', fontFamily: 'sans-serif' }}>
          {errorMessage}
        </p>
      )}
    </figure>
  );
}

export default ImageContainer;
