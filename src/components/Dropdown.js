import React, {useState, useEffect, useRef} from 'react';

const Dropdown = ({options, selected, onSelectedChange}) => {

    const [droppedDown, setDroppedDown] = useState(0)
    const ref = useRef()

    useEffect(()=>{
        const onBodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
               return;
             };        
             setDroppedDown(0);
           };        
           document.body.addEventListener('click', onBodyClick);
        
           return () => {
             document.body.removeEventListener('click', onBodyClick);
           };
         }, []);


    const handleDropdown = () =>{
        droppedDown === 0? setDroppedDown(1) : setDroppedDown(0);
    };
    const renderedOptions = options.map((option)=>{        
        if (option === selected){
            return null;
        };        
        return(
            <div 
                key={option.value}
                className='item'
                onClick={()=>{
                    onSelectedChange(option);
                    handleDropdown();
                    }}>
                {option.label}
            </div>
        )
    });


    return(
        <div className='ui form' ref={ref}>
            <div className='field'>
                <label className='label'>Select a Color</label>
                <div className ={`ui selection dropdown ${droppedDown ? 'visible active' : ''}`} onClick={handleDropdown}>
                    <i className='dropdown icon' ></i>
                    <div className='text'>{selected.label}</div>
                    <div className={`menu ${droppedDown ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;