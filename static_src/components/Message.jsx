import React from 'react'

import moment from 'moment'
import 'moment/locale/ru'

export default ({author, text, date}) => 
    <div className={`message ${ author !== 'me' && 'outside-message' }`} >
        <div>
            <b> { author } </b>
            <i> { moment(date).fromNow() } </i>
        </div>
        <span>{ text }</span>
    </div>
