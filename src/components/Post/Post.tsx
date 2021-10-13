import { useState } from "react";
import { PostI } from "../../model/post/Post.interface";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";
import { Button } from "@mui/material";
import * as S from "./Post.styles";

export const Post = ({ author, body, comments }: PostI) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h3>{author}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <S.Body>{body}</S.Body>

        <S.SettingsContainer>
          <p>user actions</p>
          <Button onClick={() => setShowComments(!showComments)}>
            <p>{comments?.length || 0}</p>
            <CommentIcon />
          </Button>
        </S.SettingsContainer>

        {showComments && (
          <>
            {comments?.map((comment) => (
              <div key={comment.id}>
                <h4>{comment.author}</h4>
                <S.Body>{comment.body}</S.Body>
              </div>
            ))}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
