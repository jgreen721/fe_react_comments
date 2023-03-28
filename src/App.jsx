import React from 'react'
import {Header,DeleteModal,Comment} from "./components"
import "./App.css"
import { useAppContext } from './context/AppContext'

const App = () => {
    const {comments} = useAppContext();
  return (
    <div className="app">
        <div className="app-content-container">
        <DeleteModal/>

            <Header/>
            <div className="comments-container">
              {comments.map(c=>(
                <Comment comment={c} isReply={false} key={c.id}/>
              ))}
            </div>
        </div>
    </div>
  )
}

export default App