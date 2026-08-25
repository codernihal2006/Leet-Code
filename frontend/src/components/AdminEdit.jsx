import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate, useParams } from 'react-router';

// Zod schema matching the problem schema
const problemSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
    visibleTestCases: z.array(
        z.object({
            input: z.string().min(1, 'Input is required'),
            output: z.string().min(1, 'Output is required'),
            explanation: z.string().min(1, 'Explanation is required')
        })
    ).min(1, 'At least one visible test case required'),
    hiddenTestCases: z.array(
        z.object({
            input: z.string().min(1, 'Input is required'),
            output: z.string().min(1, 'Output is required')
        })
    ).min(1, 'At least one hidden test case required'),
    startCode: z.array(
        z.object({
            language: z.enum(['C++', 'Java', 'JavaScript']),
            initialCode: z.string().min(1, 'Initial code is required')
        })
    ).length(3, 'All three languages required'),
    referenceSolution: z.array(
        z.object({
            language: z.enum(['C++', 'Java', 'JavaScript']),
            completeCode: z.string().min(1, 'Complete code is required')
        })
    ).length(3, 'All three languages required')
});

function AdminEdit() {
    const { problemId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(problemSchema),
        defaultValues: {
            startCode: [
                { language: 'C++', initialCode: '' },
                { language: 'Java', initialCode: '' },
                { language: 'JavaScript', initialCode: '' }
            ],
            referenceSolution: [
                { language: 'C++', completeCode: '' },
                { language: 'Java', completeCode: '' },
                { language: 'JavaScript', completeCode: '' }
            ]
        }
    });

    const {
        fields: visibleFields,
        append: appendVisible,
        remove: removeVisible
    } = useFieldArray({
        control,
        name: 'visibleTestCases'
    });

    const {
        fields: hiddenFields,
        append: appendHidden,
        remove: removeHidden
    } = useFieldArray({
        control,
        name: 'hiddenTestCases'
    });

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const { data } = await axiosClient.get(`/problem/problemById/${problemId}`);
                // Ensure difficulty and tags are lowercase to match enum
                if (data) {
                    // Helper to map backend data to form structure if needed
                    // Assuming data structure matches schema mostly
                    reset({
                        title: data.title,
                        description: data.description,
                        difficulty: data.difficulty.toLowerCase(),
                        tags: data.tags,
                        visibleTestCases: data.visibleTestCases,
                        hiddenTestCases: data.hiddenTestCases || [], // Ensure it exists
                        startCode: data.startCode,
                        referenceSolution: data.referenceSolution
                    });
                }
            } catch (error) {
                console.error('Failed to fetch problem details:', error);
                alert('Failed to fetch problem details');
                navigate('/admin/update');
            } finally {
                setLoading(false);
            }
        };

        if (problemId) {
            fetchProblem();
        }
    }, [problemId, reset, navigate]);

    const onSubmit = async (data) => {
        try {
            await axiosClient.put(`/problem/update/${problemId}`, data);
            alert('Problem updated successfully!');
            navigate('/admin/update');
        } catch (error) {
            alert(`Error updating problem: ${error.response?.data?.message || error.message}`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Edit Problem</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Basic Information</h2>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-slate-800">Title</span>
                            </label>
                            <input
                                {...register('title')}
                                className={`input input-bordered ${errors.title && 'input-error'}`}
                            />
                            {errors.title && (
                                <span className="text-error">{errors.title.message}</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-slate-800">Description</span>
                            </label>
                            <textarea
                                {...register('description')}
                                className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
                            />
                            {errors.description && (
                                <span className="text-error">{errors.description.message}</span>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text font-semibold text-slate-800">Difficulty</span>
                                </label>
                                <select
                                    {...register('difficulty')}
                                    className={`select select-bordered ${errors.difficulty && 'select-error'}`}
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text font-semibold text-slate-800">Tag</span>
                                </label>
                                <select
                                    {...register('tags')}
                                    className={`select select-bordered ${errors.tags && 'select-error'}`}
                                >
                                    <option value="array">Array</option>
                                    <option value="linkedList">Linked List</option>
                                    <option value="graph">Graph</option>
                                    <option value="dp">DP</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Test Cases */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Test Cases</h2>

                    {/* Visible Test Cases */}
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Visible Test Cases</h3>
                            <button
                                type="button"
                                onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                                className="btn btn-sm btn-primary"
                            >
                                Add Visible Case
                            </button>
                        </div>

                        {visibleFields.map((field, index) => (
                            <div key={field.id} className="border p-4 rounded-lg space-y-2">
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => removeVisible(index)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <input
                                    {...register(`visibleTestCases.${index}.input`)}
                                    placeholder="Input"
                                    className="input input-bordered w-full bg-white text-slate-900 border-slate-300 font-medium"
                                />

                                <input
                                    {...register(`visibleTestCases.${index}.output`)}
                                    placeholder="Output"
                                    className="input input-bordered w-full bg-white text-slate-900 border-slate-300 font-medium"
                                />

                                <textarea
                                    {...register(`visibleTestCases.${index}.explanation`)}
                                    placeholder="Explanation"
                                    className="textarea textarea-bordered w-full bg-white text-slate-900 border-slate-300 font-medium"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Hidden Test Cases */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Hidden Test Cases</h3>
                            <button
                                type="button"
                                onClick={() => appendHidden({ input: '', output: '' })}
                                className="btn btn-sm btn-primary"
                            >
                                Add Hidden Case
                            </button>
                        </div>

                        {hiddenFields.map((field, index) => (
                            <div key={field.id} className="border p-4 rounded-lg space-y-2">
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => removeHidden(index)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <input
                                    {...register(`hiddenTestCases.${index}.input`)}
                                    placeholder="Input"
                                    className="input input-bordered w-full bg-white text-slate-900 border-slate-300 font-medium"
                                />

                                <input
                                    {...register(`hiddenTestCases.${index}.output`)}
                                    placeholder="Output"
                                    className="input input-bordered w-full bg-white text-slate-900 border-slate-300 font-medium"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code Templates */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Code Templates</h2>

                    <div className="space-y-6">
                        {[0, 1, 2].map((index) => (
                            <div key={index} className="space-y-2">
                                <h3 className="font-bold text-slate-800">
                                    {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
                                </h3>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-slate-800">Initial Code</span>
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            {...register(`startCode.${index}.initialCode`)}
                                            className="w-full bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm leading-relaxed border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                                            rows={6}
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-slate-800">Reference Solution</span>
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            {...register(`referenceSolution.${index}.completeCode`)}
                                            className="w-full bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm leading-relaxed border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                                            rows={6}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Update Problem
                </button>
            </form>
        </div>
    );
}

export default AdminEdit;
