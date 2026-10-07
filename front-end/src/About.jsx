import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'
import loadingIcon from './loading.gif'

const About = props => {
  const [about, setAbout] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAbout(response.data)
      })
      .catch(err => {
        setError(JSON.stringify(err, null, 2))
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <>
      {error && <p className="About-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}
      {about && (
        <div className="About">
          <h1>{about.title}</h1>
          <img src={about.imageUrl} alt={about.imageAlt} className="About-photo" />
          <h1>{about.name}</h1>
          {about.paragraphs.map(text => (
            <p key={text}>{text}</p>
          ))}
        </div>
      )}
    </>
  )
}

export default About
