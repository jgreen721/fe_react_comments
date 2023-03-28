import {useContext, createContext, useState, useEffect} from "react"



const AppContext = createContext();

export const useAppContext = ()=>useContext(AppContext);







export const AppProvider = ({children})=>{
    const [comments,setComments] = useState([]);
    const [replies,setReplies] = useState([])
    const [test,setTest] = useState([])
    const [user,setUser] = useState(null);
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const [deleteId,setDeleteId] = useState(null)



    useEffect(()=>{
        fetch("data.json")
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setUser(res.currentUser);
            setComments(res.comments);
            let tempReplies = [];
            res.comments.forEach(c=>{
                if(c.replies.length > 0){
                    c.replies.forEach(r=>tempReplies.push({...r,commentId:c.id}))
                }
            })
            setReplies(tempReplies)

        })

    },[])


    const filterComments=(comments)=>{
        let tempReplies = [];
            comments.forEach(c=>{
                if(c.replies.length > 0){
                    c.replies.forEach(r=>tempReplies.push({...r,commentId:c.id}))
                }
            })
            console.log(tempReplies);
    }


    const addReply=(commentId,reply,replyingTo)=>{
        let newReply={
            id:Math.random() * 1000000 | 0,
            commentId,
            createdAt:'Just now...',
            score:0,
            content:reply,
            replyingTo:replyingTo,
            user
        }
        setReplies([...replies,newReply])
        

        console.log("newReply",newReply);
    }


    const deleteReply=(id)=>{
        console.log("Comment_to_be_deleted:",id);
        setDeleteId(id);
        setShowDeleteModal(true)
    }


    const confirmDelete=()=>{
        console.log("confirmDelete")
        setReplies(replies.filter(r=>r.id != deleteId));
        setDeleteId(null)
        setShowDeleteModal(!showDeleteModal)
    }

    const toggleEdit=()=>{
        console.log("toggleEdit fired!")
    }

    const updateReply=(reply,id)=>{
        setReplies(replies.map(r=>r.id == id ? {...r,content:reply} : r))
    }


    const values={
        comments,
        replies,
        test,
        user,
        addReply,
        deleteReply,
        confirmDelete,
        toggleEdit,
        setShowDeleteModal,
        updateReply,
        showDeleteModal
    }





    return <AppContext.Provider value={values}>
        {children}
    </AppContext.Provider>
}