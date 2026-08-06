'use client';

import React, { useState } from 'react';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronRight, Save, Loader2 } from 'lucide-react';
import { updateCourseCurriculumAction } from '@/modules/courses/course.actions';
import { useRouter } from 'next/navigation';

interface CurriculumEditorProps {
  courseId: string;
  expectedVersion: number;
  initialModules: any[];
}

export function CurriculumEditor({ courseId, expectedVersion, initialModules }: CurriculumEditorProps) {
  const router = useRouter();
  const [modules, setModules] = useState<any[]>(
    initialModules.length > 0 
      ? initialModules 
      : [{ id: 'new-mod-1', title: '', description: '', position: 1, topics: [] }]
  );
  
  const [isSaving, setIsSaving] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    modules.reduce((acc, m) => ({ ...acc, [m.id]: true }), {})
  );

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addModule = () => {
    const newId = `new-mod-${Date.now()}`;
    setModules([...modules, { id: newId, title: '', description: '', position: modules.length + 1, topics: [] }]);
    setExpandedModules(prev => ({ ...prev, [newId]: true }));
  };

  const updateModule = (id: string, field: string, value: string) => {
    setModules(modules.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const removeModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id));
  };

  const addTopic = (moduleId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          topics: [...m.topics, { id: `new-topic-${Date.now()}`, title: '', description: '', position: m.topics.length + 1 }]
        };
      }
      return m;
    }));
  };

  const updateTopic = (moduleId: string, topicId: string, field: string, value: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          topics: m.topics.map((t: any) => t.id === topicId ? { ...t, [field]: value } : t)
        };
      }
      return m;
    }));
  };

  const removeTopic = (moduleId: string, topicId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          topics: m.topics.filter((t: any) => t.id !== topicId)
        };
      }
      return m;
    }));
  };

  const handleSave = async () => {
    // Validate empty titles
    const hasEmpty = modules.some(m => !m.title.trim() || m.topics.some((t: any) => !t.title.trim()));
    if (hasEmpty) {
      alert('Module and Topic titles are required.');
      return;
    }

    setIsSaving(true);
    try {
      const payload = modules.map((m, mIdx) => ({
        id: m.id.startsWith('new-') ? undefined : m.id,
        title: m.title,
        description: m.description,
        position: mIdx + 1,
        topics: m.topics.map((t: any, tIdx: number) => ({
          id: t.id.startsWith('new-') ? undefined : t.id,
          title: t.title,
          description: t.description,
          position: tIdx + 1,
        }))
      }));

      const res = await updateCourseCurriculumAction({
        courseId,
        expectedVersion,
        modules: payload,
      });

      if (res.success) {
        alert('Curriculum saved successfully!');
        router.refresh();
      } else {
        alert(res.error?.message || 'Failed to save curriculum');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving curriculum');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Course Curriculum</h3>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-500 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Curriculum
        </button>
      </div>

      <div className="space-y-4">
        {modules.map((mod, modIdx) => (
          <div key={mod.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
              <button onClick={() => toggleModule(mod.id)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded">
                {expandedModules[mod.id] ? <ChevronDown className="w-5 h-5 text-slate-500" /> : <ChevronRight className="w-5 h-5 text-slate-500" />}
              </button>
              <span className="font-semibold text-slate-400 dark:text-slate-500 w-8">M{modIdx + 1}</span>
              <input
                value={mod.title}
                onChange={(e) => updateModule(mod.id, 'title', e.target.value)}
                placeholder="Module Title"
                className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-sm font-medium focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
              />
              <button onClick={() => removeModule(mod.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            {expandedModules[mod.id] && (
              <div className="p-4 space-y-4">
                <textarea
                  value={mod.description || ''}
                  onChange={(e) => updateModule(mod.id, 'description', e.target.value)}
                  placeholder="Module Description (Optional)"
                  rows={2}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />

                <div className="pl-6 space-y-3">
                  {mod.topics.map((topic: any, tIdx: number) => (
                    <div key={topic.id} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-500 w-6 text-right">{modIdx + 1}.{tIdx + 1}</span>
                      <input
                        value={topic.title}
                        onChange={(e) => updateTopic(mod.id, topic.id, 'title', e.target.value)}
                        placeholder="Topic Title"
                        className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                      />
                      <button onClick={() => removeTopic(mod.id, topic.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => addTopic(mod.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10 rounded-md transition ml-9 mt-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Topic
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addModule}
          className="w-full py-4 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition bg-slate-50 dark:bg-slate-800/20"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm font-medium">Add New Module</span>
        </button>
      </div>
    </div>
  );
}
