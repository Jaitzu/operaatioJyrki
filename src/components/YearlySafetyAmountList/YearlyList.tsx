import React, {useState, useEffect,useRef} from "react"
import "./YearlyList.scss"
import {
    Button,
    Input,
    Table,
} from "reactstrap";
import {inject, observer} from "mobx-react";
import "react-datepicker/dist/react-datepicker.css";



const YearlyList = inject('operationStore')(observer((props:any) => {
    const [number,setNumber] = useState(null)
    const [index, setIndex] = useState(null);
    const [eläke, setPäivitäEläke]=useState("");
    const [open,setOpen]=useState(false)


    const showNextColumn = (evt:any) => {
        evt.preventDefault();
        console.log(props.operationStore.elakkeet.length)
        const index= props.operationStore.elakkeet.length;
        props.operationStore.vuodenEläke(index);
    }
    useEffect(()=>{
        table()
    },[props.operationStore.elakkeet])

    const submit=(evt:any,index:any)=>{
        evt.preventDefault();
        props.operationStore.paivitaElake(eläke,index)
        setOpen(!open)

    }
    const päivitäEläke =(evt:any,index:any)=>{
        setPäivitäEläke(evt.target.value)
        setIndex(index)
        console.log(evt.target.value)
    }

    const table =()=> {
        const variables = props.operationStore.elakkeet;

        if(variables!== undefined || variables.lenght > 0) {
            return variables
        }else{
            return null
        }
    }
    const openInput=(index:any)=>{
        setOpen(!open)
        setNumber(index)
    }


    return (
        <div className="announcement-receivers-table-view">

            <Table className="announcement-receivers-table-view__table">
                <thead className={"announcement-receivers-table-view__table-header"}>
                <tr>
                    <th>Eläke vuosi</th>
                    <th>Eläkkeen määrä</th>
                    <th>submit</th>
                </tr>
                </thead>
                <tbody className={"announcement-receivers-table-view__table-body"}>
                {(table()!== null)
                    &&
                    table().map((target: any, index: number) => (
                    <tr key={index} >
                        <td>{target.ika}</td>
                        {(open && number===index)
                        &&
                            <td><Input placeholder={target.value} id={"receiverInput"+index} onChange={(evt:any)=>{päivitäEläke(evt,index)}} className={"announcement-receivers-table-view__table-body-input"} type="number"/></td>
||
                            <td onClick={()=> openInput(index)}>{target.elake}</td>

                        }
                        <td><Button onClick={(evt:any)=>{submit(evt,index)}}>add</Button></td>
                    </tr>

                ))}
                </tbody>
            </Table>
            <Button id={"addNewReceiverTableColumn"} onClick={(evt:any) => showNextColumn(evt)}>add</Button>
        </div>
    )
}))


export default YearlyList;