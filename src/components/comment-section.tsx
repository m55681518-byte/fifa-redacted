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
        className="flex w-full items-center justify-between rounded-md border border-dossier-700 bg-dossier-800/50 px-3 py-2 text-xs text-dossier-400 transition-colors hover:border-dossier-600 hover:text-dossier-300"
      >
        <span className="flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5" />
          Comments ({comments.length})
        </span>
        {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
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
                <p className="py-2 text-center text-xs text-dossier-600">
                  No intel yet. Be the first to comment.
                </p>
              )}
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-md border border-dossier-700/50 bg-dossier-800/30 px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-custom text-[10px] font-bold tracking-wider text-accent-red">
                      // {comment.author.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-dossier-600">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-dossier-300">{comment.text}</p>
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
                className="w-full rounded-md border border-dossier-700 bg-dossier-900 px-3 py-1.5 text-xs text-dossier-200 placeholder-dossier-600 outline-none transition-colors focus:border-accent-red/50"
                required
              />
              <div className="flex items-center gap-2">
                <textarea
                  placeholder="Share your intel..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={300}
                  rows={2}
                  className="flex-1 resize-none rounded-md border border-dossier-700 bg-dossier-900 px-3 py-1.5 text-xs text-dossier-200 placeholder-dossier-600 outline-none transition-colors focus:border-accent-red/50"
                  required
                />
                <button
                  type="submit"
                  disabled={!text.trim() || !author.trim()}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-accent-red/20 text-accent-red transition-colors hover:bg-accent-red/30 disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-right text-[10px] text-dossier-600">
                {text.length}/300
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
