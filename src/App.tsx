import React from 'react';
import './App.scss';
import ViewContainer from './components/ViewContainer';
import { BrowserRouter as Router } from "react-router-dom";
import {inject,observer} from "mobx-react";
import {IOperationStore} from "./stores/types";
interface IOperationProps {
    operationStore?:IOperationStore

}
@inject('operationStore')
@observer
class App extends React.Component<IOperationProps> {

    //function for checking if there is any data in sessionStorage after page reload
    componentDidMount(): void {
        this.props.operationStore!.checkSessionStore()
    }
    public render() {
        return (
            <div className="App">
                <Router basename="/plp-mass/">
                    <div className="main">
                        <ViewContainer/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
