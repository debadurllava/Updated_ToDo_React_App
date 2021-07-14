import React, { useContext, useEffect, useState } from 'react';
import todo from '../Imgae/todo.svg';


//get data from local storage

const getLocalItem = () => {
    let list = localStorage.getItem('list');

    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    }
    else {
        return [];
    }

}
const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [item, setItem] = useState(getLocalItem);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('fill the data');
        } else if(inputData && !toggleSubmit){
            setItem(
                item.map((ele) =>{
                    if(ele.id === isEditItem){
                        return {...ele, name:inputData}
                    }
                    return ele;
                })
                
            )
            setToggleSubmit(true);
        setInputData('');
        setIsEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData };
            setItem([...item, allInputData]);
            setInputData("");
        }
    }

    const deleteItem = (index) => {
        console.log(item)
        const updatedItems = item.filter((elem) => {
            return index !== elem.id;
        });
        setItem(updatedItems)

    }

    //edit the item when user clicked on edit button
    //1. set the id and name of the data which user clicked to edit
    //2. set the toggle mode to change the submit button into edit button
    //3. update the value of the setInput with the new updated value to edit.
    //4. To pass the current element id to new state variable for reference

    const editItem = (id) => {
        let newEditedItem = item.find((ele) =>{
            return ele.id === id;
        } );

        setToggleSubmit(false);
        setInputData(newEditedItem.name);
        setIsEditItem(id);


    }

    const removeAll = () => {
        setItem([]);

    }

    //add data to local storage
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(item))
    }, [item]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add Your List Here 🤞</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍️ Add items..."
                            value={inputData} onChange={(e) => setInputData(e.target.value)}
                        />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> : 
                            <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }
                        
                    </div>

                    <div className="showItems">

                        {item.map((ele) => {
                            return (
                                <div className="eachItem" key={ele.id}>
                                    <h3>{ele.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(ele.id)}></i>
                                        <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(ele.id)}></i>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>

                </div>
            </div>
        </>
    )
};
export default Todo;
