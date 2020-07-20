import React from 'react'
import { RingLoader } from 'react-spinners'
import { useFetch } from'../../../hooks/useFetch'
import { TasksConsoleList } from '../screen/TasksConsoleList'
import { TASK_ENDPOINT } from  '../../../config/api-config'

export const TasksConsoleContainer = () => {
  const res = useFetch(TASK_ENDPOINT)
  
  if (!res.response) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <RingLoader size={140} />
      </div>
    )
  } else {
    return (
      <div style={{ marginTop: '80px' }}>
        {res.response.data.results.map((x, i) => (
          <TasksConsoleList
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
