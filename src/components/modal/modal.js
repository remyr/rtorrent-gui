import React, {Component} from 'react';

class Modal extends Component {

    constructor(props) {
        super()
        this.state = {
            url: ''
        }
    }

    handleChange(e) {
        this.setState({url: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.addTorrent(this.state.url)
        $('#modal1').closeModal();
    }

    render() {
        return(
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Ajouter un torrent</h4>
                    <form method="post" onSubmit={(e) => this.handleSubmit(e)}>
                        <input
                            placeholder="Lien du torrent"
                            name="torrentUrl" id="torrent_link"
                            type="text" className="validate"
                            value={this.state.url}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input type="submit" value="Ajouter" className="btn modal-add-btn"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Modal