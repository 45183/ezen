import './App.css';
import {getEmotionImgById} from './util';

function App() {
  return (
    <div className="App">
      <img alt='emo1' src={getEmotionImgById(1)} />
      <img alt='emo1' src={getEmotionImgById(2)} />
      <img alt='emo1' src={getEmotionImgById(3)} />
      <img alt='emo1' src={getEmotionImgById(4)} />
      <img alt='emo1' src={getEmotionImgById(5)} />
    </div>
  );
}

export default App;
