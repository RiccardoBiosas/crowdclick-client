import React from 'react'
import { RingLoader } from 'react-spinners'
import { useFetch } from '../../../hooks/useFetch'
import { TASK_ENDPOINT } from '../../../config/api-config'
import TasksConsoleItem from '../screen/TasksConsoleItem'

const TasksConsoleDashboard = () => {
  const res = useFetch(TASK_ENDPOINT)

  if (!res.response) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <RingLoader size={140} />
      </div>
    )
  } else {
    return (
      <div style={{ marginTop: '80px' }}>
        {res.response.data.results.map((x, i) => (
          <TasksConsoleItem
            key={`UserTask${i}`}
            id={x.id}
            title={x.title}
            description={x.description}
            og_image={x.og_image_link}
            task_owner_address={x.user.username}
          />
        ))}
      </div>
    )
  }
}

export default TasksConsoleDashboard
