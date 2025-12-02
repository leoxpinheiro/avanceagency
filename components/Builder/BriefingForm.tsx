import React, { useState } from 'react';
import { BriefingQuestion } from '../../types';
import { ArrowRight, FileText } from 'lucide-react';

interface BriefingFormProps {
  questions: BriefingQuestion[];
  onSubmit: (answers: Record<string, string>) => void;
}

const BriefingForm: React.FC<BriefingFormProps> = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <div className="max-w-3xl mx-auto pt-10 pb-20 px-6">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Briefing Técnico</h2>
        <p className="text-slate-400">Perguntas estratégicas geradas pela IA para este nicho.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="bg-slate-900/50 backdrop-blur p-6 rounded-2xl border border-slate-800 shadow-sm focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
            <label className="block text-sm font-bold text-slate-300 mb-3 flex items-start gap-2">
              <FileText size={16} className="mt-0.5 text-indigo-400" />
              {q.question}
            </label>
            <textarea
              required
              rows={2}
              className="w-full px-4 py-3 bg-slate-950 rounded-xl border border-slate-800 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-sm"
              placeholder={q.placeholder}
              value={answers[q.id] || ''}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          </div>
        ))}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1"
          >
            Gerar Blueprint
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BriefingForm;