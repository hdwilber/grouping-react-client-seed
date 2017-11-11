import * as React from 'react';

import {HelpBlock, Panel, FormGroup, Button , ControlLabel, Form, FormControl,  Modal  } from 'react-bootstrap';
import Autocomplete from 'react-autocomplete';

export enum ACTIONS {
  SAVE,
  PUBLISH,
  DISCARD
};

interface IOwnProps {
  onClose: (ACTIONS, ony, any) => void;
  onKeywordValueChanged: (string) => void;
  onKeywordAdd: (any, ony) => void;
  onKeywordCreate: (string) => void;
  keywords: Array<any>;
  open: boolean;
  idea: any;
};
interface IOwnState {
  fields: {
    title: string;
    description: string;
  }
  keywordLabel: string;
};

class DialogEditIdea extends React.Component<IOwnProps, IOwnState> {
  constructor(props) {
    super(props)
    this.state = ({
      fields: {
        title: '',
        description: '',
      },
      keywordLabel: '',
    });
    this.handleClickNewKeyword.bind(this);
    this.handleKeywordSelected.bind(this);
  }

  handleRequestDiscard= (e) => {
    this.props.onClose(ACTIONS.DISCARD, null, null);
    this.resetState();
  }

  handleRequestSave = (e) => {
    this.resetState();
    this.props.onClose(ACTIONS.SAVE, this.props.idea, this.state.fields);
  }

  handleRequestPublish = (e) => {
    this.resetState();
    this.props.onClose(ACTIONS.DISCARD, this.props.idea, this.state.fields)
  }

  resetState() {
    this.setState({
      fields: {
        title: '',
        description: ''
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.idea) {
      const { idea } = nextProps;
      this.setState({
        fields: {
          title: idea.title,
          description: idea.description
        }
      })
    }
  }

  renderKeywords () {
    return (
      <ul className="list-inline idea-keywords">
      {this.props.idea.keywords.map ( key => {
        return ( 
          <li>
            <span className="keyword-label"> 
              {key.name}
            </span>
            <span className="keyword-remove"> 
            </span>

          </li> )
      })}
      </ul>

    );
  }
  onChangeHandler = (e) => {
    var aux = e.target.value;
    switch(e.target.name) {
      case 'title': 
        this.setState({...this.state, fields: { ...this.state.fields, title: aux}})
      break;
      case 'description': 
        this.setState({...this.state, fields: { ...this.state.fields, description: aux}})
      break;
    }
  }

  handleClickNewKeyword = (e) => {
    this.props.onKeywordCreate({
      name: this.state.keywordLabel,
    });
  }

  handleKeywordChange = (e) => {
    this.setState({keywordLabel: e.target.value})
  }
  handleKeywordSelected = (val, keyword) => {
    this.props.onKeywordAdd(this.props.idea, keyword);
  }

  render() {
    const { idea, keywords, open, onKeywordValueChanged, onClose,  ...other } = this.props;
    return (
      <Modal
        show={open}
        onHide={this.handleRequestDiscard}
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Edit your idea</Modal.Title>
        </Modal.Header>

        {(idea) && (
          <Modal.Body>
          <Form>
            <FormGroup>
              <ControlLabel> Title </ControlLabel>
              <FormControl name="title" onChange={this.onChangeHandler} type="text" value={this.state.fields.title}/>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Body</ControlLabel>
              <FormControl name="description" onChange={this.onChangeHandler} componentClass="textarea" value={this.state.fields.description} placeholder="textarea" />
            </FormGroup>
          </Form>

          <Panel className="panel-keywords">
           <FormGroup className="selectors">
              <Autocomplete
                getItemValue={(keyword) => keyword.name}
                value={this.state.keywordLabel}
                items={keywords ? keywords: []}
                wrapperStyle={ { position :'relative', display: 'inline-block' } }
                menuStyle={ { position :'absolute', left: 0, top: '100%' } }
                shouldItemRender={(keyword, value) => keyword.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                renderItem={(keyword, isHighlighted) =>
                  <div key={keyword.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {keyword.name}
                  </div>
                }
                onChange={this.handleKeywordChange}
                onSelect={
                  this.handleKeywordSelected
                }
              />
              <Button onClick={this.handleClickNewKeyword}>
                Add
              </Button>
            </FormGroup>

            { this.renderKeywords() }
          </Panel>
        </Modal.Body>
        )}
        <Modal.Footer>
          {(idea) && ( <Button onClick={this.handleRequestSave}>Save</Button>)}
          {(idea) && ( <Button onClick={this.handleRequestPublish}>Publish</Button>)}
          <Button onClick={this.handleRequestDiscard}>Discard</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  onAutocompleteChanged(val) {
  };
}
export default DialogEditIdea;
