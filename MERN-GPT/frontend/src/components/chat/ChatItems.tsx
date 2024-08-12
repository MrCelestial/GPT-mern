import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext.tsx";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { PrismTheme } from 'react-syntax-highlighter';

// Custom theme using your colors
const customCodeTheme: PrismTheme = {
    'code[class*="language-"]': {
        color: '#E8EAE3FF',
        background: '#191919FF',
        textShadow: '0 1px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: '1em',
        textAlign: 'left',
        whiteSpace: 'pre',
        wordSpacing: 'normal',
        wordBreak: 'normal',
        wordWrap: 'normal',
        lineHeight: '1.5',
        MozTabSize: '4',
        OTabSize: '4',
        tabSize: '4',
        WebkitHyphens: 'none',
        MozHyphens: 'none',
        msHyphens: 'none',
        hyphens: 'none',
    },
    'pre[class*="language-"]': {
        color: '#E8EAE3FF',
        background: '#191919FF',
        padding: '1em',
        margin: '.5em 0',
        overflow: 'auto',
        borderRadius: '0.3em',
    },
    'comment': { color: '#6A9955' },
    'punctuation': { color: '#E8EAE3FF' },
    'property': { color: '#FA2742FF' },
    'tag': { color: '#FA2742FF' },
    'boolean': { color: '#FA2742FF' },
    'number': { color: '#FA2742FF' },
    'constant': { color: '#FA2742FF' },
    'symbol': { color: '#FA2742FF' },
    'string': { color: '#E8EAE3FF' },
    'selector': { color: '#FA2742FF' },
    'attr-name': { color: '#FA2742FF' },
    'char': { color: '#E8EAE3FF' },
    'builtin': { color: '#FA2742FF' },
    'inserted': { color: '#FA2742FF' },
    'operator': { color: '#E8EAE3FF' },
    'entity': { color: '#FA2742FF', cursor: 'help' },
    'url': { color: '#FA2742FF' },
    'variable': { color: '#FA2742FF' },
    'atrule': { color: '#FA2742FF' },
    'attr-value': { color: '#E8EAE3FF' },
    'keyword': { color: '#FA2742FF' },
    'function': { color: '#E8EAE3FF' },
    'regex': { color: '#FA2742FF' },
    'important': { color: '#FA2742FF', fontWeight: 'bold' },
    'bold': { fontWeight: 'bold' },
    'italic': { fontStyle: 'italic' },
};

function extractBlocks(message: string) {
    const codeRegex = /```([\s\S]*?)```/g;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const blocks = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(message)) !== null) {
        if (match.index > lastIndex) {
            blocks.push(...processTextBlock(message.slice(lastIndex, match.index)));
        }
        blocks.push({ type: 'code', content: match[1].trim() });
        lastIndex = codeRegex.lastIndex;
    }

    if (lastIndex < message.length) {
        blocks.push(...processTextBlock(message.slice(lastIndex)));
    }

    return blocks;
}

function processTextBlock(text: string) {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const textBlocks = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            textBlocks.push({ type: 'text', content: text.slice(lastIndex, match.index) });
        }
        textBlocks.push({ type: 'bold', content: match[1] });
        lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < text.length) {
        textBlocks.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return textBlocks;
}

const ChatItems = ({ content, role }: { content: string, role: "user" | "assistant" }) => {
    const messageBlocks = extractBlocks(content);
    const auth = useAuth();
    const username = auth?.user?.username || '';
    const initials = username ? username.split(' ').map(name => name[0]).join('') : '';

    return (
        <Box sx={{ display: "flex", p: 2, bgcolor: role === "assistant" ? "gray.700" : "", my: 2, gap: 2 }}>
            <Avatar sx={{ ml: "0", bgcolor: role === "user" ? "black" : "transparent" }}>
                {role === "assistant" ? (
                    <img src="/logo.svg" width={40} height={40} alt="" />
                ) : initials}
            </Avatar>
            <Box>
                {messageBlocks.map((block, index) => {
                    switch (block.type) {
                        case 'code':
                            return (
                                <SyntaxHighlighter key={index} style={customCodeTheme} language="javascript">
                                    {block.content}
                                </SyntaxHighlighter>
                            );
                        case 'bold':
                            return (
                                <Typography key={index} component="span" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                    {block.content}
                                </Typography>
                            );
                        default:
                            return (
                                <Typography key={index} component="span" sx={{ fontSize: '20px' }}>
                                    {block.content}
                                </Typography>
                            );
                    }
                })}
            </Box>
        </Box>
    );
};

export default ChatItems;