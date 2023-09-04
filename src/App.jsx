import '@fortawesome/fontawesome-free/css/all.min.css';
import { data } from "./data/contacts";
import Render from './component/Render';

function App() {

  return (
    <>
      <Render data={data}/>
    </>
  );
}

export default App;
