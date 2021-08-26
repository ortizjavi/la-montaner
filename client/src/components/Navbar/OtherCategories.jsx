import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FIXED_CATEGORIES,
  OTHERS_CATEGORY
} from '../../utils/constants.js';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


function OtherCategories(props){
  const [open, setOpen] = useState(null);
  const [current, setCurrent] = useState(OTHERS_CATEGORY);
  const wrapperRef = React.createRef(null);
  let allCategories = useSelector(state => 
    state.root.allCategories.map(c => c.name)
    .filter(c => !FIXED_CATEGORIES.includes(c))
  );

  const toggleOpen = () => {
    setOpen(op => !op);
  }

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)){
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    let selected = allCategories.includes(props.selected);
    if (selected){
       if (current !== props.selected){
         setCurrent(props.selected)
       }
    } else {
      if (current !== OTHERS_CATEGORY){
        setCurrent(OTHERS_CATEGORY);
      }
    }
  }, [props.selected])

 
  let selected = allCategories.includes(props.selected);

  if (selected){
    if (current !== OTHERS_CATEGORY){
      allCategories.unshift(OTHERS_CATEGORY);
    }
    allCategories = allCategories.filter(c => c !== current);
  }

  const handleClick = (e) => {
    setOpen(false);
    props.handleCategory(e);
  }

  return (
    <>
    <div 
      className={`${(selected || props.selected === OTHERS_CATEGORY) 
                  && !open ? "actived" : 'Nav-button'} navButtonDiv`} 
      id={current}
      onClick={props.handleCategory}
    >
      { current.charAt(0).toUpperCase() + current.slice(1) }
    </div>
    {allCategories.length ? 
    <div className='other-categories-container'>
      <KeyboardArrowDownIcon onClick={toggleOpen}/>
      { open ?
          <div ref={wrapperRef} className="other-categories-list">
          {
           allCategories?.map((c, i) => (
             <div
             className="other-categories-item"
             key={i} id={c}
             onClick={handleClick}> 
             { c === OTHERS_CATEGORY ? 'Todos los Otros' : c.charAt(0).toUpperCase() + c.slice(1)} 
             </div>
           ))
          }
          </div>
      : null }
    </div>
    : null }
    </>
  );
}

export default OtherCategories;