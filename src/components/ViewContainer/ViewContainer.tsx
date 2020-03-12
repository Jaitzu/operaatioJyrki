import React from 'react';
import {inject, observer} from "mobx-react";
import './ViewContainer.scss';
import Loader from '../Loader'
import {Col } from "reactstrap"
import {IOperationStore} from "../../stores/types"
import Inputs from "../InputContainer"
import YearlySafetyAmountList from "../YearlySafetyAmountList"


interface loadingProps{
    loading:boolean
    operationStore?:IOperationStore
}

interface ViewcontainerProps  {
    operationStore?:IOperationStore
}

@inject('operationStore')
@observer
class ViewContainer extends React.Component<ViewcontainerProps,loadingProps> {
constructor(props:ViewcontainerProps){
super(props)
    this.state ={
    loading:true
    }
}
//function for launching the loader component when the application is loading data from the server
    componentDidMount() {
        fetch("/localhost:3000").then(()=>{
            this.setState({loading: false})
        })
    }


    render() {
        if (this.state.loading) {
            return <Loader/>
        } else {
            return (
                <Col className="view-container-container" md={{size: 10, offset: 1}} lg={{size:8, offset:2}} >
                    <div className="view-container">
                  <Inputs/>
                  <YearlySafetyAmountList/>
                    </div>
                </Col>
            )
        }
    }
}


export default ViewContainer;