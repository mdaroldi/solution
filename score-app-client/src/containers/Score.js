import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel, ListGroupItem, BreadcrumbItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Score.css";


export default class Score extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            isDeleting: null,
            score: null,
            content: "",
            attachmentURL: null
        };
    }

    async componentDidMount() {
        try {
            const score = await this.getScore();
            const { content } = score;

            this.setState({
                score,
                content
            });
        } catch (e) {
            alert(e);
        }
        console.log(this.state.score);
    }

    getScore() {
        return API.get("score", `/score/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    render() {
        return (
            <div className="Score">
                <h1>Resultado</h1>
                {this.state.score &&
                    <ul>
                        <li>CPF: {this.state.score.cpf}</li>
                        <li>Idade: {this.state.score.age}</li>
                        <li>Endereço: {this.state.score.address}</li>
                        <li>Fonte de Renda: {this.state.score.income}</li>
                        <li>Bens: {this.state.score.possessions}</li>
                    </ul>
                }
            </div>
        );
    }
}