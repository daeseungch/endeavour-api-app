import { useState, useEffect } from 'react'
import {getApiData} from './api'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [getData, setGetData] = useState([])
  const [backup, setBackup] = useState([])
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    reqApi()
  },[])

  useEffect(() => {
    filterArray()
  },[search])

  function filterArray() {
    let size = search.length
    let searchTwo = search.charAt(0).toUpperCase() + search.slice(1)

    if (size == 0) {
      setGetData(backup)
    } else {
      let fill = getData.filter((e)=>{
        let title = e.title.slice(0, size)
        return title == searchTwo
      })
      setGetData(fill)
    }
  }
  
  async function reqApi () {
    let api = await getApiData()
    setGetData(api.artObjects)
    setBackup(api.artObjects)
  }

  return (
    <div className={styles.container}>
      <input placeholder="Search for title" value={search} onChange={(e) => {
        setSearch(e.target.value)
      }}className={styles.search}/>
      <div className={styles.containerArts}>
      {getData &&
          (getData.map((item,index)=>{
          return (
              <div key={index} className={styles.artObject}>
                <img src={item.webImage.url} height={220} width={220}/>
                <p className={styles.title}>{item.title}</p>
              </div>
         )})) 
      }
      </div>
    </div>
  )
}
