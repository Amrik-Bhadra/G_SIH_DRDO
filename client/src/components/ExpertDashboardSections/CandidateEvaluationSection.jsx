import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { IoIosInformationCircleOutline } from "react-icons/io";

function CandidateEvaluationSection({ sectionTitle, evaluationCriteria = [] }) {
    // Ensure evaluationCriteria is an array, and set default scores
    const [scores, setScores] = useState(
        evaluationCriteria.reduce((acc, criterion) => {
            acc[criterion.key] = "";
            return acc;
        }, { total: "" })
    );
    const [suggestions, setSuggestions] = useState("");

    const handleChange = (key) => (event) => {
        const inputValue = event.target.value;
        if (inputValue === "" || (inputValue >= 0 && inputValue <= 10)) {
            setScores((prevScores) => {
                const updatedScores = {
                    ...prevScores,
                    [key]: inputValue,
                };
                const totalScore = evaluationCriteria.reduce(
                    (sum, criterion) => sum + (parseFloat(updatedScores[criterion.key]) || 0),
                    0
                );
                updatedScores.total = totalScore.toString();
                return updatedScores;
            });
        }
    };

    const handleSuggestionsChange = (event) => {
        setSuggestions(event.target.value);
    };

    return (
        <div
            className="bg-white w-[60vw] h-fit rounded-lg p-7 relative"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
        >
            <div className="flex gap-x-4">
                <div className="bg-gradient-to-r from-sky-600 to-cyan-400 text-transparent bg-clip-text font-bold text-2xl mb-6">
                    {sectionTitle}
                </div>
                <div className="text-xl text-gray-500 cursor-pointer">
                    <IoIosInformationCircleOutline />
                </div>
            </div>

            <div className="grid grid-cols-[auto_2fr_1fr] gap-4">
                <div className="flex flex-col gap-y-8 ml-5 col-span-2">
                    {evaluationCriteria.map((criterion) => (
                        <div key={criterion.key} className="flex flex-col gap-y-5">
                            <div className="text-gray-700">{criterion.label}</div>
                            <TextField
                                id={`outlined-score-input-${criterion.key}`}
                                label="Score(0-10)"
                                type="number"
                                value={scores[criterion.key]}
                                onChange={handleChange(criterion.key)}
                                sx={{ width: "150px", marginLeft: "20px" }}
                                variant="outlined"
                                inputProps={{
                                    max: 10,
                                    min: 0,
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="col-span-1 flex flex-col">
                    <div className="text-gray-700 pb-2">Suggestions</div>
                    <TextField
                        id="outlined-suggestions-input"
                        label="Enter Suggestions"
                        multiline
                        rows={6}
                        value={suggestions}
                        onChange={handleSuggestionsChange}
                        sx={{ width: 250 }}
                    />
                    <div className="flex absolute bottom-7 right-34 items-center gap-x-1">
                        <div className="bg-gradient-to-r from-sky-600 to-cyan-400 text-transparent bg-clip-text text-xl font-bold">
                            Total
                        </div>
                        <div>
                            <TextField
                                id="outlined-score-input-total"
                                label=""
                                type="number"
                                value={scores.total}
                                onChange={handleChange("total")}
                                sx={{ width: "100px", marginRight: "10px" }}
                                variant="outlined"
                                inputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="text-gray-500">max score: {evaluationCriteria.length * 10}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CandidateEvaluationSection;
