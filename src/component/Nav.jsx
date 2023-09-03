import { useState } from "react"
import Button from "./Button"

export default function Nav() {

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
    
    return (
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
                    " placeholder="Search anything about your contacts!" required />
                        <Button handleClick={toggleSearch}><i className="fa fa-close"></i></Button>
                    </div>
                </>
            }

        </div>
    )

}