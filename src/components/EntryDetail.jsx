import { useState } from 'react'
import { Modal } from 'antd'

const EntryDetail = ({ item }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <a onClick={() => setOpen(true)}>{item.title}</a>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <h2>{item.title}</h2>
        <strong>Autor:</strong>
        <p>{item.author}</p>
        <strong>Fecha:</strong>
        <p>{item.created_at}</p>
        <strong>Contenido:</strong>
        <p>{item.content}</p>
      </Modal>
    </>
  )
}

export default EntryDetail
