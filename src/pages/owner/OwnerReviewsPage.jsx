import React, { useState } from 'react';
import { MessageSquare, Star, Reply, Flag, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../../components/common/Modal';

export default function OwnerReviewsPage() {
  const { reviews } = useRestaurant();
  const { addToast } = useNotification();

  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleOpenReply = (rev) => {
    setSelectedReview(rev);
    setReplyText(`Dear ${rev.userName}, thank you immensely for dining at Ember & Spice! Our chef has noted your kind words.`);
    setReplyModalOpen(true);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    setReplyModalOpen(false);
    addToast({
      type: 'success',
      title: 'Reply Dispatched',
      message: `Your personalized response was sent to ${selectedReview.userName}.`
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
          Reputation & Sentiment
        </span>
        <h1 className="font-serif-brand font-bold text-2xl text-white">
          Diner Reviews & Testimonials ({reviews.length})
        </h1>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl glass-card border border-white/10 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-serif-brand font-bold text-sm text-white">{rev.userName}</h4>
                  <span className="text-[10px] text-zinc-500">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed italic">
              "{rev.comment}"
            </p>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">{rev.likes || 0} patrons found this helpful</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenReply(rev)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Reply className="w-3.5 h-3.5" /> Reply to Diner
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        title={`Respond to ${selectedReview?.userName}`}
      >
        <form onSubmit={handleSendReply} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Response Message</label>
            <textarea
              rows={4}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg"
          >
            Post Public Response
          </button>
        </form>
      </Modal>
    </div>
  );
}
