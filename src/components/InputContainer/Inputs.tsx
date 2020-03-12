import * as  React from "react"
import "./Inputs.scss"
import {
    Button,
    Col,
    Label,
    Row,
    Input,
    InputGroup
} from "reactstrap";
import {inject, observer} from "mobx-react";
import "react-datepicker/dist/react-datepicker.css";
import {IOperationStore} from "../../stores/types";

interface OperationProps {
    operationStore?: IOperationStore
}

interface IState {
    lopetusIka: any;
    aloitusIka: any;
    turvaProsentti:any;
    saastot:any;
}

@inject('operationStore')
@observer
class Inputs extends React.Component<OperationProps, IState> {
    constructor(props: OperationProps) {
        super(props);
        this.state = {
            lopetusIka:null,
            aloitusIka:null,
            turvaProsentti:null,
            saastot:null,
        };
    }

//function for updating the right date variable
    setData = (evt:any) => {
        evt.preventDefault()
        const variable=evt.target.name;
        const data = evt.target.value;
        if (variable === "aloitusIka") {
            ;
            this.setState(prevState => ({
                ...prevState,
                aloitusIka: data,
            }))
        }
        if (variable === "lopetusIka") {
            ;
            this.setState(prevState => ({
                ...prevState,
                lopetusIka: data,
            }))
        }
        if (variable === "turvaProsentti") {
            ;
            this.setState(prevState => ({
                ...prevState,
                turvaProsentti: data,
            }))
        }
        if (variable === "saastot") {
            ;
            this.setState(prevState => ({
                ...prevState,
                saastot: data,
            }))
        }
    }
//function for disabling the next button
    isDisabled = () => {
        if (this.state.aloitusIka!== null && this.state.lopetusIka !== null && this.state.turvaProsentti !== null && this.state.saastot !== null) {
            return false
        } else {
            return true
        }
    }
    //function for passing data to operationstore
    submit = (evt: any) => {
            const data = {
                "lopetusIka":this.state.lopetusIka,
        "aloitusIka":this.state.aloitusIka,
        "turvaProsentti":this.state.turvaProsentti,
            "saastot":this.state.saastot,
        };
            this.props.operationStore!.setData(data)

    };
    update=()=>{
        const lopetusika=this.state.lopetusIka
        this.props.operationStore!.updateData(lopetusika)
    }

    render() {
        return (
            <div className="printout-account-statement-view">

                <Row>
                    <InputGroup className="printout-account-statement-view__startdate">
                        <Col className="printout-account-statement-view__input-label-container">
                            <Label>Turva-%</Label>
                        </Col>
                        <Col className="printout-account-statement-view__input-container">
  <Input value={this.state.turvaProsentti} name="turvaProsentti" onChange={(evt)=>{this.setData(evt)}} type={"number"}/>
                        </Col>
                    </InputGroup>

                    <InputGroup>
                        <Col className="printout-account-statement-view__input-label-container">
                            <Label>Säästöt</Label>
                        </Col>
                        <Col className="printout-account-statement-view__input-container">
<Input value={this.state.saastot} name="saastot" onChange={(evt)=>{this.setData(evt)}} type={"number"}/>
                        </Col>
                    </InputGroup>
                </Row>
                <Row>
                <InputGroup>
                    <Col className="printout-account-statement-view__input-label-container">
                        <Label>Eläkkeen aloitus ikä</Label>
                    </Col>
                    <Col className="printout-account-statement-view__input-container">
<Input value={this.state.aloitusIka} name="aloitusIka" onChange={(evt)=>{this.setData(evt)}} type={"number"}/>
                    </Col>
                </InputGroup>
                <InputGroup>
                    <Col className="printout-account-statement-view__input-label-container">
                        <Label>Eläkkeen lopetus ikä</Label>
                    </Col>
                    <Col className="printout-account-statement-view__input-container">
                        <Input value={this.state.lopetusIka} name="lopetusIka" onChange={(evt)=>{this.setData(evt)}} type={"number"}/>
                    </Col>
                </InputGroup>
                </Row>
                    <Button id={"nextPageButton"} disabled={this.isDisabled()} className={"printout-account-statement-view__nextbutton"}
                            onClick={(evt: any) => this.submit(evt)}>Aloita eläke</Button>
                <Button id={"nextPageButton"} disabled={this.isDisabled()} className={"printout-account-statement-view__nextbutton"}
                        onClick={(evt: any) => this.update()}>Päivitä</Button>
            </div>
        )
    }
}


export default Inputs;