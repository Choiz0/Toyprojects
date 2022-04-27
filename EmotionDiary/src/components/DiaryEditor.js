import { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EmotionItem from './EmotionItem';
import MyButton from './MyButton';
import MyHeader from './MyHeader';
import { DiaryDispatchContext } from '../App';
import {emotionList} from '../util/emotion' 



const getStringDate =(date) =>{
    return date.toISOString().slice(0,10);
  }



const DiaryEditor = ({isEdit,originData}) => {
    
    const contentRef = useRef();
    const [content,setContent] =useState("");
    const [emotion, setEmotion] =useState(3);
    const [date,setDate] = useState(getStringDate(new Date()));
    const navigate = useNavigate();
    const {onCreate,onEdit,onRemove} = useContext(DiaryDispatchContext);
    
    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    })
    
    const handleSubmit =() => {
        if(content.length <1){
            contentRef.current.focus();
            return;
        }
        if(window.confirm(isEdit? "Do you want to edit the diary?" : "Do you want to save a new diary? " )){
            if(!isEdit){
                onCreate(date, content, emotion);
            }else{
                onEdit(originData.id , date, content, emotion);   
            }
        }

        
        navigate("/", {replace: true});

    }
    
    useEffect(()=>{
        if(isEdit){
           setDate(getStringDate(new Date(parseInt(originData.date))))
            setEmotion(originData.emotion);
            setContent(originData.content);
            

        }
    },[isEdit,originData]);

    const handleRemove = ()=> {
        if(window.confirm("Are you sure to remove the diary?")){
            onRemove(originData.id);
            navigate("/",{replace:true})
        }
    }
    
    return (
      <div className='DiaryEditor'>
        
          <MyHeader headText={isEdit ? "Edit Diary" :"New Diary" }
          leftChild={<MyButton text={"< Back"} onClick={()=>navigate(-1)}/>}
          rightChild={isEdit && (
              <MyButton text={'Delete'}
               onClick={handleRemove} 
               type={"negative"}/>)
            }
          />
       
        <div>
          <section>
            <h4>Today's Date</h4>
            <div className='input_box'>
              <input 
              className='input_date'
              value={date}
              onChange={(e)=> setDate(e.target.value)}
              type ="date" />
            </div>
          </section>
          <section>
          <h4>Today's Feeling</h4>
          <div className='input_box emotion_list_wrapper'>
              {emotionList.map((it)=>
              <EmotionItem key={it.emotion_id} 
              {...it}
              onClick={handleClickEmote}
              isSelected={it.emotion_id === emotion}
              />

                  )}
          </div>
          </section>
            <section>
                <h4>Today's Story</h4>
                <div className='input_box text_wrapper'>
                    <textarea ref={contentRef}
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </section>
            <section>
                <div className='control_box'>
                    <MyButton text={'Cancel'} onClick={()=>navigate(-1)} />
                    <MyButton text={'Done'} type={'positive'} onClick={handleSubmit} />

                </div>
            </section>
        </div>
      </div>
    );

}

export default DiaryEditor;