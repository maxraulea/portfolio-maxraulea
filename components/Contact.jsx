import { useState } from 'react'

const Contact = ({heading ,message}) =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userMessage, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async(e) => { 
        e.preventDefault()
        console.log('Sending')
      let data = {
          name,
          email,
          userMessage
        }

        try {
          const response = await fetch("api/sendmail", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const result = await response.text();
          setName('')
          setEmail('')
          console.log(result)
        } catch (error) {
          console.error(error);
        }
      }

    return(   
        <div id="contact" className="w-full h-screen items-center flex bg-black">

          <div className="w-[35%] m-auto">
            <h2 className="font-bold text-5xl text-white">
              Get in touch
            </h2>
          </div>
          <div className="w-[50%] h-[50%]">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 text-white w-[100%]" id='contact'>
            <label htmlFor="email">email:</label>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} name='email' className="border-2 rounded-md text-black block w-[75%] h-[20%] p-10" form='contact' required/>
            <label htmlFor="message">message:</label>
            <textarea  onChange={(e)=>{setMessage(e.target.value)}} name='userMessage' className="border-2 rounded-md text-black block w-[75%] h-[140%] p-10" form='contact' required/>
            <button type='submit' onClick={(e)=>{handleSubmit(e)}} form="contact">Submit</button>
            </form>
          </div>       
        </div>
     )
}

export default Contact