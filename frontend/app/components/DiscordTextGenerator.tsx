'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Paper,
  Stack,
  Box,
  Tooltip,
  CopyButton,
  Divider,
  Space,
  Grid,
  Anchor,
  rem,
  Mark,
  ActionIcon,
  Menu,
  ColorSwatch,
  Switch,
  AppShell,
  useMantineColorScheme,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import './ansi-styles.css';

interface TextStyle {
  fg?: string;
  bg?: string;
  st?: number;
}

const fgColors = [
  { code: 30, color: '#4f545c', name: 'Dark Gray (33%)' },
  { code: 31, color: '#dc322f', name: 'Red' },
  { code: 32, color: '#859900', name: 'Yellowish Green' },
  { code: 33, color: '#b58900', name: 'Gold' },
  { code: 34, color: '#268bd2', name: 'Light Blue' },
  { code: 35, color: '#d33682', name: 'Pink' },
  { code: 36, color: '#2aa198', name: 'Teal' },
  { code: 37, color: '#ffffff', name: 'White' },
];

const bgColors = [
  { code: 40, color: '#002b36', name: 'Blueish Black' },
  { code: 41, color: '#cb4b16', name: 'Rust Brown' },
  { code: 42, color: '#586e75', name: 'Gray (40%)' },
  { code: 43, color: '#657b83', name: 'Gray (45%)' },
  { code: 44, color: '#839496', name: 'Light Gray (55%)' },
  { code: 45, color: '#6c71c4', name: 'Blurple' },
  { code: 46, color: '#93a1a1', name: 'Light Gray (60%)' },
  { code: 47, color: '#fdf6e3', name: 'Cream White' },
];

const exampleTexts = [
  { name: 'Welcome Message', content: 'Welcome to Discord Colored Text Generator!' },
  { name: 'Rainbow Text', content: 'R:31 A:32 I:33 N:34 B:35 O:36 W:37' },
  { name: 'Styled Message', content: 'This text has bold and underline sections!' },
  { name: 'Server Rules', content: 'SERVER RULES:\n1. Be respectful\n2. No spamming\n3. Have fun!' },
];

export function DiscordTextGenerator() {
  const [textContent, setTextContent] = useState<string>("Welcome to Discord Colored Text Generator!");
  const editorRef = useRef<HTMLDivElement>(null);
  const clipboard = useClipboard();
  const [copyStatus, setCopyStatus] = useState('Copy text as Discord formatted');
  const [currentStyle, setCurrentStyle] = useState<TextStyle>({});
  const [copyCount, setCopyCount] = useState(0);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const toggleColorScheme = () => {
    const nextScheme = isDark ? 'light' : 'dark';
    setColorScheme(nextScheme);
    
    // Also save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('disco-discord-color-scheme', nextScheme);
    }
  };

  const applyStyle = (code: number) => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (!selectedText) return;

    const span = document.createElement("span");
    span.textContent = selectedText;
    
    // Apply styling based on code
    if (code === 0) {
      // Special case: Reset all styling
      const textNode = document.createTextNode(selectedText);
      range.deleteContents();
      range.insertNode(textNode);
      return;
    }
    
    if (code === 1 || code === 4) {
      // Bold or underline
      span.className = `ansi-${code}`;
    } else if (code >= 30 && code < 40) {
      // Foreground color
      span.className = `ansi-${code}`;
    } else if (code >= 40) {
      // Background color
      span.className = `ansi-${code}`;
    }
    
    range.deleteContents();
    range.insertNode(span);
  };

  const resetEditor = () => {
    if (editorRef.current) {
      editorRef.current.textContent = textContent;
    }
  };

  const handleCopy = () => {
    if (!editorRef.current) return;

    const getToCopy = () => {
      const toCopy = "```ansi\n" + nodesToANSI(editorRef.current?.childNodes || [], [{ fg: 2, bg: 2, st: 2 }]) + "\n```";
      return toCopy;
    };

    clipboard.copy(getToCopy());
    
    const copyMessages = [
      "Copied!",
      "Double Copy!",
      "Triple Copy!",
      "Dominating!!",
      "Rampage!!",
      "Mega Copy!!",
      "Unstoppable!!",
      "Wicked Sick!!",
      "Monster Copy!!!",
      "GODLIKE!!!",
      "BEYOND GODLIKE!!!!"
    ];
    
    const newCopyCount = Math.min(copyCount + 1, copyMessages.length - 1);
    setCopyCount(newCopyCount);
    setCopyStatus(copyMessages[newCopyCount]);
    
    setTimeout(() => {
      setCopyStatus('Copy text as Discord formatted');
      if (newCopyCount >= 5) {
        setCopyCount(0);
      }
    }, 2000);
  };

  const loadExampleText = (exampleIndex: number) => {
    const example = exampleTexts[exampleIndex];
    if (example) {
      setTextContent(example.content);
      if (editorRef.current) {
        editorRef.current.textContent = example.content;
      }
    }
  };

  const applyRainbowText = () => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (!selectedText) return;
    
    range.deleteContents();
    
    // Apply rainbow colors to each character
    const rainbowColors = [31, 33, 32, 36, 34, 35, 37];
    Array.from(selectedText).forEach((char, index) => {
      const colorCode = rainbowColors[index % rainbowColors.length];
      const span = document.createElement('span');
      span.className = `ansi-${colorCode}`;
      span.textContent = char;
      range.insertNode(span);
      range.setStartAfter(span);
    });
  };

  const createColoredExample = () => {
    if (!editorRef.current) return;
    
    const exampleHtml = `Welcome to <span class="ansi-33">Discord</span> <span class="ansi-45"><span class="ansi-37">Colored</span></span> <span class="ansi-31">T</span><span class="ansi-32">e</span><span class="ansi-33">x</span><span class="ansi-34">t</span> <span class="ansi-35">G</span><span class="ansi-36">e</span><span class="ansi-37">n</span><span class="ansi-31">e</span><span class="ansi-32">r</span><span class="ansi-33">a</span><span class="ansi-34">t</span><span class="ansi-35">o</span><span class="ansi-36">r</span><span class="ansi-37">!</span>`;
    editorRef.current.innerHTML = exampleHtml;
  };

  const nodesToANSI = (nodes: NodeListOf<ChildNode> | Array<ChildNode>, states: Array<{ fg: number, bg: number, st: number }>): string => {
    let text = "";
    for (const node of nodes) {
      if (node.nodeType === 3) { // Text node
        text += node.textContent;
        continue;
      }
      if (node.nodeName === "BR") {
        text += "\n";
        continue;
      }
      
      if (node instanceof HTMLElement) {
        const classes = node.className.split(" ");
        const ansiClass = classes.find(cl => cl.startsWith("ansi-"));
        if (!ansiClass) {
          text += nodesToANSI(node.childNodes, states);
          continue;
        }
        
        const ansiCode = +(ansiClass.split("-")[1]);
        const newState = Object.assign({}, states.at(-1) || { fg: 2, bg: 2, st: 2 });

        if (ansiCode < 30) newState.st = ansiCode;
        if (ansiCode >= 30 && ansiCode < 40) newState.fg = ansiCode;
        if (ansiCode >= 40) newState.bg = ansiCode;

        states.push(newState);
        text += `\x1b[${newState.st};${(ansiCode >= 40) ? newState.bg : newState.fg}m`;
        text += nodesToANSI(node.childNodes, states);
        states.pop();
        text += `\x1b[0m`;
        
        if (states.at(-1)?.fg !== 2) text += `\x1b[${states.at(-1)?.st};${states.at(-1)?.fg}m`;
        if (states.at(-1)?.bg !== 2) text += `\x1b[${states.at(-1)?.st};${states.at(-1)?.bg}m`;
      }
    }
    return text;
  };

  useEffect(() => {
    // Set initial content
    if (editorRef.current) {
      editorRef.current.innerHTML = textContent;
    }

    // Handle paste to strip HTML formatting
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      if (!e.clipboardData) return;
      
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    };

    // Handle enter key for line breaks
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.execCommand('insertLineBreak');
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('paste', handlePaste);
      editor.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (editor) {
        editor.removeEventListener('paste', handlePaste);
        editor.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [textContent]);

  return (
    <AppShell>
      <Container fluid px="xs">
        <Stack gap="md">
          <Group justify="space-between" align="center" pt="md">
            <Title order={1} ta="center" className="gradient-title" style={{ 
              background: 'linear-gradient(45deg, #5865F2, #EB459E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Discord Colored Text Generator
            </Title>
            <Group>
              <Text size="sm">Light</Text>
              <Switch 
                checked={isDark} 
                onChange={toggleColorScheme}
                size="md"
              />
              <Text size="sm">Dark</Text>
            </Group>
          </Group>
          
          <Paper p="md" withBorder shadow="md" radius="md" style={{ 
            backgroundColor: isDark ? 'var(--mantine-color-dark-7)' : 'var(--mantine-color-gray-0)',
            color: isDark ? 'var(--mantine-color-white)' : 'var(--mantine-color-black)'
          }}>
            <Title order={2} mb="sm">About</Title>
            <Text size="md">
              This app creates colored Discord messages using the ANSI color codes available on Discord desktop.
              Write your text, select parts of it, assign colors and formatting, then copy and paste into Discord.
            </Text>
            <Space h="md" />
            <Text size="sm" c="dimmed">
              This is an unofficial tool, not made or endorsed by Discord. Inspired by {' '}
              <Anchor href="https://gist.github.com/rebane2001/07f2d8e80df053c70a1576d27eabe97c" target="_blank">
                Rebane&apos;s Discord Colored Text Generator
              </Anchor>
              {' '}and{' '}
              <Anchor href="https://gist.github.com/kkrypt0nn/a02506f3712ff2d1c8ca7c9e0aed7c06" target="_blank">
                kkrypt0nn&apos;s guide
              </Anchor>.
            </Text>
          </Paper>

          <Paper p="md" withBorder shadow="md" radius="md">
            <Title order={2} mb="md">Create your text</Title>
            
            <Group mb="md" wrap="wrap">
              <Button variant="filled" onClick={() => applyStyle(0)}>Reset All</Button>
              <Button variant="filled" fw={700} onClick={() => applyStyle(1)}>Bold</Button>
              <Button variant="filled" td="underline" onClick={() => applyStyle(4)}>Underline</Button>
              <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} onClick={applyRainbowText}>Rainbow Text</Button>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="subtle">Templates</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Example Texts</Menu.Label>
                  {exampleTexts.map((example, index) => (
                    <Menu.Item key={index} onClick={() => loadExampleText(index)}>
                      {example.name}
                    </Menu.Item>
                  ))}
                  <Menu.Divider />
                  <Menu.Item onClick={createColoredExample}>Colored Example</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>

            <Divider label="Foreground Colors" labelPosition="center" my="md" />
            
            <Grid mb="md">
              {fgColors.map((color) => (
                <Grid.Col span={{ base: 3, sm: 2, md: 1 }} key={color.code}>
                  <Tooltip label={color.name} position="top" withArrow>
                    <Button 
                      fullWidth
                      styles={{ root: { backgroundColor: color.color } }}
                      onClick={() => applyStyle(color.code)}
                      aria-label={`Foreground color: ${color.name}`}
                    />
                  </Tooltip>
                </Grid.Col>
              ))}
            </Grid>

            <Divider label="Background Colors" labelPosition="center" my="md" />
            
            <Grid mb="md">
              {bgColors.map((color) => (
                <Grid.Col span={{ base: 3, sm: 2, md: 1 }} key={color.code}>
                  <Tooltip label={color.name} position="top" withArrow>
                    <Button 
                      fullWidth
                      styles={{ root: { backgroundColor: color.color } }}
                      onClick={() => applyStyle(color.code)}
                      aria-label={`Background color: ${color.name}`}
                    />
                  </Tooltip>
                </Grid.Col>
              ))}
            </Grid>

            <Space h="md" />
            
            <div 
              className={`discord-editor ${isDark ? 'discord-editor-dark' : 'discord-editor-light'}`}
              contentEditable
              ref={editorRef}
            />
            
            <Space h="md" />
            
            <Group>
              <Button 
                size="md" 
                onClick={handleCopy}
                color={copyCount >= 5 ? "red" : undefined}
              >
                {copyStatus}
              </Button>
              <Button size="md" variant="outline" onClick={resetEditor}>
                Reset Text
              </Button>
            </Group>
          </Paper>
        </Stack>
      </Container>
    </AppShell>
  );
} 