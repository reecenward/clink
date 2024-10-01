import React from 'react'

export default function page() {
  return (
    <main>
<div style={{ height: "576px", width:"320px",  position:"absolute", right:0, bottom:0, margin:"10px"}}>
  <iframe
    style={{ height: "100%", width: "100%", border: "none" }}
    allowFullScreen
    src="http://localhost:3000/player/7bab0e95-ae32-418b-a948-ee9eeb94bb87"
  ></iframe>
</div>

      Home
    </main>
  )
}
