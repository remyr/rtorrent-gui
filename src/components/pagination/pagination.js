import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/torrentActions'
import { connect } from 'react-redux'

class PaginationComponent extends Component {
    render() {
        let { currentPage, pageNumber } = this.props
        return (
            <li className={currentPage == pageNumber ? 'active' : 'waves-effect'}>
                <a onClick={() => this.props.click(pageNumber)}>{pageNumber}</a>
            </li>
        )
    }
}

class Pagination extends Component {

    renderPageList(number_page, current_page) {
        let rows = []
        for (var i=1; i < number_page + 1; i++) {
            rows.push(<PaginationComponent click={this.goToPage.bind(this)} currentPage={current_page} pageNumber={i} key={i}/>)
        }
        return rows
    }

    goToPage(pageDest) {
        this.props.actions.fetchTorrents(this.props.currentPage, pageDest)
    }

    render() {
        let { number_of_page, current_page, has_next_page, has_prev_page } = this.props.pagination
        return (
            <ul className="pagination" style={{textAlign: 'center'}}>
                <li className={has_prev_page ? 'waves-effect' : 'disabled'}><a onClick={(e) => this.goToPage(current_page - 1)}><i className="material-icons">chevron_left</i></a></li>
                {this.renderPageList(number_of_page, current_page)}
                <li className={has_next_page ? 'waves-effect' : 'disabled'}><a onClick={(e) => this.goToPage(current_page + 1)}><i className="material-icons">chevron_right</i></a></li>
            </ul>
        )
    }
}

export default Pagination