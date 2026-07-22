"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";
import type { Comment } from "../../data/secrets";
import { generateId, formatTimestamp } from "@/lib/utils";

interface CommentSectionProps {
  dossierId: string;
  comments: Comment[];
  onAddComment: (dossierId: string, comment: Comment) => void;
}

export function CommentSection({ dossierId, comments, onAddComment }: CommentSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return;

    const newComment: Comment = {
      id: generateId(),
      author: author.trim(),
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    onAddComment(dossierId, newComment);
    setText("");
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-none border border-zinc-800 bg-zinc-900/50 px-3 py-2 font-mono-custom text-[10px] text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-300"
      >
        <span className="flex items-center gap-2">
          <MessageSquare className="h-3 w-3" />
          COMMENTS ({comments.length})
        </span>
        {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2">
              {comments.length === 0 && (
                <p className="py-2 text-center font-mono-custom text-[10px] text-zinc-600">
                  NO INTEL YET. BE THE FIRST TO COMMENT.
                </p>
              )}
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-none border border-zinc-800/50 bg-zinc-900/30 px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-custom text-[9px] font-bold tracking-wider text-[#ff2e2e]">
                      // {comment.author.toUpperCase()}
                    </span>
                    <span className="font-mono-custom text-[8px] text-zinc-600">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="mt-1 font-mono-custom text-[10px] text-zinc-400">{comment.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-3 space-y-2">
              <input
                type="text"
                placeholder="Your alias..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={30}
                className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono-custom text-[10px] text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-[#ff2e2e]/50"
                required
              />
              <div className="flex items-center gap-2">
                <textarea
                  placeholder="Share your intel..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={300}
                  rows={2}
                  className="flex-1 resize-none rounded-none border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono-custom text-[10px] text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-[#ff2e2e]/50"
                  required
                />
                <button
                  type="submit"
                  disabled={!text.trim() || !author.trim()}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none bg-[#ff2e2e]/20 text-[#ff2e2e] transition-colors hover:bg-[#ff2e2e]/30 disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-right font-mono-custom text-[8px] text-zinc-600">
                {text.length}/300
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
