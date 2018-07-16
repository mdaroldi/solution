import React, { Component } from "react";
import { FormGroup, FormControl, ListGroupItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import "./NewScore.css";

export default class NewScore extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            content: "",
            score: null
        };
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await this.createScore({
                content: this.state.content
            });

        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    handleNoteClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
      }

    createScore(score) {
        return API.get("score", `/score/${score.content}`);
    }

    renderScore(content) {
        return (
            <div className="scores">
                <ListGroupItem
                    key={content}
                    href={`/score/${content}`}
                    header={content.trim().split("\n")[0]}
                >
                    {"Created: " + new Date(content.createdAt).toLocaleString()}
                </ListGroupItem>
            </div>
        )
    }

    render() {
        return (
            <div className="NewScore">
                {/* renderScore(this.state.score) */}
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.content}
                            componentClass="textarea"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        text="Pesquisa CPF"
                        loadingText="Creating…"
                    />
                </form>
            </div>
        );
    }
}