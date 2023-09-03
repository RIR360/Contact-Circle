import '@fortawesome/fontawesome-free/css/all.min.css';
import Avatar from "./component/Avatar";
import Nav from "./component/Nav";
import Level from "./component/Level";
import { data } from "./data/contacts";

let Render = []
let levels = data.map(contact => contact.level)

levels.forEach((level, idx) => {
  Render[level] = data.map(
    contact => contact.level === level ? <Avatar key={contact.id} data={contact}/> : null
  )
});

function App() {
  return (
    <div className="sm:w-1/2 mx-auto fade-in">

      <Nav/>
      <div className="px-4 mb-4 overflow-auto">
      {
        Render.map((contacts, idx) =>
          <Level key={idx} level={idx}>{contacts}</Level>
        )
      }
      </div>

    </div>
  );
}

export default App;
