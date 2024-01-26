import { useEffect, useState } from 'react'
import { Layout, theme, Table, Select, Space, Input, message } from 'antd'
import EntryDetail from './components/EntryDetail'
import NewEntryForm from './components/NewEntryForm'
import { get } from './services/entry'

const { Content, Footer } = Layout
const { Search } = Input

const options = [
  {
    value: 'title',
    label: 'Título'
  },
  {
    value: 'author',
    label: 'Autor'
  },
  {
    value: 'content',
    label: 'Contenido'
  }
]

const columns = [
  {
    title: 'Título',
    dataIndex: 'title',
    key: 'title',
    render: (_, item) => <EntryDetail item={item} />
  },
  {
    title: 'Autor',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: 'Fecha',
    dataIndex: 'created_at',
    key: 'created_at'
  },
  {
    title: 'Contenido',
    key: 'content',
    dataIndex: 'content',
    render: (content) => <>{content.substring(0, 60)}</>
  }
]

function App () {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('title')
  const [messageApi, contextHolder] = message.useMessage()

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const getData = (url) => {
    get(url)
      .then((data) => {
        if (data.error) {
          messageApi.warning(
            'Lo sentimos, ocurrió un error al obtener la información.'
          )
        } else {
          setData(data.value)
        }
      })
      .catch((err) => messageApi.error('Lo sentimos, ocurrió un error.'))
  }

  const onSearch = (text) => {
    let filter = ''
    if (text) {
      filter = `?${query}=${text}`
    }
    getData(`http://localhost:3000/api/entries${filter}`);
  }

  useEffect(() => {
    getData('http://localhost:3000/api/entries')
  }, [])

  return (
    <Layout>
      <Content style={{ padding: '10px 48px' }}>
        {contextHolder}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '5px'
          }}
        >
          <div>
            <NewEntryForm />
          </div>
          <div>
            <Space direction='vertical' size='middle'>
              <Space.Compact>
                <Select
                  defaultValue={query}
                  options={options}
                  onChange={(value) => setQuery(value)}
                />
                <Search placeholder='Buscar' onSearch={onSearch} allowClear />
              </Space.Compact>
            </Space>
          </div>
        </div>
        <div
          style={{
            background: colorBgContainer,
            minHeight: '100vh',
            padding: 24,
            borderRadius: borderRadiusLG
          }}
        >
          <Table columns={columns} dataSource={data} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by Jesús Cruz</Footer>
    </Layout>
  )
}

export default App
