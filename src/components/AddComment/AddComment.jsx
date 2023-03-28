import React, {useEffect, useState} from 'react'
import { useAppContext } from '../../context/AppContext'
import "./AddComment.css";

const AddComment = ({showAddComment,commentId,setShowAddComment,replyingTo}) => {
  const {user,addReply} = useAppContext()
  const [reply,setReply] = useState("");
  const [buffLength,setBuffLength] = useState(250)
  const charLimit =250;


  const debounceReply=(e)=>{
    if(buffLength <= 0)return;
    setReply(e.target.value);
  
  }

  useEffect(()=>{
    let isTimer = setTimeout(()=>{
          setBuffLength(charLimit - reply.length)
          console.log("updated buff lenght")
    },1500)

    return ()=>clearTimeout(isTimer)

  },[reply])


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
    <div className="reply-text-div">
      <textarea className="reply-input" name="reply" placeholder="Your reply here..." value={reply} onChange={(e)=>debounceReply(e)} id="reply"></textarea>
      {reply.length >= 1 &&

      <div className="char-counter">
        <h5 className="char-counter-h5">{charLimit - reply.length} characters remaining</h5>
      </div>
        }
        </div>
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