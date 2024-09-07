import React from 'react'
import WebCam from './WebCam'
import { Button } from '@/components/ui/button'
import Recording from './Recoding'

function Aswers() {
  return (
    <div className='flex flex-col justify-center'>
      <WebCam style={{width : '100%',height: 300}}/>
      <div>
        {/* <Button>Record Answer</Button> */}
        <Recording />
      </div>
    </div>
  )
}

export default Aswers
