import React, {useState, useRef} from 'react'
import { useAppContext } from '../../context/AppContext';
import AddComment from '../AddComment/AddComment';
import "./Comment.css"
import JSConfetti from 'js-confetti'





const Comment = ({comment,isReply}) => {
  const {replies,deleteReply,updateReply,setLinksInText,clickReaction,hasWarned} = useAppContext();
  const [score,setScore] = useState(comment.score);
  const [showAddComment,setShowAddComment] = useState(false)
  const [showEdit,setShowEdit] = useState(false)
  const [newReply,setNewReply] = useState( `${comment.content}`)
  const [hasVoted,setHasVoted] = useState(false);
  const canvasRef = useRef();
  const mobileCanvasRef = useRef();

  // console.log(replies);


  const handleUpdate=()=>{
    setShowEdit(false);
    updateReply(newReply,comment.id)
  }


  const handleLike=(reaction)=>{
    if(!clickReaction())return;
   

    // if(hasVoted)return;
    if(reaction == "like"){
      const jsConfetti = new JSConfetti({canvas:canvasRef.current});
      jsConfetti.addConfetti({
        confettiColors: [
          'hsl(238, 40%, 52%);', 'hsl(358, 79%, 66%);', 'hsl(357, 100%, 86%)', '#ff85a1', 'rgb(31, 128, 238)', 'hsl(239, 57%, 85%)',
        ],
      })
      const jsConfetti2 = new JSConfetti({canvas:mobileCanvasRef.current});
      jsConfetti2.addConfetti({
        confettiColors: [
          'hsl(238, 40%, 52%);', 'hsl(358, 79%, 66%);', 'hsl(357, 100%, 86%)', '#ff85a1', 'rgb(31, 128, 238)', 'hsl(239, 57%, 85%)',
        ],
      })
    setScore(score+1);
    setHasVoted(true);
    }
    else{
      setScore(score-1);
      setHasVoted(true)
    }
  }

  return (
    <div className={isReply ? "reply-container" : "comment-container"}>
      <div className="comment-card">
        <div className="comment-card-content">
      <div className="rating-col">
      <canvas ref={canvasRef} className="confetti-canvas"></canvas>

          <div className="rating-container">
            <div className="rating-div">
              <button onClick={()=>handleLike("like")} className={hasWarned ? "rating-btn no-hover" : "rating-btn"}>
                <img className="rating-icon" src="./images/icon-plus.svg" alt="" />
              </button>
            </div>
            <div className="rating-div">
              <h5 className="score-h5">{score}</h5>
            </div>
            <div className="rating-div">
            <button onClick={()=>handleLike("dislike")} className={hasWarned ? "rating-btn no-hover" : "rating-btn"}>
                <img className="rating-icon" src="./images/icon-minus.svg" alt="" />
              </button>
            </div>
          </div>
      </div>
      <div className="comment-content-column">
        <div className="top-comment-row">
          <div className="comment-author-info-col">
            <div className="avatar-div">
              <img className="avatar-img" src={comment.user.image.png} alt="user-img" />
            </div>
            <div className="posted-by-div">
              <h5 className="posted-by-h5">{comment.user.username}</h5>
              {comment.user.username === "juliusomo" && <span className="you-span">You</span>}
            </div>
            <h5 className="time-stamp-h5">
              {comment.createdAt}
            </h5>
          </div>
          <div className="comment-action-col">
            {comment.user.username == "juliusomo" ?
            <div className="edit-delete-div">
              <button onClick={()=>deleteReply(comment.id)} className="action-btn red">
              <img className="action-icon" src="./images/icon-delete.svg" alt="" />

               <span className="red"> Delete </span>
                </button>
              <button onClick={()=>setShowEdit(!showEdit)} className="action-btn purple">
              <img className="action-icon" src="./images/icon-edit.svg" alt="" />

                Edit</button>
            </div> :
            <button onClick={()=>setShowAddComment(!showAddComment)} className="action-btn purple">
              <img className="action-icon" src="./images/icon-reply.svg" alt="" />
              Reply
              </button>}
          </div>
        </div>
        <div className="bottom-comment-row">
          {showEdit ? <div className="update-div">
            <textarea className="edit-input" value={newReply} id="editThread" onChange={(e)=>setNewReply(e.target.value)}></textarea>
            <button onClick={handleUpdate} className="send-btn right">Update</button>
          </div>:
          <h5 className="comment-content-h5">{comment?.replyingTo && <span className="replyingTo">@{comment.replyingTo}</span>} {setLinksInText(comment.content).map(word=>word.isLink ? <><a key={word.id} href="#"> {word.word} </a>{word?.symbol?.length && word.symbol.map(w=><span style={{marginLeft:"-.25rem"}}>{w}</span>)}</> : <span key={word.id}> {word.word} </span>)} </h5>
  }
        </div>
        {!showEdit &&

        <div className="mobile-row">
          <div className="mobile-rating-container">
          <canvas ref={mobileCanvasRef} className="confetti-canvas"></canvas>

          <div className="rating-div">
              <button onClick={()=>handleLike("like")} className={hasWarned ? "rating-btn no-hover" : "rating-btn"}>
                <img className="rating-icon" src="./images/icon-plus.svg" alt="" />
              </button>
            </div>
            <div className="rating-div">
              <h5 className="score-h5">{score}</h5>
            </div>
            <div className="rating-div">
            <button onClick={()=>handleLike("dislike")} className={hasWarned ? "rating-btn no-hover" : "rating-btn"}>
                <img className="rating-icon" src="./images/icon-minus.svg" alt="" />
              </button>
            </div>
          </div>


          {comment.user.username == "juliusomo" ?
            <div className="mobile-edit-delete-div">
              <button onClick={()=>deleteReply(comment.id)} className="action-btn red">
              <img className="action-icon red" src="./images/icon-delete.svg" alt="" />

                Delete
                </button>
              <button onClick={()=>setShowEdit(!showEdit)} className="action-btn">
              <img className="action-icon" src="./images/icon-edit.svg" alt="" />

                Edit</button>
            </div> :
            <button onClick={()=>setShowAddComment(!showAddComment)} className="action-btn">
              <img className="action-icon" src="./images/icon-reply.svg" alt="" />
              Reply
              </button>}
        </div>
}
      </div>
      </div>
      </div>
      {replies.length > 0 && replies.filter(r=>r.commentId == comment.id).map(r=><Comment isReply={true} comment={r} key={r.id}/>)}
      <AddComment replyingTo={comment.user.username} setShowAddComment={setShowAddComment} commentId={comment.commentId ? comment.commentId : comment.id
      } showAddComment={showAddComment}/>
    </div>
  )
}

export default Comment