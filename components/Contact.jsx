import { useState } from 'react'

const Contact = ({heading ,message}) =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userMessage, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => { 
        e.preventDefault()
        console.log('Sending')
      let data = {
          name,
          email,
          userMessage
        }
      fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((res) => {
          console.log('Response received')
          if (res.status === 200) {
            console.log('Response succeeded!')
            setSubmitted(true)
            setName('')
            setEmail('')
            setBody('')
          }
        })
      }

    return(   
        <div id="contact" className="w-full h-screen items-center flex">

          <div className="w-[35%] m-auto">
            <h2 className="font-bold text-5xl">
              Get in touch
            </h2>
          </div>
          <div className="w-[35%] m-auto">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label htmlFor="first">Name:</label>
            <input type="text" onChange={(e)=>{setName(e.target.value)}} name='name' className="border-2 rounded-md"/>
            <label htmlFor="last">email:</label>
            <input type="text" onChange={(e)=>{setEmail(e.target.value)}} name='email' className="border-2 rounded-md"/>
            <textarea  onChange={(e)=>{setMessage(e.target.value)}} name='userMessage' className="border-2 rounded-md"/>
            <button type='submit' onClick={(e)=>{handleSubmit(e)}}>Submit</button>
            </form>
          </div>       
        </div>
     )
}

export default Contact