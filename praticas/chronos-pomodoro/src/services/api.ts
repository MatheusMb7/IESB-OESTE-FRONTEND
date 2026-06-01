

const BASE_URL = 'http://localhost:3333';

// ─── TIPOS ───────────────────────────────────────────────────────────────────

export type ApiSettings = {
  id: number;
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
};

export type ApiTask = {
  id: string;
  name: string;
  duration: number;
  type: 'workTime' | 'shortBreakTime' | 'longBreakTime';
  startDate: string;
  completeDate: string | null;
  interruptDate: string | null;
};

// ─── SETTINGS ────────────────────────────────────────────────────────────────

export async function fetchSettings(): Promise<ApiSettings> {
  const response = await fetch(`${BASE_URL}/settings`);
  if (!response.ok) throw new Error('Erro ao buscar configurações');
  return response.json();
}

export async function saveSettings(data: {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}): Promise<ApiSettings> {
  const response = await fetch(`${BASE_URL}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao salvar configurações');
  return response.json();
}

// ─── TASKS ───────────────────────────────────────────────────────────────────

export async function fetchTasks(): Promise<ApiTask[]> {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) throw new Error('Erro ao buscar tarefas');
  return response.json();
}

export async function createTask(data: {
  id: string;
  name: string;
  duration: number;
  type: 'workTime' | 'shortBreakTime' | 'longBreakTime';
  startDate: string;
}): Promise<ApiTask> {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar tarefa');
  return response.json();
}

export async function completeTask(taskId: string): Promise<ApiTask> {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}/complete`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completeDate: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error('Erro ao concluir tarefa');
  return response.json();
}

export async function interruptTask(taskId: string): Promise<ApiTask> {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}/interrupt`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interruptDate: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error('Erro ao interromper tarefa');
  return response.json();
}

export async function clearTasks(): Promise<void> {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao limpar histórico');
}
