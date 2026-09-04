import React, { useState } from 'react';
import { X, Star, MessageSquarePlus, CheckCircle, Send, HeartHandshake } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const FeedbackModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [category, setCategory] = useState('General Platform Experience');
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            const newFeedback = {
                id: 'FB-' + Date.now().toString().slice(-4),
                user: (name.trim() || user?.name || 'Anonymous User') + (email ? ` (${email})` : ''),
                issue: `⭐ ${rating}/5 Stars | ${category}: ${comment.trim()}`,
                priority: rating <= 2 ? 'High' : rating === 3 ? 'Medium' : 'Low',
                status: 'Open',
                date: new Date().toISOString().split('T')[0],
                category: 'User Feedback',
                rating,
                comment: comment.trim()
            };

            const existing = JSON.parse(localStorage.getItem('agroconnect_feedbacks') || '[]');
            localStorage.setItem('agroconnect_feedbacks', JSON.stringify([newFeedback, ...existing]));

            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setComment('');
                onClose();
            }, 2200);
        }, 600);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-950 text-white p-6 relative">
                    <button 
                        onClick={onClose} 
                        className="absolute top-5 right-5 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md">
                            <MessageSquarePlus className="w-6 h-6 text-amber-300" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black">Share Your Feedback</h3>
                            <p className="text-xs text-emerald-100 font-medium">Help us improve AgroConnect for farmers &amp; buyers across India.</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6">
                    {isSubmitted ? (
                        <div className="py-8 text-center space-y-3">
                            <div className="inline-flex p-4 bg-emerald-100 text-emerald-700 rounded-full animate-bounce">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h4 className="text-xl font-black text-gray-900">Thank You for Your Feedback!</h4>
                            <p className="text-xs text-gray-600 font-medium max-w-xs mx-auto">
                                Your valuable inputs help us build a stronger, transparent, and fair agricultural ecosystem for India.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            {/* Star Rating */}
                            <div className="text-center space-y-1 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                                <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider">How was your experience?</label>
                                <div className="flex justify-center gap-2 pt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="p-1 transition-transform hover:scale-125 focus:outline-none"
                                        >
                                            <Star 
                                                className={`w-7 h-7 ${
                                                    (hoverRating || rating) >= star 
                                                        ? 'fill-amber-400 text-amber-400 drop-shadow-xs' 
                                                        : 'text-gray-300'
                                                }`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                                <span className="text-[11px] font-extrabold text-emerald-800 inline-block pt-1">
                                    {rating === 5 ? '🌟 Excellent!' : rating === 4 ? '👍 Very Good' : rating === 3 ? '😐 Average' : '👎 Needs Improvement'}
                                </span>
                            </div>

                            {/* Category Dropdown */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Feedback Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full text-xs font-semibold p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                                >
                                    <option value="General Platform Experience">General Platform Experience 🌟</option>
                                    <option value="Produce Quality & Marketplace">Produce Quality &amp; Marketplace 🍅</option>
                                    <option value="Mandi Price Transparency">Mandi Price Transparency 📊</option>
                                    <option value="Logistics & Delivery Support">Logistics &amp; Delivery Support 🚚</option>
                                    <option value="Bug Report / Technical Issue">Bug Report / Technical Issue 🐛</option>
                                </select>
                            </div>

                            {/* Name & Email Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                                    <input 
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full Name"
                                        className="w-full text-xs font-medium p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Email / Phone</label>
                                    <input 
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@domain.com"
                                        className="w-full text-xs font-medium p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600"
                                    />
                                </div>
                            </div>

                            {/* Comment Textarea */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Your Message / Feedback *</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell us what you liked or how we can make AgroConnect better for you..."
                                    className="w-full text-xs font-medium p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !comment.trim()}
                                    className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-md transition disabled:opacity-50 flex items-center gap-1.5"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
