import React, {useState} from 'react'
import { useAppContext } from '../../context/AppContext'
import "./AddComment.css";

const AddComment = ({showAddComment,commentId,setShowAddComment,replyingTo}) => {
  const {user,addReply} = useAppContext()
  const [reply,setReply] = useState("");


  const handleAddReply=()=>{
    addReply(commentId,reply,replyingTo)
    setReply("")
    setShowAddComment(false)
  }

  return (
    <div className={showAddComment ? "add-comments-form" : "add-comments-form hide-form"}>
      <div className="user-img-div desktop">
      <img className="avatar-img" src={user.image.png} alt="" />
      </div>
    
      <textarea className="reply-input" name="reply" placeholder="Your reply here..." value={reply} onChange={(e)=>setReply(e.target.value)} id="reply"></textarea>
      <button onClick={handleAddReply} className="desktop send-btn">Send</button>

      <div className="mobile-add-row">
      <div className="user-img-div">
      <img className="avatar-img" src={user.image.png} alt="" />
      </div>
      <button onClick={handleAddReply} className="send-btn">Send</button>

      </div>
    </div>
  )
}

export default AddComment