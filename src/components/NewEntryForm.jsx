import { useState } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
import { post } from '../services/entry'

const { TextArea } = Input

function NewEntryForm () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleSubmt = () => {
    post({
      url: 'http://localhost:3000/api/entries',
      body: form.getFieldValue()
    })
      .then((data) => {
        if (data.error) {
          messageApi.warning(
            'Lo sentimos, algo salió mal. Compruebe que los campos estén completos.'
          )
        } else {
          messageApi.success('Datos guardados correctamente.')
          handleCancel()
        }
      })
      .catch((err) => messageApi.error('Lo sentimos, ocurrió un error.'))
  }

  return (
    <>
      {contextHolder}
      <Button onClick={() => setIsModalOpen(true)}>Nuevo</Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key='submit' type='primary' onClick={handleSubmt}>
            Guardar
          </Button>
        ]}
      >
        <Form
          form={form}
          name='form'
          layout='vertical'
          onSubmitCapture={handleSubmt}
          autoComplete='off'
        >
          <Form.Item
            label='Titulo'
            name='title'
            rules={[
              {
                required: true,
                message: 'El titulo es requerido'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Autor'
            name='author'
            rules={[
              {
                required: true,
                message: 'El autor es requerido'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Contenido'
            name='content'
            rules={[
              {
                required: true,
                message: 'El contenido es requerido'
              }
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default NewEntryForm
