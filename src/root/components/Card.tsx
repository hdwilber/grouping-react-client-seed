import * as React from 'react';

export enum ACTIONS {
  AGREE = 100,
  OPEN,
  ARCHIVE,
  DELETE,
  EDIT,
  SELECTED_KEYWORD
}

interface IOwnProps {
  onClickOpen: (any) => void;
  onClickArchive: (any) => void;
  onClickKeyword: (any) => void;
  onClickEdit: (any) => void;
  onClickAgree: (any) => void;
  onClickDelete: (any) => void;
  idea:any;
  allowRemove: boolean;
};

class Card extends React.Component <IOwnProps, {}> {
  constructor(props) {
    super(props);
  }
  renderKeywords(keys) {
    return (
      <ul className="list-inline idea-keywords">
      {keys.map((key, i) =>{
        return(
        <li key={i} title={key.description}>
        {key.name}
        </li>
        )
      })
      }
      </ul>
    );
  }

  handleClickAgree() {

  }



  render() {
    const { idea, allowRemove, onClickAgree, onClickOpen, onClickArchive, onClickDelete, onClickEdit, onClickKeyword } = this.props;
    return (
      <div className="idea-card">
        <div className="idea-card__header" onClick={() => onClickOpen(idea)}>
          {idea.title ? idea.title: ''}
        </div>
        <div className="idea-card__body">
          <p>
            {(idea.description) ? idea.description.substring(0,200) + '...' : ''}
          </p>
          {this.renderKeywords(idea.keywords)}
        </div>
        <div className="idea-card__footer">
          <div className="footer_left"> 
            <span className="author" title={idea.author ? idea.author.profile.displayName : ''}><i className="fa fa-user"/></span>
          </div>
          <div className="footer_right">
            <span className="badge agree" onClick={() => onClickAgree(idea)}>{idea.agrees ? idea.agrees.length: null} <i className="fa fa-check" /></span>
            <span className="badge comments" title="comments">{idea.comments.length} <i className="fa fa-comments" /></span>

            {allowRemove && (
              <div className="hard-actions">
                <span title="Edit" className="edit" onClick={() => onClickEdit(idea)}><i className="fa fa-edit"/></span>
                <span title="Archive" className="archive" onClick={() => onClickArchive(idea)}><i className="fa fa-archive"/></span>
                <span title="Delete" className="delete" onClick={() => onClickDelete(idea)}><i className="fa fa-remove"/></span>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}



export default Card;
