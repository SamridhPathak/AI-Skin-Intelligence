import { assessmentApi } from "./api";

export const submitAssessment = (data) => assessmentApi.post("/api/v1/assessment/evaluate", data);

export const getLatestScore = () => assessmentApi.get("/api/v1/assessment/score");

export const generateRoutine = () => assessmentApi.post("/api/v1/routine/generate");

export const getRoutine = () => assessmentApi.get("/api/v1/routine");

export const toggleRoutineStep = (routine_step_id, completed) =>
  assessmentApi.post("/api/v1/routine/logs", { routine_step_id, completed });
