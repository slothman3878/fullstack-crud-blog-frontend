import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css';

const PostMarkDown=(props: {body: string, title?: string})=>{
  const [children, setChildren] = useState('');

  useEffect(() => {
    if(props.title)
      setChildren(`
# ${props.title}
---
${props.body}
`)
    else
      setChildren(props.body);
  }, [props])

  return(
    <ReactMarkdown children={children} remarkPlugins={[
        remarkGfm, 
        remarkMath,
        remarkGemoji,
      ]} rehypePlugins={[
        rehypeKatex
      ]} />
  )
}

export default PostMarkDown;