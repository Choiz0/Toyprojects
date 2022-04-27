const MyButton =({text,type, onClick}) =>{
  const btnType =['psitive','negative'].includes(type)?type:"default";
  
  return(
   
      <button className={['MyButton', `MyButton_${type}`].join(" ")}
      onClick={onClick}>
        {text}
        </button>
      
      
  );
};
MyButton.defaultProps = {
  type:"default",
}
export default MyButton;
