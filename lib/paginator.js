let numberOfPage = (data, page_size) => {
    return Math.ceil(data.length / page_size)
}

let pagination = (data, page_number, page_size) => {
    if( page_number > numberOfPage(data, page_size) ) {
        return []
    }
    return data.slice((page_number - 1) * page_size, (page_number*page_size))
}

exports.constructPaginatorObject = (data, page_number=1, page_size) => {
    return {
        pagination: {
            number_of_page: numberOfPage(data, page_size),
            has_next_page: page_number != numberOfPage(data, page_size),
            has_prev_page: (page_number - 1) > 0,
            current_page: parseInt(page_number)
        },
        torrents: pagination(data, page_number, page_size)
    }
}