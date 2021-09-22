import { ActionTree, GetterTree, MutationTree } from 'vuex'

type TTask = {
  name: string
  type: string
  progress: {
    success: number
    failure: number
  }
}

// В сторе очень сложно работать с объектами (т.к. не работает реактивность), поэтому работаем с массивом и мапой тасков по индексам этого массива.
const taskMap = new Map<string, number>()

export const state = () => ({
  tasks: [] as TTask[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  tasks: (state) => state.tasks,
  tasksCount: (state) => {
    const count = state.tasks.length
    return count > 99 ? '99+' : count
  },
}

export const mutations: MutationTree<RootState> = {
  TASK_ADD: (state, { name, type, progress }: TTask) => {
    // Добавление/удаление элемента в массив всегда триггерит все геттеры, которые завязаны на этом массиве
    // Здесь прописываем полную структуру объекта, чтобы Vuex знал, за какими свойствами смотреть. Иначе не работает реактивность.
    // И чтобы при повторном добавлении таски с тем же именем она не дублировалась, умертвляя предыдущую (только на отображении) - проверяем, есть ли такая уже.
    if (!taskMap.get(name) && taskMap.get(name) !== 0) {
      taskMap.set(
        name,
        state.tasks.push({
          name,
          type,
          progress: {
            success: progress.success,
            failure: progress.failure,
          },
        }) - 1,
      )
    }
  },
  TASK_DONE: (state, taskName: string) => {
    if (taskMap.get(taskName) || taskMap.get(taskName) === 0) {
      state.tasks.splice(taskMap.get(taskName)!, 1)
      taskMap.delete(taskName)
    }
  },
  TASK_SUCCESS_PROGRESS: (state, { taskName, progress }) => {
    if (taskMap.get(taskName) || taskMap.get(taskName) === 0) {
      state.tasks[taskMap.get(taskName)!].progress.success = progress
    }
  },
  TASK_FAILURE_PROGRESS: (state, { taskName, progress }) => {
    if (taskMap.get(taskName) || taskMap.get(taskName) === 0) {
      state.tasks[taskMap.get(taskName)!].progress.failure = progress
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  TASK_ADD: ({ commit }, task: TTask) => commit('TASK_ADD', task),
  TASK_DONE: ({ commit }, taskName: string) => commit('TASK_DONE', taskName),
  TASK_SUCCESS_PROGRESS: ({ commit }, { taskName, progress }) => commit('TASK_SUCCESS_PROGRESS', {
    taskName,
    progress,
  }),
  TASK_FAILURE_PROGRESS: ({ commit }, { taskName, progress }) => commit('TASK_FAILURE_PROGRESS', {
    taskName,
    progress,
  }),
}
