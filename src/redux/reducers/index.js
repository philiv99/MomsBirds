import { combineReducers } from 'redux'
import content from './content'
import versions from './versions'

export default combineReducers({
    content,
    versions
})