import '@fortawesome/fontawesome-free/css/all.min.css';
import Avatar from "./Avatar";
import Level from "./Level";
import { useState } from 'react';
import Button from './Button';

function Render({ data }) {

  // search box toggling hook
  const [search, setSearch] = useState(false);
  // searching hook
  const [searchText, setSearchText] = useState('');

  const toggleSearch = () => {
    setSearch(prevSearch => prevSearch === false ? true : false);
  }

  const searchContact = (event) => {
    setSearchText(event.target.value.toLowerCase());
  }

  let render = [];
  let levels = data.map(contact => contact.level);

  // filter the contacts put it in one level
  const filtered = data.filter(contact => {

      let raw = JSON.stringify(contact).toLowerCase();
      return raw.includes(searchText);

  })

  // level the contacts
  levels.forEach((level, idx) => {

    let contacts = [];
    filtered.forEach(contact => {
      if (contact.level === level) {
        contacts.push(<Avatar key={contact.id} data={contact} />)
      }
    })
    render[level] = contacts;

  });

  return (
    <div className="sm:w-1/2 mx-auto fade-in">

      <div className="
          sticky top-0 left-0 bg-white z-20
          py-2 px-4 flex justify-between items-center
          border-b-2
        ">

        {search === false ?
          <>
            <div className="text-lg fade-in">My Contact Circle</div>
            <div className="flex items-center">
              <Button><i className="fa fa-add"></i></Button>
              <Button handleClick={toggleSearch}><i className="fa fa-search"></i></Button>
            </div>
          </>
          :
          <>
            <div className="flex w-full">
              <input type="search"
                onChange={searchContact}
                value={searchText} className="
                  scale-in-hor-right
                  block w-full py-2 px-4 me-2 text-sm text-gray-900
                  border border-gray-300 rounded-lg bg-stone-100
                " placeholder="Search anything about your contacts!" required 
              />
              <Button handleClick={toggleSearch}><i className="fa fa-close"></i></Button>
            </div>
          </>
        }

      </div>

      <div className="px-4 mb-4 overflow-auto">
        {render.map((contacts, idx) =>
          <Level key={idx} level={idx}>{contacts}</Level>
        )}
      </div>

    </div>
  );
}

export default Render;
