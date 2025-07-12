import { useState, useEffect, useRef } from 'react';
import './Typewriter.css';

const DEFAULT_MS = 50;

export interface ITypewriterProps {
  text: string | string[];
  speed?: number;
  loop?: boolean;
  random?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  onFinished?: Function;
  onStart?: Function;
  play?: boolean; 
}

export default function Typewriter({
  text,
  speed = DEFAULT_MS,
  loop = false,
  random = DEFAULT_MS,
  delay = DEFAULT_MS,
  cursor = true,
  cursorChar = '⎸',
  onFinished = () => {},
  onStart = () => {},
  play = true, 
}: ITypewriterProps) {
  const textArray = Array.isArray(text) ? text : [text];
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const currentText = textArray[currentStringIndex] || '';

  useEffect(() => {
    if (!play) {
      setCurrentTextIndex(0);
      setCurrentStringIndex(0);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [play]);

  useEffect(() => {
    if (!play || textArray.length === 0 || textArray.every(str => str.trim() === '')) {
      return;
    }

    if (currentTextIndex === 0) onStart();

    if (currentTextIndex < currentText.length) {
      timeoutRef.current = window.setTimeout(
        () => setCurrentTextIndex(prev => prev + 1),
        speed + (Math.random() * random)
      );
    } else {
      timeoutRef.current = window.setTimeout(() => {
        if (currentStringIndex < textArray.length - 1) {
          setCurrentTextIndex(0);
          setCurrentStringIndex(prev => prev + 1);
        } else if (loop) {
          setCurrentTextIndex(0);
          setCurrentStringIndex(0);
        } else {
          onFinished();
        }
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [
    currentTextIndex,
    currentStringIndex,
    textArray,
    currentText,
    speed,
    random,
    delay,
    loop,
    onFinished,
    onStart,
    play
  ]);

  useEffect(() => {
    setCurrentTextIndex(0);
    setCurrentStringIndex(0);
  }, [text]);

  if (textArray.length === 0 || textArray.every(str => str.trim() === '')) {
    return cursor ? <span className="cursor">{cursorChar}</span> : null;
  }

  return (
    <span>
      {currentText.substring(0, currentTextIndex)}
      {cursor && <span className="cursor">{cursorChar}</span>}
    </span>
  );
}