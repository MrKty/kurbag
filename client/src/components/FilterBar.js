import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

function FilterBar({filters}) {
    return (
        <div className={"p-2 shadow"} >
            {filters.map((filter, index) => (
                <button className={"btn btn-outline-primary me-2"} key={index}>
                    {filter} <FontAwesomeIcon icon={faAngleDown} />
                </button>
            ))}
        </div>
    );
}

export default FilterBar;