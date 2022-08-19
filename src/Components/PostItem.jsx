import React from "react";
import MyButton from "./UI/Button/MyButton";

const PostItem = ({remove, number, ...props}) => {
    return (
        <div className="post">
            <div className="post__content">
                <strong>{number}. {props.post.title}</strong>
                <div>
                {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => remove(props.post)}>Удалить</MyButton>
            </div>
        </div>
    );
}
export default PostItem